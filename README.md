# AUTOMATE.AI — AI Automation Interactive Presentation Website

**Tagline:** *Intelligent Automation. Endless Possibilities.*  
**Theme:** *Transforming Repetitive Processes into Intelligent Workflows.*

An enterprise-grade interactive presentation website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lucide Icons**, and **Recharts**, showcasing three AI automation solutions (**FinFlow**, **OpsFlow**, and **MailFlow**) with a full-screen Presentation Mode and an executive 17-slide PDF export layout.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
Preview the print-formatted 17-slide PDF deck directly at [http://localhost:3000/print](http://localhost:3000/print).

---

## Populating Your Real Project Assets

### 1. Screenshots & Recorded Videos
Drop your real screenshots and `.mp4` screen recordings into `/public/media/`:

- **FinFlow**: `/public/media/finflow/`
  - `finflow-workflow.png` (and optional `finflow-workflow-2.png`)
  - `finflow-dashboard.png`, `finflow-reports.png`, `finflow-analytics.png`, `finflow-transactions.png`
  - `finflow-demo.mp4` (and optional `finflow-demo-poster.png`)
- **OpsFlow**: `/public/media/opsflow/`
  - `opsflow-workflow.png` (and optional `opsflow-workflow-2.png`)
  - `opsflow-dashboard.png`, `opsflow-orders.png`, `opsflow-inventory.png`
  - `opsflow-demo.mp4` (and optional `opsflow-demo-poster.png`)
- **MailFlow**: `/public/media/mailflow/`
  - `mailflow-workflow.png` (and optional `mailflow-workflow-2.png`)
  - `mailflow-dashboard.png`, `mailflow-inbox.png`, `mailflow-analytics.png`
  - `mailflow-demo.mp4` (and optional `mailflow-demo-poster.png`)

*(Fallback paths directly inside `/public/media/` are also automatically supported.)*

### 2. Updating Actual n8n Node Documentation
Open `src/content/solutions.ts` and replace each solution's `nodes` array with your exact n8n nodes (setting `isPlaceholder: false`). Every node supports:
- Exact node name, node type, execution sequence, category, and next connected node
- All 7 mandatory technical explanations (What it is, What it does, Why used, Input, Processing, Output, Next connection) + Key configuration parameters

### 3. Updating Your Active Technology Stack
Edit `src/content/tech-stack.ts` so only the tools and databases genuinely used in your implementation are marked as active.

---

## Presentation Mode & PDF Export

- **Presentation Mode**: Click **Present** in the top navigation bar to enter full-screen projector mode with keyboard navigation (`←` / `→` / `PageUp` / `PageDown` / `Esc`) and a minimal bottom section HUD.
- **Download PDF**: Click **Download PDF** in the navbar (or visit `/print`) to print or save the dedicated 17-slide A4 landscape presentation deck with proper page breaks, expanded node inventories, screenshots, and video poster frames.
