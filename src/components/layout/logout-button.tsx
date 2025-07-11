"use client"

import { LogOutIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/app/_actions/auth/logout"
import { Button } from "../_ui/button"
import { Loading } from "../misc/loading"

export const LogoutButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    setLoading(true)

    await logoutAction().finally(() => {
      setLoading(false)
    })

    router.push("/sign-in")
  }, [router])

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md px-3 "
    >
      <LogOutIcon className="h-4 w-4 hover:text-neutral-50" />
      {loading ? <Loading /> : "Logout"}
    </Button>
  )
}
