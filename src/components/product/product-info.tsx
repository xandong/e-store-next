"use client"

import { useCallback, useState } from "react"
import { Category, Product } from "@/types/prisma/generated"

import { numberToCurrency } from "@/utils/formatters"
import { Badge } from "../_ui/badge"
import { AddToCartButton } from "../cart/add-to-cart-button"
import { BuyNowButton } from "../misc/buy-now-button"
import { QuantityStepper } from "../misc/quantity-stepper"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"

export function ProductInfo({
  product,
  category
}: {
  product: Product
  category: Category | null
}) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const handleBuyNow = useCallback(() => {
    addToCart(product.id, quantity, product.title, product.price)

    router.push(`/checkout`)
  }, [addToCart, product, quantity, router])

  return (
    <article className="flex flex-col justify-center space-y-4">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {product.title}
      </h1>

      {category && (
        <Badge variant="default" className="mt-2 w-fit">
          {category.name}
        </Badge>
      )}

      <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {product.description}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold">
          {numberToCurrency(product.price)}
        </span>

        {quantity !== 1 && (
          <span className="text-xl font-medium text-zinc-600">
            {numberToCurrency(product.price * quantity)}
          </span>
        )}
      </div>

      <QuantityStepper defaultValue={1} onChange={setQuantity} />

      <div className="flex mt-4 gap-3">
        <BuyNowButton onClick={handleBuyNow} />

        <AddToCartButton
          quantity={quantity}
          productId={product.id}
          title={product.title}
          price={product.price}
        />
      </div>
    </article>
  )
}
