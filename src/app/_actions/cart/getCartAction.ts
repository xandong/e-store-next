"use server"

import { z } from "zod"
import { cartService } from "@/services/cart-service"
import { createClient } from "@/services/supabase/server"

const getCartSchema = z.void()

export async function getCartAction() {
  getCartSchema.parse(undefined)
  const client = await createClient()
  const {
    data: { user }
  } = await client.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  return await cartService.getCartByUserId(user.id)
}
