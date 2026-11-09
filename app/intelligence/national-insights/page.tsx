"use client";

import React from "react";
import {
  Globe2,
  TrendingUp,
  MapPin,
  BarChart2,
  ShieldCheck,
  Building,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppNavbar } from "@/components/navigation/app-navbar";
import { NATIONAL_INTELLIGENCE_METRICS } from "@/lib/data/mock-data";

export default function NationalInsightsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in-50 duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="purple" className="text-[10px] font-bold">
                Feature 8: National Intelligence
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Aggregated Macro Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              National Employability & Skill Gap Radar
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Aggregated, privacy-protected insights aligned with National Career Service (NCS) and NASSCOM FutureSkills data sources.
            </p>
          </div>

          <div className="inline-flex items-center text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600 mr-2" />
            <span>Differential Privacy & K-Anonymity Verified</span>
          </div>
        </div>

        {/* Macro KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active Learners Indexed
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {NATIONAL_INTELLIGENCE_METRICS.totalLearnersActive.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Across 28 States & UTs</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Verified Skill Passports
              </span>
              <div className="text-2xl font-black text-blue-600 mt-1">
                {NATIONAL_INTELLIGENCE_METRICS.verifiedCompetenciesAwarded.toLocaleString()}
              </div>
              <p className="text-[10px] text-blue-600 font-medium mt-0.5">Backed by real code & rubrics</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Participating Institutions
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {NATIONAL_INTELLIGENCE_METRICS.participatingInstitutions}
              </div>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Universities & Colleges</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active Hiring Partners
              </span>
              <div className="text-2xl font-black text-purple-600 mt-1">
                {NATIONAL_INTELLIGENCE_METRICS.hiringPartnerCount}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Enterprises & MSMEs</p>
            </CardContent>
          </Card>
        </div>

        {/* Regional Gaps & Skill Demand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Regional Tech Demand vs Fresh Graduate Readiness */}
          <Card className="border-slate-200/90 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-900">
                  Regional Tech Demand vs. Graduate Competency
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Macro Gap Radar
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Comparison of employer hiring postings vs local graduate practical assessment pass rates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {NATIONAL_INTELLIGENCE_METRICS.regionalGaps.map((reg, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" /> {reg.region}
                      </span>
                      <span className="text-amber-700 font-bold">
                        {reg.gap}% Competency Gap
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Industry Demand: {reg.techDemand}%</span>
                        <span>Graduate Demonstrated: {reg.localGradReadiness}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className="bg-emerald-500 h-full"
                          style={{ width: `${reg.localGradReadiness}%` }}
                          title="Graduate Readiness"
                        ></div>
                        <div
                          className="bg-amber-400 h-full"
                          style={{ width: `${reg.gap}%` }}
                          title="Unmet Demand Gap"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fastest Growing Practical Skill Demands */}
          <Card className="border-slate-200/90 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-900">
                  Top In-Demand Practical Competencies
                </CardTitle>
                <Badge variant="success" className="text-[10px] font-bold">
                  2026 Q4 Index
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Skills with the highest percentage growth in enterprise hiring briefs across India.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {NATIONAL_INTELLIGENCE_METRICS.topSkillsDemand.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900">{item.skill}</h4>
                    <p className="text-[10px] text-slate-400">
                      {item.jobsIndexed.toLocaleString()} Active Vacancies Monitored
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> {item.growth}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">YoY Surge</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
