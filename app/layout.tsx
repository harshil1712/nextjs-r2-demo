// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Manrope } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./styles.css";
import { ReactNode } from "react";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
const dm_sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm_sans",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js R2 Demo</title>
      </head>
      <body
        className={
          manrope.variable +
          " " +
          dm_sans.variable +
          "bg-gray-100 dark:bg-gray-900"
        }
      >
        {children}
        <footer className="w-full  p-6 md:p-8 lg:p-10 mt-8 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 bottom">
          <div className="flex justify-between items-center">
            <p>
              Built by{" "}
              <Link href="https://twitter.com/harshil1712">
                Harshil Agrawal
              </Link>
            </p>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="https://developers.cloudflare.com/pages/">
                    Cloudflare Pages
                  </Link>
                </li>
                <li>
                  <Link href="https://developers.cloudflare.com/r2/">R2</Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
