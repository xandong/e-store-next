"use client"

import { useCallback } from "react"
import { Button } from "../_ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export const BackButton = ({
  onClick,
  href
}: {
  onClick?: () => void
  href?: string
} = {}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    } else {
      window.history.back()
    }
  }, [onClick])

  if (href) {
    return (
      <Button
        variant={"link"}
        className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-lg"
        asChild
      >
        <Link href={href}>
          <ArrowLeftIcon className="w-6 h-6" />
          Voltar
        </Link>
      </Button>
    )
  }

  return (
    <Button
      variant={"link"}
      className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-lg"
      onClick={handleClick}
    >
      <ArrowLeftIcon className="w-6 h-6" />
      Voltar
    </Button>
  )
}
