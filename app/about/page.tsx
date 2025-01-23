import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/nav-button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function About() {
  const cld = new Cloudinary({
    cloud: { cloudName: process.env.CLOUDINARY_CLOUD_KEY },
  });
  const img = cld
    .image("profile-photo")
    .format("auto")
    .quality("auto")
    .resize(fill().width(1000).height(650));

  return (
    <div className="flex pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md h-16">
        <Header />
      </div>

      <div className="grid grid-cols-2 gap-12 2xl:gap-20 items-center justify-center mx-4 xl:mx-40 sm:mx-20 mt-40 xl:mt-60">
        <div className="xl:col-span-1 col-span-2 relative w-full aspect-[3/2]">
          <img
            src="https://res.cloudinary.com/dalts7djg/image/upload/v1689132603/profile-photo.jpg"
            alt="Paul Cahill"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="xl:col-span-1 col-span-2 flex flex-col gap-8">
          <span className="text-black font-old-standard md:text-5xl text-2xl font-bold leading-tight">
            Hi, I'm Paul Cahill
          </span>
          <span className="text-black font-old-standard md:text-2xl text-xl font-medium leading-tight">
            I’m originally from Dublin and currently live in Brighton. The
            majority of my images are taken locally, with an emphasis on
            seascapes and street photography. Some of my images have been
            published in national and local newspapers and I'm a regular
            contributor to the iconic Brighton calendar. I’ve also had some of
            my work highly commended and featured in the British Life
            Photography Awards book and exhibition, which toured the country.
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
