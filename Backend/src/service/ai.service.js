const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function genrateAiResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text
}

module.exports = genrateAiResponse;