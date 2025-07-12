// src/app/_actions/cart/getCartAction.test.ts

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
    getCartByUserId: jest.fn()
  }
}))
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

import { getCartAction } from "./getCartAction"
import { createClient } from "@/services/supabase/server"
import { cartService } from "@/services/cart-service"
import { redirect } from "next/navigation"

describe("getCartAction", () => {
  const mockSupabaseUserId = "supabase-user-id"

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully return the cart for an authenticated user", async () => {
    const mockCart = { id: "cart1", userId: "db-user-id", items: [] }

    // Mock authenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock successful cart retrieval
    ;(cartService.getCartByUserId as jest.Mock).mockResolvedValue(mockCart)

    const result = await getCartAction()

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(createClient().auth.getUser).toHaveBeenCalledTimes(1)
    expect(cartService.getCartByUserId).toHaveBeenCalledWith(mockSupabaseUserId)
    expect(redirect).not.toHaveBeenCalled()
    expect(result).toEqual(mockCart)
  })

  it("should redirect to sign-in if the user is not authenticated", async () => {
    // Mock unauthenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null } })
      }
    })

    // Expect the action to throw an error due to redirect()
    await expect(getCartAction()).rejects.toThrow()

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(createClient().auth.getUser).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith("/sign-in")
    expect(cartService.getCartByUserId).not.toHaveBeenCalled()
  })

  it("should propagate error if cartService.getCartByUserId fails", async () => {
    const mockError = new Error("Failed to retrieve cart")

    // Mock authenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock cartService to throw an error
    ;(cartService.getCartByUserId as jest.Mock).mockRejectedValue(mockError)

    await expect(getCartAction()).rejects.toThrow(mockError)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(createClient().auth.getUser).toHaveBeenCalledTimes(1)
    expect(cartService.getCartByUserId).toHaveBeenCalledWith(mockSupabaseUserId)
    expect(redirect).not.toHaveBeenCalled()
  })
})
