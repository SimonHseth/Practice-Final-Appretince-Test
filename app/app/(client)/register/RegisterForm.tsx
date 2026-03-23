"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../common/components/ui/button";
import { Card, CardContent } from "../../common/components/ui/card";
import { Separator } from "../../common/components/ui/separator";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passordene stemmer ikke overens.");
      return;
    }

    setLoading(true);

    // Replace with Supabase auth
    // const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    // if (error) setError(error.message);
    // else router.push("/");

    console.log("Register placeholder:", { name, email, password });
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardContent className="pt-8 pb-8 px-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Registrer deg</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Opprett en konto for å komme i gang
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Navn
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ola Nordmann"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="passord (minst 6 tegn)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm" className="text-sm font-medium">
              Bekreft passord
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Bekreft passord (minst 6 tegn)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Oppretter konto..." : "Registrer deg"}
          </Button>
        </form>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Har du allerede en konto?{" "}
          <Link href="/login" className="text-foreground font-medium hover:underline">
            Logg inn
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
