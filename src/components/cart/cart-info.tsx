"use client"

import { numberToCurrency } from "@/utils/formatters"
import { Button } from "../_ui/button"
import { CartCardItem } from "./cartCardItem"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export const CartInfo = () => {
  const { cart, total } = useCart()

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <div className="w-full flex justify-center text-sm text-muted-foreground mt-10">
          Nenhum produto adicionado ainda
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center">
      <div className="max-w-3xl w-full flex-1 overflow-y-auto mt-4 flex flex-col gap-4 max-h-[calc(100vh-18rem)]">
        {cart.items
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((item) => (
            <CartCardItem key={item.product.id} item={item} />
          ))}
      </div>

      <div className="max-w-3xl w-full border-t pt-4 mt-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Total</span>
          <span className="text-base font-semibold text-foreground">
            {numberToCurrency(total)}
          </span>
        </div>

        <Button className="w-full mt-2" asChild>
          <Link href={"/checkout"}>Finalizar compra</Link>
        </Button>
      </div>
    </div>
  )
}
