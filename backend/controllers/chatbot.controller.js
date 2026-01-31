const ChatLog = require("../models/ChatLog");
const { getAIReply } = require("../services/ai.service");

exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.json({
        reply: "I’m here with you. What’s been on your mind lately?",
      });
    }

    const shouldAskQuestion = (message) => {
  const triggers = ["help", "confused", "don’t know", "what should", "how do i"];
  return triggers.some(t => message.toLowerCase().includes(t));
};


    const aiReply = await getAIReply(message);

    await ChatLog.create({
      userId: req.user.id,
      message,
      reply: aiReply,
    });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("❌ CHATBOT ERROR:", error.message);
    res.status(500).json({
      reply: "I’m having a little trouble right now. Can we try again?",
    });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const history = await ChatLog.find({ userId: req.user.id })
      .sort({ createdAt: 1 });

    res.json(history);
  } catch (error) {
    console.error("CHAT HISTORY ERROR:", error.message);
    res.status(500).json({ msg: "Failed to load chat history" });
  }
};

