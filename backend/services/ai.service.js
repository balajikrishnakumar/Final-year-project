const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.getAIReply = async (message) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
    messages: [
      {
  role: "system",
  content: `
You are a calm, empathetic mental health support assistant.

STRICT RULES:
- Do NOT ask a question in every response
- Ask a question ONLY if:
  1) The user is unclear, OR
  2) More detail is genuinely required to help
- Otherwise:
  - Acknowledge the user's message
  - Give brief supportive advice
  - Or offer one optional suggestion

STYLE:
- 2–3 short sentences max
- Warm, human, non-robotic
- Avoid repeating phrases
- Avoid sounding like an interview

OPTIONAL SUGGESTIONS (only when helpful):
- Breathing exercise
- Short grounding activity
- Talking to a counsellor

If no question is needed, DO NOT ask one.
`
},

      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.6,
    max_tokens: 120,
  });

  return completion.choices[0].message.content;
};
