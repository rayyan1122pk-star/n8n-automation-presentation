"""Assemble the AUTOMATE.AI deck, print it to PDF with Chrome, and set metadata."""

import os
import pathlib
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
OUT_DIR = ROOT / "output"
HTML_PATH = HERE / "deck.html"
PDF_PATH = OUT_DIR / "AUTOMATE_AI_Presentation.pdf"

from sections_a import cover, toc, s1_divider, s1_what, s1_manual, s1_fit, s2_divider, s2_anatomy, s2_pipeline, s2_examples
from sections_b import (
    s3_divider, s3_lifecycle, s3_worked, s3_branching,
    s4_divider, s4_components_one, s4_components_two, s4_components_three, s4_compose,
    s5_divider, s5_what, s5_compare, s5_apps,
    s6_divider, s6_advantages, s6_limits,
)
from sections_c import (
    s7_divider, s7_overview, fin_intro, fin_arch, fin_canvas, fin_nodes_1, fin_nodes_2,
    fin_nodes_3, fin_error, fin_intake, fin_output,
)
from sections_d import (
    ops_intro, ops_arch, ops_nodes_1, ops_nodes_2, ops_nodes_3,
    mail_intro, mail_arch, mail_nodes_1, mail_nodes_2, mail_nodes_3,
)
from sections_e import compare_systems, verification, glossary, takeaways, closing


CONTENT = [
    ("cover", cover()),
    ("s1", s1_divider()),
    ("s1-what", s1_what()),
    ("s1-manual", s1_manual()),
    ("s1-fit", s1_fit()),
    ("s2", s2_divider()),
    ("s2-anatomy", s2_anatomy()),
    ("s2-pipeline", s2_pipeline()),
    ("s2-examples", s2_examples()),
    ("s3", s3_divider()),
    ("s3-lifecycle", s3_lifecycle()),
    ("s3-worked", s3_worked()),
    ("s3-branching", s3_branching()),
    ("s4", s4_divider()),
    ("s4-one", s4_components_one()),
    ("s4-two", s4_components_two()),
    ("s4-three", s4_components_three()),
    ("s4-compose", s4_compose()),
    ("s5", s5_divider()),
    ("s5-what", s5_what()),
    ("s5-compare", s5_compare()),
    ("s5-apps", s5_apps()),
    ("s6", s6_divider()),
    ("s6-adv", s6_advantages()),
    ("s6-limits", s6_limits()),
    ("s7", s7_divider()),
    ("s7-overview", s7_overview()),
    ("f7_fin", fin_intro()),
    ("f7_arch", fin_arch()),
    ("f7_canvas", fin_canvas()),
    ("f7_n1", fin_nodes_1()),
    ("f7_n2", fin_nodes_2()),
    ("f7_n3", fin_nodes_3()),
    ("f7_error", fin_error()),
    ("f7_intake", fin_intake()),
    ("f7_output", fin_output()),
    ("f7_ops", ops_intro()),
    ("f7_ops_arch", ops_arch()),
    ("f7_ops_n1", ops_nodes_1()),
    ("f7_ops_n2", ops_nodes_2()),
    ("f7_ops_n3", ops_nodes_3()),
    ("f7_mail", mail_intro()),
    ("f7_mail_arch", mail_arch()),
    ("f7_mail_n1", mail_nodes_1()),
    ("f7_mail_n2", mail_nodes_2()),
    ("f7_mail_n3", mail_nodes_3()),
    ("f7_compare", compare_systems()),
    ("appendix-status", verification()),
    ("appendix-glossary", glossary()),
    ("s8-takeaways", takeaways()),
    ("closing", closing()),
]

TOC_SPEC = [
    ("01", "Introduction to n8n", "What it is, why it exists, where it fits", "s1"),
    ("02", "Workflow Automation", "Anatomy, the six-stage pipeline, examples", "s2"),
    ("03", "How Does n8n Work?", "Executions, data flow, branches, failures", "s3"),
    ("04", "Important Components of n8n", "Twelve building blocks, then composed", "s4"),
    ("05", "n8n and AI: Real-Life Applications", "What AI adds, rules vs models, use cases", "s5"),
    ("06", "Advantages of n8n", "Ten advantages, the trade, the limits", "s6"),
    ("07", "Practical Demonstration", "Three systems, documented", "s7"),
    ("&nbsp;&nbsp;7.1", "FinFlow", "Documents to verified ledger &middot; verified export", "f7_fin"),
    ("&nbsp;&nbsp;7.2", "OpsFlow", "Order to invoice and confirmation &middot; design spec", "f7_ops"),
    ("&nbsp;&nbsp;7.3", "MailFlow", "Inbox triage and approval &middot; design spec", "f7_mail"),
    ("08", "Key Takeaways &amp; Closing", "The synthesis, then the end", "s8-takeaways"),
    ("A1", "Asset &amp; Verification Status", "What is proven, what is pending", "appendix-status"),
    ("A2", "Glossary", "Eighteen terms used precisely", "appendix-glossary"),
]

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">'
    '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">'
    '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
    '<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">'
)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # TOC is inserted at index 1, so a content page currently at index i >= 1 lands on page i + 2.
    numbers = {pid: i + 2 for i, (pid, _) in enumerate(CONTENT) if i >= 1}
    toc_entries = [(num, title, sub, pid, numbers[pid]) for num, title, sub, pid in TOC_SPEC]
    toc_page = toc(toc_entries)

    pages = [CONTENT[0][1], toc_page] + [html for _, html in CONTENT[1:]]
    pages = [p.replace("{N}", str(i + 1)) for i, p in enumerate(pages)]

    css = (HERE / "deck.css").read_text(encoding="utf-8")
    html = (
        "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">"
        "<title>AUTOMATE.AI — Intelligent Automation. Endless Possibilities.</title>"
        + FONTS
        + "<style>" + css + "</style></head><body>"
        + "".join(pages)
        + "</body></html>"
    )
    HTML_PATH.write_text(html, encoding="utf-8")

    chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome):
        chrome = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if os.path.exists(PDF_PATH):
        PDF_PATH.unlink()

    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=20000",
        "--print-to-pdf=" + str(PDF_PATH),
        HTML_PATH.as_uri(),
    ]
    print("Rendering with:", chrome)
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=240)
    if proc.returncode != 0:
        print(proc.stdout[-3000:])
        print(proc.stderr[-3000:])
        sys.exit("Chrome print failed")

    from pypdf import PdfReader, PdfWriter

    reader = PdfReader(str(PDF_PATH))
    writer = PdfWriter()
    writer.append(reader)
    writer.add_metadata(
        {
            "/Title": "AUTOMATE.AI — Intelligent Automation. Endless Possibilities.",
            "/Author": "AUTOMATE.AI",
            "/Subject": "n8n, workflow automation and AI-powered automation, with three documented projects: FinFlow, OpsFlow and MailFlow",
            "/Keywords": "n8n, workflow automation, AI automation, FinFlow, OpsFlow, MailFlow, invoice processing, order automation, email triage",
            "/Creator": "AUTOMATE.AI presentation deck",
            "/Producer": "Chrome print / pypdf",
        }
    )

    # Bookmarks
    toc_page_index = 1
    outline = [
        ("Cover", 0, 0),
        ("Contents", toc_page_index, 0),
        ("01 — Introduction to n8n", numbers["s1"] - 1, 1),
        ("02 — Workflow Automation", numbers["s2"] - 1, 1),
        ("03 — How Does n8n Work?", numbers["s3"] - 1, 1),
        ("04 — Important Components of n8n", numbers["s4"] - 1, 1),
        ("05 — n8n and AI: Real-Life Applications", numbers["s5"] - 1, 1),
        ("06 — Advantages of n8n", numbers["s6"] - 1, 1),
        ("07 — Practical Demonstration", numbers["s7"] - 1, 1),
        ("    FinFlow", numbers["f7_fin"] - 1, 2),
        ("    OpsFlow", numbers["f7_ops"] - 1, 2),
        ("    MailFlow", numbers["f7_mail"] - 1, 2),
        ("08 — Key Takeaways & Closing", numbers["s8-takeaways"] - 1, 1),
        ("Appendix — Verification Status", numbers["appendix-status"] - 1, 1),
        ("Appendix — Glossary", numbers["appendix-glossary"] - 1, 1),
    ]
    parents = {0: None, 1: None, 2: None}
    for title, page_index, level in outline:
        if level == 0:
            parents[0] = writer.add_outline_item(title, page_index)
        elif level == 1:
            parents[1] = writer.add_outline_item(title, page_index, parent=parents[0])
        else:
            writer.add_outline_item(title, page_index, parent=parents[1])

    with open(PDF_PATH, "wb") as fh:
        writer.write(fh)

    print("Pages:", len(pages))
    print("PDF:", PDF_PATH, PDF_PATH.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
