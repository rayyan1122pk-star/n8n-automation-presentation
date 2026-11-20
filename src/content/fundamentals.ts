export type ComponentLayer =
  | "Ingestion & Sensing"
  | "Intelligence & Routing"
  | "Execution & Reliability";

export interface AutomationComponentItem {
  number: string;
  name: string;
  layer: ComponentLayer;
  iconKey:
    | "zap"
    | "fileInput"
    | "sliders"
    | "brain"
    | "gitBranch"
    | "play"
    | "plug"
    | "database"
    | "send"
    | "shieldAlert";
  explanation: string;
  example: string;
}

export const AUTOMATION_COMPONENTS: AutomationComponentItem[] = [
  {
    number: "01",
    name: "Trigger",
    layer: "Ingestion & Sensing",
    iconKey: "zap",
    explanation:
      "The starting event that wakes up a workflow automatically—either on a schedule, an incoming webhook, or an app event.",
    example: "A user uploads a PDF receipt or a new customer email arrives in Gmail.",
  },
  {
    number: "02",
    name: "Input",
    layer: "Ingestion & Sensing",
    iconKey: "fileInput",
    explanation:
      "The raw payload entering the workflow: binary files, email text, order JSON, or web form submissions.",
    example: "An invoice PDF file along with the uploader's timestamp and metadata.",
  },
  {
    number: "03",
    name: "Data Processing",
    layer: "Ingestion & Sensing",
    iconKey: "sliders",
    explanation:
      "Cleaning, parsing, and normalizing raw input into clean text or structured JSON fields before reasoning or storage.",
    example: "Extracting raw text from a PDF and stripping whitespace or currency symbols.",
  },
  {
    number: "04",
    name: "AI / LLM",
    layer: "Intelligence & Routing",
    iconKey: "brain",
    explanation:
      "Large Language Models that interpret meaning, classify categories, score urgency, extract entities, or draft contextual text.",
    example: "Gemini or OpenAI reads an unstructured invoice and outputs vendor, date, and line items.",
  },
  {
    number: "05",
    name: "Conditions and Logic",
    layer: "Intelligence & Routing",
    iconKey: "gitBranch",
    explanation:
      "Branching checkpoints (IF / Switch nodes) that direct data down different paths based on business rules or AI outputs.",
    example: "If an email is marked 'Urgent Support', route immediately to escalation; otherwise draft a reply.",
  },
  {
    number: "06",
    name: "Actions",
    layer: "Execution & Reliability",
    iconKey: "play",
    explanation:
      "Concrete tasks performed by the workflow once decisions are made—creating documents, updating records, or sending messages.",
    example: "Generate a formatted customer invoice PDF and dispatch an order confirmation email.",
  },
  {
    number: "07",
    name: "APIs and Integrations",
    layer: "Execution & Reliability",
    iconKey: "plug",
    explanation:
      "Standardized communication bridges (REST APIs, webhooks, OAuth connectors) that let independent software systems talk securely.",
    example: "Connecting n8n to Google Workspace, accounting dashboards, or messaging tools via HTTPS.",
  },
  {
    number: "08",
    name: "Database",
    layer: "Execution & Reliability",
    iconKey: "database",
    explanation:
      "Persistent structured storage where validated transactions, order statuses, inventory counts, and logs are saved for reporting.",
    example: "Writing categorized financial records into PostgreSQL or Google Sheets for analytics.",
  },
  {
    number: "09",
    name: "Output",
    layer: "Execution & Reliability",
    iconKey: "send",
    explanation:
      "The tangible result delivered to end users or downstream systems: updated dashboards, reports, invoices, or alerts.",
    example: "A live financial summary dashboard and a confirmation alert delivered to operations staff.",
  },
  {
    number: "10",
    name: "Error Handling",
    layer: "Execution & Reliability",
    iconKey: "shieldAlert",
    explanation:
      "Safeguards that detect malformed files, API timeouts, or missing fields, preventing silent failures and notifying administrators.",
    example: "If a file is unreadable or an API times out, retry automatically and log an exception alert.",
  },
];
