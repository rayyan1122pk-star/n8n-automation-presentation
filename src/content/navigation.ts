export interface NavSection {
  number: string;
  id: string;
  label: string;
  shortLabel: string;
  surface: "white" | "subtle";
  description: string;
}

export interface AdditionalMaterialLink {
  id: string;
  label: string;
  description: string;
  tabKey: "impact" | "engine" | "ai-stack" | "inventories";
}

export const SITE_BRAND = {
  name: "N8N & AUTOMATION",
  presentationLabel: "N8N & AI AUTOMATION PRESENTATION",
  heroTitle: "n8n & Workflow Automation",
  heroDescription:
    "Explore the technology behind modern workflow automation, understand how n8n connects applications and processes, and discover how AI-powered automation transforms real-world business operations.",
  tagline: "Educational Technology Presentation",
};

/**
 * THE 9 FINAL MAIN PRESENTATION HEADINGS — IN EXACT ORDER.
 * These are the ONLY main presentation headings.
 */
export const MAIN_PRESENTATION_SECTIONS: NavSection[] = [
  {
    number: "01",
    id: "introduction-to-automation",
    label: "Introduction to Automation",
    shortLabel: "Introduction",
    surface: "white",
    description: "What automation is, why it matters, and problems with manual work",
  },
  {
    number: "02",
    id: "workflow-automation",
    label: "Workflow Automation",
    shortLabel: "Workflows",
    surface: "subtle",
    description: "How automated workflows connect triggers, processing, decisions, and results",
  },
  {
    number: "03",
    id: "how-does-n8n-work",
    label: "How Does n8n Work?",
    shortLabel: "How n8n Works",
    surface: "white",
    description: "Execution lifecycle, data movement between nodes, APIs, and AI collaboration",
  },
  {
    number: "04",
    id: "important-components",
    label: "Important Components of n8n",
    shortLabel: "Components",
    surface: "subtle",
    description: "Core building blocks: workflows, nodes, triggers, expressions, credentials, and errors",
  },
  {
    number: "05",
    id: "n8n-and-ai",
    label: "n8n and AI",
    shortLabel: "n8n & AI",
    surface: "white",
    description: "Integrating AI models, processing unstructured data, AI agents, and comparisons",
  },
  {
    number: "06",
    id: "real-life-applications",
    label: "Real-Life Applications",
    shortLabel: "Applications",
    surface: "subtle",
    description: "Nine practical ways organizations use n8n and AI automation",
  },
  {
    number: "07",
    id: "advantages-of-n8n",
    label: "Advantages of n8n",
    shortLabel: "Advantages",
    surface: "white",
    description: "Measurable business and technical strengths of workflow automation with n8n",
  },
  {
    number: "08",
    id: "practical-demonstration",
    label: "Practical Demonstration",
    shortLabel: "Demonstration",
    surface: "subtle",
    description: "Three real solutions: FinFlow, OpsFlow, and MailFlow",
  },
  {
    number: "09",
    id: "future-of-automation",
    label: "Future of Workflow Automation",
    shortLabel: "Future",
    surface: "white",
    description: "AI agents, autonomous workflows, human-AI collaboration, and closing message",
  },
];

/**
 * OPTIONAL ADDITIONAL MATERIAL — Kept separate from the 9 main headings.
 */
export const ADDITIONAL_MATERIAL_LINKS: AdditionalMaterialLink[] = [
  {
    id: "explore-further",
    label: "Explore Further",
    description: "Before & after AI impact charts and interactive comparisons",
    tabKey: "impact",
  },
  {
    id: "explore-further",
    label: "Technical Deep Dive",
    description: "9-stage workflow engine walkthrough and core glossary",
    tabKey: "engine",
  },
  {
    id: "explore-further",
    label: "Additional Examples",
    description: "Ten AI system components and editable technology stack",
    tabKey: "ai-stack",
  },
  {
    id: "explore-further",
    label: "Supporting Screenshots",
    description: "Consolidated node inventories and technical documentation",
    tabKey: "inventories",
  },
];
