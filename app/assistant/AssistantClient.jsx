"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button, Input, Loader, useToast } from "@/components/ui";

const SUGGESTIONS = [
  "Homestays in Mussoorie",
  "Rishikesh river retreats",
  "Budget stay under ₹2500",
  "Eco lodges near treks",
];

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
  const messageIdRef = useRef(0);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const triggerSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    messageIdRef.current += 1;
    const userMsgId = `msg-user-${messageIdRef.current}`;

    // Append user message
    const userMsg = {
      id: userMsgId,
      text: textToSend,
      sender: "user",
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/homestay-assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();

      messageIdRef.current += 1;
      const botMsgId = `msg-bot-${messageIdRef.current}`;

      if (response.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            text: data.reply,
            sender: "bot",
            time: new Date(),
          },
        ]);
      } else {
        const errorMsg = data.message || "Something went wrong while reaching the assistant.";
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            text: `⚠️ **Error:** ${errorMsg}`,
            sender: "bot",
            time: new Date(),
            isError: true,
            retryText: textToSend,
          },
        ]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      messageIdRef.current += 1;
      const errorMsgId = `msg-err-${messageIdRef.current}`;
      setMessages((prev) => [
        ...prev,
        {
          id: errorMsgId,
          text: "⚠️ **Connection Error:** Could not connect to the AI service. Please verify that the backend server is running and try again.",
          sender: "bot",
          time: new Date(),
          isError: true,
          retryText: textToSend,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessageText = input.trim();
    setInput("");
    triggerSendMessage(userMessageText);
  };

  const handleRetry = (retryText, errorId) => {
    // Remove the error message from logs
    setMessages((prev) => prev.filter((m) => m.id !== errorId));
    triggerSendMessage(retryText);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-colors">
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
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">EcoStay AI Assistant</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Ask about homestay locations, prices, contact details, and eco-friendly features in Uttarakhand.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex h-[550px] flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-colors overflow-hidden">
        
        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-gray-950/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] items-start gap-3 rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-200 hover:shadow-md ${
                  msg.sender === "user"
                    ? "bg-primary-600 text-white rounded-br-none dark:bg-primary-500"
                    : msg.isError
                    ? "bg-red-50 text-red-900 border border-red-200 rounded-bl-none dark:bg-red-950/25 dark:text-red-250 dark:border-red-900/30"
                    : "bg-white text-gray-900 border border-gray-200 dark:border-gray-800 rounded-bl-none dark:bg-gray-900 dark:text-gray-100"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                    <span className="text-[10px] font-bold">AI</span>
                  </div>
                )}
                
                <div className="flex-1 leading-relaxed">
                  {msg.sender === "bot" ? (
                    <div className="prose dark:prose-invert max-w-none text-sm space-y-1">
                      <ReactMarkdown
                        components={{
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-1.5 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-1.5 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="text-sm leading-relaxed" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-emerald-700 dark:text-emerald-450" {...props} />,
                          p: ({node, ...props}) => <p className="inline" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  )}

                  {/* Retry Action for errors */}
                  {msg.isError && (
                    <div className="mt-3 pt-2 border-t border-red-200/50 dark:border-red-900/20">
                      <button
                        onClick={() => handleRetry(msg.retryText, msg.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
                      >
                        🔄 Retry sending message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator bubble */}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex max-w-[80%] items-center gap-3 rounded-2xl rounded-bl-none border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                  <span className="text-[10px] font-bold">AI</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Bouncing Typing Animation */}
                  <div className="flex items-center space-x-1 py-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary-600 dark:bg-primary-400 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary-600 dark:bg-primary-400 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary-600 dark:bg-primary-400" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-405">Assistant is preparing details...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Pills */}
        {!loading && (
          <div className="px-6 py-2 bg-gray-50/50 dark:bg-gray-950/20 border-t border-gray-100 dark:border-gray-850 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => triggerSendMessage(s)}
                className="shrink-0 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1 text-xs text-gray-600 dark:text-gray-350 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 dark:hover:bg-primary-950/25 dark:hover:text-primary-400 dark:hover:border-primary-900 transition-all cursor-pointer"
              >
                💡 {s}
              </button>
            ))}
          </div>
        )}

        {/* Input form */}
        <form
          onSubmit={handleSend}
          className="border-t border-gray-100 p-4 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Ask about Uttarakhand homestays (e.g. 'Rishikesh retreats' or 'under ₹2000')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 focus:ring-2 focus:ring-primary-550/20 focus:border-primary-500"
              autoFocus
              required
            />
            <Button type="submit" disabled={loading} variant="primary" className="shrink-0 gap-1.5 shadow-sm shadow-primary-500/20">
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
