"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { createClient } from "@/services/supabase/server"
import { userService } from "@/services/users-service"

const signInSchema = z.object({
  email: z
    .string({ message: "Invalid email address" })
    .email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

type SignInSchema = z.infer<typeof signInSchema>

export async function loginAction(formData: SignInSchema) {
  const data = signInSchema.parse(formData)

  const supabase = await createClient()

  const {
    error,
    data: { user }
  } = await supabase.auth.signInWithPassword(data)

  if (user) {
    const response = await userService.getUserByIds(undefined, user.id)

    if (!response) {
      await userService.createUser({
        externalId: user.id,
        email: data.email,
        name: user.user_metadata.name
      })
    }
  }

  if (error) {
    console.error({ error })
    return { error: `Error when sign in. ${error.message}` }
  }

  revalidatePath("/", "layout")
  redirect("/")
}
