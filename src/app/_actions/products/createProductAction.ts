"use server"

import { z } from "zod"
import { productService } from "@/services/products-service"
import { revalidatePath } from "next/cache"
import { Product } from "@/types/prisma/generated"

const createProductSchema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  price: z.number(),
  description: z.string().optional(),
  images: z.array(z.string().url()),
  categoryId: z.number().optional()
})

export async function createProductAction(
  data: Omit<Product, "id" | "createdAt">
) {
  const validatedData = createProductSchema.parse(data)
  const product = await productService.createProduct(validatedData)

  revalidatePath("/products")

  return product
}
