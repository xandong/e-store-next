"use server"

import { z } from "zod"
import { productItemService } from "@/services/product-item-service"
import { revalidatePath } from "next/cache"

const updateProductItemQuantitySchema = z.object({
  productItemId: z.string(),
  quantity: z.number().min(1)
})

export async function updateProductItemQuantityAction(
  productItemId: string,
  quantity: number
) {
  const validatedData = updateProductItemQuantitySchema.parse({
    productItemId,
    quantity
  })
  const updatedItem = await productItemService.updateProductItemQuantity(
    validatedData.productItemId,
    validatedData.quantity
  )

  revalidatePath("/cart")

  return updatedItem
}
