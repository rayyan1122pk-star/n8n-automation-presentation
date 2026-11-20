export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  status: "Core Stack" | "Configurable / Project-Dependent";
  role: string;
  usedIn: string;
}

/**
 * EDITABLE CONFIGURATION:
 * Update the status and "usedIn" fields below to reflect the exact tools
 * active in your final project implementation. Never claim a tool that
 * was not used.
 */
export const TECH_STACK_ITEMS: TechStackItem[] = [
  {
    id: "n8n",
    name: "n8n",
    category: "Workflow Automation",
    status: "Core Stack",
    role: "Visual workflow orchestration, triggers, branching logic, credentials, and execution monitoring across all three solutions.",
    usedIn: "FinFlow, OpsFlow, MailFlow",
  },
  {
    id: "gemini",
    name: "Gemini API",
    category: "AI Processing",
    status: "Core Stack",
    role: "Document interpretation, entity extraction, email classification, urgency detection, and structured JSON output generation.",
    usedIn: "Editable — verify per solution",
  },
  {
    id: "openai",
    name: "OpenAI API",
    category: "AI Processing (Optional / If Used)",
    status: "Configurable / Project-Dependent",
    role: "Alternative or complementary LLM endpoint for natural language understanding, classification, and response drafting when enabled.",
    usedIn: "Include only if active in your workflow",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    category: "Event Communication",
    status: "Core Stack",
    role: "Real-time HTTP event listeners that immediately initiate workflows upon document uploads, order submissions, or app events.",
    usedIn: "FinFlow, OpsFlow, MailFlow",
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "System Integration",
    status: "Core Stack",
    role: "Standard JSON over HTTPS communication connecting n8n workflows to dashboards, mail servers, and external services.",
    usedIn: "FinFlow, OpsFlow, MailFlow",
  },
  {
    id: "postgresql",
    name: "PostgreSQL / Database",
    category: "Data Storage (If Used)",
    status: "Configurable / Project-Dependent",
    role: "Relational storage for financial transactions, customer orders, inventory counts, and email routing logs.",
    usedIn: "Update to match your active database",
  },
  {
    id: "google-sheets",
    name: "Google Sheets / Workspace",
    category: "Spreadsheet & Mail Integration (If Used)",
    status: "Configurable / Project-Dependent",
    role: "Accessible tabular storage, reporting sheets, Drive file triggers, and Gmail integration where configured.",
    usedIn: "Update to match your active integrations",
  },
];
