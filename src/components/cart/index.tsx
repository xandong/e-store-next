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
import Link from "next/link"

export const Cart = () => {
  const { cart, open, setOpen } = useCart()

  const isEmpty = !cart || cart.items.length === 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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

        {isEmpty ? (
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
        ) : (
          <CartInfo />
        )}
      </SheetContent>
    </Sheet>
  )
}
