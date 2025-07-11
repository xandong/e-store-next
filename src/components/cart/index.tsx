"use client"

import { ShoppingCartIcon } from "lucide-react"

import { useCart } from "@/context/cart-context"
import { numberToCurrency } from "@/utils/formatters"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../_ui/sheet"
import { Button } from "../_ui/button"
import { CartCardItem } from "./cartCardItem"

export const Cart = () => {
  const { cart, total, open, setOpen } = useCart()

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
          <SheetTitle className="text-lg">Meu carrinho</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {isEmpty
              ? "Seu carrinho está vazio."
              : "Confira seus produtos abaixo:"}
          </SheetDescription>
        </SheetHeader>

        {!isEmpty && (
          <>
            <div className="flex-1 overflow-y-auto mt-4 flex flex-col gap-4">
              {cart.items
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((item) => (
                  <CartCardItem key={item.product.id} item={item} />
                ))}
            </div>

            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Total</span>
                <span className="text-base font-semibold text-foreground">
                  {numberToCurrency(total)}
                </span>
              </div>
              <Button className="w-full mt-2">Finalizar compra</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
