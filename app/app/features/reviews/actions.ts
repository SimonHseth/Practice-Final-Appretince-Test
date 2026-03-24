"use server";

import { createClient } from "@/app/common/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getReviews(trailSlug: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, created_at, user_id, user_name, rating, comment")
    .eq("trail_slug", trailSlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return (data ?? []).map(({ user_id, ...rest }) => ({
    ...rest,
    isOwn: user?.id === user_id,
  }));
}

export async function submitReview(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Du må være logget inn for å skrive en anmeldelse." };
  }

  const trailSlug = (formData.get("trail_slug") as string)?.trim();
  const rating = parseInt(formData.get("rating") as string, 10);
  const comment = (formData.get("comment") as string)?.trim();

  if (!trailSlug || !/^[a-z0-9æøå]+(?:-[a-z0-9æøå]+)*$/.test(trailSlug)) {
    return { error: "Ugyldig tursti." };
  }

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Vennligst velg en vurdering mellom 1 og 5." };
  }

  if (!comment || comment.length < 3) {
    return { error: "Kommentaren må være minst 3 tegn." };
  }

  if (comment.length > 1000) {
    return { error: "Kommentaren kan ikke være lengre enn 1000 tegn." };
  }

  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("user_id", user.id)
    .eq("trail_slug", trailSlug)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("reviews")
      .update({
        rating,
        comment,
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Error updating review:", error);
      return { error: "Kunne ikke oppdatere anmeldelsen. Prøv igjen." };
    }
  } else {
    const userName =
      user.user_metadata?.full_name || user.email?.split("@")[0] || "Anonym";

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      user_name: userName,
      trail_slug: trailSlug,
      rating,
      comment,
    });

    if (error) {
      console.error("Error inserting review:", error);
      return { error: "Kunne ikke legge til anmeldelsen. Prøv igjen." };
    }
  }

  revalidatePath(`/${trailSlug}`);
  return { success: true };
}

export async function deleteReview(reviewId: string, trailSlug: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Du må være logget inn." };
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting review:", error);
    return { error: "Kunne ikke slette anmeldelsen." };
  }

  revalidatePath(`/${trailSlug}`);
  return { success: true };
}
