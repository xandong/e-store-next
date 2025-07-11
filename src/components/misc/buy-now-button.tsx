"use client"

import { useCallback } from "react"

import { Button } from "../_ui/button"

export const BuyNowButton = ({
  onClick
}: {
  onClick?: () => void
} = {}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }
  }, [onClick])

  return (
    <Button className="flex-1" onClick={handleClick}>
      Comprar Agora
    </Button>
  )
}
