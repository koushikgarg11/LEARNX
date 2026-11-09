"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CURRENT_LEARNER, LearnerProfile } from "@/lib/data/mock-data";

interface LearnerContextType {
  learner: LearnerProfile;
  updateLearner: (updates: Partial<LearnerProfile>) => void;
  getInitials: () => string;
  setLearnerName: (name: string, email?: string) => void;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

const STORAGE_KEY = "learnx_learner_profile_v1";

export function LearnerProvider({ children }: { children: React.ReactNode }) {
  const [learner, setLearner] = useState<LearnerProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        // Fallback to default
      }
    }
    return {
      ...CURRENT_LEARNER,
      name: "Student Learner",
      email: "learner@university.edu.in",
    };
  });

  // Sync to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learner));
    } catch (e) {
      // Ignore storage errors
    }
  }, [learner]);

  const updateLearner = (updates: Partial<LearnerProfile>) => {
    setLearner((prev) => ({
      ...prev,
      ...updates,
      digitalTwin: {
        ...prev.digitalTwin,
        ...(updates.digitalTwin || {}),
      },
    }));
  };

  const setLearnerName = (name: string, email?: string) => {
    setLearner((prev) => ({
      ...prev,
      name: name.trim() || "Student Learner",
      email: email?.trim() || prev.email,
    }));
  };

  const getInitials = () => {
    const trimmed = (learner.name || "Student").trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return trimmed.slice(0, 2).toUpperCase();
  };

  return (
    <LearnerContext.Provider
      value={{
        learner,
        updateLearner,
        getInitials,
        setLearnerName,
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    // Graceful fallback for non-wrapped components or SSR
    return {
      learner: {
        ...CURRENT_LEARNER,
        name: "Student Learner",
        email: "learner@university.edu.in",
      },
      updateLearner: () => {},
      getInitials: () => "SL",
      setLearnerName: () => {},
    };
  }
  return context;
}
