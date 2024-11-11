import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Custom/nav/Header";
import Footer from "@/components/Custom/nav/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionProvider from "@/components/Custom/AuthComponents/SessionProvider";


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


  authors: [
    {
      name: "Richard Kanai",
      url: "https://github.com/richardkanai123",
    },
    {
      name: "Hudhuria",
      url: "https://github.com/richardkanai123/hudhuria2.0",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <SessionProvider>
        <body
          className={` font-sans antialiased w-full `}
        >
          <div className="container mx-auto max-w-screen-2xl relative w-full min-h-screen max-h-fit">
            <Header />
            {children}
            <Footer />
          </div>
          <ToastContainer />
        </body>
      </SessionProvider>
    </html>
  );
}
