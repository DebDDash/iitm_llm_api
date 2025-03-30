import express from "express";
import multer from "multer";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const upload = multer();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/", upload.single("file"), async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: question }],
    });

    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
});

export default app;
