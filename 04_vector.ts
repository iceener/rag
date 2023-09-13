import {ChatOpenAI} from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";

const query = `Adam's location?`;
const [overment] = await new TextLoader("./data/overment.md").load()
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 150,
    chunkOverlap: 0,
});
const docs = await splitter.createDocuments([overment.pageContent]);
const embeddings = new OpenAIEmbeddings();
const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
const context = await store.similaritySearch(query, 1);

const system = `
I'll use my own words to answer ultra-concisely and truthfully, using only the context below. If not, say "I don't know."
context---
${context.map(doc => doc.pageContent)}
---
Let's chat!
`;

const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
});
const { content: answer } = await chat.call([
    new SystemMessage(system),
    new HumanMessage(query),
]);

console.log(answer);