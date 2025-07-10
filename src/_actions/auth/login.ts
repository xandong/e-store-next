"use server"

import { cookies } from "next/headers"
import { z } from "zod"

import { authenticationApi } from "@/services/api"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export async function login(credentials: unknown) {
  const result = signInSchema.safeParse(credentials)

  if (!result.success) {
    return {
      success: false,
      message: "Credenciais inválidas."
    }
  }

  try {
    const { data } = await authenticationApi.login(result.data)

    if (data.access_token) {
      cookies().set("access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
      })

      return {
        success: true,
        message: "Login bem-sucedido!"
      }
    } else {
      return {
        success: false,
        message: "Token de acesso não encontrado na resposta."
      }
    }
  } catch (error) {
    console.error("Erro ao fazer login: ", error)

    return {
      success: false,
      message: "E-mail ou senha inválidos."
    }
  }
}
