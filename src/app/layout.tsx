import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Stack Developer",
  description: "I help founders turn their ideas into reality",
  keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Ankit" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ankit | Full Stack Developer",
    description: "I help founders turn their ideas into reality",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit | Full Stack Developer",
    description: "I help founders turn their ideas into reality",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
