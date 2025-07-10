"use server"

import { z } from "zod"
import { categoriesService } from "@/services/categories-service"
import { revalidatePath } from "next/cache"

const deleteCategorySchema = z.object({
  id: z.number()
})

export async function deleteCategoryAction(id: number) {
  const validatedId = deleteCategorySchema.parse({ id })
  await categoriesService.deleteCategory(validatedId.id)

  revalidatePath("/categories")
}
