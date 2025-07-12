"use server"

import { z } from "zod"
import { cartService } from "@/services/cart-service"
import { createClient } from "@/services/supabase/server"
import { redirect } from "next/navigation"

const getCartSchema = z.void()

export async function getCartAction() {
  const supabase = await createClient()
  const {
    data: { user: supabaseUser }
  } = await supabase.auth.getUser()

  if (!supabaseUser) {
    redirect("/sign-in")
  }

  getCartSchema.parse(undefined)

  return await cartService.getCartByUserId(supabaseUser.id)
}
