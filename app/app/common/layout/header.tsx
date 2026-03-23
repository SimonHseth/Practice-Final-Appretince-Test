"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/login", label: "Logg inn" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b sticky top-0 z-50">
      <div className="h-16 flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-foreground">
          Din Lokale Turguide
        </Link>

        <nav className="hidden sm:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <button
          className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Meny"
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-foreground rounded transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground rounded transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground rounded transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="sm:hidden border-t flex flex-col px-6 py-3 gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="justify-start w-full"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      )}
    </header>
  );
}