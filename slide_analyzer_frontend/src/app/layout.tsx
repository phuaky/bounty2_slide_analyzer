import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "../components/Providers";
import Navbar from "../components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SlideAI",
  description: "AI-powered slide analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${inter.className} font-sans`}>
        <Providers>
          <main className="container mx-auto mt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
