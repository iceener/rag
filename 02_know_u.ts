import {ChatOpenAI} from "langchain/chat_models/openai";
import {HumanMessage, SystemMessage} from "langchain/schema";

const query = `Who's overment?`;
const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
});
const { content: answer } = await chat.call([
    new SystemMessage(`
        Hey! I'll use my own words to answer ultra-concisely and truthfully, using only the context below. If not, say "I don't know."
        
        context###
        overment is a guy behind YouTube channel with the same name.
        Adam's nickname is overment.
        Adam have a YouTube channel.
        ###
        
        Let's chat!
    `),
    new HumanMessage(query),
]);

console.log(answer);