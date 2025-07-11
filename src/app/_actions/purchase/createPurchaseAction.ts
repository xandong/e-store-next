"use server"

import { z } from "zod"
import { purchaseService } from "@/services/purchase-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { userService } from "@/services/users-service"
import { createClient } from "@/services/supabase/server"

const purchaseItemSchema = z.object({
  productItemId: z.string().optional(),
  productId: z.string().optional(),
  quantity: z.number().optional()
})

const createPurchaseSchema = z.object({
  items: z.array(purchaseItemSchema),
  cartId: z.string().optional()
})

export async function createPurchaseAction(
  data: z.infer<typeof createPurchaseSchema>
) {
  const validatedData = createPurchaseSchema.parse(data)
  const supabase = await createClient()
  const {
    data: { user: supabaseUser }
  } = await supabase.auth.getUser()

  if (!supabaseUser) {
    throw new Error("User not authenticated")
  }

  console.log("Supabase User ID:", supabaseUser.id)
  const user = await userService.getUserByIds(undefined, supabaseUser.id)
  console.log("Prisma User found:", user)

  if (!user) {
    throw new Error("User not found in database")
  }

  const purchase = await purchaseService.createPurchase(
    user.id,
    validatedData.items,
    validatedData.cartId
  )

  revalidatePath("/purchases")
  revalidatePath("/cart")
  redirect(`/purchases/${purchase.id}`)
}
