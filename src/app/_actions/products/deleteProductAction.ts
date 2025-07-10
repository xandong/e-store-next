"use server"

import { z } from "zod"
import { productService } from "@/services/products-service"
import { revalidatePath } from "next/cache"

const deleteProductSchema = z.object({
  id: z.string()
})

export async function deleteProductAction(id: string) {
  const validatedId = deleteProductSchema.parse({ id })
  await productService.deleteProduct(validatedId.id)

  revalidatePath("/products")
}
