// Detect emotion from user text
const analyzeEmotion = (text) => {
  const t = text.toLowerCase();

  if (t.includes("sad") || t.includes("depressed") || t.includes("lonely"))
    return "sad";

  if (t.includes("stress") || t.includes("exam") || t.includes("pressure"))
    return "stressed";

  if (t.includes("anxious") || t.includes("panic") || t.includes("fear"))
    return "anxious";

  if (t.includes("angry") || t.includes("frustrated"))
    return "angry";

  if (t.includes("happy") || t.includes("good") || t.includes("relaxed"))
    return "happy";

  return "neutral";
};

// Generate short, accurate response + recommendation
const generateReply = (emotion) => {
  switch (emotion) {
    case "sad":
      return {
        reply:
          "I’m really sorry you’re feeling this way. You’re not alone, and it’s okay to feel low.",
        recommendation:
          "Would you like a grounding exercise or to talk to a counsellor?",
      };

    case "stressed":
      return {
        reply:
          "It sounds like you’re under a lot of pressure right now. Let’s slow things down.",
        recommendation:
          "Do you want a quick breathing exercise or study tips?",
      };

    case "anxious":
      return {
        reply:
          "That sounds overwhelming. Anxiety can feel intense, but it can pass.",
        recommendation:
          "Would you like a calming exercise right now?",
      };

    case "angry":
      return {
        reply:
          "I hear your frustration. Strong emotions are valid, but let’s handle them safely.",
        recommendation:
          "Should we try a short cool-down technique?",
      };

    case "happy":
      return {
        reply:
          "I’m glad to hear that. It’s important to notice positive moments.",
        recommendation:
          "Would you like tips to maintain this mood?",
      };

    default:
      return {
        reply:
          "Thank you for sharing. I’m here and listening.",
        recommendation:
          "Can you tell me a little more about what’s affecting you?",
      };
  }
};

module.exports = { analyzeEmotion, generateReply };
