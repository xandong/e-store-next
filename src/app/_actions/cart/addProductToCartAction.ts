"use server"

import { z } from "zod"
import { cartService } from "@/services/cart-service"
import { revalidatePath } from "next/cache"
import { createClient } from "@/services/supabase/server"

const addProductToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1)
})

export async function addProductToCartAction(
  productId: string,
  quantity: number
) {
  const validatedData = addProductToCartSchema.parse({ productId, quantity })
  const client = await createClient()
  const {
    data: { user }
  } = await client.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const cartItem = await cartService.addProductToCart(
    user.id,
    validatedData.productId,
    validatedData.quantity
  )

  revalidatePath("/cart")

  return cartItem
}
