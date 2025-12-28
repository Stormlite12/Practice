import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const GEMINI_API_KEY= process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    config:{
       systemInstruction:`My name is SID and today's date is ${new Date()}`
    },
    
    contents : [
        {   role:'user',
            parts: [{text:"What is today's date"}]
        },
    ],

});

  console.log(response.text);
}

main();