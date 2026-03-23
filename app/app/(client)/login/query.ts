import { sanityClient } from "../../common/utils/sanity.cli";

export const loginPageQuery = `*[_type == "loginPage" && _id == "loginPage"][0]{
  backgroundImage{
    ...,
    crop,
    hotspot
  }
}`;

export async function getLoginPage() {
  return sanityClient.fetch(loginPageQuery);
}
