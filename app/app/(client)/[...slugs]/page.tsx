import { notFound } from "next/navigation";
import { getTrail } from "@/app/trailPage/query";
import TrailPageView from "@/app/trailPage/view";
import ReviewSection from "@/app/features/reviews/ReviewSection";

export default async function Trippage({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const slug = slugs.join("/");
  const trail = await getTrail(slug);

  if (!trail) {
    notFound();
  }

  return (
    <>
      <TrailPageView trail={trail} />
      <ReviewSection trailSlug={slug} />
    </>
  );
}