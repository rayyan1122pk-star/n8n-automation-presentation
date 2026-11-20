# AUTOMATE.AI — Local Media Asset Guide

Drop your actual screenshots and recorded demonstration videos into the folders below.
The website automatically detects real files when present and displays clean architectural placeholders whenever a file has not yet been supplied.

For convenience, each media slot checks both its organized subfolder path (recommended) and the root `/media/` path.

## Folder Structure

### `/public/media/hero/`
- Optional hero visual overrides if desired.

### `/public/media/architecture/`
- Optional architecture diagrams if you wish to replace or supplement the built-in diagrams.

### `/public/media/finflow/` (or `/public/media/`)
- `finflow-workflow.png` — Main n8n workflow screenshot for FinFlow
- `finflow-workflow-2.png` — Optional secondary workflow screenshot (multi-workflow support)
- `finflow-dashboard.png` — Main FinFlow dashboard screenshot
- `finflow-reports.png` — Financial reports view screenshot
- `finflow-analytics.png` — Financial analytics view screenshot
- `finflow-transactions.png` — Transactions ledger screenshot
- `finflow-demo.mp4` — Recorded walkthrough video for FinFlow
- `finflow-demo-poster.png` — Optional custom video poster frame

### `/public/media/opsflow/` (or `/public/media/`)
- `opsflow-workflow.png` — Main n8n workflow screenshot for OpsFlow
- `opsflow-workflow-2.png` — Optional secondary workflow screenshot
- `opsflow-dashboard.png` — Main OpsFlow dashboard screenshot
- `opsflow-orders.png` — Orders management view screenshot
- `opsflow-inventory.png` — Inventory tracking view screenshot
- `opsflow-demo.mp4` — Recorded walkthrough video for OpsFlow
- `opsflow-demo-poster.png` — Optional custom video poster frame

### `/public/media/mailflow/` (or `/public/media/`)
- `mailflow-workflow.png` — Main n8n workflow screenshot for MailFlow
- `mailflow-workflow-2.png` — Optional secondary workflow screenshot
- `mailflow-dashboard.png` — Main MailFlow dashboard screenshot
- `mailflow-inbox.png` — Smart inbox triage view screenshot
- `mailflow-analytics.png` — Email analytics view screenshot
- `mailflow-demo.mp4` — Recorded walkthrough video for MailFlow
- `mailflow-demo-poster.png` — Optional custom video poster frame

### `/public/media/applications/`
- Optional domain photography (`accounting.jpg`, `ecommerce.jpg`, `finance.jpg`, `healthcare.jpg`, `education.jpg`, `support.jpg`, `sales.jpg`, `hr.jpg`).

## Editing Node Documentation
Open `src/content/solutions.ts` to update node inventories, 7-point node explanations, configuration parameters, and workflow metadata to match your actual exported n8n workflow JSON.
