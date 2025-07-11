"use client"

import { useCallback } from "react"
import { Loader2Icon, LucideShoppingCart } from "lucide-react"

import { Button } from "../_ui/button"
import { useCart } from "@/context/cart-context"

interface AddToCartButtonProps {
  onClick?: () => void
  productId: string
  quantity: number
}

export const AddToCartButton = ({
  onClick,
  productId,
  quantity
}: AddToCartButtonProps) => {
  const { addToCart, setOpen, isLoading } = useCart()

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }

    addToCart(productId, quantity).then(() => setOpen(true))
  }, [addToCart, onClick, productId, quantity, setOpen])

  return (
    <Button className="flex-1" variant={"outline"} onClick={handleClick}>
      {isLoading ? (
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
