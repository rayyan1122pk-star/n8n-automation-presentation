export interface ApplicationSector {
  number: string;
  sector: string;
  headline: string;
  description: string;
  workflowExample: string;
  mediaPath: string;
  stockUrl: string;
  iconKey:
    | "calculator"
    | "shoppingBag"
    | "landmark"
    | "heartPulse"
    | "graduationCap"
    | "headphones"
    | "trendingUp"
    | "users";
}

export const REAL_WORLD_APPLICATIONS: ApplicationSector[] = [
  {
    number: "01",
    sector: "Accounting",
    headline: "Automated Invoice & Ledger Processing",
    description:
      "Extract totals, tax lines, and vendor records from PDFs and receipts directly into categorized financial ledgers with audit logs.",
    workflowExample: "Upload Receipt -> AI Extraction -> Category Rule -> Ledger Entry",
    mediaPath: "/media/applications/accounting.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    iconKey: "calculator",
  },
  {
    number: "02",
    sector: "E-commerce",
    headline: "Order-to-Fulfillment Orchestration",
    description:
      "Validate customer orders, verify live stock availability, deduct inventory, generate PDF invoices, and trigger shipping updates.",
    workflowExample: "New Order -> Stock Check -> Invoice PDF -> Customer Confirmation",
    mediaPath: "/media/applications/ecommerce.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    iconKey: "shoppingBag",
  },
  {
    number: "03",
    sector: "Finance",
    headline: "Compliance Review & Anomaly Alerts",
    description:
      "Parse financial statements, flag unusual expense spikes, reconcile transactions, and compile executive summaries on schedule.",
    workflowExample: "Daily Feed -> AI Anomaly Check -> Threshold Gate -> Risk Alert",
    mediaPath: "/media/applications/finance.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    iconKey: "landmark",
  },
  {
    number: "04",
    sector: "Healthcare Administration",
    headline: "Patient Intake & Document Routing",
    description:
      "Structure referral forms, categorize appointment requests by urgency, and route administrative paperwork cleanly to clinic desks.",
    workflowExample: "Intake Form -> Field Extraction -> Priority Triage -> Desk Queue",
    mediaPath: "/media/applications/healthcare.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    iconKey: "heartPulse",
  },
  {
    number: "05",
    sector: "Education",
    headline: "Admissions, Grading Logistics & Inquiries",
    description:
      "Classify prospective student emails, verify application document completeness, and route faculty requests to the proper department.",
    workflowExample: "Student Email -> Intent Classification -> FAQ Draft -> Registrar Log",
    mediaPath: "/media/applications/education.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    iconKey: "graduationCap",
  },
  {
    number: "06",
    sector: "Customer Support",
    headline: "Intelligent Ticket Triage & Drafting",
    description:
      "Read incoming inquiries, identify sentiment and urgency, extract account IDs, and prepare accurate first-response drafts.",
    workflowExample: "Inbound Ticket -> Urgency Score -> Context Lookup -> Draft Reply",
    mediaPath: "/media/applications/support.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
    iconKey: "headphones",
  },
  {
    number: "07",
    sector: "Sales Operations",
    headline: "Lead Qualification & CRM Sync",
    description:
      "Enrich inbound leads, summarize discovery inquiries, assign accounts by territory, and notify representatives immediately.",
    workflowExample: "Web Inquiry -> AI Qualification -> Territory Branch -> CRM Record",
    mediaPath: "/media/applications/sales.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    iconKey: "trendingUp",
  },
  {
    number: "08",
    sector: "Human Resources",
    headline: "Candidate Screening & Onboarding Flows",
    description:
      "Extract structured qualifications from resumes, coordinate interview scheduling, and automate new-hire onboarding checklists.",
    workflowExample: "Application PDF -> Profile Parse -> Stage Routing -> Onboarding Tasks",
    mediaPath: "/media/applications/hr.jpg",
    stockUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    iconKey: "users",
  },
];
