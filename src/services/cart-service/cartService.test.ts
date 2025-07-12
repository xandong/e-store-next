/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/cart-service/cartService.test.ts

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: {
    user: {
      findUnique: jest.fn()
    },
    cart: {
      findUnique: jest.fn(),
      create: jest.fn()
    },
    product: {
      findUnique: jest.fn()
    },
    productItem: {
      create: jest.fn()
    }
  }
}))

import { prisma } from "@/lib/prisma"
import { CartService } from "."

describe("CartService", () => {
  let cartService: CartService

  beforeEach(() => {
    jest.clearAllMocks()
    cartService = new CartService(prisma as any)
  })

  describe("getCartByUserId", () => {
    const mockSupabaseId = "user123"
    const mockUserId = "dbUser123"
    const mockUser = { id: mockUserId, externalId: mockSupabaseId }

    it("should return an existing cart for a user", async () => {
      const mockCart = { id: "cart1", userId: mockUserId, items: [] }
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCart)

      const result = await cartService.getCartByUserId(mockSupabaseId)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { externalId: mockSupabaseId }
      })
      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: { items: { include: { product: true } } }
      })
      expect(result).toEqual(mockCart)
    })

    it("should create a new cart if one does not exist for the user", async () => {
      const newCart = { id: "newCart1", userId: mockUserId, items: [] }
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.cart.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.cart.create as jest.Mock).mockResolvedValue(newCart)

      const result = await cartService.getCartByUserId(mockSupabaseId)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { externalId: mockSupabaseId }
      })
      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: { items: { include: { product: true } } }
      })
      expect(prisma.cart.create).toHaveBeenCalledWith({
        data: { userId: mockUserId },
        include: { items: { include: { product: true } } }
      })
      expect(result).toEqual(newCart)
    })

    it("should throw an error if user is not found", async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(cartService.getCartByUserId(mockSupabaseId)).rejects.toThrow(
        "Usuário não encontrado."
      )
    })

    it("should throw an error if Prisma throws an error during cart fetch", async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.cart.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(cartService.getCartByUserId(mockSupabaseId)).rejects.toThrow(
        "Falha ao buscar carrinho."
      )
    })
  })

  describe("addProductToCart", () => {
    const mockSupabaseId = "user123"
    const mockUserId = "dbUser123"
    const mockUser = { id: mockUserId, externalId: mockSupabaseId }
    const mockProductId = "prod1"
    const mockProduct = { id: mockProductId, price: 100 }
    const mockQuantity = 2
    const mockCart = { id: "cart1", userId: mockUserId }

    it("should add a product to an existing cart", async () => {
      const mockProductItem = {
        id: "item1",
        cartId: mockCart.id,
        productId: mockProductId,
        price: mockProduct.price,
        quantity: mockQuantity
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct)
      ;(prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCart)
      ;(prisma.productItem.create as jest.Mock).mockResolvedValue(
        mockProductItem
      )

      const result = await cartService.addProductToCart(
        mockSupabaseId,
        mockProductId,
        mockQuantity
      )

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { externalId: mockSupabaseId }
      })
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: mockProductId }
      })
      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      })
      expect(prisma.productItem.create).toHaveBeenCalledWith({
        data: {
          cartId: mockCart.id,
          productId: mockProductId,
          price: mockProduct.price,
          quantity: mockQuantity
        }
      })
      expect(result).toEqual(mockProductItem)
    })

    it("should create a cart and add a product if cart does not exist", async () => {
      const newCart = { id: "newCart1", userId: mockUserId }
      const mockProductItem = {
        id: "item1",
        cartId: newCart.id,
        productId: mockProductId,
        price: mockProduct.price,
        quantity: mockQuantity
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct)
      ;(prisma.cart.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.cart.create as jest.Mock).mockResolvedValue(newCart)
      ;(prisma.productItem.create as jest.Mock).mockResolvedValue(
        mockProductItem
      )

      const result = await cartService.addProductToCart(
        mockSupabaseId,
        mockProductId,
        mockQuantity
      )

      expect(prisma.cart.create).toHaveBeenCalledWith({
        data: { userId: mockUserId }
      })
      expect(prisma.productItem.create).toHaveBeenCalledWith({
        data: {
          cartId: newCart.id,
          productId: mockProductId,
          price: mockProduct.price,
          quantity: mockQuantity
        }
      })
      expect(result).toEqual(mockProductItem)
    })

    it("should throw an error if product is not found", async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(
        cartService.addProductToCart(
          mockSupabaseId,
          mockProductId,
          mockQuantity
        )
      ).rejects.toThrow("Produto não encontrado.")
    })

    it("should throw an error if user is not found", async () => {
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct) // Ensure product is found
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(
        cartService.addProductToCart(
          mockSupabaseId,
          mockProductId,
          mockQuantity
        )
      ).rejects.toThrow("Usuário não encontrado.")
    })

    it("should throw an error if Prisma throws an error during add product", async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct)
      ;(prisma.cart.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(
        cartService.addProductToCart(
          mockSupabaseId,
          mockProductId,
          mockQuantity
        )
      ).rejects.toThrow("Falha ao adicionar produto ao carrinho.")
    })
  })
})
