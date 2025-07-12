/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/purchase-service/purchaseService.test.ts

// Mock the prisma client module.
// This replaces the actual prisma client with a mock object that we can control in our tests.
jest.mock("@/lib/prisma", () => ({
  __esModule: true, // This is needed for ES modules
  prisma: {
    purchase: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    },
    product: {
      findUnique: jest.fn()
    },
    productItem: {
      create: jest.fn(),
      findUnique: jest.fn() // Added for productItem.findUnique inside transaction
    },
    cart: {
      update: jest.fn()
    },
    // Mock the $transaction method to allow controlling the `tx` object
    $transaction: jest.fn()
  }
}))

jest.mock("@/services/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(() => ({ data: { user: { id: "supabase-user-id" } } }))
    }
  }))
}))

import { prisma } from "@/lib/prisma"
import { PurchaseService } from "."
import { PurchaseStatus } from "@/types/prisma/generated"

describe("PurchaseService", () => {
  let purchaseService: PurchaseService
  beforeEach(() => {
    jest.clearAllMocks()
    purchaseService = new PurchaseService(prisma as any)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    purchaseService = new PurchaseService(prisma as any)
  })

  describe("getPurchaseById", () => {
    const mockUserId = "user123"
    const mockPurchaseId = "purchase123"
    const mockPurchase = {
      id: mockPurchaseId,
      userId: mockUserId,
      productItems: []
    }

    it("should return a purchase when found", async () => {
      ;(prisma.purchase.findUnique as jest.Mock).mockResolvedValue(mockPurchase)

      const result = await purchaseService.getPurchaseById(
        mockPurchaseId,
        mockUserId
      )

      expect(prisma.purchase.findUnique).toHaveBeenCalledWith({
        where: { id: mockPurchaseId, userId: mockUserId },
        include: { productItems: { include: { product: true } } }
      })
      expect(result).toEqual(mockPurchase)
    })

    it("should return null if purchase not found", async () => {
      ;(prisma.purchase.findUnique as jest.Mock).mockResolvedValue(null)
      const result = await purchaseService.getPurchaseById(
        mockPurchaseId,
        mockUserId
      )
      expect(result).toBeNull()
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.purchase.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(
        purchaseService.getPurchaseById(mockPurchaseId, mockUserId)
      ).rejects.toThrow("Falha ao buscar compra.")
    })
  })

  describe("getPurchasesByUserId", () => {
    const mockUserId = "user123"
    const mockPurchases = [
      { id: "p1", userId: mockUserId, productItems: [] },
      { id: "p2", userId: mockUserId, productItems: [] }
    ]

    it("should return a list of purchases for a user", async () => {
      ;(prisma.purchase.findMany as jest.Mock).mockResolvedValue(mockPurchases)

      const result = await purchaseService.getPurchasesByUserId(mockUserId)

      expect(prisma.purchase.findMany).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: { productItems: { include: { product: true } } }
      })
      expect(result).toEqual(mockPurchases)
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.purchase.findMany as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(
        purchaseService.getPurchasesByUserId(mockUserId)
      ).rejects.toThrow("Falha ao buscar compras do usuário.")
    })
  })

  describe("createPurchase", () => {
    let txMock: any // Declare txMock here, scoped to createPurchase describe block

    beforeEach(() => {
      // Initialize txMock with all necessary mock functions for this describe block
      txMock = {
        purchase: {
          findUnique: jest.fn(),
          findMany: jest.fn(),
          create: jest.fn(),
          update: jest.fn()
        },
        product: {
          findUnique: jest.fn()
        },
        productItem: {
          create: jest.fn(),
          findUnique: jest.fn()
        },
        cart: {
          update: jest.fn()
        }
      }

      // Mock the $transaction method to call the callback with our pre-defined txMock
      ;(prisma.$transaction as jest.Mock).mockImplementation(
        async (callback) => {
          return callback(txMock)
        }
      )
    })

    describe("createPurchase", () => {
      const mockUserId = "user123"
      const mockProduct = { id: "prod1", price: 100 }
      const mockProductItem = {
        id: "item1",
        productId: "prod1",
        quantity: 1,
        price: 100
      }
      const mockCartId = "cart123"

      let txMock: any // Declare txMock here, scoped to createPurchase describe block

      beforeEach(() => {
        // Initialize txMock with all necessary mock functions for this describe block
        txMock = {
          purchase: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
          },
          product: {
            findUnique: jest.fn()
          },
          productItem: {
            create: jest.fn(),
            findUnique: jest.fn()
          },
          cart: {
            update: jest.fn()
          }
        }

        // Mock the $transaction method to call the callback with our pre-defined txMock
        ;(prisma.$transaction as jest.Mock).mockImplementation(
          async (callback) => {
            return callback(txMock)
          }
        )
      })

      it("should create a purchase with new product items", async () => {
        const itemsToCreate = [{ productId: mockProduct.id, quantity: 1 }]
        const createdProductItem = {
          id: "new-item",
          productId: mockProduct.id,
          quantity: 1,
          price: mockProduct.price
        }
        const mockPurchase = {
          id: "new-purchase",
          userId: mockUserId,
          total: mockProduct.price,
          productItems: [createdProductItem]
        }

        // Configure the txMock methods for this specific test
        txMock.product.findUnique.mockResolvedValue(mockProduct)
        txMock.productItem.create.mockResolvedValue(createdProductItem)
        txMock.purchase.create.mockResolvedValue(mockPurchase)

        const result = await purchaseService.createPurchase(
          mockUserId,
          itemsToCreate
        )

        expect(prisma.$transaction).toHaveBeenCalled()
        expect(txMock.product.findUnique).toHaveBeenCalledWith({
          where: { id: mockProduct.id }
        })
        expect(txMock.productItem.create).toHaveBeenCalledWith({
          data: {
            productId: mockProduct.id,
            quantity: 1,
            price: mockProduct.price
          }
        })
        expect(txMock.purchase.create).toHaveBeenCalledWith({
          data: {
            userId: mockUserId,
            status: PurchaseStatus.PENDING,
            total: mockProduct.price,
            productItems: {
              connect: [],
              createMany: {
                data: [
                  {
                    productId: createdProductItem.productId,
                    quantity: createdProductItem.quantity,
                    price: createdProductItem.price
                  }
                ]
              }
            }
          }
        })
        expect(result).toEqual(mockPurchase)
      })

      it("should create a purchase with existing product items and disconnect from cart", async () => {
        const itemsToConnect = [
          {
            productItemId: mockProductItem.id,
            productId: mockProduct.id,
            quantity: 1
          }
        ]
        const mockPurchase = {
          id: "new-purchase",
          userId: mockUserId,
          total: mockProduct.price,
          productItems: [mockProductItem]
        }

        // Configure the txMock methods for this specific test
        txMock.productItem.findUnique.mockResolvedValue(mockProductItem) // Mock for tx.productItem.findUnique
        txMock.purchase.create.mockResolvedValue(mockPurchase)
        txMock.cart.update.mockResolvedValue({})

        const result = await purchaseService.createPurchase(
          mockUserId,
          itemsToConnect,
          mockCartId
        )

        expect(prisma.$transaction).toHaveBeenCalled()
        expect(txMock.productItem.findUnique).toHaveBeenCalledWith({
          where: { id: mockProductItem.id }
        })
        expect(txMock.purchase.create).toHaveBeenCalledWith({
          data: {
            userId: mockUserId,
            status: PurchaseStatus.PENDING,
            total: mockProduct.price,
            productItems: {
              connect: [{ id: mockProductItem.id }],
              createMany: { data: [] }
            }
          }
        })
        expect(txMock.cart.update).toHaveBeenCalledWith({
          where: { id: mockCartId },
          data: {
            items: {
              disconnect: [{ id: mockProductItem.id }]
            }
          }
        })
        expect(result).toEqual(mockPurchase)
      })

      it("should throw an error if product not found when creating new items", async () => {
        const itemsToCreate = [{ productId: "non-existent", quantity: 1 }]

        // Configure the txMock methods for this specific test
        txMock.product.findUnique.mockResolvedValue(null) // Product not found

        await expect(
          purchaseService.createPurchase(mockUserId, itemsToCreate)
        ).rejects.toThrow("Produto com id non-existent não encontrado.")
      })

      it("should throw an error if Prisma throws an error during transaction", async () => {
        // Mock $transaction to throw an error directly
        ;(prisma.$transaction as jest.Mock).mockRejectedValue(
          new Error("Transaction failed")
        )

        await expect(
          purchaseService.createPurchase(mockUserId, [])
        ).rejects.toThrow("Transaction failed")
      })
    })
  })
})
