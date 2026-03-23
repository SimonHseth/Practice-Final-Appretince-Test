import { sanityClient } from "../common/utils/sanity.cli";

export const homepageQuery = `*[_type == "homepage" && _id == "homepage"][0]{
  title,
  subtitle,
  heroImage,
  description,
  featuredTrails[]->{
    _id,
    title,
    "slug": slug.current,
    vanskelighetsgrad,
    lengde,
    estimertTid,
    mainImage
  }
}`;

export async function getHomepage() {
  return sanityClient.fetch(homepageQuery);
}
