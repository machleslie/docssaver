import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import ReactQueryProvider from "@/utils/Reactqueryprovider";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body
          className={`antialiased background GeistMono`}
        >
          <Navbar />
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
