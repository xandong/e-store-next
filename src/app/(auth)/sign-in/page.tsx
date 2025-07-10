"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

import { loginAction } from "@/app/_actions/auth/login"
import { AuthLayout } from "@/components/layout/auth-layout"
import { Button } from "@/components/_ui/button"
import { Input } from "@/components/_ui/input"
import { PasswordInput } from "@/components/_ui/input-password"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/_ui/form"
import { toast } from "sonner"

const signInSchema = z.object({
  email: z
    .string({ message: "Insira um email válido" })
    .email("Insira um email válido"),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(8, "O limite mínimo de caracteres é 8")
})

type SignInSchema = z.infer<typeof signInSchema>

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const { handleSubmit } = form

  const onSubmit = useCallback(
    async (formData: SignInSchema) => {
      const data = signInSchema.parse(formData)

      setLoading(true)
      const result = await loginAction(data)

      setLoading(false)

      if (result?.error) {
        toast.error("Erro ao fazer login")
        return
      }

      toast.success("Login bem-sucedido!")
      router.push("/")
    },
    [router]
  )

  return (
    <AuthLayout>
      <h1 className="font-extrabold text-2xl mb-8">Login</h1>

      <Form {...form}>
        <form
          className="space-y-4 w-[320px] max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="email" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1.5 mb-10">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} autoComplete="password" />
                  </FormControl>

                  <FormMessage />
                  <FormDescription>
                    <Link
                      href={"/reset-password"}
                      aria-disabled
                      className="text-neutral-500"
                    >
                      Esqueceu a senha?
                    </Link>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>

      <div className="pt-6 text-neutral-400 flex justify-center gap-1">
        Não tem uma conta?
        <Link href={"/sign-up"} className="font-semibold">
          Criar conta
        </Link>
      </div>
    </AuthLayout>
  )
}
