"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Image from "next/image";
import Lightbox from "react-spring-lightbox";
import { RotatingLines } from "react-loader-spinner";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setError("Invalid or missing folder specified in the URL.");
      setLoading(false);
      return;
    }

    // Decode the URL-encoded folder name and handle spaces
    const formattedFolderName = encodeURIComponent(id.replace(/-/g, " "));

    async function fetchResources() {
      try {
        const response = await fetch(
          `/api/cloudinary?folder=${formattedFolderName}`
        );
        const data = await response.json();

        if (response.ok) {
          const sortedResources = data.resources.sort(
            (a: CloudinaryResource, b: CloudinaryResource) =>
              Number(a.display_name) - Number(b.display_name)
          );
          setResources(sortedResources);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    if (resources) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % resources.length);
    }
  };

  const goToPreviousImage = () => {
    if (resources) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + resources.length) % resources.length
      );
    }
  };

  const imagesForLightbox = resources.map((resource) => ({
    src: resource.secure_url,
    alt: resource.public_id,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RotatingLines width="80" ariaLabel="loading" strokeColor="gray" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!resources.length) {
    return <div>No images found for the folder `{id}`.</div>;
  }

  return (
    <div
      className={
        lightboxOpen
          ? "blurred-background flex flex-col gap-8 md:gap-20 pb-20"
          : "flex flex-col gap-8 md:gap-20 pb-20"
      }
    >
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
          {resources.map((product: CloudinaryResource, index: number) => (
            <div key={product.public_id} className="flex flex-col gap-4">
              <Image
                className="w-full h-[250px] md:h-[450px] xl:h-[500px] hover:cursor-pointer object-fill"
                src={product.secure_url}
                alt={product.public_id}
                onClick={() => openLightbox(index)}
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

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        currentIndex={currentImageIndex}
        onNext={goToNextImage}
        onPrev={goToPreviousImage}
        singleClickToZoom={true}
        renderPrevButton={({ canPrev }) =>
          canPrev && (
            <button
              onClick={goToPreviousImage}
              className="absolute bottom-6 left-16 z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 bg-black w-20 rounded-lg text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )
        }
        renderNextButton={({ canNext }) =>
          canNext && (
            <button
              onClick={goToNextImage}
              className="absolute bottom-6 right-16 z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 bg-black w-20 rounded-lg text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )
        }
        images={imagesForLightbox}
      />

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-white shadow-md flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
