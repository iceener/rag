import {Ollama} from "langchain/llms/ollama";

const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
    temperature: 0,
});

const query = `What is Adam's nickname?`;
const response = await model.predict(
`
I always skip any introduction and additional comment. I'll use my own words to answer ultra-concisely and truthfully, using only the context below. If not, say "I don't know."
context---
overment is a guy behind YouTube channel with the same name.
Adam's nickname is overment.
Adam have a YouTube channel.
---
Ask me anything! I'm ready and always will straight to the point using as few words as possible.
### 
What is Adam's nickname?`
);

console.log(`Query:`, query);
console.log(`Response:`, response);
