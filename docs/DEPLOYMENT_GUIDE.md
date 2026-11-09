# LEARNX – Complete Vercel & Cloud Deployment Guide

This guide walks through deploying the complete LEARNX platform onto Vercel with connected Supabase/PostgreSQL, authentication, serverless functions, and cron schedulers.

---

## 1. Prerequisites

- Node.js LTS (v20+ or v24+)
- GitHub Account with repository access
- Vercel Account linked to GitHub
- Supabase Account or Managed PostgreSQL (Neon)

---

## 2. Local Environment Setup

1. Clone or open the project directory:
   ```bash
   cd d:\PE
   ```
2. Verify dependencies:
   ```bash
   npm install
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env.local
   ```
4. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 3. Database Schema Provisioning

Open the SQL Editor in your Supabase or Neon dashboard:
1. Locate `database/schema/initial_schema.sql` in this repository.
2. Execute the full DDL script.
3. This creates all tables:
   - `roles`, `users`, `profiles`, `consents`
   - `job_roles`, `skills`, `role_skills`, `industry_skill_demand`
   - `institutions`, `curricula`, `curriculum_topics`
   - `assessments`, `assessment_attempts`
   - `projects`, `project_submissions`
   - `skill_passports`, `passport_entries`
   - `workflow_runs`, `audit_logs`
4. Confirm Row-Level Security (RLS) is active on user-facing tables.

---

## 4. Deploying to Vercel

### Option A: Via Vercel Web Dashboard

1. Push your code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete LEARNX intelligence platform MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/LEARNX.git
   git push -u origin main
   ```
2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Select **Import Git Repository** and choose `LEARNX`.
4. Framework Preset: **Next.js**
5. Root Directory: `./`
6. Expand **Environment Variables** and enter:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LLM_API_KEY`
   - `CRON_SECRET`
   - `APP_SECRET`
   - `NEXT_PUBLIC_APP_URL`
7. Click **Deploy**.

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel link
vercel --prod
```

---

## 5. Vercel Cron Jobs Verification

LEARNX uses `vercel.json` to schedule 3 recurring serverless tasks:
1. `/api/cron/daily-reminders` at 03:00 UTC
2. `/api/cron/refresh-recommendations` at 04:00 UTC
3. `/api/cron/weekly-reports` at 05:00 UTC every Monday

Verify in your Vercel Dashboard under **Project Settings > Cron Jobs**. Confirm that each invocation includes the `Authorization: Bearer <CRON_SECRET>` header.

---

## 6. Smoke Test Checklist

- [x] Landing page renders with responsive navigation
- [x] Student Digital Twin loads demonstrated skills and readiness score
- [x] Virtual Workplace executes SQL queries and yields rubric review feedback
- [x] Skill Passport reflects verified competencies with cryptographic stamps
- [x] Career Pathway Simulator computes effort weeks and compares roles
- [x] AI Mentor Suite responds across 5 assistant roles
- [x] Challenge Arena runs code tests with live feedback
- [x] Institution Dashboard displays syllabus alignment and council recommendations
- [x] Employer Portal filters candidate portfolios with verified student consent
- [x] National Intelligence displays regional tech demand vs. graduate competencies
- [x] Admin Workflow Monitor dispatches events with audit trail tracking
