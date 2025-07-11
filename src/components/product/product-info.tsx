"use client"

import { useState } from "react"
import { Category, Product } from "@/types/prisma/generated"

import { numberToCurrency } from "@/utils/formatters"
import { Badge } from "../_ui/badge"
import { AddToCartButton } from "../misc/add-to-cart-button"
import { BuyNowButton } from "../misc/buy-now-button"
import { QuantityStepper } from "../misc/quantity-stepper"

export function ProductInfo({
  product,
  category
}: {
  product: Product
  category: Category | null
}) {
  const [quantity, setQuantity] = useState(1)

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

      <p className="text-2xl font-semibold">
        {numberToCurrency(product.price)}
      </p>

      <QuantityStepper defaultValue={1} onChange={setQuantity} />

      <div className="flex mt-4 gap-3">
        <BuyNowButton />

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
