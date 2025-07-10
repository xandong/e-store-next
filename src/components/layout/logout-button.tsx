"use client"

import { LogOutIcon } from "lucide-react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/app/_actions/auth/logout"

export const LogoutButton = () => {
  const router = useRouter()

  const onClick = useCallback(async () => {
    await logoutAction()
    router.push("/sign-in")
  }, [router])

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-500"
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  )
}
