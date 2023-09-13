import {ChatOpenAI} from "langchain/chat_models/openai";
import {HumanMessage} from "langchain/schema";
import {TextLoader} from "langchain/document_loaders/fs/text";
import { Document } from "langchain/document";
import {BaseMessage} from "langchain/dist/schema";
import * as fs from "fs";

const [overment] = await new TextLoader("./data/overment.md").load()
const tags = ['traits', 'personal', 'relationships', 'work', 'hobbies']
const chunks = overment.pageContent.split('\n').filter(chunk => chunk.trim());
const docs = chunks.map(chunk => new Document({ pageContent: chunk }));
const template = (strings: TemplateStringsArray, doc: string) => `
Return comma-separated, lower-cased names of the main categories (and nothing more) that matches document provided below.
Categories: ${tags.join(', ')}
Doc###${doc}###
`;

const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    maxConcurrency: 5,
    maxRetries: 3,
});
const results: Promise<BaseMessage>[] = [];
docs.forEach(doc => {
    results.push(chat.call([
        new HumanMessage(template`${doc.pageContent}`),
    ]));
});

const answers = await Promise.all(results);
const enrichedDocs = answers.map((answer, i) => {
    docs[i].metadata = { tags: answer.content, id: i + 1 };
    return docs[i];
});

console.log(enrichedDocs);

fs.writeFileSync('./data/overment.json', JSON.stringify(enrichedDocs, null, 2));