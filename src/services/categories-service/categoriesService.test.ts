/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/categories-service/categoriesService.test.ts

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: {
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}))

import { prisma } from "@/lib/prisma"
import { CategoriesService } from "."

describe("CategoriesService", () => {
  let categoriesService: CategoriesService

  beforeEach(() => {
    jest.clearAllMocks()
    categoriesService = new CategoriesService(prisma as any)
  })

  describe("getCategories", () => {
    it("should return a list of categories", async () => {
      const mockCategories = [
        { id: 1, name: "Electronics", slug: "electronics", image: "url" },
        { id: 2, name: "Books", slug: "books", image: "url" }
      ]
      ;(prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories)

      const result = await categoriesService.getCategories()

      expect(prisma.category.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockCategories)
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.category.findMany as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(categoriesService.getCategories()).rejects.toThrow(
        "Falha ao buscar categorias."
      )
    })
  })

  describe("getCategoryBySlug", () => {
    it("should return a category when found by slug", async () => {
      const mockCategory = {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: "url"
      }
      ;(prisma.category.findUnique as jest.Mock).mockResolvedValue(mockCategory)

      const result = await categoriesService.getCategoryBySlug("electronics")

      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { slug: "electronics" }
      })
      expect(result).toEqual(mockCategory)
    })

    it("should return null if category is not found", async () => {
      ;(prisma.category.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await categoriesService.getCategoryBySlug("non-existent")

      expect(result).toBeNull()
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.category.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(
        categoriesService.getCategoryBySlug("any-slug")
      ).rejects.toThrow("Falha ao buscar categoria.")
    })
  })

  describe("createCategory", () => {
    it("should create and return a new category", async () => {
      const newCategoryData = {
        name: "New Category",
        slug: "new-category",
        image: "url"
      }
      const createdCategory = { id: 3, ...newCategoryData }
      ;(prisma.category.create as jest.Mock).mockResolvedValue(createdCategory)

      const result = await categoriesService.createCategory(newCategoryData)

      expect(prisma.category.create).toHaveBeenCalledWith({
        data: newCategoryData
      })
      expect(result).toEqual(createdCategory)
    })

    it("should throw a custom error if creation fails", async () => {
      const newCategoryData = {
        name: "New Category",
        slug: "new-category",
        image: "url"
      }
      ;(prisma.category.create as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(
        categoriesService.createCategory(newCategoryData)
      ).rejects.toThrow("Falha ao criar categoria.")
    })
  })

  describe("updateCategory", () => {
    it("should update and return the category", async () => {
      const updateData = { name: "Updated Electronics" }
      const updatedCategory = {
        id: 1,
        name: "Updated Electronics",
        slug: "electronics",
        image: "url"
      }
      ;(prisma.category.update as jest.Mock).mockResolvedValue(updatedCategory)

      const result = await categoriesService.updateCategory(1, updateData)

      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData
      })
      expect(result).toEqual(updatedCategory)
    })

    it("should throw a custom error if update fails", async () => {
      ;(prisma.category.update as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(
        categoriesService.updateCategory(1, { name: "fail" })
      ).rejects.toThrow("Falha ao atualizar categoria.")
    })
  })

  describe("deleteCategory", () => {
    it("should call delete with the correct id", async () => {
      ;(prisma.category.delete as jest.Mock).mockResolvedValue({}) // Resolves to mock a successful deletion

      await categoriesService.deleteCategory(1)

      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it("should throw a custom error if deletion fails", async () => {
      ;(prisma.category.delete as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(categoriesService.deleteCategory(1)).rejects.toThrow(
        "Falha ao deletar categoria."
      )
    })
  })
})
