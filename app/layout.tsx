// app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/ui/provider";
import { LayoutShell } from "@/components/layout-shell"; // kita buat ini

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
