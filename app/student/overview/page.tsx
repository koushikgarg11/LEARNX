"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Target,
  Award,
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderGit2,
  Sparkles,
  BarChart3,
  BookOpen,
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
import { Progress } from "@/components/ui/progress";
import {
  CURRENT_LEARNER,
  INITIAL_SKILLS,
  INITIAL_JOB_ROLES,
  MOCK_PASSPORT_ENTRIES,
} from "@/lib/data/mock-data";

export default function StudentOverviewPage() {
  const targetRole =
    INITIAL_JOB_ROLES.find((r) => r.id === CURRENT_LEARNER.targetRole) ||
    INITIAL_JOB_ROLES[0];

  const demonstrated = CURRENT_LEARNER.digitalTwin.demonstratedSkills;
  const partial = CURRENT_LEARNER.digitalTwin.partiallyDemonstratedSkills;
  const unassessed = CURRENT_LEARNER.digitalTwin.unassessedSkills;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-blue-900/10">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
            <Cpu className="h-3.5 w-3.5 text-blue-200" />
            <span>Digital Twin Active • Updated Today</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {CURRENT_LEARNER.name}!
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
            Education: <span className="font-semibold text-white">{CURRENT_LEARNER.education}</span> at {CURRENT_LEARNER.institution}.
            Targeting: <span className="font-semibold text-white">{targetRole.title}</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
          <div className="text-center px-3 border-r border-white/20">
            <div className="flex items-center justify-center text-amber-300 space-x-1">
              <Flame className="h-4 w-4 fill-amber-300" />
              <span className="text-lg font-bold">{CURRENT_LEARNER.digitalTwin.learningStreakDays}</span>
            </div>
            <p className="text-[10px] text-blue-200">Day Streak</p>
          </div>
          <div className="text-center px-3 border-r border-white/20">
            <div className="flex items-center justify-center text-white space-x-1">
              <Clock className="h-4 w-4" />
              <span className="text-lg font-bold">{CURRENT_LEARNER.digitalTwin.hoursLearned}h</span>
            </div>
            <p className="text-[10px] text-blue-200">Logged Hours</p>
          </div>
          <div className="text-center px-3">
            <div className="flex items-center justify-center text-emerald-300 space-x-1">
              <Award className="h-4 w-4" />
              <span className="text-lg font-bold">{MOCK_PASSPORT_ENTRIES.length}</span>
            </div>
            <p className="text-[10px] text-blue-200">Verified Skills</p>
          </div>
        </div>
      </div>

      {/* Feature 1: The Learning Digital Twin & Explainable Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Profile */}
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="default" className="text-[10px] font-bold">
                Feature 1
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Explainable Metric</span>
            </div>
            <CardTitle className="text-lg font-bold">Demonstrated Readiness Profile</CardTitle>
            <CardDescription className="text-xs">
              Based on assessed tasks and verified mentor rubrics, not course views.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                  <div className="text-center">
                    <span className="text-3xl font-black text-slate-900">
                      {CURRENT_LEARNER.readinessScore}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Target Match
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-emerald-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                  Fully Demonstrated
                </span>
                <span className="font-bold text-slate-800">{demonstrated.length} skills</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-amber-700 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                  Partially Demonstrated
                </span>
                <span className="font-bold text-slate-800">{partial.length} skills</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center text-slate-600 font-medium">
                  <HelpCircle className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                  Unassessed / In Queue
                </span>
                <span className="font-bold text-slate-800">{unassessed.length} skills</span>
              </div>
            </div>

            <Link href="/student/skill-gap" className="block">
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                View Full Skill-Gap Decomposition <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Learning Digital Twin Competency Matrix */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="purple" className="text-[10px] font-bold">
                Learning Digital Twin
              </Badge>
              <span className="text-xs text-slate-500">Target Role: {targetRole.title}</span>
            </div>
            <CardTitle className="text-lg font-bold">Evidence-Based Competency Vector</CardTitle>
            <CardDescription className="text-xs">
              Continuously synchronized with your Arena drills, Virtual Workplace deliverables, and Mentor approvals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INITIAL_SKILLS.slice(0, 6).map((skill) => {
                const isDemonstrated = demonstrated.includes(skill.id);
                const isPartial = partial.includes(skill.id);
                const status = isDemonstrated
                  ? "Demonstrated"
                  : isPartial
                  ? "In Progress"
                  : "Unassessed";
                const badgeVariant = isDemonstrated
                  ? "success"
                  : isPartial
                  ? "warning"
                  : "secondary";

                return (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900">{skill.name}</p>
                        <p className="text-[10px] text-slate-500">{skill.category} • {skill.assessmentType}</p>
                      </div>
                      <Badge variant={badgeVariant as any} className="text-[10px] px-1.5 py-0">
                        {status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Demand Index: <strong className="text-slate-800">{skill.demandIndex}/100</strong></span>
                      <span>Est: {skill.learningEffortHours} hrs</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommended Next Action */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-950">Recommended Immediate Action</p>
                  <p className="text-[11px] text-blue-800/80">
                    Complete Step 2 (Cohort Analysis) in <strong>OmniRetail Workplace Simulation</strong> to close your Power BI gap.
                  </p>
                </div>
              </div>
              <Link href="/student/virtual-workplace" className="shrink-0">
                <Button size="sm" className="text-xs font-semibold">
                  Launch Simulation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Launch Cards for Innovative Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-blue-400 transition-colors shadow-sm">
          <CardHeader>
            <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
              <Building className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold">Virtual Workplace</CardTitle>
            <CardDescription className="text-xs">
              Step into simulated enterprise departments: Retail Analytics, FinTech Lending & HR.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/virtual-workplace">
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                Open Virtual Office <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-400 transition-colors shadow-sm">
          <CardHeader>
            <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
              <Award className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold">Evidence Skill Passport</CardTitle>
            <CardDescription className="text-xs">
              View your tamper-verifiable credentials and share them with approved employers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/skill-passport">
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                View Passport & Evidence <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-purple-400 transition-colors shadow-sm">
          <CardHeader>
            <div className="h-9 w-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-1">
              <Sparkles className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold">Career Pathway Simulator</CardTitle>
            <CardDescription className="text-xs">
              What-if simulations: Compare effort hours, salary potential, and transition milestones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/career-path">
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                Simulate Pathways <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
