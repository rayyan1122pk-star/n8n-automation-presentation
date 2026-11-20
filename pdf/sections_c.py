"""Section 07 opening and the FinFlow demonstration."""

from deck_kit import (
    canvas, card, content, divider, eyebrow, heading, lead, node_doc, pg, slot, tag,
)

CODE = "n8n-nodes-base.code"
HTTP = "n8n-nodes-base.httpRequest"
IF = "n8n-nodes-base.if"
WEBHOOK = "n8n-nodes-base.webhook"


def s7_divider():
    return divider(
        "07",
        "Practical<br/>demonstration",
        "Three automation systems, documented the way an engineer would review them: architecture, every node, every branch, every open item.",
        [("01", "FinFlow &mdash; documents &amp; accounting", "Four verified workflows, 21 documented nodes"),
         ("02", "OpsFlow &mdash; business operations", "Nine designed stages from order to confirmation"),
         ("03", "MailFlow &mdash; intelligent email", "Nine designed stages from inbox to approved reply")],
        pid="s7",
    )


def s7_overview():
    projects = [
        ("01", "FinFlow", "Smart document &amp; accounting automation. Turns invoices, receipts, and statements into "
         "validated ledger rows and reports.", "4 workflows &middot; 21 nodes", "Verified export", "champagne", "f7_fin"),
        ("02", "OpsFlow", "Automated business operations. Takes an order from intake to stock check, invoice, and "
         "customer confirmation.", "9 designed stages", "Design spec", "red", "f7_ops"),
        ("03", "MailFlow", "Intelligent email automation. Classifies inbound mail, scores urgency, drafts replies, and "
         "routes to the right team.", "9 designed stages", "Design spec", "red", "f7_mail"),
    ]
    cards = "".join(
        '<a href="#%s" class="card" style="display:flex;flex-direction:column;gap:12px;min-height:250px;text-decoration:none">'
        '<div style="display:flex;justify-content:space-between;align-items:center">'
        '<span style="font-family:var(--font-mono);font-size:9.5px;letter-spacing:.2em;color:#C9A878">%s</span>%s</div>'
        '<div><div style="font-family:var(--font-display);font-size:29px;font-weight:600;letter-spacing:-.02em;color:#fff">%s</div>'
        '<div class="small" style="margin-top:6px;color:#b8b2a7">%s</div></div>'
        '<div style="margin-top:auto;border-top:1px solid #262626;padding-top:12px;display:flex;justify-content:space-between">'
        '<span class="tiny">%s</span><span class="tiny" style="color:#777">%s</span></div></a>'
        % (pid, num, tag(label, tone), name, desc, meta, "OPEN &rarr;")
        for num, name, desc, meta, label, tone, pid in projects
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07 &middot; Practical demonstration") +
        heading("Three systems.<br/>One operating <span class='serif'>pattern.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:380px;text-align:right">Each project follows the same six-stage pipeline from '
          "Section 02 — only the data and the decisions change.</p></div>"
        + '<div class="grid-3" style="margin-top:28px;gap:16px">%s</div>' % cards
        + '<div class="grid-2" style="margin-top:20px">'
        + '<div class="card flat"><div class="num-badge">WHAT IS VERIFIED IN THIS DECK</div>'
          '<div class="small" style="margin-top:8px">FinFlow is documented from four n8n workflow JSON exports present in this '
          "project: node names, node types, parameters, and connections are taken from those files. OpsFlow and MailFlow are "
          "documented as designed architectures, because their exported workflow files were not supplied.</div></div>"
        + '<div class="card flat"><div class="num-badge">WHAT IS NOT</div>'
          '<div class="small" style="margin-top:8px">No product screenshots or demonstration recordings were supplied. Those '
          "slots are marked on the relevant pages rather than filled with invented imagery. No business results are claimed "
          "anywhere in this document.</div></div>"
        + "</div>"
        + '<div style="margin-top:22px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#C9A878">01 &middot; ARCHITECTURE FIRST</div>'
        '<div class="small" style="margin-top:6px">Where the workflow sits, what it calls, and what it is allowed to '
        "change — before any node is discussed.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">02 &middot; THEN EVERY NODE</div>'
        '<div class="small" style="margin-top:6px">Name, type, purpose, input, processing, output, and the next node. The '
        "same seven fields for every node, so pages can be compared.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">03 &middot; THEN THE EDGES</div>'
        '<div class="small" style="margin-top:6px">Branches, failure paths, and the parts that are still pending. A '
        "document that hides its gaps is not documentation.</div></div>"
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration", body, pid="s7-overview")


# ----------------------------------------------------------------------------
# FINFLOW
# ----------------------------------------------------------------------------

def fin_intro():
    body = content(
        '<div style="display:grid;grid-template-columns:1.05fr .95fr;gap:50px">'
        "<div class='stack-20'>" + eyebrow("07.1 &middot; FinFlow") +
        heading("Documents in.<br/>Verified ledger <span class='serif'>out.</span>", "sm")
        + '<p class="lead">Financial documents arrive in every layout a vendor can invent. FinFlow reads the document, '
          "extracts the fields, checks the arithmetic, and writes one clean row into the ledger that feeds the dashboard.</p>"
        + '<div class="card accent-left"><div class="num-badge">THE PROBLEM</div>'
          '<p style="margin-top:9px;font-size:12.8px">Retyping invoices is slow and quietly inaccurate: a misplaced decimal, '
          "a duplicated document, a VAT figure that does not match the subtotal. The error is discovered weeks later, during "
          "reconciliation, when the source document is already buried.</p></div>"
        + '<div class="card champagne-left"><div class="num-badge">THE SOLUTION</div>'
          '<p style="margin-top:9px;font-size:12.8px">A webhook receives the document job, a model extracts the fields, a '
          "deterministic rule engine validates them against VAT rules, and the validated record is written to the ledger — "
          "with the raw model response still inspectable in the execution log.</p></div>"
        + "</div>"
        '<div class="stack-14" style="padding-top:44px">'
        + '<div style="display:flex;gap:10px;flex-wrap:wrap">' + tag("Verified export", "champagne")
        + tag("4 workflows") + tag("21 nodes") + tag("Gemini / Gemma API") + tag("Supabase ledger") + "</div>"
        + '<div class="card flat" style="padding:0;overflow:hidden">'
          '<div style="padding:12px 17px;border-bottom:1px solid #262626" class="num-badge">PIPELINE, AS EXPORTED</div>'
          '<div style="padding:15px 17px" class="stack-8">'
          '<div style="display:flex;gap:10px"><span class="mono" style="font-size:9px;color:#E5484D;width:44px">INTAKE</span>'
          '<span class="small" style="flex:1">Upload route or Gmail attachment poller</span></div>'
          '<div style="display:flex;gap:10px"><span class="mono" style="font-size:9px;color:#E5484D;width:44px">EXTRACT</span>'
          '<span class="small" style="flex:1">Code node builds the prompt &rarr; model endpoint returns text</span></div>'
          '<div style="display:flex;gap:10px"><span class="mono" style="font-size:9px;color:#E5484D;width:44px">VERIFY</span>'
          '<span class="small" style="flex:1">Rule engine recalculates VAT and rejects unparseable output</span></div>'
          '<div style="display:flex;gap:10px"><span class="mono" style="font-size:9px;color:#E5484D;width:44px">STORE</span>'
          '<span class="small" style="flex:1">One REST write to the Supabase invoices table</span></div>'
          '<div style="display:flex;gap:10px"><span class="mono" style="font-size:9px;color:#E5484D;width:44px">REPORT</span>'
          '<span class="small" style="flex:1">Dashboard queries, plus an idempotent Sheets row sync</span></div>'
          "</div></div>"
        + '<div class="small" style="padding-left:2px">Model output is treated as a <em>draft</em>: it becomes a ledger row '
          "only after the rule node has recomputed the numbers.</div>"
        + "</div></div>"
        + '<div style="margin-top:22px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">'
        '<div><div class="tiny" style="color:#C9A878">01 &middot; INTAKE</div><div class="small" style="margin-top:5px">'
        "Upload or email; the job carries text, source, and business id.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">02 &middot; EXTRACTION</div><div class="small" style="margin-top:5px">'
        "Vendor, date, numbers, and line items in one schema.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">03 &middot; VERIFICATION</div><div class="small" style="margin-top:5px">'
        "VAT and totals recomputed before anything is written.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">04 &middot; RECORD</div><div class="small" style="margin-top:5px">'
        "One ledger row with the raw model response attached.</div></div>"
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_fin")


def fin_arch():
    layers = [
        ("INTERFACE", "Dashboard &middot; upload route &middot; document inbox", "#C9A878"),
        ("WORKFLOW A", "Invoice Processing Engine &middot; 6 nodes &middot; webhook &rarr; rules &rarr; ledger", "#E5484D"),
        ("WORKFLOW B", "Email Invoice Ingestion &middot; 4 nodes &middot; Gmail poller &rarr; upload", "#E5484D"),
        ("WORKFLOW C", "Google Sheets Idempotent Sync &middot; 5 nodes &middot; invoice &rarr; sheet row", "#E5484D"),
        ("WORKFLOW D", "Error Handling &amp; Resilient Retry &middot; 6 nodes &middot; retry or escalate", "#E5484D"),
        ("EXTERNAL", "Gemma model API &middot; Supabase REST ledger &middot; Google Sheets", "#8FA4B8"),
    ]
    rows = "".join(
        '<div style="display:flex;align-items:center;gap:16px;border:1px solid #2a2a2a;background:%s;padding:11px 16px">'
        '<span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.16em;color:%s;width:104px;flex:0 0 auto">%s</span>'
        '<span style="font-size:12.2px;color:#b9b3a9;flex:1">%s</span></div>'
        % ("rgba(229,72,77,.06)" if "WORKFLOW" in n else "#1a1a1a", c, n, d)
        for n, d, c in layers
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07.1 &middot; System architecture") +
        heading("Four workflows,<br/>one <span class='serif'>boundary.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:370px;text-align:right">Splitting the system into four small workflows keeps each '
          "one testable: processing, intake, reporting, and failure handling.</p></div>"
        + '<div style="display:grid;grid-template-columns:1.12fr .88fr;gap:30px;margin-top:26px">'
        '<div class="stack-8">%s<div class="tiny" style="margin-top:6px">Every workflow is exported as JSON and independently '
        "activatable. Names shown are the exported workflow names.</div></div>" % rows
        + '<div class="stack-12">'
        + card("WHY FOUR, NOT ONE", "A single canvas would mix a webhook, a model call, a ledger write, a sheet sync, and a "
               "retry loop. Failure handling could not be reused, and one bad branch would block the rest.", "red")
        + card("THE CONTRACT BETWEEN THEM", "Each workflow accepts a small JSON payload and returns JSON. The dashboard does "
               "not know how extraction works; it only knows the job endpoint.")
        + card("WHERE THE MODEL SITS", "Inside Workflow A, as a single HTTP Request node. Replacing the model means editing "
               "one node, not the system.")
        + '<div class="card flat" style="padding:14px 16px">'
          '<div class="num-badge">FAILURE PATH</div>'
          '<div class="small" style="margin-top:7px">Workflow D receives the failure, counts the attempt, and either waits '
          "and retries the job or marks it for human review. Three attempts is the configured budget.</div></div>"
        + "</div></div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_arch")


def fin_canvas():
    nodes = [
        {"id": "a", "name": "Webhook - Receive Document", "sub": "webhook &middot; POST", "x": 20, "y": 104, "w": 190, "tone": "red", "icon": "WH"},
        {"id": "b", "name": "Prepare Document Job", "sub": "code &middot; 1 item", "x": 262, "y": 104, "w": 190, "icon": "{ }"},
        {"id": "c", "name": "AI Extraction (Gemma Document Intelligence)", "sub": "httpRequest &middot; model", "x": 504, "y": 104, "w": 190, "tone": "ai", "icon": "AI"},
        {"id": "d", "name": "Saudi VAT &amp; ZATCA Rule Engine", "sub": "code &middot; validate", "x": 746, "y": 104, "w": 190, "icon": "IF"},
        {"id": "e", "name": "Sync to Supabase Ledger", "sub": "httpRequest &middot; POST", "x": 988, "y": 104, "w": 190, "tone": "champagne", "icon": "DB"},
        {"id": "f", "name": "Respond to Webhook", "sub": "respondToWebhook", "x": 1230, "y": 104, "w": 190, "tone": "grey", "icon": "OUT"},
    ]
    edges = [("a", "b"), ("b", "c"), ("c", "d"), ("d", "e"), ("e", "f")]
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07.1 &middot; Workflow A") +
        heading("Invoice Processing <span class='serif'>Engine.</span>", "sm")
        + "</div>"
        + '<div style="display:flex;gap:8px">' + tag("Verified export", "champagne") + tag("6 nodes") + tag("1 branch-free path") + "</div></div>"
        + '<div style="margin-top:20px">'
        + canvas(nodes, edges, height=248, title="WORKFLOW A &middot; INVOICE PROCESSING ENGINE",
                 meta="reconstructed from exported JSON")
        + "</div>"
        + '<div class="plate" style="margin-top:8px"><span class="pip"></span>TOPOLOGY FROM THE EXPORTED JSON &middot; '
          "NODE POSITIONS RE-SPACED FOR LEGIBILITY &middot; NOT A SCREENSHOT</div>"
        + '<div class="grid-3" style="margin-top:14px">'
        + card("SHAPE OF THE RUN", "Six nodes, one linear path. The webhook is the only entry point; the Respond node is the "
               "only exit. There is no branch inside this workflow.")
        + card("WHERE DATA CHANGES SHAPE", "Node 02 normalises the request; node 04 converts model text into typed invoice "
               "fields. Everything between those points is transport.", "champagne")
        + card("WHAT IS NOT HERE", "No retry logic and no validation fallback UI — deliberately, because both belong to "
               "Workflow D and the dashboard.", "red")
        + "</div>"
        + '<div style="margin-top:18px;border-top:1px solid #242424;padding-top:14px;display:flex;gap:34px;align-items:center">'
        '<span class="tiny" style="letter-spacing:.2em">LEGEND</span>'
        '<span class="legend"><span class="lg-item"><span class="sw" style="background:#E5484D"></span>Trigger</span>'
        '<span class="lg-item"><span class="sw" style="background:#C9A878"></span>Code / action</span>'
        '<span class="lg-item"><span class="sw" style="background:#7A8B9C"></span>Model call</span>'
        '<span class="lg-item"><span class="sw" style="background:#6A6A6A"></span>Response</span></span>'
        '<span class="tiny" style="margin-left:auto">6 NODES &middot; 1 PATH &middot; 0 BRANCHES</span></div>',
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_canvas")


def fin_nodes_1():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:18px">'
        "<div class='stack-12'>" + eyebrow("07.1 &middot; Node documentation 1 / 3") +
        heading("Entry and <span class='serif'>normalisation.</span>", "sm")
        + "</div>"
        + '<div style="display:flex;gap:8px">' + tag("Verified export", "champagne") + tag("Exact names &amp; types") + "</div></div>"
        + node_doc("01", "Webhook - Receive Document", WEBHOOK + " &middot; POST ledger-iq/process-invoice",
                   "The HTTP entry point of the processing engine.",
                   "Any caller can hand a document job to n8n without polling a folder or a database.",
                   "JSON POST body containing document_id, business_id, filename, and raw_text.",
                   "Accepts POST only, response mode set to <span class='mono'>responseNode</span> so the caller waits for the "
                   "Respond node. Creates the execution.",
                   "One item wrapping headers, query, params, and <span class='mono'>body</span>.",
                   "02 &mdash; Prepare Document Job",
                   "Defines the first data shape; every later expression depends on it.",
                   tag("Trigger", "red"))
        + '<div style="height:16px"></div>'
        + node_doc("02", "Prepare Document Job", CODE + " &middot; JavaScript",
                   "Normalises the request into a single job object and builds the model prompt.",
                   "Downstream nodes should not care how the caller formatted the request; this node is the contract.",
                   "The webhook item. The code falls back to the item itself when no <span class='mono'>body</span> is present.",
                   "Derives a document id (or generates one), a business id, the filename and raw text, then assembles the "
                   "prompt used by the next node.",
                   "A job object carrying job_id, document_id, business_id, raw_text, filename, and prompt.",
                   "03 &mdash; AI Extraction (Gemma Document Intelligence)",
                   "Single point of normalisation: if the intake format changes, only this node changes.",
                   tag("Code", "champagne"))
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#C9A878">READING NODE 01 IN THE CANVAS</div>'
        '<div class="small" style="margin-top:6px">The red left border and WH icon mark a trigger. It is the only node '
        "in this workflow with no incoming connection.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">WHY NODE 02 EXISTS</div>'
        '<div class="small" style="margin-top:6px">The webhook item nests the payload under <span class="mono">body</span>. '
        "The code node removes that nesting so no later expression has to know about HTTP.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">WHAT THE EXPORT DOES NOT SHOW</div>'
        '<div class="small" style="margin-top:6px">Whether the workflow is active, and which credential each node uses. '
        "Both are environment settings, not part of the JSON logic.</div></div>"
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_n1")


def fin_nodes_2():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:18px">'
        "<div class='stack-12'>" + eyebrow("07.1 &middot; Node documentation 2 / 3") +
        heading("Extraction and <span class='serif'>verification.</span>", "sm")
        + "</div>"
        + '<div style="display:flex;gap:8px">' + tag("Verified export", "champagne") + tag("Model &rarr; rules") + "</div></div>"
        + node_doc("03", "AI Extraction (Gemma Document Intelligence)", HTTP + " &middot; POST generateContent",
                   "Calls a Gemini/Gemma generative endpoint with the document prompt.",
                   "Invoices do not share a layout. A language model reads the text without a bespoke parser per vendor.",
                   "The prompt and document text assembled by node 02.",
                   "POSTs JSON to <span class='mono'>models/gemma-4-26b-a4b-it:generateContent</span> with a JSON content-type "
                   "header and the provider credential. The response is the raw model envelope.",
                   "<span class='mono'>candidates[0].content.parts[]</span> &mdash; text intended to contain the invoice JSON.",
                   "04 &mdash; Saudi VAT &amp; ZATCA Rule Engine",
                   "The only nondeterministic step in the pipeline; everything after it is deterministic.",
                   tag("AI call", "grey"))
        + '<div style="height:16px"></div>'
        + node_doc("04", "Saudi VAT &amp; ZATCA Rule Engine", CODE + " &middot; JavaScript",
                   "Parses the model output, applies a heuristic fallback, and enforces VAT and ZATCA rules.",
                   "A model can return prose, a malformed object, or a wrong total. This node decides what is storable.",
                   "The model envelope, plus the original job fields read directly from Prepare Document Job.",
                   "Tries to parse the AI text as JSON; if that fails, extracts fields heuristically from the raw document "
                   "text; recomputes VAT and totals; marks the extraction method used.",
                   "A typed invoice object &mdash; invoice number, subtotal, VAT amount, total, and check flags &mdash; ready for storage.",
                   "05 &mdash; Sync to Supabase Ledger",
                   "The deterministic gate. A document that fails here should never reach the ledger.",
                   tag("Validation", "red"))
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#C9A878">WHY THE MODEL IS NOT TRUSTED WITH TOTALS</div>'
        '<div class="small" style="margin-top:6px">A language model can produce a plausible number that does not equal '
        "subtotal plus tax. The rule node recomputes it and records which method was used.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">THE FALLBACK PATH</div>'
        '<div class="small" style="margin-top:6px">If the model returns prose, the node extracts fields heuristically '
        "from the document text. Degraded output is better than a failed run, provided it is labelled.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">THE HONEST LIMIT</div>'
        '<div class="small" style="margin-top:6px">Rules can prove arithmetic, not authenticity. A forged invoice with '
        "correct maths passes this gate.</div></div>"
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_n2")


def fin_nodes_3():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:18px">'
        "<div class='stack-12'>" + eyebrow("07.1 &middot; Node documentation 3 / 3") +
        heading("Persistence and <span class='serif'>response.</span>", "sm")
        + "</div>"
        + '<div style="display:flex;gap:8px">' + tag("Verified export", "champagne") + tag("Write &rarr; return") + "</div></div>"
        + node_doc("05", "Sync to Supabase Ledger", HTTP + " &middot; POST /rest/v1/invoices",
                   "Writes the validated invoice to the ledger table through Supabase's REST API.",
                   "The dashboard and every report read from this table; it is the system of record.",
                   "The typed invoice object from the rule engine.",
                   "Maps fields to columns and sends a JSON POST with the project's API key and authorization headers. "
                   "Returns the created record representation.",
                   "Supabase's response for the inserted row, including any generated identifiers.",
                   "06 &mdash; Respond to Webhook",
                   "The only node that changes durable business state. Everything before it is preparation.",
                   tag("Action", "champagne"))
        + '<div style="height:16px"></div>'
        + node_doc("06", "Respond to Webhook", "n8n-nodes-base.respondToWebhook",
                   "Returns a JSON result to the original caller and closes the HTTP request.",
                   "The uploading interface must know whether the document was accepted, without polling the database.",
                   "The saved record plus the rule engine output, referenced by node name.",
                   "Builds a response containing success, engine identity, execution timestamp, the invoice object, and a "
                   "human-readable message, then returns it with HTTP 200.",
                   "A JSON response body delivered to the caller; the execution is then marked complete.",
                   "End of workflow",
                   "Makes the run observable from outside n8n and gives the interface something to display.",
                   tag("Output", "grey"))
        + '<div class="card flat" style="margin-top:16px;border-left:2px solid #E5484D">'
          '<div class="small"><strong>Security note from the export:</strong> the model key appears inline in the request URL and '
          "the Supabase service key appears as a literal header value. Both should be moved into n8n credentials so they are "
          "never present in an exported workflow, a screenshot, or a shared JSON file.</div></div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_n3")


def fin_error():
    nodes = [
        {"id": "a", "name": "Error Trigger", "sub": "webhook &middot; handle-error", "x": 22, "y": 120, "w": 172, "tone": "red", "icon": "!"},
        {"id": "b", "name": "Assess Retry Budget", "sub": "code &middot; count + 1", "x": 246, "y": 120, "w": 172, "icon": "{ }"},
        {"id": "c", "name": "Can Retry?", "sub": "if &middot; action = retry", "x": 470, "y": 120, "w": 172, "tone": "ai", "icon": "IF"},
        {"id": "d", "name": "Exponential Backoff Wait", "sub": "wait &middot; 5 seconds", "x": 694, "y": 58, "w": 172, "icon": "W"},
        {"id": "e", "name": "Trigger Job Retry", "sub": "httpRequest &middot; POST retry", "x": 918, "y": 58, "w": 172, "tone": "champagne", "icon": "API"},
        {"id": "f", "name": "Escalate to Human Review", "sub": "httpRequest &middot; POST fail", "x": 694, "y": 192, "w": 172, "tone": "grey", "icon": "H"},
    ]
    edges = [("a", "b"), ("b", "c"), ("c", "d", "TRUE &middot; output 0"), ("d", "e"), ("c", "f", "FALSE &middot; output 1")]
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07.1 &middot; Workflow D") +
        heading("Failure has a <span class='serif'>route.</span>", "sm")
        + "</div>"
        + '<div style="display:flex;gap:8px">' + tag("Verified export", "champagne") + tag("Real IF branch") + "</div></div>"
        + '<div style="margin-top:20px">'
        + canvas(nodes, edges, height=286, title="WORKFLOW D &middot; AUTOMATION ERROR HANDLING &amp; RESILIENT RETRY",
                 meta="both branch outputs shown")
        + "</div>"
        + '<div class="grid-2" style="margin-top:18px">'
        + '<div class="card flat"><div class="num-badge">BRANCH MAPPING &middot; FROM THE EXPORT</div>'
          '<div style="margin-top:12px" class="stack-8">'
          '<div style="display:flex;gap:10px"><span class="tag champagne">OUTPUT 0 &middot; TRUE</span>'
          '<span class="small" style="flex:1">Can Retry? &rarr; Exponential Backoff Wait &rarr; Trigger Job Retry. The job is '
          "re-submitted after a fixed wait.</span></div>"
          '<div style="display:flex;gap:10px"><span class="tag red">OUTPUT 1 &middot; FALSE</span>'
          '<span class="small" style="flex:1">Can Retry? &rarr; Escalate to Human Review. The job is marked failed instead of '
          "retried.</span></div></div></div>"
        + '<div class="card"><div class="num-badge">WHAT EACH NODE DOES</div>'
          '<div class="small" style="margin-top:9px"><strong>Assess Retry Budget</strong> increments <span class="mono">retry_count</span> '
          "and returns an <span class='mono'>action</span> of retry or escalate (budget: three attempts). "
          "<strong>Can Retry?</strong> is an IF node comparing that action to <span class='mono'>retry</span>. "
          "<strong>Wait</strong> pauses five seconds, then the two HTTP nodes call the job endpoints.</div></div>"
        + "</div>"
        + '<div class="grid-3" style="margin-top:10px">'
        + card("THE RETRY CONTRACT", "Three attempts, five seconds apart, then escalation. The budget is incremented in "
               "code before the IF node evaluates it — so the fourth failure cannot loop.")
        + card("WHY A WAIT NODE", "Backoff gives a rate-limited or restarting service time to recover. It is not a fix; "
               "it is a courtesy that prevents a retry storm.")
        + card("WHAT ESCALATION MEANS", "The job is marked failed through an API call, which is what puts it in front of "
               "a person. Silence is not escalation.")
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_error")


def fin_intake():
    rows = [
        ("Gmail - Poll Invoice Attachments", "gmailTrigger", "Polls every minute for messages with an attachment whose name "
         "contains invoice, bill, or receipt; downloads attachments.", "Message + binary"),
        ("Filter &amp; Prepare Attachments", "code", "Keeps PDF/image attachments, drops everything else, and builds the upload "
         "payload for the app.", "Filtered attachment items"),
        ("Ingest Document to LedgerIQ", "httpRequest", "Uploads the binary document to the application's email-upload route "
         "with the internal secret header.", "Stored document record"),
        ("Dispatch to Invoice Processing Engine", "httpRequest", "Triggers processing for the uploaded document, connecting "
         "intake to Workflow A.", "Processing job"),
    ]
    rows_c = [
        ("Webhook - Sync Request", "webhook", "Accepts a sync request for one invoice or a whole business.", "Sync request"),
        ("Fetch Latest Invoice Data", "httpRequest", "Reads the invoice from the application by id using an internal secret.", "Invoice JSON"),
        ("Format Sheet Row", "code", "Chooses the Sales or Purchases tab from the invoice type and shapes one sheet row.", "Row object"),
        ("Execute Idempotent Sync", "httpRequest", "Posts the row to the idempotent sync endpoint so a repeat run updates "
         "instead of duplicating.", "Sync receipt"),
        ("Respond Sync Status", "respondToWebhook", "Returns the target sheet and sync status to the caller.", "JSON status"),
    ]
    def table(rows, name):
        trs = "".join(
            '<div style="display:grid;grid-template-columns:1.1fr .85fr 2fr .75fr;gap:12px;padding:8px 0;border-bottom:1px solid #1f1f1f">'
            '<div style="font-size:11px;color:#e2ddd4">%s</div><div class="mono" style="font-size:9px;color:#8f8f8f">%s</div>'
            '<div style="font-size:10.6px;line-height:1.45;color:#8f8f8f">%s</div>'
            '<div style="font-size:10.2px;color:#a9a29a">%s</div></div>' % r
            for r in rows
        )
        return (
            '<div class="card flat" style="padding:0"><div style="padding:10px 16px;border-bottom:1px solid #262626;display:flex;justify-content:space-between">'
            '<span class="num-badge">%s</span><span class="tiny">4 workflows &middot; verified</span></div>'
            '<div style="padding:4px 16px 10px">%s</div></div>' % (name, trs)
        )

    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:18px">'
        "<div class='stack-12'>" + eyebrow("07.1 &middot; Workflows B &amp; C") +
        heading("Intake and <span class='serif'>reporting paths.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:330px;text-align:right">Two supporting workflows: how documents arrive by email, '
          "and how a ledger record reaches a spreadsheet without duplicating rows.</p></div>"
        + '<div class="stack-12">' + table(rows, "WORKFLOW B &middot; EMAIL INVOICE INGESTION PIPELINE")
        + table(rows_c, "WORKFLOW C &middot; GOOGLE SHEETS IDEMPOTENT SYNC") + "</div>"
        + '<div class="grid-2" style="margin-top:16px">'
        + card("DUPLICATE CONTROL", "The schema indexes a document file hash, and the sheet sync endpoint is explicitly "
               "idempotent, so re-running a job updates its row rather than appending a copy.", "champagne")
        + card("WHY THE FILTER MATTERS", "The Gmail query restricts intake to attachment-bearing messages whose names mention "
               "invoice, bill, or receipt. Broad queries are how inbox automations drown in PDFs that are not invoices.")
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_intake")


def fin_output():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07.1 &middot; Outputs") +
        heading("What the ledger <span class='serif'>enables.</span>", "sm")
        + "</div>"
        + '<div style="display:flex;gap:8px">' + tag("Asset pending", "grey") + tag("No metrics claimed") + "</div></div>"
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:24px">'
        + '<div class="stack-12">'
        + card("RECORDS", "One row per document: invoice number, date, vendor or customer, currency, subtotal, VAT, total, "
               "invoice type, and processing status. The extraction method stays on the record for audit.")
        + card("REPORTS", "Revenue, expenses, and net totals over a chosen period, derived from the same rows the engine "
               "writes — not from a parallel spreadsheet.")
        + card("ANALYTICS", "Category distribution and monthly trend views. Any chart in the dashboard is a query over the "
               "ledger, so correcting a row corrects the chart.")
        + card("REVIEW QUEUE", "Documents that fail parsing or arithmetic are surfaced with the raw text still attached, so a "
               "person can fix the field instead of retyping the invoice.", "red")
        + "</div>"
        + '<div class="stack-12">'
        + slot("DASHBOARD SCREENSHOT &middot; NOT SUPPLIED",
               "The FinFlow dashboard, reports, analytics, and transaction views were not supplied as images. Nothing has been "
               "fabricated in their place. Provide finflow-dashboard.png, finflow-reports.png, finflow-analytics.png, and "
               "finflow-transactions.png to complete this page.", 236)
        + slot("DEMONSTRATION RECORDING &middot; NOT SUPPLIED",
               "No video file or URL was provided, so no QR code is printed. A QR code will be added only when a valid, "
               "public demo URL exists.", 132)
        + "</div></div>",
    )
    return pg("07 &middot; Practical demonstration &middot; FinFlow", body, pid="f7_output")
