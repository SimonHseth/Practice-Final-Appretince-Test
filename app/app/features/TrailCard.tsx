import Image from "next/image";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import { Card, CardHeader, CardTitle, CardContent } from "../common/components/ui/card";
import { Badge } from "../common/components/ui/badge";

const builder = createImageUrlBuilder({ projectId: "ull4br8y", dataset: "production" });

function urlFor(source: any) {
  return builder.image(source);
}

interface TrailCardProps {
  trail: {
    _id: string;
    title: string;
    slug: string;
    vanskelighetsgrad?: string;
    lengde?: number;
    estimertTid?: number;
    height?: number;
    mainImage?: any;
  };
}

export default function TrailCard({ trail }: TrailCardProps) {
  return (
    <Link href={`/${trail.slug}`} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        {trail.mainImage && (
          <div className="relative h-48 w-full">
            <Image
              src={urlFor(trail.mainImage).width(600).height(400).url()}
              alt={trail.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{trail.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trail.vanskelighetsgrad && (
              <Badge variant="secondary" className="capitalize">
                {trail.vanskelighetsgrad}
              </Badge>
            )}
            {trail.lengde && (
              <Badge variant="outline">{trail.lengde} km</Badge>
            )}
            {trail.estimertTid && (
              <Badge variant="outline">{trail.estimertTid} timer</Badge>
            )}
            {trail.height && (
              <Badge variant="outline">{trail.height} m</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
