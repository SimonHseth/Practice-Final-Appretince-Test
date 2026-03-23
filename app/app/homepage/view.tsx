import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import TrailCard from "../features/TrailCard";
import { getHomepage } from "./query";
import { Button } from "../common/components/ui/button";
import { Separator } from "../common/components/ui/separator";

const builder = createImageUrlBuilder({ projectId: "ull4br8y", dataset: "production" });

function urlFor(source: any) {
  return builder.image(source);
}

export default async function HomePageView() {
  const homepage = await getHomepage();

  if (!homepage) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center font-sans">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16">
          <h1 className="text-3xl font-semibold">Ingen innhold ennå</h1>
          <p className="mt-4 text-muted-foreground">
            Fyll inn hjemmeside-innhold i Studio
          </p>
          <Button asChild className="mt-6">
            <Link href="/studio">Åpne Studio</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center font-sans">
      <section className="relative w-full h-[60vh] min-h-[400px]">
        {homepage.heroImage && (
          <Image
            src={urlFor(homepage.heroImage).width(1920).height(800).url()}
            alt={homepage.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{homepage.title}</h1>
          {homepage.subtitle && (
            <p className="mt-4 text-lg md:text-2xl">{homepage.subtitle}</p>
          )}
        </div>
      </section>

      {homepage.description && (
        <section className="w-full max-w-3xl px-6 py-16 prose prose-lg mx-auto">
          <PortableText value={homepage.description} />
        </section>
      )}

      {homepage.featuredTrails && homepage.featuredTrails.length > 0 && (
        <section className="w-full max-w-6xl px-6 pb-20">
          <Separator className="mb-10" />
          <h2 className="text-3xl font-bold mb-8 text-center">
            Fremhevede turer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepage.featuredTrails.map((trail: any) => (
              <TrailCard key={trail._id} trail={trail} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
