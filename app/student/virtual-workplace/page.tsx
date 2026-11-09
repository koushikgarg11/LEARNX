"use client";

import React, { useState } from "react";
import {
  Building,
  Terminal,
  CheckCircle2,
  FileText,
  Send,
  AlertTriangle,
  Play,
  Download,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
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
import { Progress } from "@/components/ui/progress";
import { MOCK_PROJECTS, VirtualCompanyProject } from "@/lib/data/mock-data";

export default function VirtualWorkplacePage() {
  const [selectedProject, setSelectedProject] = useState<VirtualCompanyProject>(
    MOCK_PROJECTS[0]
  );
  const [activeTaskStep, setActiveTaskStep] = useState(1);
  const [sqlQuery, setSqlQuery] = useState(
    `WITH StoreAggregates AS (\n  SELECT \n    store_id,\n    city,\n    tier,\n    SUM(sales_amount) as total_revenue,\n    AVG(stockout_rate) as avg_stockouts\n  FROM pos_transactions\n  WHERE date >= '2026-01-01'\n  GROUP BY store_id, city, tier\n)\nSELECT \n  *,\n  DENSE_RANK() OVER (ORDER BY total_revenue DESC) as revenue_rank\nFROM StoreAggregates\nWHERE avg_stockouts > 0.12\nORDER BY revenue_rank ASC;`
  );
  const [submissionFeedback, setSubmissionFeedback] = useState<null | {
    passed: boolean;
    score: number;
    mentorNotes: string;
    unlockedSkill: string;
  }>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback({
        passed: true,
        score: 91,
        mentorNotes:
          "Excellent usage of CTEs and window function ranking. Identified tier-2 stockout clusters without cartesian product bottlenecks. Rubric verified by Lead Reviewer Dr. Venkatraman.",
        unlockedSkill: "SQL & Relational Databases (Proficient)",
      });
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Disclaimer Alert as mandated in spec */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start space-x-3">
        <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Simulated Workplace Disclosure:</strong> LEARNX Virtual Workplace simulations provide structured, rubric-assessed workplace practice on realistic business problem statements. These simulations demonstrate practical competency for portfolio evidence and do not constitute legal employment or formal paid apprenticeship.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Feature 3: Virtual Company
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Departmental Workplace Simulations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Virtual Office: {selectedProject.department}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Work as an associate at <strong>{selectedProject.companyName}</strong>. Solve real data problems, submit code/dashboards, and receive rubric-based mentor reviews.
          </p>
        </div>

        {/* Department Switcher */}
        <div className="flex flex-wrap gap-2">
          {MOCK_PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProject(proj);
                setSubmissionFeedback(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                selectedProject.id === proj.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {proj.department}
            </button>
          ))}
        </div>
      </div>

      {/* Business Problem Briefing */}
      <Card className="border-slate-200/80 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="default" className="text-[10px]">
              Assigned Business Case
            </Badge>
            <span className="text-xs font-bold text-slate-600">
              Difficulty: {selectedProject.difficulty}
            </span>
          </div>
          <CardTitle className="text-xl font-bold text-slate-900">
            {selectedProject.title}
          </CardTitle>
          <CardDescription className="text-xs text-slate-600 leading-relaxed pt-1">
            {selectedProject.businessContext}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Deliverable Objectives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedProject.objectives.map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Workplace Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Workflow Step Breakdown */}
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Standard Operating Procedure</CardTitle>
              <CardDescription className="text-xs">Follow the 4-step workplace protocol</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedProject.tasks.map((task) => (
                <div
                  key={task.step}
                  onClick={() => setActiveTaskStep(task.step)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeTaskStep === task.step
                      ? "border-blue-500 bg-blue-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                      Step {task.step}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {task.tool}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{task.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {task.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assessment Rubric Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Mentor Grading Rubric</CardTitle>
              <CardDescription className="text-xs">Clear expectations before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedProject.rubric.map((r, i) => (
                <div key={i} className="text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{r.criterion}</span>
                    <span className="text-blue-600">{r.weight * 100}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{r.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Code & Solution Submission Arena */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-blue-600" />
                  <CardTitle className="text-sm font-bold">
                    Virtual Terminal & Deliverable Editor
                  </CardTitle>
                </div>
                <Badge variant="outline" className="text-[10px] text-slate-600">
                  PostgreSQL / SQLite Sandbox
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Draft and validate your analysis code against sample database schemas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-emerald-400">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[10px] text-slate-400">
                  <span>workspace/queries/turnaround_analysis.sql</span>
                  <span className="text-emerald-500">Connected: OmniRetail_POS_Replica</span>
                </div>
                <textarea
                  rows={10}
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="w-full bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none selection:bg-slate-700"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500">
                  <span>Target Rubric Threshold: <strong>80% Passing</strong></span>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Button
                    onClick={handleSubmitSolution}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto text-xs font-semibold shadow-sm"
                  >
                    {isSubmitting ? (
                      "Running Rubric Evaluation..."
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 mr-1.5" /> Submit for Mentor Review
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Rubric Evaluation Result Feedback */}
              {submissionFeedback && (
                <div className="mt-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50/90 text-emerald-900 animate-in fade-in-50 duration-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-emerald-600" />
                      <strong className="font-bold text-sm">
                        Submission Approved • Score: {submissionFeedback.score}/100
                      </strong>
                    </div>
                    <Badge variant="success" className="text-[10px] font-bold">
                      Competency Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-emerald-800">
                    {submissionFeedback.mentorNotes}
                  </p>
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs font-semibold">
                    <span>Minted to Skill Passport: {submissionFeedback.unlockedSkill}</span>
                    <a
                      href="/student/skill-passport"
                      className="text-blue-700 hover:underline flex items-center"
                    >
                      View in Passport <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
