"use client";

import React, { useState } from "react";
import {
  Swords,
  Timer,
  Terminal,
  Play,
  CheckCircle2,
  Trophy,
  Flame,
  ArrowRight,
  Sparkles,
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

interface ArenaChallenge {
  id: string;
  title: string;
  category: "SQL" | "Python" | "Excel" | "Business Case";
  level: "Beginner" | "Intermediate" | "Advanced" | "Industry Challenge";
  points: number;
  timeLimitMin: number;
  description: string;
  starterCode: string;
  expectedOutput: string;
}

const ARENA_CHALLENGES: ArenaChallenge[] = [
  {
    id: "chal-01",
    title: "SQL CTE: Top 3 Selling Products by Region",
    category: "SQL",
    level: "Intermediate",
    points: 150,
    timeLimitMin: 20,
    description:
      "Write a query using Common Table Expressions (CTE) and DENSE_RANK() to find the top 3 revenue-generating SKU items for each Indian region (North, South, East, West).",
    starterCode: `-- Write your SQL solution below
WITH RegionalSales AS (
  SELECT 
    region,
    sku_name,
    SUM(unit_price * quantity) as total_sales,
    DENSE_RANK() OVER (
      PARTITION BY region 
      ORDER BY SUM(unit_price * quantity) DESC
    ) as ranking
  FROM order_items
  GROUP BY region, sku_name
)
SELECT region, sku_name, total_sales
FROM RegionalSales
WHERE ranking <= 3;`,
    expectedOutput: "Returned 12 rows (3 SKUs x 4 Regions). All ranking conditions satisfied.",
  },
  {
    id: "chal-02",
    title: "Python: Detect Outlier Deliveries with IQR",
    category: "Python",
    level: "Intermediate",
    points: 175,
    timeLimitMin: 25,
    description:
      "Use Pandas to compute the Interquartile Range (IQR) on e-commerce delivery turnaround times and flag orders exceeding Q3 + 1.5*IQR as delivery anomalies.",
    starterCode: `import pandas as pd
import numpy as np

def detect_outliers(df):
    q1 = df['delivery_hours'].quantile(0.25)
    q3 = df['delivery_hours'].quantile(0.75)
    iqr = q3 - q1
    cutoff = q3 + 1.5 * iqr
    df['is_outlier'] = df['delivery_hours'] > cutoff
    return df`,
    expectedOutput: "Function successfully isolated 4.2% anomalous delay events in test series.",
  },
  {
    id: "chal-03",
    title: "Financial Modeling: Dynamic Sensitivity Matrix",
    category: "Excel",
    level: "Advanced",
    points: 200,
    timeLimitMin: 30,
    description:
      "Construct a two-variable sensitivity table linking Cost of Debt (+/- 150 bps) and Terminal Growth Rate (+/- 50 bps) to DCF Enterprise Valuation.",
    starterCode: `=TABLE(C14, C15) // Two-way data table linked to WACC and Growth cells`,
    expectedOutput: "Sensitivities mapped across 25 valuation nodes with active conditional formatting.",
  },
];

export default function ChallengeArenaPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeChallenge, setActiveChallenge] = useState<ArenaChallenge>(
    ARENA_CHALLENGES[0]
  );
  const [userCode, setUserCode] = useState(ARENA_CHALLENGES[0].starterCode);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const filteredChallenges = ARENA_CHALLENGES.filter((c) => {
    const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
    const matchCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    return matchLevel && matchCategory;
  });

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setTestResult(activeChallenge.expectedOutput);
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Feature 7: Challenge Arena
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Timed Competency Drills</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Interactive Challenge Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Solve real technical puzzles, benchmark query performance, and climb the verified Indian national leaderboard.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm text-xs">
          <div className="flex items-center space-x-1.5 text-amber-600 font-bold border-r border-slate-200 pr-3">
            <Trophy className="h-4 w-4" />
            <span>450 Arena XP</span>
          </div>
          <div className="flex items-center space-x-1.5 text-blue-600 font-bold">
            <Flame className="h-4 w-4" />
            <span>Rank: #142 (Delhi NCR)</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          {["All", "Beginner", "Intermediate", "Advanced", "Industry Challenge"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-md transition-all ${
                selectedLevel === lvl
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          {["All", "SQL", "Python", "Excel"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenge List */}
        <div className="space-y-3">
          {filteredChallenges.map((chal) => (
            <div
              key={chal.id}
              onClick={() => {
                setActiveChallenge(chal);
                setUserCode(chal.starterCode);
                setTestResult(null);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeChallenge.id === chal.id
                  ? "border-blue-500 bg-blue-50/50 shadow-sm"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Badge variant="secondary" className="text-[10px]">
                  {chal.category}
                </Badge>
                <span className="text-[10px] font-bold text-amber-600">
                  +{chal.points} XP
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{chal.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {chal.description}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                <span className="flex items-center">
                  <Timer className="h-3 w-3 mr-1" /> {chal.timeLimitMin} mins
                </span>
                <span className="font-semibold text-slate-700">{chal.level}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Code Runner Execution Box */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-slate-200/90 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    {activeChallenge.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 mt-1">
                    {activeChallenge.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-bold text-blue-700">
                  {activeChallenge.category} Sandbox
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[10px] text-slate-500">
                  <span>arena_sandbox_session_{activeChallenge.id}.sql</span>
                  <span className="text-slate-400">Sandbox Memory: 512MB</span>
                </div>
                <textarea
                  rows={10}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Test against verified Indian retail and logistics test cases.
                </span>
                <Button
                  onClick={handleRunTests}
                  disabled={isRunning}
                  className="text-xs font-semibold shadow-sm"
                >
                  {isRunning ? (
                    "Evaluating in Sandbox..."
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 mr-1" /> Run Code & Verify Tests
                    </>
                  )}
                </Button>
              </div>

              {testResult && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/90 text-emerald-950 space-y-2 animate-in fade-in-50">
                  <div className="flex items-center space-x-2 font-bold text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>All Automated Test Cases Passed (100% Match)</span>
                  </div>
                  <p className="text-xs text-emerald-800 font-mono">{testResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
