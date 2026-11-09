"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Clock,
  Target,
  CheckCircle2,
  Cpu,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_JOB_ROLES, JobRole } from "@/lib/data/mock-data";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [gradYear, setGradYear] = useState("2026");
  const [targetRoleId, setTargetRoleId] = useState("data_analyst");
  const [weeklyHours, setWeeklyHours] = useState(12);

  // Diagnostic Answers
  const [q1Answer, setQ1Answer] = useState("");
  const [q2Answer, setQ2Answer] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  const selectedRole =
    INITIAL_JOB_ROLES.find((r) => r.id === targetRoleId) ||
    INITIAL_JOB_ROLES[0];

  const handleFinishOnboarding = () => {
    setIsFinishing(true);
    setTimeout(() => {
      setIsFinishing(false);
      router.push("/student/overview");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-6">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xl font-black text-slate-900">
            LEARN<span className="text-blue-600">X</span>
          </span>
        </Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Initialize Your Learning Digital Twin
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Step {currentStep} of 4:{" "}
          {currentStep === 1
            ? "Academic Background"
            : currentStep === 2
            ? "Target Career Discovery"
            : currentStep === 3
            ? "Weekly Study Commitment"
            : "Baseline Competency Diagnostic"}
        </p>

        {/* Stepper Progress Bar */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep >= step ? "w-12 bg-blue-600" : "w-6 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Card className="border-slate-200 shadow-md bg-white">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Academic Background */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Tell us about your educational foundation
                  </h3>
                  <p className="text-xs text-slate-500">
                    We map your academic subjects to our skill taxonomy without bias.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Current Degree / Qualification
                    </label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Com, B.Tech CSE, BCA, BBA, BSC"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        College / University Name
                      </label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="e.g. Delhi University, Anna University, Mumbai University"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Graduation Year
                      </label>
                      <select
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="2024">2024 (Graduated)</option>
                        <option value="2025">2025 (Final Year)</option>
                        <option value="2026">2026 (Pre-Final Year)</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-semibold"
                  >
                    Continue to Target Role <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Target Career Role Selection */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Select your primary target career goal
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your choice generates your personalized competency vector and gap roadmap.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INITIAL_JOB_ROLES.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setTargetRoleId(role.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all text-xs space-y-1.5 ${
                        targetRoleId === role.id
                          ? "border-blue-600 bg-blue-50/70 shadow-sm"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-[10px]">
                          {role.category}
                        </Badge>
                        <span className="text-[10px] font-bold text-emerald-700">
                          ₹{(role.averageSalaryINR / 100000).toFixed(1)} LPA
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900">{role.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-semibold"
                  >
                    Continue to Study Schedule <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Available Weekly Study Commitment */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    How many hours per week can you devote to practice?
                  </h3>
                  <p className="text-xs text-slate-500">
                    We calculate an achievable learning milestone pace without causing burnout.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto" />
                  <span className="text-3xl font-black text-slate-900 block">
                    {weeklyHours} Hours / Week
                  </span>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Estimated timeline to Junior Data Analyst readiness:{" "}
                    <strong>{Math.ceil(95 / weeklyHours)} Weeks</strong>.
                  </p>
                  <div className="max-w-md mx-auto pt-2">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>5 hrs (Relaxed)</span>
                      <span>15 hrs (Recommended)</span>
                      <span>30 hrs (Accelerated)</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(4)}
                    className="text-xs font-semibold"
                  >
                    Take Baseline Diagnostic <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Baseline Competency Diagnostic */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="purple" className="text-[10px]">
                      Diagnostic
                    </Badge>
                    <span className="text-xs text-slate-500">2 Baseline Check Questions</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Initial Competency Diagnostic
                  </h3>
                  <p className="text-xs text-slate-500">
                    Establishes your starting Digital Twin baseline. Don't worry if you don't know the answer yet!
                  </p>
                </div>

                {/* Diagnostic Question 1 */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2 text-xs">
                  <p className="font-bold text-slate-900">
                    1. In SQL, what clause is strictly required to compute a running cumulative sum without collapsing individual rows?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      "GROUP BY store_id",
                      "OVER (ORDER BY transaction_date)",
                      "HAVING SUM(amount) > 0",
                      "WHERE ROW_NUMBER() = 1",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQ1Answer(opt)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          q1Answer === opt
                            ? "border-blue-600 bg-white text-blue-700 font-bold shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Question 2 */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2 text-xs">
                  <p className="font-bold text-slate-900">
                    2. In business analytics, if a retail store's revenue is steady but profit margin dropped 6%, which factor is most likely responsible?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      "Increase in Cost of Goods Sold (COGS) or deeper discount discounting",
                      "Rise in customer return rate without refund deduction",
                      "Decrease in overall store footfall with higher basket size",
                      "Inaccurate depreciation scheduling on corporate assets",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQ2Answer(opt)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          q2Answer === opt
                            ? "border-blue-600 bg-white text-blue-700 font-bold shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleFinishOnboarding}
                    disabled={isFinishing}
                    className="text-xs font-semibold shadow-sm"
                  >
                    {isFinishing ? (
                      "Synthesizing Digital Twin..."
                    ) : (
                      <>
                        <Cpu className="h-3.5 w-3.5 mr-1" /> Launch My Digital Twin Dashboard
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
