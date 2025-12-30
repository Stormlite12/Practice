import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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
    try {
        const { message, history = [] } = await request.json();

        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        // Build conversation history for Gemini
        const chatHistory = history
            .filter((msg: any) => msg.text && typeof msg.text === 'string')
            .map((msg: any) => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text.replace(/<[^>]*>/g, '') }]
            }));

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemInstruction }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'I understand. I will focus exclusively on mental health and self-help topics, providing compassionate support while redirecting any off-topic questions.' }]
                },
                ...chatHistory
            ]
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        let text = response.text();

        // Format the response
        text = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/, '<ul>$1</ul>');

        text = '<p>' + text + '</p>';

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Error', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}