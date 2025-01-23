"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { AdvancedImage } from "@cloudinary/react";

interface EmblaCarouselProps {
  resources: Array<{
    public_id: string;
    secure_url: string;
    asset_folder: string;
  }>;
}

export function EmblaCarousel({ resources }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {resources.map((resource) => (
          <div
            className="embla__slide xl:h-[1000px] 2xl:h-[1600px] md:h-[800px] w-full"
            key={resource.public_id}
          >
            <Image
              className="w-full h-full object-fill"
              src={resource.secure_url}
              alt={resource.public_id}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              quality={100}
              width={1000}
              height={650}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
