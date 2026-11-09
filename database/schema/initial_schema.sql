-- ====================================================================
-- LEARNX DATABASE SCHEMA
-- Full PostgreSQL & Supabase Compatible DDL
-- Multi-role, RLS-enabled, Vector-ready
-- ====================================================================

-- Enable UUID & pgvector extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "vector"; -- Enable when pgvector is provisioned

-- ====================================================================
-- 1. ACCOUNTS & PROFILES
-- ====================================================================

CREATE TABLE IF NOT EXISTS roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (id, name, description) VALUES
    ('student', 'Student / Learner', 'Graduate, fresher, or job seeker developing competencies'),
    ('mentor', 'Industry Mentor', 'Verified professional reviewing projects & providing feedback'),
    ('institution', 'Academic Institution', 'College/university dean, placement officer or faculty'),
    ('employer', 'Corporate Employer', 'Hiring manager or talent acquisition professional'),
    ('admin', 'System Administrator', 'Platform governance, dataset registry, and security')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT,
    role_id TEXT NOT NULL REFERENCES roles(id) DEFAULT 'student',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    headline TEXT,
    bio TEXT,
    avatar_url TEXT,
    phone TEXT,
    location_city TEXT,
    location_state TEXT,
    location_country TEXT DEFAULT 'India',
    current_education TEXT,
    institution_name TEXT,
    target_role_id TEXT,
    target_timeline_months INT DEFAULT 3,
    weekly_hours_available INT DEFAULT 15,
    preferred_language TEXT DEFAULT 'en', -- 'en', 'hi'
    low_bandwidth_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL, -- 'data_processing', 'employer_sharing', 'ai_training'
    is_granted BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address TEXT,
    user_agent TEXT,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- ====================================================================
-- 2. INDUSTRY & SKILL TAXONOMY
-- ====================================================================

CREATE TABLE IF NOT EXISTS job_roles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Data & AI', 'Software Engineering', 'Business & Analytics', 'Finance', 'Marketing'
    description TEXT,
    average_salary_inr INT,
    growth_rate_pct NUMERIC(5, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Technical', 'Professional', 'Domain'
    description TEXT,
    demand_level TEXT DEFAULT 'High', -- 'Critical', 'High', 'Medium', 'Emerging'
    assessment_type TEXT DEFAULT 'practical_exercise', -- 'mcq', 'coding', 'practical_exercise', 'case_study'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_role_id TEXT NOT NULL REFERENCES job_roles(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    required_level TEXT NOT NULL DEFAULT 'Intermediate', -- 'Beginner', 'Intermediate', 'Advanced'
    importance_weight NUMERIC(3, 2) DEFAULT 1.0, -- 1.0 (Critical) to 0.5 (Good to have)
    UNIQUE(job_role_id, skill_id)
);

CREATE TABLE IF NOT EXISTS industry_skill_demand (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    region TEXT DEFAULT 'India',
    active_job_postings INT DEFAULT 0,
    month_year DATE NOT NULL,
    growth_rate NUMERIC(5, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 3. EDUCATION & CURRICULUM
-- ====================================================================

CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT UNIQUE,
    state TEXT,
    city TEXT,
    accreditation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curricula (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    program_name TEXT NOT NULL, -- 'B.Tech CSE', 'B.Com', 'BCA', 'MBA'
    academic_year TEXT NOT NULL,
    syllabus_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curriculum_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curriculum_id UUID NOT NULL REFERENCES curricula(id) ON DELETE CASCADE,
    course_code TEXT,
    topic_name TEXT NOT NULL,
    mapped_skill_id TEXT REFERENCES skills(id),
    depth_level TEXT DEFAULT 'Theoretical', -- 'Theoretical', 'Practical', 'Mixed'
    is_aligned_with_industry BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 4. ASSESSMENTS & EVIDENCE
-- ====================================================================

CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id TEXT REFERENCES skills(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT DEFAULT 'Intermediate', -- 'Beginner', 'Intermediate', 'Advanced', 'Industry Challenge'
    duration_minutes INT DEFAULT 45,
    passing_score NUMERIC(5, 2) DEFAULT 70.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    score NUMERIC(5, 2),
    passed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    evidence_payload JSONB
);

-- ====================================================================
-- 5. PRACTICAL PROJECTS & VIRTUAL COMPANY
-- ====================================================================

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    department TEXT NOT NULL, -- 'Data Analytics', 'Finance', 'HR', 'Software Dev'
    difficulty TEXT DEFAULT 'Intermediate',
    business_problem TEXT NOT NULL,
    dataset_url TEXT,
    tools_required TEXT[],
    deliverables TEXT[],
    rubric JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    submission_url TEXT,
    notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending_review', -- 'pending_review', 'approved', 'revisions_requested'
    score NUMERIC(5, 2),
    reviewer_id UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    mentor_feedback TEXT
);

-- ====================================================================
-- 6. VERIFIED SKILL PASSPORTS
-- ====================================================================

CREATE TABLE IF NOT EXISTS skill_passports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    passport_slug TEXT UNIQUE NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    qr_verification_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS passport_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    passport_id UUID NOT NULL REFERENCES skill_passports(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES skills(id),
    competency_level TEXT NOT NULL, -- 'Demonstrated', 'Proficient', 'Master'
    verified_by TEXT NOT NULL, -- 'Platform Rubric + Mentor Review'
    verified_at TIMESTAMPTZ DEFAULT NOW(),
    evidence_type TEXT NOT NULL, -- 'Assessment', 'Virtual Workplace Project', 'Employer Challenge'
    evidence_url TEXT
);

-- ====================================================================
-- 7. AUDIT LOGS & WORKFLOW GOVERNANCE
-- ====================================================================

CREATE TABLE IF NOT EXISTS workflow_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id TEXT NOT NULL, -- e.g. 'WF01_USER_ONBOARDING'
    trigger_type TEXT NOT NULL, -- 'event', 'cron', 'manual'
    status TEXT NOT NULL DEFAULT 'running', -- 'running', 'completed', 'failed'
    input_payload JSONB,
    output_payload JSONB,
    error_message TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on user data tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_passports ENABLE ROW LEVEL SECURITY;
