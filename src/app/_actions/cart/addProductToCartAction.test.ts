// src/app/_actions/cart/addProductToCartAction.test.ts

// Mock external dependencies
jest.mock("@/services/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn()
    }
  }))
}))
jest.mock("@/services/cart-service", () => ({
  cartService: {
    addProductToCart: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

import { addProductToCartAction } from "./addProductToCartAction"
import { createClient } from "@/services/supabase/server"
import { cartService } from "@/services/cart-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

describe("addProductToCartAction", () => {
  const mockProductId = "prod123"
  const mockQuantity = 1
  const mockSupabaseUserId = "supabase-user-id"

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully add a product to the cart for an authenticated user", async () => {
    // Mock authenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock successful addition to cart
    ;(cartService.addProductToCart as jest.Mock).mockResolvedValue({
      id: "cartItem1",
      productId: mockProductId,
      quantity: mockQuantity
    })

    await addProductToCartAction(mockProductId, mockQuantity)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(createClient().auth.getUser).toHaveBeenCalledTimes(1)
    expect(cartService.addProductToCart).toHaveBeenCalledWith(
      mockSupabaseUserId,
      mockProductId,
      mockQuantity
    )
    expect(revalidatePath).toHaveBeenCalledWith("/cart")
    expect(redirect).not.toHaveBeenCalled()
  })

  it("should redirect to sign-in if the user is not authenticated", async () => {
    // Mock unauthenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null } })
      }
    })

    // Expect the action to throw an error due to redirect()
    await expect(
      addProductToCartAction(mockProductId, mockQuantity)
    ).rejects.toThrow()

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(createClient().auth.getUser).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith("/sign-in")
    expect(cartService.addProductToCart).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should throw a Zod error for invalid input (quantity < 1)", async () => {
    const invalidQuantity = 0

    // Expect the action to throw a ZodError directly due to parse()
    await expect(
      addProductToCartAction(mockProductId, invalidQuantity)
    ).rejects.toThrow(z.ZodError)
    await expect(
      addProductToCartAction(mockProductId, invalidQuantity)
    ).rejects.toHaveProperty("issues")

    // Ensure no external calls were made before Zod validation
    expect(createClient).not.toHaveBeenCalled()
    expect(cartService.addProductToCart).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })

  it("should propagate error if cartService.addProductToCart fails", async () => {
    const mockError = new Error("Failed to add product to cart")

    // Mock authenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock cartService to throw an error
    ;(cartService.addProductToCart as jest.Mock).mockRejectedValue(mockError)

    await expect(
      addProductToCartAction(mockProductId, mockQuantity)
    ).rejects.toThrow(mockError)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(createClient().auth.getUser).toHaveBeenCalledTimes(1)
    expect(cartService.addProductToCart).toHaveBeenCalledWith(
      mockSupabaseUserId,
      mockProductId,
      mockQuantity
    )
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })
})
