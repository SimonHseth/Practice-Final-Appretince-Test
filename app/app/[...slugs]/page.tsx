import { notFound } from "next/navigation";
import { getTrail } from "../trailPage/query";
import TrailPageView from "../trailPage/view";

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

  return <TrailPageView trail={trail} />;
}