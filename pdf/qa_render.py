"""Render every deck page to a PNG for visual QA."""

import pathlib
import re
import subprocess

HERE = pathlib.Path(__file__).resolve().parent
QA = HERE / "qa"
QA.mkdir(exist_ok=True)
html = (HERE / "deck.html").read_text(encoding="utf-8")

head = html.split("<body>")[0] + "<body>"
sections = re.split(r'(?=<section class="page)', html.split("<body>")[1])

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

count = 0
for i, sec in enumerate(sections):
    if not sec.startswith('<section class="page'):
        continue
    count += 1
    page_html = head + sec.replace("</body></html>", "") + "</body></html>"
    f = QA / ("page-%02d.html" % count)
    f.write_text(page_html, encoding="utf-8")
    out = QA / ("page-%02d.png" % count)
    subprocess.run(
        [
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--force-device-scale-factor=0.75",
            "--window-size=1600,900",
            "--virtual-time-budget=6000",
            "--screenshot=" + str(out),
            f.as_uri(),
        ],
        capture_output=True,
        text=True,
        timeout=90,
    )

print("rendered", count)
