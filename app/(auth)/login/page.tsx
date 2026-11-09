"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building2,
  ShieldCheck,
  User,
  Lock,
  Mail,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleQuickLogin = (role: string, targetPath: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(targetPath);
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/student/overview");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 group mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            LEARN<span className="text-blue-600">X</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Sign in to your Intelligence Hub
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          From Education to Demonstrated Employability
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="border-slate-200/90 shadow-md bg-white">
          <CardContent className="p-6 space-y-6">
            {/* Quick Demo Access Bar */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Instant 1-Click Stakeholder Demo Access:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRoleQuickLogin("student", "/student/overview")}
                  className="justify-start text-xs border-slate-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <GraduationCap className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                  Student (Aarav)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRoleQuickLogin("mentor", "/mentor/overview")}
                  className="justify-start text-xs border-slate-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <User className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                  Mentor (Reviewer)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRoleQuickLogin("institution", "/institution/overview")}
                  className="justify-start text-xs border-slate-200 hover:bg-purple-50 hover:text-purple-700"
                >
                  <Building2 className="h-3.5 w-3.5 mr-1.5 text-purple-600" />
                  Institution (Dean)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRoleQuickLogin("employer", "/employer/overview")}
                  className="justify-start text-xs border-slate-200 hover:bg-amber-50 hover:text-amber-700"
                >
                  <Briefcase className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                  Employer (HR)
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-2 text-[10px] text-slate-400 uppercase font-semibold">
                Or sign in with email
              </span>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.edu.in"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-xs font-semibold shadow-sm"
              >
                {loading ? "Authenticating..." : "Sign In to LEARNX"}
              </Button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500">
              Don't have an account?{" "}
              <Link href="/onboarding" className="font-semibold text-blue-600 hover:underline">
                Start Student Onboarding →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
