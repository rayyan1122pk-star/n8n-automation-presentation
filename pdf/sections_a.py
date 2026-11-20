"""Cover, contents, and Sections 01–02."""

from deck_kit import (
    brandmark, card, cmp_table, content, divider, eyebrow, heading, lead, pg,
    pipeline, tag, stat,
)

HORIZON = """
<svg aria-hidden="true" style="position:absolute;left:50%;top:250px;transform:translateX(-50%);width:1500px;height:600px;opacity:.42" viewBox="0 0 1500 600" fill="none">
  <defs>
    <linearGradient id="arc" x1="0" y1="0" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E5484D" stop-opacity="0"/>
      <stop offset="28%" stop-color="#E5484D" stop-opacity=".4"/>
      <stop offset="50%" stop-color="#C9A878" stop-opacity=".55"/>
      <stop offset="72%" stop-color="#E5484D" stop-opacity=".4"/>
      <stop offset="100%" stop-color="#E5484D" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <path d="M 60 470 Q 750 40 1440 470" stroke="url(#arc)" stroke-width="1.2"/>
  <path d="M 170 520 Q 750 130 1330 520" stroke="rgba(255,255,255,.06)" stroke-width="1" stroke-dasharray="4 7"/>
  <circle cx="750" cy="250" r="3" fill="#E5484D"/>
  <circle cx="410" cy="330" r="2.5" fill="#C9A878"/>
  <circle cx="1090" cy="330" r="2.5" fill="#C9A878"/>
</svg>
"""


def cover():
    signal_rows = [
        ("01", "Trigger", "Webhook received · 14:02:11", "ok"),
        ("02", "AI extraction", "Fields structured · 14:02:13", "ok"),
        ("03", "Validation", "Totals matched · 14:02:13", "ok"),
        ("04", "Action", "Ledger row written · 14:02:14", "ok"),
        ("05", "Result", "Report refreshed · 14:02:14", "idle"),
    ]
    rows = "".join(
        '<div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #1f1f1f">'
        '<span style="font-family:var(--font-mono);font-size:9px;color:#6b6b6b;width:18px">%s</span>'
        '<span style="width:5px;height:5px;border-radius:50%%;background:%s;flex:0 0 auto"></span>'
        '<div style="flex:1"><div style="font-size:12px;color:#e6e2da">%s</div>'
        '<div style="font-family:var(--font-mono);font-size:8.6px;letter-spacing:.06em;color:#707070;margin-top:2px">%s</div></div>'
        "</div>"
        % (n, "#E5484D" if t != "idle" else "#5b5b5b", name, note)
        for n, name, note, t in signal_rows
    )

    solutions = [
        ("07", "FinFlow", "Smart Document &amp; Accounting Automation"),
        ("08", "OpsFlow", "Automated Business Operations"),
        ("09", "MailFlow", "Intelligent Email Automation"),
    ]
    strip = "".join(
        '<div style="padding:22px 30px;border-right:1px solid #242424;flex:1">'
        '<div style="display:flex;align-items:center;justify-content:space-between">'
        '<span style="font-family:var(--font-display);font-size:17px;font-weight:600;letter-spacing:-.01em;color:#fff">%s</span>'
        '<span style="font-family:var(--font-mono);font-size:10px;color:#5f5f5f">%s</span></div>'
        '<div style="margin-top:7px;font-family:var(--font-mono);font-size:8.6px;letter-spacing:.16em;text-transform:uppercase;color:#C9A878">%s</div>'
        "</div>" % (name, num, cat)
        for num, name, cat in solutions
    )

    body = (
        '<div class="grid-bg"></div><div class="glow"></div>' + HORIZON
        + '<div style="position:relative;z-index:2;display:flex;flex-direction:column;height:100%;padding:56px 80px 0">'
        '<div class="row between" style="align-items:center">'
        + brandmark(14)
        + '<div style="display:flex;gap:10px;align-items:center">'
        '<span class="tag grey">Technology Presentation</span>'
        '<span class="tag champagne">2026</span></div></div>'
        '<div style="display:flex;gap:60px;margin-top:96px;align-items:flex-start">'
        # left
        '<div style="flex:1">'
        '<div class="eyebrow red" style="margin-bottom:26px">n8n &middot; Workflow Automation &middot; Artificial Intelligence</div>'
        '<h1 style="margin:0;font-family:var(--font-display);font-weight:600;font-size:82px;line-height:.98;letter-spacing:-.04em;color:#fff">'
        'Intelligent<br/>Automation.'
        '<span class="serif" style="display:block;font-size:88px;color:#F5F3EF;margin-top:6px">Endless possibilities.</span>'
        "</h1>"
        '<p style="margin:34px 0 0;max-width:640px;font-size:19px;line-height:1.62;color:#a9a9a9">'
        "A complete technical presentation on n8n — from the fundamentals of workflow automation to "
        "three working AI solutions, documented node by node.</p>"
        '<div style="display:flex;gap:38px;margin-top:40px;align-items:flex-end">'
        + stat("Workflows documented", "04")
        + stat("Nodes explained", "21")
        + stat("Solutions", "03")
        + "</div></div>"
        # right signal module
        '<div style="width:392px;flex:0 0 auto">'
        '<div class="card" style="padding:0;background:#161616">'
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #242424">'
        '<span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#C9A878">Execution trace</span>'
        '<span style="font-family:var(--font-mono);font-size:9px;color:#6b6b6b">EXEC #4128</span></div>'
        '<div style="padding:6px 18px 12px">%s</div>'
        '<div style="padding:12px 18px;border-top:1px solid #242424;display:flex;justify-content:space-between">'
        '<span style="font-family:var(--font-mono);font-size:8.6px;color:#6b6b6b">TOTAL 2.8s</span>'
        '<span style="font-family:var(--font-mono);font-size:8.6px;color:#8fbf8f">&#10003; COMPLETED</span></div>'
        "</div>"
        '<div style="margin-top:14px;font-size:11.5px;line-height:1.55;color:#6f6f6f;padding-left:2px">'
        "Every step in an n8n workflow is observable: input, output, timing, and branch taken.</div>"
        "</div></div>"
        # bottom strip
        '<div style="margin:auto -80px 0;border-top:1px solid #242424;background:rgba(22,22,22,.9)">'
        '<div style="display:flex">%s</div></div>'
        "</div>" % (rows, strip)
    )
    return '<section class="page" id="cover" style="padding:0">%s</section>' % body


def toc(toc_entries):
    rows = "".join(
        '<a class="toc-row" href="#%s"><span class="toc-num">%s</span>'
        '<span class="toc-title">%s</span><span class="toc-sub">%s</span>'
        '<span class="leader"></span><span class="toc-page">%s</span></a>'
        % (pid, num, title, sub, page)
        for num, title, sub, pid, page in toc_entries
    )
    left = (
        '<div class="stack-24">'
        + eyebrow("Contents")
        + heading("What this presentation covers.", "sm", 'style="max-width:760px"')
        + '<p class="lead" style="max-width:620px">Seven teaching sections build the foundation; one demonstration section '
          "applies it to three complete automation systems. Page numbers are clickable.</p>"
        "</div>"
    )
    facts = (
        '<div style="display:flex;gap:34px;margin-top:18px;border-top:1px solid #242424;padding-top:12px">'
        + stat("Pages", "52") + stat("Sections", "08") + stat("Systems", "03") + stat("Verified nodes", "21")
        + "</div>"
    )
    legend = (
        '<div class="card" style="margin-top:20px">'
        '<div class="num-badge">HOW TO READ THE TECHNICAL PAGES</div>'
        '<div class="stack-12" style="margin-top:12px">'
        '<div style="display:flex;gap:10px;align-items:center">' + tag("Verified export", "champagne")
        + '<span class="small">Node facts taken from an exported n8n workflow JSON in this project.</span></div>'
        '<div style="display:flex;gap:10px;align-items:center">' + tag("Design spec", "red")
        + '<span class="small">Documented design for a workflow; not yet verified against an export.</span></div>'
        '<div style="display:flex;gap:10px;align-items:center">' + tag("Asset pending", "grey")
        + '<span class="small">Screenshot, recording, or file was not supplied — marked, never fabricated.</span></div>'
        "</div></div>"
    )
    body = content(
        '<div style="display:grid;grid-template-columns:0.92fr 1.08fr;gap:56px;flex:1">'
        '<div style="display:flex;flex-direction:column;justify-content:space-between">'
        + "<div>" + left + legend + facts + "</div>"
        + '<div class="plate"><span class="pip"></span>AUTOMATE.AI &middot; PRESENTATION DECK &middot; 16:9 &middot; LANDSCAPE</div>'
        "</div>"
        '<div style="display:flex;flex-direction:column;justify-content:center"><div class="toc">%s</div></div>'
        "</div>" % rows,
        style="padding-top:26px",
    )
    return pg("Contents", body, pid="contents")


# ----------------------------------------------------------------------------
# SECTION 01 — INTRODUCTION TO N8N
# ----------------------------------------------------------------------------

def s1_divider():
    return divider(
        "01",
        "Introduction<br/>to n8n",
        "What the platform is, the problem it was built to solve, and where it belongs in a modern business stack.",
        [("01", "What n8n is", "The platform, the problem it solves, and the two ways to run it"),
         ("02", "Manual vs automated", "What actually changes in the working day, step by step"),
         ("03", "Where it fits", "The orchestration layer between sources and systems of record")],
        pid="s1",
    )


def s1_what():
    body = content(
        '<div style="display:grid;grid-template-columns:1.05fr .95fr;gap:56px">'
        "<div class='stack-24'>"
        + eyebrow("01 &middot; Introduction to n8n")
        + heading("n8n is a visual<br/>automation <span class='serif'>workspace.</span>", "", 'style="max-width:640px"')
        + '<p class="lead">n8n is a node-based workflow automation platform. You connect <strong>triggers</strong>, '
          "<strong>actions</strong>, and <strong>logic</strong> on a canvas, and n8n executes that graph every time an "
          "event fires — moving structured data from one system to the next without a person in the middle.</p>"
        + '<div class="card accent-left"><div class="num-badge">THE PROBLEM IT SOLVES</div>'
          '<p style="margin-top:10px;font-size:13.4px">Business software is fragmented: invoices arrive by email, orders '
          "in a web form, stock in a spreadsheet, confirmations in an inbox. Each system is useful alone but blind to the "
          "others. n8n is the connective layer that moves data between them on rules you can see and change.</p></div>"
        + '<div class="grid-3" style="margin-top:2px">'
        + card("01", "Visual by design", "The workflow is a diagram you can read. No hidden code path.")
        + card("02", "Self-hostable", "Run it on your own server for full data control, or use n8n Cloud.")
        + card("03", "Fair-code", "Source-available and extensible; write custom code nodes when needed.")
        + "</div>"
        + "</div>"
        '<div class="stack-16">'
        '<div class="card flat" style="padding:0;overflow:hidden">'
        '<div style="padding:14px 18px;border-bottom:1px solid #262626;display:flex;justify-content:space-between;align-items:center">'
        '<span class="num-badge">THE SAME TASK, TWO WAYS</span>'
        '<span class="tag grey">Invoice received</span></div>'
        '<div style="padding:18px">'
        '<div style="font-family:var(--font-mono);font-size:9px;letter-spacing:.16em;color:#8a8a8a">MANUAL</div>'
        '<div class="checklist" style="margin-top:9px">'
        '<div class="ci"><span class="ck no">&times;</span>Open the email, download the attachment</div>'
        '<div class="ci"><span class="ck no">&times;</span>Read vendor, date, tax, total by eye</div>'
        '<div class="ci"><span class="ck no">&times;</span>Retype the figures into a spreadsheet</div>'
        '<div class="ci"><span class="ck no">&times;</span>Copy the row into the accounting tool</div>'
        '<div class="ci"><span class="ck no">&times;</span>Repeat for every document, every day</div>'
        "</div>"
        '<div class="hairline" style="margin:18px 0"></div>'
        '<div style="font-family:var(--font-mono);font-size:9px;letter-spacing:.16em;color:#C9A878">AUTOMATED WITH N8N</div>'
        '<div class="checklist" style="margin-top:9px">'
        '<div class="ci"><span class="ck">&#10003;</span>Gmail trigger detects an invoice attachment</div>'
        '<div class="ci"><span class="ck">&#10003;</span>AI node extracts and structures the fields</div>'
        '<div class="ci"><span class="ck">&#10003;</span>Rule node validates tax and totals</div>'
        '<div class="ci"><span class="ck">&#10003;</span>HTTP node writes one ledger row</div>'
        '<div class="ci"><span class="ck">&#10003;</span>Dashboard reflects it in seconds</div>'
        "</div></div></div>"
        '<div class="small" style="padding-left:2px">The work still has to be defined — but it is defined <em>once</em>, '
        "inspectably, and then executed identically every time.</div>"
        "</div></div>",
    )
    return pg("01 &middot; Introduction to n8n", body, pid="s1-what")


def s1_manual():
    rows = [
        ("A person notices the event — an email, a form, a message.",
         "A trigger node fires the moment the event occurs."),
        ("Copy data from one window and paste it into another.",
         "Data is passed as structured JSON items between nodes."),
        ("Decide what to do using memory and habit.",
         "IF / Switch nodes evaluate explicit conditions."),
        ("Type the same values into the destination system.",
         "Action nodes call the destination's API directly."),
        ("Write the confirmation by hand, one customer at a time.",
         "A template node generates the confirmation once, for every case."),
        ("Discover mistakes days later during reconciliation.",
         "Validation steps catch problems before anything is written."),
        ("Process one item at a time, during working hours.",
         "Runs on every event, continuously, in parallel."),
    ]
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("01 &middot; Why automation") +
        heading("Manual work is a chain of<br/>small <span class='serif'>handoffs.</span>", "sm", 'style="max-width:760px"')
        + "</div>"
        + '<p class="small" style="max-width:300px;text-align:right">Every handoff between a person and a system is a '
          "place where time is lost and accuracy leaks.</p></div>"
        + '<div style="margin-top:28px">'
        + cmp_table(rows, "Where manual work breaks", "What automation replaces it with")
        + "</div>"
        + '<div class="grid-3" style="margin-top:24px">'
        + card("01", "Speed", "An event is handled in seconds, not in the next free moment of someone's day.")
        + card("02", "Accuracy", "The same field mapping runs every time. No misplaced decimals, no retyped dates.")
        + card("03", "Consistency", "Every customer gets the same confirmation, in the same format, with the same data.")
        + "</div>",
    )
    return pg("01 &middot; Introduction to n8n", body, pid="s1-manual")


def s1_fit():
    layers = [
        ("SOURCES", "Email &middot; Web forms &middot; Storefront &middot; Chat &middot; Files &middot; Schedules", "#C9A878"),
        ("ORCHESTRATION", "n8n — triggers, nodes, logic, credentials, executions", "#E5484D"),
        ("INTELLIGENCE", "Language models &middot; extraction &middot; classification &middot; drafting", "#8FA4B8"),
        ("SYSTEMS OF RECORD", "Databases &middot; spreadsheets &middot; invoicing &middot; CRM &middot; dashboards", "#C9A878"),
    ]
    layer_html = "".join(
        '<div style="border:1px solid #2a2a2a;background:%s;padding:14px 20px;border-radius:2px">'
        '<div style="display:flex;align-items:center;justify-content:space-between">'
        '<span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.2em;color:%s">%s</span>'
        '<span style="font-family:var(--font-mono);font-size:9px;color:#7c7c7c">%s</span></div></div>'
        % ("#1b1b1b" if name != "ORCHESTRATION" else "rgba(229,72,77,.07)", accent, name, desc)
        for name, desc, accent in layers
    )
    body = content(
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:56px">'
        "<div class='stack-20'>" + eyebrow("01 &middot; Position in the stack") +
        heading("Where n8n <span class='serif'>fits.</span>", "sm")
        + '<p class="lead">n8n is not a CRM, an accounting package, or a database. It is the <strong>orchestration layer</strong> '
          "between the systems you already use — the place where a business rule becomes an executable workflow.</p>"
        + '<div class="stack-12" style="margin-top:6px">' + layer_html + "</div>"
        + '<div class="plate" style="margin-top:6px"><span class="pip"></span>DATA FLOWS THROUGH; IT IS NOT LOCKED IN</div>'
        + "</div>"
        '<div class="stack-16">'
        + card("WHAT N8N IS", "A workflow engine with a visual editor, an execution log for every run, encrypted credential "
               "storage, and hundreds of prebuilt integrations plus a generic HTTP node for anything else.", "champagne")
        + card("WHAT N8N IS NOT", "Not a replacement for your accounting or ERP system, not a model provider, and not a "
               "guarantee of correct business logic. It executes the rules you configure — including a wrong one.", "red")
        + '<div class="card flat"><div class="num-badge">TWO WAYS TO RUN IT</div>'
          '<div class="grid-2" style="margin-top:12px;gap:16px">'
          '<div><div style="font-size:13px;color:#e8e4dc">Self-hosted</div><div class="small">Your server, your database, '
          "your network boundary. Full control over data residency.</div></div>"
          '<div><div style="font-size:13px;color:#e8e4dc">n8n Cloud</div><div class="small">Managed hosting and upgrades; '
          "the same editor and execution model.</div></div></div></div>"
        + "</div></div>"
        + '<div class="grid-3" style="margin-top:24px;border-top:1px solid #242424;padding-top:20px">'
        + card("BEFORE YOU BUILD", "A process someone can describe", "If two people explain the steps differently, the "
               "workflow will encode the disagreement.")
        + card("BEFORE YOU CONNECT", "Access, not just credentials", "Every system needs an account with the right "
               "permissions, and an owner who can renew it.")
        + card("AFTER IT RUNS", "A person accountable for failures", "An unattended workflow that fails silently is worse "
               "than a slow manual process.")
        + "</div>",
    )
    return pg("01 &middot; Introduction to n8n", body, pid="s1-fit")


# ----------------------------------------------------------------------------
# SECTION 02 — WORKFLOW AUTOMATION
# ----------------------------------------------------------------------------

def s2_divider():
    return divider(
        "02",
        "Workflow<br/>Automation",
        "What a workflow actually is, how one runs from beginning to end, and how data moves between its steps.",
        [("01", "Anatomy of a workflow", "Trigger, action, condition, output — and the items between them"),
         ("02", "The six-stage pipeline", "From event to result, with a stage-by-stage diagram"),
         ("03", "Practical examples", "Six recurring shapes behind most business automation")],
        pid="s2",
    )


def s2_anatomy():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("02 &middot; Foundations") +
        heading("A workflow is a graph of<br/>small, <span class='serif'>honest steps.</span>", "sm", 'style="max-width:780px"')
        + "</div>"
        + '<p class="small" style="max-width:320px;text-align:right">A trigger, one or more actions, and the logic that '
          "decides which action runs. That is the whole model.</p></div>"
        + '<div class="grid-4" style="margin-top:30px">'
        + card("01", "Trigger", "The event that starts a run: a webhook request, a new email, a schedule, a form submission, "
               "or a manual click.", "red")
        + card("02", "Action", "A node that does something in the outside world: create a record, send a message, generate "
               "a file, call an API.")
        + card("03", "Condition", "An IF or Switch node that reads the data and sends each item down exactly one path.")
        + card("04", "Output", "The final state: a saved row, a delivered email, a returned HTTP response, a refreshed dashboard.")
        + "</div>"
        + '<div style="display:grid;grid-template-columns:1.15fr .85fr;gap:30px;margin-top:26px">'
        '<div class="card flat"><div class="num-badge">THE SAME FOUR ELEMENTS, AS A REAL BUSINESS RULE</div>'
          '<div style="margin-top:14px;display:flex;flex-direction:column;gap:0">'
          '<div class="flow-node red"><div class="fn-icon">WH</div><div class="fn-body"><div class="fn-name">Webhook — new order</div>'
          '<div class="fn-type">Trigger &middot; starts on POST</div></div></div>'
          '<div class="connector-v"></div>'
          '<div class="flow-node"><div class="fn-icon">IF</div><div class="fn-body"><div class="fn-name">Stock available?</div>'
          '<div class="fn-type">Condition &middot; quantity &le; available</div></div></div>'
          '<div class="connector-v"></div>'
          '<div class="flow-node"><div class="fn-icon">API</div><div class="fn-body"><div class="fn-name">Reserve stock + create invoice</div>'
          '<div class="fn-type">Action &middot; two system calls</div></div></div>'
          '<div class="connector-v"></div>'
          '<div class="flow-node"><div class="fn-icon">OUT</div><div class="fn-body"><div class="fn-name">Send confirmation</div>'
          '<div class="fn-type">Output &middot; customer email</div></div></div>'
          "</div></div>"
        '<div class="stack-16">'
        + card("WHAT MAKES IT A WORKFLOW", "The steps are <strong>ordered</strong>, the data has a <strong>defined shape</strong> at "
               "each step, and each step has one job. That is what makes an automation debuggable instead of magical.")
        + '<div class="code">'
          '<span class="c">// the item handed from one node to the next</span>\n'
          '{\n  <span class="k">"order_id"</span>: <span class="s">"ORD-1042"</span>,\n'
          '  <span class="k">"sku"</span>:      <span class="s">"SKU-77"</span>,\n'
          '  <span class="k">"qty"</span>:      <span class="n">3</span>,\n'
          '  <span class="k">"stock"</span>:    <span class="n">12</span>,\n'
          '  <span class="k">"approved"</span>: <span class="b">true</span>\n}'
          "</div>"
        + '<div class="tiny">Each node receives an ARRAY of these items, works on each one, and emits a new array.</div>'
        + "</div></div>",
    )
    return pg("02 &middot; Workflow Automation", body, pid="s2-anatomy")


def s2_pipeline():
    stages = [
        ("Trigger", "An event occurs: an email arrives, a form is submitted, a schedule fires. The workflow starts."),
        ("Data collection", "The trigger and follow-up nodes gather the raw payload, attachments, or records needed."),
        ("Processing", "Data is cleaned, parsed, converted, and enriched — text extracted, fields normalised."),
        ("Decision", "Conditions evaluate the data and choose a path: valid or invalid, urgent or routine, in stock or not."),
        ("Action", "The workflow writes, sends, generates, or calls the systems that hold the real business state."),
        ("Result", "A record exists, a customer was informed, a report refreshed — and the execution is logged."),
    ]
    body = content(
        '<div class="stack-16">' + eyebrow("02 &middot; The universal pattern") +
        heading("Six stages. Every automation<br/>you will ever build.", "sm")
        + '<p class="lead" style="max-width:900px">Different tools, different industries — the shape stays the same. '
          "Learning these six stages is what lets you read an unfamiliar workflow and understand it in a minute.</p></div>"
        + '<div style="margin-top:34px">' + pipeline(stages) + "</div>"
        + '<div class="grid-3" style="margin-top:30px">'
        + card("READ IT LEFT TO RIGHT", "Each stage hands a defined payload to the next. If a stage has nothing to hand on, "
               "the run should stop or branch — not silently continue.")
        + card("DECISION IS THE HINGE", "Without a decision, you have a script. With one, you have a system that can say no, "
               "escalate, or wait for a person.")
        + card("RESULT MUST BE OBSERVABLE", "A run that cannot be inspected afterwards is a run you cannot trust. n8n stores "
               "the input and output of every node.")
        + "</div>"
        + '<div style="margin-top:26px;border-top:1px solid #242424;padding-top:16px">'
        '<div class="tiny" style="margin-bottom:10px">THE SAME SIX STAGES, IN THE VOCABULARY OF N8N</div>'
        '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px">'
        + "".join(
            '<div style="border:1px solid #262626;padding:10px 12px"><div style="font-family:var(--font-mono);font-size:8.4px;color:#E5484D;letter-spacing:.12em">%s</div>'
            '<div style="font-size:11.6px;color:#d8d3ca;margin-top:4px">%s</div></div>' % pair
            for pair in [
                ("STAGE 01-02", "Webhook, Schedule, Gmail Trigger"),
                ("STAGE 02", "HTTP Request, Read File, Set"),
                ("STAGE 03", "Code, Extract, Merge, Split Out"),
                ("STAGE 04", "IF, Switch"),
                ("STAGE 05", "App nodes, HTTP Request"),
                ("STAGE 06", "Respond to Webhook, Execution log"),
            ]
        )
        + "</div></div>",
    )
    return pg("02 &middot; Workflow Automation", body, pid="s2-pipeline")


def s2_examples():
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("02 &middot; Applied") +
        heading("The same six stages,<br/>six different <span class='serif'>jobs.</span>", "sm")
        + "</div>"
        + '<div style="max-width:330px;text-align:right" class="small">These are the recurring shapes behind most business '
          "automation requests. Each maps onto the pipeline on the previous page.</div></div>"
        + '<div class="grid-3" style="margin-top:28px">'
        + card("EXAMPLE 01", "Customer orders", "Webhook receives the order &rarr; validate fields &rarr; check stock &rarr; "
               "write order &rarr; email confirmation.")
        + card("EXAMPLE 02", "Notifications", "New record or status change &rarr; format message &rarr; route by severity "
               "&rarr; send to the right channel.")
        + card("EXAMPLE 03", "Invoice processing", "Email or upload &rarr; extract text &rarr; AI structures the fields &rarr; "
               "validate totals &rarr; write ledger row &rarr; refresh report.")
        + card("EXAMPLE 04", "Email organisation", "New message &rarr; clean content &rarr; classify &rarr; apply label and "
               "route &rarr; draft a reply for review.")
        + card("EXAMPLE 05", "Spreadsheets &amp; databases", "Any event &rarr; map fields to columns &rarr; check for an existing "
               "row &rarr; update or insert &rarr; return a receipt.")
        + card("EXAMPLE 06", "Reporting", "Scheduled trigger &rarr; query the systems &rarr; aggregate &rarr; render a summary "
               "&rarr; deliver it to the team.")
        + "</div>"
        + '<div class="card flat" style="margin-top:24px;border-left:2px solid #C9A878">'
          '<div style="display:flex;gap:40px;align-items:center">'
          '<div class="num-badge" style="width:150px">THE TEST FOR ANY CANDIDATE PROCESS</div>'
          '<div class="small" style="flex:1">Is it <strong>repetitive</strong>? Does it follow <strong>rules</strong>? '
          "Does it move data between <strong>two or more systems</strong>? If all three are true, it is a workflow — and "
          "the six stages will describe it.</div></div></div>"
        + '<div class="grid-3" style="margin-top:18px">'
        + card("START AT THE HANDOFF", "Automate the moment one system stops and a person starts copying. That is where "
               "time and accuracy are lost first.")
        + card("AUTOMATE THE READING", "Extraction and classification are safer first steps than sending or deleting. "
               "Nothing irreversible happens.")
        + card("KEEP THE DECISION EXPLICIT", "Write the rule down as a condition. If you cannot, the process is not ready "
               "to be automated.")
        + "</div>",
    )
    return pg("02 &middot; Workflow Automation", body, pid="s2-examples")
