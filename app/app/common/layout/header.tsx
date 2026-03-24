"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { createClient } from "../utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { signout } from "../../(client)/auth/actions";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full bg-background border-b sticky top-0 z-50">
      <div className="h-16 flex items-center justify-between px-6">
        <Link href="/" className="text-3xl font-bold text-foreground">
          Din Lokale Turguide
        </Link>

        <nav className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Hjem</Link>
          </Button>
          {user ? (
            <form action={signout}>
              <Button variant="ghost" type="submit">
                Logg ut
              </Button>
            </form>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">Logg inn</Link>
            </Button>
          )}
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
          <Button
            variant="ghost"
            className="justify-start w-full"
            asChild
            onClick={() => setOpen(false)}
          >
            <Link href="/">Hjem</Link>
          </Button>
          {user ? (
            <form action={signout}>
              <Button
                variant="ghost"
                className="justify-start w-full"
                type="submit"
                onClick={() => setOpen(false)}
              >
                Logg ut
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              className="justify-start w-full"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/login">Logg inn</Link>
            </Button>
          )}
        </nav>
      )}
    </header>
  );
}