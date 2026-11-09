"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  ArrowRight,
  Award,
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

export default function PersonalizedLearningPage() {
  const roadmapModules = [
    {
      week: "Week 1–2",
      title: "SQL Foundations for Analytics",
      status: "Completed",
      hours: "18h",
      deliverable: "Multi-table Joins & Filtering Drills",
      badgeVariant: "success",
    },
    {
      week: "Week 3–4",
      title: "Advanced SQL: CTEs & Window Ranking",
      status: "Verified",
      hours: "22h",
      deliverable: "OmniRetail POS 250k-Row Optimization",
      badgeVariant: "success",
    },
    {
      week: "Week 5–6",
      title: "Power BI DAX & Executive Storytelling",
      status: "In Progress",
      hours: "12h of 20h",
      deliverable: "OmniRetail Supply Chain Turnaround Dashboard",
      badgeVariant: "warning",
    },
    {
      week: "Week 7–8",
      title: "Python Data Analysis (Pandas & Stats)",
      status: "Up Next",
      hours: "25h",
      deliverable: "Retail Cohort Repurchase & Churn Prediction",
      badgeVariant: "secondary",
    },
    {
      week: "Week 9–10",
      title: "Workplace Simulation & Mock Hiring Rounds",
      status: "Queued",
      hours: "15h",
      deliverable: "3 Full Technical & HR Behavioral Simulations",
      badgeVariant: "secondary",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              AI Study Planner
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Personalized 10-Week Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Personalised Learning Pathway
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Calibrated for <strong className="text-slate-800">{CURRENT_LEARNER.weeklyHours} hours/week</strong> towards Junior Data Analyst readiness.
          </p>
        </div>

        <Link href="/student/virtual-workplace">
          <Button size="sm" className="text-xs font-semibold shadow-sm">
            Resume Active Project <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-4">
        {roadmapModules.map((m, idx) => (
          <Card
            key={idx}
            className={`border-slate-200/90 shadow-sm transition-all ${
              m.status === "In Progress" ? "border-blue-500 bg-blue-50/20 shadow-md" : "bg-white"
            }`}
          >
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {m.week}
                  </span>
                  <Badge variant={m.badgeVariant as any} className="text-[10px]">
                    {m.status}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                <p className="text-slate-500 text-[11px]">
                  Practical Deliverable: <strong className="text-slate-700">{m.deliverable}</strong>
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0">
                <span className="text-xs text-slate-500 flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" /> {m.hours}
                </span>

                {m.status === "In Progress" ? (
                  <Link href="/student/virtual-workplace">
                    <Button size="sm" className="text-xs font-semibold">
                      Continue Lab
                    </Button>
                  </Link>
                ) : m.status === "Verified" ? (
                  <Link href="/student/skill-passport">
                    <Button variant="outline" size="sm" className="text-xs font-semibold">
                      View Credential
                    </Button>
                  </Link>
                ) : (
                  <Button variant="ghost" size="sm" disabled className="text-xs text-slate-400">
                    Locked
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
