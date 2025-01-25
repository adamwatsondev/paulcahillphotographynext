"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

interface EmblaCarouselProps {
  resources: Array<{
    public_id: string;
    secure_url: string;
    asset_folder: string;
  }>;
}

export function EmblaCarousel({ resources }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      AutoScroll({
        speed: 2,
        playOnInit: true,
        stopOnInteraction: false,
      }),
    ]
  );

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
            className="embla__slide xl:h-[600px] md:h-[800px] w-full"
            key={resource.public_id}
          >
            <Image
              className="w-full max-h-[600px] h-[150px] md:h-[400px] xl:h-[650px] object-fill"
              src={resource.secure_url}
              alt={resource.public_id}
              quality={100}
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
