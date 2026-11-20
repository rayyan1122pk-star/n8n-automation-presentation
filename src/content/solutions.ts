export type NodeCategory =
  | "Trigger"
  | "Ingestion"
  | "Data Processing"
  | "AI / Intelligence"
  | "Logic & Branching"
  | "Database / Storage"
  | "Action / Output"
  | "Error Handling";

export interface WorkflowNodeDoc {
  id: string;
  sequence: number;
  nodeName: string;
  nodeType: string;
  category: NodeCategory;
  isPlaceholder: boolean;
  whatIsIt: string;
  whatDoesItDo: string;
  whyUsed: string;
  inputData: string;
  processingLogic: string;
  outputData: string;
  nextConnection: string;
  keyConfig: string[];
}

export interface MediaAssetSpec {
  id: string;
  title: string;
  caption: string;
  primaryPath: string;
  fallbackPath: string;
  stockFallbackUrl?: string;
  aspect?: "wide" | "standard" | "tall";
  tag?: string;
}

export interface VideoSpec {
  title: string;
  primaryPath: string;
  fallbackPath: string;
  posterPrimaryPath: string;
  posterFallbackPath: string;
  durationLabel: string;
  summary: string;
  demonstrates: string[];
}

export interface TechnicalDeepDive {
  conditionalBranching: {
    title: string;
    summary: string;
    branches: { condition: string; path: string; outcome: string }[];
  };
  apisAndIntegrations: {
    title: string;
    summary: string;
    connections: { service: string; protocol: string; purpose: string }[];
  };
  errorHandling: {
    title: string;
    summary: string;
    safeguards: { failureMode: string; handling: string }[];
  };
}

export interface SolutionConfig {
  id: "finflow" | "opsflow" | "mailflow";
  mode: "live" | "showcase";
  badgeLabel: string;
  sectionNumber: string;
  name: string;
  category: string;
  tagline: string;
  theme: "dark" | "light";
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  expectedBenefits: string[];
  previewScreenshot: MediaAssetSpec;
  problem: {
    headline: string;
    summary: string;
    painPoints: string[];
  };
  solution: {
    headline: string;
    summary: string;
    outcomes: string[];
  };
  functionalSteps: {
    step: string;
    title: string;
    detail: string;
  }[];
  highLevelDataFlow: {
    stage: string;
    label: string;
    payload: string;
  }[];
  workflowScreenshots: MediaAssetSpec[];
  workflowOverview: string;
  nodesPlaceholderNotice: string;
  nodes: WorkflowNodeDoc[];
  technicalDeepDive: TechnicalDeepDive;
  dashboardScreenshots: MediaAssetSpec[];
  video: VideoSpec;
}

export const FINFLOW_DEMO_ANALYTICS = {
  disclaimer:
    "FinFlow live financial analytics are rendered directly from persisted local n8n SQLite Data Tables inside the Live Demonstration panel.",
  kpis: [
    { label: "Live Storage Engine", value: "SQLite", delta: "n8n Data Tables on D:" },
    { label: "Accounting Math", value: "Deterministic", delta: "Multi-currency isolated" },
    { label: "Duplicate Guard", value: "Active", delta: "Fingerprint blocked (409)" },
    { label: "Human Review Queue", value: "Enabled", delta: "Flags missing fields" },
  ],
  monthlyTrends: [
    { month: "Sep", revenue: 3800, expenses: 1950, profit: 1850 },
    { month: "Oct", revenue: 4100, expenses: 2120, profit: 1980 },
    { month: "Nov", revenue: 4200, expenses: 1998, profit: 2202 },
  ],
  expenseDistribution: [
    { category: "Software & Cloud", value: 46, color: "#6D28D9" },
    { category: "Professional Services", value: 26, color: "#7C3AED" },
    { category: "Equipment", value: 16, color: "#9333EA" },
    { category: "Office & Utilities", value: 12, color: "#C4B5FD" },
  ],
};

export const SOLUTIONS: SolutionConfig[] = [
  /* =========================================================================
     PROJECT 1 — FINFLOW (PRIMARY LIVE DEMONSTRATION)
     ========================================================================= */
  {
    id: "finflow",
    mode: "live",
    badgeLabel: "LIVE DEMONSTRATION",
    sectionNumber: "01",
    name: "FinFlow — Smart Document & Accounting Automation",
    category: "Primary Live Project · Accounting & Document AI",
    tagline:
      "Live local n8n document extraction, vendor workflow automation, duplicate protection, and deterministic multi-currency CRM accounting.",
    theme: "light",
    shortDescription:
      "Upload real PDF invoices, CSV/Excel statements, or receipts—or run the live Vendor Workflow—to watch local n8n extract, validate, persist, and recalculate your CRM dashboard in real time.",
    fullDescription:
      "FinFlow is our primary live demonstration connected directly to a locally hosted n8n v2.48.5 instance (http://localhost:5678). It ingests financial documents (PDF, JPG, PNG, CSV, XLSX, JSON, TXT) and live Vendor Workflow triggers, extracts structured accounting fields via Google Gemini (with honest deterministic parsing and human review flagging—never inventing missing numbers), blocks duplicate invoices, upserts vendors into persistent SQLite Data Tables, and recalculates income, expenses, and net profit strictly per ISO currency.",
    capabilities: [
      "Real binary PDF, CSV, Excel, JSON, TXT, and receipt image intake",
      "Google Gemini AI extraction with strict no-hallucination validation",
      "Deterministic subtotal + tax = total check & duplicate fingerprint blocking (HTTP 409)",
      "Live 'Run Vendor Workflow' demonstration with DEMO DATA labeling",
      "Persistent SQLite Data Tables (Transactions, Vendors, Review Queue, Activity)",
      "Multi-currency CRM dashboard (Income, Expenses, Net Profit, Vendor & Category Analytics)",
    ],
    expectedBenefits: [
      "Eliminates manual invoice data entry across PDF, CSV, and spreadsheet formats",
      "Prevents double-counting via deterministic vendor + invoice + currency fingerprinting",
      "Guarantees accounting accuracy with deterministic arithmetic instead of LLM math",
      "Protects audit integrity by routing incomplete or unreadable scans to Human Review",
      "Maintains a real-time vendor expense directory and monthly profit visibility",
    ],
    previewScreenshot: {
      id: "finflow-preview",
      title: "FinFlow — Live Local n8n Workflow",
      caption: "Actual FinFlow workflow running on http://localhost:5678.",
      primaryPath: "/media/finflow/workflow-main.png",
      fallbackPath: "/media/finflow/workflow-main.png",
      tag: "Live n8n Workflow",
    },
    problem: {
      headline: "Manual bookkeeping breaks down under multi-format invoices and receipts",
      summary:
        "Small and growing businesses receive invoices as PDFs, spreadsheets, CSV exports, and receipt photos. Re-typing figures into spreadsheets causes arithmetic errors, duplicate entries, mixed currencies, and zero real-time visibility into vendor spend.",
      painPoints: [
        "Hours spent re-keying vendor names, invoice numbers, taxes, and due dates from PDFs and receipts",
        "Duplicate supplier invoices accidentally recorded twice, inflating expenses",
        "Missing or blurry fields silently guessed instead of flagged for human review",
        "Multi-currency transactions accidentally summed together without FX conversion",
      ],
    },
    solution: {
      headline: "End-to-end document extraction, deterministic validation, and live CRM ledger",
      summary:
        "FinFlow pairs native n8n file extractors and Google Gemini AI with deterministic JavaScript accounting rules and persistent local SQLite Data Tables—updating Overview KPIs, Vendor Management, Expense Analytics, and Activity feeds on every execution.",
      outcomes: [
        "Extracts Vendor, Invoice #, Dates, Description, Category, Subtotal, Tax, Total, and Currency",
        "Separates uploaded expense invoices strictly from income records and never invents missing values",
        "Blocks duplicate documents automatically with HTTP 409 and logs the attempt",
        "Persists every vendor, transaction, review item, and activity event across restarts",
      ],
    },
    functionalSteps: [
      {
        step: "01",
        title: "Document Upload or Vendor Workflow Trigger",
        detail:
          "Receives uploaded PDF/JPG/PNG/CSV/XLSX files or live Vendor Workflow payloads via POST /webhook/finflow.",
      },
      {
        step: "02",
        title: "Native File Extraction & AI Structuring",
        detail:
          "Runs native n8n Extract from File nodes and Gemini Financial Extractor (with resilient fallback) to structure accounting fields.",
      },
      {
        step: "03",
        title: "Deterministic Validation & Duplicate Gate",
        detail:
          "Verifies subtotal + tax = total, flags missing fields to Human Review, and blocks duplicate fingerprints.",
      },
      {
        step: "04",
        title: "Persistent Storage & Live CRM Recalculation",
        detail:
          "Upserts vendor records, inserts validated transactions into local SQLite Data Tables, logs activity, and returns refreshed multi-currency analytics.",
      },
    ],
    highLevelDataFlow: [
      { stage: "01", label: "Intake", payload: "PDF / CSV / XLSX / Image / Vendor Trigger" },
      { stage: "02", label: "Extract & AI", payload: "Extract From File + Gemini JSON" },
      { stage: "03", label: "Validate", payload: "Arithmetic Check + Duplicate Guard" },
      { stage: "04", label: "Persist", payload: "Vendors, Ledger, Review Queue, Activity" },
      { stage: "05", label: "CRM Output", payload: "Deterministic Multi-Currency Analytics" },
    ],
    workflowScreenshots: [
      {
        id: "finflow-wf-1",
        title: "FinFlow Workflow — Part 1: Document Intake, Native Extractors & Gemini AI (Zoomed HD)",
        caption:
          "High-definition capture from local n8n showing Stage 1 (Intake & Routing), Stage 2 (Native Extractors), Stage 3 (Gemini 3.1 AI Extractor), Stage 4 (Deterministic Accounting Engine), Stage 7 (Live CRM Telemetry Pipeline), and Stage 8 (Error Handling).",
        primaryPath: "/media/finflow/workflow-part-1.png",
        fallbackPath: "/media/finflow/workflow-part-1.png",
        tag: "Part 1: Intake & AI",
      },
      {
        id: "finflow-wf-2",
        title: "FinFlow Workflow — Part 2: Duplicate Check, Vendor Upsert & Storage (Zoomed HD)",
        caption:
          "High-definition capture showing Stage 5 (Duplicate Prevention Gate), Stage 6 (Persistent Storage & CRM Sync Success Path), Duplicate Rejection (HTTP 409), and Human Review Queue (HTTP 202).",
        primaryPath: "/media/finflow/workflow-part-2.png",
        fallbackPath: "/media/finflow/workflow-part-2.png",
        tag: "Part 2: Storage & CRM",
      },
      {
        id: "finflow-wf-full",
        title: "FinFlow Workflow — Full End-to-End Canvas Overview (Live n8n UI)",
        caption:
          "Complete end-to-end canvas capture from the running local n8n instance at http://localhost:5678 showing all stages and connections.",
        primaryPath: "/media/finflow/workflow-main.png",
        fallbackPath: "/media/finflow/workflow-main.png",
        tag: "Full Overview",
      },
      {
        id: "finflow-wf-hd-map",
        title: "FinFlow Workflow — Full High-Definition Architecture Map (Vector HD)",
        caption:
          "Ultra-crisp 8,300 x 2,200 vector architectural blueprint with every node label, icon, connection line, and technical teacher sticky note 100% visible and sharp.",
        primaryPath: "/media/finflow/workflow-canvas-hd.svg",
        fallbackPath: "/media/finflow/workflow-canvas-hd.svg",
        tag: "Full HD Vector Blueprint",
      },
    ],
    workflowOverview:
      "50-node live production-grade workflow on local n8n v2.48.5 handling document extraction, Gemini AI parsing, vendor workflow execution, duplicate detection, human review separation, and real-time multi-currency CRM aggregation.",
    nodesPlaceholderNotice: "",
    nodes: [
      {
        id: "finflow-node-1",
        sequence: 1,
        nodeName: "FinFlow Webhook Intake",
        nodeType: "n8n-nodes-base.webhook (v2.1)",
        category: "Trigger",
        isPlaceholder: false,
        whatIsIt: "An HTTP POST webhook endpoint listening locally on /webhook/finflow.",
        whatDoesItDo:
          "Accepts multipart binary document uploads (PDF, JPG, PNG, CSV, XLSX, TXT, JSON), Vendor Workflow JSON triggers, and CRM Dashboard read requests.",
        whyUsed:
          "Allows the Next.js backend to execute real n8n workflows synchronously and return verified execution results to the CRM UI.",
        inputData: "Multipart FormData binary file or JSON payload with action discriminator.",
        processingLogic: "Receives HTTP POST and hands off execution with responseMode set to responseNode.",
        outputData: "Normalized webhook JSON headers, body, and binary file object.",
        nextConnection: "Detect Input & Document Type",
        keyConfig: ["httpMethod: POST", "path: finflow", "responseMode: responseNode"],
      },
      {
        id: "finflow-node-2",
        sequence: 2,
        nodeName: "Detect Input & Document Type",
        nodeType: "n8n-nodes-base.code (v2)",
        category: "Data Processing",
        isPlaceholder: false,
        whatIsIt: "A JavaScript Code node acting as the intake gatekeeper and validator.",
        whatDoesItDo:
          "Identifies whether the request is a document upload, Vendor Workflow execution, or CRM Dashboard fetch, validates file extensions, and checks vendor payload arithmetic.",
        whyUsed:
          "Rejects unsupported file formats (such as .exe) and malformed payloads before invoking extractors or database writes.",
        inputData: "Webhook body, headers, and binary attachment metadata.",
        processingLogic:
          "Inspects MIME/extension, normalizes binary key to 'data', enforces vendor_workflow validation, and outputs a clean route token.",
        outputData: "Routed item with route (binary_pdf, binary_csv, binary_xlsx, binary_text, direct_content, vendor_workflow, crm_dashboard, or invalid).",
        nextConnection: "Route Action or Document",
        keyConfig: ["Allowed extensions: pdf, csv, xlsx, xls, png, jpg, webp, json, txt", "Demo flag separation: is_demo"],
      },
      {
        id: "finflow-node-3",
        sequence: 3,
        nodeName: "Extract PDF / CSV / Excel / Text Content",
        nodeType: "n8n-nodes-base.extractFromFile (v1.1)",
        category: "Ingestion",
        isPlaceholder: false,
        whatIsIt: "Four dedicated native n8n Extract From File nodes wired to the Switch router.",
        whatDoesItDo:
          "Extracts raw text from real PDF binaries, structured rows from CSV/XLSX spreadsheets, and UTF-8 content from text/JSON files.",
        whyUsed:
          "Processes real accounting documents locally without sending files to third-party cloud storage.",
        inputData: "Normalized binary field 'data'.",
        processingLogic: "Runs format-specific parser with onError: continueErrorOutput routed to Format Extraction Failure.",
        outputData: "Extracted document text or tabular row objects.",
        nextConnection: "Unify Extracted Content (or Format Extraction Failure on error)",
        keyConfig: ["operations: pdf, csv, xlsx, text", "onError: continueErrorOutput"],
      },
      {
        id: "finflow-node-4",
        sequence: 4,
        nodeName: "Gemini Financial Extractor",
        nodeType: "@n8n/n8n-nodes-langchain.googleGemini (v1.1)",
        category: "AI / Intelligence",
        isPlaceholder: false,
        whatIsIt: "Official Google Gemini node configured for structured JSON accounting extraction.",
        whatDoesItDo:
          "Reads unified document content and extracts vendor_name, invoice_number, dates, description, expense_category, subtotal, tax_amount, total_amount, currency, and payment_status.",
        whyUsed:
          "Handles unstructured layouts across diverse supplier invoices while explicitly forbidding invented financial numbers.",
        inputData: "Unified document text & filename from Unify Extracted Content.",
        processingLogic: "Model models/gemini-2.5-flash, jsonOutput: true, temperature 0.1, with onError: continueErrorOutput into AI Fallback & Error Handler.",
        outputData: "Structured JSON accounting payload.",
        nextConnection: "Parse & Validate Gemini Output (Success) / AI Fallback & Error Handler (Error)",
        keyConfig: ["modelId: models/gemini-2.5-flash", "jsonOutput: true", "temperature: 0.1", "No placeholder credential IDs"],
      },
      {
        id: "finflow-node-5",
        sequence: 5,
        nodeName: "Normalize & Validate Financial Record",
        nodeType: "n8n-nodes-base.code (v2)",
        category: "Data Processing",
        isPlaceholder: false,
        whatIsIt: "Deterministic accounting validation and normalization engine.",
        whatDoesItDo:
          "Normalizes ISO dates and currencies, checks subtotal + tax = total within $0.05 tolerance, categorizes expenses, builds a deterministic duplicate fingerprint, and flags any missing fields.",
        whyUsed:
          "Guarantees financial integrity deterministically—never relying on an LLM for totals or allowing incomplete records into the ledger.",
        inputData: "Extracted financial fields from Gemini or structured/deterministic parser.",
        processingLogic:
          "Computes fingerprint (vendor_slug|invoice_number|currency), flags missing_fields[], defaults uploaded invoices strictly to expense unless explicitly marked income.",
        outputData: "Validated accounting record with validation_status ('valid' or 'needs_review').",
        nextConnection: "Check Existing Transactions",
        keyConfig: ["Deterministic arithmetic reconciliation", "Strict expense vs income separation", "Zero invented values"],
      },
      {
        id: "finflow-node-6",
        sequence: 6,
        nodeName: "Check Existing Transactions & Vendors + Evaluate Duplicate",
        nodeType: "n8n-nodes-base.dataTable (v1.1) + Code",
        category: "Logic & Branching",
        isPlaceholder: false,
        whatIsIt: "Persistent lookup against finflow_crm_transactions and finflow_vendors followed by decision routing.",
        whatDoesItDo:
          "Detects duplicate invoices by fingerprint and checks whether the vendor already exists in the vendor directory.",
        whyUsed:
          "Prevents duplicate invoice double-counting and avoids creating duplicate vendor profiles.",
        inputData: "Normalized financial record or validated Vendor Workflow payload.",
        processingLogic:
          "Uses executeOnce: true and alwaysOutputData: true to load tables cleanly and route into NewVendorAndTx, ExistingVendorTx, Duplicate (HTTP 409), or ReviewQueue (HTTP 202).",
        outputData: "Final decision token and resolved vendor_id.",
        nextConnection: "Quality & Duplicate Router",
        keyConfig: ["finflow_crm_transactions lookup", "finflow_vendors lookup", "executeOnce: true"],
      },
      {
        id: "finflow-node-7",
        sequence: 7,
        nodeName: "Save Vendor Record, Store Validated Transaction & Log Activity",
        nodeType: "n8n-nodes-base.dataTable (v1.1)",
        category: "Database / Storage",
        isPlaceholder: false,
        whatIsIt: "Three chained native n8n Data Table insert nodes backed by local SQLite.",
        whatDoesItDo:
          "Persists new vendors to finflow_vendors, inserts validated transactions to finflow_crm_transactions (preserving is_demo separation), and records audit entries in finflow_activity.",
        whyUsed:
          "Ensures every uploaded invoice and Vendor Workflow run survives page refreshes and laptop restarts.",
        inputData: "Approved vendor and transaction objects.",
        processingLogic: "Maps all typed columns cleanly with defineBelow expressions.",
        outputData: "Persisted SQLite row records.",
        nextConnection: "Reload CRM Data Tables → Format Processed CRM Response",
        keyConfig: ["Tables: finflow_vendors, finflow_crm_transactions, finflow_activity", "Storage: D:\\AI-Automation\\n8n-data"],
      },
      {
        id: "finflow-node-8",
        sequence: 8,
        nodeName: "Build CRM Dashboard Snapshot & Respond",
        nodeType: "n8n-nodes-base.code (v2) + respondToWebhook (v1.5)",
        category: "Action / Output",
        isPlaceholder: false,
        whatIsIt: "Deterministic multi-currency aggregation engine and webhook responder.",
        whatDoesItDo:
          "Computes Total Income, Total Expenses, Net Profit, Monthly Trends, Category Breakdown, Vendor-Wise Expenses, and Recent Activity segmented strictly by ISO currency.",
        whyUsed:
          "Delivers verified live CRM state directly back to the presentation dashboard on every load, upload, and Vendor Workflow execution.",
        inputData: "All persisted rows from transactions, vendors, review queue, and activity log.",
        processingLogic: "Rounds all sums deterministically to 2 decimal places per currency without ever mixing currencies.",
        outputData: "Structured JSON response with execution_id, created records, and full dashboard snapshot.",
        nextConnection: "HTTP 200 JSON response to Next.js backend",
        keyConfig: ["Per-currency isolation", "Includes real n8n $execution.id"],
      },
    ],
    technicalDeepDive: {
      conditionalBranching: {
        title: "8-Way Intake & 4-Way Quality/Duplicate Routing",
        summary:
          "FinFlow separates document formats, reporting requests, vendor workflow runs, duplicates, and incomplete records into distinct deterministic paths.",
        branches: [
          {
            condition: "route === 'vendor_workflow'",
            path: "Vendor Validation → Duplicate & Vendor Lookup → Save Vendor & Transaction → CRM Snapshot",
            outcome: "Creates unique DEMO DATA vendor and expense record in persistent storage and updates CRM totals.",
          },
          {
            condition: "final_decision === 'duplicate'",
            path: "Log Duplicate Attempt → Respond Duplicate Detected (HTTP 409)",
            outcome: "Blocks double-insertion and returns the existing record_id.",
          },
          {
            condition: "final_decision === 'queue_review'",
            path: "Store in Review Queue → Log Pending Review → Respond Needs Human Review (HTTP 202)",
            outcome: "Isolates incomplete/uncertain records without polluting accounting totals.",
          },
        ],
      },
      apisAndIntegrations: {
        title: "Local n8n Webhook, Gemini AI & Native SQLite Data Tables",
        summary:
          "All storage runs locally on D:\\AI-Automation\\n8n-data with zero cloud hosting or paid third-party databases.",
        connections: [
          { service: "Local n8n Webhook", protocol: "HTTP POST (localhost:5678)", purpose: "Live document upload, vendor workflow execution, and CRM dashboard API" },
          { service: "Google Gemini API", protocol: "n8n Google Gemini Node", purpose: "Unstructured invoice & receipt field extraction (gemini-2.5-flash)" },
          { service: "n8n SQLite Data Tables", protocol: "Native dataTable v1.1", purpose: "Persistent local storage for transactions, vendors, review queue, and activity" },
        ],
      },
      errorHandling: {
        title: "Extraction, Arithmetic, Duplicate & AI Safeguards",
        summary:
          "Every file extractor and AI node uses continueErrorOutput so failures are captured and logged safely rather than crashing executions.",
        safeguards: [
          { failureMode: "Unsupported file format (.exe, empty file)", handling: "Rejected immediately with HTTP 400 and logged in finflow_review_queue & finflow_activity." },
          { failureMode: "Missing financial fields or image without OCR", handling: "Never invents values; flags missing_fields[] and separates into Pending Reviews (HTTP 202)." },
          { failureMode: "Arithmetic mismatch (subtotal + tax != total)", handling: "Detected deterministically and routed to Human Review." },
          { failureMode: "Duplicate invoice submission", handling: "Blocked via fingerprint comparison with HTTP 409." },
        ],
      },
    },
    dashboardScreenshots: [
      {
        id: "finflow-dash-1",
        title: "FinFlow Live Workflow Architecture (n8n Canvas)",
        caption: "Live workflow powering the interactive FinFlow CRM Dashboard above.",
        primaryPath: "/media/finflow/workflow-main.png",
        fallbackPath: "/media/finflow/workflow-main.png",
      },
    ],
    video: {
      title: "FinFlow Live Interactive Demonstration",
      primaryPath: "/media/finflow/finflow-demo.mp4",
      fallbackPath: "/media/finflow/finflow-demo.mp4",
      posterPrimaryPath: "/media/finflow/workflow-main.png",
      posterFallbackPath: "/media/finflow/workflow-main.png",
      durationLabel: "Live Demo",
      summary: "Use the interactive Upload Invoice and Run Vendor Workflow panel above to demonstrate FinFlow live.",
      demonstrates: [
        "Real PDF / CSV / receipt upload and extraction",
        "Live Vendor Workflow execution with DEMO DATA tagging",
        "Duplicate blocking and persistent multi-currency CRM updates",
      ],
    },
  },

  /* =========================================================================
     PROJECT 2 — OPSFLOW (PRESENTATION SHOWCASE ONLY)
     ========================================================================= */
  {
    id: "opsflow",
    mode: "showcase",
    badgeLabel: "PROJECT SHOWCASE · PRESENTATION ONLY",
    sectionNumber: "02",
    name: "OpsFlow — Automated Business Operations",
    category: "Project Showcase · Order & Inventory Automation",
    tagline:
      "Automated order validation, duplicate protection, real-time inventory checks, deterministic invoicing, and operational reporting.",
    theme: "light",
    shortDescription:
      "Presentation showcase demonstrating how n8n automates incoming customer orders, checks live inventory, generates deterministic invoices, prevents overselling, and updates business reports.",
    fullDescription:
      "OpsFlow is a 32-node business operations workflow built in n8n to automate end-to-end order processing and inventory control. When a customer order arrives, OpsFlow validates customer and line-item fields, blocks duplicate order IDs, verifies stock levels across every requested SKU, deterministically calculates subtotals and taxes, deducts inventory only when stock is confirmed, generates structured invoices, and isolates unavailable items safely without corrupting stock counts.",
    capabilities: [
      "Incoming customer order reception & schema validation",
      "Duplicate order ID blocking (HTTP 409) before any inventory mutation",
      "Real-time multi-SKU inventory availability verification",
      "Deterministic invoice generation (subtotal, tax, final total, invoice number)",
      "Safe Pending Stock routing when items are out of stock or missing (zero stock deduction)",
      "Structured operations reporting with low-stock reorder alerts",
    ],
    expectedBenefits: [
      "Eliminates overselling by verifying live stock across all line items before confirmation",
      "Cuts order-to-invoice processing time from minutes to under one second",
      "Prevents double-billing and duplicate inventory deductions on retried submissions",
      "Surfaces low-stock SKUs automatically so purchasing teams reorder before stockouts",
      "Maintains a complete, auditable trail of orders, invoices, stock movements, and alerts",
    ],
    previewScreenshot: {
      id: "opsflow-preview",
      title: "OpsFlow — Actual n8n Workflow",
      caption: "Actual OpsFlow workflow architecture captured from local n8n.",
      primaryPath: "/media/opsflow/workflow-main.png",
      fallbackPath: "/media/opsflow/workflow-main.png",
      tag: "Project Showcase",
    },
    problem: {
      headline: "Manual order handling leads to overselling, billing errors, and slow fulfillment",
      summary:
        "When teams manually copy orders into inventory sheets and accounting tools, stock levels drift out of sync, duplicate submissions cause double-shipments, and customers wait hours for confirmation or out-of-stock notices.",
      painPoints: [
        "Orders confirmed even when warehouse stock is insufficient, causing backorder surprises",
        "Manual subtotal and tax calculations introducing invoice discrepancies",
        "Retried webhook or form submissions creating duplicate orders and incorrect stock deductions",
        "No centralized visibility into pending orders, issued invoices, and low-stock reorder thresholds",
      ],
    },
    solution: {
      headline: "Atomic validation, inventory verification, deterministic invoicing, and status routing",
      summary:
        "OpsFlow orchestrates incoming orders through strict validation, duplicate checks, and live inventory lookups inside n8n—fulfilling and invoicing confirmed orders while safely holding stock-shortage orders without deducting inventory.",
      outcomes: [
        "Validates customer contact details, delivery address, and positive integer quantities",
        "Deducts stock and reserves units only after every product passes availability checks",
        "Generates structured invoices (INV-YYYYMMDD-ORDERID) using deterministic arithmetic",
        "Produces operations dashboards tracking confirmed sales, pending orders, and low-stock SKUs",
      ],
    },
    functionalSteps: [
      {
        step: "01",
        title: "Incoming Order Reception & Validation",
        detail: "Receives order payload via webhook and validates customer details, email format, delivery address, and line-item quantities.",
      },
      {
        step: "02",
        title: "Duplicate Check & Inventory Lookup",
        detail: "Queries persisted order history to block duplicate order IDs and loads live SKU stock levels from inventory storage.",
      },
      {
        step: "03",
        title: "Availability Decision & Stock Reservation",
        detail: "Routes fulfillable orders to deduct/reserve inventory and generate invoices; routes shortages to pending_stock with zero inventory change.",
      },
      {
        step: "04",
        title: "Invoicing, Notifications & Reporting",
        detail: "Persists structured invoice records, prepares order status notifications, and compiles sales and low-stock operations reports.",
      },
    ],
    highLevelDataFlow: [
      { stage: "01", label: "Order Intake", payload: "Customer & Line Items JSON" },
      { stage: "02", label: "Validation", payload: "Schema + Duplicate Order ID Gate" },
      { stage: "03", label: "Inventory Check", payload: "Live SKU Stock & Tax Rates" },
      { stage: "04", label: "Fulfill / Hold", payload: "Deduct Stock + Invoice OR Hold Pending" },
      { stage: "05", label: "Reporting", payload: "Orders, Invoices & Low-Stock Alerts" },
    ],
    workflowScreenshots: [
      {
        id: "opsflow-wf-1",
        title: "OpsFlow Workflow — Part 1: Order Validation, Duplicate Check & Stock Lookup (Zoomed)",
        caption:
          "Close-up capture from local n8n showing OpsFlow Order Webhook, Validate Incoming Order, Route OpsFlow Request, Check Existing Orders, Load Current Inventory, Evaluate Duplicate Stock & Totals, and Operations Dashboard Loader.",
        primaryPath: "/media/opsflow/workflow-part-1.png",
        fallbackPath: "/media/opsflow/workflow-part-1.png",
        tag: "Part 1: Intake & Stock",
      },
      {
        id: "opsflow-wf-2",
        title: "OpsFlow Workflow — Part 2: Fulfillment, Inventory Deduction & Invoicing (Zoomed)",
        caption:
          "Close-up capture showing Fulfillment Decision Switch, Prepare & Update Inventory Stock, Record Confirmed Order, Store Generated Invoice, Confirmation Notifications, Pending Stock Branch, Duplicate Block, and Error Handling.",
        primaryPath: "/media/opsflow/workflow-part-2.png",
        fallbackPath: "/media/opsflow/workflow-part-2.png",
        tag: "Part 2: Fulfill & Invoice",
      },
      {
        id: "opsflow-wf-full",
        title: "OpsFlow Workflow — Full End-to-End Canvas Overview (32 Nodes)",
        caption:
          "Complete end-to-end overview of all 4 operational stages in OpsFlow on http://localhost:5678.",
        primaryPath: "/media/opsflow/workflow-main.png",
        fallbackPath: "/media/opsflow/workflow-main.png",
        tag: "Full Overview",
      },
    ],
    workflowOverview:
      "32-node n8n business operations workflow verified across normal multi-item orders, invalid payloads, insufficient stock, missing SKUs, duplicate order protection, invoice failure rollback, and dashboard reporting.",
    nodesPlaceholderNotice: "",
    nodes: [
      {
        id: "opsflow-node-1",
        sequence: 1,
        nodeName: "OpsFlow Order Webhook & Validate Incoming Order",
        nodeType: "n8n-nodes-base.webhook (v2.1) + Code (v2)",
        category: "Trigger",
        isPlaceholder: false,
        whatIsIt: "Order ingestion trigger paired with a strict schema validation node.",
        whatDoesItDo:
          "Receives incoming orders and verifies required fields: order_id, customer name/email, delivery address, and positive integer product quantities.",
        whyUsed: "Prevents malformed or incomplete order requests from reaching inventory or billing logic.",
        inputData: "Order JSON payload with customer details and items[].",
        processingLogic: "Validates email syntax, non-empty items array, and integer quantities; routes invalid payloads to HTTP 400 error logging.",
        outputData: "Clean normalized order object or structured validation_errors[].",
        nextConnection: "Route OpsFlow Request (Switch)",
        keyConfig: ["httpMethod: POST", "path: opsflow", "Strict input validation"],
      },
      {
        id: "opsflow-node-2",
        sequence: 2,
        nodeName: "Check Existing Orders & Load Current Inventory",
        nodeType: "n8n-nodes-base.dataTable (v1.1)",
        category: "Database / Storage",
        isPlaceholder: false,
        whatIsIt: "Persistent Data Table queries loading historical orders and live product inventory.",
        whatDoesItDo:
          "Fetches existing order IDs for duplicate protection and retrieves current unit prices, tax rates, and stock_quantity for all products.",
        whyUsed: "Ensures stock checks and pricing use authoritative stored records rather than trusting client-supplied totals.",
        inputData: "Validated order item.",
        processingLogic: "Uses alwaysOutputData: true and executeOnce: true to prevent multi-item fan-out.",
        outputData: "Existing orders list and full SKU inventory table.",
        nextConnection: "Evaluate Duplicate Stock & Totals",
        keyConfig: ["Tables: opsflow_orders, opsflow_inventory", "executeOnce: true"],
      },
      {
        id: "opsflow-node-3",
        sequence: 3,
        nodeName: "Evaluate Duplicate Stock & Totals",
        nodeType: "n8n-nodes-base.code (v2)",
        category: "Data Processing",
        isPlaceholder: false,
        whatIsIt: "Core business rules and deterministic invoice calculation node.",
        whatDoesItDo:
          "Detects duplicate order_ids, aggregates quantities per SKU, flags missing products or insufficient stock, computes exact line subtotals/taxes/final totals, and builds the invoice payload.",
        whyUsed: "Guarantees deterministic pricing, tax accuracy, and all-or-nothing stock verification before any mutation.",
        inputData: "Validated order + existing orders + live inventory rows.",
        processingLogic: "Outputs decision: 'fulfill', 'pending_stock', 'duplicate', or 'invoice_error'.",
        outputData: "Enriched order decision object with inventory_updates[] and invoice object.",
        nextConnection: "Fulfillment Decision Switch",
        keyConfig: ["Deterministic 2-decimal rounding", "Aggregates duplicate SKUs within an order"],
      },
      {
        id: "opsflow-node-4",
        sequence: 4,
        nodeName: "Fulfillment Decision Switch",
        nodeType: "n8n-nodes-base.switch (v3.2)",
        category: "Logic & Branching",
        isPlaceholder: false,
        whatIsIt: "4-branch conditional router directing each order outcome safely.",
        whatDoesItDo:
          "Separates fulfillable orders from stock shortages, duplicate orders, and invoice generation failures.",
        whyUsed: "Ensures unavailable or failed orders NEVER execute the inventory deduction branch.",
        inputData: "Decision object from Evaluate Duplicate Stock & Totals.",
        processingLogic: "Strict string match on $json.decision.",
        outputData: "Routed branch output (Fulfill, PendingStock, Duplicate, InvoiceError).",
        nextConnection: "Prepare Inventory Deductions / Record Pending Order / Respond Duplicate",
        keyConfig: ["4 named branches", "Strict typeValidation"],
      },
      {
        id: "opsflow-node-5",
        sequence: 5,
        nodeName: "Update Inventory Stock, Record Order & Store Invoice",
        nodeType: "n8n-nodes-base.dataTable (v1.1)",
        category: "Database / Storage",
        isPlaceholder: false,
        whatIsIt: "Fulfillment persistence pipeline updating stock and writing order & invoice records.",
        whatDoesItDo:
          "Deducts ordered quantities, increments reserved_quantity per SKU, collapses multi-item output to a single record, saves the confirmed order, and stores the generated invoice.",
        whyUsed: "Maintains atomic consistency across inventory, orders, and invoices.",
        inputData: "Per-SKU inventory updates and collapsed order/invoice record.",
        processingLogic: "Updates opsflow_inventory by product_id, then inserts 1 row into opsflow_orders and 1 row into opsflow_invoices.",
        outputData: "Updated stock records, persisted order, and issued invoice.",
        nextConnection: "Prepare Confirmation Notifications → Respond Order Confirmed",
        keyConfig: ["Tables: opsflow_inventory, opsflow_orders, opsflow_invoices, opsflow_notifications"],
      },
      {
        id: "opsflow-node-6",
        sequence: 6,
        nodeName: "Build Operations Dashboard",
        nodeType: "n8n-nodes-base.code (v2)",
        category: "Action / Output",
        isPlaceholder: false,
        whatIsIt: "Operational reporting aggregator.",
        whatDoesItDo:
          "Compiles order status breakdowns, per-currency confirmed sales totals, invoice counts, SKU stock levels, and automatic low-stock reorder alerts.",
        whyUsed: "Provides management with instant visibility into fulfillment health and inventory bottlenecks.",
        inputData: "Persisted rows from orders, inventory, invoices, and notifications tables.",
        processingLogic: "Flags any SKU where stock_quantity <= reorder_level.",
        outputData: "Structured Operations Dashboard JSON.",
        nextConnection: "Respond Operations Dashboard",
        keyConfig: ["Low-stock threshold detection", "Per-currency sales totals"],
      },
    ],
    technicalDeepDive: {
      conditionalBranching: {
        title: "All-or-Nothing Inventory Fulfillment Guard",
        summary: "OpsFlow guarantees inventory is never deducted unless every SKU in the order is verified in stock.",
        branches: [
          { condition: "All SKUs available & unique order_id", path: "Deduct Inventory → Record Confirmed Order → Issue Invoice → Queue Confirmation", outcome: "HTTP 200 Confirmed with invoice reference." },
          { condition: "Insufficient stock or missing SKU", path: "Skip Inventory Deduction → Record Pending Order → Queue Unavailable Alert", outcome: "HTTP 202 Pending Stock with shortage details." },
          { condition: "Duplicate order_id", path: "Respond Duplicate Order", outcome: "HTTP 409 blocked with zero database mutations." },
        ],
      },
      apisAndIntegrations: {
        title: "Modular Order & Operations Architecture",
        summary: "Built with standard webhooks and local SQLite Data Tables so any order intake source or ERP can connect cleanly.",
        connections: [
          { service: "Order Intake Webhook", protocol: "HTTP POST", purpose: "Accepts structured order payloads from forms, portals, or internal systems" },
          { service: "n8n Data Tables", protocol: "Native SQLite", purpose: "Stores inventory, orders, invoices, and mock customer notifications" },
        ],
      },
      errorHandling: {
        title: "Order Validation & Stock Integrity Protections",
        summary: "Isolates invalid payloads, duplicate orders, and invoice failures safely.",
        safeguards: [
          { failureMode: "Negative quantities or invalid customer email", handling: "Rejected with HTTP 400 and logged in opsflow_notifications." },
          { failureMode: "Invoice generation failure", handling: "Aborts before inventory deduction and logs order_status: error." },
        ],
      },
    },
    dashboardScreenshots: [
      {
        id: "opsflow-dash-1",
        title: "OpsFlow Dashboard — Concept Preview (Static Presentation Visual)",
        caption:
          "Honest static concept preview illustrating how OpsFlow's order queue, inventory monitor, deterministic invoices, and low-stock reorder alerts appear in a business operations dashboard. Presentation showcase only — not a live application.",
        primaryPath: "/media/opsflow/dashboard-concept.svg",
        fallbackPath: "/media/opsflow/dashboard-concept.svg",
        tag: "Concept Preview",
      },
    ],
    video: {
      title: "OpsFlow Presentation Overview",
      primaryPath: "/media/opsflow/opsflow-demo.mp4",
      fallbackPath: "/media/opsflow/opsflow-demo.mp4",
      posterPrimaryPath: "/media/opsflow/workflow-main.png",
      posterFallbackPath: "/media/opsflow/workflow-main.png",
      durationLabel: "Showcase",
      summary: "OpsFlow is presented as an architecture showcase with actual n8n workflow visuals and concept dashboard previews.",
      demonstrates: [
        "Incoming order validation and duplicate protection",
        "Inventory checking and deterministic invoicing",
        "Stock shortage protection and operational reporting",
      ],
    },
  },

  /* =========================================================================
     PROJECT 3 — MAILFLOW (PRESENTATION SHOWCASE ONLY)
     ========================================================================= */
  {
    id: "mailflow",
    mode: "showcase",
    badgeLabel: "PROJECT SHOWCASE · PRESENTATION ONLY",
    sectionNumber: "03",
    name: "MailFlow — Intelligent Email Automation",
    category: "Project Showcase · AI Email Triage & Human Approval",
    tagline:
      "AI-powered email classification across 7 categories, hybrid SLA urgency detection, contextual reply drafting, and mandatory human approval.",
    theme: "light",
    shortDescription:
      "Presentation showcase explaining how n8n and Gemini AI read incoming emails, classify intent, score urgency, extract key details, draft safe replies, and hold every reply for human approval.",
    fullDescription:
      "MailFlow is a 26-node intelligent email triage workflow built in n8n. It ingests incoming emails (via webhook for testing or a pre-wired Gmail Trigger for production), strips HTML noise, blocks duplicate message IDs, classifies emails into 7 business categories using Gemini AI paired with hybrid SLA urgency rules, extracts references/amounts/dates, drafts professional contextual replies without inventing policies, and stores every draft in an Awaiting Approval queue—ensuring no external email is ever sent without explicit human sign-off.",
    capabilities: [
      "Incoming email cleaning (HTML stripping) and duplicate message blocking",
      "7-category AI semantic classification (Support, Sales, Invoice, Complaint, Meeting, Urgent, General)",
      "Hybrid AI + rule-based urgency scoring (High / Medium / Low) with SLA escalation",
      "Automatic extraction of invoice/order references, amounts, and requested meeting times",
      "Contextual reply drafting via Gemini with strict no-invented-promises guardrails",
      "Mandatory Human-in-the-Loop approval & rejection audit trail before outbound sending",
    ],
    expectedBenefits: [
      "Ensures urgent outages and customer complaints are escalated within seconds",
      "Eliminates inbox triage bottlenecks by auto-routing emails to 7 specialized team queues",
      "Saves hours daily by preparing accurate, contextual reply drafts ready for 1-click review",
      "Protects brand reputation and legal safety by requiring human approval before sending",
      "Creates structured inbox analytics covering category volumes, priority trends, and SLA queues",
    ],
    previewScreenshot: {
      id: "mailflow-preview",
      title: "MailFlow — Actual n8n Workflow",
      caption: "Actual MailFlow workflow architecture captured from local n8n.",
      primaryPath: "/media/mailflow/workflow-main.png",
      fallbackPath: "/media/mailflow/workflow-main.png",
      tag: "Project Showcase",
    },
    problem: {
      headline: "High-volume shared inboxes bury urgent issues and slow down customer replies",
      summary:
        "Support, billing, sales, and executive messages often land in overcrowded inboxes. Critical outages wait behind routine questions, teams re-type repetitive answers, and fully autonomous auto-responders risk sending inaccurate commitments.",
      painPoints: [
        "Urgent complaints or production outages buried beneath general inquiries",
        "Manual reading and forwarding needed just to route invoices, sales leads, and support tickets",
        "Repetitive drafting of routine acknowledgments and follow-up information requests",
        "Risk of unsupervised AI replies inventing refund policies, discounts, or SLA promises",
      ],
    },
    solution: {
      headline: "Semantic AI triage, hybrid urgency scoring, contextual drafting, and human approval",
      summary:
        "MailFlow combines Gemini semantic understanding with deterministic urgency safeguards and a mandatory Human Approval gate—delivering fast, accurate drafts while keeping humans firmly in control of every external reply.",
      outcomes: [
        "Classifies every message across 7 distinct business categories and routes to the right queue",
        "Combines AI urgency judgment with hard SLA escalation rules for outages, legal, and complaints",
        "Extracts key entities (ticket IDs, invoice numbers, dollar amounts, meeting windows)",
        "Holds every reply as awaiting_approval with full approve/reject audit logging",
      ],
    },
    functionalSteps: [
      {
        step: "01",
        title: "Email Reception, Cleaning & Deduplication",
        detail: "Ingests email via Webhook or Gmail Trigger, strips HTML/scripts, validates sender/subject/body, and blocks duplicate messages.",
      },
      {
        step: "02",
        title: "Gemini Classification & Hybrid Urgency Scoring",
        detail: "Classifies into 7 categories, runs hybrid AI + SLA priority rules (High/Medium/Low), and extracts references, amounts, and dates.",
      },
      {
        step: "03",
        title: "Contextual Draft Generation",
        detail: "Generates a professional, context-aware reply addressing the sender's question while requesting missing details without inventing policies.",
      },
      {
        step: "04",
        title: "Human Approval Queue & Analytics",
        detail: "Stores the draft as awaiting_approval, logs reviewer approve/reject decisions, and powers category and priority inbox analytics.",
      },
    ],
    highLevelDataFlow: [
      { stage: "01", label: "Email Intake", payload: "Gmail Trigger / Webhook" },
      { stage: "02", label: "Clean & Dedup", payload: "HTML Strip + Fingerprint Gate" },
      { stage: "03", label: "Gemini AI", payload: "7 Categories + Entities + Draft" },
      { stage: "04", label: "Urgency & Route", payload: "High/Med/Low + 7 Team Queues" },
      { stage: "05", label: "Human Gate", payload: "Awaiting Approval + Audit Log" },
    ],
    workflowScreenshots: [
      {
        id: "mailflow-wf-1",
        title: "MailFlow Workflow — Part 1: Reception, Cleaning, Gemini AI & Draft Queue (Zoomed)",
        caption:
          "Close-up capture from local n8n showing MailFlow Webhook Intake, Pre-Wired Gmail Trigger, Validate & Clean Incoming Email, Duplicate Email Gate, Gemini Email Classifier & Drafter, Hybrid Urgency Rules, and Store Draft (Awaiting Approval).",
        primaryPath: "/media/mailflow/workflow-part-1.png",
        fallbackPath: "/media/mailflow/workflow-part-1.png",
        tag: "Part 1: Triage & AI",
      },
      {
        id: "mailflow-wf-2",
        title: "MailFlow Workflow — Part 2: Human Approval Gate & Analytics Dashboard (Zoomed)",
        caption:
          "Close-up capture showing Find Email for Approval, Evaluate Approval Request, Update Approval Status, Log Human Approval Audit, Disabled Gmail Send Safety Gate, and Email Analytics Dashboard.",
        primaryPath: "/media/mailflow/workflow-part-2.png",
        fallbackPath: "/media/mailflow/workflow-part-2.png",
        tag: "Part 2: Approval & Analytics",
      },
      {
        id: "mailflow-wf-full",
        title: "MailFlow Workflow — Full End-to-End Canvas Overview (26 Nodes)",
        caption:
          "Complete end-to-end overview of all 5 sections in MailFlow on http://localhost:5678.",
        primaryPath: "/media/mailflow/workflow-main.png",
        fallbackPath: "/media/mailflow/workflow-main.png",
        tag: "Full Overview",
      },
    ],
    workflowOverview:
      "26-node intelligent email workflow verified across all 7 categories, all 3 priority tiers, duplicate email blocking, approve/reject human review logging, simulated AI/auth failure handling, and analytics reporting.",
    nodesPlaceholderNotice: "",
    nodes: [
      {
        id: "mailflow-node-1",
        sequence: 1,
        nodeName: "MailFlow Webhook Intake & Gmail Trigger",
        nodeType: "n8n-nodes-base.webhook (v2.1) + gmailTrigger (v1.2)",
        category: "Trigger",
        isPlaceholder: false,
        whatIsIt: "Dual intake supporting safe mock testing via Webhook and live inbox polling via pre-wired Gmail Trigger.",
        whatDoesItDo: "Captures incoming emails (sender, subject, body, message_id) and feeds them into a single normalized processing pipeline.",
        whyUsed: "Enables safe local testing without touching a live mailbox while remaining ready for Gmail OAuth2 authorization.",
        inputData: "Incoming email payload or Gmail message object.",
        processingLogic: "Gmail Trigger stays safely disabled until OAuth2 is authorized.",
        outputData: "Raw incoming email event.",
        nextConnection: "Validate & Clean Incoming Email",
        keyConfig: ["Gmail Trigger pre-wired (disabled in dev)", "Webhook POST /webhook/mailflow"],
      },
      {
        id: "mailflow-node-2",
        sequence: 2,
        nodeName: "Validate & Clean Incoming Email + Duplicate Gate",
        nodeType: "n8n-nodes-base.code (v2) + dataTable + Switch",
        category: "Data Processing",
        isPlaceholder: false,
        whatIsIt: "Email sanitizer and message fingerprint deduplicator.",
        whatDoesItDo: "Validates sender email, subject, and body, strips HTML/style/script tags, and checks mailflow_emails to prevent reprocessing duplicate messages.",
        whyUsed: "Eliminates prompt noise from HTML emails and stops duplicate webhook/poll deliveries from creating redundant drafts.",
        inputData: "Raw email fields.",
        processingLogic: "Computes message_fingerprint from message_id or sender+subject+body hash; returns HTTP 409 on duplicates.",
        outputData: "Clean plain-text email envelope.",
        nextConnection: "Gemini Email Classifier & Drafter",
        keyConfig: ["HTML tag removal", "Duplicate HTTP 409 block"],
      },
      {
        id: "mailflow-node-3",
        sequence: 3,
        nodeName: "Gemini Email Classifier & Drafter",
        nodeType: "@n8n/n8n-nodes-langchain.googleGemini (v1.1)",
        category: "AI / Intelligence",
        isPlaceholder: false,
        whatIsIt: "Structured JSON Gemini LLM node for semantic email triage and reply generation.",
        whatDoesItDo:
          "Classifies emails into 7 exact categories, assesses priority, extracts missing information needed, and writes a polite, grounded response draft.",
        whyUsed: "Understands nuanced customer intent far beyond rigid keyword matching.",
        inputData: "Cleaned sender, subject, and email body.",
        processingLogic: "Model models/gemini-2.5-flash, jsonOutput: true, with strict prompt instruction never to invent company policies or discounts.",
        outputData: "Structured JSON with category, priority, summary, missing_info_needed, draft_subject, draft_body.",
        nextConnection: "Validate AI Output & Hybrid Urgency Rules (or AI Error Fallback Handler)",
        keyConfig: ["7 fixed categories", "jsonOutput: true", "onError: continueErrorOutput"],
      },
      {
        id: "mailflow-node-4",
        sequence: 4,
        nodeName: "Validate AI Output & Hybrid Urgency Rules",
        nodeType: "n8n-nodes-base.code (v2)",
        category: "Logic & Branching",
        isPlaceholder: false,
        whatIsIt: "Deterministic safety layer combining AI output with SLA urgency rules.",
        whatDoesItDo:
          "Validates Gemini JSON, extracts invoice/ticket references, amounts, and meeting times, applies hard SLA priority escalation rules (outages, security, legal, complaints), and assigns the operational routing queue.",
        whyUsed: "Guarantees critical emails always escalate to High Priority even if AI phrasing varies.",
        inputData: "Gemini JSON output or fallback context.",
        processingLogic: "Computes urgency_score (0–100) and maps to High (>=75), Medium (45–74), or Low (<45).",
        outputData: "Fully classified, scored, routed email record with contextual draft.",
        nextConnection: "Store Email & Draft (Awaiting Approval)",
        keyConfig: ["7 routing queues", "Hybrid AI + SLA scoring", "Entity extraction"],
      },
      {
        id: "mailflow-node-5",
        sequence: 5,
        nodeName: "Store Email & Draft + Human Approval Audit Gate",
        nodeType: "n8n-nodes-base.dataTable (v1.1) + Gmail (Disabled in Dev)",
        category: "Database / Storage",
        isPlaceholder: false,
        whatIsIt: "Persistent human-in-the-loop review queue and approval audit logger.",
        whatDoesItDo:
          "Saves every draft with approval_status: 'awaiting_approval', processes human approve/reject actions into mailflow_approval_log, and keeps outbound Gmail Send disabled during development.",
        whyUsed: "Enforces zero unapproved external emails while keeping a complete audit log of every reviewer decision.",
        inputData: "Processed email draft or reviewer approve/reject request.",
        processingLogic: "Updates mailflow_emails status and writes immutable audit rows to mailflow_approval_log.",
        outputData: "Approval status confirmation (external_email_sent: false in dev).",
        nextConnection: "Respond Draft Awaiting Approval / Respond Approval Recorded",
        keyConfig: ["Tables: mailflow_emails, mailflow_approval_log", "Gmail Send disabled in dev"],
      },
    ],
    technicalDeepDive: {
      conditionalBranching: {
        title: "Action Routing, Duplicate Gate & Human Approval Branching",
        summary: "Separates email ingestion, human approval actions, analytics queries, duplicates, and validation/auth errors cleanly.",
        branches: [
          { condition: "New email processed", path: "Gemini AI + Hybrid Urgency → Store as awaiting_approval", outcome: "Draft stored safely; zero automatic external send." },
          { condition: "action === 'approve' | 'reject'", path: "Find Email → Update Status → Log Audit → Disabled Gmail Send", outcome: "Records human decision in mailflow_approval_log." },
          { condition: "Duplicate message_fingerprint", path: "Respond Duplicate Email (HTTP 409)", outcome: "Prevents redundant AI calls and duplicate inbox rows." },
        ],
      },
      apisAndIntegrations: {
        title: "Gemini AI, Gmail OAuth2 (Pre-Wired) & Local Data Tables",
        summary: "Ready for Gmail OAuth2 activation while running safely offline during demonstrations.",
        connections: [
          { service: "Google Gemini API", protocol: "n8n Google Gemini Node", purpose: "Semantic 7-category classification & contextual reply drafting" },
          { service: "Gmail Trigger & Send", protocol: "Gmail OAuth2 (Disabled in Dev)", purpose: "Live inbox polling and human-approved reply dispatch once authorized" },
          { service: "n8n Data Tables", protocol: "Native SQLite", purpose: "Stores triaged emails, drafts, and human approval audit logs" },
        ],
      },
      errorHandling: {
        title: "AI Fallback, Invalid Payload & OAuth Error Protection",
        summary: "Handles malformed emails, Gemini outages, and expired OAuth tokens without losing messages.",
        safeguards: [
          { failureMode: "Missing sender, subject, or body", handling: "Returns HTTP 400 listing all missing fields." },
          { failureMode: "Gemini API error or invalid JSON", handling: "Routes via continueErrorOutput to manual_triage_queue with approval_status: needs_review." },
          { failureMode: "Gmail OAuth2 token expiration", handling: "Returns HTTP 401 with clear credential re-authorization guidance." },
        ],
      },
    },
    dashboardScreenshots: [
      {
        id: "mailflow-dash-1",
        title: "MailFlow AI Triage & Approval Console — Concept Preview (Static Visual)",
        caption:
          "Honest static concept preview illustrating MailFlow's categorized inbox queue, High/Medium/Low priority indicators, extracted references, and Human Approval review panel. Presentation showcase only — not a live application.",
        primaryPath: "/media/mailflow/dashboard-concept.svg",
        fallbackPath: "/media/mailflow/dashboard-concept.svg",
        tag: "Concept Preview",
      },
    ],
    video: {
      title: "MailFlow Presentation Overview",
      primaryPath: "/media/mailflow/mailflow-demo.mp4",
      fallbackPath: "/media/mailflow/mailflow-demo.mp4",
      posterPrimaryPath: "/media/mailflow/workflow-main.png",
      posterFallbackPath: "/media/mailflow/workflow-main.png",
      durationLabel: "Showcase",
      summary: "MailFlow is presented as an architecture showcase with actual n8n workflow visuals and concept approval console previews.",
      demonstrates: [
        "7-category semantic email classification and priority escalation",
        "Entity extraction and grounded contextual response drafting",
        "Mandatory Human-in-the-Loop approval before external dispatch",
      ],
    },
  },
];
