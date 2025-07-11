"use server"

import { purchaseService } from "@/services/purchase-service"
import { userService } from "@/services/users-service"
import { createClient } from "@/services/supabase/server"
import { redirect } from "next/navigation"

export async function getPurchaseByIdAction(purchaseId: string) {
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

  const purchase = await purchaseService.getPurchaseById(purchaseId, user.id)

  if (!purchase) {
    throw new Error("Purchase not found")
  }

  return purchase
}
