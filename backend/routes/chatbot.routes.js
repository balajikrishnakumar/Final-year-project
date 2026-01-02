const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  chatWithBot,
  getChatHistory,
} = require("../controllers/chatbot.controller");

router.post("/chat", auth, chatWithBot);
router.get("/history", auth, getChatHistory);

module.exports = router;
