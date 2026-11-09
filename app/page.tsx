import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Target,
  Award,
  Building,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Swords,
  GitBranch,
  Bot,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AppNavbar } from "@/components/navigation/app-navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-blue-50/20 to-slate-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>The Education-to-Employment Intelligence Platform</span>
            <span className="text-blue-300">•</span>
            <span className="text-blue-800">Built for India & Global Scale</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            A degree tells what you studied.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              LEARNX demonstrates what you can actually do.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Bridging academic education and industry requirements through continuous skill analytics,
            virtual workplace simulations, and verifiable competency passports.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/student/overview">
              <Button size="lg" className="w-full sm:w-auto text-base font-semibold px-8 shadow-lg shadow-blue-500/25">
                Launch Learner Digital Twin <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/student/virtual-workplace">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base font-medium border-slate-300">
                Explore Virtual Company Simulations
              </Button>
            </Link>
          </div>

          {/* Core Journey Flow Graphic */}
          <div className="mt-14 max-w-5xl mx-auto p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-left">
              The End-to-End Learner Journey
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-medium text-slate-700">
              {[
                { step: "01", label: "Education" },
                { step: "02", label: "Diagnostic" },
                { step: "03", label: "Skill-Gap" },
                { step: "04", label: "Study Plan" },
                { step: "05", label: "Workplace Sim" },
                { step: "06", label: "Evidence Review" },
                { step: "07", label: "Skill Passport" },
                { step: "08", label: "Career Match" },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-blue-600">{item.step}</span>
                  <span className="mt-1 font-semibold text-slate-800 text-[11px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Breakdown */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* The Dilemma */}
            <div className="space-y-6">
              <Badge variant="destructive" className="uppercase font-bold tracking-wider">
                The Core Challenge
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Millions graduate every year with degrees, but struggle with practical workplace competency.
              </h2>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start space-x-3">
                  <span className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <span>Academic curricula often lag 3–5 years behind rapidly evolving cloud, analytics, and software tools.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <span>Theoretical exam answers do not prove whether a student can clean messy data or debug production code.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <span>Employers spend 4–6 months retraining freshers because resumes and degrees alone lack verifiable proof of ability.</span>
                </div>
              </div>
            </div>

            {/* The Dual Engine Architecture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-white">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">System A: Learning Intelligence</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Personalized diagnostic testing, knowledge tracking, adaptive AI planners, and course effectiveness analytics.
                  </p>
                  <ul className="text-[11px] text-slate-700 space-y-1 font-medium">
                    <li>✓ Learning Digital Twin</li>
                    <li>✓ Interactive Challenge Arena</li>
                    <li>✓ 5 Specialized AI Mentors</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">System B: Employability Intelligence</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Virtual workplace simulations, rubric-based mentor reviews, and verified Skill Passports shared with consent.
                  </p>
                  <ul className="text-[11px] text-slate-700 space-y-1 font-medium">
                    <li>✓ Evidence-Based Skill Passport</li>
                    <li>✓ Virtual Company Simulators</li>
                    <li>✓ Explainable Job Matching</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Innovative Feature Highlights */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="default" className="mb-3 uppercase font-bold tracking-wider">
              Core Differentiators
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              8 Groundbreaking Innovations Powering LEARNX
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Designed from the ground up to prioritize evidence over passive completion certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cpu,
                title: "1. Learning Digital Twin",
                desc: "Dynamic vector representing a learner's demonstrated skills, learning velocity, and project track record.",
                href: "/student/overview",
                color: "text-blue-600",
              },
              {
                icon: GitBranch,
                title: "2. Career Pathway Simulator",
                desc: "Compare B.Com vs Data Analyst or B.Tech vs DevOps. See required skills, effort hours, and learning sequence.",
                href: "/student/career-path",
                color: "text-indigo-600",
              },
              {
                icon: Building,
                title: "3. Virtual Company",
                desc: "Hands-on department simulations (OmniRetail, NexTech, BharatFin) solving real-world business breakdowns.",
                href: "/student/virtual-workplace",
                color: "text-emerald-600",
              },
              {
                icon: Award,
                title: "4. Evidence Skill Passport",
                desc: "Portable, verifiable record of demonstrated competencies backed by real datasets and mentor rubrics.",
                href: "/student/skill-passport",
                color: "text-amber-600",
              },
              {
                icon: Bot,
                title: "5. AI Mentor Suite",
                desc: "Five domain-specific assistants: Learning, Career, Project, Interview, and Academic Curriculum Mentors.",
                href: "/student/ai-mentors",
                color: "text-purple-600",
              },
              {
                icon: Layers,
                title: "6. Curriculum-to-Industry",
                desc: "Institutions upload syllabi; LEARNX identifies gaps against current NASSCOM and NCS industry demands.",
                href: "/institution/overview",
                color: "text-rose-600",
              },
              {
                icon: Swords,
                title: "7. Challenge Arena",
                desc: "Timed SQL runners, Python sandboxes, and Excel modeling challenges from beginner to industry level.",
                href: "/student/challenge-arena",
                color: "text-cyan-600",
              },
              {
                icon: TrendingUp,
                title: "8. National Intelligence",
                desc: "Aggregated, privacy-protected macro insights on regional skill shortages and hiring transitions across India.",
                href: "/intelligence/national-insights",
                color: "text-teal-600",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <Link key={i} href={f.href} className="group">
                  <Card className="h-full hover:border-blue-500 hover:shadow-lg transition-all bg-white">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="space-y-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                          <Icon className={`h-5 w-5 ${f.color}`} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {f.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                        <span>Explore module</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">LEARNX</span>
            <span>– The Education-to-Employment Intelligence Platform.</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/student/overview" className="hover:text-blue-600">Student Portal</Link>
            <Link href="/mentor/overview" className="hover:text-blue-600">Mentor Hub</Link>
            <Link href="/institution/overview" className="hover:text-blue-600">Institution Portal</Link>
            <Link href="/employer/overview" className="hover:text-blue-600">Employer Portal</Link>
            <Link href="/intelligence/national-insights" className="hover:text-blue-600">National Intel</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
