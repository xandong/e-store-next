/* eslint-disable no-extra-semi */
// src/app/_actions/products/deleteProductAction.test.ts

// Mock external dependencies
jest.mock("@/services/products-service", () => ({
  productService: {
    deleteProduct: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))

import { deleteProductAction } from "./deleteProductAction"
import { productService } from "@/services/products-service"
import { revalidatePath } from "next/cache"
import { z } from "zod"

describe("deleteProductAction", () => {
  const mockProductId = "prod123"

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully delete a product and revalidate path", async () => {
    // Mock successful deletion
    ;(productService.deleteProduct as jest.Mock).mockResolvedValue(undefined)

    await deleteProductAction(mockProductId)

    // Assertions
    expect(productService.deleteProduct).toHaveBeenCalledWith(mockProductId)
    expect(revalidatePath).toHaveBeenCalledWith("/products")
  })

  it("should throw a Zod error for invalid input (empty productId)", async () => {
    const invalidProductId = ""

    // Expect the action to throw a ZodError directly due to parse()
    await expect(deleteProductAction(invalidProductId)).rejects.toThrow(
      z.ZodError
    )
    await expect(deleteProductAction(invalidProductId)).rejects.toHaveProperty(
      "issues"
    )

    // Ensure no external calls were made
    expect(productService.deleteProduct).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should propagate error if productService.deleteProduct fails", async () => {
    const mockError = new Error("Failed to delete product")

    // Mock service to throw an error
    ;(productService.deleteProduct as jest.Mock).mockRejectedValue(mockError)

    await expect(deleteProductAction(mockProductId)).rejects.toThrow(mockError)

    // Assertions
    expect(productService.deleteProduct).toHaveBeenCalledWith(mockProductId)
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
