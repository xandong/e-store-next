"use server"

import { z } from "zod"
import { purchaseService } from "@/services/purchase-service"

const getPurchaseByIdSchema = z.object({
  id: z.string()
})

export async function getPurchaseByIdAction(id: string) {
  const validatedId = getPurchaseByIdSchema.parse({ id })
  return await purchaseService.getPurchaseById(validatedId.id)
}
