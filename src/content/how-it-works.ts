export interface WorkflowStage {
  step: number;
  code: string;
  title: string;
  shortLabel: string;
  role: string;
  summary: string;
  dataIn: string;
  dataOut: string;
  audienceNote: string;
}

export const INTERACTIVE_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: 1,
    code: "01",
    title: "File Uploaded",
    shortLabel: "File Uploaded",
    role: "External Event",
    summary:
      "A team member submits a document—such as a vendor invoice, receipt, or order sheet—into the designated upload portal or watched folder.",
    dataIn: "Unprocessed PDF or image document from user",
    dataOut: "Upload event signal with file reference",
    audienceNote: "This is the only manual touchpoint; everything afterward happens automatically.",
  },
  {
    step: 2,
    code: "02",
    title: "Trigger Activated",
    shortLabel: "Trigger",
    role: "Workflow Entry",
    summary:
      "The automation engine detects the upload event via a webhook or polling trigger and launches a new execution instance.",
    dataIn: "HTTP webhook payload or folder change notification",
    dataOut: "Active workflow execution context with event metadata",
    audienceNote: "Think of a trigger as a motion sensor that switches on the entire assembly line.",
  },
  {
    step: 3,
    code: "03",
    title: "Document Retrieved",
    shortLabel: "Retrieve",
    role: "Ingestion",
    summary:
      "The workflow securely fetches the binary file content from storage so downstream processing nodes can inspect it.",
    dataIn: "File ID or download URL",
    dataOut: "Binary file buffer (PDF / image / document bytes)",
    audienceNote: "Security credentials authenticate the fetch without exposing passwords in code.",
  },
  {
    step: 4,
    code: "04",
    title: "Data Extracted",
    shortLabel: "Extract",
    role: "Parsing",
    summary:
      "Text extraction or OCR converts the raw document pages into readable plain text ready for AI interpretation.",
    dataIn: "Binary document buffer",
    dataOut: "Clean raw text string containing document contents",
    audienceNote: "Computers need readable text before an AI model can accurately reason over fields.",
  },
  {
    step: 5,
    code: "05",
    title: "AI Processing",
    shortLabel: "AI / LLM",
    role: "Intelligence",
    summary:
      "An AI language model analyzes the extracted text, identifies key fields (dates, amounts, vendor, category), and formats them as structured JSON.",
    dataIn: "Unstructured document text + structured extraction prompt",
    dataOut: "Structured JSON object with classified fields",
    audienceNote: "Unlike rigid rules, the AI understands varied document layouts automatically.",
  },
  {
    step: 6,
    code: "06",
    title: "Validation",
    shortLabel: "Validate",
    role: "Quality Gate",
    summary:
      "Conditional rules verify that required fields exist, numeric totals are valid, and no duplicate record is being processed.",
    dataIn: "AI-generated structured JSON",
    dataOut: "Verified record (Valid branch) or flagged item (Review branch)",
    audienceNote: "Validation ensures AI output is checked against business rules before saving.",
  },
  {
    step: 7,
    code: "07",
    title: "Database Updated",
    shortLabel: "Database",
    role: "Persistence",
    summary:
      "The verified structured record is written cleanly to the database or ledger table with timestamps and status tags.",
    dataIn: "Validated transaction / operation record",
    dataOut: "Stored row ID and confirmation receipt",
    audienceNote: "Data is immediately structured and queryable for dashboards and audits.",
  },
  {
    step: 8,
    code: "08",
    title: "Report Generated",
    shortLabel: "Report",
    role: "Synthesis",
    summary:
      "Aggregated figures, summaries, or formatted PDF outputs are compiled automatically from the freshly updated records.",
    dataIn: "Updated database records and summary metrics",
    dataOut: "Formatted report, invoice, or dashboard dataset",
    audienceNote: "Executives see current totals without waiting for end-of-month manual rollups.",
  },
  {
    step: 9,
    code: "09",
    title: "Notification Sent",
    shortLabel: "Notify",
    role: "Delivery",
    summary:
      "Stakeholders receive a concise confirmation email or status update confirming completion—or flagging an exception if review is needed.",
    dataIn: "Summary payload and recipient address",
    dataOut: "Delivered confirmation message and closed execution log",
    audienceNote: "Closes the loop cleanly so humans stay informed without doing manual labor.",
  },
];

export interface CoreConceptDefinition {
  term: string;
  role: string;
  definition: string;
  analogy: string;
}

export const WORKFLOW_CONCEPTS: CoreConceptDefinition[] = [
  {
    term: "Trigger",
    role: "Start Signal",
    definition:
      "The specific event that starts a workflow automatically—such as receiving a webhook, a new email, a form upload, or a scheduled timer.",
    analogy: "Like pressing the start button automatically when a parcel hits a conveyor belt.",
  },
  {
    term: "Node",
    role: "Single Step",
    definition:
      "An individual modular block inside a workflow that performs one focused job: reading a file, calling an AI model, checking a rule, or saving data.",
    analogy: "A single specialized workstation along an assembly line.",
  },
  {
    term: "Workflow",
    role: "Complete Pipeline",
    definition:
      "The full connected sequence of triggers, nodes, and conditional branches that turns raw input into a completed business outcome.",
    analogy: "The complete blueprint connecting every workstation from intake to delivery.",
  },
  {
    term: "Condition",
    role: "Decision Gate",
    definition:
      "A logical checkpoint (IF or Switch) that inspects live data and routes the execution down different branches depending on rules.",
    analogy: "A railway switch directing express shipments onto a priority track.",
  },
  {
    term: "Integration",
    role: "External Bridge",
    definition:
      "An authenticated connection to an external application or API (such as Gmail, Google Sheets, Gemini API, or PostgreSQL).",
    analogy: "Secure diplomatic channels allowing separate departments to exchange files.",
  },
  {
    term: "Execution",
    role: "Single Run",
    definition:
      "One concrete run of a workflow from trigger to completion, recorded with timestamps, input/output snapshots, and success or error status.",
    analogy: "One complete batch processed through the line, with its own audit receipt.",
  },
];
