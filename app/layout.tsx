import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAVR Decision Suite",
  description: "Clinical decision support for aortic stenosis evaluation and TAVR planning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-900 text-slate-200 antialiased">
        <Sidebar />
        <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
