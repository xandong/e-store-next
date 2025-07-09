"use client"

import React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "../_ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
      {/* Botões de navegação */}
      <span className="absolute top-4 right-4 text-white bg-black/50 bg-opacity-50 rounded-full px-3 py-1 z-10">
        {current} / {count}
      </span>
      {api && (
        <>
          {current > 1 && (
            <button
              onClick={() => api.scrollPrev()}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 p-2 rounded-full shadow transition"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
            </button>
          )}

          {current < count && (
            <button
              onClick={() => api.scrollNext()}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 p-2 rounded-full shadow transition"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
            </button>
          )}
        </>
      )}

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative aspect-[4/3]">
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

      {/* Contador */}
      {count > 1 && (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {current} / {count}
        </div>
      )}
    </div>
  )
}
