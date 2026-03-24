import { createClient } from "@/app/common/utils/supabase/server";
import { getReviews } from "./actions";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import Link from "next/link";
import { Separator } from "@/app/common/components/ui/separator";

interface ReviewSectionProps {
  trailSlug: string;
}

export default async function ReviewSection({ trailSlug }: ReviewSectionProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const reviews = await getReviews(trailSlug);

  const hasOwnReview = reviews.some((r: any) => r.isOwn);

  return (
    <section className="w-full px-6 pb-16">
      <h2 className="text-2xl font-bold mb-6">Anmeldelser</h2>

      <div className="flex flex-col gap-8 max-w-2xl">
        {user && !hasOwnReview ? (
          <ReviewForm trailSlug={trailSlug} />
        ) : !user ? (
          <div className="rounded-md border border-input bg-muted/50 p-4 text-sm text-muted-foreground">
            <Link href="/login" className="underline font-medium text-foreground">
              Logg inn
            </Link>{" "}
            for å skrive en anmeldelse.
          </div>
        ) : null}

        <Separator />

        <ReviewList
          reviews={reviews}
          trailSlug={trailSlug}
        />
      </div>
    </section>
  );
}
