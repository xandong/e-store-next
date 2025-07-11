"use server"

import { z } from "zod"
import { categoriesService } from "@/services/categories-service"
import { Category } from "@/types/prisma/generated"

const updateCategorySchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().url().optional()
})

export async function updateCategoryAction(
  data: Partial<Category> & { id: number }
) {
  const validatedData = updateCategorySchema.parse(data)
  const { id, ...rest } = validatedData
  const category = await categoriesService.updateCategory(id, rest)

  return category
}
