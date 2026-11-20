"""Section 07 continued: OpsFlow and MailFlow."""

from deck_kit import canvas, card, content, eyebrow, heading, node_doc, pg, tag

AI = "AI node"
CODE = "n8n-nodes-base.code"
HTTP = "n8n-nodes-base.httpRequest"
IF = "n8n-nodes-base.if"
WEBHOOK = "n8n-nodes-base.webhook"
GMAIL = "n8n-nodes-base.gmail"
GMAIL_TRIGGER = "n8n-nodes-base.gmailTrigger"


def _spec_note():
    return ('<div class="plate"><span class="pip"></span>DESIGN SPECIFICATION &middot; NODE NAMES AND CONNECTIONS '
            "DESCRIBE THE INTENDED PIPELINE &middot; EXPORTED WORKFLOW JSON NOT SUPPLIED</div>")


# ----------------------------------------------------------------------------
# OPSFLOW
# ----------------------------------------------------------------------------

def ops_intro():
    body = content(
        '<div style="display:grid;grid-template-columns:1.05fr .95fr;gap:50px">'
        "<div class='stack-20'>" + eyebrow("07.2 &middot; OpsFlow") +
        heading("Order in.<br/>Invoice, stock, and <span class='serif'>confirmation</span> out.", "sm")
        + '<p class="lead">OpsFlow is the operations spine: it accepts a customer order, proves the stock exists, reserves it, '
          "creates the invoice, tells the customer, and records the new order state.</p>"
        + '<div class="card accent-left"><div class="num-badge">THE PROBLEM</div>'
          '<p style="margin-top:9px;font-size:12.8px">Orders arrive through a form, a storefront, and an inbox. Stock lives in a '
          "spreadsheet, invoices are typed one at a time, and confirmations are sent when someone remembers. Two orders for "
          "the last unit is a normal Tuesday.</p></div>"
        + '<div class="card champagne-left"><div class="num-badge">THE SOLUTION</div>'
          '<p style="margin-top:9px;font-size:12.8px">One workflow validates the order, checks each SKU against live stock, '
          "reserves only what exists, and produces the invoice and confirmation from the same data — leaving a status trail "
          "a manager can actually read.</p></div>"
        + "</div>"
        '<div class="stack-14" style="padding-top:44px">'
        + '<div style="display:flex;gap:10px;flex-wrap:wrap">' + tag("Design spec", "red") + tag("9 stages")
        + tag("Order &rarr; invoice") + tag("Stock reservation") + "</div>"
        + '<div class="card flat" style="padding:0;overflow:hidden">'
          '<div style="padding:12px 17px;border-bottom:1px solid #262626" class="num-badge">THE OPERATIONAL LOOP</div>'
          '<div style="padding:16px 17px" class="stack-12">'
          '<div style="display:flex;gap:12px;align-items:baseline"><span class="mono" style="font-size:9px;color:#E5484D;width:26px">01</span>'
          '<span class="small" style="flex:1"><strong style="color:#ddd8cf">Intake</strong> &mdash; order captured as JSON, regardless of channel.</span></div>'
          '<div style="display:flex;gap:12px;align-items:baseline"><span class="mono" style="font-size:9px;color:#E5484D;width:26px">02</span>'
          '<span class="small" style="flex:1"><strong style="color:#ddd8cf">Proof</strong> &mdash; fields validated, every SKU looked up, quantity compared to stock.</span></div>'
          '<div style="display:flex;gap:12px;align-items:baseline"><span class="mono" style="font-size:9px;color:#E5484D;width:26px">03</span>'
          '<span class="small" style="flex:1"><strong style="color:#ddd8cf">Commit</strong> &mdash; stock reserved and order written in one place, then invoiced.</span></div>'
          '<div style="display:flex;gap:12px;align-items:baseline"><span class="mono" style="font-size:9px;color:#E5484D;width:26px">04</span>'
          '<span class="small" style="flex:1"><strong style="color:#ddd8cf">Inform</strong> &mdash; customer confirmation and a status update the team can see.</span></div>'
          "</div></div>"
        + '<div class="small" style="padding-left:2px">The hard part is not sending the email. It is making the stock '
          "decrement and the invoice agree, exactly once.</div>"
        + "</div></div>"
        + '<div style="margin-top:22px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">'
        '<div><div class="tiny" style="color:#C9A878">CUSTOMER</div><div class="small" style="margin-top:5px">One '
        "confirmation, with the invoice attached.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">OPERATIONS</div><div class="small" style="margin-top:5px">A '
        "stock level that moved, tied to an order id.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">FINANCE</div><div class="small" style="margin-top:5px">An '
        "invoice built from reserved lines, not a request.</div></div>"
        '<div><div class="tiny" style="color:#C9A878">MANAGEMENT</div><div class="small" style="margin-top:5px">Where '
        "every order stopped, and why.</div></div>"
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; OpsFlow", body, pid="f7_ops")


def ops_arch():
    nodes = [
        {"id": "a", "name": "Webhook &mdash; New Order", "sub": "trigger", "x": 18, "y": 74, "w": 176, "tone": "red", "icon": "WH"},
        {"id": "b", "name": "Normalize Order Payload", "sub": "code", "x": 205, "y": 74, "w": 176, "icon": "{ }"},
        {"id": "c", "name": "Validate Order", "sub": "if", "x": 392, "y": 74, "w": 176, "tone": "ai", "icon": "IF"},
        {"id": "d", "name": "Lookup Inventory", "sub": "httpRequest", "x": 579, "y": 74, "w": 176, "icon": "API"},
        {"id": "e", "name": "Stock Available?", "sub": "if", "x": 766, "y": 74, "w": 176, "tone": "ai", "icon": "IF"},
        {"id": "f", "name": "Reserve Stock &amp; Create Order", "sub": "httpRequest", "x": 953, "y": 74, "w": 176, "tone": "champagne", "icon": "DB"},
        {"id": "g", "name": "Generate Invoice", "sub": "code", "x": 1140, "y": 74, "w": 176, "icon": "DOC"},
        {"id": "i", "name": "Backorder &amp; Ops Alert", "sub": "gmail &middot; branch", "x": 766, "y": 206, "w": 176, "tone": "grey", "icon": "!"},
    ]
    edges = [
        ("a", "b"), ("b", "c"), ("c", "d"), ("d", "e"), ("e", "f"), ("f", "g"),
        ("e", "i", "FALSE"),
    ]
    rows = [
        ("01", "Webhook &mdash; New Order", "Trigger", "Starts the workflow the moment an order is submitted."),
        ("02", "Normalize Order Payload", "Code", "One item per order; line items flattened and typed."),
        ("03", "Validate Order", "IF", "Required fields, email shape, positive quantities."),
        ("04", "Lookup Inventory", "HTTP", "Reads current stock for every requested SKU."),
        ("05", "Stock Available?", "IF", "Compares requested quantity to available quantity."),
        ("06", "Reserve Stock &amp; Create Order", "HTTP", "Decrements stock and writes the order atomically."),
        ("07", "Generate Invoice", "Code", "Builds the invoice from the confirmed order data."),
        ("08", "Notify Customer", "Gmail", "Sends confirmation with the invoice attached."),
        ("09", "Update Order Status", "HTTP", "Marks the order confirmed and closes the run."),
    ]
    table = "".join(
        '<div style="display:grid;grid-template-columns:26px 1.3fr .7fr 1.7fr;gap:10px;padding:4px 0;border-bottom:1px solid #1f1f1f">'
        '<span class="mono" style="font-size:8.6px;color:#E5484D">%s</span>'
        '<span style="font-size:10.6px;color:#ddd8cf">%s</span>'
        '<span class="mono" style="font-size:8.6px;color:#8a8a8a">%s</span>'
        '<span style="font-size:9.8px;color:#858585;line-height:1.4">%s</span></div>' % r
        for r in rows
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07.2 &middot; Architecture") +
        heading("Nine stages,<br/>two <span class='serif'>decisions.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:350px;text-align:right">Validation and availability are the only two branch '
          "points. Everything after them is commitment.</p></div>"
        + '<div style="margin-top:18px">'
        + canvas(nodes, edges, height=268, title="OPSFLOW &middot; ORDER TO CONFIRMATION &amp; BACKORDER",
                 meta="design schematic &middot; not an export")
        + "</div>"
        +        '<div style="display:grid;grid-template-columns:1.25fr .75fr;gap:24px;margin-top:10px">'
        + '<div class="card flat" style="padding:8px 16px 10px">%s</div>' % table
        + '<div class="stack-10">' + _spec_note()
        + '<div class="card" style="padding:14px 16px"><div class="num-badge">BRANCH BEHAVIOUR</div>'
          '<div class="small" style="margin-top:7px"><strong>Invalid</strong> &rarr; stop and flag the order; nothing is '
          "reserved. <strong>Insufficient stock</strong> &rarr; hold the order, alert the operations owner, notify the customer "
          "of the delay. <strong>Valid and in stock</strong> &rarr; reserve, invoice, confirm.</div></div>"
        + "</div></div>",
    )
    return pg("07 &middot; Practical demonstration &middot; OpsFlow", body, pid="f7_ops_arch")


def ops_nodes_1():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:14px">'
        "<div class='stack-12'>" + eyebrow("07.2 &middot; Node documentation 1 / 3") +
        heading("Intake and <span class='serif'>validation.</span>", "sm")
        + "</div>" + _spec_note() + "</div>"
        + node_doc("01", "Webhook &mdash; New Order", WEBHOOK + " &middot; POST /ops/new-order",
                   "The HTTP entry point that accepts a customer order.",
                   "Orders must start the pipeline immediately, not wait for a database poll.",
                   "JSON body with customer fields and an array of line items (sku, quantity).",
                   "Accepts POST, validates the route, and creates the execution. Response mode waits for a final respond node.",
                   "One item containing the request body and headers.",
                   "02 &mdash; Normalize Order Payload", "Sets the shape every later expression relies on.",
                   tag("Trigger", "red"))
        + '<div style="height:12px"></div>'
        + node_doc("02", "Normalize Order Payload", CODE + " &middot; JavaScript",
                   "Reshapes the request into a typed order and flattens its lines.",
                   "Storefront, form, and manual orders arrive with different field names; this is the single adapter.",
                   "The webhook item, including the raw line-item array.",
                   "Generates an order id when absent, normalises customer fields, coerces quantities to numbers, and computes "
                   "line subtotals.",
                   "An order object plus one item per line, ready for per-SKU lookups.",
                   "03 &mdash; Validate Order", "Prevents a malformed order from ever reaching stock.",
                   tag("Code", "champagne"))
        + '<div style="height:12px"></div>'
        + node_doc("03", "Validate Order", IF + " &middot; two outputs",
                   "A hard gate on the minimum information needed to bill and deliver.",
                   "An order without a reachable email or with zero quantity must fail before anything is reserved.",
                   "The normalised order and its line items.",
                   "Evaluates required fields, email format, positive integer quantities, and at least one line item.",
                   "Valid items continue to inventory lookup; invalid items route to the rejection branch.",
                   "04 &mdash; Lookup Inventory (true) / reject branch (false)",
                   "Separates &ldquo;cannot process&rdquo; from &ldquo;can process but out of stock&rdquo;.",
                   tag("Condition", "red")),
    )
    return pg("07 &middot; Practical demonstration &middot; OpsFlow", body, pid="f7_ops_n1")


def ops_nodes_2():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:14px">'
        "<div class='stack-12'>" + eyebrow("07.2 &middot; Node documentation 2 / 3") +
        heading("Stock truth and <span class='serif'>commitment.</span>", "sm")
        + "</div>" + _spec_note() + "</div>"
        + node_doc("04", "Lookup Inventory", HTTP + " &middot; GET stock",
                   "Reads the current stock level for each requested SKU.",
                   "Availability must come from the operational record, not from the order form's claim.",
                   "One item per SKU with the requested quantity.",
                   "Queries the inventory API or table by SKU, returning available quantity and a reserved quantity.",
                   "Stock records attached to each line item.",
                   "05 &mdash; Stock Available?", "The data the availability decision depends on.",
                   tag("Integration", "grey"))
        + '<div style="height:12px"></div>'
        + node_doc("05", "Stock Available?", IF + " &middot; two outputs",
                   "Compares requested quantity with available stock, per line.",
                   "This is the rule that prevents overselling the last unit.",
                   "Line items enriched with live stock figures.",
                   "Evaluates <span class='mono'>available &ge; requested</span> for every line; an order with any failing "
                   "line takes the false path.",
                   "True &rarr; reservation; False &rarr; backorder and operations alert.",
                   "06 &mdash; Reserve Stock (true) / 09-alert branch (false)",
                   "The central business decision of the workflow.",
                   tag("Condition", "red"))
        + '<div style="height:12px"></div>'
        + node_doc("06", "Reserve Stock &amp; Create Order", HTTP + " &middot; POST",
                   "Writes the order and decrements inventory in a single transaction.",
                   "Two writes that can fail independently are how stock drifts; they belong together.",
                   "Validated, stock-verified order and its line items.",
                   "Posts an order record and a stock adjustment keyed by the order id, so a retry cannot double-decrement.",
                   "The confirmed order with its final identifiers and status.",
                   "07 &mdash; Generate Invoice", "The only node that changes stock and order state.",
                   tag("Action", "champagne")),
    )
    return pg("07 &middot; Practical demonstration &middot; OpsFlow", body, pid="f7_ops_n2")


def ops_nodes_3():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:4px">'
        "<div class='stack-12'>" + eyebrow("07.2 &middot; Node documentation 3 / 3") +
        heading("Invoice, notice,<br/>and <span class='serif'>status.</span>", "sm")
        + "</div>" + _spec_note() + "</div>"
        + node_doc("07", "Generate Invoice", CODE + " &middot; template",
                   "Builds the invoice document from the confirmed order.",
                   "The invoice must be derived from what was actually reserved, not from the customer's original request.",
                   "Confirmed order, line items, prices, tax rate, and customer billing details.",
                   "Computes subtotal, tax, and total; assigns an invoice number; renders the document; keeps a copy for the record.",
                   "Invoice payload or generated file, linked to the order id.",
                   "08 &mdash; Notify Customer", "Turns operational state into a customer-facing document.",
                   tag("Document", "champagne"))
        + '<div style="height:12px"></div>'
        + node_doc("08", "Notify Customer", GMAIL + " &middot; send",
                   "Sends the order confirmation with the invoice to the customer.",
                   "A silent order is an order the customer will email about; the confirmation closes that loop.",
                   "Customer email, order summary, invoice attachment, and delivery expectation.",
                   "Renders a plain, factual message, attaches the invoice, and sends through the authenticated mail account.",
                   "Delivery receipt and message id.",
                   "09 &mdash; Update Order Status", "The only node the customer ever sees.",
                   tag("Output", "grey"))
        + '<div style="height:12px"></div>'
        + node_doc("09", "Update Order Status", HTTP + " &middot; PATCH order",
                   "Records that the order is confirmed and complete.",
                   "Without a status write, the dashboard shows an order that was never fulfilled.",
                   "Order id, invoice id, delivery receipt, and timestamps.",
                   "PATCHes the order record to <span class='mono'>confirmed</span>; on the rejected branch writes "
                   "<span class='mono'>backorder</span> or <span class='mono'>invalid</span> with the reason.",
                   "Final order state plus an operational log entry.",
                   "End of workflow", "Makes the run visible to the team and to reporting.",
                   tag("Action", "champagne")),
    )
    return pg("07 &middot; Practical demonstration &middot; OpsFlow", body, pid="f7_ops_n3")


# ----------------------------------------------------------------------------
# MAILFLOW
# ----------------------------------------------------------------------------

def mail_intro():
    body = content(
        '<div style="display:grid;grid-template-columns:1.05fr .95fr;gap:50px">'
        "<div class='stack-20'>" + eyebrow("07.3 &middot; MailFlow") +
        heading("A shared inbox that<br/>knows what <span class='serif'>matters.</span>", "sm")
        + '<p class="lead">MailFlow reads each incoming message, decides what kind of message it is and how urgent it is, '
          "extracts the details a person would need, drafts a reply, and routes the thread — with a human still holding the "
          "send button where it counts.</p>"
        + '<div class="card accent-left"><div class="num-badge">THE PROBLEM</div>'
          '<p style="margin-top:9px;font-size:12.8px">Keyword filters fail on real language. A polite message about a broken '
          "delivery and a casual question about pricing look identical to a rule. Urgent matters sit behind routine ones, and "
          "staff spend their day sorting rather than answering.</p></div>"
        + '<div class="card champagne-left"><div class="num-badge">THE SOLUTION</div>'
          '<p style="margin-top:9px;font-size:12.8px">A model reads intent and urgency; the workflow turns that reading into a '
          "category, a priority, and structured fields; a Switch routes the thread; a draft is generated for review; and every "
          "decision is logged.</p></div>"
        + "</div>"
        '<div class="stack-14" style="padding-top:44px">'
        + '<div style="display:flex;gap:10px;flex-wrap:wrap">' + tag("Design spec", "red") + tag("9 stages")
        + tag("7 categories") + tag("Human approval") + "</div>"
        + '<div class="card flat" style="padding:0;overflow:hidden">'
          '<div style="padding:12px 17px;border-bottom:1px solid #262626" class="num-badge">THE TRIAGE LADDER</div>'
          '<div style="padding:14px 17px" class="stack-10">'
          '<div style="display:flex;justify-content:space-between;align-items:center"><span class="small" style="color:#ddd8cf">Urgent</span>'
          '<span class="tiny" style="color:#f08b8f">ESCALATE NOW &middot; ALERT A PERSON</span></div>'
          '<div class="hairline"></div>'
          '<div style="display:flex;justify-content:space-between;align-items:center"><span class="small" style="color:#ddd8cf">Complaint &middot; Billing</span>'
          '<span class="tiny" style="color:#C9A878">DRAFT &middot; REQUIRE APPROVAL</span></div>'
          '<div class="hairline"></div>'
          '<div style="display:flex;justify-content:space-between;align-items:center"><span class="small" style="color:#ddd8cf">Support &middot; Sales &middot; Meeting</span>'
          '<span class="tiny" style="color:#8fbf8f">DRAFT &middot; ROUTE TO TEAM</span></div>'
          '<div class="hairline"></div>'
          '<div style="display:flex;justify-content:space-between;align-items:center"><span class="small" style="color:#ddd8cf">General &middot; Invoice</span>'
          '<span class="tiny" style="color:#8a8a8a">LABEL &middot; LOG &middot; FILE</span></div>'
          "</div></div>"
        + '<div class="small" style="padding-left:2px">Classification decides the path. Confidence decides whether a person '
          "is involved.</div>"
        + "</div></div>"
        + '<div class="grid-3" style="margin-top:24px;border-top:1px solid #242424;padding-top:18px">'
        + card("WHAT IS LOGGED PER EMAIL", "Category, urgency, confidence, the extracted entities, whether a draft was "
               "approved or edited, and who approved it. This is what makes the inbox measurable.")
        + card("WHAT IS NEVER AUTOMATED", "Sending an unapproved reply to a complaint, promising a refund, or closing a "
               "thread. The workflow may prepare those actions; a person performs them.")
        + card("WHAT HAPPENS WHEN IT IS WRONG", "The category is corrected in the log, the thread is re-routed, and the "
               "prompt is revised. A misclassification is a process signal, not just an error.")
        + "</div>",
    )
    return pg("07 &middot; Practical demonstration &middot; MailFlow", body, pid="f7_mail")


def mail_arch():
    nodes = [
        {"id": "a", "name": "Gmail Trigger &mdash; New Email", "sub": "trigger", "x": 18, "y": 56, "w": 170, "tone": "red", "icon": "IN"},
        {"id": "b", "name": "Clean &amp; Prepare Email", "sub": "code", "x": 200, "y": 56, "w": 170, "icon": "{ }"},
        {"id": "c", "name": "Classify, Score &amp; Extract", "sub": "AI &middot; structured JSON", "x": 382, "y": 56, "w": 170, "tone": "ai", "icon": "AI"},
        {"id": "d", "name": "Route by Category", "sub": "switch &middot; 7 rules", "x": 564, "y": 56, "w": 170, "tone": "champagne", "icon": "SW"},
        {"id": "i", "name": "Escalate Urgent", "sub": "gmail &middot; alert", "x": 760, "y": 56, "w": 170, "tone": "grey", "icon": "!"},
        {"id": "e", "name": "Draft Reply", "sub": "AI &middot; tone", "x": 564, "y": 180, "w": 165, "tone": "ai", "icon": "AI"},
        {"id": "f", "name": "Human Approval", "sub": "wait &middot; review", "x": 745, "y": 180, "w": 165, "icon": "H"},
        {"id": "g", "name": "Send Reply", "sub": "gmail", "x": 926, "y": 180, "w": 165, "tone": "champagne", "icon": "OUT"},
        {"id": "h", "name": "Log Triage Record", "sub": "httpRequest", "x": 1107, "y": 180, "w": 165, "tone": "grey", "icon": "DB"},
    ]
    edges = [
        ("a", "b"), ("b", "c"), ("c", "d"), ("d", "e", "SUPPORT / BILLING"), ("e", "f"), ("f", "g"), ("g", "h"),
        ("d", "i", "URGENT"),
    ]
    cats = [
        ("Customer support", "Product question, fault report, how-to."),
        ("Sales inquiry", "Pricing, availability, proposal request."),
        ("Invoice / billing", "Document attached, payment reference, statement."),
        ("Complaint", "Escalated dissatisfaction, refund demand, service failure."),
        ("Meeting request", "Scheduling, availability, call request."),
        ("Urgent", "Outage, deadline today, safety or money at immediate risk."),
        ("General", "Everything else, including legitimate bulk mail."),
    ]
    cat_html = "".join(
        '<div style="display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #1f1f1f">'
        '<span style="font-size:10.4px;color:#ddd8cf;width:112px;flex:0 0 auto">%s</span>'
        '<span style="font-size:9.8px;color:#858585;line-height:1.4">%s</span></div>' % c for c in cats
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07.3 &middot; Architecture") +
        heading("Read, decide,<br/>draft, and <span class='serif'>route.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:350px;text-align:right">One model call produces category, urgency, and entities. '
          "Everything after it is routing and governance.</p></div>"
        + '<div style="margin-top:18px">'
        + canvas(nodes, edges, height=270, title="MAILFLOW &middot; INBOUND EMAIL TRIAGE",
                 meta="design schematic &middot; not an export")
        + "</div>"
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:14px">'
        + '<div class="card flat" style="padding:8px 16px"><div class="num-badge" style="padding:4px 0 6px">CATEGORY SET</div>%s</div>' % cat_html
        + '<div class="stack-10">' + _spec_note()
        + '<div class="card" style="padding:14px 16px"><div class="num-badge">TWO OUTPUTS FROM ONE READING</div>'
          '<div class="small" style="margin-top:7px">The same structured response carries <strong>category</strong> (which '
          "route) and <strong>urgency</strong> (how fast). Splitting them matters: a billing query can be low urgency, and a "
          "one-line message can be an outage.</div></div>"
        + "</div></div>",
    )
    return pg("07 &middot; Practical demonstration &middot; MailFlow", body, pid="f7_mail_arch")


def mail_nodes_1():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:14px">'
        "<div class='stack-12'>" + eyebrow("07.3 &middot; Node documentation 1 / 3") +
        heading("Detect, clean, and <span class='serif'>understand.</span>", "sm")
        + "</div>" + _spec_note() + "</div>"
        + node_doc("01", "Gmail Trigger &mdash; New Email", GMAIL_TRIGGER + " &middot; poll",
                   "Watches the shared inbox for new messages.",
                   "Triage has to start when the message arrives, not on a nightly batch.",
                   "Inbound message with sender, subject, body, thread id, and labels.",
                   "Polls the mailbox on an interval, downloads the plain-text and HTML body, and emits one item per message.",
                   "Raw email item including headers and body.",
                   "02 &mdash; Clean &amp; Prepare Email", "Defines latency and the first data shape.",
                   tag("Trigger", "red"))
        + '<div style="height:12px"></div>'
        + node_doc("02", "Clean &amp; Prepare Email", CODE + " &middot; JavaScript",
                   "Strips HTML, signatures, and quoted history; builds the model input.",
                   "Noise inflates token cost and confuses urgency classification.",
                   "Raw email HTML and plain text, sender, subject, and thread metadata.",
                   "Sanitises markup, removes the quoted chain and signature block, truncates very long threads, and assembles "
                   "a compact prompt payload.",
                   "Clean object with sender, subject, clean body, and received time.",
                   "03 &mdash; Classify, Score &amp; Extract", "Reduces the message to what the model should actually read.",
                   tag("Code", "champagne"))
        + '<div style="height:12px"></div>'
        + node_doc("03", "Classify, Score &amp; Extract", "AI node or HTTP Request &middot; model call",
                   "One model call that returns category, urgency, confidence, and key entities as JSON.",
                   "Intent and urgency are semantic, not keyword-shaped; a single structured call is cheaper than three.",
                   "Clean email text plus the category list and a strict output schema in the prompt.",
                   "Requests JSON output with category (one of seven), urgency (low/medium/high), a confidence value, a "
                   "one-sentence summary, and extracted fields such as order id or requested date.",
                   "Structured JSON accompanying the email item.",
                   "04 &mdash; Route by Category", "The interpretation step; everything downstream trusts this object.",
                   tag("AI call", "grey")),
    )
    return pg("07 &middot; Practical demonstration &middot; MailFlow", body, pid="f7_mail_n1")


def mail_nodes_2():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:6px">'
        "<div class='stack-12'>" + eyebrow("07.3 &middot; Node documentation 2 / 3") +
        heading("Routing and <span class='serif'>drafting.</span>", "sm")
        + "</div>" + _spec_note() + "</div>"
        + node_doc("04", "Route by Category", "n8n-nodes-base.switch &middot; 7 rules",
                   "Sends each message down the path that matches its category.",
                   "Support, billing, complaints, and urgent matters need different actions, owners, and SLAs.",
                   "The classified email with its category, urgency, and extracted entities.",
                   "Seven rules compare <span class='mono'>category</span>; an urgency override sends any high-urgency message "
                   "to the escalation output regardless of category.",
                   "One selected output per item &mdash; never more than one.",
                   "05 &mdash; Draft Reply / 09 &mdash; Escalate Urgent",
                   "The routing decision that makes the inbox multi-team instead of one queue.",
                   tag("Logic", "champagne"))
        + '<div style="height:12px"></div>'
        + node_doc("05", "Draft Reply", AI + " &middot; tone and policy",
                   "Generates a context-aware reply draft, not a send.",
                   "Most replies are routine but still need the customer's actual details, which a template cannot supply.",
                   "Clean thread, extracted entities, category, and the organisation's tone rules.",
                   "Prompts the model for a short, specific reply that references the real order or invoice reference, avoids "
                   "promises about refunds or timelines, and states what happens next.",
                   "Draft text stored on the thread, never sent automatically.",
                   "06 &mdash; Human Approval", "Converts model output into a proposal a person can accept.",
                   tag("AI call", "grey"))
        + '<div style="height:12px"></div>'
        + node_doc("06", "Human Approval", "n8n-nodes-base.wait &middot; approval",
                   "Pauses the workflow until a person approves, edits, or rejects the draft.",
                   "Customer-facing language sent without review is a reputational risk the automation cannot price.",
                   "Draft text, the original message, and the proposed recipient.",
                   "Waits on a resume URL or webhook; approval resumes with the approved text, rejection ends the run and "
                   "returns the thread to the team queue.",
                   "Approved reply body and an audit record of who approved it.",
                   "07 &mdash; Send Reply", "The governance boundary of the whole system.",
                   tag("Human", "red")),
    )
    return pg("07 &middot; Practical demonstration &middot; MailFlow", body, pid="f7_mail_n2")


def mail_nodes_3():
    body = content(
        '<div class="row between" style="align-items:flex-end;margin-bottom:14px">'
        "<div class='stack-12'>" + eyebrow("07.3 &middot; Node documentation 3 / 3") +
        heading("Send, log, and <span class='serif'>escalate.</span>", "sm")
        + "</div>" + _spec_note() + "</div>"
        + node_doc("07", "Send Reply", GMAIL + " &middot; reply in thread",
                   "Sends the approved text as a reply on the original thread.",
                   "Keeping the thread intact preserves context for the customer and the team.",
                   "Approved body, recipient, subject, and thread id.",
                   "Sends as a reply (not a new message), applies the sent label, and captures the message id.",
                   "Delivery receipt and message id.",
                   "08 &mdash; Log Triage Record", "The only customer-visible action in the workflow.",
                   tag("Output", "champagne"))
        + '<div style="height:12px"></div>'
        + node_doc("08", "Log Triage Record", HTTP + " &middot; POST /triage",
                   "Writes the triage decision and outcome to the analysis store.",
                   "Category and urgency are only useful if they can be counted and reviewed later.",
                   "Message metadata, category, urgency, confidence, extracted entities, draft, approval, and send status.",
                   "Posts one record per message with model name and timestamps, so the classification can be audited and "
                   "corrected.",
                   "Stored record id.",
                   "End of workflow", "Feeds the inbox and analytics views without a second data path.",
                   tag("Action", "champagne"))
        + '<div style="height:12px"></div>'
        + node_doc("09", "Escalate Urgent", GMAIL + " &middot; alert",
                   "Sends an immediate alert to the on-call owner for high-urgency messages.",
                   "An urgent message that waits behind a draft review has already failed.",
                   "High-urgency email, its summary, extracted deadline, and the original link.",
                   "Sends a short alert containing the sender, the summary, and what is at risk, and labels the thread for "
                   "tracking.",
                   "Alert delivery receipt.",
                   "End of branch", "The latency guarantee: urgent work bypasses drafting entirely.",
                   tag("Output", "red")),
    )
    return pg("07 &middot; Practical demonstration &middot; MailFlow", body, pid="f7_mail_n3")
