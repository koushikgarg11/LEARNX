"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
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
import { MOCK_PROJECTS } from "@/lib/data/mock-data";

export default function ProjectsHubPage() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Real-World Project Hub
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Industry Case Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Industry Deliverable Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Every project has a clear business problem, real dataset, expected deliverables, and objective rubric review.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((proj) => (
          <Card key={proj.id} className="hover:border-blue-400 transition-colors shadow-sm bg-white flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between mb-1">
                <Badge variant="secondary" className="text-[10px]">
                  {proj.department}
                </Badge>
                <span className="text-[10px] font-semibold text-slate-500">
                  {proj.difficulty}
                </span>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 leading-snug">
                {proj.title}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 line-clamp-3 mt-1">
                {proj.businessContext}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                <strong className="text-slate-700 block">Deliverables:</strong>
                <ul className="text-slate-600 list-disc list-inside space-y-0.5">
                  {proj.objectives.slice(0, 2).map((obj, i) => (
                    <li key={i} className="line-clamp-1">{obj}</li>
                  ))}
                </ul>
              </div>

              <Link href="/student/virtual-workplace" className="block">
                <Button size="sm" className="w-full text-xs font-semibold">
                  Start Project in Virtual Office <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
