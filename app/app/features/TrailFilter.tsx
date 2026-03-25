"use client";

import { useState, useRef, useEffect } from "react";
import TrailCard from "./TrailCard";
import { Button } from "../common/components/ui/button";

interface Trail {
  _id: string;
  title: string;
  slug: string;
  vanskelighetsgrad?: string;
  lengde?: number;
  estimertTid?: number;
  height?: number;
  mainImage?: any;
}

const DIFFICULTY_OPTIONS = [
  { label: "Alle", value: "" },
  { label: "Lett", value: "lett" },
  { label: "Middels", value: "middels" },
  { label: "Vanskelig", value: "vanskelig" },
];

export default function TrailFilterSection({ trails }: { trails: Trail[] }) {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [sortLengde, setSortLengde] = useState<"" | "asc" | "desc">("");
  const [sortHeight, setSortHeight] = useState<"" | "asc" | "desc">("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = trails.filter((trail) => {
    if (difficulty && trail.vanskelighetsgrad !== difficulty) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortLengde === "asc") return (a.lengde ?? 0) - (b.lengde ?? 0);
    if (sortLengde === "desc") return (b.lengde ?? 0) - (a.lengde ?? 0);
    if (sortHeight === "asc") return (a.height ?? 0) - (b.height ?? 0);
    if (sortHeight === "desc") return (b.height ?? 0) - (a.height ?? 0);
    return 0;
  });

  const hasActiveFilters = difficulty !== "" || sortLengde !== "" || sortHeight !== "";
  const activeCount = [difficulty !== "", sortLengde !== "", sortHeight !== ""].filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="relative bg-background" ref={dropdownRef}>
          <Button
            variant="outline"
            onClick={() => setOpen((prev) => !prev)}
            className="gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" /></svg>
            Filter
            {activeCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs w-5 h-5">
                {activeCount}
              </span>
            )}
          </Button>

          {open && (
            <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-lg border bg-popover p-4 shadow-lg space-y-4">
              <div className="space-y-1.5">
                <span className="text-sm font-medium">Vanskelighetsgrad</span>
                <div className="flex gap-1">
                  {DIFFICULTY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setDifficulty(opt.value)}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer ${
                        difficulty === opt.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-input hover:bg-accent"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-sm font-medium">Lengde (km)</span>
                <div className="flex gap-1">
                  {[
                    { label: "Standard", value: "" as const },
                    { label: "Lav → Høy", value: "asc" as const },
                    { label: "Høy → Lav", value: "desc" as const },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortLengde(opt.value); setSortHeight(""); }}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer ${
                        sortLengde === opt.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-input hover:bg-accent"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-sm font-medium">Høyde (m)</span>
                <div className="flex gap-1">
                  {[
                    { label: "Standard", value: "" as const },
                    { label: "Lav → Høy", value: "asc" as const },
                    { label: "Høy → Lav", value: "desc" as const },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortHeight(opt.value); setSortLengde(""); }}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer ${
                        sortHeight === opt.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-input hover:bg-accent"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setDifficulty("");
                    setSortLengde("");
                    setSortHeight("");
                  }}
                >
                  Nullstill filtre
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          0 turer.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((trail) => (
            <TrailCard key={trail._id} trail={trail} />
          ))}
        </div>
      )}
    </div>
  );
}
