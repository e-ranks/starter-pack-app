import "./globals.css";
import { NavUser } from "@/components/nav-user";
import { Geist, Geist_Mono } from "next/font/google"
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toogle";
import { Providers } from "@/components/ui/provider";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const data = {
  user: {
    name: "Doomes",
    email: "doomes@gmail.com",
    avatar: "/avatars/shadcn.jpg",
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
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppSidebar />
          <SidebarInset>
            <div className="flex items-center justify-between w-full px-4">
              <div>
                <SidebarTrigger />
              </div>

              <div className="flex items-center gap-2">
                <ModeToggle />
                <NavUser user={data.user} />
              </div>
            </div>
            {children}
          </SidebarInset>
        </Providers>
      </body>
    </html>
  );
}
