export interface WorkflowStep {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  timestamp?: string;
  output?: Record<string, unknown>;
}

export interface WorkflowExecutionRecord {
  id: string;
  workflowId: string;
  workflowName: string;
  trigger: "event" | "cron" | "manual";
  status: "running" | "completed" | "failed";
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  steps: WorkflowStep[];
  auditId: string;
}

export class LearnXWorkflowEngine {
  private static instance: LearnXWorkflowEngine;
  private history: WorkflowExecutionRecord[] = [];

  private constructor() {
    this.seedDefaultExecutions();
  }

  public static getInstance(): LearnXWorkflowEngine {
    if (!LearnXWorkflowEngine.instance) {
      LearnXWorkflowEngine.instance = new LearnXWorkflowEngine();
    }
    return LearnXWorkflowEngine.instance;
  }

  private seedDefaultExecutions() {
    this.history = [
      {
        id: "wf-exec-101",
        workflowId: "WF01",
        workflowName: "User Onboarding & Baseline Diagnostic",
        trigger: "event",
        status: "completed",
        startedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        completedAt: new Date(Date.now() - 3600000 * 24 * 2 + 1800).toISOString(),
        durationMs: 1800,
        steps: [
          { name: "Validate User Profile & Role Goal", status: "completed" },
          { name: "Initialize Learning Digital Twin Record", status: "completed" },
          { name: "Assign Baseline Competency Diagnostic Assessment", status: "completed" },
          { name: "Generate Initial Skill-Gap Vector", status: "completed" },
        ],
        auditId: "aud-99120",
      },
      {
        id: "wf-exec-102",
        workflowId: "WF06",
        workflowName: "Automated Skill-Gap Recalculation",
        trigger: "event",
        status: "completed",
        startedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        completedAt: new Date(Date.now() - 3600000 * 5 + 920).toISOString(),
        durationMs: 920,
        steps: [
          { name: "Fetch Latest Target Role Taxonomy (Junior Data Analyst)", status: "completed" },
          { name: "Compare Demonstrated vs Required Competency Levels", status: "completed" },
          { name: "Update Learning Digital Twin Gap Heatmap", status: "completed" },
          { name: "Recalibrate Recommended Study Plan", status: "completed" },
        ],
        auditId: "aud-99121",
      },
      {
        id: "wf-exec-103",
        workflowId: "WF21",
        workflowName: "Skill Passport Verified Competency Minting",
        trigger: "event",
        status: "completed",
        startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        completedAt: new Date(Date.now() - 3600000 * 2 + 1250).toISOString(),
        durationMs: 1250,
        steps: [
          { name: "Verify Mentor Review Signature & Rubric Score (>80%)", status: "completed" },
          { name: "Generate Cryptographic Evidence Hash", status: "completed" },
          { name: "Publish Verified Skill Entry to Learner Passport", status: "completed" },
          { name: "Notify Active Employer Matching Engine", status: "completed" },
        ],
        auditId: "aud-99122",
      },
    ];
  }

  public getHistory(): WorkflowExecutionRecord[] {
    return this.history;
  }

  public async triggerWorkflow(
    workflowId: string,
    workflowName: string,
    payload: Record<string, unknown>
  ): Promise<WorkflowExecutionRecord> {
    const startTime = Date.now();
    const executionId = `wf-exec-${Date.now()}`;
    const auditId = `aud-${Math.floor(10000 + Math.random() * 90000)}`;

    const execution: WorkflowExecutionRecord = {
      id: executionId,
      workflowId,
      workflowName,
      trigger: "manual",
      status: "completed",
      startedAt: new Date(startTime).toISOString(),
      completedAt: new Date(startTime + 850).toISOString(),
      durationMs: 850,
      steps: [
        { name: "Validate Trigger Payload & Authentication", status: "completed" },
        { name: "Execute Core Business Rules Engine", status: "completed", output: payload },
        { name: "Persist State Changes & Update Digital Twin", status: "completed" },
        { name: "Emit Downstream Event & Log Audit Trail", status: "completed" },
      ],
      auditId,
    };

    this.history.unshift(execution);
    return execution;
  }
}
