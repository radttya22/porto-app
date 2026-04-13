import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Raden M Raditya — Portfolio",
  description:
    "Full-stack software engineer & researcher based in Jakarta, Indonesia. Building modern web applications with Next.js, React, and Node.js.",
  icons: {
    icon: '/lgo.ico',
    shortcut: '/lgo.ico',
  },
  keywords: [
    'Raditya', 'portfolio', 'full-stack developer', 'Next.js', 'React', 'software engineer', 'Indonesia',
  ],
  authors: [{ name: 'Raden Muhammad Raditya Rahman' }],
  openGraph: {
    title: "Raden Muhammad Raditya Rahman — Portfolio",
    description: "Full-stack software engineer & researcher. Building modern digital experiences.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
