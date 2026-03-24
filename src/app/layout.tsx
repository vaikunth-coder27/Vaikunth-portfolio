import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { PersonJsonLd, FaqJsonLd } from "@/components/JsonLd";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vaikunthguruswamy.uk"),

  title: {
    default: "Vaikunth Guruswamy — AI Researcher & ML Engineer",
    template: "%s | Vaikunth Guruswamy",
  },
  description:
    "AI Researcher and ML Engineer with MSc AI (Distinction) from the University of Edinburgh. Full-Stack Software Engineer at ZOT, UK. Expert in Machine Learning, Deep Learning, NLP, and LLMs.",

  keywords: [
    "Vaikunth Guruswamy",
    "AI Researcher",
    "Machine Learning Engineer",
    "NLP Engineer",
    "Deep Learning",
    "University of Edinburgh",
    "MSc Artificial Intelligence",
    "Full Stack Engineer",
    "LLM Research",
    "Python ML Engineer UK",
  ],

  authors: [{ name: "Vaikunth Guruswamy", url: "https://www.vaikunthguruswamy.uk" }],
  creator: "Vaikunth Guruswamy",

  alternates: {
    canonical: "https://www.vaikunthguruswamy.uk",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.vaikunthguruswamy.uk",
    siteName: "Vaikunth Guruswamy",
    title: "Vaikunth Guruswamy — AI Researcher & ML Engineer",
    description:
      "AI Researcher and ML Engineer with MSc AI (Distinction) from the University of Edinburgh. Full-Stack Software Engineer at ZOT, UK. Expert in Machine Learning, Deep Learning, and NLP.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vaikunth Guruswamy — AI Researcher & ML Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vaikunth Guruswamy — AI Researcher & ML Engineer",
    description:
      "AI Researcher and ML Engineer with MSc AI (Distinction) from the University of Edinburgh. Full-Stack Software Engineer at ZOT, UK.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased dark",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        cormorant.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <PersonJsonLd />
        <FaqJsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
