import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { Badge } from "../common/components/ui/badge";
import { Card, CardContent} from "../common/components/ui/card";
import { Separator } from "../common/components/ui/separator";

const builder = createImageUrlBuilder({ projectId: "ull4br8y", dataset: "production" });

function urlFor(source: any) {
  return builder.image(source);
}
      
export default function TrailPageView({ trail }: { trail: any }) {
  return (
    <div className="flex flex-col items-center font-sans">
      <section className="relative w-full h-[50vh] min-h-70">
        {trail.mainImage && (
          <Image
            src={urlFor(trail.mainImage).width(1200).height(800).fit('crop').auto('format').url()}
            alt={trail.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-end pb-8 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {trail.title}
          </h1>
        </div>
      </section>

      <section className="w-full px-6 py-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {trail.vanskelighetsgrad && (
                <Badge variant="secondary" className="capitalize text-sm px-3 py-1">
                  Vanskelighetsgrad {trail.vanskelighetsgrad}
                </Badge>
              )}
              {trail.lengde && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {trail.lengde} km
                </Badge>
              )}
              {trail.estimertTid && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {trail.estimertTid} timer
                </Badge>
              )}
              {trail.height && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {trail.height} m høyde
                </Badge>
              )}
            </div>

            {(trail.startpunkt || trail.lokasjon) && (
              <>
                <Separator className="my-4" />
                <div className="text-muted-foreground space-y-1">
                  {trail.anbefaltStartpunkt && (
                    <p>
                      <span className="font-semibold text-foreground"> Anbefalt startpunkt:</span>{" "}
                      {trail.anbefaltStartpunkt}
                    </p>
                  )}
                  {trail.lokasjon && (
                    <p>
                      <span className="font-semibold text-foreground">Lokasjon:</span>{" "}
                      {trail.lokasjon}
                    </p>
                  )}
                </div>
              </>
            )}
          </CardContent>
      </section>

      {trail.beskrivelse && (
        <section className="w-full px-10 pb-16 prose prose-lg">
          <PortableText value={trail.beskrivelse} />
        </section>
      )}

     
    </div>
  );
}
