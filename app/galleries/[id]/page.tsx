"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  display_name: string;
  asset_folder: string;
}

export default function GalleryPage() {
  const { id } = useParams();
  const [resources, setResources] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Dynamic folder:", id); // Debug log
    if (!id) {
      setError("No folder specified in the URL.");
      setLoading(false);
      return;
    }

    async function fetchResources() {
      try {
        const response = await fetch(`/api/cloudinary?folder=${id}`);
        const data = await response.json();

        if (response.ok) {
          setResources(data.resources);
        } else {
          console.error("Error fetching resources:", data.error);
          setError(data.error || "Failed to fetch resources.");
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to fetch resources. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton className="h-6 w-3/4 bg-gray-200 rounded" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!resources.length) {
    return <div>No images found for the folder `${id}`.</div>;
  }

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md h-16">
        <Header />
      </div>

      <div className="flex flex-col px-4 md:px-10 lg:px-20 pb-20 mt-40">
        <span className="text-5xl capitalize font-bold text-center font-old-standard text-black mb-8">
          {id}
        </span>

        {/* Galleries Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {resources.map((product: CloudinaryResource) => (
            <div
              key={product.public_id}
              className="flex flex-col gap-4 justify-center items-center"
            >
              <Image
                className="w-full h-[650px] object-cover"
                src={product.secure_url}
                alt={product.public_id}
                quality={100}
                width={1000}
                height={650}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              />
              <span className="text-3xl font-old-standard text-center font-bold leading-tight text-black">
                {product.display_name || "Untitled"}
              </span>
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
