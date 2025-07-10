"use client"

import { useCallback, useState } from "react"
import Link from "next/link"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/_ui/form"
import { Loader2 } from "lucide-react"

import { AuthLayout } from "@/components/layout/auth-layout"
import { Button } from "@/components/_ui/button"
import { Input } from "@/components/_ui/input"
import { z } from "zod"
import { PasswordInput } from "@/components/_ui/input-password"
import { signupAction } from "@/app/_actions/auth/register"
import { toast } from "sonner"

const signUpSchema = z
  .object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(1, "O nome é obrigatório"),
    email: z
      .string({ message: "Insira um email válido" })
      .email("Insira um email válido"),
    password: z
      .string({ message: "A senha é obrigatória" })
      .min(8, "O limite mínimo de caracteres é 8"),
    confirmPassword: z.string().min(8, "O limite mínimo de caracteres é 8")
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"]
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [confirmationStep] = useState(false)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })
  const { handleSubmit, getValues } = form

  const onSubmit = useCallback(async (formData: SignUpSchema) => {
    const data = signUpSchema.parse(formData)

    setLoading(true)
    const result = await signupAction(data)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("Verifique seu email para ativar sua conta")
  }, [])

  return (
    <AuthLayout>
      {confirmationStep ? (
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-semibold mb-4">📩 Verify your email</h1>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            We have sent an email to{" "}
            <span className="font-medium">{getValues("email")}</span>.
            <br />
            Please, check your inbox and click on the link to activate your
            account.
          </p>

          <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            Not received anything? Check also your spam box.
          </div>
        </div>
      ) : (
        <>
          <h1 className="font-bold text-2xl mb-8">Crie uma Conta</h1>

          <Form {...form}>
            <form
              className="space-y-4 w-[320px] max-w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {loading ? <Loader2 className="animate-spin" /> : "Register"}
              </Button>
            </form>
          </Form>

          <div className="pt-6 text-neutral-400 flex justify-center gap-1">
            Já possui uma conta?
            <Link href={"/sign-in"} className="font-semibold">
              Entrar
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  )
}
