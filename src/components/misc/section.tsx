import { ProductCard } from "@/app/(app)/(home)/product-card"
import { Category, Product } from "@/types/generated"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../_ui/carousel"

interface SectionProps {
  products: Product[]
  category?: Category
}

export const Section = ({ category, products }: SectionProps) => {
  return (
    <section className="w-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">
        {category?.name}
      </h2>

      <div className="relative w-full max-w-full mx-auto">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className=" gap-1 sm:gap-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id!}
                className="basis-1/2 xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant={"default"}
            className="absolute left-0 top-1/3 transform -translate-y-1/2 shadow-2xl"
          />

          <CarouselNext
            variant={"secondary"}
            className="absolute right-0 top-1/3 transform -translate-y-1/2 shadow-2xl"
          />
        </Carousel>
      </div>
    </section>
  )
}
