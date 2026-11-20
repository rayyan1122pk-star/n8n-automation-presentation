export interface ComparisonRow {
  dimension: string;
  traditional: string;
  aiAutomation: string;
}

export const INTRO_CONCEPTS = {
  automation: {
    eyebrow: "Foundation",
    title: "What is Automation?",
    summary:
      "Automation is the practice of configuring software to execute repetitive tasks automatically without continuous human intervention.",
    explanation:
      "A traditional automated workflow listens for a predefined event (a trigger), evaluates strict rules, and performs fixed actions—such as copying form entries into a spreadsheet or sending a scheduled confirmation email.",
    keyTraits: [
      "Follows deterministic, pre-written rules",
      "Triggers reliably on schedules or system events",
      "Eliminates repetitive manual copy-and-paste work",
    ],
  },
  aiAutomation: {
    eyebrow: "Evolution",
    title: "What is AI Automation?",
    summary:
      "AI automation embeds Artificial Intelligence models directly inside automated workflows so systems can read, understand, classify, and reason over messy real-world data.",
    explanation:
      "Instead of breaking when an invoice layout changes or a customer writes an informal email, AI automation interprets unstructured documents and natural language, extracts structured fields, and selects the right operational branch.",
    keyTraits: [
      "Understands natural language, PDFs, receipts, and emails",
      "Extracts structured fields from unstructured formats",
      "Adapts routing decisions based on context and urgency",
    ],
  },
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Execution Logic",
    traditional: "Rule-based execution (fixed if/else formulas)",
    aiAutomation: "AI-powered interpretation combined with structured rules",
  },
  {
    dimension: "Decision Boundaries",
    traditional: "Fixed conditions defined strictly in advance",
    aiAutomation: "Contextual classification and adaptive workflow decisions",
  },
  {
    dimension: "Input Format",
    traditional: "Structured inputs only (clean tables, fixed forms)",
    aiAutomation: "Unstructured input processing (PDFs, emails, free text)",
  },
  {
    dimension: "Information Handling",
    traditional: "Moves existing fields verbatim without reading meaning",
    aiAutomation: "Intelligent information extraction and summarization",
  },
  {
    dimension: "Response Style",
    traditional: "Predictable, identical template actions every run",
    aiAutomation: "Context-aware responses, routing, and exception flagging",
  },
];

export const TRANSFORMATION_STAGES = {
  manual: [
    {
      step: "01",
      label: "Receive Request",
      detail: "Staff opens emails, downloads PDFs, and reads messages manually.",
      friction: "High delay & inbox clutter",
    },
    {
      step: "02",
      label: "Read & Re-type",
      detail: "Employee copies dates, totals, or order items into spreadsheets.",
      friction: "Prone to typing errors",
    },
    {
      step: "03",
      label: "Check & Decide",
      detail: "Worker checks inventory or asks a manager how to categorize.",
      friction: "Bottlenecked on availability",
    },
    {
      step: "04",
      label: "Update & Reply",
      detail: "Manual invoice drafting, file saving, and confirmation emails.",
      friction: "Inconsistent turnaround",
    },
  ],
  automated: [
    {
      step: "01",
      label: "Instant Event Capture",
      detail: "Trigger detects uploaded file, incoming order, or new email immediately.",
      benefit: "Always-on 24/7 intake",
    },
    {
      step: "02",
      label: "AI Understanding",
      detail: "Language model reads content, extracts exact fields, and classifies intent.",
      benefit: "Handles varied formats",
    },
    {
      step: "03",
      label: "Automated Validation",
      detail: "Workflow verifies rules, checks records, and branches on exceptions.",
      benefit: "Consistent audit trail",
    },
    {
      step: "04",
      label: "Synchronized Execution",
      detail: "Databases update, reports generate, and stakeholders are notified.",
      benefit: "Seconds instead of hours",
    },
  ],
};
