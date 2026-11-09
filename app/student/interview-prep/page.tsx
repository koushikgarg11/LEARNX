"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Mic,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Award,
  Video,
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

export default function InterviewPrepPage() {
  const [interviewType, setInterviewType] = useState<"technical" | "behavioral">(
    "technical"
  );
  const [activeQuestion, setActiveQuestion] = useState(
    "Walk me through your OmniRetail data project. How did you handle store-level stockouts in your SQL queries?"
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<null | {
    score: number;
    positives: string;
    improvements: string;
  }>(null);
  const [evaluating, setEvaluating] = useState(false);

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setFeedback({
        score: 86,
        positives:
          "Strong explanation of the business impact and why CTEs were preferred over nested subqueries for query readability.",
        improvements:
          "Make sure to explicitly mention how your analysis influenced the COO's inventory reallocation decision.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Interview & Workplace Readiness
            </Badge>
            <span className="text-xs text-slate-400 font-medium">STAR Behavioral & Technical Practice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            AI Interview Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Practice answering technical scenario drills and behavioral questions with instant rubric evaluations.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => {
              setInterviewType("technical");
              setActiveQuestion(
                "Walk me through your OmniRetail data project. How did you handle store-level stockouts in your SQL queries?"
              );
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              interviewType === "technical"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Technical Drill
          </button>
          <button
            onClick={() => {
              setInterviewType("behavioral");
              setActiveQuestion(
                "Tell me about a situation where your initial data analysis conflicted with what a senior manager believed. How did you handle it?"
              );
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              interviewType === "behavioral"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Behavioral (STAR)
          </button>
        </div>
      </div>

      {/* Simulator Card */}
      <Card className="border-slate-200/90 shadow-sm bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Interviewer Prompt ({interviewType === "technical" ? "Technical Lead" : "Hiring Manager"})
            </span>
            <Badge variant="secondary" className="text-[10px]">
              Simulated Hiring Round
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold text-slate-900 mt-1">
            "{activeQuestion}"
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Structure your response with clear context, specific tools used, quantitative outcome, and business reflection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your interview answer here or outline your STAR structure..."
              className="w-full rounded-xl border border-slate-200 p-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Evaluated against standard NASSCOM and Big Tech hiring rubrics.
            </span>
            <Button
              onClick={handleEvaluate}
              disabled={evaluating || !userAnswer.trim()}
              className="text-xs font-semibold shadow-sm"
            >
              {evaluating ? (
                "Analyzing Response..."
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> Evaluate Answer
                </>
              )}
            </Button>
          </div>

          {feedback && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-slate-800 text-xs space-y-3 animate-in fade-in-50">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-950">
                  Rubric Assessment Score: {feedback.score}/100
                </span>
                <Badge variant="success" className="text-[10px]">
                  Strong Response
                </Badge>
              </div>
              <div className="space-y-1.5">
                <p>
                  <strong className="text-emerald-700">What went well:</strong> {feedback.positives}
                </p>
                <p>
                  <strong className="text-amber-700">Recommended Improvement:</strong> {feedback.improvements}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
