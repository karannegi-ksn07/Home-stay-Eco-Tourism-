"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Input, Loader, useToast } from "@/components/ui";

export default function AssistantClient() {
  const [messages, setMessages] = useState([
    {
      id: "init",
      text: "Hello! I'm your EcoStay AI Assistant. Ask me anything about our homestays, locations, prices, or sustainable travel experiences!",
      sender: "bot",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input.trim();
    setInput("");

    // Append user message
    const userMsg = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: "user",
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/homestay-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessageText }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: data.reply,
            sender: "bot",
            time: new Date(),
          },
        ]);
      } else {
        const errorMsg = data.message || "Something went wrong while reaching the assistant.";
        showToast(errorMsg, "error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showToast("Could not connect to the AI service. Please check if the server is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">EcoStay Assistant</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ask about homestay locations, prices, contact details, and eco-friendly features.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex h-[550px] flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] items-start gap-3 rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-200 hover:shadow-md ${
                  msg.sender === "user"
                    ? "bg-primary-600 text-white rounded-br-none dark:bg-primary-500"
                    : "bg-gray-100 text-gray-900 rounded-bl-none dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                    <span className="text-[10px] font-bold">AI</span>
                  </div>
                )}
                <div className="flex-1 whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              </div>
            </div>
          ))}

          {/* Loader indicator when loading */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-center gap-3 rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3 text-sm dark:bg-gray-800 dark:text-gray-100">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                  <span className="text-[10px] font-bold">AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Loader size="sm" label="Assistant is thinking..." />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Assistant is writing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSend}
          className="border-t border-gray-100 p-4 dark:border-gray-800"
        >
          <div className="flex gap-2">
            <Input
              placeholder="Ask me about homestays (e.g. 'homestays in Rishikesh' or 'under Rs. 2000')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1"
              autoFocus
              required
            />
            <Button type="submit" disabled={loading} variant="primary" className="shrink-0 gap-1.5">
              Send
              <svg className="h-4 w-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
