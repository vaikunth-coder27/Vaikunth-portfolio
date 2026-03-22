import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
  title: "Vaikunth Guruswamy — AI Researcher & ML Engineer",
  description:
    "AI-focused researcher with expertise in Machine Learning, Deep Learning, and NLP. MSc AI, University of Edinburgh.",
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
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        cormorant.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
