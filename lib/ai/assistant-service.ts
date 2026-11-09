export type AssistantRole =
  | "learning_mentor"
  | "career_mentor"
  | "project_mentor"
  | "interview_mentor"
  | "institution_assistant";

export interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  citations?: string[];
  actionPrompt?: string;
}

export interface AssistantMetadata {
  id: AssistantRole;
  title: string;
  tagline: string;
  avatarColor: string;
  greeting: string;
  samplePrompts: string[];
}

export const ASSISTANT_DIRECTORY: Record<AssistantRole, AssistantMetadata> = {
  learning_mentor: {
    id: "learning_mentor",
    title: "AI Learning Mentor",
    tagline: "Explains complex concepts, breaks down bottlenecks, and designs study drills",
    avatarColor: "bg-blue-600",
    greeting:
      "Hello! I'm your Learning Mentor. I noticed you are currently mastering SQL Window Functions and Power BI DAX. How can I assist your study session today?",
    samplePrompts: [
      "Explain the difference between RANK() and DENSE_RANK() with an Indian sales example",
      "I keep struggling with Power BI CALCULATE() filter context. Can you give me a simple mental model?",
      "Create a 45-minute daily practice schedule for SQL CTEs",
    ],
  },
  career_mentor: {
    id: "career_mentor",
    title: "AI Career Pathway Mentor",
    tagline: "Analyzes job requirements, career pivots, and skill-gap closure timelines",
    avatarColor: "bg-emerald-600",
    greeting:
      "Greetings! I help connect your demonstrated competencies to Indian and international job markets. What career path would you like to evaluate?",
    samplePrompts: [
      "How does my B.Com degree complement a Junior Data Analyst role?",
      "If I devote 12 hours/week, how long until my Skill Passport qualifies for entry-level analyst interviews?",
      "Compare the career progression and salary ceiling of a Data Analyst vs. Business Analyst in India",
    ],
  },
  project_mentor: {
    id: "project_mentor",
    title: "AI Virtual Company Project Mentor",
    tagline: "Guides your workplace simulation deliverables against real industry rubrics",
    avatarColor: "bg-purple-600",
    greeting:
      "Welcome to the OmniRetail Project Hub! I can review your SQL query logic, critique dashboard layouts, or help structure your executive memo. What are you working on?",
    samplePrompts: [
      "Review my SQL query structure for identifying store stockout duration",
      "What are the top 3 KPIs a Chief Operating Officer expects in a retail turnaround dashboard?",
      "How do I structure the executive recommendations section of my project brief?",
    ],
  },
  interview_mentor: {
    id: "interview_mentor",
    title: "AI Mock Interviewer & Workplace Coach",
    tagline: "Conducts technical problem-solving drills and behavioral STAR simulations",
    avatarColor: "bg-amber-600",
    greeting:
      "Ready to practice? I can conduct a mock technical interview for a Junior Data Analyst role or simulate behavioral questions with rubric-based feedback.",
    samplePrompts: [
      "Conduct a 3-question technical drill on SQL joins and aggregations",
      "Simulate a behavioral interview question: 'Tell me about a time you found an error in business data'",
      "How should I explain my OmniRetail project during a 45-minute hiring interview?",
    ],
  },
  institution_assistant: {
    id: "institution_assistant",
    title: "AI Curriculum Alignment Assistant",
    tagline: "Scans university course syllabi and recommends industry competency upgrades",
    avatarColor: "bg-rose-600",
    greeting:
      "Welcome, Academic Administrator. I can compare academic course outlines against current NCS and NASSCOM industry demand to highlight curriculum modernization opportunities.",
    samplePrompts: [
      "Analyze B.Com Semester 4 'Computer Applications' against Junior Data Analyst industry requirements",
      "Recommend 3 practical hands-on labs to replace theoretical database lecture hours",
      "Generate an evidence summary of student competency improvements across our 2026 cohort",
    ],
  },
};

export async function generateAssistantResponse(
  assistantType: AssistantRole,
  userMessage: string,
  userContext?: { currentRole?: string; targetRole?: string; skills?: string[] }
): Promise<AssistantMessage> {
  const queryLower = userMessage.toLowerCase();

  // Smart heuristic response engine tailored to the LEARNX pedagogy and rubrics
  if (assistantType === "learning_mentor") {
    if (queryLower.includes("rank") || queryLower.includes("dense_rank")) {
      return {
        id: `msg-${Date.now()}`,
        sender: "assistant",
        text: `### Difference Between \`RANK()\` and \`DENSE_RANK()\` in SQL\n\nImagine an Indian retail leaderboard for top-selling stores in Diwali:\n\n| Store | Revenue (INR) | RANK() | DENSE_RANK() |\n|---|---|---|---|\n| Store Mumbai | ₹50,00,000 | **1** | **1** |\n| Store Bengaluru | ₹45,00,000 | **2** | **2** |\n| Store Delhi | ₹45,00,000 | **2** (Tie) | **2** (Tie) |\n| Store Pune | ₹40,00,000 | **4** (Skips 3!) | **3** (No Skip!) |\n\n**Key Takeaway:**\n- \`RANK()\` leaves a gap after tied positions (e.g., 1, 2, 2, **4**).\n- \`DENSE_RANK()\` maintains contiguous consecutive ranks without skipping (e.g., 1, 2, 2, **3**).\n\n💡 *LearnX Practical Drill:* Try testing this in the **Interactive Challenge Arena** using the OmniRetail Transactions table.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations: ["LearnX SQL Standard Taxonomy", "PostgreSQL 16 Window Function Specification"],
        actionPrompt: "Open SQL Sandbox in Challenge Arena",
      };
    }

    if (queryLower.includes("calculate") || queryLower.includes("filter context")) {
      return {
        id: `msg-${Date.now()}`,
        sender: "assistant",
        text: `### Power BI: The Mental Model for \`CALCULATE()\`\n\nIn DAX, **Filter Context** is simply what rows are currently "in the spotlight" (e.g., filtered by a slicer for City = 'Bengaluru' and Year = 2026).\n\n\`CALCULATE()\` is the **only function in DAX that can modify or override this spotlight**.\n\n\`\`\`dax\nTotal Sales All India = \nCALCULATE(\n    [Total Sales],\n    ALL(DimStore[City])\n)\n\`\`\`\n\n**How it works step-by-step:**\n1. It freezes the current calculation of \`[Total Sales]\`.\n2. It removes the existing city filter using \`ALL(DimStore[City])\`.\n3. It recalculates the result across all cities.\n\nThis is essential for computing **Percentage Contribution of a City to Total Revenue**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations: ["Microsoft Power BI DAX Guide", "LearnX Virtual Workplace Retail Rubric"],
      };
    }
  }

  if (assistantType === "career_mentor") {
    return {
      id: `msg-${Date.now()}`,
      sender: "assistant",
      text: `### Career Transition Analysis: B.Com ➔ Junior Data Analyst\n\n**Your Strategic Advantage:**\nUnlike pure Computer Science graduates who often lack financial context, your B.Com background means you already understand **revenue recognition, ledger reconciliation, margins, and inventory turnover**.\n\nEmployers don't just want someone who can write \`SELECT * FROM orders\`; they want someone who understands **why EBITDA declined**.\n\n**Your 3-Step Milestone Plan:**\n1. **Demonstrate Data Mechanics:** Complete your SQL CTE and Power BI modules in the **Project Hub**.\n2. **Evidence-based Portfolio:** Complete the *OmniRetail Sales & Inventory* workplace simulation to add a verified rubric badge to your **Skill Passport**.\n3. **Application Phase:** With 2 verified projects, your LearnX Readiness Score reaches 78+, making you eligible for priority interview matching with our 420+ hiring partners.\n\nEstimated effort at 12 hours/week: **6 to 8 weeks** to interview readiness.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      citations: ["NASSCOM FutureSkills Prime Report 2025", "LearnX National Industry Skill Index"],
    };
  }

  // Default intelligent assistant response
  return {
    id: `msg-${Date.now()}`,
    sender: "assistant",
    text: `I've analyzed your question based on your current demonstrated competencies and target goal (${userContext?.targetRole || "Junior Data Analyst"}).\n\nTo ensure your progress translates into verified employability:\n1. Focus on practical deliverables with verifiable evidence rather than passive watching.\n2. In our **Virtual Workplace**, submit actual SQL scripts and Power BI dashboards to earn mentor verification.\n3. Your current Skill Passport has **2 verified skills**; earning your 3rd verified skill will boost your employer match rate by ~35%.\n\nWould you like me to generate a specific drill or review your latest submission?`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    citations: ["LearnX Competency Framework v2.4"],
  };
}
