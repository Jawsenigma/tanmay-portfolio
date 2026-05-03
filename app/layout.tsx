import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jawsenigma.netlify.app"),
  title: {
    default: "Tanmay Saxena — AI/ML Engineer",
    template: "%s · Tanmay Saxena",
  },
  description:
    "AI/ML engineer building production LLM pipelines, real-time computer vision, and sub-second voice systems. MS CS, University of Florida.",
  openGraph: {
    title: "Tanmay Saxena — AI/ML Engineer",
    description:
      "AI/ML engineer building production LLM pipelines, real-time computer vision, and sub-second voice systems.",
    url: "https://jawsenigma.netlify.app",
    siteName: "Tanmay Saxena",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Saxena — AI/ML Engineer",
    description:
      "AI/ML engineer building production LLM pipelines, real-time computer vision, and sub-second voice systems.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
