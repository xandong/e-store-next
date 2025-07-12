"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { createClient } from "@/services/supabase/server"
import { userService } from "@/services/users-service"

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"]
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export async function signupAction(
  formData: SignUpSchema
): Promise<{ error: undefined | string; confirmation_sent: boolean }> {
  // Validate passwords match before Zod parsing
  if (formData.password !== formData.confirmPassword) {
    return { error: "Passwords do not match", confirmation_sent: false }
  }

  const data = signUpSchema.parse(formData)

  const supabase = await createClient()

  const {
    error,
    data: { user }
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name
      }
    }
  })

  if (user) {
    await userService.createUser({
      externalId: user.id,
      email: data.email,
      name: data.name
    })
  }

  if (error) {
    console.error(error)
    return {
      error: `Error when sign up. ${error.message}`,
      confirmation_sent: false
    }
  }

  const confirmationSent = process.env.SUPABASE_EMAIL_CONFIRMATION === "1"

  if (!confirmationSent) {
    revalidatePath("/", "layout")
    redirect("/")
  }

  return { error: undefined, confirmation_sent: confirmationSent }
}
