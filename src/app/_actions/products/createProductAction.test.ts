/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/_actions/products/createProductAction.test.ts

// Mock external dependencies
jest.mock("@/services/products-service", () => ({
  productService: {
    createProduct: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))

import { createProductAction } from "./createProductAction"
import { productService } from "@/services/products-service"
import { revalidatePath } from "next/cache"
import { z } from "zod"

describe("createProductAction", () => {
  const mockProductData = {
    categoryId: 1,
    title: "Test Product",
    slug: "test-product",
    description: "A test product",
    price: 100,
    images: ["http://example.com/image.jpg"]
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully create a product and revalidate path", async () => {
    const mockCreatedProduct = { id: "prod1", ...mockProductData }
    // Mock successful product creation
    ;(productService.createProduct as jest.Mock).mockResolvedValue(
      mockCreatedProduct
    )

    const result = await createProductAction(mockProductData as unknown as any)

    // Assertions
    expect(productService.createProduct).toHaveBeenCalledWith(mockProductData)
    expect(revalidatePath).toHaveBeenCalledWith("/products")
    expect(result).toEqual(mockCreatedProduct)
  })

  it("should throw a Zod error for invalid input (missing title)", async () => {
    const invalidData = { ...mockProductData, title: undefined }

    // Expect the action to throw a ZodError directly due to parse()
    await expect(createProductAction(invalidData as any)).rejects.toThrow(
      z.ZodError
    )
    await expect(
      createProductAction(invalidData as any)
    ).rejects.toHaveProperty("issues")

    // Ensure no external calls were made
    expect(productService.createProduct).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should propagate error if productService.createProduct fails", async () => {
    const mockError = new Error("Failed to create product")

    // Mock service to throw an error
    ;(productService.createProduct as jest.Mock).mockRejectedValue(mockError)

    await expect(
      createProductAction(mockProductData as unknown as any)
    ).rejects.toThrow(mockError)

    // Assertions
    expect(productService.createProduct).toHaveBeenCalledWith(mockProductData)
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
