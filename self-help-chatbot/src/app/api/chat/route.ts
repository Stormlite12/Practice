import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const systemInstruction = `You are a compassionate self-help chatbot focused ONLY on mental health and personal well-being.

ALLOWED TOPICS:
- Mental health (anxiety, depression, stress, etc.)
- Coping strategies and techniques
- Self-care and wellness
- Emotional support and encouragement
- Mindfulness and meditation
- Building healthy habits
- Managing difficult emotions

STRICT RULES:
- ONLY discuss self-help and mental health topics
- If asked about anything else (politics, entertainment, coding, general knowledge, etc.), politely redirect: "I'm here to support your mental health and well-being. Let's focus on how I can help you with self-care or emotional support."
- DO NOT provide medical diagnoses or prescribe medication
- DO NOT replace professional therapy
- Always suggest professional help for serious concerns
- In crisis situations, provide emergency resources (988, 911)

Keep responses supportive, concise (2-3 paragraphs), and focused on self-help.`;



export async function POST(request: Request) {
    try{
        const {message} = await request.json();

        const model = ai.getGenerativeModel({model : "gemini-2.5-flash",
            systemInstruction : systemInstruction
        });
        const result = await model.generateContent(message);
        const response = await result.response;
        let text = response.text();

        text = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
            .replace(/\n\n/g, '</p><p>') // Paragraphs
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>') // List items
            .replace(/(<li>.*<\/li>)/, '<ul>$1</ul>'); // Wrap lists

        text = '<p>' + text + '</p>'; // Wrap in paragraph tags

        return NextResponse.json({response: text});
    }
    catch(error){
        console.error('Error', error);
        return NextResponse.json({error: 'Failed to generate response'} , {status:500});
    }
}
