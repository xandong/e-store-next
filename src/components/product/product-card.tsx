import Link from "next/link"
import Image from "next/image"
import { Category, Product } from "@/types/prisma/generated"
import { Badge } from "@/components/_ui/badge"
import { numberToCurrency } from "@/utils/formatters"

interface ProductCardProps {
  product: Product
  category?: Category
}

export const ProductCard = ({ product, category }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="max-w-xs w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden aspect-square"
    >
      <Image
        src={product.images?.[0] || ""}
        alt={product.title || ""}
        width={192}
        height={192}
        className="w-full h-auto object-cover rounded-xl shadow"
      />

      <div className="py-4">
        <h2 className="text-sm md:text-lg font-semibold">{product.title}</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 truncate">
          {product.description}
        </p>
        <p className="text-zinc-900 dark:text-zinc-200 font-bold mt-2">
          {numberToCurrency(product.price)}
        </p>
        {category && (
          <Badge variant="default" className="mt-2">
            {category.name}
          </Badge>
        )}
      </div>
    </Link>
  )
}
