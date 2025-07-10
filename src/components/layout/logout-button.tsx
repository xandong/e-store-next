"use client"

import { LogOutIcon } from "lucide-react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"

import { logout } from "@/_actions/auth/logout"

export const LogoutButton = () => {
  const router = useRouter()

  const onClick = useCallback(async () => {
    await logout()
    router.push("/sign-in")
  }, [router])

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-500 hover:bg-neutral-800 hover:text-neutral-100"
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  )
}
