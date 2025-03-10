import Link from "next/link";
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

export const revalidate = 0;

export default async function Galleries() {
  const resources = await fetchCloudinaryResources();

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20">
      <div className="flex flex-col px-4 md:px-10 lg:px-20 pb-20 mt-28 sm:mt-40">
        <span className="text-5xl font-bold text-center font-old-standard text-black mb-8">
          Galleries
        </span>

        {/* Galleries Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {resources.map((product: CloudinaryResource) => (
            <div key={product.public_id} className="flex flex-col gap-4">
              <Link href={`/galleries/${product.asset_folder.toLowerCase()}`}>
                <Image
                  className="w-full max-w-full hover:cursor-pointer h-auto aspect-[3/2] object-cover"
                  src={product.secure_url}
                  alt={product.public_id}
                  quality={100}
                  width={1000}
                  height={650}
                />
              </Link>
              {product.public_id ? (
                <span className="text-3xl capitalize font-old-standard text-center font-bold leading-tight text-black">
                  {product.asset_folder.replace(/-/g, " ").replace("and", "&")}
                </span>
              ) : (
                <Skeleton className="h-6 w-3/4 bg-gray-200 rounded" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
