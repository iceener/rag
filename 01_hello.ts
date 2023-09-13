import {ChatOpenAI} from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";

const query = 'What is the distance between the Earth and the Moon?';
// const query = `Who's overment?`
const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
});
const { content } = await chat.call([
    new SystemMessage(`If possible, answer ultra-concisely and truthfully. Say "Don't know" otherwise.`),
    new HumanMessage(query),
]);

console.log(content);