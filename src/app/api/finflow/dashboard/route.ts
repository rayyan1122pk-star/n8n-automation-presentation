import { NextResponse } from "next/server";
import { INITIAL_FINFLOW_PRESENTATION_DASHBOARD } from "@/content/finflow-demo-data";

const N8N_WEBHOOK_URL =
  process.env.FINFLOW_N8N_WEBHOOK_URL || "http://127.0.0.1:5678/webhook/finflow";

export async function GET() {
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "crm_dashboard" }),
      cache: "no-store",
    });

    const text = await res.text();
    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(text);
    } catch {
      // If n8n returns non-JSON or HTML error page, fall back to rich presentation data
      return NextResponse.json(
        {
          ok: true,
          n8n_connected: false,
          is_presentation_fallback: true,
          execution_id: "DEMO-INIT",
          workflow: "FinFlow - Smart Document & Accounting Automation",
          dashboard: INITIAL_FINFLOW_PRESENTATION_DASHBOARD,
          note: "n8n returned non-JSON response, using presentation demo data.",
        },
        { status: 200 }
      );
    }

    if (!res.ok) {
      // If n8n webhook is not yet active or responding with error, fall back to presentation data
      return NextResponse.json(
        {
          ok: true,
          n8n_connected: false,
          is_presentation_fallback: true,
          execution_id: "DEMO-INIT",
          workflow: "FinFlow - Smart Document & Accounting Automation",
          dashboard: INITIAL_FINFLOW_PRESENTATION_DASHBOARD,
          note: (data.message as string) || "FinFlow webhook inactive in local n8n.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        n8n_connected: true,
        execution_id: data.execution_id ?? null,
        workflow: data.workflow ?? "FinFlow - Smart Document & Accounting Automation",
        dashboard: data.dashboard || INITIAL_FINFLOW_PRESENTATION_DASHBOARD,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch {
    // When local n8n is offline or unreachable, provide the full, rich presentation demo data
    return NextResponse.json(
      {
        ok: true,
        n8n_connected: false,
        is_presentation_fallback: true,
        execution_id: "DEMO-OFFLINE",
        workflow: "FinFlow - Smart Document & Accounting Automation",
        dashboard: INITIAL_FINFLOW_PRESENTATION_DASHBOARD,
        note: "Local n8n not detected on port 5678, using presentation demo dataset.",
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }
}
