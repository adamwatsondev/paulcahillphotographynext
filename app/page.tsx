import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { v2 as cloudinary } from "cloudinary";
import Link from "next/link";
import { EmblaCarousel } from "@/components/ui/embla-carousel";
import Image from "next/image";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  display_name: string;
  asset_folder: string;
}

export default async function Home() {
  let resources = [];

  try {
    const featuredGalleriesResponse = await cloudinary.search
      .expression("tags=Featured")
      .execute();
    resources = featuredGalleriesResponse.resources || [];
  } catch (error) {
    console.error("Failed to fetch resources from Cloudinary:", error);
  }

  if (resources.length === 0) {
    return <div>No images found in the Brighton folder.</div>;
  }

  console.log(resources);

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20">
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md overflow-hidden">
        <Header />
      </div>
      <div className="grid grid-cols-3 gap-12 px-4 md:px-10 lg:px-20 pb-20 mt-40">
        {/* Carousel */}
        <div className="col-span-3 relative xl:h-[1000px] 2xl:h-[1600px] md:h-[800px] w-full">
          <EmblaCarousel resources={resources} />
        </div>

        {/* Featured Galleries */}
        <div className="col-span-3 items-center md:items-stretch flex flex-col gap-8">
          <span className="md:text-6xl text-2xl px-20 font-old-standard text-center font-bold leading-tight text-black">
            Featured Galleries
          </span>

          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {resources.map((product: CloudinaryResource) => (
              <div
                key={product.public_id}
                className="flex flex-col gap-4 justify-center items-center"
              >
                <Link
                  href={`/galleries/${product.asset_folder
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <Image
                    className="w-full h-[650px] object-fill"
                    src={product.secure_url}
                    alt={product.public_id}
                    quality={100}
                    width={1000}
                    height={650}
                  />
                </Link>
                {/* </Link> */}
                {/* Conditional rendering of Title */}
                {product.public_id ? (
                  <span className="text-3xl font-old-standard text-center font-bold leading-tight text-black">
                    {product.asset_folder}
                  </span>
                ) : (
                  <Skeleton className="h-6 w-3/4 bg-gray-200 rounded" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-white shadow-md flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
