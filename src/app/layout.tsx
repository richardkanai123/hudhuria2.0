import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Custom/nav/Header";
import Footer from "@/components/Custom/nav/Footer";

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

export const metadata: Metadata = {
  title: "Hudhuria",
  description: "Hudhuria is an event listing website that connects organisers to an audience, enable purchasing of tickets, sends notifications of upcoming events.",
  keywords: ["events", "organizers", "tickets", "audience", "Hudhuria", "events", "tickets", "organisers", "audience", "notifications", "upcoming events", "listing website"],
  openGraph: {
    title: "Hudhuria",
    description: "Hudhuria is an event listing website that connects organisers to an audience, enable purchasing of tickets, sends notifications of upcoming events.",
    url: "https://www.hudhuria.com",
    siteName: "Hudhuria",
    images: [
      {
        url: "https://www.hudhuria.com/images/hudhuria.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "Hudhuria",
    description: "Hudhuria is an event listing website that connects organisers to an audience, enable purchasing of tickets, sends notifications of upcoming events.",
    card: "summary_large_image",
    images: [
      "https://www.hudhuria.com/images/hudhuria.png",
    ],
  },
  facebook: {
    admins: ["richardkanai", "Hudhuria"]
  },
  applicationName: "Hudhuria",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // author: "Hudhuria",
  authors: [
    {
      name: "Richard Kanai",
      url: "https://github.com/richardkanai123",
    },
    {
      name: "Hudhuria",
      url: "https://www.hudhuria.com",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full `}
      >
        <div className="container mx-auto max-w-screen-2xl relative w-full min-h-screen max-h-fit">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
