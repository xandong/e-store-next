import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types/api/generated"
import { Badge } from "@/components/_ui/badge"

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="max-w-xs w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <Image
        src={product.images?.[0] || ""}
        alt={product.title || ""}
        width={192}
        height={192}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="py-4">
        <h2 className="text-sm md:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {product.title}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 truncate">
          {product.description}
        </p>
        <p className="text-zinc-900 dark:text-zinc-200 font-bold mt-2">
          ${product.price?.toFixed(2)}
        </p>
        {product.category && (
          <Badge variant="default" className="mt-2">
            {product.category.name}
          </Badge>
        )}
      </div>
    </Link>
  )
}
