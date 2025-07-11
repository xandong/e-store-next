"use server"

import { z } from "zod"
import { productItemService } from "@/services/product-item-service"

const getProductItemByIdSchema = z.object({
  id: z.string()
})

export async function getProductItemByIdAction(id: string) {
  const validatedId = getProductItemByIdSchema.parse({ id })
  return await productItemService.getProductItemById(validatedId.id)
}
