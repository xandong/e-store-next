"use server"

import { z } from "zod"
import { categoriesService } from "@/services/categories-service"
import { revalidatePath } from "next/cache"
import { Category } from "@/types/prisma/generated"

const createCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  image: z.string().url()
})

export async function createCategoryAction(
  data: Omit<Category, "id" | "createdAt">
) {
  const validatedData = createCategorySchema.parse(data)
  const category = await categoriesService.createCategory(validatedData)

  revalidatePath("/categories")

  return category
}
