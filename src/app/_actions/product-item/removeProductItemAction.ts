"use server"

import { z } from "zod"
import { productItemService } from "@/services/product-item-service"
import { revalidatePath } from "next/cache"

const removeProductItemSchema = z.object({
  productItemId: z.string()
})

export async function removeProductItemAction(productItemId: string) {
  const validatedId = removeProductItemSchema.parse({ productItemId })
  await productItemService.removeProductItem(validatedId.productItemId)

  revalidatePath("/cart")
}
