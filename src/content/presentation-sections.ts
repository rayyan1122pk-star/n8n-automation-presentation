export const SECTION_1_INTRO = {
  lead: "Automation is the use of software to carry out repetitive, multi-step tasks automatically—freeing people to focus on decisions, creativity, and human service.",
  whatIsAutomation:
    "In everyday work, teams spend hours moving information from one place to another: downloading email attachments, typing invoice totals into spreadsheets, checking inventory counts, or sending confirmation replies. Automation replaces those repetitive manual handoffs with reliable software processes that run consistently every time.",
  whyImportant:
    "As businesses grow, the volume of documents, orders, and messages increases faster than staff capacity. Without automation, routine administration consumes valuable working hours and slows down response times for customers and teams.",
  manualProblems: [
    {
      title: "Time-consuming repetition",
      detail: "Staff repeat the same copy-and-paste actions hundreds of times each week.",
    },
    {
      title: "Human transcription errors",
      detail: "Typing numbers, dates, and emails manually leads to typos, duplicates, and missed entries.",
    },
    {
      title: "Slow response and bottlenecks",
      detail: "Work waits in inboxes or folders whenever a specific team member is busy or offline.",
    },
    {
      title: "Lack of visibility",
      detail: "Scattered spreadsheets and messages make it difficult to track what has been completed.",
    },
  ],
  basicExamples: [
    {
      title: "Automatic receipt filing",
      detail: "Saving emailed receipts directly into an organized accounting folder.",
    },
    {
      title: "Instant order confirmations",
      detail: "Sending a formatted confirmation message the moment a customer places an order.",
    },
    {
      title: "Scheduled daily summaries",
      detail: "Compiling key daily sales or support numbers and delivering a clean morning brief.",
    },
  ],
};

export const SECTION_2_WORKFLOW = {
  lead: "Workflow automation links multiple applications and steps into a single continuous pipeline so work moves automatically from start to finish.",
  whatIsWorkflow:
    "A workflow is simply a defined sequence of steps required to complete a business task—from the initial event that starts the work to the final recorded outcome. When automated, software coordinates every step and passes clean data from one application to the next.",
  howAppsCommunicate:
    "Modern applications communicate over the internet using structured messages (typically JSON) sent through APIs and webhooks. Instead of a person copying information between email, spreadsheets, and databases, an automation platform transfers the exact fields directly and securely.",
  pipelineStages: [
    {
      step: "1",
      name: "Trigger",
      role: "Starts the workflow",
      explanation: "An event occurs—such as a file upload, a new customer order, or an incoming email.",
    },
    {
      step: "2",
      name: "Processing",
      role: "Prepares and reads data",
      explanation: "The workflow extracts text, cleans fields, or asks an AI model to interpret the content.",
    },
    {
      step: "3",
      name: "Decision",
      role: "Checks rules and branches",
      explanation: "Conditional logic verifies required values, checks stock levels, or determines urgency.",
    },
    {
      step: "4",
      name: "Action",
      role: "Updates connected tools",
      explanation: "Records are saved to a database, invoices are generated, or drafts are created.",
    },
    {
      step: "5",
      name: "Result",
      role: "Delivers final outcome",
      explanation: "Dashboards reflect fresh data and stakeholders receive clear notifications.",
    },
  ],
  manualToAutomated: [
    {
      task: "Receiving an invoice PDF",
      before: "Open email, download PDF, type vendor and amount into a spreadsheet.",
      after: "Upload triggers extraction, AI categorizes fields, and ledger updates automatically.",
    },
    {
      task: "Processing a customer order",
      before: "Check stock manually, edit inventory sheet, write an invoice, email the buyer.",
      after: "Order webhook validates items, checks stock, updates inventory, and sends invoice.",
    },
    {
      task: "Triaging incoming emails",
      before: "Read every message manually to spot urgent issues and draft standard replies.",
      after: "AI classifies topic and urgency, prepares a reply draft, and alerts staff on high priority.",
    },
  ],
};

export const SECTION_3_HOW_N8N_WORKS = {
  lead: "n8n is a visual workflow automation platform that connects applications, APIs, databases, and AI models into clear, step-by-step pipelines.",
  executionSteps: [
    {
      step: "01",
      title: "A trigger event starts an execution",
      detail: "When a webhook fires, a file is uploaded, or an email arrives, n8n creates a tracked execution run and captures the incoming data.",
    },
    {
      step: "02",
      title: "Structured data moves between connected nodes",
      detail: "Each node receives JSON data (and optional files) from the previous node, performs one focused task, and passes its output forward along the connecting line.",
    },
    {
      step: "03",
      title: "APIs connect external services securely",
      detail: "Using encrypted credentials, n8n communicates with services like Gmail, PostgreSQL, Google Sheets, or custom dashboards over standard HTTPS APIs.",
    },
    {
      step: "04",
      title: "AI models add understanding inside the pipeline",
      detail: "At any point in the flow, n8n can send extracted text to an AI model (such as Gemini) to interpret unstructured content, classify intent, and return clean structured data.",
    },
  ],
  aiBasics: {
    title: "Supporting Concept: How AI Systems Work Alongside n8n",
    summary:
      "At a practical level, an AI language model takes unstructured input (like an email or invoice text) along with clear instructions, analyzes the meaning and context, and returns structured information or drafted text.",
    components: [
      {
        name: "Input Context",
        detail: "Raw text extracted from a document, message, or order request.",
      },
      {
        name: "Prompt Instructions",
        detail: "Clear rules telling the AI what fields to extract or how to classify the item.",
      },
      {
        name: "AI Model Inference",
        detail: "The model reads nuance, formats, and intent without needing rigid keyword templates.",
      },
      {
        name: "Structured Output",
        detail: "Clean JSON fields returned back to n8n so downstream nodes can validate and store them.",
      },
    ],
  },
};

export interface N8nComponentGroup {
  id: string;
  groupTitle: string;
  groupDescription: string;
  items: {
    name: string;
    whatItDoes: string;
    whyItMatters: string;
    example: string;
  }[];
}

/**
 * All 12 Important Components of n8n grouped cleanly into 3 focused, readable tabs.
 */
export const SECTION_4_COMPONENTS: N8nComponentGroup[] = [
  {
    id: "core-structure",
    groupTitle: "Core Structure",
    groupDescription: "The fundamental blocks that define how every workflow starts and performs work.",
    items: [
      {
        name: "Workflows",
        whatItDoes: "The complete visual canvas connecting triggers, logic, and actions from start to finish.",
        whyItMatters: "Keeps an entire business process documented, inspectable, and repeatable in one place.",
        example: "FinFlow's complete invoice processing pipeline from upload to financial reporting.",
      },
      {
        name: "Nodes",
        whatItDoes: "Individual modular blocks that each perform one clear task inside a workflow.",
        whyItMatters: "Breaking a complex process into focused nodes makes testing and maintenance simple.",
        example: "One node extracts text from a PDF; the next node sends that text to Gemini AI.",
      },
      {
        name: "Triggers",
        whatItDoes: "Specialized starting nodes that listen for events or schedules to launch a workflow.",
        whyItMatters: "Eliminates manual start buttons so workflows run automatically the moment work arrives.",
        example: "A Webhook Trigger listening for a new order or a Mail Trigger detecting an incoming email.",
      },
      {
        name: "Actions",
        whatItDoes: "Nodes that perform real work in connected tools once data is processed and validated.",
        whyItMatters: "Turns insights into concrete operational results without human copy-and-paste.",
        example: "Updating an inventory table, generating a PDF invoice, or creating an email reply draft.",
      },
    ],
  },
  {
    id: "data-and-logic",
    groupTitle: "Data Flow & Logic",
    groupDescription: "How information travels, transforms, and branches intelligently between nodes.",
    items: [
      {
        name: "Connections",
        whatItDoes: "Directed lines linking the output of one node to the input of the next node.",
        whyItMatters: "Defines the exact execution order and makes data movement visually clear to non-technical viewers.",
        example: "Linking the AI extraction node directly into the Validation IF node.",
      },
      {
        name: "Expressions",
        whatItDoes: "Dynamic references that pull specific values from earlier nodes into later steps.",
        whyItMatters: "Allows every execution to use live customer names, totals, or dates automatically.",
        example: "Inserting {{ $json.customerName }} and {{ $json.invoiceTotal }} into a confirmation email.",
      },
      {
        name: "Conditions",
        whatItDoes: "IF and Switch decision nodes that route items down different paths based on rules.",
        whyItMatters: "Enables real business logic—such as separating valid records from items needing human review.",
        example: "If stock is available, confirm the order; otherwise, route to a backorder alert.",
      },
      {
        name: "Data Handling",
        whatItDoes: "Transforming, cleaning, merging, and structuring JSON objects and binary files across steps.",
        whyItMatters: "Ensures every downstream database or API receives clean, consistently formatted fields.",
        example: "Stripping HTML clutter from an email body before passing clean text to the AI classifier.",
      },
    ],
  },
  {
    id: "integrations-and-reliability",
    groupTitle: "Integrations & Reliability",
    groupDescription: "How n8n connects safely to external systems, tracks runs, and recovers from errors.",
    items: [
      {
        name: "Credentials",
        whatItDoes: "Encrypted storage inside n8n for API keys, OAuth2 tokens, and database logins.",
        whyItMatters: "Keeps sensitive passwords completely separate from workflow logic and easy to rotate securely.",
        example: "Authenticating Gmail and Gemini API safely without exposing secret keys on the canvas.",
      },
      {
        name: "APIs & Integrations",
        whatItDoes: "Pre-built app connectors plus universal HTTP Request nodes for talking to any web service.",
        whyItMatters: "Connects almost any business tool—even custom internal dashboards—into one unified workflow.",
        example: "Sending categorized financial records via REST API to a custom reporting database.",
      },
      {
        name: "Executions",
        whatItDoes: "Recorded history of every workflow run, including timestamps, status, and node-level data.",
        whyItMatters: "Provides a transparent audit trail so teams can verify exactly what happened on any run.",
        example: "Inspecting Execution #142 to confirm which invoice fields were extracted and saved.",
      },
      {
        name: "Error Handling",
        whatItDoes: "Built-in retries, fallback paths, and Error Trigger workflows that catch failures cleanly.",
        whyItMatters: "Prevents silent failures when an external API times out or a corrupted file is uploaded.",
        example: "Automatically retrying a rate-limited API call and notifying an admin if a PDF cannot be read.",
      },
    ],
  },
];

export const SECTION_5_N8N_AND_AI = {
  lead: "Combining n8n's structured reliability with modern AI models allows workflows to understand messy real-world documents, emails, and requests.",
  pillars: [
    {
      title: "Connecting Gemini & Modern AI APIs",
      detail: "n8n connects directly to AI models such as Google Gemini or OpenAI through dedicated AI nodes and authenticated REST APIs, sending text and receiving structured JSON back in seconds.",
    },
    {
      title: "Understanding Unstructured Text & Data",
      detail: "Unlike traditional scripts that break when an invoice layout changes or a customer writes informally, AI reads context, extracts exact entities, and normalizes data automatically.",
    },
    {
      title: "Classification & Response Drafting",
      detail: "AI models categorize incoming messages, score urgency levels, summarize long threads, and draft accurate, polite replies ready for human approval.",
    },
    {
      title: "AI Agents Inside Automated Workflows",
      detail: "AI agents can select tools, look up records, and make multi-step reasoning decisions within guardrails defined by n8n's validation and approval nodes.",
    },
  ],
  comparison: [
    {
      aspect: "How it decides",
      traditional: "Follows rigid, pre-written rules only",
      aiPowered: "Combines AI contextual understanding with structured validation rules",
    },
    {
      aspect: "Supported inputs",
      traditional: "Requires clean, predictable tables or fixed forms",
      aiPowered: "Processes PDFs, receipts, natural emails, and varied layouts",
    },
    {
      aspect: "Handling edge cases",
      traditional: "Stops or fails when wording or layout changes",
      aiPowered: "Adapts to new phrasing and flags uncertain items for review",
    },
    {
      aspect: "Output quality",
      traditional: "Identical static templates every run",
      aiPowered: "Tailored classifications, summaries, and context-aware drafts",
    },
  ],
};

export interface RealLifeAppItem {
  number: string;
  title: string;
  description: string;
  example: string;
  imageUrl: string;
  localPath: string;
}

/**
 * All 9 Real-Life Applications explicitly listed in Part 1 Section 6.
 */
export const SECTION_6_APPLICATIONS: RealLifeAppItem[] = [
  {
    number: "01",
    title: "Customer Support Automation",
    description: "Read incoming tickets, detect urgency and sentiment, look up account details, and route critical issues immediately.",
    example: "Urgent outage reports escalate to engineers while routine questions get draft replies.",
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/support.jpg",
  },
  {
    number: "02",
    title: "Email Automation",
    description: "Classify high-volume inboxes by intent, extract key details, apply labels, and prepare human-reviewed response drafts.",
    example: "Separating billing, sales, and urgent requests automatically every minute.",
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/email.jpg",
  },
  {
    number: "03",
    title: "Document Processing",
    description: "Convert uploaded PDFs, forms, and scanned receipts into clean structured data without manual re-typing.",
    example: "Extracting vendor details, dates, and line items from supplier invoices.",
    imageUrl: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/documents.jpg",
  },
  {
    number: "04",
    title: "Accounting Automation",
    description: "Categorize financial transactions, verify totals, organize ledger entries, and feed up-to-date financial summaries.",
    example: "Maintaining real-time revenue and expense records ready for monthly review.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/accounting.jpg",
  },
  {
    number: "05",
    title: "Order Processing",
    description: "Validate incoming customer orders, calculate pricing, generate invoices, and send instant order confirmations.",
    example: "Moving a new web order from submission to confirmed invoice in seconds.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/ecommerce.jpg",
  },
  {
    number: "06",
    title: "Inventory Management",
    description: "Verify live product availability on every order, deduct stock automatically, and alert teams before items sell out.",
    example: "Preventing overselling by synchronizing stock counts across every purchase.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/inventory.jpg",
  },
  {
    number: "07",
    title: "Appointment Booking",
    description: "Coordinate calendar availability, send automated confirmations and reminders, and handle rescheduling smoothly.",
    example: "Clinics and service teams reducing missed appointments with timely reminders.",
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/appointments.jpg",
  },
  {
    number: "08",
    title: "Lead Management",
    description: "Capture inquiries from forms or emails, summarize prospect needs with AI, and assign leads directly to sales teams.",
    example: "Logging qualified prospects in a CRM with zero delay after form submission.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/sales.jpg",
  },
  {
    number: "09",
    title: "Business Reporting",
    description: "Gather live figures from databases and operational tools to compile clear weekly or monthly management reports.",
    example: "Generating executive KPI digests automatically every Monday morning.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    localPath: "/media/applications/reporting.jpg",
  },
];

/**
 * All 10 Advantages of n8n organized clearly with a visual comparison matrix.
 */
export const SECTION_7_ADVANTAGES = {
  lead: "n8n combines the speed of visual workflow building with the power, flexibility, and cost control of custom engineering.",
  advantages: [
    {
      title: "Time Savings",
      detail: "Tasks that previously took minutes or hours per item complete automatically in seconds.",
    },
    {
      title: "Reduced Manual Work",
      detail: "Eliminates repetitive data entry, file sorting, and routine copy-and-paste tasks.",
    },
    {
      title: "Improved Efficiency",
      detail: "Workflows run continuously 24/7 without waiting for handoffs between departments.",
    },
    {
      title: "Accuracy & Consistency",
      detail: "Every document, order, and email follows the exact same validation rules and audit trail.",
    },
    {
      title: "Flexibility",
      detail: "Supports branching, loops, merging, and multi-step pipelines tailored to real operations.",
    },
    {
      title: "Customization",
      detail: "Allows custom JavaScript/Python logic and HTTP requests whenever off-the-shelf blocks are not enough.",
    },
    {
      title: "Integrations",
      detail: "Connects seamlessly to hundreds of popular business apps, databases, and any REST API.",
    },
    {
      title: "Scalability",
      detail: "Handles growing volumes of documents, orders, and messages without linearly adding clerical workload.",
    },
    {
      title: "AI Capabilities",
      detail: "Native AI nodes make it straightforward to embed language models, classifiers, and agents into workflows.",
    },
    {
      title: "Cost Efficiency",
      detail: "Fair-code and self-hostable architecture avoids the steep per-task pricing of many closed SaaS tools.",
    },
  ],
  comparisonTable: [
    {
      criteria: "Speed & Availability",
      manual: "Limited to working hours; slows under load",
      rigidTools: "Fast, but limited to basic triggers",
      n8nAi: "24/7 instant execution across complex flows",
    },
    {
      criteria: "Unstructured Data (PDFs / Emails)",
      manual: "Requires human reading every time",
      rigidTools: "Often breaks without strict templates",
      n8nAi: "Native AI extraction, classification & drafting",
    },
    {
      criteria: "Customization & Ownership",
      manual: "Depends on individual habits",
      rigidTools: "Locked inside vendor limits",
      n8nAi: "Full visual transparency, custom code & self-hosting",
    },
    {
      criteria: "Long-Term Cost at Scale",
      manual: "High ongoing labor cost",
      rigidTools: "Per-task fees climb rapidly",
      n8nAi: "Highly cost-efficient execution model",
    },
  ],
};

export const SECTION_9_FUTURE = {
  lead: "Workflow automation is evolving from simple task connectors into intelligent operational backbones where humans and AI collaborate seamlessly.",
  pillars: [
    {
      title: "AI Agents & Autonomous Workflows",
      detail: "Workflows are moving beyond fixed step sequences toward goal-aware AI agents that can gather context, verify facts across tools, and propose complete actions.",
    },
    {
      title: "Intelligent Decision-Making",
      detail: "Real-time data combined with language and reasoning models enables faster prioritization, anomaly detection, and proactive problem solving.",
    },
    {
      title: "Human-AI Collaboration",
      detail: "The strongest future systems keep humans in control—automating routine extraction and drafting while routing critical approvals and relationships to people.",
    },
    {
      title: "Cross-Industry Transformation",
      detail: "From accounting and e-commerce to healthcare administration and education, intelligent workflows allow small teams to operate with enterprise reliability.",
    },
  ],
  closingStatement:
    "Workflow automation with n8n and AI is not about replacing people—it is about removing repetitive friction so organizations can work with greater clarity, speed, and purpose.",
};
