"use server"

import { z } from "zod"
import { cartService } from "@/services/cart-service"
import { revalidatePath } from "next/cache"

const addProductToCartSchema = z.object({
  userId: z.number(),
  productId: z.string(),
  quantity: z.number().min(1)
})

export async function addProductToCartAction(
  data: z.infer<typeof addProductToCartSchema>
) {
  const validatedData = addProductToCartSchema.parse(data)
  const cartItem = await cartService.addProductToCart(
    validatedData.userId,
    validatedData.productId,
    validatedData.quantity
  )

  revalidatePath("/cart") // Assuming you have a /cart page

  return cartItem
}
