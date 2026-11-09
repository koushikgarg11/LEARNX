"use client";

import React from "react";
import {
  Lightbulb,
  Rocket,
  FileSpreadsheet,
  FileSignature,
  DollarSign,
  Users,
  ArrowRight,
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

export default function EntrepreneurshipPage() {
  const tracks = [
    {
      title: "B2B Analytics Consulting & Freelance Studio",
      icon: FileSpreadsheet,
      badge: "High Demand in India",
      desc: "Package your SQL, Excel, and Power BI skills to offer inventory and sales auditing for local D2C brands and MSMEs.",
      milestones: ["Client Proposal Template", "Deliverable SLA Contract", "Fixed-fee Pricing Matrix"],
    },
    {
      title: "SaaS & AI Micro-Product Founder",
      icon: Rocket,
      badge: "Product Builder",
      desc: "Learn to build and monetize full-stack Next.js applications, integrate payment gateways (Razorpay/Stripe), and acquire initial users.",
      milestones: ["MVP Feature Scoping", "Pricing Tier Experiments", "Landing Page Conversion Funnel"],
    },
    {
      title: "Digital Agency & Workflow Automation",
      icon: Lightbulb,
      badge: "Services Business",
      desc: "Help Indian retail and service businesses replace manual spreadsheets with automated workflow pipelines and dashboards.",
      milestones: ["Lead Discovery Playbook", "Client Discovery Audit Script", "Case Study Portfolio"],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Innovation 4.6
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Alternative Career Pathway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Entrepreneurship & Freelance Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            For founders, freelance consultants, and independent product creators. Translate your practical competencies into commercial revenue.
          </p>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((track, idx) => {
          const Icon = track.icon;
          return (
            <Card key={idx} className="border-slate-200/90 shadow-sm bg-white hover:border-blue-400 transition-colors flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {track.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base font-bold text-slate-900">
                  {track.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  {track.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] space-y-1.5">
                  <span className="font-bold text-slate-700 block">Core Deliverable Exercises:</span>
                  {track.milestones.map((m, i) => (
                    <div key={i} className="flex items-center text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                  Start Studio Track <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
