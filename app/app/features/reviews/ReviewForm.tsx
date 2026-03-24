"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/app/common/components/ui/button";
import { Card, CardContent } from "@/app/common/components/ui/card";
import { submitReview } from "./actions";

interface ReviewFormProps {
  trailSlug: string;
  existingReview?: {
    rating: number;
    comment: string;
  } | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function ReviewForm({
  trailSlug,
  existingReview,
  onCancel,
  onSuccess,
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    formData.set("rating", String(rating));
    formData.set("trail_slug", trailSlug);

    const result = await submitReview(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      if (!existingReview) {
        setRating(0);
      }
      onSuccess?.();
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">
          {existingReview ? "Oppdater din anmeldelse" : "Skriv en anmeldelse"}
        </h3>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Din vurdering
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-0.5 transition-colors"
                  aria-label={`${star} stjerne${star > 1 ? "r" : ""}`}
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="comment" className="text-sm font-medium">
              Kommentar
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              minLength={3}
              maxLength={1000}
              rows={4}
              defaultValue={existingReview?.comment ?? ""}
              placeholder="Fortell om din opplevelse på turen..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-600">
              {existingReview
                ? "Anmeldelsen din ble oppdatert!"
                : "Takk for din anmeldelse!"}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading || rating === 0}>
              {loading
                ? "Sender..."
                : existingReview
                  ? "Oppdater anmeldelse"
                  : "Send anmeldelse"}
            </Button>
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel}>
                Avbryt
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
