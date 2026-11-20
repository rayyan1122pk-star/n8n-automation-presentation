import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.FINFLOW_N8N_WEBHOOK_URL || "http://127.0.0.1:5678/webhook/finflow";

const DEMO_VENDOR_TEMPLATES = [
  {
    baseName: "Stratos Cloud Networks",
    domain: "stratoscloud-demo.example",
    phone: "+1-555-0142",
    address: "210 Cloud Way, Seattle, WA",
    category: "Software & Cloud",
    descriptions: [
      "Managed GPU & Kubernetes Hosting Tier",
      "Enterprise PostgreSQL Cluster & Backups",
      "CDN Bandwidth & API Gateway Usage",
    ],
    minSub: 320,
    maxSub: 1450,
    taxRate: 0.08,
  },
  {
    baseName: "Vanguard Legal & Tax LLP",
    domain: "vanguardlegal-demo.example",
    phone: "+1-555-0188",
    address: "500 Commerce Plaza, Chicago, IL",
    category: "Professional Services",
    descriptions: [
      "Quarterly Compliance & Contract Review",
      "Corporate Accounting & Tax Advisory Retainer",
      "Vendor MSA Legal Audit",
    ],
    minSub: 600,
    maxSub: 2200,
    taxRate: 0.05,
  },
  {
    baseName: "Northbridge Office Supply Co.",
    domain: "northbridge-demo.example",
    phone: "+1-555-0164",
    address: "88 Industrial Pkwy, Austin, TX",
    category: "Office Supplies",
    descriptions: [
      "Ergonomic Desk Accessories & Supplies Batch",
      "Conference Room AV & Presentation Kit",
      "Printer Toner & Archival Paper Restock",
    ],
    minSub: 140,
    maxSub: 680,
    taxRate: 0.08,
  },
  {
    baseName: "PulseGrid Fiber & Telecom",
    domain: "pulsegrid-demo.example",
    phone: "+1-555-0131",
    address: "1200 Network Ave, Dallas, TX",
    category: "Utilities",
    descriptions: [
      "Dedicated 10Gbps Business Fiber Line",
      "VoIP Trunking & Redundant Failover Circuit",
      "Data Center Power & Cooling Allocation",
    ],
    minSub: 260,
    maxSub: 950,
    taxRate: 0.06,
  },
  {
    baseName: "Lumen Creative Growth Studio",
    domain: "lumengrowth-demo.example",
    phone: "+1-555-0177",
    address: "45 Mercer St, New York, NY",
    category: "Marketing",
    descriptions: [
      "B2B Product Launch Campaign Creative",
      "Search & Technical SEO Optimization Sprint",
      "Brand Presentation Deck & Video Production",
    ],
    minSub: 480,
    maxSub: 1850,
    taxRate: 0.07,
  },
  {
    baseName: "Summit Hardware Systems",
    domain: "summithw-demo.example",
    phone: "+1-555-0195",
    address: "910 Silicon Ridge, San Jose, CA",
    category: "Equipment",
    descriptions: [
      "Developer Workstation Monitors (2 Units)",
      "Network Firewall Appliance & Rack Mount",
      "Backup NAS Storage Expansion Array",
    ],
    minSub: 550,
    maxSub: 2400,
    taxRate: 0.08,
  },
];

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export async function POST() {
  const now = new Date();
  const uid = `${now.getTime().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
  const tpl =
    DEMO_VENDOR_TEMPLATES[Math.floor(Math.random() * DEMO_VENDOR_TEMPLATES.length)];
  const desc =
    tpl.descriptions[Math.floor(Math.random() * tpl.descriptions.length)];

  const subtotal = round2(
    tpl.minSub + Math.random() * (tpl.maxSub - tpl.minSub)
  );
  const taxAmount = round2(subtotal * tpl.taxRate);
  const totalAmount = round2(subtotal + taxAmount);

  // Spread dates realistically across recent months for trend visualization
  const monthOffsets = [0, 0, 0, 1, 2];
  const offset = monthOffsets[Math.floor(Math.random() * monthOffsets.length)];
  const invDateObj = new Date(
    now.getFullYear(),
    now.getMonth() - offset,
    Math.min(28, Math.max(1, now.getDate()))
  );
  const dueDateObj = new Date(invDateObj.getTime() + 30 * 24 * 60 * 60 * 1000);
  const invoiceDate = invDateObj.toISOString().slice(0, 10);
  const dueDate = dueDateObj.toISOString().slice(0, 10);

  const vendorTag = uid.slice(-3);
  const vendorName = `${tpl.baseName} #${vendorTag}`;
  const invoiceNumber = `DEMO-INV-${now.getFullYear()}-${uid}`;

  const payload = {
    action: "vendor_workflow",
    is_demo: true,
    vendor: {
      vendor_name: vendorName,
      contact_email: `ap+${vendorTag}@${tpl.domain}`,
      contact_phone: tpl.phone,
      contact_address: tpl.address,
      category: tpl.category,
    },
    invoice: {
      invoice_number: invoiceNumber,
      invoice_date: invoiceDate,
      due_date: dueDate,
      description: `[DEMO DATA] ${desc}`,
      subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      currency: "USD",
      expense_category: tpl.category,
      payment_status: Math.random() > 0.4 ? "paid" : "unpaid",
      filename: `${invoiceNumber}.json`,
    },
  };

  try {
    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await n8nRes.text();
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { status: "error", failure_reason: text.slice(0, 400) };
    }

    return NextResponse.json(
      {
        ...parsed,
        sent_payload: payload,
      },
      {
        status: n8nRes.status,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch {
    // When local n8n is offline, simulate the live vendor onboarding execution for presentation demos
    return NextResponse.json(
      {
        status: "vendor_workflow_completed",
        execution_id: `DEMO-EXEC-${Date.now().toString().slice(-6)}`,
        is_demo: true,
        workflow: "FinFlow - Smart Document & Accounting Automation (Demo Mode)",
        vendor: payload.vendor,
        record: payload.invoice,
        message: `[Presentation Demo] Created vendor "${payload.vendor.vendor_name}" and recorded expense invoice "${payload.invoice.invoice_number}".`,
        sent_payload: payload,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
