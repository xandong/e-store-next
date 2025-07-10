"use server"

import { createClient } from "@/services/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function logoutAction() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  console.error({ error })

  revalidatePath("/", "layout")
  redirect("/login")
}
