"use client"

import { useCallback } from "react"
import { Button } from "../_ui/button"
import { ArrowLeftIcon } from "lucide-react"

export const BackButton = ({
  onClick
}: {
  onClick?: () => void
} = {}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    } else {
      window.history.back()
    }
  }, [onClick])

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
