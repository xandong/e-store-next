"use server"

import { z } from "zod"
import { productItemService } from "@/services/product-item-service"
import { revalidatePath } from "next/cache"

const updateProductItemQuantitySchema = z.object({
  productItemId: z.string(),
  quantity: z.number().min(1)
})

export async function updateProductItemQuantityAction(
  data: z.infer<typeof updateProductItemQuantitySchema>
) {
  const validatedData = updateProductItemQuantitySchema.parse(data)
  const updatedItem = await productItemService.updateProductItemQuantity(
    validatedData.productItemId,
    validatedData.quantity
  )

  revalidatePath("/cart")

  return updatedItem
}
