import { AuthLayout } from "@/components/layout/auth-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redefinir Senha - eStore",
  description: "Redefina sua senha para acessar sua conta na eStore."
}

export default function ResetPassword() {
  return (
    <AuthLayout>
      <h1>Reset Password</h1>
    </AuthLayout>
  )
}
