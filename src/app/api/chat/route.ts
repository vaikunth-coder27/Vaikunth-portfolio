import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are an AI assistant on Vaikunth Guruswamy's portfolio website. Here's what you know about him:

- AI Researcher, ML Engineer, and NLP Specialist
- MSc from the University of Edinburgh (82% Distinction)
- BE from Anna University (CGPA 9.5/10)
- Interned at Amazon
- Built 10+ AI/ML projects spanning NLP, computer vision, and machine learning
- Expert in Python, PyTorch, TensorFlow, Transformers, LLMs, and more

Help visitors learn about his work, experience, skills, and projects. Be concise, friendly, and engaging. Keep responses under 150 words unless a detailed technical answer is needed. If asked about contact or hiring, direct them to the Contact section of the portfolio.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://vaikunth.vercel.app',
        'X-Title': 'Vaikunth Guruswamy Portfolio',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenRouter error:', err)
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.'

    return NextResponse.json({ content })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
