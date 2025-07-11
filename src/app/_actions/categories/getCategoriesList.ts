"use server"

import { z } from "zod"
import { categoriesService } from "@/services/categories-service"

const getCategoriesListSchema = z.void()

export async function getCategoriesListAction() {
  getCategoriesListSchema.parse(undefined)
  const categories = await categoriesService.getCategories()
  return categories
}
