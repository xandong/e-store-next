"use server"

import { z } from "zod"
import { purchaseService } from "@/services/purchase-service"

const getPurchaseHistorySchema = z.object({
  userId: z.number()
})

export async function getPurchaseHistoryAction(userId: number) {
  const validatedUserId = getPurchaseHistorySchema.parse({ userId })
  return await purchaseService.getPurchasesByUserId(validatedUserId.userId)
}
