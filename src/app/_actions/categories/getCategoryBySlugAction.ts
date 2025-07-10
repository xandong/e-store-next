"use server"

import { z } from "zod"
import { categoriesService } from "@/services/categories-service"

const getCategoryBySlugSchema = z.object({
  slug: z.string()
})

export async function getCategoryBySlugAction(slug: string) {
  const validatedSlug = getCategoryBySlugSchema.parse({ slug })
  return await categoriesService.getCategoryBySlug(validatedSlug.slug)
}
