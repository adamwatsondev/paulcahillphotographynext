"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Lightbox from "react-spring-lightbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBasket } from "@/app/context/basket-context";
import { toast, Toaster } from "sonner";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  display_name: string;
  asset_folder: string;
}

const prices = {
  A2: 150,
  A3: 160,
  A4: 170,
};

export default function GalleryPage() {
  const { id } = useParams();
  const formattedId = Array.isArray(id) ? id[0] : id;
  const [resources, setResources] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CloudinaryResource | null>(
    null
  );
  const { addItem } = useBasket();
  const [selectedSize, setSelectedSize] = useState<keyof typeof prices | null>(
    null
  );

  const handleAddToBasket = (resource: CloudinaryResource) => {
    if (selectedSize) {
      const price = prices[selectedSize];
      addItem({
        id: resource.public_id,
        size: selectedSize,
        price,
        imageUrl: resource.secure_url,
        asset_folder: resource.asset_folder,
        display_name: resource.display_name,
      });
      toast.success("Item added to basket!");
    } else {
      toast.error("No size selected");
    }
  };

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setError("Invalid or missing folder specified in the URL.");
      setLoading(false);
      return;
    }

    async function fetchResources() {
      try {
        const response = await fetch(`/api/cloudinary?folder=${id}`);
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
      <div className="flex flex-col gap-8 md:gap-20 pb-20">
        <div className="flex flex-col gap-8 px-4 md:px-10 lg:px-20 pb-20 mt-40">
          <div className="flex justify-center items-center">
            <Skeleton className="h-12 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* Galleries Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Skeleton className="w-full h-[250px] md:h-[450px] xl:h-[500px] hover:cursor-pointer object-fill" />
                <Skeleton className="h-6 w-3/4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8 md:gap-20 pb-20">
        <div className="flex flex-col gap-8 px-4 md:px-10 items-center justify-center lg:px-20 pb-20 mt-40">
          <span className="text-5xl font-bold text-center font-old-standard text-black mb-8">
            No images found for the folder {formattedId}
          </span>
          <Link href="/galleries">
            <Button className="text-white h-12 w-40 font-bold py-2 px-4 rounded-sm">
              <span className="font-old-standard text-lg">
                Back to Galleries
              </span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        lightboxOpen
          ? "blurred-background flex flex-col gap-8 md:gap-20 pb-20"
          : "flex flex-col gap-8 md:gap-20 pb-20"
      }
    >
      <div className="flex flex-col px-4 md:px-10 lg:px-20 pb-20 mt-40">
        <span className="text-5xl capitalize font-bold text-center font-old-standard text-black mb-8">
          {formattedId?.replace(/-/g, " ").replace("and", "&")}
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
              />
              <div className="flex justify-between items-center">
                <span className="text-3xl font-old-standard text-left font-bold leading-tight text-black">
                  {product.display_name || "Untitled"}
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="text-white h-10 w-fit font-bold py-2 px-4 rounded-sm"
                      onClick={() => setSelectedImage(product)}
                    >
                      <span className="font-old-standard text-lg font-semibold">
                        Purchase
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="sm:text-5xl text-xl text-center font-bold font-old-standard text-black mb-8">
                        Size Selection
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      {selectedImage && (
                        <Image
                          src={selectedImage.secure_url}
                          alt={selectedImage.public_id}
                          width={600}
                          height={400}
                          className="rounded"
                        />
                      )}
                      <Select
                        onValueChange={(value) =>
                          setSelectedSize(value as keyof typeof prices)
                        }
                      >
                        <SelectTrigger className="w-full border border-black">
                          <SelectValue placeholder="Select a size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A2">
                            <div className="flex gap-2 items-center">
                              <span className="text-black">A2</span>
                              <span className="text-md text-muted-foreground">
                                (£{prices.A2}.00)
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="A3">
                            <div className="flex gap-2 items-center">
                              <span className="text-black">A3</span>
                              <span className="text-md text-muted-foreground">
                                (£{prices.A3}.00)
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="A4">
                            <div className="flex gap-2 items-center">
                              <span className="text-black">A4</span>
                              <span className="text-md text-muted-foreground">
                                (£{prices.A4}.00)
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <DialogClose className="text-black w-full bg-white focus:outline-none">
                        <Button
                          disabled={!selectedSize}
                          onClick={() => handleAddToBasket(selectedImage!)}
                          className="text-white h-12 w-full font-bold py-2 px-4 rounded-sm"
                        >
                          <span className="font-old-standard text-lg font-semibold">
                            Add to Basket
                          </span>
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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

      <Toaster position="bottom-right" />
    </div>
  );
}
