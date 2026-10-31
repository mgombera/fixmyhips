import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StatusBar } from "@/components/StatusBar";
import { PageViews } from "@/components/PageViews";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://fixmyhips.com"),
  title: {
    default: "Fix My Hips | Hip Arthroscopy Guide | Dr. Mufaddal Gombera",
    template: "%s | Fix My Hips",
  },
  description:
    "Your personal guide before and after hip arthroscopy with Dr. Mufaddal Gombera: what to do today, your recovery timeline, exercises and when to call.",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#313E6B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink print:hidden"
        >
          Skip to content
        </a>
        <SiteHeader />
        <StatusBar />
        <main id="main">{children}</main>
        <SiteFooter />
        <PageViews />
      </body>
    </html>
  );
}
