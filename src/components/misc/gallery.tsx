"use client"

import React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../_ui/carousel"

interface GalleryProps {
  images: string[]
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    setCount(api.scrollSnapList().length)
    onSelect()

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <div className="relative space-y-2">
      <span className="absolute top-4 right-4 text-white/80 bg-black/30 bg-opacity-50 rounded-full px-3 py-1 z-10">
        {current} / {count}
      </span>

      <Carousel setApi={setApi} className="w-full">
        {api && (
          <>
            {current > 1 && (
              <CarouselPrevious
                onClick={() => api.scrollPrev()}
                variant={"secondary"}
                className="absolute left-2 top-1/2 z-10 transform -translate-y-1/2 shadow-2xl"
              />
            )}

            {current < count && (
              <CarouselNext
                onClick={() => api.scrollNext()}
                variant={"secondary"}
                className="absolute  right-2 top-1/2 z-10 transform -translate-y-1/2 shadow-2xl"
              />
            )}
          </>
        )}

        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative aspect-square">
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={image}
                  alt={`Imagem do produto ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
