/* eslint-disable no-unused-vars */
"use client"

import { createContext, useContext, ReactNode, useState } from "react"
import useSWR from "swr"
import { Cart, Product, ProductItem } from "@/types/prisma/generated"

export interface ProductItemType extends ProductItem {
  product: Product
}

export interface CartType extends Cart {
  items: ProductItemType[]
}

interface CartContextType {
  open: boolean
  setOpen: (open: boolean) => void
  cart: CartType | undefined
  total: number
  isLoading: boolean
  actionsLoading: boolean
  error: unknown
  addToCart: (
    productId: string,
    quantity: number,
    title: string,
    price: number
  ) => Promise<void>
  updateCartItemQuantity: (
    productItemId: string,
    quantity: number
  ) => Promise<void>
  removeCartItem: (productItemId: string) => Promise<void>
  revalidateCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch cart")
  }
  return res.json()
}

export function CartProvider({ children }: { children: ReactNode }) {
  const {
    data: cart,
    error,
    isLoading,
    mutate: revalidateCart
  } = useSWR<CartType>("/api/cart", fetcher)

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const total =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0

  const addToCart = async (
    productId: string,
    quantity: number,
    title: string,
    price: number
  ) => {
    if (!cart) return

    setLoading(true)
    const prevCart = { ...cart }

    const optimisticCart: CartType = {
      ...cart,
      items: [
        ...cart.items,
        {
          cartId: cart.id,
          id: "temp-" + Date.now(),
          price,
          quantity,
          productId,
          product: {
            title,
            price,
            id: "temp-" + Date.now(),
            slug: "",
            description: null,
            images: [],
            externalId: null,
            categoryId: null,
            createdAt: new Date()
          },
          createdAt: new Date(),
          purchaseId: null
        }
      ]
    }

    revalidateCart(optimisticCart, false)

    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
      })

      if (!response.ok) {
        throw new Error("Erro ao adicionar ao carrinho")
      }

      await revalidateCart()
    } catch (err) {
      console.error("Erro ao adicionar item:", err)
      revalidateCart(prevCart, false)
    } finally {
      setLoading(false)
    }
  }

  const updateCartItemQuantity = async (
    productItemId: string,
    quantity: number
  ) => {
    if (!cart) return

    setLoading(true)
    const prevCart = { ...cart }

    const optimisticCart: CartType = {
      ...cart,
      items: cart.items.map((item) =>
        item.id === productItemId ? { ...item, quantity } : item
      )
    }

    revalidateCart(optimisticCart, false)

    try {
      const res = await fetch(`/api/cart/items/${productItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
      })

      if (!res.ok) {
        throw new Error("Erro ao atualizar item")
      }

      await revalidateCart()
    } catch (err) {
      console.error("Erro ao atualizar item:", err)
      revalidateCart(prevCart, false)
    } finally {
      setLoading(false)
    }
  }

  const removeCartItem = async (productItemId: string) => {
    if (!cart) return

    const prevCart = { ...cart }

    const optimisticCart: CartType = {
      ...cart,
      items: cart.items.filter((item) => item.id !== productItemId)
    }

    revalidateCart(optimisticCart, false)

    try {
      const res = await fetch(`/api/cart/items/${productItemId}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        throw new Error("Erro ao remover item do carrinho")
      }

      await revalidateCart()
    } catch (err) {
      console.error("Erro ao remover item:", err)
      revalidateCart(prevCart, false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        open,
        setOpen,
        cart,
        total,
        isLoading,
        actionsLoading: loading,
        error,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        revalidateCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
