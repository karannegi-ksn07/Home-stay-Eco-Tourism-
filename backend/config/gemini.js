const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Gen AI with API Key from environment variables
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * Calls the Gemini 1.5 Flash model with the provided prompt.
 * @param {string} prompt - The prompt to send to the Gemini model.
 * @returns {Promise<string>} The generated text response.
 */
const generateResponse = async (prompt) => {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
};

module.exports = {
  generateResponse,
};
