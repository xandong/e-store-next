/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/products-service/productsService.test.ts

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}))

import { prisma } from "@/lib/prisma"
import { ProductService } from "."

describe("ProductService", () => {
  let productService: ProductService

  beforeEach(() => {
    jest.clearAllMocks()
    productService = new ProductService(prisma as any)
  })

  describe("getProducts", () => {
    it("should return a list of products with their categories", async () => {
      const mockProducts = [
        { id: "1", title: "Laptop", category: { name: "Electronics" } },
        { id: "2", title: "The Great Gatsby", category: { name: "Books" } }
      ]
      ;(prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts)

      const result = await productService.getProducts()

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        include: { category: true }
      })
      expect(result).toEqual(mockProducts)
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.product.findMany as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(productService.getProducts()).rejects.toThrow(
        "Falha ao buscar produtos."
      )
    })
  })

  describe("getProductById", () => {
    it("should return a single product with its category", async () => {
      const mockProduct = {
        id: "1",
        title: "Laptop",
        category: { name: "Electronics" }
      }
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct)

      const result = await productService.getProductById("1")

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
        include: { category: true }
      })
      expect(result).toEqual(mockProduct)
    })

    it("should return null if product not found", async () => {
      ;(prisma.product.findUnique as jest.Mock).mockResolvedValue(null)
      const result = await productService.getProductById("99")
      expect(result).toBeNull()
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.product.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(productService.getProductById("1")).rejects.toThrow(
        "Falha ao buscar produto."
      )
    })
  })

  describe("createProduct", () => {
    it("should create and return a new product", async () => {
      const newProductData = {
        title: "New Mouse",
        slug: "new-mouse",
        price: 50,
        images: []
      }
      const createdProduct = { id: "3", ...newProductData }
      ;(prisma.product.create as jest.Mock).mockResolvedValue(createdProduct)

      const result = await productService.createProduct(newProductData)

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: newProductData
      })
      expect(result).toEqual(createdProduct)
    })

    it("should throw a custom error if creation fails", async () => {
      const newProductData = {
        title: "New Mouse",
        slug: "new-mouse",
        price: 50,
        images: []
      }
      ;(prisma.product.create as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(
        productService.createProduct(newProductData)
      ).rejects.toThrow("Falha ao criar produto.")
    })
  })

  describe("updateProduct", () => {
    it("should update and return the product", async () => {
      const updateData = { price: 45 }
      const updatedProduct = { id: "1", title: "Laptop", price: 45 }
      ;(prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct)

      const result = await productService.updateProduct("1", updateData)

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: updateData
      })
      expect(result).toEqual(updatedProduct)
    })

    it("should throw a custom error if update fails", async () => {
      ;(prisma.product.update as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(
        productService.updateProduct("1", { price: 99 })
      ).rejects.toThrow("Falha ao atualizar produto.")
    })
  })

  describe("deleteProduct", () => {
    it("should call delete with the correct id", async () => {
      ;(prisma.product.delete as jest.Mock).mockResolvedValue({})

      await productService.deleteProduct("1")

      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: "1" } })
    })

    it("should throw a custom error if deletion fails", async () => {
      ;(prisma.product.delete as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )
      await expect(productService.deleteProduct("1")).rejects.toThrow(
        "Falha ao deletar produto."
      )
    })
  })
})
