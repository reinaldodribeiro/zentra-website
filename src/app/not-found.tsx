import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFoundPage } from "@/content/site";

export const metadata: Metadata = { title: notFoundPage.title, robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 section theme-dark">
        <div className="container">
          <p className="kicker">{notFoundPage.kicker}</p>
          <h1 className="display h-xl">{notFoundPage.heading}</h1>
          <p className="lede">{notFoundPage.body}</p>
          <p>
            <Link href="/" className="btn btn-primary">
              {notFoundPage.home}
            </Link>{" "}
            <Link href={`/${notFoundPage.contactAnchor}`} className="btn btn-ghost">
              {notFoundPage.contact}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
