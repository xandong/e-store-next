// src/app/_actions/product-item/removeProductItemAction.test.ts

// Mock external dependencies
jest.mock("@/services/product-item-service", () => ({
  productItemService: {
    removeProductItem: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))

import { removeProductItemAction } from "./removeProductItemAction"
import { productItemService } from "@/services/product-item-service"
import { revalidatePath } from "next/cache"
import { z } from "zod"

describe("removeProductItemAction", () => {
  const mockProductItemId = "item123"

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully remove a product item and revalidate path", async () => {
    // Mock successful removal
    ;(productItemService.removeProductItem as jest.Mock).mockResolvedValue(
      undefined
    )

    await removeProductItemAction(mockProductItemId)

    // Assertions
    expect(productItemService.removeProductItem).toHaveBeenCalledWith(
      mockProductItemId
    )
    expect(revalidatePath).toHaveBeenCalledWith("/cart")
  })

  it("should throw a Zod error for invalid input (empty productItemId)", async () => {
    const invalidProductItemId = ""

    // Expect the action to throw a ZodError directly due to parse()
    await expect(removeProductItemAction(invalidProductItemId)).rejects.toThrow(
      z.ZodError
    )
    await expect(
      removeProductItemAction(invalidProductItemId)
    ).rejects.toHaveProperty("issues")

    // Ensure no external calls were made
    expect(productItemService.removeProductItem).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should propagate error if productItemService.removeProductItem fails", async () => {
    const mockError = new Error("Failed to remove item")

    // Mock service to throw an error
    ;(productItemService.removeProductItem as jest.Mock).mockRejectedValue(
      mockError
    )

    await expect(removeProductItemAction(mockProductItemId)).rejects.toThrow(
      mockError
    )

    // Assertions
    expect(productItemService.removeProductItem).toHaveBeenCalledWith(
      mockProductItemId
    )
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
