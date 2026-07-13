// Portfolio tool functions — the single source of truth for both the chat
// orchestrator (function calling) and, later, the MCP server.
// All data is read from src/data/portfolio-knowledge.json (grounded facts only).

import knowledge from '@/data/portfolio-knowledge.json'
import { sendNotification, type NotifyMeta } from '@/lib/ai/notify'

// ── Tool schemas (OpenAI / Groq function-calling format) ─────────────────────
export const toolSchemas = [
  {
    type: 'function' as const,
    function: {
      name: 'get_overview',
      description: "Broad summary of Vaikunth (title, specializations, availability, headline stats). Use for 'tell me about him'.",
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_experience',
      description: "Vaikunth's work experience (ZOT roles, Amazon dissertation). Optional company filter.",
      parameters: {
        type: 'object',
        properties: { company: { type: 'string', description: "Optional company, e.g. 'ZOT' or 'Amazon'." } },
        required: [],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_education',
      description: "Vaikunth's degrees, institutions, grades, and coursework.",
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_projects',
      description: "Vaikunth's 15 projects. Optional category: nlp | cv | ml | embedded | ethics.",
      parameters: {
        type: 'object',
        properties: { category: { type: 'string', description: 'Optional: nlp | cv | ml | embedded | ethics.' } },
        required: [],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_skills',
      description: "Vaikunth's technical skills by area.",
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_certifications',
      description: "Vaikunth's certifications (Anthropic MCP/Claude, and more).",
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_contact',
      description: "How to reach Vaikunth: email, LinkedIn, GitHub, availability.",
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'send_notification',
      description: "Email Vaikunth a message from the visitor. First collect their name, reply email, and message, then call.",
      parameters: {
        type: 'object',
        properties: {
          visitor_name: { type: 'string', description: "Visitor's name." },
          visitor_email: { type: 'string', description: "Visitor's reply email." },
          message: { type: 'string', description: 'The message for Vaikunth.' },
          subject: { type: 'string', description: 'Optional subject.' },
        },
        required: ['visitor_name', 'visitor_email', 'message'],
      },
    },
  },
]

// ── Tool executor ────────────────────────────────────────────────────────────
type ToolArgs = Record<string, unknown>

function norm(s: unknown): string {
  return String(s ?? '').toLowerCase().trim()
}

const categoryAliases: Record<string, string> = {
  nlp: 'nlp',
  'natural language processing': 'nlp',
  cv: 'cv',
  'computer vision': 'cv',
  vision: 'cv',
  ml: 'ml',
  'machine learning': 'ml',
  embedded: 'embedded',
  robotics: 'embedded',
  ethics: 'ethics',
  'responsible ai': 'ethics',
}

export function runTool(name: string, args: ToolArgs = {}): unknown {
  switch (name) {
    case 'get_overview':
      return {
        identity: knowledge.identity,
        byTheNumbers: knowledge.byTheNumbers,
        talkingPoints: knowledge.talkingPoints,
      }

    case 'get_experience': {
      const company = norm(args.company)
      if (!company) return knowledge.experience
      return knowledge.experience.filter((e) => norm(e.company).includes(company))
    }

    case 'get_education':
      return knowledge.education

    case 'get_projects': {
      const raw = norm(args.category)
      const cat = categoryAliases[raw]
      if (!cat) return knowledge.projects
      const matchesCat = (c: string) => {
        const cl = norm(c)
        return (
          (cat === 'nlp' && cl.includes('nlp')) ||
          (cat === 'cv' && cl.includes('computer vision')) ||
          (cat === 'ml' && cl.includes('machine learning')) ||
          (cat === 'embedded' && (cl.includes('robotics') || cl.includes('embedded'))) ||
          (cat === 'ethics' && cl.includes('responsible'))
        )
      }
      return {
        featured: knowledge.projects.featured.filter((p) => matchesCat(p.category)),
        catalogue: knowledge.projects.catalogue.filter((p) => matchesCat(p.category)),
      }
    }

    case 'get_skills':
      return knowledge.skills

    case 'get_certifications':
      return knowledge.certifications

    case 'get_contact':
      return { contact: knowledge.contact, availability: knowledge.identity.availability }

    default:
      return { error: `Unknown tool: ${name}` }
  }
}

// Async dispatcher used by the chat orchestrator and the MCP server.
// Read-only tools resolve synchronously via runTool; send_notification is awaited.
export async function executeTool(
  name: string,
  args: ToolArgs = {},
  meta: NotifyMeta = {},
): Promise<unknown> {
  if (name === 'send_notification') {
    return sendNotification(
      {
        visitor_name: args.visitor_name as string | undefined,
        visitor_email: args.visitor_email as string | undefined,
        message: args.message as string | undefined,
        subject: args.subject as string | undefined,
      },
      meta,
    )
  }
  return runTool(name, args)
}
