import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Header() {
  return (
    <header className="w-full h-16 bg-background border-b flex items-center justify-between px-6 sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-foreground">
        Din Lokale Turguide
      </Link>
      <nav className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/">Hjem</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/studio">Studio</Link>
        </Button>
      </nav>
    </header>
  );
}