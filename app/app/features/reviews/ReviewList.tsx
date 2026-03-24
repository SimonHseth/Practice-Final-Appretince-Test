"use client";

import { Star, Trash2, Pencil } from "lucide-react";
import { Card, CardContent } from "@/app/common/components/ui/card";
import { Separator } from "@/app/common/components/ui/separator";
import { Button } from "@/app/common/components/ui/button";
import { deleteReview } from "./actions";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  created_at: string;
  user_name: string;
  rating: number;
  comment: string;
  isOwn: boolean;
}

interface ReviewListProps {
  reviews: Review[];
  trailSlug: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function averageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

export default function ReviewList({
  reviews,
  trailSlug,
}: ReviewListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleDelete(reviewId: string) {
    setDeletingId(reviewId);
    await deleteReview(reviewId, trailSlug);
    setDeletingId(null);
  }

  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Ingen anmeldelser ennå. 
      </p>
    );
  }

  const avg = averageRating(reviews);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <StarRating rating={Math.round(avg)} />
        <span className="text-sm text-muted-foreground">
          {avg.toFixed(1)} av 5 ({reviews.length}{" "}
          {reviews.length === 1 ? "anmeldelse" : "anmeldelser"})
        </span>
      </div>

      <Separator />

      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm">{review.user_name}</span>
                <StarRating rating={review.rating} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatDate(review.created_at)}
                </span>
                {review.isOwn && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(editingId === review.id ? null : review.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                      aria-label="Rediger anmeldelse"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === review.id}
                      onClick={() => handleDelete(review.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      aria-label="Slett anmeldelse"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-foreground">{review.comment}</p>

            {editingId === review.id && (
              <div className="mt-4">
                <ReviewForm
                  trailSlug={trailSlug}
                  existingReview={{ rating: review.rating, comment: review.comment }}
                  onCancel={() => setEditingId(null)}
                  onSuccess={() => setEditingId(null)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
