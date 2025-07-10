import Image from "next/image"
import Link from "next/link"

import { Navbar } from "./navbar"
import { createClient } from "@/services/supabase/server"

export const Header = async () => {
  const client = await createClient()
  const {
    data: { user }
  } = await client.auth.getUser()

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 shadow sticky top-0 bg-white z-50">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={40} />
        </Link>
      </div>

      <Navbar user={user} />
    </header>
  )
}
