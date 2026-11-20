"""Sections 03–06: how n8n works, components, AI, advantages."""

from deck_kit import (
    card, cmp_table, content, divider, eyebrow, heading, lead, pg, pipeline, tag,
)


# ----------------------------------------------------------------------------
# SECTION 03 — HOW DOES N8N WORK?
# ----------------------------------------------------------------------------

def s3_divider():
    return divider(
        "03",
        "How does<br/>n8n work?",
        "From an incoming event to a stored execution: what actually happens inside a workflow run.",
        [("01", "Execution lifecycle", "Six steps from trigger to a stored, inspectable run"),
         ("02", "A request through six nodes", "The real payload at each hop of an invoice pipeline"),
         ("03", "Branches &amp; failures", "How outputs, retries, and error workflows behave")],
        pid="s3",
    )


def s3_lifecycle():
    steps = [
        ("01", "The event fires", "A webhook receives an HTTP request, a polling trigger finds a new email, or a schedule reaches its time. The trigger node emits the first items."),
        ("02", "An execution begins", "n8n creates an execution record with an ID, a mode (manual or production), and a start time. From here every step is logged."),
        ("03", "Nodes run in order", "n8n walks the graph. Each node receives the items from its upstream node, runs once for the batch, and returns new items."),
        ("04", "Data is transformed", "Expressions read fields, Code nodes reshape objects, Set nodes rename, and Merge or Split nodes change how many items flow on."),
        ("05", "Logic chooses a path", "IF and Switch nodes evaluate the data and send each item to exactly one output. Untaken branches do not execute."),
        ("06", "The run finishes", "A final action writes, sends, or responds. The execution is saved with the input and output of every node, so it can be inspected later."),
    ]
    rows = "".join(
        '<div style="display:flex;gap:18px;padding:13px 0;border-bottom:1px solid #1f1f1f">'
        '<div style="font-family:var(--font-mono);font-size:10px;color:#E5484D;width:26px;flex:0 0 auto;padding-top:2px">%s</div>'
        '<div style="flex:1"><div style="font-family:var(--font-display);font-size:15px;font-weight:600;color:#f0ece4">%s</div>'
        '<div class="small" style="margin-top:4px;max-width:760px">%s</div></div></div>' % s
        for s in steps
    )
    body = content(
        '<div style="display:grid;grid-template-columns:1.1fr .9fr;gap:52px">'
        "<div>" + eyebrow("03 &middot; Execution lifecycle")
        + heading("What happens when<br/>a workflow <span class='serif'>runs.</span>", "sm")
        + '<div style="margin-top:22px">%s</div></div>' % rows
        + '<div class="stack-16" style="padding-top:48px">'
        + '<div class="card flat" style="padding:0">'
          '<div style="padding:13px 18px;border-bottom:1px solid #262626;display:flex;justify-content:space-between">'
          '<span class="num-badge">EXECUTION RECORD</span><span class="tag champagne">Observable</span></div>'
          '<div style="padding:16px 18px" class="stack-8">'
          '<div style="display:flex;justify-content:space-between"><span class="tiny">EXECUTION</span><span class="mono" style="font-size:10.5px;color:#c9c4bb">#4128 &middot; production</span></div>'
          '<div style="display:flex;justify-content:space-between"><span class="tiny">STARTED</span><span class="mono" style="font-size:10.5px;color:#c9c4bb">14:02:11</span></div>'
          '<div style="display:flex;justify-content:space-between"><span class="tiny">DURATION</span><span class="mono" style="font-size:10.5px;color:#c9c4bb">2.84 s</span></div>'
          '<div style="display:flex;justify-content:space-between"><span class="tiny">NODES EXECUTED</span><span class="mono" style="font-size:10.5px;color:#c9c4bb">6 / 6</span></div>'
          '<div style="display:flex;justify-content:space-between"><span class="tiny">STATUS</span><span class="mono" style="font-size:10.5px;color:#8fbf8f">success</span></div>'
          "</div>"
          '<div style="padding:12px 18px;border-top:1px solid #262626" class="tiny">Every node keeps its INPUT and OUTPUT items. '
          "Clicking a node in the execution view shows both.</div></div>"
        + card("MANUAL VS PRODUCTION", "A manual test runs the canvas immediately. A production execution runs because the "
               "workflow is <strong>active</strong> and its trigger fired. Both produce the same execution record.", "champagne")
        + '<div class="card"><div class="num-badge">WHY THIS MATTERS</div>'
          '<p style="margin-top:8px">When a number looks wrong in a report, you can open the run that wrote it and see the '
          "exact payload the AI returned, the exact condition that passed, and the exact row that was written. That is the "
          "difference between automation you can defend and a black box.</p></div>"
        + "</div></div>",
    )
    return pg("03 &middot; How does n8n work?", body, pid="s3-lifecycle")


def s3_worked():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("03 &middot; Worked example") +
        heading("One request, six nodes,<br/>four visible <span class='serif'>payloads.</span>", "sm", 'style="max-width:780px"')
        + "</div>"
        + '<div style="max-width:330px;text-align:right" class="small">The chain below is the real invoice-processing '
          "workflow documented in Section 07 — used here to make the mechanics concrete.</div></div>"
        + '<div style="margin-top:26px;display:flex;align-items:center;gap:0">'
        + "".join(
            ('<div style="flex:1;border:1px solid #2c2c2c;background:#191919;padding:12px 12px;border-radius:2px;text-align:center">'
             '<div style="font-family:var(--font-mono);font-size:8.4px;letter-spacing:.14em;color:#E5484D">%s</div>'
             '<div style="margin-top:6px;font-size:11.6px;color:#e8e4dc;line-height:1.3">%s</div></div>' % (n, t))
            + ('<div style="width:26px;height:1px;background:#3d3d3d;flex:0 0 auto;position:relative"><span style="position:absolute;right:-1px;top:-2.5px;width:5px;height:5px;border-top:1px solid #6a6a6a;border-right:1px solid #6a6a6a;transform:rotate(45deg)"></span></div>' if i < 5 else "")
            for i, (n, t) in enumerate([
                ("TRIGGER", "Webhook<br/>receives document"),
                ("CODE", "Prepare<br/>document job"),
                ("HTTP", "AI extraction<br/>(Gemma)"),
                ("CODE", "VAT &amp; ZATCA<br/>rule engine"),
                ("HTTP", "Sync to<br/>Supabase ledger"),
                ("RESPOND", "Return JSON<br/>to caller"),
            ])
        )
        + "</div>"
        + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px">'
        + '<div><div class="tiny" style="margin-bottom:7px">01 &middot; AFTER THE WEBHOOK</div><div class="code" style="font-size:9.4px;padding:11px 12px">'
          '{\n  <span class="k">"body"</span>: {\n    <span class="k">"document_id"</span>: <span class="s">"doc_104"</span>,\n'
          '    <span class="k">"filename"</span>: <span class="s">"invoice.pdf"</span>,\n'
          '    <span class="k">"raw_text"</span>: <span class="s">"..."</span>\n  }\n}</div></div>'
        + '<div><div class="tiny" style="margin-bottom:7px">02 &middot; AFTER PREPARE JOB</div><div class="code" style="font-size:9.4px;padding:11px 12px">'
          '{\n  <span class="k">"job_id"</span>: <span class="s">"job_104"</span>,\n  <span class="k">"business_id"</span>: <span class="s">"biz_001"</span>,\n'
          '  <span class="k">"raw_text"</span>: <span class="s">"..."</span>,\n  <span class="k">"prompt"</span>: <span class="s">"extract JSON"</span>\n}</div></div>'
        + '<div><div class="tiny" style="margin-bottom:7px">03 &middot; AFTER AI EXTRACTION</div><div class="code" style="font-size:9.4px;padding:11px 12px">'
          '{\n  <span class="k">"candidates"</span>: [{\n    <span class="k">"content"</span>: {\n      <span class="k">"parts"</span>: [{ <span class="k">"text"</span>: <span class="s">"{...}"</span> }]\n    }\n  }]\n}</div></div>'
        + '<div><div class="tiny" style="margin-bottom:7px">04 &middot; AFTER RULE ENGINE</div><div class="code" style="font-size:9.4px;padding:11px 12px">'
          '{\n  <span class="k">"invoice_number"</span>: <span class="s">"INV-2031"</span>,\n  <span class="k">"vat_amount"</span>: <span class="n">150.00</span>,\n'
          '  <span class="k">"total"</span>: <span class="n">1150.00</span>,\n  <span class="k">"checks"</span>: <span class="b">"passed"</span>\n}</div></div>'
        + "</div>"
        + '<div class="grid-2" style="margin-top:22px">'
        + card("WHAT THE MODEL RECEIVES", "The request body carries the extracted document text and an instruction. In this "
               "workflow the Code node builds the prompt, and the HTTP Request node posts it to the model endpoint.")
        + card("WHY A RULE NODE FOLLOWS THE MODEL", "A model returns language. A Code node turns that language into typed "
               "fields, recomputes tax, and decides whether the document is safe to store. The model proposes; the rules dispose.")
        + "</div>"
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#C9A878">WHAT THE EXECUTION VIEW SHOWS</div>'
        '<div class="small" style="margin-top:6px">Each node keeps the items it received and the items it returned. '
        "Opening node 03 shows the exact model response, not a summary of it.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">WHAT IT DOES NOT SHOW</div>'
        '<div class="small" style="margin-top:6px">Why the model chose a field, or whether the business rule is correct. '
        "Those are review questions, not log questions.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">WHY THE PAYLOAD SHAPE MATTERS</div>'
        '<div class="small" style="margin-top:6px">Every downstream expression assumes a field name. A renamed field is '
        "a silent null, not an error.</div></div>"
        + "</div>",
    )
    return pg("03 &middot; How does n8n work?", body, pid="s3-worked")


def s3_branching():
    body = content(
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:46px">'
        "<div class='stack-16'>" + eyebrow("03 &middot; Decisions &amp; failure")
        + heading("Branches are outputs.<br/>Errors are <span class='serif'>outputs too.</span>", "sm")
        + '<p class="lead">An IF node has two outputs: <strong>true</strong> (index 0) and <strong>false</strong> (index 1). '
          "Whatever you connect to each becomes the path that item takes. Nothing else runs.</p>"
        + '<div style="margin-top:8px">'
        + '<div class="flow-node red" style="max-width:420px"><div class="fn-icon">IF</div><div class="fn-body">'
          '<div class="fn-name">Can Retry?</div><div class="fn-type">n8n-nodes-base.if &middot; real node from this project</div></div></div>'
        + '<div style="display:flex;gap:18px;margin-top:10px">'
        + '<div style="flex:1;border-left:1px solid #3a3a3a;padding-left:14px">'
          '<div class="tiny" style="color:#8fbf8f">OUTPUT 0 &middot; TRUE &middot; action = retry</div>'
          '<div class="flow-node" style="margin-top:8px"><div class="fn-icon">W</div><div class="fn-body">'
          '<div class="fn-name">Exponential Backoff Wait</div><div class="fn-type">wait &middot; 5 seconds</div></div></div>'
          '<div class="flow-node" style="margin-top:8px"><div class="fn-icon">API</div><div class="fn-body">'
          '<div class="fn-name">Trigger Job Retry</div><div class="fn-type">httpRequest &middot; POST /retry</div></div></div></div>'
        + '<div style="flex:1;border-left:1px solid #3a3a3a;padding-left:14px">'
          '<div class="tiny" style="color:#f08b8f">OUTPUT 1 &middot; FALSE &middot; budget exhausted</div>'
          '<div class="flow-node" style="margin-top:8px"><div class="fn-icon">API</div><div class="fn-body">'
          '<div class="fn-name">Escalate to Human Review</div><div class="fn-type">httpRequest &middot; POST /fail</div></div></div>'
          '<div class="small" style="margin-top:10px">The run stops here and a person owns the document.</div></div>'
        + "</div></div></div>"
        '<div class="stack-14" style="padding-top:48px">'
        + card("RETRY AT NODE LEVEL", "A node can be set to retry on failure with a wait between attempts. Good for a flaky "
               "API; useless for a malformed document that will always fail.", "champagne")
        + card("ERROR WORKFLOW", "An Error Trigger starts a separate workflow when another workflow fails, receiving the "
               "error, the workflow name, and the execution URL. This is how failures reach a human.")
        + card("CONTINUE ON FAIL", "A node can pass its error forward as an item instead of stopping the run — useful when "
               "one bad row in a batch should not block the other ninety-nine.")
        + card("RETURNING ERRORS", "With Respond to Webhook, the caller gets a JSON error and an HTTP status instead of a "
               "silent failure. Bad input should fail loudly.", "red")
        + "</div></div>"
        + '<div style="margin-top:22px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">'
        + card("RETRY WHAT CAN RECOVER", "A timeout or a 429 may succeed on the next attempt. A malformed invoice will "
               "fail identically every time; retrying it only delays the human.")
        + card("CAP THE ATTEMPTS", "Three attempts with a wait is a policy, not a guess. Beyond it, escalation is cheaper "
               "than another call.")
        + card("KEEP THE FAILURE", "Route the failed payload to review with its error message attached. A failure that "
               "vanishes is a data loss event.")
        + "</div>",
    )
    return pg("03 &middot; How does n8n work?", body, pid="s3-branching")


# ----------------------------------------------------------------------------
# SECTION 04 — IMPORTANT COMPONENTS
# ----------------------------------------------------------------------------

def s4_divider():
    return divider(
        "04",
        "Important<br/>components",
        "Twelve building blocks, each defined, justified, and shown in use — then assembled into one working pipeline.",
        [("01", "Workflows, nodes, triggers, actions", "The four concepts that define the automation"),
         ("02", "Connections, credentials, expressions, conditions", "The four that make it work safely and dynamically"),
         ("03", "Data, executions, errors, APIs", "The four that make it reliable and observable")],
        pid="s4",
    )


def _comp(num, name, definition, why, example):
    return (
        '<div class="card" style="padding:17px 18px">'
        '<div style="display:flex;align-items:baseline;gap:10px">'
        '<span style="font-family:var(--font-mono);font-size:9.5px;color:#C9A878">%s</span>'
        '<span style="font-family:var(--font-display);font-size:15px;font-weight:600;color:#f2efe8">%s</span></div>'
        '<div class="small" style="margin-top:7px;color:#a6a6a6">%s</div>'
        '<div style="margin-top:9px;border-top:1px solid #242424;padding-top:8px" class="tiny">WHY &middot; %s</div>'
        '<div style="margin-top:5px;font-size:10.8px;line-height:1.5;color:#8d8d8d"><span style="color:#C9A878">Example</span> '
        "&middot; %s</div></div>" % (num, name, definition, why, example)
    )


def s4_components_one():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("04 &middot; Building blocks 01–04") +
        heading("Workflows, nodes,<br/>triggers, <span class='serif'>actions.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:330px;text-align:right">Four concepts that answer: what is the automation, '
          "what are its steps, what starts it, and what does it do?</p></div>"
        + '<div class="grid-2" style="margin-top:26px;gap:16px">'
        + _comp("01", "Workflows",
                "A saved graph of nodes and connections, with settings, a name, and an active/inactive state. Exported as JSON.",
                "It is the unit of automation: versionable, duplicable, and independently testable.",
                "An invoice pipeline, a nightly report, a lead router.")
        + _comp("02", "Nodes",
                "The individual steps. Each has a type, parameters, and a position on the canvas. Core nodes (Code, IF, Set, "
                "Merge) and app nodes (Gmail, Sheets, Supabase) share the same execution model.",
                "Small, single-purpose steps are what make a workflow readable and debuggable.",
                "A Code node formats a job; an IF node tests a condition.")
        + _comp("03", "Triggers",
                "The node that starts a run: Webhook (instant HTTP), Schedule (cron), app triggers such as a Gmail poller, "
                "Form, or Manual.",
                "The trigger decides the latency and the shape of the first payload.",
                "Gmail trigger polling each minute for invoice attachments.")
        + _comp("04", "Actions",
                "Nodes that change something outside n8n: create a row, send a message, generate a file, call an API.",
                "Actions are where automation becomes business state — and where mistakes become real.",
                "HTTP POST that writes the validated invoice to the ledger.")
        + "</div>"
        + '<div class="card flat" style="margin-top:18px;display:flex;gap:26px;align-items:center">'
          '<div class="num-badge" style="width:120px">THE RULE OF ONE JOB</div>'
          '<div class="small" style="flex:1">If a node needs the word &ldquo;and&rdquo; to describe it, split it. One node that '
          "extracts, validates, and saves is a node you cannot test in isolation.</div></div>"
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#C9A878">THE MOST COMMON BEGINNER MISTAKE</div>'
        '<div class="small" style="margin-top:6px">One enormous Code node that does everything. It works once, and then '
        "nobody — including its author — can debug it.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">THE SECOND MISTAKE</div>'
        '<div class="small" style="margin-top:6px">Hard-coding a credential or an ID inside node parameters. It breaks '
        "silently when the environment changes.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">THE HABIT THAT SCALES</div>'
        '<div class="small" style="margin-top:6px">Name nodes by what they do to the data, not by which app they call. '
        "The canvas then reads like a sentence.</div></div>"
        + "</div>",
    )
    return pg("04 &middot; Important components", body, pid="s4-one")


def s4_components_two():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("04 &middot; Building blocks 05–08") +
        heading("Connections, credentials,<br/>expressions, <span class='serif'>conditions.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:330px;text-align:right">How the steps are wired, authenticated, fed dynamic '
          "values, and made to decide.</p></div>"
        + '<div class="grid-2" style="margin-top:26px;gap:16px">'
        + _comp("05", "Connections",
                "Directed edges between node outputs and inputs. Carrying arrays of items, they define execution order and branches.",
                "The topology is the logic. A misplaced connection silently changes what the automation does.",
                "IF output 0 &rarr; retry path; output 1 &rarr; escalate path.")
        + _comp("06", "Credentials",
                "Encrypted records holding API keys, OAuth2 tokens, or database logins, referenced by nodes — not pasted into workflow JSON.",
                "Secrets stay out of exports, screenshots, and version control, and can be rotated once for every node.",
                "A Gmail OAuth2 credential shared by three mail nodes.")
        + _comp("07", "Expressions",
                "Inline formulas in <span class='mono' style='font-size:10px'>{{ }}</span> that read data from the current item or "
                "another node: <span class='mono' style='font-size:10px'>{{ $json.total }}</span>, "
                "<span class='mono' style='font-size:10px'>{{ $('Node').item.json.id }}</span>.",
                "The same workflow works for every record instead of one hard-coded example.",
                "Building a request body from the previous node's invoice fields.")
        + _comp("08", "Conditions",
                "IF and Switch nodes that evaluate typed comparisons and route each item to one output.",
                "They encode the business rule: what is valid, what is urgent, what needs a person.",
                "VAT total equals subtotal plus tax, otherwise flag the document.")
        + "</div>"
        + '<div class="code" style="margin-top:18px;font-size:11px">'
          '<span class="c">// an expression body built from two upstream nodes</span>\n'
          '{{ { invoice_id: $json.invoice_id, total: $(\'AI Extraction\').item.json.total, checked: true } }}'
          "</div>",
    )
    return pg("04 &middot; Important components", body, pid="s4-two")


def s4_components_three():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("04 &middot; Building blocks 09–12") +
        heading("Data, executions,<br/>errors, <span class='serif'>APIs.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:330px;text-align:right">What the workflow actually moves, how you see it move, '
          "and how it talks to everything else.</p></div>"
        + '<div class="grid-2" style="margin-top:26px;gap:16px">'
        + _comp("09", "Data handling",
                "Items are JSON objects (plus optional binary files). Nodes like Set, Code, Merge, Aggregate, and Split Out "
                "rename, reshape, combine, or fan out those items.",
                "Nine out of ten workflow bugs are a field that is one level deeper than the expression expects.",
                "Flattening <span class='mono' style='font-size:10px'>body.invoice.lines[]</span> into one item per line.")
        + _comp("10", "Executions",
                "A record of one run: status, duration, mode, and per-node input/output. Successes and failures are kept "
                "according to the workflow's save settings.",
                "It is the audit trail. Without it, a wrong number has no traceable origin.",
                "Opening execution #4128 to see the exact model response.")
        + _comp("11", "Error handling",
                "Per-node retry and error-output settings, plus a dedicated Error Trigger workflow that another workflow can "
                "call when it fails.",
                "External APIs fail, documents are corrupt, quotas expire. The workflow must fail in a way someone notices.",
                "Three retries, then a human-review ticket with the job ID.")
        + _comp("12", "Integrations &amp; APIs",
                "Prebuilt app nodes, plus a generic HTTP Request node for any REST endpoint, with auth, headers, query "
                "parameters, pagination, and binary bodies.",
                "It is the escape hatch that means no system is out of reach — and the reason credentials matter.",
                "Posting to a model endpoint and a Supabase REST table from the same workflow.")
        + "</div>"
        + '<div class="grid-3" style="margin-top:18px">'
        + card("POLLING", "The trigger asks on an interval. Simple, but adds latency and can hit rate limits.")
        + card("WEBHOOKS", "The other system calls n8n the moment something happens. Instant, but needs a reachable URL.")
        + card("AUTH PATTERNS", "API key in a header, bearer token, OAuth2 refresh flow, or a signed internal secret.")
        + "</div>",
    )
    return pg("04 &middot; Important components", body, pid="s4-three")


def s4_compose():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("04 &middot; Composition") +
        heading("Twelve parts,<br/>one <span class='serif'>pipeline.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:340px;text-align:right">The components are not a checklist. They only mean '
          "something when wired together into a single run.</p></div>"
        + '<div class="grid-2" style="margin-top:26px;gap:28px">'
        + '<div class="canvas" style="height:330px">'
          '<div class="canvas-bar"><i></i><i></i><i></i><span class="canvas-title">ANNOTATED WORKFLOW</span>'
          '<span class="canvas-meta">04 / COMPOSITION</span></div>'
          '<svg class="canvas-svg" viewBox="0 0 700 330">'
          '<path d="M 152 120 C 180 120, 180 120, 205 120" stroke="#4a4a4a" stroke-width="1.4" fill="none"/>'
          '<path d="M 357 120 C 385 120, 385 120, 410 120" stroke="#4a4a4a" stroke-width="1.4" fill="none"/>'
          '<path d="M 562 120 C 590 120, 590 78, 610 78" stroke="#4a4a4a" stroke-width="1.4" fill="none"/>'
          '<path d="M 562 120 C 590 120, 590 176, 610 176" stroke="#4a4a4a" stroke-width="1.4" fill="none"/>'
          '<text x="470" y="58" fill="#8a8a8a" font-family="JetBrains Mono, monospace" font-size="8">TRUE</text>'
          '<text x="470" y="196" fill="#8a8a8a" font-family="JetBrains Mono, monospace" font-size="8">FALSE</text>'
          "</svg>"
          '<div class="nnode red" style="left:20px;top:96px;width:132px"><div class="nn-icon">WH</div><div>'
          '<div class="nn-name">Webhook</div><div class="nn-sub">trigger</div></div></div>'
          '<div class="nnode" style="left:225px;top:96px;width:132px"><div class="nn-icon">{ }</div><div>'
          '<div class="nn-name">Code</div><div class="nn-sub">data handling</div></div></div>'
          '<div class="nnode ai" style="left:430px;top:96px;width:132px"><div class="nn-icon">IF</div><div>'
          '<div class="nn-name">Validate</div><div class="nn-sub">condition</div></div></div>'
          '<div class="nnode" style="left:548px;top:54px;width:132px"><div class="nn-icon">API</div><div>'
          '<div class="nn-name">Store record</div><div class="nn-sub">action</div></div></div>'
          '<div class="nnode grey" style="left:548px;top:152px;width:132px"><div class="nn-icon">!</div><div>'
          '<div class="nn-name">Flag review</div><div class="nn-sub">error path</div></div></div>'
          '<div style="position:absolute;left:20px;bottom:16px;font-family:var(--font-mono);font-size:8.6px;color:#6a6a6a;letter-spacing:.12em">'
          "WORKFLOW &middot; CONNECTIONS &middot; EXPRESSIONS &middot; CREDENTIAL &middot; EXECUTION</div>"
          "</div>"
        '<div class="stack-14">'
        + card("THE WORKFLOW IS THE CONTAINER", "It holds the canvas, the settings, and the active state that decides whether "
               "triggers are listening at all.", "champagne")
        + card("THE TRIGGER DECIDES THE PACE", "Webhook for instant, schedule for periodic, app poller when the source has no "
               "webhooks. The first item's shape is set here.")
        + card("THE CONNECTION IS THE LOGIC", "Change a wire and you change the business rule. That is why connections are "
               "reviewed, not just nodes.")
        + card("THE EXECUTION IS THE PROOF", "It records which node ran, with which items, in which order — including the "
               "branch that was not taken.", "red")
        + "</div></div>"
        + '<div class="card flat" style="margin-top:22px;border-left:2px solid #E5484D">'
          '<div class="small"><strong>Reading an unfamiliar workflow:</strong> start at the trigger, follow every wire, and name '
          "the item shape at each hop. If you cannot say what a node receives and what it emits, you do not yet understand "
          "the automation.</div></div>",
    )
    return pg("04 &middot; Important components", body, pid="s4-compose")


# ----------------------------------------------------------------------------
# SECTION 05 — N8N AND AI
# ----------------------------------------------------------------------------

def s5_divider():
    return divider(
        "05",
        "n8n and AI:<br/>real-life applications",
        "Where deterministic automation ends, language models take over — and where a human must still sign off.",
        [("01", "What AI adds", "One node that reads meaning before the rules run"),
         ("02", "Rules vs models", "Where each belongs, and the approval ladder between them"),
         ("03", "Eight real applications", "Support, documents, reporting, routing, extraction")],
        pid="s5",
    )


def s5_what():
    body = content(
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:50px">'
        "<div class='stack-20'>" + eyebrow("05 &middot; Intelligence layer")
        + heading("Same pipeline.<br/>A more capable <span class='serif'>middle.</span>", "sm")
        + '<p class="lead">Classic automation works when the input is predictable. AI-powered automation keeps the same '
          "trigger–action skeleton but adds a node that can <strong>read meaning</strong> from messy input before the rules run.</p>"
        + '<div class="stack-12">'
        + card("HOW A MODEL CONNECTS", "An AI node (or a plain HTTP Request node) posts a prompt and the input text to a model "
               "API with a credential, and receives text or structured JSON back. n8n orchestrates; the provider infers.")
        + card("WHAT THE MODEL IS GOOD AT", "Reading unstructured text, classifying intent, pulling fields into a schema, "
               "summarising, and drafting a reply in a given tone.")
        + card("WHAT THE MODEL IS BAD AT", "Guaranteed arithmetic, authoritative business rules, and knowing when it is wrong. "
               "Those stay in nodes you control.", "red")
        + "</div></div>"
        '<div class="stack-16" style="padding-top:44px">'
        '<div class="card flat" style="padding:0">'
        '<div style="padding:13px 18px;border-bottom:1px solid #262626" class="num-badge">THE INTELLIGENT SEGMENT</div>'
        '<div style="padding:18px">'
        '<div class="flow-node"><div class="fn-icon">IN</div><div class="fn-body"><div class="fn-name">Unstructured input</div>'
        '<div class="fn-type">email body &middot; scanned invoice &middot; free-text order</div></div></div>'
        '<div class="connector-v"></div>'
        '<div class="flow-node red"><div class="fn-icon">AI</div><div class="fn-body"><div class="fn-name">Understand &amp; structure</div>'
        '<div class="fn-type">classify &middot; extract &middot; summarise &middot; draft</div></div></div>'
        '<div class="connector-v"></div>'
        '<div class="flow-node"><div class="fn-icon">IF</div><div class="fn-body"><div class="fn-name">Deterministic checks</div>'
        '<div class="fn-type">schema &middot; totals &middot; confidence &middot; policy</div></div></div>'
        '<div class="connector-v"></div>'
        '<div class="flow-node grey"><div class="fn-icon">H</div><div class="fn-body"><div class="fn-name">Human approval</div>'
        '<div class="fn-type">only where the consequence is irreversible</div></div></div>'
        "</div></div>"
        + '<div class="small" style="padding-left:2px">The model is one node in a governed chain — not the system itself. '
          "That framing is what makes AI automation defensible in a business process.</div>"
        + "</div></div>",
    )
    return pg("05 &middot; n8n and AI", body, pid="s5-what")


def s5_compare():
    rows = [
        ("Input must match an expected format.", "Handles varied phrasing, layouts, and languages."),
        ("Logic is written as explicit conditions.", "Intent is inferred from the content itself."),
        ("Same input always produces the same output.", "Output can vary between runs; it must be validated."),
        ("Cannot summarise or draft language.", "Can summarise, translate, and draft a reply."),
        ("Cheap, instant, fully predictable.", "Adds latency and per-call cost; needs monitoring."),
        ("Failure is a broken rule you can fix.", "Failure can be a confident wrong answer — the harder case."),
    ]
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("05 &middot; Comparison") +
        heading("Rules are reliable.<br/>Models are <span class='serif'>flexible.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:330px;text-align:right">Mature automations use both: a model to interpret, '
          "deterministic nodes to decide and enforce.</p></div>"
        + '<div style="margin-top:26px">'
        + cmp_table(rows, "Rule-based automation", "AI-powered automation")
        + "</div>"
        + '<div style="display:grid;grid-template-columns:1.1fr .9fr;gap:26px;margin-top:24px">'
        + '<div class="card flat"><div class="num-badge">THE APPROVAL LADDER</div>'
          '<div style="display:flex;gap:10px;margin-top:14px;align-items:stretch">'
          '<div style="flex:1;border:1px solid #2a2a2a;padding:12px"><div class="tiny" style="color:#8fbf8f">AUTOMATIC</div>'
          '<div class="small" style="margin-top:5px;color:#b3b3b3">Classification, tagging, logging, routing.</div></div>'
          '<div style="flex:1;border:1px solid #2a2a2a;padding:12px"><div class="tiny" style="color:#C9A878">DRAFT &amp; REVIEW</div>'
          '<div class="small" style="margin-top:5px;color:#b3b3b3">Customer replies, unusual charges, low confidence.</div></div>'
          '<div style="flex:1;border:1px solid #3a2a2a;padding:12px"><div class="tiny" style="color:#f08b8f">HUMAN ONLY</div>'
          '<div class="small" style="margin-top:5px;color:#b3b3b3">Payments, deletions, legal or medical statements.</div></div>'
          "</div>"
          '<div class="tiny" style="margin-top:12px">Place each action on this ladder before you automate it. The further right, '
          "the more the workflow must stop and ask.</div></div>"
        + '<div class="card"><div class="num-badge">KEEPING A MODEL HONEST</div>'
          '<div class="checklist" style="margin-top:12px">'
          '<div class="ci"><span class="ck">01</span>Ask for a JSON schema and reject anything that does not parse.</div>'
          '<div class="ci"><span class="ck">02</span>Recompute every number with code; never trust a total from a model.</div>'
          '<div class="ci"><span class="ck">03</span>Record the model name, prompt, and raw response on the record.</div>'
          '<div class="ci"><span class="ck">04</span>Route low-confidence results to a person, not to the database.</div>'
          "</div></div></div>",
    )
    return pg("05 &middot; n8n and AI", body, pid="s5-compare")


def s5_apps():
    apps = [
        ("01", "Customer support", "Classify tickets, pull the order reference, draft a first reply for an agent to approve."),
        ("02", "Email management", "Summarise threads, label by intent, escalate urgency, draft responses."),
        ("03", "Invoice &amp; document processing", "Extract vendor, date, tax, and totals from PDFs; validate; write the ledger."),
        ("04", "Business reporting", "Turn raw tables into a written weekly summary with the numbers still computed in code."),
        ("05", "Lead qualification", "Score an inbound enquiry against fit criteria and route it to the right owner."),
        ("06", "Customer communication", "Personalise confirmations, reminders, and follow-ups from real order data."),
        ("07", "Appointment booking", "Read a free-text request, find a slot, create the event, send confirmation."),
        ("08", "Data extraction", "Convert contracts, receipts, and forms into structured rows with an audit trail."),
    ]
    cells = "".join(
        '<div class="card" style="padding:14px 15px"><div class="num-badge">%s</div>'
        '<div style="margin-top:6px;font-family:var(--font-display);font-size:13.5px;font-weight:600;color:#efebe3">%s</div>'
        '<div class="small" style="margin-top:5px;font-size:11.4px">%s</div></div>' % a
        for a in apps
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("05 &middot; Applications") +
        heading("Where this is already<br/>useful <span class='serif'>today.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:350px;text-align:right">Each of these is a workflow with a model in the middle '
          "and a rule on either side. None of them needs an autonomous agent.</p></div>"
        + '<div class="grid-4" style="margin-top:26px;gap:12px">%s</div>' % cells
        + '<div class="grid-2" style="margin-top:22px">'
        + card("WHAT AN &ldquo;AI AGENT&rdquo; ADDS", "An agent node can choose which tools to call and in what order — useful "
               "for open-ended research. It is also harder to predict, so keep agents away from irreversible actions.", "champagne")
        + card("THE HONEST BOUNDARY", "AI does not remove the need to define the process. It moves the human effort from "
               "typing to specifying, sampling, and approving.", "red")
        + "</div>"
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">'
        '<div><div class="tiny" style="color:#C9A878">GUARDRAIL 01 &middot; SCHEMA</div>'
        '<div class="small" style="margin-top:6px">Reject any model response that does not match the expected fields. '
        "Parsing is the cheapest validation available.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">GUARDRAIL 02 &middot; RECOMPUTE</div>'
        '<div class="small" style="margin-top:6px">Never let a model supply a total, a tax figure, or a date that will be '
        "written to a ledger without an independent calculation.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">GUARDRAIL 03 &middot; SAMPLE</div>'
        '<div class="small" style="margin-top:6px">Review a fixed number of live outputs every week. Accuracy drifts '
        "quietly when no one is looking.</div></div>"
        + "</div>",
    )
    return pg("05 &middot; n8n and AI", body, pid="s5-apps")


# ----------------------------------------------------------------------------
# SECTION 06 — ADVANTAGES
# ----------------------------------------------------------------------------

def s6_divider():
    return divider(
        "06",
        "Advantages<br/>of n8n",
        "What a team actually gains — and the limits that should be stated in the same breath.",
        [("01", "Ten practical advantages", "What the team gains, stated without invented metrics"),
         ("02", "A concrete shift", "The same process before and after automation"),
         ("03", "Limitations and fit", "The maintenance bill, and when not to automate")],
        pid="s6",
    )


def s6_advantages():
    items = [
        ("01", "Less repetitive work", "The copy-paste layer between systems disappears from the working day."),
        ("02", "Faster processes", "Events are handled in seconds, at any hour, instead of at the next human opportunity."),
        ("03", "Consistency", "The same input produces the same handling, in the same format, with the same checks."),
        ("04", "Fewer transcription errors", "Values move as data, not as retyped text."),
        ("05", "Systems stay connected", "Legacy tools without modern APIs can still join a pipeline through HTTP and files."),
        ("06", "Flexibility", "Change a condition on the canvas instead of commissioning a new integration project."),
        ("07", "Scalability", "The same workflow handles ten items or ten thousand without redesign."),
        ("08", "AI where it helps", "A model can be inserted as one node without rewriting the whole process."),
        ("09", "Visibility", "Every run is inspectable, which makes audits and incident reviews possible."),
        ("10", "Cost control", "Self-hosting plus open pricing avoids per-task fees that grow with volume."),
    ]
    cells = "".join(
        '<div style="border:1px solid #262626;background:#171717;padding:13px 15px">'
        '<div style="display:flex;gap:9px;align-items:baseline"><span style="font-family:var(--font-mono);font-size:9px;color:#E5484D">%s</span>'
        '<span style="font-size:12.4px;color:#eae6de;font-weight:500">%s</span></div>'
        '<div class="small" style="margin-top:5px;font-size:11.3px">%s</div></div>' % i
        for i in items
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("06 &middot; Advantages") +
        heading("What the team<br/>actually <span class='serif'>gains.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:350px;text-align:right">No invented percentages. These are structural '
          "advantages of moving work from people to an inspectable workflow.</p></div>"
        + '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:26px">%s</div>' % cells
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:22px">'
        + '<div class="card flat"><div class="num-badge">A CONCRETE SHIFT</div>'
          '<div style="display:flex;gap:18px;margin-top:12px">'
          '<div style="flex:1"><div class="tiny" style="color:#f08b8f">BEFORE</div>'
          '<div class="small" style="margin-top:6px">Week one: invoices are downloaded and retyped. Week four: someone '
          "reconciles the spreadsheet against the bank and finds the mismatches.</div></div>"
          '<div style="flex:1"><div class="tiny" style="color:#8fbf8f">AFTER</div>'
          '<div class="small" style="margin-top:6px">Each invoice is extracted, validated, and written within seconds. '
          "Discrepancies are flagged the moment they arrive, not a month later.</div></div></div></div>"
        + '<div class="card"><div class="num-badge">THE HONEST TRADE</div>'
          '<p style="margin-top:8px;font-size:13px">Automation shifts effort from <strong>doing</strong> the task to '
          "<strong>defining and maintaining</strong> it. The first workflow is slower than doing it by hand. The hundredth "
          "run is where the return appears.</p></div>"
        + "</div>"
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#E5484D">PHASE 01 &middot; DEFINE</div>'
        '<div class="small" style="margin-top:6px">Write the rule, name the owner, and agree what a failed run looks '
        "like. This is the phase people skip.</div></div>"
        '<div><div class="tiny" style="color:#E5484D">PHASE 02 &middot; INSTRUMENT</div>'
        '<div class="small" style="margin-top:6px">Build the smallest workflow that produces an inspectable record. '
        "Measure it before adding AI or more systems.</div></div>"
        '<div><div class="tiny" style="color:#E5484D">PHASE 03 &middot; OPERATE</div>'
        '<div class="small" style="margin-top:6px">Review executions weekly, rotate credentials, and version the workflow '
        "JSON alongside the code it supports.</div></div>"
        + "</div>",
    )
    return pg("06 &middot; Advantages of n8n", body, pid="s6-adv")


def s6_limits():
    body = content(
        '<div style="display:grid;grid-template-columns:1.05fr .95fr;gap:50px">'
        "<div class='stack-20'>" + eyebrow("06 &middot; A balanced view")
        + heading("Advantages come with<br/>a <span class='serif'>maintenance bill.</span>", "sm")
        + '<p class="lead">A workflow is software. It has an owner, a review cycle, and a failure mode. Presenting the '
          "advantages without the limits would be a sales pitch, not an education.</p>"
        + '<div class="stack-8">'
        + card("API DRIFT", "A provider renames a field or revokes a token and the workflow stops. Somebody must own the alert.", "red")
        + card("GARBAGE IN, AUTOMATED GARBAGE OUT", "Automation does not fix a broken process; it makes the breakage faster and more consistent.")
        + card("MODEL NONDETERMINISM", "An AI step can return a different answer for the same input. Validation and sampling are not optional.")
        + card("OPERATIONAL COST", "Servers, credentials rotation, monitoring, and the maintenance of judgement calls that were never written down.")
        + "</div></div>"
        '<div class="stack-16" style="padding-top:44px">'
        + '<div class="card flat" style="padding:0;overflow:hidden">'
          '<div style="padding:13px 18px;border-bottom:1px solid #262626" class="num-badge">GOOD FIT</div>'
          '<div class="checklist" style="padding:14px 18px">'
          '<div class="ci"><span class="ck">&#10003;</span>High-volume, rule-shaped work between two or more systems</div>'
          '<div class="ci"><span class="ck">&#10003;</span>A process that is already documented and stable</div>'
          '<div class="ci"><span class="ck">&#10003;</span>A team that will review executions and own failures</div>'
          '<div class="ci"><span class="ck">&#10003;</span>Systems with APIs, or a plan for the ones without</div>'
          "</div></div>"
        + '<div class="card flat" style="padding:0;overflow:hidden">'
          '<div style="padding:13px 18px;border-bottom:1px solid #262626" class="num-badge">POOR FIT</div>'
          '<div class="checklist" style="padding:14px 18px">'
          '<div class="ci"><span class="ck no">&times;</span>A process nobody has defined, run by judgement alone</div>'
          '<div class="ci"><span class="ck no">&times;</span>One-off tasks that will never repeat</div>'
          '<div class="ci"><span class="ck no">&times;</span>Regulated decisions with no human check and no audit trail</div>'
          '<div class="ci"><span class="ck no">&times;</span>No one available to maintain credentials and monitor runs</div>'
          "</div></div>"
        + '<div class="small" style="padding-left:2px">The right question is not &ldquo;can this be automated?&rdquo; but '
          "&ldquo;who owns it after it is automated?&rdquo;</div>"
        + "</div></div>",
    )
    return pg("06 &middot; Advantages of n8n", body, pid="s6-limits")
