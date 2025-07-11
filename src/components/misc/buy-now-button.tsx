"use client"

import { useCallback } from "react"

import { Button } from "../_ui/button"
import Link from "next/link"

export const BuyNowButton = ({
  onClick,
  href
}: {
  onClick?: () => void
  href?: string
} = {}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }
  }, [onClick])

  if (href) {
    return (
      <Button asChild className="flex-1">
        <Link href={href}>Comprar Agora</Link>
      </Button>
    )
  }

  return (
    <Button className="flex-1" onClick={handleClick}>
      Comprar Agora
    </Button>
  )
}
