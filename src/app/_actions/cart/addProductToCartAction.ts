"use server"

import { z } from "zod"
import { cartService } from "@/services/cart-service"
import { revalidatePath } from "next/cache"
import { createClient } from "@/services/supabase/server"
import { redirect } from "next/navigation"

const addProductToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1)
})

export async function addProductToCartAction(
  productId: string,
  quantity: number
) {
  const validatedData = addProductToCartSchema.parse({ productId, quantity })

  const supabase = await createClient()
  const {
    data: { user: supabaseUser }
  } = await supabase.auth.getUser()

  if (!supabaseUser) {
    redirect("/sign-in")
  }

  const cartItem = await cartService.addProductToCart(
    supabaseUser.id,
    validatedData.productId,
    validatedData.quantity
  )

  revalidatePath("/cart")

  return cartItem
}
