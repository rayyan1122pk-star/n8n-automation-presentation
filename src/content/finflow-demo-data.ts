export interface CurrencyTotals {
  currency: string;
  total_income: number;
  total_expenses: number;
  net_profit: number;
  transaction_count: number;
  income_count: number;
  expense_count: number;
  expense_by_category: Record<string, number>;
  monthly_trends: Record<
    string,
    { month: string; income: number; expenses: number; net_profit: number; count: number }
  >;
  vendor_expenses: Record<string, number>;
}

export interface TransactionRecord {
  record_id: string;
  vendor_id?: string;
  vendor_name: string;
  invoice_number: string;
  invoice_date: string;
  due_date?: string;
  description?: string;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  transaction_type: "income" | "expense";
  payment_status: string;
  expense_category: string;
  document_type: string;
  source_filename: string;
  extraction_method: string;
  confidence_score?: number;
  review_status: string;
  is_demo?: boolean;
  execution_source?: string;
  processed_at: string;
}

export interface VendorRecord {
  vendor_id: string;
  vendor_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  default_category: string;
  is_demo: boolean;
  total_expenses_by_currency: Record<string, number>;
  invoice_count: number;
  recent_transactions: {
    record_id: string;
    invoice_number: string;
    invoice_date: string;
    total_amount: number;
    currency: string;
    expense_category: string;
    payment_status: string;
    is_demo: boolean;
  }[];
  created_at: string;
}

export interface ReviewRecord {
  queue_id: string;
  source_filename: string;
  document_type: string;
  failure_reason: string;
  missing_fields: string;
  status: string;
  created_at: string;
}

export interface ActivityRecord {
  activity_id: string;
  event_type: string;
  title: string;
  detail: string;
  status: string;
  record_ref: string;
  is_demo?: boolean;
  created_at: string;
}

export interface DashboardPayload {
  generated_at: string;
  multi_currency_policy: string;
  primary_currency: string;
  currencies: string[];
  overview: {
    total_income: number;
    total_expenses: number;
    net_profit: number;
    total_vendors: number;
    total_transactions: number;
    pending_reviews: number;
    demo_records_count: number;
    real_records_count: number;
  };
  totals_by_currency: Record<string, CurrencyTotals>;
  transactions: TransactionRecord[];
  vendors: VendorRecord[];
  pending_reviews: ReviewRecord[];
  recent_activity: ActivityRecord[];
}

export const INITIAL_FINFLOW_PRESENTATION_DASHBOARD: DashboardPayload = {
  generated_at: new Date().toISOString(),
  multi_currency_policy: "Isolated deterministic multi-currency accounting",
  primary_currency: "USD",
  currencies: ["USD", "EUR"],
  overview: {
    total_income: 18450.0,
    total_expenses: 7845.0,
    net_profit: 10605.0,
    total_vendors: 6,
    total_transactions: 8,
    pending_reviews: 1,
    demo_records_count: 5,
    real_records_count: 3,
  },
  totals_by_currency: {
    USD: {
      currency: "USD",
      total_income: 18450.0,
      total_expenses: 7845.0,
      net_profit: 10605.0,
      transaction_count: 8,
      income_count: 2,
      expense_count: 6,
      expense_by_category: {
        "Software & Cloud": 2875.0,
        "AI & Automation": 935.0,
        "Professional Services": 1800.0,
        "Office & Equipment": 540.0,
        "Utilities & Telecom": 695.0,
        "Marketing & Creative": 1000.0,
      },
      monthly_trends: {
        "2026-08": {
          month: "2026-08",
          income: 4200.0,
          expenses: 1950.0,
          net_profit: 2250.0,
          count: 2,
        },
        "2026-09": {
          month: "2026-09",
          income: 4800.0,
          expenses: 2100.0,
          net_profit: 2700.0,
          count: 2,
        },
        "2026-10": {
          month: "2026-10",
          income: 4500.0,
          expenses: 1895.0,
          net_profit: 2605.0,
          count: 2,
        },
        "2026-11": {
          month: "2026-11",
          income: 4950.0,
          expenses: 1900.0,
          net_profit: 3050.0,
          count: 2,
        },
      },
      vendor_expenses: {
        "Apex Cloud Infrastructure Ltd": 1595.0,
        "Synthetix AI Solutions Inc": 935.0,
        "Stratos Cloud Networks": 1280.0,
        "Vanguard Legal & Tax LLP": 1800.0,
        "Northbridge Office Supply Co.": 540.0,
        "PulseGrid Fiber & Telecom": 695.0,
      },
    },
    EUR: {
      currency: "EUR",
      total_income: 3200.0,
      total_expenses: 1450.0,
      net_profit: 1750.0,
      transaction_count: 2,
      income_count: 1,
      expense_count: 1,
      expense_by_category: {
        "European Cloud Region": 1450.0,
      },
      monthly_trends: {
        "2026-11": {
          month: "2026-11",
          income: 3200.0,
          expenses: 1450.0,
          net_profit: 1750.0,
          count: 2,
        },
      },
      vendor_expenses: {
        "Hetzner Online GmbH": 1450.0,
      },
    },
  },
  transactions: [
    {
      record_id: "TX-2026-8942",
      vendor_id: "VEND-APEX-01",
      vendor_name: "Apex Cloud Infrastructure Ltd",
      invoice_number: "INV-2026-8942",
      invoice_date: "2026-11-15",
      due_date: "2026-12-15",
      description: "Dedicated Production Kubernetes Cluster & NVMe Object Storage",
      subtotal: 1450.0,
      tax_amount: 145.0,
      total_amount: 1595.0,
      currency: "USD",
      transaction_type: "expense",
      payment_status: "paid",
      expense_category: "Software & Cloud",
      document_type: "PDF Invoice",
      source_filename: "sample_invoice_cloud_services.pdf",
      extraction_method: "n8n Google Gemini Vision OCR",
      confidence_score: 0.99,
      review_status: "approved",
      is_demo: false,
      execution_source: "Live File Upload",
      processed_at: "2026-11-15T10:14:22Z",
    },
    {
      record_id: "TX-2026-3104",
      vendor_id: "VEND-SYNTH-02",
      vendor_name: "Synthetix AI Solutions Inc",
      invoice_number: "INV-2026-3104",
      invoice_date: "2026-11-18",
      due_date: "2026-12-18",
      description: "Neural Inference API Gateway & Dedicated GPU Compute Hours",
      subtotal: 850.0,
      tax_amount: 85.0,
      total_amount: 935.0,
      currency: "USD",
      transaction_type: "expense",
      payment_status: "paid",
      expense_category: "AI & Automation",
      document_type: "PDF Invoice",
      source_filename: "sample_invoice_ai_services.pdf",
      extraction_method: "n8n Google Gemini Vision OCR",
      confidence_score: 0.98,
      review_status: "approved",
      is_demo: false,
      execution_source: "Live File Upload",
      processed_at: "2026-11-18T14:22:05Z",
    },
    {
      record_id: "TX-2026-7721",
      vendor_id: "VEND-STRAT-03",
      vendor_name: "Stratos Cloud Networks",
      invoice_number: "DEMO-INV-2026-7721",
      invoice_date: "2026-11-10",
      due_date: "2026-12-10",
      description: "Enterprise PostgreSQL Cluster, Replicated Storage & Failover",
      subtotal: 1185.0,
      tax_amount: 95.0,
      total_amount: 1280.0,
      currency: "USD",
      transaction_type: "expense",
      payment_status: "paid",
      expense_category: "Software & Cloud",
      document_type: "Vendor Workflow Event",
      source_filename: "DEMO-INV-2026-7721.json",
      extraction_method: "n8n Deterministic Webhook",
      confidence_score: 1.0,
      review_status: "approved",
      is_demo: true,
      execution_source: "Vendor Onboarding Flow",
      processed_at: "2026-11-10T09:30:00Z",
    },
    {
      record_id: "TX-2026-1049",
      vendor_id: "VEND-VANG-04",
      vendor_name: "Vanguard Legal & Tax LLP",
      invoice_number: "INV-VANG-1049",
      invoice_date: "2026-11-04",
      due_date: "2026-12-04",
      description: "Quarterly Compliance, SaaS Terms & Legal Advisory Retainer",
      subtotal: 1714.0,
      tax_amount: 86.0,
      total_amount: 1800.0,
      currency: "USD",
      transaction_type: "expense",
      payment_status: "unpaid",
      expense_category: "Professional Services",
      document_type: "PDF Invoice",
      source_filename: "vanguard_invoice_q4.pdf",
      extraction_method: "n8n Gemini Structured Extractor",
      confidence_score: 0.97,
      review_status: "approved",
      is_demo: false,
      execution_source: "Live File Upload",
      processed_at: "2026-11-04T16:45:10Z",
    },
    {
      record_id: "TX-2026-5512",
      vendor_id: "VEND-NORTH-05",
      vendor_name: "Northbridge Office Supply Co.",
      invoice_number: "DEMO-INV-2026-5512",
      invoice_date: "2026-10-22",
      due_date: "2026-11-22",
      description: "Conference Room Display Equipment & Ergonomic Workstation Kits",
      subtotal: 500.0,
      tax_amount: 40.0,
      total_amount: 540.0,
      currency: "USD",
      transaction_type: "expense",
      payment_status: "paid",
      expense_category: "Office & Equipment",
      document_type: "Vendor Workflow Event",
      source_filename: "DEMO-INV-2026-5512.json",
      extraction_method: "n8n Deterministic Webhook",
      confidence_score: 1.0,
      review_status: "approved",
      is_demo: true,
      execution_source: "Vendor Onboarding Flow",
      processed_at: "2026-10-22T11:20:00Z",
    },
    {
      record_id: "TX-2026-9031",
      vendor_id: "VEND-PULSE-06",
      vendor_name: "PulseGrid Fiber & Telecom",
      invoice_number: "DEMO-INV-2026-9031",
      invoice_date: "2026-10-15",
      due_date: "2026-11-15",
      description: "Dedicated 10Gbps Low-Latency Fiber Circuit & VoIP Trunk",
      subtotal: 655.0,
      tax_amount: 40.0,
      total_amount: 695.0,
      currency: "USD",
      transaction_type: "expense",
      payment_status: "paid",
      expense_category: "Utilities & Telecom",
      document_type: "Vendor Workflow Event",
      source_filename: "DEMO-INV-2026-9031.json",
      extraction_method: "n8n Deterministic Webhook",
      confidence_score: 1.0,
      review_status: "approved",
      is_demo: true,
      execution_source: "Vendor Onboarding Flow",
      processed_at: "2026-10-15T08:15:30Z",
    },
    {
      record_id: "TX-REV-401",
      vendor_name: "Global Tech Enterprises LLC",
      invoice_number: "REC-REV-2026-401",
      invoice_date: "2026-11-01",
      description: "Enterprise Workflow Automation Implementation & Training",
      subtotal: 12500.0,
      tax_amount: 0.0,
      total_amount: 12500.0,
      currency: "USD",
      transaction_type: "income",
      payment_status: "paid",
      expense_category: "Client Revenue",
      document_type: "Client Inbound Payment",
      source_filename: "client_settlement_401.json",
      extraction_method: "Direct CRM Ingestion",
      confidence_score: 1.0,
      review_status: "approved",
      is_demo: true,
      execution_source: "Accounts Receivable",
      processed_at: "2026-11-01T12:00:00Z",
    },
    {
      record_id: "TX-REV-402",
      vendor_name: "Acuity Health Partners",
      invoice_number: "REC-REV-2026-402",
      invoice_date: "2026-11-12",
      description: "HIPAA Compliant n8n Data Bridge & Automation Maintenance",
      subtotal: 5950.0,
      tax_amount: 0.0,
      total_amount: 5950.0,
      currency: "USD",
      transaction_type: "income",
      payment_status: "paid",
      expense_category: "Client Revenue",
      document_type: "Client Inbound Payment",
      source_filename: "client_settlement_402.json",
      extraction_method: "Direct CRM Ingestion",
      confidence_score: 1.0,
      review_status: "approved",
      is_demo: true,
      execution_source: "Accounts Receivable",
      processed_at: "2026-11-12T15:10:00Z",
    },
  ],
  vendors: [
    {
      vendor_id: "VEND-APEX-01",
      vendor_name: "Apex Cloud Infrastructure Ltd",
      contact_email: "billing@apexcloud.io",
      contact_phone: "+1 (415) 555-0192",
      contact_address: "100 Tech Horizon Blvd, Suite 400, San Francisco, CA",
      default_category: "Software & Cloud",
      is_demo: false,
      total_expenses_by_currency: { USD: 1595.0 },
      invoice_count: 1,
      recent_transactions: [
        {
          record_id: "TX-2026-8942",
          invoice_number: "INV-2026-8942",
          invoice_date: "2026-11-15",
          total_amount: 1595.0,
          currency: "USD",
          expense_category: "Software & Cloud",
          payment_status: "paid",
          is_demo: false,
        },
      ],
      created_at: "2026-11-15T10:14:22Z",
    },
    {
      vendor_id: "VEND-SYNTH-02",
      vendor_name: "Synthetix AI Solutions Inc",
      contact_email: "invoices@synthetix.ai",
      contact_phone: "+1 (206) 555-0144",
      contact_address: "450 Innovation Parkway, Suite 800, Seattle, WA",
      default_category: "AI & Automation",
      is_demo: false,
      total_expenses_by_currency: { USD: 935.0 },
      invoice_count: 1,
      recent_transactions: [
        {
          record_id: "TX-2026-3104",
          invoice_number: "INV-2026-3104",
          invoice_date: "2026-11-18",
          total_amount: 935.0,
          currency: "USD",
          expense_category: "AI & Automation",
          payment_status: "paid",
          is_demo: false,
        },
      ],
      created_at: "2026-11-18T14:22:05Z",
    },
    {
      vendor_id: "VEND-STRAT-03",
      vendor_name: "Stratos Cloud Networks",
      contact_email: "ap+721@stratoscloud-demo.example",
      contact_phone: "+1-555-0142",
      contact_address: "210 Cloud Way, Seattle, WA",
      default_category: "Software & Cloud",
      is_demo: true,
      total_expenses_by_currency: { USD: 1280.0 },
      invoice_count: 1,
      recent_transactions: [
        {
          record_id: "TX-2026-7721",
          invoice_number: "DEMO-INV-2026-7721",
          invoice_date: "2026-11-10",
          total_amount: 1280.0,
          currency: "USD",
          expense_category: "Software & Cloud",
          payment_status: "paid",
          is_demo: true,
        },
      ],
      created_at: "2026-11-10T09:30:00Z",
    },
    {
      vendor_id: "VEND-VANG-04",
      vendor_name: "Vanguard Legal & Tax LLP",
      contact_email: "billing@vanguardlegal-demo.example",
      contact_phone: "+1-555-0188",
      contact_address: "500 Commerce Plaza, Chicago, IL",
      default_category: "Professional Services",
      is_demo: false,
      total_expenses_by_currency: { USD: 1800.0 },
      invoice_count: 1,
      recent_transactions: [
        {
          record_id: "TX-2026-1049",
          invoice_number: "INV-VANG-1049",
          invoice_date: "2026-11-04",
          total_amount: 1800.0,
          currency: "USD",
          expense_category: "Professional Services",
          payment_status: "unpaid",
          is_demo: false,
        },
      ],
      created_at: "2026-11-04T16:45:10Z",
    },
    {
      vendor_id: "VEND-NORTH-05",
      vendor_name: "Northbridge Office Supply Co.",
      contact_email: "orders@northbridge-demo.example",
      contact_phone: "+1-555-0164",
      contact_address: "88 Industrial Pkwy, Austin, TX",
      default_category: "Office & Equipment",
      is_demo: true,
      total_expenses_by_currency: { USD: 540.0 },
      invoice_count: 1,
      recent_transactions: [
        {
          record_id: "TX-2026-5512",
          invoice_number: "DEMO-INV-2026-5512",
          invoice_date: "2026-10-22",
          total_amount: 540.0,
          currency: "USD",
          expense_category: "Office & Equipment",
          payment_status: "paid",
          is_demo: true,
        },
      ],
      created_at: "2026-10-22T11:20:00Z",
    },
    {
      vendor_id: "VEND-PULSE-06",
      vendor_name: "PulseGrid Fiber & Telecom",
      contact_email: "billing@pulsegrid-demo.example",
      contact_phone: "+1-555-0131",
      contact_address: "1200 Network Ave, Dallas, TX",
      default_category: "Utilities & Telecom",
      is_demo: true,
      total_expenses_by_currency: { USD: 695.0 },
      invoice_count: 1,
      recent_transactions: [
        {
          record_id: "TX-2026-9031",
          invoice_number: "DEMO-INV-2026-9031",
          invoice_date: "2026-10-15",
          total_amount: 695.0,
          currency: "USD",
          expense_category: "Utilities & Telecom",
          payment_status: "paid",
          is_demo: true,
        },
      ],
      created_at: "2026-10-15T08:15:30Z",
    },
  ],
  pending_reviews: [
    {
      queue_id: "REV-SCAN-094",
      source_filename: "receipt_scan_blurred_mobile.jpg",
      document_type: "Receipt Image",
      failure_reason:
        "Arithmetic discrepancy: extracted subtotal and tax do not match total, and vendor address is partially occluded. Flagged for human verification per deterministic audit policy.",
      missing_fields: "vendor_address, tax_breakdown",
      status: "pending_review",
      created_at: "2026-11-18T16:05:10Z",
    },
  ],
  recent_activity: [
    {
      activity_id: "ACT-01",
      event_type: "document_processed",
      title: "Invoice Processed: Apex Cloud Infrastructure",
      detail:
        "INV-2026-8942 extracted via Google Gemini, verified $1,450.00 + $145.00 = $1,595.00, saved to SQLite.",
      status: "success",
      record_ref: "TX-2026-8942",
      is_demo: false,
      created_at: "2026-11-15T10:14:22Z",
    },
    {
      activity_id: "ACT-02",
      event_type: "document_processed",
      title: "Invoice Processed: Synthetix AI Solutions",
      detail:
        "INV-2026-3104 validated, duplicate check passed, recorded in SQLite.",
      status: "success",
      record_ref: "TX-2026-3104",
      is_demo: false,
      created_at: "2026-11-18T14:22:05Z",
    },
    {
      activity_id: "ACT-03",
      event_type: "human_review_flagged",
      title: "Flagged for Human Review: Blurred Receipt",
      detail:
        "receipt_scan_blurred_mobile.jpg diverted to review queue. Zero financial numbers were invented.",
      status: "warning",
      record_ref: "REV-SCAN-094",
      is_demo: true,
      created_at: "2026-11-18T16:05:10Z",
    },
    {
      activity_id: "ACT-04",
      event_type: "vendor_onboarded",
      title: "Vendor Onboarded: Stratos Cloud Networks",
      detail:
        "Automated vendor workflow completed: vendor record created and first invoice DEMO-INV-2026-7721 booked.",
      status: "success",
      record_ref: "VEND-STRAT-03",
      is_demo: true,
      created_at: "2026-11-10T09:30:00Z",
    },
  ],
};
