import { AuthLayout } from "@/components/layout/auth-layout"
import { SignInForm } from "@/components/auth/sign-in-form"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login - eStore",
  description: "Acesse sua conta para fazer compras na eStore."
}

export default function SignIn() {
  return (
    <AuthLayout>
      <h1 className="font-extrabold text-2xl mb-8">Login</h1>

      <SignInForm />

      <div className="pt-6 text-neutral-400 flex justify-center gap-1">
        Não tem uma conta?
        <Link href={"/sign-up"} className="font-semibold">
          Criar conta
        </Link>
      </div>
    </AuthLayout>
  )
}
