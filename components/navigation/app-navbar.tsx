"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Building2,
  ShieldCheck,
  Globe2,
  ChevronDown,
  Layers,
  Bell,
  SlidersHorizontal,
  LogOut,
  Settings,
  Award,
  Cpu,
  UserCheck,
  Edit3,
  X,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLearner } from "@/lib/store/learner-context";

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { learner, updateLearner, getInitials } = useLearner();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(learner.name);
  const [editEmail, setEditEmail] = useState(learner.email);
  const [editEducation, setEditEducation] = useState(learner.education);
  const [editInstitution, setEditInstitution] = useState(learner.institution);

  const [currentRole, setCurrentRole] = useState<
    "student" | "mentor" | "institution" | "employer" | "admin" | "national"
  >("student");

  const roles = [
    { id: "student", label: "Student Learner", href: "/student/overview", icon: GraduationCap, badge: "Learner" },
    { id: "mentor", label: "Industry Mentor", href: "/mentor/overview", icon: User, badge: "Reviewer" },
    { id: "institution", label: "Institution Dean", href: "/institution/overview", icon: Building2, badge: "Delhi Univ" },
    { id: "employer", label: "Employer Portal", href: "/employer/overview", icon: Briefcase, badge: "OmniRetail HR" },
    { id: "national", label: "National Insights", href: "/intelligence/national-insights", icon: Globe2, badge: "NCS / NASSCOM" },
    { id: "admin", label: "System Admin", href: "/admin/workflows", icon: ShieldCheck, badge: "Governance" },
  ];

  const handleLogout = () => {
    setUserMenuOpen(false);
    router.push("/login");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateLearner({
      name: editName.trim() || "Student Learner",
      email: editEmail.trim() || "learner@university.edu.in",
      education: editEducation.trim() || learner.education,
      institution: editInstitution.trim() || learner.institution,
    });
    setIsEditProfileOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    LEARN<span className="text-blue-600">X</span>
                  </span>
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0">
                    India
                  </Badge>
                </div>
                <p className="hidden md:block text-[10px] font-medium text-slate-400 tracking-tight leading-none">
                  Education-to-Employment Intelligence
                </p>
              </div>
            </Link>

            {/* Quick Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
              <Link
                href="/student/overview"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname.startsWith("/student")
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Learner Hub
              </Link>
              <Link
                href="/student/virtual-workplace"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname.includes("virtual-workplace")
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Virtual Workplace
              </Link>
              <Link
                href="/student/skill-passport"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname.includes("skill-passport")
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Skill Passport
              </Link>
              <Link
                href="/student/career-path"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname.includes("career-path")
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Pathway Simulator
              </Link>
              <Link
                href="/intelligence/national-insights"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname.includes("national-insights")
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                National Intel
              </Link>
            </nav>
          </div>

          {/* Right Action Bar & Interactive Role Switcher */}
          <div className="flex items-center space-x-3">
            {/* Low Bandwidth Mode Indicator */}
            <div className="hidden sm:flex items-center text-xs text-slate-500 bg-slate-100 rounded-full px-2.5 py-1 space-x-1.5 border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Standard Mode</span>
            </div>

            {/* Interactive Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 transition-all shadow-sm"
              >
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span className="capitalize hidden md:inline">View as:</span>
                <span className="text-blue-700 underline underline-offset-2">
                  {roles.find((r) => pathname.startsWith(`/${r.id}`))?.label || "Student Learner"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Stakeholder Role
                    </p>
                  </div>
                  <div className="space-y-1">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      return (
                        <Link
                          key={r.id}
                          href={r.href}
                          onClick={() => setCurrentRole(r.id as any)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className="h-4 w-4 text-slate-500" />
                            <span>{r.label}</span>
                          </div>
                          <span className="text-[10px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5">
                            {r.badge}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic User Profile Dropdown with Logout */}
            <div className="relative">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center space-x-2 pl-2 border-l border-slate-200 hover:opacity-85 transition-opacity focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-blue-100 shadow-sm">
                  {getInitials()}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-semibold text-slate-800 leading-none">
                    {learner.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Target: Junior Data Analyst
                  </p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  {/* User Header */}
                  <div className="px-3 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{learner.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{learner.email}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="success" className="text-[9px] px-1.5 py-0 font-bold">
                        Logged In (Learner)
                      </Badge>
                      <button
                        onClick={() => {
                          setEditName(learner.name);
                          setEditEmail(learner.email);
                          setEditEducation(learner.education);
                          setEditInstitution(learner.institution);
                          setIsEditProfileOpen(true);
                          setUserMenuOpen(false);
                        }}
                        className="text-[10px] text-blue-600 font-semibold hover:underline flex items-center"
                      >
                        <Edit3 className="h-3 w-3 mr-0.5" /> Edit Profile
                      </button>
                    </div>
                  </div>

                  {/* Profile Links */}
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/student/overview"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Cpu className="h-4 w-4 text-blue-600" />
                      <span>My Digital Twin</span>
                    </Link>
                    <Link
                      href="/student/skill-passport"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span>Evidence Skill Passport</span>
                    </Link>
                    <Link
                      href="/student/assessments"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-slate-500" />
                      <span>Competency Diagnostic</span>
                    </Link>
                  </div>

                  {/* Log Out Button */}
                  <div className="pt-1 border-t border-slate-100 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      <span>Log Out of LEARNX</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Edit Profile Modal Dialog */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="h-4 w-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Customize Learner Profile</h3>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Learner Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Priyanshu Verma, Sneha Iyer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="name@university.edu.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Current Degree / Subject
                </label>
                <input
                  type="text"
                  value={editEducation}
                  onChange={(e) => setEditEducation(e.target.value)}
                  placeholder="e.g. B.Tech Computer Science, B.Com, BCA"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Institution / University
                </label>
                <input
                  type="text"
                  value={editInstitution}
                  onChange={(e) => setEditInstitution(e.target.value)}
                  placeholder="e.g. Delhi University, IIT Bombay, Anna University"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="font-semibold shadow-sm">
                  <Check className="h-3.5 w-3.5 mr-1" /> Save Dynamic Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
