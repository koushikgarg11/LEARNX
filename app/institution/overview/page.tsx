"use client";

import React, { useState, useRef } from "react";
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
  FileText,
  RefreshCw,
  X,
  FileSpreadsheet,
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
import { AppNavbar } from "@/components/navigation/app-navbar";

interface SyllabusAnalysisResult {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  programTitle: string;
  alignmentScore: number;
  practicalCoverage: number;
  extractedModulesCount: number;
  curriculumBreakdown: {
    subject: string;
    status: string;
    rating: string;
    recom: string;
    action: string;
  }[];
}

const DEFAULT_ANALYSIS: SyllabusAnalysisResult = {
  fileName: "BCom_Applied_Analytics_2026.pdf",
  fileSize: "1.4 MB",
  uploadedAt: "Today at 11:30 AM",
  programTitle: "B.Com (Computer Applications) 2025–2026 • 6 Semesters",
  alignmentScore: 64.2,
  practicalCoverage: 71.8,
  extractedModulesCount: 24,
  curriculumBreakdown: [
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
  ],
};

export default function InstitutionOverviewPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<SyllabusAnalysisResult>(DEFAULT_ANALYSIS);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  const processFile = (file: File) => {
    setIsScanning(true);
    setScanProgress(15);
    setScanStatusText("Parsing syllabus text & document structure...");

    setTimeout(() => {
      setScanProgress(45);
      setScanStatusText("Extracting course modules, topics & lab hour allocations...");
    }, 600);

    setTimeout(() => {
      setScanProgress(80);
      setScanStatusText("Cross-referencing against NASSCOM FutureSkills & NCS taxonomy...");
    }, 1200);

    setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);

      const sizeFormatted =
        file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
          : Math.round(file.size / 1024) + " KB";

      const isTech =
        file.name.toLowerCase().includes("tech") ||
        file.name.toLowerCase().includes("cs") ||
        file.name.toLowerCase().includes("data");

      const newAnalysis: SyllabusAnalysisResult = {
        fileName: file.name,
        fileSize: sizeFormatted,
        uploadedAt: "Just now",
        programTitle: isTech
          ? `${file.name.replace(/\.[^/.]+$/, "")} (Technical Degree Program)`
          : `${file.name.replace(/\.[^/.]+$/, "")} (Modernized Curriculum Cohort)`,
        alignmentScore: isTech ? 76.5 : 68.4,
        practicalCoverage: isTech ? 78.2 : 72.0,
        extractedModulesCount: 18,
        curriculumBreakdown: isTech
          ? [
              {
                subject: "Cloud Architecture & Microservices",
                status: "High Industry Relevance",
                rating: "84% Practical Coverage",
                recom: "Strong Docker/Kubernetes lab coverage; add serverless Vercel Function integration modules.",
                action: "Serverless Lab Added",
              },
              {
                subject: "Data Structures & Relational SQL",
                status: "Solid Core Theory",
                rating: "72% Practical Coverage",
                recom: "Include real-world transaction logs and query optimization indexing drills.",
                action: "PostgreSQL Sandbox Ready",
              },
              {
                subject: "Generative AI & Agentic Systems",
                status: "Emerging Skill Opportunity",
                rating: "40% Practical Coverage",
                recom: "Update syllabus to cover LLM orchestration, RAG patterns, and prompt safety.",
                action: "AI Curriculum Approved",
              },
            ]
          : [
              {
                subject: "Financial Accounting & Business Modeling",
                status: "Core Strength",
                rating: "85% Practical Coverage",
                recom: "Integrate Advanced Excel dynamic financial tables and scenario sensitivity models.",
                action: "Excel Lab Integrated",
              },
              {
                subject: "Commercial Analytics & SQL Queries",
                status: "High Improvement Need",
                rating: "48% Practical Coverage",
                recom: "Introduce retail case studies with real Indian retail store transaction data.",
                action: "Virtual Workplace Enabled",
              },
              {
                subject: "Executive Business Communication",
                status: "Well Aligned",
                rating: "70% Practical Coverage",
                recom: "Include executive memo writing and visual data storytelling rubrics.",
                action: "Rubrics Synchronized",
              },
            ],
      };

      setAnalysisResult(newAnalysis);
      setUploadSuccessToast(
        `Successfully ingested and analyzed "${file.name}"! Curriculum alignment updated to ${newAnalysis.alignmentScore}%.`
      );
      setTimeout(() => setUploadSuccessToast(null), 5000);
    }, 1800);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in-50 duration-300">
        {/* Upload Toast */}
        {uploadSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-800 animate-in fade-in slide-in-from-bottom-5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{uploadSuccessToast}</span>
            <button
              onClick={() => setUploadSuccessToast(null)}
              className="text-slate-400 hover:text-white ml-2"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

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
              onClick={() =>
                alert(
                  `Academic Council Curriculum Report generated for "${analysisResult.programTitle}". Download package prepared with cryptographic verification hash.`
                )
              }
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
              <div className="text-2xl font-black text-blue-600 mt-1">
                {analysisResult.alignmentScore}%
              </div>
              <p className="text-[10px] text-blue-600 font-medium mt-0.5">
                {analysisResult.alignmentScore >= 70 ? "High Alignment" : "Moderate Alignment"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Practical Lab Coverage
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {analysisResult.practicalCoverage}%
              </div>
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
          {/* Functional Upload & Program Selection */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Curriculum Syllabus Scanner</CardTitle>
              <CardDescription className="text-xs">
                Upload university syllabus to extract topics and map to national skill taxonomy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept=".pdf,.docx,.doc,.txt,.csv"
                className="hidden"
              />

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleTriggerFileInput}
                className={`border-2 border-dashed rounded-xl p-6 text-center space-y-3 cursor-pointer transition-all ${
                  isDragging
                    ? "border-blue-600 bg-blue-50/80 scale-[1.02]"
                    : "border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Click to Upload or Drag & Drop Syllabus
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Supports PDF, DOCX, DOC, or TXT format (up to 25 MB)
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-xs font-semibold pointer-events-none"
                >
                  Select File from Computer
                </Button>
              </div>

              {/* Scanning Progress Animation */}
              {isScanning && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-2 animate-in fade-in-50">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span className="flex items-center">
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin text-blue-600" />
                      Analyzing Curriculum Document...
                    </span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} />
                  <p className="text-[11px] text-blue-700/80">{scanStatusText}</p>
                </div>
              )}

              {/* Ingested File Details Card */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Active Syllabus File
                  </span>
                  <Badge variant="success" className="text-[10px] font-semibold">
                    ✓ Ingested
                  </Badge>
                </div>
                <div className="flex items-start space-x-2.5">
                  <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 truncate">
                      {analysisResult.fileName}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {analysisResult.fileSize} • Uploaded {analysisResult.uploadedAt}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-medium">
                  {analysisResult.programTitle}
                </p>
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
                <span className="text-xs text-slate-500">
                  Benchmark: National Industry Taxonomy
                </span>
              </div>
              <CardTitle className="text-base font-bold">
                Curriculum-to-Industry Alignment Analysis
              </CardTitle>
              <CardDescription className="text-xs">
                Non-adversarial gap analysis: Identifies theoretical coverage versus hands-on workplace lab requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {analysisResult.curriculumBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-900">{item.subject}</h4>
                        <span className="text-[11px] text-amber-700 font-medium">
                          {item.status}
                        </span>
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
                      <button
                        onClick={() =>
                          alert(
                            `Template opened for "${item.subject}". Lab hours, exercises, and rubrics available for faculty download.`
                          )
                        }
                        className="text-blue-600 font-bold hover:underline"
                      >
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
