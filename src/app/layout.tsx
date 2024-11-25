import "./globals.css";
import Footer from "@/components/Custom/nav/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionProvider from "@/components/Custom/AuthComponents/SessionProvider";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={` font-sans antialiased w-full `}
      >
        <SessionProvider>
          <div className="w-full max-w-[1920px] mx-auto relative min-h-screen max-h-fit">
            {children}
            <Footer />
          </div>
          <ToastContainer />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
