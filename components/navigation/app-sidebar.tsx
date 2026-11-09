"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Cpu,
  Target,
  BookOpen,
  FolderGit2,
  Building,
  Swords,
  Award,
  GitBranch,
  Bot,
  MessageSquare,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const pathname = usePathname();

  const navSections = [
    {
      title: "Learning Intelligence",
      items: [
        { label: "Overview & Digital Twin", href: "/student/overview", icon: Cpu, badge: "Twin" },
        { label: "Skill-Gap Heatmap", href: "/student/skill-gap", icon: Target },
        { label: "Personalized Roadmap", href: "/student/learning", icon: BookOpen },
        { label: "Interactive Arena", href: "/student/challenge-arena", icon: Swords, badge: "Live" },
      ],
    },
    {
      title: "Employability & Experience",
      items: [
        { label: "Virtual Workplace", href: "/student/virtual-workplace", icon: Building, badge: "Sim" },
        { label: "Real-World Project Hub", href: "/student/projects", icon: FolderGit2 },
        { label: "Evidence Skill Passport", href: "/student/skill-passport", icon: Award, badge: "Verified" },
        { label: "Career Pathway Simulator", href: "/student/career-path", icon: GitBranch },
      ],
    },
    {
      title: "Transition to Career",
      items: [
        { label: "AI Mentor Suite", href: "/student/ai-mentors", icon: Bot, badge: "5 Bots" },
        { label: "Interview & Workplace Prep", href: "/student/interview-prep", icon: MessageSquare },
        { label: "Internships & Job Matches", href: "/student/jobs", icon: Briefcase },
        { label: "Entrepreneurship Pathway", href: "/student/entrepreneurship", icon: Lightbulb },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200/80 bg-white/80 p-4 hidden md:flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="space-y-6">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {sec.title}
            </h4>
            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mini Employability Readiness Indicator */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-3 mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-blue-900">Demonstrated Readiness</span>
          <span className="text-xs font-black text-blue-600">68%</span>
        </div>
        <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: "68%" }}></div>
        </div>
        <p className="text-[10px] text-blue-700/80 leading-tight">
          Next milestone: Complete OmniRetail SQL memo to unlock 75%+ score.
        </p>
      </div>
    </aside>
  );
}
