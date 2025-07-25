/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useMemo } from "react"
import Link from "next/link"
import { User } from "@supabase/supabase-js"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "../_ui/menubar"
import { Button } from "../_ui/button"
import { Cart } from "../cart"
import { LogoutButton } from "./logout-button"

export const Navbar = ({ user }: { user: User | null }) => {
  const { firstNameFirstLetter, lastNameFirstLetter } = useMemo(() => {
    const firstNameFirstLetter =
      user?.user_metadata.name?.split(" ")[0].split("")[0] || "Usuário"
    const lastNameFirstLetter =
      user?.user_metadata.name?.split(" ")[1]?.split("")[0] || ""

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
      <ul className="flex items-center gap-2">
        <div className="flex items-center pr-2">
          <Cart user={user} />
        </div>

        {user ? (
          <>
            <Menubar className="bg-transparent border-none focus:bg-transparent p-0 rounded-full">
              <MenubarMenu>
                <MenubarTrigger className="bg-transparent p-1 rounded-full">
                  <img
                    src={url}
                    alt={"??"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </MenubarTrigger>

                <MenubarContent className="mr-4 max-w-56">
                  <div className="p-2">
                    <span className="text-wrap">
                      Olá, {user.user_metadata.name}
                    </span>
                  </div>

                  <MenubarSeparator />

                  <MenubarItem>
                    <Link href="/cart" className="w-full">
                      Carrinho
                    </Link>
                  </MenubarItem>

                  <MenubarItem>
                    <Link href="/purchases" className="w-full">
                      Minhas compras
                    </Link>
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
