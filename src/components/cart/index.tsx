"use client"

import { ShoppingCartIcon } from "lucide-react"

import { useCart } from "@/context/cart-context"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../_ui/sheet"
import { CartInfo } from "./cart-info"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export const Cart = ({ user }: { user: User | null }) => {
  const pathname = usePathname()
  const { cart, open, setOpen } = useCart()

  const isEmpty = !cart || cart.items.length === 0

  useEffect(() => {
    if (pathname === "/cart") {
      setOpen(false)
    }
  }, [pathname, setOpen])

  return (
    <Sheet
      open={open}
      onOpenChange={(e) => {
        if (pathname === "/cart") {
          setOpen(false)
          return
        }

        setOpen(e)
      }}
    >
      <SheetTrigger>
        <div className="relative">
          <ShoppingCartIcon className="text-zinc-700 w-6 h-6" />
          {cart && cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.items.length}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="p-5 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-lg">Carrinho</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {isEmpty
              ? "Seu carrinho está vazio."
              : "Confira seus produtos abaixo:"}
          </SheetDescription>
        </SheetHeader>

        {user ? (
          <>
            {isEmpty ? (
              <div className="flex w-full justify-center items-center mt-10">
                <span className="text-sm text-muted-foreground text-center">
                  Nenhum produto adicionado ainda
                </span>
              </div>
            ) : (
              <CartInfo />
            )}
          </>
        ) : (
          <div className="flex w-full justify-center items-center mt-10">
            <span className="text-sm text-muted-foreground text-center">
              <Link
                href="/sign-in"
                className="text-primary underline underline-offset-2"
              >
                Entre
              </Link>{" "}
              em uma conta para adicionar produtos ao carrinho.
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
