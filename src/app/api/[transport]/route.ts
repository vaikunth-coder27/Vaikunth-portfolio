import { createMcpHandler } from 'mcp-handler'
import { z } from 'zod'
import { runTool } from '@/lib/ai/tools'
import { checkRateLimit, clientIp } from '@/lib/ai/ratelimit'

// Real, connectable MCP server exposing Vaikunth's portfolio as tools.
// Endpoint (Streamable HTTP): /api/mcp
// Add it to Claude Desktop / Cursor / MCP Inspector to chat with his portfolio.
//
// SECURITY: this is a PUBLIC, unauthenticated endpoint, so it exposes ONLY
// read-only tools (all data here is already public on the site). The email tool
// (send_notification) is intentionally NOT exposed here — it's available only via
// the website chat, where we have session + IP context and tighter limits.
//
// Both this server and the website chat share ONE source of truth: runTool()
// in src/lib/ai/tools.ts, which reads src/data/portfolio-knowledge.json.

export const maxDuration = 60

// Wrap a runTool result in the MCP content shape.
function asContent(result: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_overview',
      {
        title: 'Get Overview',
        description:
          "High-level summary of who Vaikunth Guruswamy is: title, tagline, location, specializations, availability, and headline stats.",
        inputSchema: {},
      },
      async () => asContent(runTool('get_overview')),
    )

    server.registerTool(
      'get_experience',
      {
        title: 'Get Experience',
        description:
          "Vaikunth's professional/work experience (ZOT Engineering roles, Amazon dissertation). Optionally filter by company.",
        inputSchema: {
          company: z.string().optional().describe("Optional company name filter, e.g. 'ZOT' or 'Amazon'."),
        },
      },
      async ({ company }) => asContent(runTool('get_experience', { company })),
    )

    server.registerTool(
      'get_education',
      {
        title: 'Get Education',
        description: "Vaikunth's education: degrees, institutions, grades, and relevant coursework.",
        inputSchema: {},
      },
      async () => asContent(runTool('get_education')),
    )

    server.registerTool(
      'get_projects',
      {
        title: 'Get Projects',
        description:
          "Vaikunth's projects (15 total). Optionally filter by category: nlp, cv (computer vision), ml (machine learning), embedded (robotics), or ethics.",
        inputSchema: {
          category: z
            .string()
            .optional()
            .describe('Optional category filter: nlp | cv | ml | embedded | ethics.'),
        },
      },
      async ({ category }) => asContent(runTool('get_projects', { category })),
    )

    server.registerTool(
      'get_skills',
      {
        title: 'Get Skills',
        description: "Vaikunth's technical skills grouped by area.",
        inputSchema: {},
      },
      async () => asContent(runTool('get_skills')),
    )

    server.registerTool(
      'get_certifications',
      {
        title: 'Get Certifications',
        description: "Vaikunth's certifications and credentials (Anthropic MCP/Claude certs, and more).",
        inputSchema: {},
      },
      async () => asContent(runTool('get_certifications')),
    )

    server.registerTool(
      'get_contact',
      {
        title: 'Get Contact',
        description: "How to reach Vaikunth: email, LinkedIn, GitHub, and current availability.",
        inputSchema: {},
      },
      async () => asContent(runTool('get_contact')),
    )
    // NOTE: send_notification is intentionally NOT registered here (read-only public server).
  },
  {
    serverInfo: { name: 'vaikunth-portfolio', version: '1.0.0' },
  },
  {
    basePath: '/api',
    maxDuration: 60,
    disableSse: true,
    verboseLogs: process.env.NODE_ENV !== 'production',
  },
)

// Rate-limit the public MCP endpoint (per-IP + global) before handling.
function rateLimited(h: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    const { ok } = await checkRateLimit(clientIp(req))
    if (!ok) {
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '30' },
      })
    }
    return h(req)
  }
}

const guarded = rateLimited(handler)
export { guarded as GET, guarded as POST, guarded as DELETE }
