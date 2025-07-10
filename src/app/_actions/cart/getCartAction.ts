"use server"

import { z } from "zod"
import { cartService } from "@/services/cart-service"

const getCartSchema = z.object({
  userId: z.number()
})

export async function getCartAction(userId: number) {
  const validatedUserId = getCartSchema.parse({ userId })
  return await cartService.getCartByUserId(validatedUserId.userId)
}
