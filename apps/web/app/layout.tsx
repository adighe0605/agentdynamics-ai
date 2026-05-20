import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgentDynamics — The AI Employee for Automotive Dealerships",
  description:
    "AgentDynamics is the 24/7 AI sales rep that answers every call, qualifies every lead, and books test drives — while your team sleeps. Built for automotive dealerships.",
  openGraph: {
    title: "AgentDynamics — The AI Employee for Automotive Dealerships",
    description:
      "Answer every call. Qualify every lead. Book every appointment. The AI Employee built for auto dealers.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-cloud font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
