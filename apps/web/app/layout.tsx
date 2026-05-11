import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AgentDynamics — AI Employee for Automotive",
  description:
    "Official AgentDynamics dashboard. Answer every call, qualify every lead, book every appointment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cloud text-ink antialiased lg:pb-12">
        {children}
        <Footer />
      </body>
    </html>
  );
}
