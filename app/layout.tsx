import type { Metadata } from "next";
import "./globals.scss";
import { Inter_Tight } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "FocalPoint",
  description: "Checklist FocalPoint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
