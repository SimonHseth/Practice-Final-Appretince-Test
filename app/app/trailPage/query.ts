import { sanityClient } from "../common/utils/sanity.cli";

export const trailQuery = `*[_type == "tursider" && slug.current == $slug][0]{
  title,
  mainImage{
    ...,
    crop,
    hotspot
  },
  beskrivelse,
  vanskelighetsgrad,
  lengde,
  estimertTid,
  anbefaltStartpunkt,
  lokasjon,
  height,
  imageGallery,
}`;

export async function getTrail(slug: string) {
  return sanityClient.fetch(trailQuery, { slug });
}
