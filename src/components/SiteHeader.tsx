"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-canvas/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <span className="grid size-7 place-items-center rounded-md border border-line-strong font-mono text-[11px] text-signal transition-colors group-hover:border-signal/60">
            BM
          </span>
          <span className="text-sm font-medium tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive(item.href) ? "bg-fg/[0.06] text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-full border border-signal/40 px-4 py-1.5 text-sm text-signal transition-colors hover:bg-signal hover:text-on-signal"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-9 place-items-center rounded-md border border-line-strong md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4" aria-hidden>
            <span className={`absolute left-0 h-px w-4 bg-fg transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-4 bg-fg transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-4 pb-6 pt-2 md:hidden" aria-label="Mobile">
          {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`block border-b border-line py-3 text-base ${isActive(item.href) ? "text-signal" : "text-fg"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
