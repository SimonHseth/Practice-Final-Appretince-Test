import { Suspense } from "react";
import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import { getLoginPage } from "./query";
import LoginForm from "./LoginForm";

const builder = createImageUrlBuilder({ projectId: "ull4br8y", dataset: "production" });

function urlFor(source: any) {
  return builder.image(source);
}

export default async function LoginPage() {
  const data = await getLoginPage();
  const bgUrl = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).height(1080).fit("crop").auto("format").url()
    : null;

  return (
    <main className="relative flex flex-1 items-center justify-center px-6 py-16">
      {bgUrl && (
        <Image
          src={bgUrl}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full flex justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
