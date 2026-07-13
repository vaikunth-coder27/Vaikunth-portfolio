// Client-safe slash-command catalogue for the chat widget.
//
// Each command maps a typed "/name" to one of the grounded tools defined in
// src/lib/ai/tools.ts. Read-only get_* tools are "forceable": when the visitor
// invokes them, the API pins tool_choice to that function so the model is
// guaranteed to ground its answer in that data. send_notification is NOT
// forceable (it needs the visitor's name/email/message first), so it merely
// nudges the model to start collecting those.
//
// NOTE: This file must stay free of server-only imports — it's bundled to the
// client for the command palette. Keep the `tool` names in sync with tools.ts.

export interface ChatCommand {
  /** Typed after the slash, e.g. "experience" → "/experience". Lowercase. */
  cmd: string
  /** Tool this command routes to (see src/lib/ai/tools.ts). */
  tool: string
  /** Short label shown in the palette. */
  label: string
  /** One-line hint shown next to the label. */
  hint: string
  /** Sent to the model when the visitor invokes the command with no text. */
  fallbackPrompt: string
  /** When true, the API forces tool_choice to this tool on the first round. */
  forceable: boolean
}

export const CHAT_COMMANDS: ChatCommand[] = [
  {
    cmd: 'overview',
    tool: 'get_overview',
    label: 'overview',
    hint: 'Quick summary of Vaikunth',
    fallbackPrompt: 'Give me a quick overview of Vaikunth.',
    forceable: true,
  },
  {
    cmd: 'experience',
    tool: 'get_experience',
    label: 'experience',
    hint: 'Work history & roles',
    fallbackPrompt: "Tell me about Vaikunth's work experience.",
    forceable: true,
  },
  {
    cmd: 'projects',
    tool: 'get_projects',
    label: 'projects',
    hint: 'ML / AI project portfolio',
    fallbackPrompt: "Walk me through Vaikunth's projects.",
    forceable: true,
  },
  {
    cmd: 'skills',
    tool: 'get_skills',
    label: 'skills',
    hint: 'Technical skill set',
    fallbackPrompt: "What are Vaikunth's technical skills?",
    forceable: true,
  },
  {
    cmd: 'education',
    tool: 'get_education',
    label: 'education',
    hint: 'Degrees & coursework',
    fallbackPrompt: "Tell me about Vaikunth's education.",
    forceable: true,
  },
  {
    cmd: 'certifications',
    tool: 'get_certifications',
    label: 'certifications',
    hint: 'Anthropic MCP & more',
    fallbackPrompt: 'What certifications does Vaikunth hold?',
    forceable: true,
  },
  {
    cmd: 'contact',
    tool: 'get_contact',
    label: 'contact',
    hint: 'Email, LinkedIn, GitHub',
    fallbackPrompt: 'How can I get in touch with Vaikunth?',
    forceable: true,
  },
  {
    cmd: 'send_email',
    tool: 'send_notification',
    label: 'send_email',
    hint: 'Send Vaikunth a message',
    fallbackPrompt: "I'd like to send Vaikunth a message.",
    forceable: false,
  },
]

/** Only read-only tools may be pinned via tool_choice on the server. */
export const FORCEABLE_TOOLS: readonly string[] = CHAT_COMMANDS.filter(
  (c) => c.forceable,
).map((c) => c.tool)

const COMMAND_BY_NAME = new Map(CHAT_COMMANDS.map((c) => [c.cmd, c]))

export interface ParsedSlash {
  /** The message text to send to the model (question, or fallbackPrompt). */
  text: string
  /** The tool the visitor asked to route to, if any. */
  tool?: string
}

// Splits a raw input like "/experience what did he do at Amazon?" into the
// resolved tool and the trailing question. Returns the input unchanged (no
// tool) when it isn't a recognised slash command.
export function parseSlashCommand(raw: string): ParsedSlash {
  const trimmed = raw.trimStart()
  if (!trimmed.startsWith('/')) return { text: raw.trim() }

  const match = /^\/([a-z_]+)\s*([\s\S]*)$/i.exec(trimmed)
  if (!match) return { text: raw.trim() }

  const command = COMMAND_BY_NAME.get(match[1].toLowerCase())
  if (!command) return { text: raw.trim() }

  const rest = match[2].trim()
  return { text: rest || command.fallbackPrompt, tool: command.tool }
}
