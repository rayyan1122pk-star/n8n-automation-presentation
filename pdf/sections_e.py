"""Three-system comparison, verification status, glossary, takeaways, closing."""

from deck_kit import brandmark, card, content, divider, eyebrow, heading, pg, tag


def compare_systems():
    rows = [
        ("Business problem", "Unstructured financial documents", "Order-to-invoice operations", "Shared-inbox triage"),
        ("Trigger", "Webhook &middot; Gmail poller", "Order webhook", "Gmail poller"),
        ("Intelligence", "Gemma extraction + VAT rules", "Deterministic stock rules", "Model classification &amp; drafting"),
        ("Decision", "Valid / review (error workflow)", "Valid &rarr; in stock &rarr; fulfil", "Category &rarr; route; urgency &rarr; escalate"),
        ("Action", "Ledger write, sheet sync", "Stock reservation, invoice, email", "Draft, approval, send, log"),
        ("Human point", "Retry budget exhausted", "Backorder or invalid order", "Approval before sending"),
        ("Documentation", "21 nodes from export", "9 designed stages", "9 designed stages"),
    ]
    trs = "".join(
        '<div style="display:grid;grid-template-columns:1fr 1.25fr 1.25fr 1.25fr;gap:14px;padding:10px 0;border-bottom:1px solid #1f1f1f">'
        '<div style="font-family:var(--font-mono);font-size:8.6px;letter-spacing:.1em;text-transform:uppercase;color:#7d7d7d">%s</div>'
        '<div style="font-size:11.2px;color:#cfc9bf">%s</div><div style="font-size:11.2px;color:#cfc9bf">%s</div>'
        '<div style="font-size:11.2px;color:#cfc9bf">%s</div></div>' % r
        for r in rows
    )
    head = ('<div style="display:grid;grid-template-columns:1fr 1.25fr 1.25fr 1.25fr;gap:14px;padding:0 0 10px">'
            '<div class="tiny">DIMENSION</div><div style="font-family:var(--font-display);font-size:14px;color:#fff">FinFlow</div>'
            '<div style="font-family:var(--font-display);font-size:14px;color:#fff">OpsFlow</div>'
            '<div style="font-family:var(--font-display);font-size:14px;color:#fff">MailFlow</div></div>')
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("07 &middot; Synthesis") +
        heading("Three systems,<br/>one <span class='serif'>discipline.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:360px;text-align:right">The tools differ. The engineering questions — what '
          "starts it, what proves it, who signs off — do not.</p></div>"
        + '<div style="margin-top:26px">%s%s</div>' % (head, trs)
        + '<div class="grid-3" style="margin-top:22px">'
        + card("01", "Every project has one deterministic gate", "FinFlow recalculates VAT; OpsFlow compares stock; MailFlow "
               "checks category against a fixed list. The model never has the final word.")
        + card("02", "Every project has a named human point", "Retry exhaustion, backorder, or approval before send. Name the "
               "person and the moment before you automate.")
        + card("03", "Every project logs its decisions", "Execution records, triage rows, and order statuses are what make the "
               "system reviewable after the demonstration ends.")
        + "</div>"
        + '<div class="card flat" style="margin-top:20px;border-left:2px solid #C9A878">'
          '<div class="small"><strong>What the three systems have in common is not the AI.</strong> It is the order of operations: '
          "receive, interpret, prove, commit, inform. The model changes what can be interpreted; the rest is ordinary, "
          "careful engineering.</div></div>",
    )
    return pg("07 &middot; Practical demonstration", body, pid="f7_compare")


def verification():
    rows = [
        ("FinFlow workflow exports (4 JSON files)", "Supplied &mdash; node names, types, parameters and connections verified",
         "Verified", "champagne"),
        ("FinFlow dashboard / reports / analytics images", "Not supplied &mdash; no screenshots were available",
         "Pending", "grey"),
        ("FinFlow demonstration recording", "Not supplied &mdash; no video file or public URL",
         "Pending", "grey"),
        ("OpsFlow workflow export", "Not supplied &mdash; documented as a design specification",
         "Pending", "red"),
        ("OpsFlow orders / inventory screenshots", "Not supplied", "Pending", "grey"),
        ("MailFlow workflow export", "Not supplied &mdash; documented as a design specification",
         "Pending", "red"),
        ("MailFlow inbox / analytics screenshots", "Not supplied", "Pending", "grey"),
        ("Business performance metrics", "None claimed anywhere in this deck", "N/A", "grey"),
        ("Illustrative charts", "Not used &mdash; no chart in this deck presents invented data", "N/A", "grey"),
    ]
    trs = "".join(
        '<div style="display:grid;grid-template-columns:1.1fr 1.9fr .5fr;gap:16px;padding:10px 0;border-bottom:1px solid #1f1f1f;align-items:center">'
        '<div style="font-size:11.6px;color:#e3ded5">%s</div>'
        '<div style="font-size:10.8px;line-height:1.45;color:#8d8d8d">%s</div>'
        '<div>%s</div></div>' % (a, b, tag(c, t)) for a, b, c, t in rows
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("Appendix &middot; Verification") +
        heading("What is verified,<br/>what is <span class='serif'>pending.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:380px;text-align:right">A technical document should state its evidence. '
          "Every claim in the three case studies can be traced to one of these rows.</p></div>"
        + '<div style="margin-top:24px;display:grid;grid-template-columns:1.5fr .5fr;gap:30px">'
        + '<div>%s</div>' % trs
        + '<div class="stack-12">'
        + '<div class="card"><div class="num-badge">INTEGRATION NOTE</div><div class="small" style="margin-top:8px">The exported '
          "FinFlow workflows call application endpoints named <span class='mono'>/upload-email</span>, "
          "<span class='mono'>/idempotent-row-sync</span>, and <span class='mono'>/trigger-processing</span>. The current "
          "dashboard build exposes <span class='mono'>/api/documents/upload</span>, <span class='mono'>/api/google-sheets/sync</span>, "
          "and <span class='mono'>/api/automation/jobs</span>. Confirm endpoint parity before a live run.</div></div>"
        + '<div class="card"><div class="num-badge">SECURITY NOTE</div><div class="small" style="margin-top:8px">Two exported '
          "nodes carry provider keys as literal values. They are redacted in this deck and should be moved into n8n "
          "credentials before the workflow is shared or demonstrated.</div></div>"
        + '<div class="card flat"><div class="num-badge">TO COMPLETE THE DECK</div><div class="small" style="margin-top:8px">'
          "Supply the marked screenshots, the OpsFlow and MailFlow exports, and one demo URL. The placeholder pages are "
          "already sized for them.</div></div>"
        + "</div></div>",
    )
    return pg("Appendix", body, pid="appendix-status")


def glossary():
    terms = [
        ("Workflow", "A saved graph of nodes and connections that n8n executes."),
        ("Node", "A single step with one job, configured by parameters."),
        ("Trigger", "The node that starts a run: webhook, schedule, app event, or manual."),
        ("Action", "A node that changes state in an external system."),
        ("Item", "One JSON object (plus optional binary) passed between nodes."),
        ("Expression", "A dynamic value written as {{ }} and evaluated per item."),
        ("Credential", "An encrypted secret record referenced by nodes, kept out of workflow JSON."),
        ("Execution", "One recorded run, including per-node input and output."),
        ("IF / Switch", "Nodes that route items to different outputs by condition."),
        ("Webhook", "An HTTP endpoint that starts a workflow when called."),
        ("Polling", "A trigger that checks a source on a schedule instead of being pushed to."),
        ("Idempotency", "Designing a write so repeating it does not duplicate the result."),
        ("Schema", "The agreed shape of a data object; what makes validation possible."),
        ("Prompt", "The instruction and data sent to a language model."),
        ("Human-in-the-loop", "A deliberate pause for a person to approve or correct."),
        ("Error workflow", "A separate workflow invoked when another workflow fails."),
        ("Sub-workflow", "A workflow called as a node by another workflow."),
        ("Rate limit", "A provider's cap on requests; retries and backoff exist for it."),
        ("Backoff", "Waiting longer between successive retry attempts."),
        ("Payload", "The body of data a node sends or receives."),
        ("Polling interval", "How often a polling trigger checks its source."),
        ("Structured output", "A model response constrained to a schema so it can be parsed."),
        ("Service role key", "A high-privilege API key that must never be exposed to a browser."),
        ("Endpoint", "A specific URL in an API that performs one operation."),
    ]
    cells = "".join(
        '<div style="border-bottom:1px solid #1f1f1f;padding:8px 0"><div style="font-size:11.8px;color:#e7e2da">%s</div>'
        '<div style="font-size:10.4px;line-height:1.45;color:#858585;margin-top:3px">%s</div></div>' % t
        for t in terms
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("Appendix &middot; Terminology") +
        heading("The words this deck<br/>uses <span class='serif'>precisely.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:360px;text-align:right">Eighteen terms that cover almost every question an '
          "audience asks after the demonstration.</p></div>"
        + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0 26px;margin-top:22px">%s</div>' % cells
        + '<div class="card flat" style="margin-top:20px;border-left:2px solid #C9A878">'
          '<div class="small"><strong>Two pairs are worth separating:</strong> a <em>trigger</em> starts a run; an <em>action</em> '
          "changes something. An <em>execution</em> is one run; a <em>workflow</em> is the definition that produces many. Most "
          "confusion in an automation review comes from mixing those up.</div></div>",
    )
    return pg("Appendix", body, pid="appendix-glossary")


def takeaways():
    items = [
        ("01", "Automation is a definition, not a tool",
         "The six stages — trigger, collect, process, decide, act, result — describe every workflow in this deck. "
         "Learning the shape is more durable than learning one platform."),
        ("02", "n8n makes the definition visible",
         "A canvas, typed connections, expressions, and an execution log turn a business rule into something that can be "
         "reviewed line by line."),
        ("03", "AI belongs in the middle, not at the top",
         "A model is strongest at reading unstructured input. Keep deterministic checks after it, and keep a person before "
         "irreversible actions."),
        ("04", "The unglamorous parts decide success",
         "Validation, idempotency, retry budgets, and credential handling are what separate a demonstration from a system."),
        ("05", "Every automation needs an owner",
         "APIs change, models drift, and mailboxes move. A workflow without a named owner is a future incident."),
        ("06", "The honest measure is effort moved, not magic",
         "These systems do not remove judgement. They move human effort from retyping to specifying, sampling, and approving."),
    ]
    cards = "".join(
        '<div class="card" style="padding:18px 20px"><div class="num-badge">%s</div>'
        '<div style="margin-top:8px;font-family:var(--font-display);font-size:17px;font-weight:600;line-height:1.25;color:#f4f0e9">%s</div>'
        '<div class="small" style="margin-top:8px">%s</div></div>' % i for i in items
    )
    body = content(
        '<div class="row between" style="align-items:flex-end">'
        "<div class='stack-16'>" + eyebrow("08 &middot; Key takeaways") +
        heading("Six things worth<br/>remembering <span class='serif'>tomorrow.</span>", "sm")
        + "</div>"
        + '<p class="small" style="max-width:340px;text-align:right">If the audience remembers nothing else from this '
          "presentation, it should be these.</p></div>"
        + '<div class="grid-3" style="margin-top:28px;gap:14px">%s</div>' % cards
        + '<div class="card flat" style="margin-top:20px;border-left:2px solid #C9A878">'
          '<div class="small"><strong>The closing argument:</strong> automation is not about replacing people with software. '
          "It is about removing the handoffs that make people behave like software — retyping, copying, forwarding — so the "
          "judgement stays with the person and the repetition stays with the machine.</div></div>"
        + '<div style="margin-top:20px;border-top:1px solid #242424;padding-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">'
        '<div><div class="tiny" style="color:#E5484D">IF YOU REMEMBER ONE DIAGRAM</div>'
        '<div class="small" style="margin-top:6px">Trigger, collect, process, decide, act, result. Sketch it before you open '
        "the editor.</div></div>"
        '<div><div class="tiny" style="color:#E5484D">IF YOU BUILD ONE THING</div>'
        '<div class="small" style="margin-top:6px">A version of FinFlow with one vendor and one document type. Narrow scope '
        "is what makes a demonstration credible.</div></div>"
        '<div><div class="tiny" style="color:#E5484D">IF YOU TEACH ONE THING</div>'
        '<div class="small" style="margin-top:6px">Show the execution log. It is the clearest proof that the automation is '
        "real and that its reasoning is inspectable.</div></div>"
        + "</div>",
    )
    return pg("08 &middot; Key takeaways", body, pid="s8-takeaways")


def closing():
    body = (
        '<div class="grid-bg"></div><div class="glow" style="top:60%;opacity:.8"></div>'
        '<div style="position:relative;z-index:2;display:flex;flex-direction:column;height:100%;padding:56px 80px 46px">'
        '<div class="row between" style="align-items:center">' + brandmark(13)
        + '<span class="tag grey">End of presentation</span></div>'
        '<div style="margin:auto 0">'
        '<div class="eyebrow red" style="margin-bottom:22px">n8n &middot; Workflow Automation &middot; AI</div>'
        '<h1 style="margin:0;font-family:var(--font-display);font-weight:600;font-size:76px;line-height:1;letter-spacing:-.04em;color:#fff">'
        'Intelligent Automation.'
        '<span class="serif" style="display:block;font-size:84px;margin-top:4px">Endless possibilities.</span></h1>'
        '<p style="margin:28px 0 0;max-width:720px;font-size:17px;line-height:1.62;color:#a8a8a8">Three systems, one method: '
        "define the process, make every step visible, prove the numbers in code, and keep a human where the consequence is "
        "real.</p></div>"
        '<div style="display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #262626;padding-top:18px">'
        '<div class="plate"><span class="pip"></span>AUTOMATE.AI &middot; TECHNOLOGY PRESENTATION &middot; 2026</div>'
        '<div class="tiny" style="text-align:right">FinFlow &middot; OpsFlow &middot; MailFlow<br/>Documented with n8n workflow exports</div>'
        "</div></div></div>"
    )
    return '<section class="page" id="closing" style="padding:0">%s</section>' % body
