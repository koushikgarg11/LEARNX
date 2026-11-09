"use client";

import React, { useState } from "react";
import {
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Layers,
  Filter,
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
  CURRENT_LEARNER,
  INITIAL_SKILLS,
  INITIAL_JOB_ROLES,
} from "@/lib/data/mock-data";

export default function SkillGapPage() {
  const targetRole =
    INITIAL_JOB_ROLES.find((r) => r.id === CURRENT_LEARNER.targetRole) ||
    INITIAL_JOB_ROLES[0];

  const demonstrated = CURRENT_LEARNER.digitalTwin.demonstratedSkills;
  const partial = CURRENT_LEARNER.digitalTwin.partiallyDemonstratedSkills;
  const unassessed = CURRENT_LEARNER.digitalTwin.unassessedSkills;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Skill-Gap Engine
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Decomposed Gap Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Skill-Gap Heatmap & Decomposition
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Targeting: <strong className="text-slate-800">{targetRole.title}</strong>. Comparing your verified evidence against live industry requirements.
          </p>
        </div>
      </div>

      {/* Target Role Skill Decomposition Matrix */}
      <Card className="border-slate-200/90 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-slate-900">
              Role Requirements vs. Learner Demonstrated Competency
            </CardTitle>
            <Badge variant="outline" className="text-[10px]">
              Taxonomy Version 2026.4
            </Badge>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Rule: Unassessed skills are not assumed to be missing, but require demonstrable evidence before verification.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {targetRole.requiredSkills.map((req) => {
              const skill = INITIAL_SKILLS.find((s) => s.id === req.skillId);
              const isDemonstrated = demonstrated.includes(req.skillId);
              const isPartial = partial.includes(req.skillId);

              const status = isDemonstrated
                ? "Demonstrated"
                : isPartial
                ? "Partially Demonstrated"
                : "Unassessed";

              const badgeVariant = isDemonstrated
                ? "success"
                : isPartial
                ? "warning"
                : "secondary";

              return (
                <div
                  key={req.skillId}
                  className="p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-slate-900">
                        {skill?.name || req.skillId}
                      </h4>
                      <Badge variant={badgeVariant as any} className="text-[10px]">
                        {status}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed max-w-xl">
                      {skill?.description}
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 pt-1">
                      <span>Required Level: <strong>{req.level}</strong></span>
                      <span>Weight in Role: <strong>{req.weight * 100}%</strong></span>
                      <span>Estimated Effort: <strong>{skill?.learningEffortHours || 20} hrs</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <a
                      href={
                        isDemonstrated
                          ? "/student/skill-passport"
                          : "/student/virtual-workplace"
                      }
                    >
                      <Button
                        variant={isDemonstrated ? "outline" : "default"}
                        size="sm"
                        className="text-xs font-semibold"
                      >
                        {isDemonstrated ? (
                          "View Evidence in Passport"
                        ) : (
                          <>
                            Practice in Simulation <ArrowRight className="h-3 w-3 ml-1" />
                          </>
                        )}
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
