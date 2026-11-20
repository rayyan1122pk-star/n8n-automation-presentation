"""Reusable page furniture and components for the AUTOMATE.AI deck."""

BRAND = "AUTOMATE.AI"
FOOTLINE = "AUTOMATE.AI — Intelligent Automation. Endless Possibilities."


def pg(section, body, cls="", pid=""):
    """A standard 1600x900 page with rail + footer. {N} is replaced with the page number."""
    id_attr = ' id="%s"' % pid if pid else ""
    return (
        '<section class="page %s"%s>' % (cls, id_attr)
        + '<div class="rail"><div class="rail-left"><span class="dot"></span><span>%s</span>'
        '<span class="rail-sep">/</span><span>%s</span></div>'
        '<div>n8n &middot; Workflow Automation &middot; AI</div></div>' % (BRAND, section)
        + body
        + '<div class="foot"><div>%s</div><div class="foot-right"><span>%s</span>'
        '<span class="page-no">{N}</span></div></div>' % (FOOTLINE, section)
        + "</section>"
    )


def content(*blocks, style=""):
    return '<div class="content"%s>%s</div>' % (
        ' style="%s"' % style if style else "",
        "".join(blocks),
    )


def brandmark(size=13, color="#f5f3ef"):
    return (
        '<div style="font-family:var(--font-mono);font-size:%dpx;letter-spacing:0.34em;'
        'color:%s;text-transform:uppercase">AUTOMATE<span style="color:#e5484d">.</span>AI</div>'
        % (size, color)
    )


def eyebrow(text, tone=""):
    return '<div class="eyebrow %s">%s</div>' % (tone, text)


def heading(text, size="", extra=""):
    return '<h1 class="display %s" %s>%s</h1>' % (size, extra, text)


def lead(text, style=""):
    return '<p class="lead"%s>%s</p>' % (' style="%s"' % style if style else "", text)


def divider(num, title, sub, contents, pid=""):
    """contents: list of (code, label, description)."""
    items = "".join(
        '<div class="d-item"><div class="d-idx">%s</div><div><div class="d-name">%s</div>'
        '<div class="d-desc">%s</div></div></div>' % c for c in contents
    )
    body = (
        '<div class="grid-bg"></div>'
        '<div class="glow" style="left:72%%;top:42%%;width:900px;height:700px;opacity:0.85"></div>'
        '<div class="d-inner">'
        '<div class="row between" style="align-items:center">%s'
        '<div class="tag red">Section %s / 08</div></div>' % (brandmark(12), num)
        + '<div style="display:grid;grid-template-columns:1.12fr .88fr;gap:64px;align-items:center;flex:1;padding:28px 0">'
        '<div><div class="d-num">%s</div>'
        '<div style="margin-top:22px;display:flex;align-items:center;gap:16px"><span style="width:34px;height:2px;background:#E5484D"></span>'
        '<span class="tiny">Chapter %s</span></div>'
        '<h1 style="margin-top:14px">%s</h1><div class="d-sub">%s</div></div>' % (num, num, title, sub)
        + '<div><div class="tiny" style="letter-spacing:.24em;color:#787878;margin-bottom:12px">IN THIS SECTION</div>'
        '<div class="d-index">%s</div></div></div>' % items
        + '<div class="foot">'
        '<div>%s</div><div class="foot-right"><span>Section %s</span>'
        '<span class="page-no">{N}</span></div></div>' % (FOOTLINE, num)
        + "</div></section>"
    )
    id_attr = ' id="%s"' % pid if pid else ""
    return '<section class="page divider-page"%s>%s</section>' % (id_attr, body)


def cmp_table(rows, left="Manual process", right="Automated workflow"):
    head = (
        '<div class="cmp-head"><div>%s</div><div>%s</div></div>' % (left, right)
    )
    body = "".join(
        '<div class="cmp-row"><div>%s</div><div>%s</div></div>' % (a, b) for a, b in rows
    )
    return '<div class="cmp">%s%s</div>' % (head, body)


def pipeline(stages):
    """stages: list of (name, description)"""
    out = []
    for i, (name, desc) in enumerate(stages, 1):
        out.append(
            '<div class="stage"><div class="idx">%02d</div><div class="name">%s</div>'
            '<div class="desc">%s</div></div>' % (i, name, desc)
        )
    return '<div class="pipeline">%s</div>' % "".join(out)


def card(a, b, c=None, tone="", style=""):
    if c in ("red", "champagne", "grey"):
        tone = c
        c = None
    if c is None:
        num, title, text = "", a, b
    else:
        num, title, text = a, b, c
    cls = "card"
    if tone == "red":
        cls += " accent-left"
    elif tone == "champagne":
        cls += " champagne-left"
    numhtml = '<div class="num-badge">%s</div>' % num if num else ""
    return (
        '<div class="%s" style="%s">%s<div class="stack-8">'
        '<h3>%s</h3><p>%s</p></div></div>' % (cls, style, numhtml, title, text)
    )


def tag(text, tone="grey"):
    return '<span class="tag %s">%s</span>' % (tone, text)


def canvas(nodes, edges, height=300, title="WORKFLOW CANVAS", meta="", pid=""):
    """nodes: dicts with id, name, sub, x, y, tone, icon. edges: (src, dst, label|None)."""
    pos = {}
    node_html = []
    for n in nodes:
        w = n.get("w", 152)
        h = n.get("h", 54)
        pos[n["id"]] = (n["x"], n["y"], w, h)
        node_html.append(
            '<div class="nnode %s" style="left:%dpx;top:%dpx;width:%dpx">'
            '<div class="nn-icon">%s</div><div><div class="nn-name">%s</div>'
            '<div class="nn-sub">%s</div></div></div>'
            % (
                n.get("tone", ""),
                n["x"],
                n["y"],
                w,
                n.get("icon", "&#9679;"),
                n["name"],
                n.get("sub", ""),
            )
        )

    paths = []
    labels = []
    for e in edges:
        src, dst = e[0], e[1]
        label = e[2] if len(e) > 2 else None
        x1, y1, w1, h1 = pos[src]
        x2, y2, w2, h2 = pos[dst]
        ax, ay = x1 + w1, y1 + h1 / 2
        bx, by = x2, y2 + h2 / 2
        if abs((x1 + w1 / 2) - (x2 + w2 / 2)) < 30 and by > ay:
            sx = int(x1 + w1 / 2)
            tx = int(x2 + w2 / 2)
            sy = y1 + h1
            ty = y2
            d = "M %d %d C %d %d, %d %d, %d %d" % (sx, sy, sx, sy + 26, tx, ty - 26, tx, ty)
        elif bx >= ax:
            dx = max(30, (bx - ax) * 0.5)
            d = "M %d %d C %d %d, %d %d, %d %d" % (ax, ay, ax + dx, ay, bx - dx, by, bx, by)
        else:
            # route backwards below the nodes
            cy = max(y1, y2) + h1 + 46
            d = (
                "M %d %d C %d %d, %d %d, %d %d L %d %d C %d %d, %d %d, %d %d"
                % (
                    ax,
                    ay,
                    ax + 40,
                    ay,
                    ax + 40,
                    cy,
                    ax + 60,
                    cy,
                    bx - 60,
                    cy,
                    bx - 40,
                    cy,
                    bx - 40,
                    by,
                    bx,
                    by,
                )
            )
        paths.append(
            '<path d="%s" fill="none" stroke="#545454" stroke-width="1.4" marker-end="url(#arw)"/>' % d
        )
        if label:
            mx = (ax + bx) / 2
            my = (ay + by) / 2 - 7
            labels.append(
                '<text x="%.0f" y="%.0f" fill="#9a9a9a" font-family="JetBrains Mono, monospace" '
                'font-size="9.5" letter-spacing="0.08em">%s</text>' % (mx, my, label)
            )

    marker = (
        '<defs><marker id="arw" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" '
        'orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#545454"/></marker></defs>'
    )
    svg = (
        '<svg class="canvas-svg" viewBox="0 0 1440 %d" preserveAspectRatio="none">%s%s%s</svg>'
        % (height, marker, "".join(paths), "".join(labels))
    )
    return (
        '<div class="canvas" style="height:%dpx">'
        '<div class="canvas-bar"><i></i><i></i><i></i><span class="canvas-title">%s</span>'
        '<span class="canvas-meta">%s</span></div>%s%s</div>'
        % (height, title, meta, svg, "".join(node_html))
    )


def node_doc(seq, name, ntype, what, why, inp, proc, out, nxt, role, tags=""):
    fields = [
        ("What it is", what),
        ("Why it is used", why),
        ("Input", inp),
        ("Processing", proc),
        ("Output", out),
        ("Connects to", nxt),
        ("Role in flow", role),
    ]
    fhtml = "".join(
        '<div class="field"><div class="fl">%s</div><div class="fv">%s</div></div>' % (k, v)
        for k, v in fields
    )
    return (
        '<div class="node-doc"><div class="node-doc-head">'
        '<div class="nd-seq">NODE %s</div><div style="flex:1"><h3>%s</h3>'
        '<div class="nd-type">%s</div></div><div>%s</div></div>'
        '<div class="node-fields">%s</div></div>'
        % (seq, name, ntype, tags, fhtml)
    )


def slot(title, note, height=260):
    return (
        '<div class="slot" style="height:%dpx"><div class="slot-title">%s</div>'
        '<div class="slot-note">%s</div></div>' % (height, title, note)
    )


def stat(label, value):
    return (
        '<div class="kpi"><div class="kpi-label">%s</div><div class="kpi-value">%s</div></div>'
        % (label, value)
    )
