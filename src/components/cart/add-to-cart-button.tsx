"use client"

import { useCallback } from "react"
import { Loader2Icon, LucideShoppingCart } from "lucide-react"

import { Button } from "../_ui/button"
import { useCart } from "@/context/cart-context"

interface AddToCartButtonProps {
  onClick?: () => void
  productId: string
  quantity: number
  title: string
  price: number
}

export const AddToCartButton = ({
  onClick,
  productId,
  quantity,
  price,
  title
}: AddToCartButtonProps) => {
  const { addToCart, setOpen, actionsLoading } = useCart()

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }

    addToCart(productId, quantity, title, price).then(() => {
      setOpen(true)
    })
  }, [addToCart, onClick, price, productId, quantity, setOpen, title])

  return (
    <Button
      className="flex-1"
      variant={"outline"}
      onClick={handleClick}
      disabled={actionsLoading}
    >
      {actionsLoading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <LucideShoppingCart />
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  )
}
