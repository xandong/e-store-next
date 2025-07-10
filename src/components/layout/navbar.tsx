"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"

import { User } from "@/types/api/generated"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "../_ui/menubar"
import { LogoutButton } from "./logout-button"
import { Button } from "../_ui/button"

export const Navbar = ({ user }: { user: User | undefined }) => {
  const { firstNameFirstLetter, lastNameFirstLetter } = useMemo(() => {
    const firstNameFirstLetter =
      user?.name?.split(" ")[0].split("")[0] || "Usuário"
    const lastNameFirstLetter = user?.name?.split(" ")[1].split("")[0] || ""

    return {
      firstNameFirstLetter,
      lastNameFirstLetter
    }
  }, [user])

  const url = useMemo(
    () =>
      `https://ui-avatars.com/api/?name=${firstNameFirstLetter}%20${lastNameFirstLetter}`,
    [firstNameFirstLetter, lastNameFirstLetter]
  )

  return (
    <nav>
      <ul className="flex items-center gap-1">
        {user ? (
          <>
            <Menubar className="bg-transparent border-none focus:bg-transparent p-0 rounded-full">
              <MenubarMenu>
                <MenubarTrigger className="bg-transparent p-1 rounded-full">
                  <Image
                    src={url}
                    alt={user.name || "User Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </MenubarTrigger>

                <MenubarContent className="mr-4 max-w-56">
                  <div className="p-2">
                    <span className="text-wrap">Olá, {user.name}</span>
                  </div>

                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/create">Carrinho</Link>
                  </MenubarItem>

                  <MenubarItem>
                    <Link href="/me">Favoritos</Link>
                  </MenubarItem>

                  <MenubarItem asChild disabled>
                    <Link aria-disabled href="#">
                      Configurações
                    </Link>
                  </MenubarItem>

                  <MenubarItem>
                    <LogoutButton />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </>
        ) : (
          <Button asChild variant={"link"}>
            <Link href={"/sign-in"} className="text-[1.125rem]">
              Entrar
            </Link>
          </Button>
        )}
      </ul>
    </nav>
  )
}
