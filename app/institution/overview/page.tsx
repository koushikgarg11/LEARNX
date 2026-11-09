"use client";

import React, { useState } from "react";
import {
  Building2,
  UploadCloud,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Download,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
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

export default function InstitutionOverviewPage() {
  const [analyzed, setAnalyzed] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in-50 duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="purple" className="text-[10px] font-bold">
                Feature 6: Curriculum Intelligence
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Academic Modernization Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Institution Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Institution: <strong className="text-slate-800">Faculty of Commerce & Technology, Delhi University</strong>.
              Evaluating academic syllabus alignment against active industry demands.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Curriculum Evaluation PDF Report generated for Academic Review Council.")}
              className="text-xs font-semibold"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Download Academic Council Report
            </Button>
          </div>
        </div>

        {/* Institution Macro Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Enrolled Cohort
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">1,420</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Final & Pre-Final Year</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Overall Syllabus Alignment
              </span>
              <div className="text-2xl font-black text-blue-600 mt-1">64.2%</div>
              <p className="text-[10px] text-blue-600 font-medium mt-0.5">Moderate Alignment</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Practical Project Rate
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">71.8%</div>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">+18% YoY growth</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Verified Skill Passports
              </span>
              <div className="text-2xl font-black text-purple-600 mt-1">612</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Active with employer consent</p>
            </CardContent>
          </Card>
        </div>

        {/* Syllabus Analysis Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload & Program Selection */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Curriculum Syllabus Scanner</CardTitle>
              <CardDescription className="text-xs">
                Upload university syllabus to extract topics and map to national skill taxonomy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center space-y-3 bg-slate-50/50">
                <UploadCloud className="h-8 w-8 text-blue-600 mx-auto" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Upload Syllabus Document (PDF/DOCX)
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Scans semester modules, lab hours, and project assignments
                  </p>
                </div>
                <Button size="sm" variant="outline" className="text-xs font-semibold">
                  Select File (e.g. BCom_2026_Syllabus.pdf)
                </Button>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
                <strong className="block font-bold">Active Syllabus Ingested:</strong>
                <p className="text-[11px]">B.Com (Computer Applications) 2025–2026, 6 Semesters, 24 Core Papers.</p>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum-to-Industry Alignment Report */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default" className="text-[10px]">
                  Academic Review Evidence
                </Badge>
                <span className="text-xs text-slate-500">Benchmark: Junior Data Analyst & BI Roles</span>
              </div>
              <CardTitle className="text-base font-bold">Curriculum-to-Industry Alignment Analysis</CardTitle>
              <CardDescription className="text-xs">
                Non-adversarial gap analysis: Identifies theoretical coverage versus hands-on workplace lab requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    subject: "Database Management Systems (Paper 402)",
                    status: "Theoretical Overemphasis",
                    rating: "45% Practical Coverage",
                    recom: "Add mandatory SQL CTE and window function queries on realistic Indian retail databases.",
                    action: "Deploy LearnX SQL Lab Sandbox",
                  },
                  {
                    subject: "Business Statistics & Analytics (Paper 301)",
                    status: "Strong Academic Foundation",
                    rating: "82% Practical Coverage",
                    recom: "Existing hypothesis testing syllabus is solid; integrate Python Pandas exercises into term projects.",
                    action: "Approved in Council",
                  },
                  {
                    subject: "Management Information Systems (Paper 503)",
                    status: "Tool Gap Identified",
                    rating: "38% Practical Coverage",
                    recom: "Syllabus covers theoretical ERP concepts but lacks hands-on Power BI or Tableau dashboarding.",
                    action: "Add Power BI Module",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-900">{item.subject}</h4>
                        <span className="text-[11px] text-amber-700 font-medium">{item.status}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.rating}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      <strong>Modernization Recommendation:</strong> {item.recom}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Action: {item.action}</span>
                      <button className="text-blue-600 font-bold hover:underline">
                        Review Lab Template →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
