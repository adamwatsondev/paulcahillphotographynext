import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/nav-button";
import Link from "next/link";
import Image from "next/image";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryResource {
  display_name: string;
  context: {
    alt: string;
    caption: string;
  };
  secure_url: string;
}

async function fetchCloudinaryResources(): Promise<CloudinaryResource[]> {
  try {
    const profilePhotoResponse = await cloudinary.search
      .expression("tags=ProfilePhoto")
      .with_field("context")
      .execute();
    return profilePhotoResponse.resources || [];
  } catch (error) {
    console.error("Failed to fetch resources from Cloudinary:", error);
    return [];
  }
}

export default async function About() {
  const resources = await fetchCloudinaryResources();
  const profileImage = resources.length > 0 ? resources[0] : null;

  return (
    <div className="flex pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md h-16">
        <Header />
      </div>

      <div className="grid grid-cols-2 gap-12 2xl:gap-20 items-center justify-center mx-4 xl:mx-40 sm:mx-20 mt-40 xl:mt-60">
        <div className="xl:col-span-1 col-span-2 relative w-full aspect-[3/2]">
          {profileImage && (
            <Image
              src={profileImage.secure_url}
              alt={profileImage.context.alt || "Profile Image"}
              className="absolute inset-0 w-full h-full object-cover"
              quality={100}
              width={1000}
              height={650}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          )}
        </div>
        <div className="xl:col-span-1 col-span-2 flex flex-col gap-8">
          <span className="text-black font-old-standard md:text-5xl text-2xl font-bold leading-tight">
            {profileImage?.context?.alt || "No alt available"}
          </span>
          <span className="text-black font-old-standard md:text-2xl text-xl font-medium leading-tight">
            {profileImage?.context?.caption || "No caption available"}
          </span>
          <Link href="/contact?tab=general">
            <Button className="text-white h-12 w-40 font-bold py-2 px-4 rounded-sm">
              <span className="font-old-standard text-xl font-semibold">
                Get in touch
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-white shadow-md flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
