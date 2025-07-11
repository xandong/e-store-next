"use client"

import { LogOutIcon } from "lucide-react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/app/_actions/auth/logout"
import { Button } from "../_ui/button"

export const LogoutButton = () => {
  const router = useRouter()

  const onClick = useCallback(async () => {
    await logoutAction()
    router.push("/sign-in")
  }, [router])

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md px-3 "
    >
      <LogOutIcon className="h-4 w-4 hover:text-neutral-50" />
      Logout
    </Button>
  )
}
