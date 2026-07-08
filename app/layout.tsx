import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SriZen Group | Building Tomorrow with Precision",
  description:
    "SriZen Group — premium construction, infrastructure, engineering and real estate development.",
  icons: {
    icon: "/assets/srizen-favicon.png",
    apple: "/assets/srizen-favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <PageLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
