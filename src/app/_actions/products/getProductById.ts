"use server"

import { z } from "zod"
import { productService } from "@/services/products-service"

const getProductByIdSchema = z.object({
  id: z.string()
})

export async function getProductByIdAction(id: string) {
  const validatedId = getProductByIdSchema.parse({ id })
  const product = await productService.getProductById(validatedId.id)
  return product
}
