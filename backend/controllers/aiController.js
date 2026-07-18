const Homestay = require("../models/homestayModel");
const { generateResponse } = require("../config/gemini");

/**
 * @desc    AI-powered Homestay Assistant
 * @route   POST /api/ai/homestay-assistant
 * @access  Public
 */
const homestayAssistant = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Extract keywords from the user message to query MongoDB
    // Split by whitespace and remove punctuation
    const words = message
      .split(/[\s,.;!?()\-]+/)
      .map(w => w.trim())
      .filter(w => w.length > 2); // search using words of length > 2

    let matchedHomestays = [];

    if (words.length > 0) {
      // Create a case-insensitive regex query matching name or location
      const query = {
        $or: words.flatMap(word => [
          { name: { $regex: word, $options: "i" } },
          { location: { $regex: word, $options: "i" } }
        ])
      };
      matchedHomestays = await Homestay.find(query);
    }

    // Fallback: If no direct matches are found, fetch a sample list (up to 5 homestays)
    // so the assistant has some content context to present to the user.
    if (matchedHomestays.length === 0) {
      matchedHomestays = await Homestay.find().limit(5);
    }

    // Format the homestay context details for the Gemini prompt
    const homestayContext = matchedHomestays
      .map(
        (h, index) => `${index + 1}. Name: ${h.name}
   Location: ${h.location}
   Price: Rs. ${h.price} per night
   Description: ${h.description || "N/A"}
   Contact: ${h.contact || "N/A"}`
      )
      .join("\n\n");

    // Construct the structured prompt for the Gemini AI model
    const prompt = `You are a helpful, friendly, and expert eco-tourism AI assistant for the EcoStay platform.
Your goal is to assist users in finding suitable homestays, providing details about their locations, prices, descriptions, and contact information.

Below is the context of available homestays from our database that might be relevant to the user's query:
${homestayContext || "No homestays found in the database."}

Guidelines:
1. Always be polite, positive, and promote eco-tourism and local travel.
2. If the user asks about specific homestays from the context, provide their details (name, location, price, description, contact) accurately.
3. If no relevant homestays are in the context or database to answer their specific query, suggest the closest matches or politely inform them that we do not have homestays matching that specific criteria, but suggest other options from the context.
4. Keep the formatting clean and readable using lists or bullet points where appropriate.

User's Question: "${message}"

Helpful Assistant Response:`;

    // Send the prompt to the Gemini API
    const reply = await generateResponse(prompt);

    res.json({
      success: true,
      reply,
    });
  } catch (err) {
    console.error("Error in homestayAssistant controller:", err);
    // Wrap the error with a clear message, matching the pattern in authController.js
    const error = new Error("AI service temporarily unavailable");
    error.statusCode = 503;
    next(error);
  }
};

module.exports = {
  homestayAssistant,
};
