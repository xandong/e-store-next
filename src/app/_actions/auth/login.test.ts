/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/_actions/auth/login.test.ts

// Mock external dependencies
jest.mock("@/services/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn()
    }
  }))
}))
jest.mock("@/services/users-service", () => ({
  userService: {
    getUserByIds: jest.fn(),
    createUser: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

import { loginAction } from "./login"
import { createClient } from "@/services/supabase/server"
import { userService } from "@/services/users-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

describe("loginAction", () => {
  const mockFormData = {
    email: "test@example.com",
    password: "password123"
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully log in an existing user", async () => {
    // Mock successful Supabase login
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: {
            user: {
              id: "supabase-user-id",
              user_metadata: { name: "Test User" }
            }
          },
          error: null
        })
      }
    })

    // Mock user existing in our database
    ;(userService.getUserByIds as jest.Mock).mockResolvedValue({
      id: "db-user-id",
      externalId: "supabase-user-id",
      email: "test@example.com",
      name: "Test User"
    })

    await loginAction(mockFormData)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.signInWithPassword).toHaveBeenCalledWith(
      mockFormData
    )
    expect(userService.getUserByIds).toHaveBeenCalledWith(
      undefined,
      "supabase-user-id"
    )
    expect(userService.createUser).not.toHaveBeenCalled() // User already exists
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/")
  })

  it("should successfully log in and create a new user if not found in database", async () => {
    // Mock successful Supabase login
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: {
            user: {
              id: "supabase-user-id-new",
              user_metadata: { name: "New User" }
            }
          },
          error: null
        })
      }
    })

    // Mock user not existing in our database
    ;(userService.getUserByIds as jest.Mock).mockResolvedValue(null)
    ;(userService.createUser as jest.Mock).mockResolvedValue({
      id: "new-db-user-id",
      externalId: "supabase-user-id-new",
      email: "test@example.com",
      name: "New User"
    })

    await loginAction(mockFormData)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.signInWithPassword).toHaveBeenCalledWith(
      mockFormData
    )
    expect(userService.getUserByIds).toHaveBeenCalledWith(
      undefined,
      "supabase-user-id-new"
    )
    expect(userService.createUser).toHaveBeenCalledWith({
      externalId: "supabase-user-id-new",
      email: mockFormData.email,
      name: "New User"
    })
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/")
  })

  it("should return an error if Supabase login fails", async () => {
    const mockError = new Error("Invalid credentials")
    // Mock failed Supabase login
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { user: null },
          error: mockError
        })
      }
    })

    const result = await loginAction(mockFormData)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.signInWithPassword).toHaveBeenCalledWith(
      mockFormData
    )
    expect(userService.getUserByIds).not.toHaveBeenCalled()
    expect(userService.createUser).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
    expect(result).toEqual({
      error: `Error when sign in. ${mockError.message}`
    })
  })

  it("should handle Zod validation error", async () => {
    const invalidFormData = { email: "invalid-email", password: "short" }

    // We expect the action to throw a ZodError directly due to parse()
    await expect(loginAction(invalidFormData as any)).rejects.toThrow()
    await expect(loginAction(invalidFormData as any)).rejects.toHaveProperty(
      "issues"
    )

    // Ensure no external calls were made
    expect(createClient).not.toHaveBeenCalled()
    expect(userService.getUserByIds).not.toHaveBeenCalled()
    expect(userService.createUser).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })
})
