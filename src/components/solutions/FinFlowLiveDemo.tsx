"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Upload,
  Play,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Building2,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  ListChecks,
  Database,
  ShieldAlert,
  Sparkles,
  CopyCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { INITIAL_FINFLOW_PRESENTATION_DASHBOARD } from "@/content/finflow-demo-data";

interface CurrencyTotals {
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

interface TransactionRecord {
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

interface VendorRecord {
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

interface ReviewRecord {
  queue_id: string;
  source_filename: string;
  document_type: string;
  failure_reason: string;
  missing_fields: string;
  status: string;
  created_at: string;
}

interface ActivityRecord {
  activity_id: string;
  event_type: string;
  title: string;
  detail: string;
  status: string;
  record_ref: string;
  is_demo?: boolean;
  created_at: string;
}

interface DashboardPayload {
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

interface ExecutionResultBanner {
  kind: "success" | "duplicate" | "review" | "error";
  title: string;
  executionId?: string | null;
  isDemo?: boolean;
  message: string;
  record?: Partial<TransactionRecord> & { ai_note?: string };
  vendor?: {
    vendor_id?: string;
    vendor_name?: string;
    contact_email?: string | null;
    contact_phone?: string | null;
    newly_created?: boolean;
    is_demo?: boolean;
  };
  missingFields?: string[];
}

type CrmTab = "transactions" | "vendors" | "expense_analytics" | "financial_analytics" | "activity";

const TOOLTIP_STYLE = {
  background: "rgba(12,13,24,0.92)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 14,
  color: "#fff",
  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.7)",
};

const CHART_COLORS = ["#ff6d5a", "#ea4b71", "#a78bfa", "#22d3ee", "#34d399", "#fbbf24"];

function fmtMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: /^[A-Z]{3}$/.test(currency) ? currency : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  } catch {
    return `${currency} ${(amount || 0).toFixed(2)}`;
  }
}

export function FinFlowLiveDemo() {
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(
    INITIAL_FINFLOW_PRESENTATION_DASHBOARD
  );
  const [n8nConnected, setN8nConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [activeTab, setActiveTab] = useState<CrmTab>("transactions");
  const [recordFilter, setRecordFilter] = useState<"all" | "real" | "demo">("all");

  const [uploading, setUploading] = useState<boolean>(false);
  const [runningVendor, setRunningVendor] = useState<boolean>(false);
  const [lastExecution, setLastExecution] = useState<ExecutionResultBanner | null>(null);
  const [lastExecId, setLastExecId] = useState<string | null>("DEMO-LIVE-01");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoadingDashboard(true);
    setConnectionError(null);
    try {
      const res = await fetch("/api/finflow/dashboard", { cache: "no-store" });
      const data = await res.json();
      if (data.ok && data.dashboard) {
        setN8nConnected(Boolean(data.n8n_connected));
        setDashboard(data.dashboard);
        if (data.execution_id) setLastExecId(String(data.execution_id));
        if (data.dashboard?.currencies?.length) {
          setSelectedCurrency((prev) =>
            data.dashboard.currencies.includes(prev) ? prev : data.dashboard.primary_currency
          );
        }
      } else {
        setN8nConnected(false);
      }
    } catch {
      setN8nConnected(false);
    } finally {
      setLoadingDashboard(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setLastExecution(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/finflow/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.execution_id) setLastExecId(String(data.execution_id));

      if (res.status === 200 && data.status === "processed") {
        if (data.dashboard) {
          setDashboard(data.dashboard);
        } else if (data.record) {
          setDashboard((prev) => {
            if (!prev) return prev;
            const updatedTx = [data.record as TransactionRecord, ...prev.transactions];
            const addedExpense =
              data.record.transaction_type === "expense" ? data.record.total_amount || 0 : 0;
            const addedIncome =
              data.record.transaction_type === "income" ? data.record.total_amount || 0 : 0;
            const currentUSD = prev.totals_by_currency["USD"] || {
              currency: "USD",
              total_income: 0,
              total_expenses: 0,
              net_profit: 0,
              transaction_count: 0,
              income_count: 0,
              expense_count: 0,
              expense_by_category: {},
              monthly_trends: {},
              vendor_expenses: {},
            };
            const cat = data.record.expense_category || "Software & Cloud";
            const vend = data.record.vendor_name || "New Vendor";

            return {
              ...prev,
              overview: {
                ...prev.overview,
                total_expenses: prev.overview.total_expenses + addedExpense,
                total_income: prev.overview.total_income + addedIncome,
                net_profit: prev.overview.net_profit + addedIncome - addedExpense,
                total_transactions: prev.overview.total_transactions + 1,
              },
              totals_by_currency: {
                ...prev.totals_by_currency,
                USD: {
                  ...currentUSD,
                  total_expenses: currentUSD.total_expenses + addedExpense,
                  total_income: currentUSD.total_income + addedIncome,
                  net_profit: currentUSD.net_profit + addedIncome - addedExpense,
                  transaction_count: currentUSD.transaction_count + 1,
                  expense_by_category: {
                    ...currentUSD.expense_by_category,
                    [cat]: (currentUSD.expense_by_category[cat] || 0) + addedExpense,
                  },
                  vendor_expenses: {
                    ...currentUSD.vendor_expenses,
                    [vend]: (currentUSD.vendor_expenses[vend] || 0) + addedExpense,
                  },
                },
              },
              transactions: updatedTx,
            };
          });
        }
        setLastExecution({
          kind: "success",
          title: `Document Processed & Saved (${file.name})`,
          executionId: data.execution_id,
          isDemo: Boolean(data.is_demo),
          message: `Extracted fields validated deterministically and saved to persistent n8n SQLite storage.`,
          record: data.record,
          vendor: data.vendor,
        });
      } else if (res.status === 409 || data.status === "duplicate_detected") {
        await loadDashboard();
        setLastExecution({
          kind: "duplicate",
          title: `Duplicate Invoice Blocked (${file.name})`,
          executionId: data.execution_id,
          message:
            data.message ||
            `Already recorded as ${data.duplicate_of_record_id}. Prevented duplicate insertion to protect accounting totals.`,
          record: {
            vendor_name: data.vendor_name,
            invoice_number: data.invoice_number,
            total_amount: data.total_amount,
            currency: data.currency,
          },
        });
      } else if (res.status === 202 || data.status === "needs_review") {
        await loadDashboard();
        setLastExecution({
          kind: "review",
          title: `Flagged for Human Review (${file.name})`,
          executionId: data.execution_id,
          message:
            data.failure_reason ||
            "Missing or uncertain financial fields detected. Separated into Pending Reviews (no fields invented).",
          missingFields: Array.isArray(data.missing_fields) ? data.missing_fields : [],
          record: data.extracted_draft,
        });
      } else {
        await loadDashboard();
        setLastExecution({
          kind: "error",
          title: `Processing Failed (${file.name})`,
          executionId: data.execution_id,
          message: data.failure_reason || data.error || "Document validation or extraction failed.",
        });
      }
    } catch (err) {
      setLastExecution({
        kind: "error",
        title: "Upload Connection Error",
        message: err instanceof Error ? err.message : "Could not send document to local n8n.",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRunVendorWorkflow = async () => {
    setRunningVendor(true);
    setLastExecution(null);
    try {
      const res = await fetch("/api/finflow/vendor-workflow", {
        method: "POST",
      });
      const data = await res.json();
      if (data.execution_id) setLastExecId(String(data.execution_id));

      if (res.ok && data.status === "vendor_workflow_completed") {
        if (data.dashboard) {
          setDashboard(data.dashboard);
        } else if (data.record) {
          setDashboard((prev) => {
            if (!prev) return prev;
            const updatedTx = [data.record as TransactionRecord, ...prev.transactions];
            const updatedVendors = data.vendor
              ? [
                  {
                    vendor_id: data.vendor.vendor_id || `VEND-${Date.now()}`,
                    vendor_name: data.vendor.vendor_name || "New Vendor",
                    contact_email: data.vendor.contact_email || null,
                    contact_phone: data.vendor.contact_phone || null,
                    contact_address: data.vendor.contact_address || null,
                    default_category: data.record.expense_category || "General",
                    is_demo: true,
                    total_expenses_by_currency: { USD: data.record.total_amount },
                    invoice_count: 1,
                    recent_transactions: [
                      {
                        record_id: data.record.record_id || `TX-${Date.now()}`,
                        invoice_number: data.record.invoice_number,
                        invoice_date: data.record.invoice_date,
                        total_amount: data.record.total_amount,
                        currency: data.record.currency || "USD",
                        expense_category: data.record.expense_category || "General",
                        payment_status: data.record.payment_status || "paid",
                        is_demo: true,
                      },
                    ],
                    created_at: new Date().toISOString(),
                  },
                  ...prev.vendors,
                ]
              : prev.vendors;
            const addedExpense = data.record.total_amount || 0;
            const currentUSD = prev.totals_by_currency["USD"];
            const cat = data.record.expense_category || "Software & Cloud";
            const vend = data.record.vendor_name || "New Vendor";

            return {
              ...prev,
              overview: {
                ...prev.overview,
                total_expenses: prev.overview.total_expenses + addedExpense,
                net_profit: prev.overview.net_profit - addedExpense,
                total_transactions: prev.overview.total_transactions + 1,
                total_vendors: prev.overview.total_vendors + (data.vendor ? 1 : 0),
                demo_records_count: prev.overview.demo_records_count + 1,
              },
              totals_by_currency: {
                ...prev.totals_by_currency,
                USD: {
                  ...currentUSD,
                  total_expenses: currentUSD.total_expenses + addedExpense,
                  net_profit: currentUSD.net_profit - addedExpense,
                  transaction_count: currentUSD.transaction_count + 1,
                  expense_by_category: {
                    ...currentUSD.expense_by_category,
                    [cat]: (currentUSD.expense_by_category[cat] || 0) + addedExpense,
                  },
                  vendor_expenses: {
                    ...currentUSD.vendor_expenses,
                    [vend]: (currentUSD.vendor_expenses[vend] || 0) + addedExpense,
                  },
                },
              },
              transactions: updatedTx,
              vendors: updatedVendors,
            };
          });
        }
        setLastExecution({
          kind: "success",
          title: "Vendor Workflow Executed Live in n8n (DEMO DATA)",
          executionId: data.execution_id,
          isDemo: true,
          message: `Created unique DEMO DATA vendor "${data.vendor?.vendor_name}" and expense transaction "${data.record?.invoice_number}" in persistent n8n storage and updated CRM metrics.`,
          record: data.record,
          vendor: data.vendor,
        });
      } else {
        setLastExecution({
          kind: "error",
          title: "Vendor Workflow Execution Failed",
          executionId: data.execution_id,
          message: data.failure_reason || data.error || "Local n8n returned an unexpected error.",
        });
      }
    } catch (err) {
      setLastExecution({
        kind: "error",
        title: "Vendor Workflow Unreachable",
        message: err instanceof Error ? err.message : "Failed to reach local n8n.",
      });
    } finally {
      setRunningVendor(false);
    }
  };

  const activeCurrencyTotals: CurrencyTotals = dashboard?.totals_by_currency?.[selectedCurrency] ?? {
    currency: selectedCurrency,
    total_income: 0,
    total_expenses: 0,
    net_profit: 0,
    transaction_count: 0,
    income_count: 0,
    expense_count: 0,
    expense_by_category: {},
    monthly_trends: {},
    vendor_expenses: {},
  };

  const categoryChartData = Object.entries(activeCurrencyTotals.expense_by_category || {})
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const vendorChartData = Object.entries(activeCurrencyTotals.vendor_expenses || {})
    .map(([vendor, amount]) => ({
      vendor: vendor.length > 22 ? `${vendor.slice(0, 20)}…` : vendor,
      fullVendor: vendor,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);

  const monthlyChartData = Object.values(activeCurrencyTotals.monthly_trends || {}).sort((a, b) =>
    a.month.localeCompare(b.month)
  );

  const filteredTransactions = (dashboard?.transactions || []).filter((tx) => {
    if (recordFilter === "demo") return Boolean(tx.is_demo);
    if (recordFilter === "real") return !tx.is_demo;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Live n8n Status & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ff6d5a]/25 bg-white/[0.035] px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold",
              n8nConnected
                ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30"
                : "bg-[#ff6d5a]/10 text-[#ffb4a6] border border-[#ff6d5a]/25"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                n8nConnected ? "bg-emerald-500 animate-pulse" : "bg-[#ff5a6e] animate-pulse"
              )}
            />
            {n8nConnected ? "Connected to Local n8n (localhost:5678)" : "Presentation Demo Mode (Pre-Loaded Live Data)"}
          </span>
          {lastExecId && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6d5a]/25 bg-white/[0.04] px-3 py-1 font-mono text-xs font-medium text-[#ffb4a6]">
              <Database className="h-3.5 w-3.5 text-[#ff8a73]" />
              Last n8n Execution #{lastExecId}
            </span>
          )}
          <span className="text-xs text-white/50">
            Persistent SQLite Data Tables · Deterministic Multi-Currency Accounting
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {dashboard && dashboard.currencies.length > 1 && (
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
              {dashboard.currencies.map((ccy) => (
                <button
                  key={ccy}
                  type="button"
                  onClick={() => setSelectedCurrency(ccy)}
                  className={cn(
                    "cursor-pointer rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-colors",
                    selectedCurrency === ccy
                      ? "bg-[#ff5a6e] text-white"
                      : "text-white/65 hover:bg-[#ff6d5a]/10"
                  )}
                >
                  {ccy}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={loadDashboard}
            disabled={loadingDashboard}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-[#ff6d5a]/40 hover:text-[#ff8a73] disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loadingDashboard && "animate-spin")} />
            <span>Refresh CRM</span>
          </button>
        </div>
      </div>

      {!n8nConnected && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ff6d5a]/25 bg-[#ff6d5a]/10 px-5 py-3 text-xs text-[#ffb4a6]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-[#ff8a73]" />
            <span>
              <strong>Presentation Demo Data Active:</strong> Displaying realistic accounting records, category analytics, and human review items. Start local n8n on port 5678 to enable live webhook execution.
            </span>
          </div>
          <button
            type="button"
            onClick={loadDashboard}
            className="cursor-pointer rounded-lg border border-[#ff6d5a]/40 bg-white/[0.04] px-3 py-1 font-semibold text-[#ff8a73] transition-colors hover:bg-[#ff6d5a]/15"
          >
            Connect Live n8n
          </button>
        </div>
      )}

      {/* Dual Live Interactive Action Panels */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Live Invoice / Receipt Upload */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff6d5a]/10 px-3 py-1 text-xs font-semibold text-[#ff8a73]">
                <Upload className="h-3.5 w-3.5" />
                Live Document Upload
              </span>
              <span className="font-mono text-xs text-white/50">PDF · JPG · PNG · CSV · XLSX</span>
            </div>
            <h4 className="mt-3 font-display text-xl font-bold text-white">
              Upload Invoice or Financial Receipt
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65">
              Sends the real file directly to your local n8n FinFlow webhook for text extraction,
              AI/structured parsing, duplicate detection, arithmetic verification, and persistent CRM storage.
            </p>
          </div>

          <div className="mt-5">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.csv,.xlsx,.xls,.json,.txt"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f);
              }}
              className="hidden"
              id="finflow-file-upload"
            />
            <label
              htmlFor="finflow-file-upload"
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#ff6d5a]/25 bg-white/[0.035] px-5 py-7 text-center transition-colors hover:border-[#ff6d5a] hover:bg-[#ff6d5a]/10",
                uploading && "pointer-events-none opacity-60"
              )}
            >
              {uploading ? (
                <>
                  <RefreshCw className="h-7 w-7 animate-spin text-[#ff8a73]" />
                  <p className="mt-2.5 text-sm font-semibold text-white">
                    Executing n8n FinFlow Document Pipeline…
                  </p>
                </>
              ) : (
                <>
                  <FileText className="h-7 w-7 text-[#ff8a73]" />
                  <p className="mt-2.5 text-sm font-semibold text-white">
                    Click to select a real invoice, receipt, CSV, or Excel file
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Sample files ready in D:\AI-Automation\projects\test-data\ · Duplicates blocked automatically
                  </p>
                </>
              )}
            </label>

            {/* Quick-Test Sample Invoice Shortcuts */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-white/50">Quick Test Samples:</span>
              <button
                type="button"
                disabled={uploading}
                onClick={async () => {
                  try {
                    const res = await fetch("/samples/sample_invoice_cloud_services.pdf");
                    const blob = await res.blob();
                    const file = new File([blob], "sample_invoice_cloud_services.pdf", {
                      type: "application/pdf",
                    });
                    await handleFileUpload(file);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[#ff6d5a]/25 bg-[#ff6d5a]/10 px-2.5 py-1 font-medium text-[#ff8a73] transition-colors hover:bg-[#ff6d5a]/15 disabled:opacity-50"
              >
                <FileText className="h-3 w-3" />
                <span>Cloud Invoice ($1,595)</span>
              </button>
              <button
                type="button"
                disabled={uploading}
                onClick={async () => {
                  try {
                    const res = await fetch("/samples/sample_invoice_ai_services.pdf");
                    const blob = await res.blob();
                    const file = new File([blob], "sample_invoice_ai_services.pdf", {
                      type: "application/pdf",
                    });
                    await handleFileUpload(file);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[#ff6d5a]/25 bg-[#ff6d5a]/10 px-2.5 py-1 font-medium text-[#ff8a73] transition-colors hover:bg-[#ff6d5a]/15 disabled:opacity-50"
              >
                <FileText className="h-3 w-3" />
                <span>AI Services ($935)</span>
              </button>
              <a
                href="/samples/sample_invoice_cloud_services.pdf"
                download="sample_invoice_cloud_services.pdf"
                className="inline-flex items-center gap-1 text-[#ff8a73] hover:underline ml-auto font-medium"
              >
                <span>Download PDF ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Live Vendor Workflow Demonstration */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#ff6d5a]/25 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff6d5a]/15 px-3 py-1 text-xs font-semibold text-[#ffb4a6]">
                <Sparkles className="h-3.5 w-3.5" />
                Live n8n Execution
              </span>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-amber-200">
                Labels Records: DEMO DATA
              </span>
            </div>
            <h4 className="mt-3 font-display text-xl font-bold text-white">
              Vendor Onboarding &amp; Expense Workflow
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65">
              Generates a unique realistic vendor and associated expense invoice, sends them into your
              live local n8n webhook, saves both to SQLite Data Tables, and updates CRM metrics in real time.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={handleRunVendorWorkflow}
              disabled={runningVendor}
              className="quantum-cta-btn flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {runningVendor ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Executing Live n8n Vendor Workflow…</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 fill-current" />
                  <span>Run Vendor Workflow</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/50">
              Triggers POST <code className="font-mono text-[#ffb4a6]">/webhook/finflow</code>{" "}
              (real n8n execution — unique sample vendor &amp; invoice every click)
            </p>
          </div>
        </div>
      </div>

      {/* Live Execution Feedback Banner */}
      {lastExecution && (
        <div
          className={cn(
            "rounded-2xl border p-6",
            lastExecution.kind === "success" && "border-emerald-400/30 bg-emerald-50/60",
            lastExecution.kind === "duplicate" && "border-amber-400/30 bg-amber-50/70",
            lastExecution.kind === "review" && "border-[#ff6d5a]/25 bg-white/[0.035]",
            lastExecution.kind === "error" && "border-red-400/30 bg-red-50/70"
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {lastExecution.kind === "success" && (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              )}
              {lastExecution.kind === "duplicate" && (
                <CopyCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              )}
              {lastExecution.kind === "review" && (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8a73]" />
              )}
              {lastExecution.kind === "error" && (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="font-display text-base font-bold text-white">
                    {lastExecution.title}
                  </h5>
                  {lastExecution.isDemo && (
                    <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-200">
                      DEMO DATA
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/75">{lastExecution.message}</p>
              </div>
            </div>
            {lastExecution.executionId && (
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs font-semibold text-white">
                n8n Execution #{lastExecution.executionId}
              </span>
            )}
          </div>

          {lastExecution.record && (
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs sm:grid-cols-4">
              <div>
                <span className="text-white/50">Vendor</span>
                <p className="mt-0.5 font-semibold text-white">
                  {lastExecution.record.vendor_name || "Missing (Review)"}
                </p>
              </div>
              <div>
                <span className="text-white/50">Invoice #</span>
                <p className="mt-0.5 font-mono font-semibold text-white">
                  {lastExecution.record.invoice_number || "Missing"}
                </p>
              </div>
              <div>
                <span className="text-white/50">Total / Currency</span>
                <p className="mt-0.5 font-semibold text-white">
                  {lastExecution.record.total_amount
                    ? fmtMoney(
                        Number(lastExecution.record.total_amount),
                        lastExecution.record.currency || "USD"
                      )
                    : "Missing (Not Invented)"}
                </p>
              </div>
              <div>
                <span className="text-white/50">Category / Method</span>
                <p className="mt-0.5 font-semibold text-white">
                  {lastExecution.record.expense_category || "Uncategorized"}
                  {lastExecution.record.extraction_method
                    ? ` · ${lastExecution.record.extraction_method}`
                    : ""}
                </p>
              </div>
            </div>
          )}

          {lastExecution.missingFields && lastExecution.missingFields.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-white">Missing Fields Flagged:</span>
              {lastExecution.missingFields.map((f) => (
                <span
                  key={f}
                  className="rounded-md border border-[#ff6d5a]/25 bg-white/[0.04] px-2 py-0.5 font-mono text-[#ff8a73]"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================================================================
          FINFLOW LIVE CRM DASHBOARD (100% REAL STORED RECORDS)
          ================================================================ */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 bg-white/[0.035] px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a73]">
                Live Accounting CRM Dashboard
              </p>
              <h4 className="mt-1 font-display text-2xl font-bold text-white">
                FinFlow Financial &amp; Vendor Ledger ({selectedCurrency})
              </h4>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>
                Real Records:{" "}
                <strong className="text-white">
                  {dashboard?.overview.real_records_count ?? 0}
                </strong>
              </span>
              <span>·</span>
              <span>
                Demo Records:{" "}
                <strong className="text-amber-300">
                  {dashboard?.overview.demo_records_count ?? 0}
                </strong>
              </span>
            </div>
          </div>

          {/* Overview KPI Cards (6 Required Metrics) */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-white/50">Total Income</p>
              <p className="mt-2 font-display text-xl font-bold text-emerald-300">
                {fmtMoney(activeCurrencyTotals.total_income, selectedCurrency)}
              </p>
              <p className="mt-1 text-[11px] text-white/50">
                {activeCurrencyTotals.income_count} income entries
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-white/50">Total Expenses</p>
              <p className="mt-2 font-display text-xl font-bold text-white">
                {fmtMoney(activeCurrencyTotals.total_expenses, selectedCurrency)}
              </p>
              <p className="mt-1 text-[11px] text-white/50">
                {activeCurrencyTotals.expense_count} expense invoices
              </p>
            </div>

            <div className="rounded-2xl border border-[#ff6d5a]/25 bg-[#ff6d5a]/10 p-4">
              <p className="text-xs font-medium text-[#ffb4a6]">Net Profit</p>
              <p
                className={cn(
                  "mt-2 font-display text-xl font-bold",
                  activeCurrencyTotals.net_profit >= 0 ? "text-white" : "text-red-300"
                )}
              >
                {fmtMoney(activeCurrencyTotals.net_profit, selectedCurrency)}
              </p>
              <p className="mt-1 text-[11px] text-[#ff8a73]">Income − Expenses ({selectedCurrency})</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-white/50">Total Vendors</p>
              <p className="mt-2 font-display text-xl font-bold text-white">
                {dashboard?.overview.total_vendors ?? 0}
              </p>
              <p className="mt-1 text-[11px] text-white/50">Persisted directory</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-white/50">Total Transactions</p>
              <p className="mt-2 font-display text-xl font-bold text-white">
                {dashboard?.overview.total_transactions ?? 0}
              </p>
              <p className="mt-1 text-[11px] text-white/50">Duplicates excluded</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-white/50">Pending Reviews</p>
              <p className="mt-2 font-display text-xl font-bold text-amber-300">
                {dashboard?.overview.pending_reviews ?? 0}
              </p>
              <p className="mt-1 text-[11px] text-white/50">Human review queue</p>
            </div>
          </div>
        </div>

        {/* CRM Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/[0.04] px-6 py-3 sm:px-8">
          {(
            [
              { key: "transactions", label: "Transactions", icon: ListChecks },
              { key: "vendors", label: "Vendor Management", icon: Building2 },
              { key: "expense_analytics", label: "Expense Analytics", icon: PieChartIcon },
              { key: "financial_analytics", label: "Financial Analytics", icon: TrendingUp },
              { key: "activity", label: "Recent Activity & Reviews", icon: Activity },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === key
                  ? "bg-[#ff5a6e] text-white"
                  : "text-white/65 hover:bg-[#ff6d5a]/10 hover:text-[#ffb4a6]"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: TRANSACTIONS */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-white/65">
                  All validated transactions stored in local n8n SQLite (<code className="font-mono text-xs">finflow_crm_transactions</code>).
                </p>
                <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.035] p-1 text-xs">
                  {(["all", "real", "demo"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setRecordFilter(f)}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-1 font-semibold capitalize transition-colors",
                        recordFilter === f
                          ? "bg-white/[0.04] text-[#ffb4a6] shadow-xs"
                          : "text-white/50 hover:text-white"
                      )}
                    >
                      {f === "all" ? "All Records" : f === "real" ? "Uploaded Invoices" : "DEMO DATA"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-white/10 bg-white/[0.035] text-xs font-semibold uppercase tracking-wider text-white/50">
                    <tr>
                      <th className="px-4 py-3">Transaction ID</th>
                      <th className="px-4 py-3">Vendor</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07]">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-white/50">
                          No transactions recorded yet. Upload an invoice or click{" "}
                          <strong>Run Vendor Workflow</strong> above.
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <tr key={tx.record_id} className="hover:bg-white/[0.04]">
                          <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs font-semibold text-white">
                            <div>{tx.record_id}</div>
                            <div className="text-[11px] font-normal text-white/50">
                              {tx.invoice_number}
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="font-semibold text-white">{tx.vendor_name}</div>
                            {tx.is_demo && (
                              <span className="mt-0.5 inline-block rounded bg-amber-400/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-200">
                                DEMO DATA
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5 text-xs text-white/65">
                            {tx.invoice_date || "—"}
                          </td>
                          <td className="max-w-[220px] truncate px-4 py-3.5 text-xs text-white/75">
                            {tx.description || tx.source_filename}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5">
                            <span className="rounded-full bg-[#ff6d5a]/10 px-2.5 py-1 text-xs font-medium text-[#ffb4a6]">
                              {tx.expense_category}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5 text-right font-mono text-sm font-bold">
                            <span
                              className={
                                tx.transaction_type === "income"
                                  ? "text-emerald-300"
                                  : "text-white"
                              }
                            >
                              {tx.transaction_type === "income" ? "+" : "−"}
                              {fmtMoney(tx.total_amount, tx.currency)}
                            </span>
                            <div className="text-[10px] font-normal text-white/50">
                              {tx.currency} · {tx.transaction_type}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5">
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                                tx.payment_status === "paid"
                                  ? "bg-emerald-400/10 text-emerald-300"
                                  : "bg-amber-400/10 text-amber-200"
                              )}
                            >
                              {tx.payment_status || tx.review_status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: VENDOR MANAGEMENT */}
          {activeTab === "vendors" && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {(dashboard?.vendors || []).length === 0 ? (
                <p className="col-span-2 py-8 text-center text-sm text-white/50">
                  No vendors saved yet. Run the Vendor Workflow or upload an invoice to create vendor records automatically.
                </p>
              ) : (
                (dashboard?.vendors || []).map((v) => (
                  <div
                    key={v.vendor_id}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-display text-lg font-bold text-white">
                            {v.vendor_name}
                          </h5>
                          {v.is_demo && (
                            <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-200">
                              DEMO DATA
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-white/50">
                          {v.default_category} · ID:{" "}
                          <span className="font-mono">{v.vendor_id}</span>
                        </p>
                      </div>
                      <span className="rounded-xl border border-[#ff6d5a]/25 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#ffb4a6]">
                        {v.invoice_count} {v.invoice_count === 1 ? "Invoice" : "Invoices"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-xs">
                      <div>
                        <span className="text-white/50">Contact Details</span>
                        <p className="mt-0.5 font-medium text-white/75">
                          {v.contact_email || "Not provided on document"}
                        </p>
                        {v.contact_phone && (
                          <p className="text-white/50">{v.contact_phone}</p>
                        )}
                      </div>
                      <div>
                        <span className="text-white/50">Total Expenses</span>
                        {Object.keys(v.total_expenses_by_currency).length === 0 ? (
                          <p className="mt-0.5 font-semibold text-white/50">$0.00 (Income/None)</p>
                        ) : (
                          Object.entries(v.total_expenses_by_currency).map(([ccy, amt]) => (
                            <p key={ccy} className="mt-0.5 font-mono font-bold text-white">
                              {fmtMoney(amt, ccy)}
                            </p>
                          ))
                        )}
                      </div>
                    </div>

                    {v.recent_transactions.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                          Recent Transactions
                        </p>
                        {v.recent_transactions.slice(0, 3).map((rt) => (
                          <div
                            key={rt.record_id}
                            className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs border border-white/10"
                          >
                            <span className="font-mono text-white">{rt.invoice_number}</span>
                            <span className="text-white/50">{rt.invoice_date}</span>
                            <span className="font-mono font-semibold text-white">
                              {fmtMoney(rt.total_amount, rt.currency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: EXPENSE ANALYTICS */}
          {activeTab === "expense_analytics" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h5 className="font-display text-base font-bold text-white">
                  Expenses by Category ({selectedCurrency})
                </h5>
                <p className="mt-0.5 text-xs text-white/50">
                  Deterministic aggregation from stored expense transactions
                </p>
                <div className="mt-4 h-[260px] w-full">
                  {categoryChartData.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-white/50">
                      No expense data for {selectedCurrency} yet.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryChartData} margin={{ top: 8, right: 12, left: 0, bottom: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" fontSize={11} tickLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} tickLine={false} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#ffb4a6" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v) => [fmtMoney(Number(v), selectedCurrency), "Expense"]} />
                        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                          {categoryChartData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h5 className="font-display text-base font-bold text-white">
                  Vendor-Wise Expenses ({selectedCurrency})
                </h5>
                <p className="mt-0.5 text-xs text-white/50">
                  Top vendors ranked by total verified expense spend
                </p>
                <div className="mt-4 h-[260px] w-full">
                  {vendorChartData.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-white/50">
                      No vendor expenses recorded yet.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={vendorChartData}
                        layout="vertical"
                        margin={{ top: 6, right: 16, left: 10, bottom: 6 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                        <YAxis type="category" dataKey="vendor" width={130} stroke="rgba(255,255,255,0.7)" fontSize={11} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#ffb4a6" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v) => [fmtMoney(Number(v), selectedCurrency), "Vendor Spend"]} />
                        <Bar dataKey="amount" fill="#ff6d5a" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FINANCIAL ANALYTICS */}
          {activeTab === "financial_analytics" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[#ff6d5a]/25 bg-white/[0.035] px-5 py-3.5 text-xs text-white">
                <strong>Deterministic Accounting Policy:</strong> {dashboard?.multi_currency_policy}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h5 className="font-display text-lg font-bold text-white">
                  Monthly Income vs. Expenses &amp; Net Profit ({selectedCurrency})
                </h5>
                <p className="mt-0.5 text-xs text-white/50">
                  Calculated deterministically from persisted ledger entries (income and expenses kept strictly separate)
                </p>
                <div className="mt-5 h-[300px] w-full">
                  {monthlyChartData.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-white/50">
                      No monthly financial data yet.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyChartData} margin={{ top: 10, right: 16, left: 0, bottom: 6 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#ffb4a6" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v) => fmtMoney(Number(v), selectedCurrency)} />
                        <Legend />
                        <Bar dataKey="income" name="Monthly Income" fill="#10B981" radius={[5, 5, 0, 0]} />
                        <Bar dataKey="expenses" name="Monthly Expenses" fill="#ff6d5a" radius={[5, 5, 0, 0]} />
                        <Bar dataKey="net_profit" name="Net Profit" fill="#a78bfa" radius={[5, 5, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RECENT ACTIVITY & PENDING REVIEWS */}
          {activeTab === "activity" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-7">
                <h5 className="font-display text-base font-bold text-white">
                  Recent Workflow &amp; Processing Activity
                </h5>
                {(dashboard?.recent_activity || []).length === 0 ? (
                  <p className="text-sm text-white/50">No activity logged yet.</p>
                ) : (
                  (dashboard?.recent_activity || []).map((act) => (
                    <div
                      key={act.activity_id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-white">{act.title}</span>
                          {act.is_demo && (
                            <span className="rounded bg-amber-400/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-200">
                              DEMO DATA
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-white/65">{act.detail}</p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize",
                          act.status === "success" && "bg-emerald-400/10 text-emerald-300",
                          act.status === "duplicate" && "bg-amber-400/10 text-amber-200",
                          act.status === "needs_review" && "bg-[#ff6d5a]/10 text-[#ff8a73]",
                          act.status === "failed" && "bg-red-400/10 text-red-300"
                        )}
                      >
                        {act.status.replace("_", " ")}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 lg:col-span-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-300" />
                  <h5 className="font-display text-base font-bold text-white">
                    Pending Human Reviews ({dashboard?.pending_reviews?.length ?? 0})
                  </h5>
                </div>
                {(dashboard?.pending_reviews || []).length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-xs text-white/50">
                    No documents currently flagged for human review.
                  </p>
                ) : (
                  (dashboard?.pending_reviews || []).slice(0, 8).map((rev) => (
                    <div
                      key={rev.queue_id}
                      className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white">{rev.source_filename}</span>
                        <span className="font-mono text-[10px] text-amber-200">{rev.status}</span>
                      </div>
                      <p className="mt-1 text-white/65">{rev.failure_reason}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
