/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/product-item-service/productItemService.test.ts

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: {
    productItem: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}))

import { prisma } from "@/lib/prisma"
import { ProductItemService } from "."

describe("ProductItemService", () => {
  let productItemService: ProductItemService

  beforeEach(() => {
    jest.clearAllMocks()
    productItemService = new ProductItemService(prisma as any)
  })

  describe("getProductItemById", () => {
    it("should return a product item when found", async () => {
      const mockProductItem = {
        id: "1",
        quantity: 1,
        productId: "prod1",
        product: { title: "Test Product" }
      }
      ;(prisma.productItem.findUnique as jest.Mock).mockResolvedValue(
        mockProductItem
      )

      const result = await productItemService.getProductItemById("1")

      expect(prisma.productItem.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
        include: { product: true }
      })
      expect(result).toEqual(mockProductItem)
    })

    it("should return null if product item not found", async () => {
      ;(prisma.productItem.findUnique as jest.Mock).mockResolvedValue(null)
      const result = await productItemService.getProductItemById("99")
      expect(result).toBeNull()
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.productItem.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(productItemService.getProductItemById("1")).rejects.toThrow(
        "Falha ao buscar item de produto."
      )
    })
  })

  describe("updateProductItemQuantity", () => {
    it("should update and return the product item with new quantity", async () => {
      const updatedProductItem = { id: "1", quantity: 5, productId: "prod1" }
      ;(prisma.productItem.update as jest.Mock).mockResolvedValue(
        updatedProductItem
      )

      const result = await productItemService.updateProductItemQuantity("1", 5)

      expect(prisma.productItem.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { quantity: 5 }
      })
      expect(result).toEqual(updatedProductItem)
    })

    it("should throw a custom error if update fails", async () => {
      ;(prisma.productItem.update as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(
        productItemService.updateProductItemQuantity("1", 5)
      ).rejects.toThrow("Falha ao atualizar quantidade do item de produto.")
    })
  })

  describe("removeProductItem", () => {
    it("should call delete with the correct id", async () => {
      ;(prisma.productItem.delete as jest.Mock).mockResolvedValue({})

      await productItemService.removeProductItem("1")

      expect(prisma.productItem.delete).toHaveBeenCalledWith({
        where: { id: "1" }
      })
    })

    it("should throw a custom error if deletion fails", async () => {
      ;(prisma.productItem.delete as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(productItemService.removeProductItem("1")).rejects.toThrow(
        "Falha ao remover item de produto."
      )
    })
  })
})
