import { AuthLayout } from "@/components/layout/auth-layout"
import { SignUpForm } from "@/components/auth/sign-up-form"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Criar Conta - eStore",
  description: "Crie sua conta para começar a comprar na eStore."
}

export default function SignUp() {
  return (
    <AuthLayout>
      <h1 className="font-bold text-2xl mb-8">Crie uma Conta</h1>

      <SignUpForm />

      <div className="pt-6 text-neutral-400 flex justify-center gap-1">
        Já possui uma conta?
        <Link href={"/sign-in"} className="font-semibold">
          Entrar
        </Link>
      </div>
    </AuthLayout>
  )
}
