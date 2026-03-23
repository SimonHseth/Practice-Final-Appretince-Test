import HomePageView from "../homepage/view";


export default async function Home() {
  if (process.env.NODE_ENV === "development") {
    console.log("SANITY_API_TOKEN:", process.env.SANITY_API_TOKEN);
  }
  if (!process.env.SANITY_API_TOKEN) {
    console.warn("SANITY_API_TOKEN is not set. Please set it in your environment variables.");
  }
  if (!HomePageView) {
    throw new Error("HomePageView is not imported correctly. Please check the import statement.");
  }

  return (
     <div className="flex flex-col  justify-center font-sans min-h-screen min-w-screen">
    < HomePageView />
  </div>
  )
 
}
