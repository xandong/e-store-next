// src/app/_actions/product-item/updateProductItemQuantityAction.test.ts

// Mock external dependencies
jest.mock("@/services/product-item-service", () => ({
  productItemService: {
    updateProductItemQuantity: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))

import { updateProductItemQuantityAction } from "./updateProductItemQuantityAction"
import { productItemService } from "@/services/product-item-service"
import { revalidatePath } from "next/cache"
import { z } from "zod"

describe("updateProductItemQuantityAction", () => {
  const mockProductItemId = "item123"
  const mockQuantity = 5

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully update product item quantity and revalidate path", async () => {
    const mockUpdatedItem = { id: mockProductItemId, quantity: mockQuantity }
    // Mock successful update
    ;(
      productItemService.updateProductItemQuantity as jest.Mock
    ).mockResolvedValue(mockUpdatedItem)

    const result = await updateProductItemQuantityAction(
      mockProductItemId,
      mockQuantity
    )

    // Assertions
    expect(productItemService.updateProductItemQuantity).toHaveBeenCalledWith(
      mockProductItemId,
      mockQuantity
    )
    expect(revalidatePath).toHaveBeenCalledWith("/cart")
    expect(result).toEqual(mockUpdatedItem)
  })

  it("should throw a Zod error for invalid input (quantity < 1)", async () => {
    const invalidQuantity = 0

    // Expect the action to throw a ZodError directly due to parse()
    await expect(
      updateProductItemQuantityAction(mockProductItemId, invalidQuantity)
    ).rejects.toThrow(z.ZodError)
    await expect(
      updateProductItemQuantityAction(mockProductItemId, invalidQuantity)
    ).rejects.toHaveProperty("issues")

    // Ensure no external calls were made
    expect(productItemService.updateProductItemQuantity).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should throw a Zod error for invalid input (empty productItemId)", async () => {
    const invalidProductItemId = ""

    // Expect the action to throw a ZodError directly due to parse()
    await expect(
      updateProductItemQuantityAction(invalidProductItemId, mockQuantity)
    ).rejects.toThrow(z.ZodError)
    await expect(
      updateProductItemQuantityAction(invalidProductItemId, mockQuantity)
    ).rejects.toHaveProperty("issues")

    // Ensure no external calls were made
    expect(productItemService.updateProductItemQuantity).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should propagate error if productItemService.updateProductItemQuantity fails", async () => {
    const mockError = new Error("Failed to update quantity")

    // Mock service to throw an error
    ;(
      productItemService.updateProductItemQuantity as jest.Mock
    ).mockRejectedValue(mockError)

    await expect(
      updateProductItemQuantityAction(mockProductItemId, mockQuantity)
    ).rejects.toThrow(mockError)

    // Assertions
    expect(productItemService.updateProductItemQuantity).toHaveBeenCalledWith(
      mockProductItemId,
      mockQuantity
    )
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
