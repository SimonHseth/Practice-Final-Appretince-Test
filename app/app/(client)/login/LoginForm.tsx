"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../../common/components/ui/button";
import { Card, CardContent } from "../../common/components/ui/card";
import { Separator } from "../../common/components/ui/separator";
import { login } from "../auth/actions";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardContent className="pt-8 pb-8 px-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Logg inn</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Skriv inn e-post og passord for å skrive anmeldelser
        </p>

        <form
          action={login}
          onSubmit={() => setLoading(true)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              E-post
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
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
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="passord"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-600">{message}</p>
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
