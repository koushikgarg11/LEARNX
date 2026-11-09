"use client";

import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Briefcase,
  Terminal,
  MessageSquare,
  Building2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ASSISTANT_DIRECTORY,
  AssistantRole,
  AssistantMessage,
  generateAssistantResponse,
} from "@/lib/ai/assistant-service";
import { CURRENT_LEARNER } from "@/lib/data/mock-data";

export default function AIMentorsPage() {
  const [selectedRole, setSelectedRole] = useState<AssistantRole>("learning_mentor");
  const [messages, setMessages] = useState<Record<AssistantRole, AssistantMessage[]>>({
    learning_mentor: [
      {
        id: "msg-init-1",
        sender: "assistant",
        text: ASSISTANT_DIRECTORY.learning_mentor.greeting,
        timestamp: "Just now",
      },
    ],
    career_mentor: [
      {
        id: "msg-init-2",
        sender: "assistant",
        text: ASSISTANT_DIRECTORY.career_mentor.greeting,
        timestamp: "Just now",
      },
    ],
    project_mentor: [
      {
        id: "msg-init-3",
        sender: "assistant",
        text: ASSISTANT_DIRECTORY.project_mentor.greeting,
        timestamp: "Just now",
      },
    ],
    interview_mentor: [
      {
        id: "msg-init-4",
        sender: "assistant",
        text: ASSISTANT_DIRECTORY.interview_mentor.greeting,
        timestamp: "Just now",
      },
    ],
    institution_assistant: [
      {
        id: "msg-init-5",
        sender: "assistant",
        text: ASSISTANT_DIRECTORY.institution_assistant.greeting,
        timestamp: "Just now",
      },
    ],
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const activeMeta = ASSISTANT_DIRECTORY[selectedRole];
  const activeConversation = messages[selectedRole];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedRole]: [...prev[selectedRole], userMsg],
    }));
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await generateAssistantResponse(selectedRole, text, {
        currentRole: CURRENT_LEARNER.education,
        targetRole: CURRENT_LEARNER.targetRole,
        skills: CURRENT_LEARNER.digitalTwin.demonstratedSkills,
      });

      setMessages((prev) => ({
        ...prev,
        [selectedRole]: [...prev[selectedRole], response],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Feature 5: 5 AI Mentors
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Context-Aware Advisory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            AI Mentor & Coaching Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Powered by explainable curriculum heuristics and transparent guidance. AI assistants provide explanations, suggestions, and feedback without making automated hiring decisions.
          </p>
        </div>
      </div>

      {/* 5-Assistant Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(Object.keys(ASSISTANT_DIRECTORY) as AssistantRole[]).map((roleKey) => {
          const meta = ASSISTANT_DIRECTORY[roleKey];
          const isSelected = selectedRole === roleKey;
          return (
            <button
              key={roleKey}
              onClick={() => setSelectedRole(roleKey)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50/80 shadow-sm"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`h-7 w-7 rounded-lg ${meta.avatarColor} text-white flex items-center justify-center`}
                >
                  <Bot className="h-4 w-4" />
                </div>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {meta.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                {meta.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Chat Window */}
      <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col h-[560px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 rounded-lg ${activeMeta.avatarColor} text-white flex items-center justify-center shadow-sm`}>
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{activeMeta.title}</h3>
              <p className="text-[10px] text-slate-500">{activeMeta.tagline}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] text-slate-600">
            Learner Context: Aarav Sharma (B.Com)
          </Badge>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeConversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-800 border border-slate-200/80"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.citations && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 space-y-0.5">
                    <span className="font-bold">Sources & Taxonomy:</span>
                    {msg.citations.map((c, i) => (
                      <span key={i} className="block">• {c}</span>
                    ))}
                  </div>
                )}
                <span
                  className={`block text-[10px] mt-1.5 ${
                    msg.sender === "user" ? "text-blue-100 text-right" : "text-slate-400"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 rounded-2xl px-4 py-2 text-xs flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Sample Prompt Shortcuts */}
        <div className="p-2 border-t border-slate-100 bg-white flex flex-wrap gap-1.5 overflow-x-auto">
          {activeMeta.samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-700 transition-colors shrink-0"
            >
              💬 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Ask ${activeMeta.title}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button
            size="sm"
            onClick={() => handleSendMessage()}
            className="text-xs font-semibold shadow-sm"
          >
            <Send className="h-3.5 w-3.5 mr-1" /> Send
          </Button>
        </div>
      </Card>
    </div>
  );
}
