"use client";

import React, { useState } from "react";
import {
  Award,
  ShieldCheck,
  Share2,
  Download,
  Lock,
  Unlock,
  QrCode,
  Calendar,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  UserCheck,
  Eye,
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
import {
  MOCK_PASSPORT_ENTRIES,
  SkillPassportEntry,
} from "@/lib/data/mock-data";
import { useLearner } from "@/lib/store/learner-context";

export default function SkillPassportPage() {
  const { learner, getInitials } = useLearner();
  const [isPublic, setIsPublic] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const passportUrl = `https://learnx.in/passport/${learner.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(passportUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-[10px] font-bold">
              Feature 4: Skill Passport
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Tamper-Verifiable Competencies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Evidence-Based Skill Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            A portable, cryptographic-grade record of your practical capabilities backed by real deliverables and mentor evaluations.
          </p>
        </div>

        {/* Share & Consent Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs font-semibold"
          >
            <Share2 className="h-3.5 w-3.5 mr-1.5" />
            {copySuccess ? "Copied Link!" : "Share Link"}
          </Button>
          <Button
            size="sm"
            onClick={() => alert("Skill Passport PDF generated with SHA-256 cryptographic verification stamp.")}
            className="text-xs font-semibold shadow-sm"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export Verifiable PDF
          </Button>
        </div>
      </div>

      {/* Passport Credential Card */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white text-xl font-bold ring-4 ring-white/10 shadow-lg">
              {getInitials()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black">{learner.name}</h2>
                <Badge variant="success" className="text-[10px] px-2 py-0.5 font-bold">
                  Verified Identity
                </Badge>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {learner.education} • {learner.institution}
              </p>
              <p className="text-[11px] text-blue-200/80 font-mono mt-0.5">
                Passport ID: LX-IND-2026-981244
              </p>
            </div>
          </div>

          {/* Privacy & Employer Consent Controls */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-300 block">Employer Sharing Consent</span>
              <span className="text-xs font-semibold text-emerald-300">
                {isPublic ? "Publicly Discoverable" : "Restricted (Consent-Only)"}
              </span>
            </div>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Toggle public visibility"
            >
              {isPublic ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Verified Skills Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Verified Competencies Ledger ({MOCK_PASSPORT_ENTRIES.length})
          </h3>
          <span className="text-xs text-slate-500">
            Cryptographic proof logged in LearnX immutable event stream
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PASSPORT_ENTRIES.map((entry) => (
            <Card key={entry.id} className="border-slate-200/90 shadow-sm hover:border-blue-400 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Level: {entry.level}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{entry.skillName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">{entry.assessmentScore}%</span>
                    <span className="block text-[10px] text-slate-400">Rubric Score</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center">
                      <FileCheck className="h-3.5 w-3.5 mr-1.5 text-blue-600" /> Evidence:
                    </span>
                    <strong className="text-slate-800">{entry.evidenceTitle}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center">
                      <UserCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-600" /> Reviewer:
                    </span>
                    <span className="text-slate-700">{entry.verifiedBy}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1.5" /> Date:
                    </span>
                    <span>{entry.verifiedAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-500 flex items-center">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Validated Hash #8f31..0d
                  </span>
                  <a
                    href="/student/virtual-workplace"
                    className="text-blue-600 hover:underline flex items-center font-semibold"
                  >
                    Inspect Artifact <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
