import {ChatOpenAI} from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";
import {TextLoader} from "langchain/document_loaders/fs/text";

const query = `Who exactly is Overment?`;
const [overment] = await new TextLoader("./data/overment.md").load()
const docs = overment.pageContent.split('\n').filter(chunk => chunk.trim());
const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
});
const { content: answer } = await chat.call([
    new SystemMessage(`
        I'll use my own words to answer ultra-concisely and truthfully, using only the context below. If not, say "I don't know."
        context---
        ${docs.slice(0, 3).join('\n')}
        ---
        Let's chat!
    `),
    new HumanMessage(query),
]);

console.log(answer);

