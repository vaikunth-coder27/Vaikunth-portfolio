import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow all major AI crawlers
      { userAgent: "GPTBot", allow: "/" },           // ChatGPT
      { userAgent: "ChatGPT-User", allow: "/" },     // ChatGPT browsing
      { userAgent: "OAI-SearchBot", allow: "/" },    // OpenAI search
      { userAgent: "PerplexityBot", allow: "/" },    // Perplexity AI
      { userAgent: "Claude-Web", allow: "/" },       // Claude
      { userAgent: "ClaudeBot", allow: "/" },        // Anthropic
      { userAgent: "anthropic-ai", allow: "/" },     // Anthropic
      { userAgent: "Applebot", allow: "/" },         // Apple AI
      { userAgent: "Googlebot", allow: "/" },        // Google (incl. Gemini)
      { userAgent: "Google-Extended", allow: "/" },  // Google AI training
      { userAgent: "Bingbot", allow: "/" },          // Bing / Copilot
      { userAgent: "cohere-ai", allow: "/" },        // Cohere
      { userAgent: "YouBot", allow: "/" },            // You.com
    ],
    sitemap: "https://www.vaikunthguruswamy.uk/sitemap.xml",
  };
}
