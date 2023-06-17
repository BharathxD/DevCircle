import mergeClasses from "@/libs/mergeClasses";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "BCA Community",
  description: "A community for all the BCA members, just like reddit!",
};

interface rootProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: rootProps) {
  return (
    <html
      lang="en"
      className={mergeClasses(
        "bg-white text-slate-900 antialiased light",
        montserrat.className
      )}
    >
      <body className="min-h-screen pt-[5rem] bg-slate-50 antialiased">
        <Navbar />
        <main className="container max-w-7xl mx-auto h-full pt-2">
          {children}
        </main>
      </body>
    </html>
  );
}
