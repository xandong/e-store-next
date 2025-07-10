"use server"

import { z } from "zod"
import { productService } from "@/services/products-service"
import { revalidatePath } from "next/cache"
import { Product } from "@/types/prisma/generated"

const updateProductSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  slug: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  categoryId: z.number().optional()
})

export async function updateProductAction(
  data: Partial<Product> & { id: string }
) {
  const validatedData = updateProductSchema.parse(data)
  const { id, ...rest } = validatedData
  const product = await productService.updateProduct(id, rest)

  revalidatePath("/products")
  revalidatePath(`/products/${product.slug}`)

  return product
}
