"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/_ui/button"
import { createPurchaseAction } from "@/app/_actions/purchase/createPurchaseAction"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { numberToCurrency } from "@/utils/formatters"
import Image from "next/image"

export function CheckoutForm() {
  const { cart, total, isLoading, actionsLoading, revalidateCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Seu carrinho está vazio.")
      return
    }

    setLoading(true)
    try {
      const items = cart.items.map((item) => ({
        productItemId: item.id,
        productId: item.productId,
        quantity: item.quantity
      }))

      await createPurchaseAction({
        items: items,
        cartId: cart.id
      })
      toast.success("Compra finalizada com sucesso!")
      revalidateCart()
    } catch (error) {
      console.error("Erro ao finalizar compra:", error)
      toast.error("Erro ao finalizar compra.")
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <p>Carregando carrinho...</p>
  }

  if (!cart || cart.items.length === 0) {
    return <p>Seu carrinho está vazio.</p>
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white/80">
      <h2 className="text-2xl font-bold mb-4">Seu Pedido</h2>
      <div className="space-y-2 mb-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                className="rounded shadow"
                src={item.product.images[0]}
                alt={item.product.title}
                width={64}
                height={64}
              />
              <span className="text-zinc-500">
                {item.product.title} (x{item.quantity})
              </span>
            </div>

            <span className="font-medium text-zinc-500">
              {numberToCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t pt-4 font-bold text-lg">
        <span>Total:</span>
        <span>{numberToCurrency(total)}</span>
      </div>
      <Button
        onClick={handleCheckout}
        className="w-full mt-6"
        disabled={loading || actionsLoading}
      >
        {loading ? <Loader2 className="animate-spin" /> : "Comprar"}
      </Button>
    </div>
  )
}
