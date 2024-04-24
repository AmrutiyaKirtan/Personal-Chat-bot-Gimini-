const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(express.json());

app.post('/api/sendMessage', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const chat = model.startChat({
            history: [{ role: "user", parts: [{ text: message }] }],
            generationConfig: { maxOutputTokens: 100 }
        });
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        res.json({ message: text });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
