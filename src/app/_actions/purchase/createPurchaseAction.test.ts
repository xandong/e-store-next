/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/_actions/purchase/createPurchaseAction.test.ts

// Mock external dependencies
jest.mock("@/services/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn()
    }
  }))
}))
jest.mock("@/services/users-service", () => ({
  userService: {
    getUserByIds: jest.fn()
  }
}))
jest.mock("@/services/purchase-service", () => ({
  purchaseService: {
    createPurchase: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

import { createPurchaseAction } from "./createPurchaseAction"
import { createClient } from "@/services/supabase/server"
import { userService } from "@/services/users-service"
import { purchaseService } from "@/services/purchase-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

describe("createPurchaseAction", () => {
  const mockFormData = {
    items: [{ productItemId: "item1", productId: "prod1", quantity: 1 }],
    cartId: "cart123"
  }
  const mockSupabaseUserId = "supabase-user-id"
  const mockDbUserId = "db-user-id"

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully create a purchase and redirect", async () => {
    const mockPurchase = {
      id: "purchase123",
      userId: mockDbUserId,
      items: mockFormData.items
    }

    // Mock authenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock user found in database
    ;(userService.getUserByIds as jest.Mock).mockResolvedValue({
      id: mockDbUserId,
      externalId: mockSupabaseUserId
    })

    // Mock successful purchase creation
    ;(purchaseService.createPurchase as jest.Mock).mockResolvedValue(
      mockPurchase
    )

    await createPurchaseAction(mockFormData)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.getUser).toHaveBeenCalledTimes(1)
    expect(userService.getUserByIds).toHaveBeenCalledWith(
      undefined,
      mockSupabaseUserId
    )
    expect(purchaseService.createPurchase).toHaveBeenCalledWith(
      mockDbUserId,
      mockFormData.items,
      mockFormData.cartId
    )
    expect(revalidatePath).toHaveBeenCalledWith("/purchases")
    expect(revalidatePath).toHaveBeenCalledWith("/cart")
    expect(redirect).toHaveBeenCalledWith(`/purchases/${mockPurchase.id}`)
  })

  it("should redirect to sign-in if the user is not authenticated", async () => {
    // Mock unauthenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null } })
      }
    })

    await expect(createPurchaseAction(mockFormData)).rejects.toThrow()

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.getUser).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith("/sign-in")
    expect(userService.getUserByIds).not.toHaveBeenCalled()
    expect(purchaseService.createPurchase).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("should throw an error if user is not found in the database", async () => {
    // Mock authenticated user
    // eslint-disable-next-line no-extra-semi
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock user not found in database
    ;(userService.getUserByIds as jest.Mock).mockResolvedValue(null)

    await expect(createPurchaseAction(mockFormData)).rejects.toThrow(
      "User not found in database"
    )

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.getUser).toHaveBeenCalledTimes(1)
    expect(userService.getUserByIds).toHaveBeenCalledWith(
      undefined,
      mockSupabaseUserId
    )
    expect(purchaseService.createPurchase).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })

  it("should propagate error if purchaseService.createPurchase fails", async () => {
    const mockError = new Error("Failed to create purchase")

    // Mock authenticated user
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest
          .fn()
          .mockResolvedValue({ data: { user: { id: mockSupabaseUserId } } })
      }
    })

    // Mock user found in database
    ;(userService.getUserByIds as jest.Mock).mockResolvedValue({
      id: mockDbUserId,
      externalId: mockSupabaseUserId
    })

    // Mock purchaseService to throw an error
    ;(purchaseService.createPurchase as jest.Mock).mockRejectedValue(mockError)

    await expect(createPurchaseAction(mockFormData)).rejects.toThrow(mockError)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.getUser).toHaveBeenCalledTimes(1)
    expect(userService.getUserByIds).toHaveBeenCalledWith(
      undefined,
      mockSupabaseUserId
    )
    expect(purchaseService.createPurchase).toHaveBeenCalledWith(
      mockDbUserId,
      mockFormData.items,
      mockFormData.cartId
    )
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })
})
