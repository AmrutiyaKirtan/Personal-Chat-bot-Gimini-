const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "your name is pandora and you are an AI model for our restaurant." }],
            },
            {
                role: "model",
                parts: [{ text: "great to meet you. What would you like to know " }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    // does not take input from the terminal
    // const msg = "who are you and what do you do?";
    // const result = await chat.sendMessage(msg);
    // const result = await model.sendMessageStream(msg);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);


    //takes input from the terminal
    const readline = require('readline')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('How can i help you?', async (msg) => {
        // const result = await chat.sendMessage(msg);
        // // const result = await chat.sendMessage(msg);
        // const response = await result.response;
        // const text = response.text();
        // console.log(text);
        // rl.close();

        const result = await model.generateContentStream([msg]);
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            text += chunkText;
        }
    });
}
run();
