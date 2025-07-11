"use server"

import { z } from "zod"
import { purchaseService } from "@/services/purchase-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const purchaseItemSchema = z.object({
  productItemId: z.string().optional(),
  productId: z.string().optional(),
  quantity: z.number().optional()
})

const createPurchaseSchema = z.object({
  userId: z.number(),
  items: z.array(purchaseItemSchema),
  cartId: z.string().optional()
})

export async function createPurchaseAction(
  data: z.infer<typeof createPurchaseSchema>
) {
  const validatedData = createPurchaseSchema.parse(data)
  const purchase = await purchaseService.createPurchase(
    validatedData.userId,
    validatedData.items,
    validatedData.cartId
  )

  revalidatePath("/purchases")
  redirect(`/purchases/${purchase.id}`)

  return purchase
}
