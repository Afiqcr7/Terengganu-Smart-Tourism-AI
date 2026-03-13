import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Terengganu Smart Tourism",
  description: "Explore the beauty of Terengganu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {/* Navbar is now inside the return block */}
<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  <div className="container">
    <a className="navbar-brand fw-bold" href="/">Terengganu</a>
    
    {/* The links are inside this div */}
    <div className="navbar-nav flex-row">
      <a className="nav-link mx-2" href="/">Home</a>
      <a className="nav-link mx-2" href="/districts">Districts</a>
      <a className="nav-link mx-2" href="/food">Food</a>
      <a className="nav-link mx-2" href="/accommodation">Stay</a>
      <a className="nav-link mx-2" href="/events">Events</a>
      
      {/* ADDED AI SEARCH LINK HERE */}
      <a className="nav-link mx-2 fw-bold text-primary" href="/ai-search">AI Search</a>
    </div>
  </div>
</nav>

        {/* This is where your page content appears */}
        <main>{children}</main>
        
      </body>
    </html>
  );
}