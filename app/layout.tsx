import type { Metadata } from "next";
import "./globals.css";
import { LearnerProvider } from "@/lib/store/learner-context";

export const metadata: Metadata = {
  title: "LEARNX – The Education-to-Employment Intelligence Platform",
  description:
    "From Education to Demonstrated Employability. AI-powered learning intelligence, industry skill mapping, and verified competency passports.",
  keywords: [
    "Employability",
    "Skill Passport",
    "Digital Twin",
    "Curriculum Intelligence",
    "Virtual Workplace",
    "Career Pathway Simulator",
    "Higher Education",
    "India",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full font-sans antialiased bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <LearnerProvider>{children}</LearnerProvider>
      </body>
    </html>
  );
}
