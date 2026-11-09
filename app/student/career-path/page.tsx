"use client";

import React, { useState } from "react";
import {
  GitBranch,
  Target,
  Sparkles,
  ArrowRight,
  Clock,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
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
import {
  INITIAL_JOB_ROLES,
  INITIAL_SKILLS,
  JobRole,
} from "@/lib/data/mock-data";
import { useLearner } from "@/lib/store/learner-context";

export default function CareerPathwaySimulatorPage() {
  const { learner } = useLearner();
  const [primaryRoleId, setPrimaryRoleId] = useState("data_analyst");
  const [comparisonRoleId, setComparisonRoleId] = useState("business_analyst");
  const [weeklyHours, setWeeklyHours] = useState(learner.weeklyHours || 12);

  const primaryRole =
    INITIAL_JOB_ROLES.find((r) => r.id === primaryRoleId) ||
    INITIAL_JOB_ROLES[0];
  const compareRole =
    INITIAL_JOB_ROLES.find((r) => r.id === comparisonRoleId) ||
    INITIAL_JOB_ROLES[1];

  // Helper calculations for learning effort
  const calculateEffort = (role: JobRole) => {
    const totalHours = role.requiredSkills.reduce((acc, req) => {
      const skill = INITIAL_SKILLS.find((s) => s.id === req.skillId);
      const isDemonstrated = learner.digitalTwin.demonstratedSkills.includes(
        req.skillId
      );
      if (isDemonstrated) return acc; // already mastered
      return acc + (skill ? skill.learningEffortHours : 20);
    }, 0);

    const weeks = Math.ceil(totalHours / weeklyHours);
    return { totalHours, weeks };
  };

  const primaryEffort = calculateEffort(primaryRole);
  const compareEffort = calculateEffort(compareRole);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Feature 2: Simulator
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Predictive Pathway Modeling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Career Pathway Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Current Education: <strong className="text-slate-800">{learner.education}</strong>. Simulate required skills, timeline, and practical projects across career alternatives.
          </p>
        </div>

        {/* Study Pace Slider */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-3 text-xs">
          <Clock className="h-4 w-4 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 block">Weekly Study Pace: {weeklyHours} hrs/week</span>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
              className="w-36 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Role Comparison Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pathway 1 */}
        <Card className="border-blue-200 shadow-sm bg-gradient-to-b from-blue-50/20 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                Primary Pathway
              </span>
              <select
                value={primaryRoleId}
                onChange={(e) => setPrimaryRoleId(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
              >
                {INITIAL_JOB_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
            <CardTitle className="text-xl font-bold text-slate-900">
              {primaryRole.title}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Avg. Starting CTC: ₹{(primaryRole.averageSalaryINR / 100000).toFixed(1)} LPA • {primaryRole.openingsIndia.toLocaleString()} Active Openings in India
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timeline & Effort Metric */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
              <div>
                <span className="text-2xl font-black text-blue-700">
                  {primaryEffort.weeks} Weeks
                </span>
                <span className="block text-[10px] text-blue-900 font-semibold uppercase">
                  Est. Completion
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800">
                  {primaryEffort.totalHours} hrs
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">
                  Remaining Skill Effort
                </span>
              </div>
            </div>

            {/* Required Competencies Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Competency Gap Breakdown
              </h4>
              <div className="space-y-2">
                {primaryRole.requiredSkills.map((req) => {
                  const skill = INITIAL_SKILLS.find((s) => s.id === req.skillId);
                  const isDemonstrated = learner.digitalTwin.demonstratedSkills.includes(
                    req.skillId
                  );
                  const isPartial = learner.digitalTwin.partiallyDemonstratedSkills.includes(
                    req.skillId
                  );

                  return (
                    <div
                      key={req.skillId}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        {isDemonstrated ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : isPartial ? (
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        ) : (
                          <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
                        )}
                        <span className="font-semibold text-slate-800">
                          {skill?.name || req.skillId}
                        </span>
                      </div>
                      <Badge
                        variant={
                          isDemonstrated
                            ? "success"
                            : isPartial
                            ? "warning"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {isDemonstrated
                          ? "Demonstrated"
                          : isPartial
                          ? "In Progress"
                          : "Gap"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pathway 2 Comparison */}
        <Card className="border-indigo-200 shadow-sm bg-gradient-to-b from-indigo-50/20 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Alternative Comparison
              </span>
              <select
                value={comparisonRoleId}
                onChange={(e) => setComparisonRoleId(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
              >
                {INITIAL_JOB_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
            <CardTitle className="text-xl font-bold text-slate-900">
              {compareRole.title}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Avg. Starting CTC: ₹{(compareRole.averageSalaryINR / 100000).toFixed(1)} LPA • {compareRole.openingsIndia.toLocaleString()} Active Openings in India
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timeline & Effort Metric */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-center">
              <div>
                <span className="text-2xl font-black text-indigo-700">
                  {compareEffort.weeks} Weeks
                </span>
                <span className="block text-[10px] text-indigo-900 font-semibold uppercase">
                  Est. Completion
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800">
                  {compareEffort.totalHours} hrs
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">
                  Remaining Skill Effort
                </span>
              </div>
            </div>

            {/* Required Competencies Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Competency Gap Breakdown
              </h4>
              <div className="space-y-2">
                {compareRole.requiredSkills.map((req) => {
                  const skill = INITIAL_SKILLS.find((s) => s.id === req.skillId);
                  const isDemonstrated = learner.digitalTwin.demonstratedSkills.includes(
                    req.skillId
                  );
                  const isPartial = learner.digitalTwin.partiallyDemonstratedSkills.includes(
                    req.skillId
                  );

                  return (
                    <div
                      key={req.skillId}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        {isDemonstrated ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : isPartial ? (
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        ) : (
                          <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
                        )}
                        <span className="font-semibold text-slate-800">
                          {skill?.name || req.skillId}
                        </span>
                      </div>
                      <Badge
                        variant={
                          isDemonstrated
                            ? "success"
                            : isPartial
                            ? "warning"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {isDemonstrated
                          ? "Demonstrated"
                          : isPartial
                          ? "In Progress"
                          : "Gap"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
