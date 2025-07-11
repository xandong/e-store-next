"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/services/supabase/server"
import { purchaseService } from "@/services/purchase-service"
import { userService } from "@/services/users-service"

export async function getPurchasesListAction() {
  const supabase = await createClient()
  const {
    data: { user: supabaseUser }
  } = await supabase.auth.getUser()

  if (!supabaseUser) {
    redirect("/sign-in")
  }

  const user = await userService.getUserByIds(undefined, supabaseUser.id)

  if (!user) {
    throw new Error("User not found in database")
  }

  const purchases = await purchaseService.getPurchasesByUserId(user.id)

  return purchases
}
