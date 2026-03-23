"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../common/components/ui/button";
import { Card, CardContent } from "../../common/components/ui/card";
import { Separator } from "../../common/components/ui/separator";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Replace with Supabase auth
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) setError(error.message);
    // else router.push("/");

    console.log("Login placeholder:", { email, password });
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardContent className="pt-8 pb-8 px-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Logg inn</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Skriv inn e-post og passord for å skrive anmeldelser
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              E-post
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="navn@eksempel.no"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Passord
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="passord"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logger inn..." : "Logg inn"}
          </Button>
        </form>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Har du ikke konto?{" "}
          <Link href="/register" className="text-foreground font-medium hover:underline">
            Registrer deg
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
