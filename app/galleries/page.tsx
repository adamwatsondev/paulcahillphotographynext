import Link from "next/link";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { v2 as cloudinary } from "cloudinary";
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

async function fetchCloudinaryResources() {
  try {
    const thumbnailGalleriesResponse = await cloudinary.search
      .expression("tags=GalleryEntry")
      .execute();
    return thumbnailGalleriesResponse.resources || [];
  } catch (error) {
    console.error("Failed to fetch resources from Cloudinary:", error);
    return [];
  }
}

export default async function Galleries() {
  const resources = await fetchCloudinaryResources();

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md h-16">
        <Header />
      </div>

      <div className="flex flex-col px-4 md:px-10 lg:px-20 pb-20 mt-40">
        <span className="text-5xl font-bold text-center font-old-standard text-black mb-8">
          Galleries
        </span>

        {/* Galleries Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {resources.map((product: CloudinaryResource) => (
            <div key={product.public_id} className="flex flex-col gap-4">
              <Link href={`/galleries/${product.asset_folder.toLowerCase()}`}>
                <Image
                  className="w-full h-[250px] md:h-[450px] xl:h-[500px] object-fit"
                  src={product.secure_url}
                  alt={product.public_id}
                  quality={100}
                  width={1000}
                  height={650}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                />
              </Link>
              {product.public_id ? (
                <span className="text-3xl capitalize font-old-standard text-center font-bold leading-tight text-black">
                  {product.asset_folder.replace(/-/g, " ")}
                </span>
              ) : (
                <Skeleton className="h-6 w-3/4 bg-gray-200 rounded" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-white shadow-md flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
