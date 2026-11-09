"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CURRENT_LEARNER, LearnerProfile } from "@/lib/data/mock-data";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "institution" | "employer" | "admin";
  avatar: string;
  education?: string;
  institution?: string;
  targetRole?: string;
}

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string, role?: string) => Promise<void>;
  logout: () => void;
  switchDemoRole: (role: "student" | "mentor" | "institution" | "employer" | "admin") => void;
  updateUser: (updates: Partial<UserSession>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_USERS: Record<string, UserSession> = {
  student: {
    id: "learner-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.edu.in",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    education: "B.Com (Computer Applications)",
    institution: "Delhi University",
    targetRole: "data_analyst",
  },
  mentor: {
    id: "mentor-001",
    name: "Dr. R. Venkatraman",
    email: "venkatraman@learnx.mentor.in",
    role: "mentor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    institution: "Ex-Amazon / LearnX Lead Reviewer",
  },
  institution: {
    id: "inst-001",
    name: "Prof. Sunita Deshpande",
    email: "dean.commerce@du.ac.in",
    role: "institution",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    institution: "Faculty of Commerce, Delhi University",
  },
  employer: {
    id: "emp-001",
    name: "Rajesh Mehra",
    email: "r.mehra@omniretail.co.in",
    role: "employer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    institution: "OmniRetail India Talent Acquisition",
  },
  admin: {
    id: "admin-001",
    name: "Platform Governance Officer",
    email: "governance@learnx.in",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    institution: "LearnX Central Governance",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(DEMO_USERS.student);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, role = "student") => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const demoUser = DEMO_USERS[role] || DEMO_USERS.student;
    setUser({ ...demoUser, email });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (role: "student" | "mentor" | "institution" | "employer" | "admin") => {
    setUser(DEMO_USERS[role]);
  };

  const updateUser = (updates: Partial<UserSession>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        switchDemoRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
