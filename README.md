# LEARNX – The Education-to-Employment Intelligence Platform

> **From Education to Demonstrated Employability.**

LEARNX is an AI-powered learning intelligence, industry skill mapping, employability assessment, and career transformation platform built for India with international scalability.

---

## Key Differentiators & Innovations

1. **Learning Digital Twin:** An evidence-based, continuously updated representation of each learner's demonstrated competencies, project results, and learning velocity.
2. **Career Pathway Simulator:** Interactive scenario comparison (e.g., B.Com ➔ Data Analyst vs. Business Analyst) with estimated learning hours and study pace.
3. **Virtual Company Simulation:** Authentic workplace departments (Data Analytics, HR, Finance) where learners solve business cases on real datasets and receive rubric-based evaluations.
4. **Evidence-Based Skill Passport:** A portable, tamper-verifiable credential ledger proving practical capability backed by artifacts and mentor sign-offs.
5. **AI Mentor Suite (5 Assistants):** Specialized coaches for Learning, Career Strategy, Workplace Projects, Mock Interviews, and Academic Curriculum Alignment.
6. **Curriculum-to-Industry Intelligence:** Automated analysis of university course syllabi against NASSCOM/NCS industry demands to recommend modernization upgrades.
7. **Interactive Challenge Arena:** Timed practical challenges across SQL, Python, Excel, and Case Studies with multi-level difficulty.
8. **National Employability Intelligence:** Macro-level regional skill shortage radar across Indian metros and tier-2 emerging clusters.

---

## Technology Stack

- **Framework:** Next.js 15 (App Router, Server Components & Route Handlers)
- **Language:** TypeScript 5.7+
- **Styling:** Tailwind CSS, shadcn/ui design tokens
- **Data Visualizations:** Recharts & Interactive React Flow nodes
- **Database:** PostgreSQL (Supabase / Neon) with DDL schema in `database/schema/initial_schema.sql`
- **Automation & Schedulers:** Vercel Cron & TypeScript Idempotent Workflow Engine
- **Deployment:** Vercel Serverless Architecture

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Repository Structure

```
LEARNX/
├── app/
│   ├── page.tsx                           # Interactive Landing Page
│   ├── student/                           # Student Intelligence Suite
│   │   ├── overview/                      # Digital Twin & Readiness Profile
│   │   ├── virtual-workplace/             # Feature 3: Simulated Enterprise Office
│   │   ├── skill-passport/                # Feature 4: Verifiable Competency Ledger
│   │   ├── career-path/                   # Feature 2: Pathway Simulator
│   │   ├── ai-mentors/                    # Feature 5: 5 Specialized AI Assistants
│   │   ├── challenge-arena/               # Feature 7: Timed Code & Query Drills
│   │   ├── skill-gap/                     # Decomposed Gap Heatmap
│   │   ├── learning/                      # Personalized 10-Week Roadmap
│   │   ├── projects/                      # Real-World Project Hub
│   │   ├── jobs/                          # Explainable Matching with Consent
│   │   ├── interview-prep/                # STAR & Technical Interview Drills
│   │   └── entrepreneurship/              # Innovation 4.6: Founder Studio
│   ├── institution/overview/              # Feature 6: Syllabus Intelligence
│   ├── employer/overview/                 # Employer Hiring & Challenges
│   ├── intelligence/national-insights/    # Feature 8: National Employability Radar
│   ├── admin/workflows/                   # 35-Workflow Runner & Audit Monitor
│   ├── api/                               # Route Handlers & Vercel Cron endpoints
│   └── globals.css                        # Design system & theme tokens
├── automation/
│   └── workflow-engine.ts                 # Idempotent Workflow Orchestrator
├── database/schema/
│   └── initial_schema.sql                 # Complete PostgreSQL DDL Script
├── docs/
│   ├── DATA_SOURCE_REGISTER.md           # Formal data provenance registry
│   └── DEPLOYMENT_GUIDE.md               # Step-by-step Vercel deployment guide
├── lib/
│   ├── data/mock-data.ts                  # High-fidelity taxonomy & demo data
│   ├── ai/assistant-service.ts            # Heuristics & LLM prompt pipeline
│   └── utils.ts                           # Tailwind merge & format helpers
├── vercel.json                            # Vercel Cron schedules configuration
└── package.json
```

---

## License

Proprietary & Confidential © LEARNX Technologies. All rights reserved.
