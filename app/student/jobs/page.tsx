"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send,
  Building,
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
import { CURRENT_LEARNER } from "@/lib/data/mock-data";

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  stipendOrSalary: string;
  type: "Internship" | "Full-Time";
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  applied: boolean;
}

const OPPORTUNITIES: JobMatch[] = [
  {
    id: "job-01",
    title: "Junior Data Analyst – Commercial Intelligence",
    company: "OmniRetail India",
    location: "Bengaluru / Hybrid",
    stipendOrSalary: "₹6.5 - 7.5 LPA",
    type: "Full-Time",
    matchScore: 82,
    matchedSkills: ["SQL & Relational DBs", "Advanced Excel", "Power BI"],
    missingSkills: ["Python Pandas (In progress)"],
    applied: false,
  },
  {
    id: "job-02",
    title: "Analytics Intern (Retail & Supply Chain)",
    company: "Delhivery Logistics",
    location: "Gurugram / On-site",
    stipendOrSalary: "₹35,000 / month",
    type: "Internship",
    matchScore: 90,
    matchedSkills: ["SQL & Relational DBs", "Advanced Excel"],
    missingSkills: [],
    applied: true,
  },
  {
    id: "job-03",
    title: "Associate Business Analyst",
    company: "Swiggy India",
    location: "Bengaluru / Hybrid",
    stipendOrSalary: "₹7.0 - 8.2 LPA",
    type: "Full-Time",
    matchScore: 68,
    matchedSkills: ["SQL & Relational DBs"],
    missingSkills: ["Business Problem Structuring", "Data Storytelling"],
    applied: false,
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobMatch[]>(OPPORTUNITIES);

  const handleApply = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, applied: true } : j))
    );
    alert(
      "Application submitted with your explicit consent! The employer will view your verified Skill Passport."
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              AI Job & Internship Matcher
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Explainable Hiring Recommendations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Verified Opportunity Matching
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Recommendations explain exactly why you qualify, what competencies you have verified, and what gaps remain. No automated rejections.
          </p>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="border-slate-200/90 shadow-sm bg-white hover:border-blue-400 transition-colors">
            <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-xs">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {job.type}
                  </Badge>
                  <span className="text-slate-400">•</span>
                  <span className="font-semibold text-slate-600 flex items-center">
                    <Building className="h-3 w-3 mr-1" /> {job.company}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {job.location}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                <p className="text-blue-700 font-bold">{job.stipendOrSalary}</p>

                {/* Explainable Matching Breakdown */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-emerald-700 flex items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Verified Match:
                    </span>
                    <span className="text-slate-700">
                      {job.matchedSkills.join(", ")}
                    </span>
                  </div>

                  {job.missingSkills.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-700 flex items-center">
                        <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-600" /> Missing Competency:
                      </span>
                      <span className="text-slate-600">
                        {job.missingSkills.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Match Score & Action */}
              <div className="flex items-center justify-between lg:justify-end space-x-6 border-t lg:border-t-0 pt-3 lg:pt-0 shrink-0">
                <div className="text-left lg:text-right">
                  <span className="text-2xl font-black text-slate-900">
                    {job.matchScore}%
                  </span>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                    Readiness Match
                  </span>
                </div>

                <Button
                  onClick={() => handleApply(job.id)}
                  disabled={job.applied}
                  variant={job.applied ? "secondary" : "default"}
                  className="text-xs font-semibold shadow-sm"
                >
                  {job.applied ? (
                    "✓ Application Sent"
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 mr-1" /> Apply with Passport
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
