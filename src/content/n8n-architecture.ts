export interface N8nPillar {
  code: string;
  title: string;
  description: string;
}

export const N8N_OVERVIEW = {
  eyebrow: "Orchestration Engine",
  title: "Understanding n8n",
  lead: "n8n is a visual, node-based workflow automation platform that connects APIs, databases, business tools, and AI models into transparent, inspectable pipelines.",
  whyUsed:
    "Unlike rigid black-box SaaS tools, n8n combines visual clarity with full technical control—making it ideal for building enterprise-grade AI workflows that educators and engineers can inspect node by node.",
};

export const N8N_PILLARS: N8nPillar[] = [
  {
    code: "01",
    title: "What n8n Is",
    description:
      "A fair-code workflow automation orchestrator where every operational step is represented as a visual node connected by structured JSON data streams.",
  },
  {
    code: "02",
    title: "Why It Is Used",
    description:
      "Supports 400+ native integrations, custom HTTP/REST requests, built-in AI/LLM nodes, self-hosting privacy, and visual debugging of every step.",
  },
  {
    code: "03",
    title: "Workflows & Nodes",
    description:
      "A workflow is a directed graph of nodes. Each node receives structured items from upstream, executes one focused operation, and passes results forward.",
  },
  {
    code: "04",
    title: "Connections & Data Flow",
    description:
      "Lines between nodes carry arrays of JSON objects (and optional binary files). Downstream nodes reference upstream fields dynamically using expressions.",
  },
  {
    code: "05",
    title: "Credentials Management",
    description:
      "API keys, OAuth2 tokens, and database logins are stored encrypted in n8n's credential vault—never hard-coded inside workflow logic.",
  },
  {
    code: "06",
    title: "Executions & Audit Logs",
    description:
      "Every trigger fires a tracked execution. Teams can inspect exact inputs, outputs, and timings at each node to verify accuracy.",
  },
  {
    code: "07",
    title: "API Connectivity",
    description:
      "Dedicated HTTP Request and Webhook nodes allow n8n to communicate with any REST API, custom dashboard backend, or AI model endpoint.",
  },
  {
    code: "08",
    title: "Error Handling",
    description:
      "Supports automatic retries, fallback branches, and dedicated Error Trigger workflows so failures alert administrators instead of going unnoticed.",
  },
];

export interface ArchitectureDiagramNode {
  id: string;
  step: string;
  name: string;
  category: "Trigger" | "Ingestion" | "Parsing" | "AI Model" | "Logic" | "Storage" | "Action" | "Error";
  summary: string;
}

export const N8N_REFERENCE_FLOW: ArchitectureDiagramNode[] = [
  {
    id: "webhook",
    step: "01",
    name: "Webhook Trigger",
    category: "Trigger",
    summary: "Receives incoming HTTPS request or event payload",
  },
  {
    id: "read-file",
    step: "02",
    name: "Read File",
    category: "Ingestion",
    summary: "Loads attached document or binary payload",
  },
  {
    id: "extract",
    step: "03",
    name: "Extract Information",
    category: "Parsing",
    summary: "Converts binary document into clean text fields",
  },
  {
    id: "ai-process",
    step: "04",
    name: "AI Processing",
    category: "AI Model",
    summary: "LLM classifies intent and extracts structured JSON",
  },
  {
    id: "branch",
    step: "05",
    name: "Conditional Branch",
    category: "Logic",
    summary: "Validates schema & routes Valid vs Exception paths",
  },
  {
    id: "store",
    step: "06",
    name: "Store Data",
    category: "Storage",
    summary: "Writes validated record to database / ledger",
  },
  {
    id: "notify",
    step: "07",
    name: "Send Notification",
    category: "Action",
    summary: "Dispatches confirmation or alert to stakeholders",
  },
];
