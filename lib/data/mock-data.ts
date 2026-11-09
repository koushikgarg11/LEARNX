export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  averageSalaryINR: number;
  openingsIndia: number;
  growthRatePct: number;
  requiredSkills: {
    skillId: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    weight: number; // 0.1 to 1.0
  }[];
}

export interface Skill {
  id: string;
  name: string;
  category: "Technical" | "Analytical" | "Professional" | "Domain";
  description: string;
  demandIndex: number; // 1-100
  assessmentType: "SQL Runner" | "Python Sandbox" | "Case Study" | "Excel Simulation" | "Rubric Review" | "Code Sandbox Submission";
  learningEffortHours: number;
  relatedRoles: string[];
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "institution" | "employer" | "admin";
  avatar: string;
  education: string;
  institution: string;
  targetRole: string;
  weeklyHours: number;
  readinessScore: number;
  digitalTwin: {
    demonstratedSkills: string[];
    partiallyDemonstratedSkills: string[];
    unassessedSkills: string[];
    learningStreakDays: number;
    hoursLearned: number;
    completedProjectsCount: number;
    verifiedPassportScore: number;
  };
}

export interface VirtualCompanyProject {
  id: string;
  title: string;
  department: "Data Analytics" | "Finance & Accounting" | "Human Resources" | "Software Engineering";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  companyName: string;
  businessContext: string;
  objectives: string[];
  tasks: {
    step: number;
    title: string;
    description: string;
    tool: string;
  }[];
  rubric: {
    criterion: string;
    weight: number;
    description: string;
  }[];
}

export interface SkillPassportEntry {
  id: string;
  skillName: string;
  level: "Demonstrated" | "Proficient" | "Master";
  assessmentScore: number;
  verifiedBy: string;
  verifiedAt: string;
  verificationBadgeUrl: string;
  evidenceType: "Real Dataset Project" | "Code Sandbox Submission" | "Timed Arena Challenge";
  evidenceTitle: string;
}

export const INITIAL_SKILLS: Skill[] = [
  {
    id: "sql",
    name: "SQL & Relational Databases",
    category: "Technical",
    description: "Writing complex queries, CTEs, window functions, and data normalization for analytics.",
    demandIndex: 94,
    assessmentType: "SQL Runner",
    learningEffortHours: 25,
    relatedRoles: ["data_analyst", "business_analyst", "full_stack_dev"],
  },
  {
    id: "python_analytics",
    name: "Python for Data Analysis",
    category: "Technical",
    description: "Data manipulation with Pandas, NumPy, and statistical hypothesis testing.",
    demandIndex: 91,
    assessmentType: "Python Sandbox",
    learningEffortHours: 35,
    relatedRoles: ["data_analyst", "ai_ml_engineer"],
  },
  {
    id: "power_bi",
    name: "Power BI & Dashboarding",
    category: "Technical",
    description: "DAX expressions, data modeling, storytelling, and executive dashboard architecture.",
    demandIndex: 88,
    assessmentType: "Rubric Review",
    learningEffortHours: 20,
    relatedRoles: ["data_analyst", "business_analyst"],
  },
  {
    id: "excel_advanced",
    name: "Advanced Excel & Financial Modeling",
    category: "Technical",
    description: "XLOOKUP, INDEX-MATCH, Pivot Tables, Power Query, and Scenario Analysis.",
    demandIndex: 86,
    assessmentType: "Excel Simulation",
    learningEffortHours: 18,
    relatedRoles: ["financial_analyst", "business_analyst", "data_analyst"],
  },
  {
    id: "business_problem_solving",
    name: "Business Problem Structuring",
    category: "Analytical",
    description: "Structuring ambiguous business dilemmas into solvable hypothesis trees and MECE frameworks.",
    demandIndex: 92,
    assessmentType: "Case Study",
    learningEffortHours: 15,
    relatedRoles: ["business_analyst", "data_analyst", "financial_analyst"],
  },
  {
    id: "data_storytelling",
    name: "Data Storytelling & Presentation",
    category: "Professional",
    description: "Translating data insights into executive action points and compelling visual narratives.",
    demandIndex: 89,
    assessmentType: "Rubric Review",
    learningEffortHours: 12,
    relatedRoles: ["data_analyst", "business_analyst"],
  },
  {
    id: "react_typescript",
    name: "React & TypeScript Engineering",
    category: "Technical",
    description: "Component architecture, hooks, state management, and type-safe front-end systems.",
    demandIndex: 95,
    assessmentType: "Code Sandbox Submission",
    learningEffortHours: 40,
    relatedRoles: ["full_stack_dev"],
  },
  {
    id: "node_api",
    name: "Backend APIs & Node.js",
    category: "Technical",
    description: "RESTful and GraphQL service development, middleware, authentication, and database ORMs.",
    demandIndex: 90,
    assessmentType: "Code Sandbox Submission",
    learningEffortHours: 35,
    relatedRoles: ["full_stack_dev"],
  },
];

export const INITIAL_JOB_ROLES: JobRole[] = [
  {
    id: "data_analyst",
    title: "Junior Data Analyst",
    category: "Data & AI",
    description: "Analyze datasets, build automated dashboards, and deliver operational intelligence to stakeholders.",
    averageSalaryINR: 650000,
    openingsIndia: 38400,
    growthRatePct: 22.4,
    requiredSkills: [
      { skillId: "sql", level: "Advanced", weight: 0.35 },
      { skillId: "power_bi", level: "Intermediate", weight: 0.25 },
      { skillId: "python_analytics", level: "Intermediate", weight: 0.2 },
      { skillId: "data_storytelling", level: "Intermediate", weight: 0.2 },
    ],
  },
  {
    id: "business_analyst",
    title: "Associate Business Analyst",
    category: "Business & Analytics",
    description: "Bridge business requirements with technology solutions through process mapping and quantitative analysis.",
    averageSalaryINR: 720000,
    openingsIndia: 29500,
    growthRatePct: 18.2,
    requiredSkills: [
      { skillId: "business_problem_solving", level: "Advanced", weight: 0.35 },
      { skillId: "sql", level: "Intermediate", weight: 0.25 },
      { skillId: "excel_advanced", level: "Advanced", weight: 0.25 },
      { skillId: "data_storytelling", level: "Intermediate", weight: 0.15 },
    ],
  },
  {
    id: "full_stack_dev",
    title: "Junior Full Stack Engineer",
    category: "Software Engineering",
    description: "Build robust web applications spanning modern React/Next.js client applications and cloud-backed APIs.",
    averageSalaryINR: 800000,
    openingsIndia: 46200,
    growthRatePct: 26.5,
    requiredSkills: [
      { skillId: "react_typescript", level: "Advanced", weight: 0.4 },
      { skillId: "node_api", level: "Intermediate", weight: 0.35 },
      { skillId: "sql", level: "Intermediate", weight: 0.25 },
    ],
  },
  {
    id: "financial_analyst",
    title: "Financial Analyst – Corporate Advisory",
    category: "Finance & Accounting",
    description: "Conduct financial statement modeling, cash flow forecasting, and valuation analysis.",
    averageSalaryINR: 700000,
    openingsIndia: 18300,
    growthRatePct: 14.8,
    requiredSkills: [
      { skillId: "excel_advanced", level: "Advanced", weight: 0.4 },
      { skillId: "business_problem_solving", level: "Intermediate", weight: 0.3 },
      { skillId: "data_storytelling", level: "Intermediate", weight: 0.3 },
    ],
  },
];

export const CURRENT_LEARNER: LearnerProfile = {
  id: "learner-001",
  name: "Aarav Sharma",
  email: "aarav.sharma@example.edu.in",
  role: "student",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  education: "B.Com (Computer Applications) - Class of 2026",
  institution: "Delhi University",
  targetRole: "data_analyst",
  weeklyHours: 12,
  readinessScore: 68,
  digitalTwin: {
    demonstratedSkills: ["sql", "excel_advanced"],
    partiallyDemonstratedSkills: ["power_bi", "data_storytelling"],
    unassessedSkills: ["python_analytics", "business_problem_solving"],
    learningStreakDays: 14,
    hoursLearned: 46,
    completedProjectsCount: 2,
    verifiedPassportScore: 82,
  },
};

export const MOCK_PROJECTS: VirtualCompanyProject[] = [
  {
    id: "proj-retail-sales",
    title: "OmniRetail India: Sales Decline & Supply Disruption Diagnosis",
    department: "Data Analytics",
    difficulty: "Intermediate",
    companyName: "OmniRetail India Pvt. Ltd.",
    businessContext:
      "OmniRetail operates 140 hypermarkets across 12 tier-1 and tier-2 Indian cities. Over the last three quarters, same-store sales dropped 14.2% while stockout rates climbed in tier-2 regions. You have been brought in as a junior analytics associate to analyze POS transaction logs and supply chain feeds.",
    objectives: [
      "Cleanse 250,000 transaction rows using SQL CTEs & window functions",
      "Identify the top 5 product categories causing revenue erosion",
      "Build an interactive Power BI dashboard tracking store inventory velocity",
      "Deliver an executive summary presentation with 3 high-impact turnaround actions",
    ],
    tasks: [
      {
        step: 1,
        title: "Ingestion and Data Cleaning",
        description: "Identify null values, handle currency formatting, and isolate return transactions.",
        tool: "SQL / SQLite",
      },
      {
        step: 2,
        title: "Cohort and Store Performance Analysis",
        description: "Group stores by tier and calculate average basket value and repurchase frequency.",
        tool: "SQL Window Functions",
      },
      {
        step: 3,
        title: "Executive Storytelling Dashboard",
        description: "Develop a KPI card matrix, regional heat-map, and stockout duration scatter plot.",
        tool: "Power BI / Tableau",
      },
      {
        step: 4,
        title: "Business Recommendations Memo",
        description: "Synthesize operational findings into an actionable 2-page decision brief for the COO.",
        tool: "Rubric-evaluated Report",
      },
    ],
    rubric: [
      { criterion: "SQL Query Correctness & Efficiency", weight: 0.35, description: "Use of joins, CTEs, avoidance of Cartesian products" },
      { criterion: "Analytical Depth & Insight Quality", weight: 0.35, description: "Isolation of root causes versus superficial trends" },
      { criterion: "Dashboard UX & Visual Clarity", weight: 0.15, description: "Consistent color theory, clarity of KPI cards, filterability" },
      { criterion: "Business Communication & Actionability", weight: 0.15, description: "Clarity of memo recommendations for leadership" },
    ],
  },
  {
    id: "proj-hr-attrition",
    title: "NexTech India: Tech Talent Attrition & Early-Tenure Churn",
    department: "Human Resources",
    difficulty: "Intermediate",
    companyName: "NexTech Global Solutions",
    businessContext:
      "NexTech experienced an annualized attrition rate of 28% among engineers within their first 18 months of employment. Analyze exit interview transcripts, compensation benchmarks, and manager feedback scores to model turnover drivers.",
    objectives: [
      "Analyze historical employee attrition metrics across departments",
      "Correlate compensation ratios against local tech market percentiles",
      "Propose an intervention strategy to reduce early-tenure churn by 8%",
    ],
    tasks: [
      { step: 1, title: "Attrition Rate Calculations", description: "Calculate cohort-based retention curves.", tool: "Excel / Python" },
      { step: 2, title: "Sentiment Analysis on Exit Records", description: "Cluster feedback into compensation, management, and growth tags.", tool: "Python" },
      { step: 3, title: "Compensation Benchmark Gap", description: "Identify role families falling under 50th percentile of industry pay.", tool: "Power BI" },
    ],
    rubric: [
      { criterion: "Statistical Rigor", weight: 0.4, description: "Proper sample sizing and statistical validation" },
      { criterion: "Actionable Retention Strategy", weight: 0.35, description: "Feasible operational proposals for HR leadership" },
      { criterion: "Executive Presentation", weight: 0.25, description: "Clarity and visual conciseness" },
    ],
  },
  {
    id: "proj-customer-churn",
    title: "BharatFin Micro-Lending: Customer Retention & Risk Analysis",
    department: "Finance & Accounting",
    difficulty: "Advanced",
    companyName: "BharatFin Digital Credit",
    businessContext:
      "BharatFin provides working capital micro-loans to small MSME merchants. Repeat borrowing rates have stagnated in northern clusters. Evaluate loan default correlation and borrower engagement cycles.",
    objectives: [
      "Perform credit risk and repayment cycle segmentation",
      "Model likelihood of loan renewal based on first 90-day transaction history",
      "Deliver a risk-calibrated customer retention blueprint",
    ],
    tasks: [
      { step: 1, title: "Portfolio Data Auditing", description: "Audit delinquency rates and repayment aging buckets.", tool: "SQL / Excel" },
      { step: 2, title: "Merchant Clustering", description: "Segment borrowers by turnover, ticket size, and repayment speed.", tool: "Python / Scikit-Learn" },
      { step: 3, title: "Executive Risk Dashboard", description: "Construct early warning delinquency radar.", tool: "Power BI" },
    ],
    rubric: [
      { criterion: "Risk Analysis Precision", weight: 0.4, description: "Accurate risk classification methodology" },
      { criterion: "Financial Modeling", weight: 0.35, description: "Sound valuation and risk-adjusted return calculations" },
      { criterion: "Deliverable Presentation", weight: 0.25, description: "Regulatory compliance and clarity" },
    ],
  },
];

export const MOCK_PASSPORT_ENTRIES: SkillPassportEntry[] = [
  {
    id: "pass-01",
    skillName: "SQL & Relational Databases",
    level: "Proficient",
    assessmentScore: 92,
    verifiedBy: "Dr. R. Venkatraman (Ex-Amazon, LearnX Lead Assessor)",
    verifiedAt: "2026-10-14",
    verificationBadgeUrl: "/badges/sql-verified.svg",
    evidenceType: "Real Dataset Project",
    evidenceTitle: "OmniRetail POS 250k-Row Optimization & CTE Analysis",
  },
  {
    id: "pass-02",
    skillName: "Advanced Excel & Financial Modeling",
    level: "Demonstrated",
    assessmentScore: 88,
    verifiedBy: "Priya Nair, CFA (Senior Financial Mentor)",
    verifiedAt: "2026-09-28",
    verificationBadgeUrl: "/badges/excel-verified.svg",
    evidenceType: "Timed Arena Challenge",
    evidenceTitle: "Multi-Scenario Cash Flow Projection Model Challenge",
  },
];

export const NATIONAL_INTELLIGENCE_METRICS = {
  totalLearnersActive: 184200,
  verifiedCompetenciesAwarded: 62450,
  hiringPartnerCount: 420,
  participatingInstitutions: 118,
  topSkillsDemand: [
    { skill: "SQL & Relational DBs", growth: "+34%", jobsIndexed: 84200 },
    { skill: "Power BI / Tableau", growth: "+28%", jobsIndexed: 59100 },
    { skill: "Python Analytics", growth: "+26%", jobsIndexed: 71300 },
    { skill: "Cloud & DevOps (AWS/Azure)", growth: "+38%", jobsIndexed: 92400 },
    { skill: "Prompt Engineering & GenAI Workflows", growth: "+85%", jobsIndexed: 31200 },
  ],
  regionalGaps: [
    { region: "Bengaluru", techDemand: 98, localGradReadiness: 62, gap: 36 },
    { region: "Delhi-NCR", techDemand: 89, localGradReadiness: 55, gap: 34 },
    { region: "Hyderabad", techDemand: 92, localGradReadiness: 58, gap: 34 },
    { region: "Pune", techDemand: 84, localGradReadiness: 60, gap: 24 },
    { region: "Tier-2 Emerging (Indore, Coimbatore, Jaipur)", techDemand: 68, localGradReadiness: 38, gap: 30 },
  ],
};
