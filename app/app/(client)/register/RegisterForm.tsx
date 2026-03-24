"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../../common/components/ui/button";
import { Card, CardContent } from "../../common/components/ui/card";
import { Separator } from "../../common/components/ui/separator";
import { signup } from "../auth/actions";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const serverError = searchParams.get("error");

  function handleSubmit(formData: FormData) {
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passordene stemmer ikke overens.");
      return;
    }

    setError(null);
    setLoading(true);
    signup(formData);
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardContent className="pt-8 pb-8 px-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Registrer deg</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Opprett en konto for å komme i gang
        </p>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Navn
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
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
              autoComplete="new-password"
              required
              minLength={6}
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
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="Bekreft passord (minst 6 tegn)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {(error || serverError) && (
            <p className="text-sm text-destructive">{error || serverError}</p>
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
