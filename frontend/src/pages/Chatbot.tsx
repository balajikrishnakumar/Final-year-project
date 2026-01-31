import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Send, ArrowLeft, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/api";

/* ---------------- TYPES ---------------- */

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  suggestions?: string[];
}

/* ---------------- USER NAME HELPER ---------------- */

const getDisplayName = () => {
  const name =
    localStorage.getItem("userName") ||
    localStorage.getItem("email") ||
    "User";

  let cleanName = name;

  if (cleanName.includes("@")) {
    cleanName = cleanName.split("@")[0];
  }

  cleanName = cleanName.replace(/[^a-zA-Z]/g, "");

  return cleanName || "User";
};


/* ---------------- HELPERS ---------------- */

const normalizeMessages = (data: any): Message[] => {
  if (Array.isArray(data)) return data;
  if (data?.messages && Array.isArray(data.messages)) return data.messages;
  return [];
};

/* ---------------- COMPONENT ---------------- */

const Chatbot = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatSessions, setChatSessions] = useState<Record<string, Message[]>>(() => {
    try {
      const saved = localStorage.getItem("chatSessions");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeChatId, setActiveChatId] = useState<string>(() => {
    return localStorage.getItem("activeChatId") || "";
  });

  const messages = normalizeMessages(chatSessions[activeChatId]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
    localStorage.setItem("activeChatId", activeChatId);
  }, [chatSessions, activeChatId]);

  /* -------- Create New Chat -------- */

  const createNewChat = () => {
    const id = `chat-${Date.now()}`;

    setChatSessions(prev => ({
      ...prev,
      [id]: [
        {
          id: "welcome",
          text: `Hello ${getDisplayName()}! I'm here to support you.`,
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ],
    }));

    setActiveChatId(id);
  };

  useEffect(() => {
    if (!activeChatId) createNewChat();
    // eslint-disable-next-line
  }, []);

  /* -------- Send Message -------- */

  const sendMessage = async (override?: string) => {
    const content = override ?? input;
    if (!content.trim()) return;

    const token = localStorage.getItem("token");

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      text: content,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setChatSessions(prev => ({
      ...prev,
      [activeChatId]: [...normalizeMessages(prev[activeChatId]), userMessage],
    }));

    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${API}/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: `b-${Date.now()}`,
        text: data.reply || "I'm here with you.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
      };

      setChatSessions(prev => ({
        ...prev,
        [activeChatId]: [...normalizeMessages(prev[activeChatId]), botMessage],
      }));
    } catch {
      setChatSessions(prev => ({
        ...prev,
        [activeChatId]: [
          ...normalizeMessages(prev[activeChatId]),
          {
            id: `err-${Date.now()}`,
            text: "I'm having trouble right now. Please try again later.",
            sender: "bot",
            timestamp: new Date().toISOString(),
          },
        ],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r p-4 bg-muted overflow-y-auto">
        <Button className="w-full mb-4" onClick={createNewChat}>
          <Plus className="w-4 h-4 mr-2" /> New Chat
        </Button>

        {Object.entries(chatSessions).map(([id, rawMsgs]) => {
          const msgs = normalizeMessages(rawMsgs);
          const title =
            msgs.find(m => m.sender === "user")?.text?.slice(0, 30) ||
            "New Conversation";

          return (
            <button
              key={id}
              onClick={() => setActiveChatId(id)}
              className={`w-full text-left p-2 rounded text-sm truncate ${
                id === activeChatId
                  ? "bg-sage text-white"
                  : "hover:bg-accent"
              }`}
            >
              {title}
            </button>
          );
        })}
      </aside>

      <section className="flex-1 flex flex-col">
        <header className="border-b p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Heart className="w-5 h-5 text-sage" />
            <h1 className="font-semibold">MindfulU Assistant</h1>
          </div>

          <Button variant="outline" asChild>
            <Link to="/book-appointment">Book Counsellor</Link>
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[75%]">
                  <div
                    className={`rounded-xl px-4 py-3 ${
                      msg.sender === "user"
                        ? "bg-sage text-white"
                        : "bg-card border"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </main>

        <footer className="border-t p-4 flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
          />
          <Button onClick={() => sendMessage()} disabled={!input.trim()}>
            <Send />
          </Button>
        </footer>
      </section>
    </div>
  );
};

export default Chatbot;
