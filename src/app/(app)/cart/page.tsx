import { CartInfo } from "@/components/cart/cart-info"
import { AppLayout } from "@/components/layout/app-layout"
import { BackButton } from "@/components/misc/back-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carrinho - eStore",
  description:
    "Revise e gerencie os itens no seu carrinho de compras na eStore."
}

export default function CartPage() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col gap-4 items-start">
        <BackButton />

        <div className="w-full flex-1 p-4 my-6 flex flex-col gap-4">
          <CartInfo />
        </div>
      </div>
    </AppLayout>
  )
}
