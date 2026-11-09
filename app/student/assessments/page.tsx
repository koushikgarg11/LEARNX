"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Award,
  AlertCircle,
  FileCheck2,
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

interface AssessmentQuestion {
  id: string;
  category: "Technical SQL" | "Business Problem Solving" | "Power BI / Excel";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q-1",
    category: "Technical SQL",
    prompt:
      "You have an Indian retail orders table with 500,000 rows. You need to calculate the 7-day rolling average revenue for each city. Which SQL approach guarantees correct temporal ordering within each city?",
    options: [
      "AVG(revenue) OVER (PARTITION BY city ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
      "GROUP BY city, order_date HAVING COUNT(*) >= 7",
      "AVG(revenue) OVER (ORDER BY city, order_date)",
      "SELECT city, AVG(revenue) FROM orders GROUP BY ROLLUP(city)",
    ],
    correctIndex: 0,
    explanation:
      "Window functions using PARTITION BY city and ORDER BY order_date with a rolling ROWS window compute continuous moving averages without collapsing row granularities.",
  },
  {
    id: "q-2",
    category: "Business Problem Solving",
    prompt:
      "An executive at an Indian e-commerce platform observes that customer cart abandonment surged from 42% to 68% in tier-2 cities after launching a new festive campaign. What is the first exploratory hypothesis to validate?",
    options: [
      "Check payment gateway error logs and COD (Cash on Delivery) availability thresholds in tier-2 pincodes.",
      "Immediately fire the marketing agency that created the festive creatives.",
      "Increase the digital ad spend budget by 30% to compensate for churn.",
      "Redesign the entire database schema to optimize cart read latency.",
    ],
    correctIndex: 0,
    explanation:
      "In Indian e-commerce, localized payment friction and COD delivery restrictions are the primary operational causes of sudden localized cart abandonment.",
  },
  {
    id: "q-3",
    category: "Power BI / Excel",
    prompt:
      "In Power BI, when you write [Total Sales This Year] = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date])), what happens under the hood?",
    options: [
      "It modifies the current date filter context by shifting the date intervals exactly one year back.",
      "It deletes all sales records from last year to recalculate totals.",
      "It converts the measure into a static calculated table column.",
      "It automatically exports the dataset to an Excel workbook.",
    ],
    correctIndex: 0,
    explanation:
      "CALCULATE() alters the existing filter context, and SAMEPERIODLASTYEAR shifts date boundaries one year backward across the date dimension.",
  },
];

export default function AssessmentsPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitAssessment = () => {
    let correctCount = 0;
    ASSESSMENT_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Baseline Assessment Engine
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Competency Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Diagnostic & Competency Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Assessing practical problem-solving ability across SQL, business problem structuring, and analytics tooling.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          <Clock className="h-4 w-4 text-blue-600" />
          <span className="font-semibold text-slate-700">Untimed Diagnostic Mode</span>
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {ASSESSMENT_QUESTIONS.map((q, idx) => {
          const isSelected = selectedAnswers[q.id] !== undefined;
          const isCorrect = submitted && selectedAnswers[q.id] === q.correctIndex;
          const isWrong = submitted && selectedAnswers[q.id] !== q.correctIndex;

          return (
            <Card key={q.id} className="border-slate-200/90 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Question {idx + 1} • {q.category}
                  </span>
                  {submitted && (
                    <Badge variant={isCorrect ? "success" : "destructive"} className="text-[10px]">
                      {isCorrect ? "Correct (+33 pts)" : "Review Explanation"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-sm font-bold text-slate-900 mt-1">
                  {q.prompt}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selectedAnswers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start space-x-3 ${
                          isOptionSelected
                            ? "border-blue-600 bg-blue-50/70 font-semibold text-blue-900 shadow-sm"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <strong className="font-bold text-slate-900 block">Explanation:</strong>
                    <p className="text-[11px] leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action / Results Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <span className="text-xs text-slate-500">
          {Object.keys(selectedAnswers).length} of {ASSESSMENT_QUESTIONS.length} Questions Answered
        </span>

        {!submitted ? (
          <Button
            onClick={handleSubmitAssessment}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="text-xs font-semibold shadow-sm w-full sm:w-auto"
          >
            Submit Diagnostic & Sync Digital Twin
          </Button>
        ) : (
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <span className="text-sm font-black text-blue-600">
              Diagnostic Score: {score}%
            </span>
            <Link href="/student/overview">
              <Button size="sm" className="text-xs font-semibold">
                Return to Digital Twin <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
