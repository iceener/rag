import {ChatOpenAI} from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import * as fs from "fs";
import {Document} from "langchain/document";

const query = `Which projects is overment working on?`;
const docs: Document[] = JSON.parse(fs.readFileSync('./data/overment.json', 'utf8'));
const tags = ['traits', 'personal', 'relationships', 'work', 'hobbies'];

const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo' });
const relevantTags = await chat.predict(`Return comma-separated tags from this list: ###${tags.join(', ')}### that may include relevant information about this query: ###${query}###`);
const taggedDocs = docs.filter(doc => doc.metadata.tags.split(', ').some((tag: string) => relevantTags.split(', ').includes(tag)));
const embeddings = new OpenAIEmbeddings();
const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
const context = (await store.similaritySearch(query, 3)).filter(doc => taggedDocs.every(taggedDoc => taggedDoc.metadata.id !== doc.metadata.id));

const system = `
I'll use my own words to answer ultra-concisely and truthfully, using only the context below. If not, say "I don't know."
context---
${taggedDocs.map(doc => doc.pageContent)}
${context.map(doc => doc.pageContent)}
---
Let's chat!
`;

console.log(system)

const { content: answer } = await chat.call([
    new SystemMessage(system),
    new HumanMessage(query),
]);

console.log(answer);