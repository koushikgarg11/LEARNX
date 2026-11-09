"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Award,
  CheckCircle2,
  Clock,
  FileCheck2,
  Send,
  Sparkles,
  ExternalLink,
  AlertCircle,
  ChevronRight,
  TrendingUp,
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
import { AppNavbar } from "@/components/navigation/app-navbar";

interface PendingSubmission {
  id: string;
  studentName: string;
  studentRole: string;
  projectName: string;
  submittedAt: string;
  toolsUsed: string;
  status: "Pending Evaluation" | "Approved" | "Revisions Requested";
  rubricItems: {
    name: string;
    score: number;
    max: number;
  }[];
}

const INITIAL_SUBMISSIONS: PendingSubmission[] = [
  {
    id: "sub-101",
    studentName: "Verified Learner #101",
    studentRole: "Target: Junior Data Analyst",
    projectName: "OmniRetail POS 250k-Row Turnaround Analysis",
    submittedAt: "2 hours ago",
    toolsUsed: "PostgreSQL, CTEs, Power BI",
    status: "Pending Evaluation",
    rubricItems: [
      { name: "SQL Query Efficiency & Join Structure", score: 32, max: 35 },
      { name: "Analytical Root Cause Identification", score: 33, max: 35 },
      { name: "Dashboard Clarity & KPI Visuals", score: 14, max: 15 },
      { name: "Executive Business Recommendations Memo", score: 13, max: 15 },
    ],
  },
  {
    id: "sub-102",
    studentName: "Ananya Deshmukh",
    studentRole: "Target: Full Stack Developer",
    projectName: "Distributed Workflow Event Queue Engine",
    submittedAt: "5 hours ago",
    toolsUsed: "TypeScript, Redis, Postgres",
    status: "Pending Evaluation",
    rubricItems: [
      { name: "Architecture & Concurrency Safety", score: 38, max: 40 },
      { name: "Idempotency & Retry Protocol", score: 35, max: 35 },
      { name: "Unit & Integration Test Coverage", score: 23, max: 25 },
    ],
  },
];

export default function MentorOverviewPage() {
  const [submissions, setSubmissions] = useState<PendingSubmission[]>(INITIAL_SUBMISSIONS);
  const [activeSub, setActiveSub] = useState<PendingSubmission>(INITIAL_SUBMISSIONS[0]);
  const [feedbackNotes, setFeedbackNotes] = useState(
    "Strong command of SQL window ranking and CTE syntax. The executive turnaround recommendations are operationally sound."
  );
  const [isVerifying, setIsVerifying] = useState(false);

  const calculateTotal = (sub: PendingSubmission) => {
    return sub.rubricItems.reduce((acc, curr) => acc + curr.score, 0);
  };

  const handleApprove = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const updated = submissions.map((s) =>
        s.id === activeSub.id ? { ...s, status: "Approved" as const } : s
      );
      setSubmissions(updated);
      setActiveSub({ ...activeSub, status: "Approved" });
      alert(
        `Competency verified! Minted cryptographic skill badge to ${activeSub.studentName}'s Skill Passport.`
      );
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in-50 duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="purple" className="text-[10px] font-bold">
                Mentor Intelligence Hub
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Industry Review Queue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Project Evaluation & Competency Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Lead Reviewer: <strong className="text-slate-800">Dr. R. Venkatraman (Ex-Amazon Analytics Lead)</strong>. Review deliverables against objective workplace rubrics.
            </p>
          </div>
        </div>

        {/* Mentor KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Assigned Mentees
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">18</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Active Learners</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pending Review
              </span>
              <div className="text-2xl font-black text-amber-600 mt-1">
                {submissions.filter((s) => s.status === "Pending Evaluation").length}
              </div>
              <p className="text-[10px] text-amber-600 font-medium mt-0.5">Submissions in queue</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Competencies Minted
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">142</div>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Verified to Passports</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Avg Response Time
              </span>
              <div className="text-2xl font-black text-purple-600 mt-1">18h</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Target &lt; 24h SLA</p>
            </CardContent>
          </Card>
        </div>

        {/* Review Queue & Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">
                Review Queue ({submissions.length})
              </CardTitle>
              <CardDescription className="text-xs">
                Select a submission to grade rubric criteria.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setActiveSub(sub)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all text-xs ${
                    activeSub.id === sub.id
                      ? "border-blue-600 bg-blue-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{sub.studentName}</span>
                    <Badge
                      variant={sub.status === "Approved" ? "success" : "warning"}
                      className="text-[10px]"
                    >
                      {sub.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-slate-700">{sub.projectName}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>{sub.toolsUsed}</span>
                    <span>{sub.submittedAt}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rubric Evaluation Panel */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200/90">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-blue-600">
                      {activeSub.studentName}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{activeSub.studentRole}</span>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 mt-1">
                    {activeSub.projectName}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-blue-700">
                    {calculateTotal(activeSub)}/100
                  </span>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                    Cumulative Rubric
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rubric Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Objective Rubric Breakdown
                </h4>
                {activeSub.rubricItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{item.name}</span>
                      <span className="text-blue-600">
                        {item.score} / {item.max} pts
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(item.score / item.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mentor Written Feedback */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mentor Qualitative Feedback (Logged in Student Skill Passport)
                </label>
                <textarea
                  rows={3}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
                />
              </div>

              {/* Approval Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Passing threshold is 80%. Approving will cryptographically mint this competency.
                </span>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Button
                    onClick={handleApprove}
                    disabled={isVerifying || activeSub.status === "Approved"}
                    className="w-full sm:w-auto text-xs font-semibold shadow-sm"
                  >
                    {isVerifying ? (
                      "Minting Credential..."
                    ) : activeSub.status === "Approved" ? (
                      "✓ Competency Approved"
                    ) : (
                      <>
                        <Award className="h-3.5 w-3.5 mr-1" /> Approve & Mint to Skill Passport
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
