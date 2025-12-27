import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const GEMINI_API_KEY= process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents : [
        {   role:'user',
            parts: [{text:"What is today's date"}]
        },
        {
            role:'model',
            parts: [{text:"Today's date is **Tuesday, June 11, 2024**."}]
        },
        {   role:'user',
            parts: [{text:"What is today's date"}]
        },
        {
            role:'model',
            parts: [{text:"As of my current processing time, the date is **June 10, 2024**."}]
        },
        {
            role:'user',
            parts:[{text:"Why does gemini LLM give me different dates when i asked for today's date even if its old date. I know it uses old training data but even why different old dates not just one cosistent old date.Tell me in few words. "}]
        }


    ],

});

  console.log(response.text);
}

main();