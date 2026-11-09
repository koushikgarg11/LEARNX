"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  Search,
  Filter,
  Award,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  PlusCircle,
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

interface CandidateCandidateRecord {
  id: string;
  name: string;
  education: string;
  institution: string;
  targetRole: string;
  readinessScore: number;
  verifiedSkills: string[];
  consentStatus: "Verified Consent Granted" | "Pending";
  recentProject: string;
}

const CANDIDATES: CandidateCandidateRecord[] = [
  {
    id: "cand-01",
    name: "Aarav Sharma",
    education: "B.Com (Computer Applications)",
    institution: "Delhi University",
    targetRole: "Junior Data Analyst",
    readinessScore: 82,
    verifiedSkills: ["SQL & Relational DBs", "Advanced Excel", "Power BI"],
    consentStatus: "Verified Consent Granted",
    recentProject: "OmniRetail POS 250k-Row Turnaround Analysis",
  },
  {
    id: "cand-02",
    name: "Ananya Deshmukh",
    education: "B.Tech Computer Science",
    institution: "Pune University",
    targetRole: "Full Stack Engineer",
    readinessScore: 89,
    verifiedSkills: ["React & TypeScript", "Node.js APIs", "SQL & Relational DBs"],
    consentStatus: "Verified Consent Granted",
    recentProject: "Real-time Distributed Event Notification Queue",
  },
  {
    id: "cand-03",
    name: "Vikram Sen",
    education: "BBA (Finance)",
    institution: "St. Xavier's Kolkata",
    targetRole: "Associate Business Analyst",
    readinessScore: 78,
    verifiedSkills: ["Business Problem Structuring", "Advanced Excel"],
    consentStatus: "Verified Consent Granted",
    recentProject: "BharatFin MSME Credit Default Risk Model",
  },
];

export default function EmployerOverviewPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = CANDIDATES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.targetRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.verifiedSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in-50 duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="purple" className="text-[10px] font-bold">
                Employer Intelligence Portal
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Competency-Based Talent Discovery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Employer Hiring & Challenge Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Company: <strong className="text-slate-800">OmniRetail India / Enterprise Talent Network</strong>. Discover candidates with verified competency evidence shared exclusively with explicit student consent.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => alert("New Employer Workplace Challenge created and published to LearnX Challenge Marketplace.")}
              className="text-xs font-semibold shadow-sm"
            >
              <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> Publish Industry Challenge
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active Job Profiles
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">4</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Analyst, Engineer, Associate</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Candidate Matches (Consent Granted)
              </span>
              <div className="text-2xl font-black text-blue-600 mt-1">142</div>
              <p className="text-[10px] text-blue-600 font-medium mt-0.5">Scored &gt; 75% Readiness</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Interview Conversion Rate
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">48.5%</div>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">3.2x traditional resumes</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                6-Month Retention
              </span>
              <div className="text-2xl font-black text-purple-600 mt-1">94%</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Verified freshers retained</p>
            </CardContent>
          </Card>
        </div>

        {/* Candidate Search & Evidence Explorer */}
        <Card className="border-slate-200/90 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Verified Candidate Discovery
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Review portfolios with authenticated project deliverables and mentor rubrics.
                </CardDescription>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by skill, role or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {filteredCandidates.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-blue-400 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                      <Badge variant="success" className="text-[10px] font-semibold">
                        {c.consentStatus}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      {c.education} • {c.institution} • Target: <strong className="text-slate-700">{c.targetRole}</strong>
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.verifiedSkills.map((sk, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5 text-[10px] font-semibold"
                        >
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end space-x-6 border-t lg:border-t-0 pt-3 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <span className="text-lg font-black text-slate-900">
                        {c.readinessScore}%
                      </span>
                      <span className="block text-[10px] text-slate-400 font-semibold">
                        Role Match
                      </span>
                    </div>

                    <a
                      href="/student/skill-passport"
                      className="inline-flex items-center text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3 py-2 transition-colors"
                    >
                      Inspect Evidence Passport <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
