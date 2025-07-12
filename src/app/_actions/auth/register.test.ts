/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/_actions/auth/register.test.ts

// Mock external dependencies
jest.mock("@/services/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn()
    }
  }))
}))
jest.mock("@/services/users-service", () => ({
  userService: {
    createUser: jest.fn()
  }
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

import { signupAction } from "./register"
import { createClient } from "@/services/supabase/server"
import { userService } from "@/services/users-service"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

describe("signupAction", () => {
  const mockFormData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    confirmPassword: "password123"
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset process.env.SUPABASE_EMAIL_CONFIRMATION for each test
    process.env.SUPABASE_EMAIL_CONFIRMATION = "0"
  })

  it("should successfully sign up and create a user", async () => {
    process.env.SUPABASE_EMAIL_CONFIRMATION = "0" // Explicitly set for this test

    // Mock successful Supabase signup
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signUp: jest.fn().mockResolvedValue({
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

    // Mock successful user creation in our database
    ;(userService.createUser as jest.Mock).mockResolvedValue({
      id: "db-user-id",
      externalId: "supabase-user-id",
      email: "test@example.com",
      name: "Test User"
    })

    const result = await signupAction(mockFormData)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.signUp).toHaveBeenCalledWith({
      email: mockFormData.email,
      password: mockFormData.password,
      options: {
        data: {
          name: mockFormData.name
        }
      }
    })
    expect(userService.createUser).toHaveBeenCalledWith({
      externalId: "supabase-user-id",
      email: mockFormData.email,
      name: mockFormData.name
    })
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/")
    expect(result).toEqual({ error: undefined, confirmation_sent: false })
  })

  it("should return confirmation_sent true if SUPABASE_EMAIL_CONFIRMATION is 1", async () => {
    process.env.SUPABASE_EMAIL_CONFIRMATION = "1"

    // Mock successful Supabase signup
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signUp: jest.fn().mockResolvedValue({
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

    // Mock successful user creation in our database
    ;(userService.createUser as jest.Mock).mockResolvedValue({
      id: "db-user-id",
      externalId: "supabase-user-id",
      email: "test@example.com",
      name: "Test User"
    })

    const result = await signupAction(mockFormData)

    // Assertions
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
    expect(result).toEqual({ error: undefined, confirmation_sent: true })
  })

  it("should return an error if passwords do not match", async () => {
    const invalidFormData = { ...mockFormData, confirmPassword: "mismatch" }

    const result = await signupAction(invalidFormData)

    expect(createClient).not.toHaveBeenCalled()
    expect(userService.createUser).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
    expect(result).toEqual({
      error: "Passwords do not match",
      confirmation_sent: false
    })
  })

  it("should return an error if Supabase signup fails", async () => {
    const mockError = new Error("Signup failed")
    // Mock failed Supabase signup
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: { user: null },
          error: mockError
        })
      }
    })

    // Spy on console.error to check if the error is logged
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    const result = await signupAction(mockFormData)

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect(userService.createUser).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError)
    expect(result).toEqual({
      error: `Error when sign up. ${mockError.message}`,
      confirmation_sent: false
    })

    // Restore console.error
    consoleErrorSpy.mockRestore()
  })

  it("should handle Zod validation error", async () => {
    const invalidFormData = { ...mockFormData, email: "invalid-email" }

    // We expect the action to throw a ZodError directly due to parse()
    await expect(signupAction(invalidFormData as any)).rejects.toThrow()
    await expect(signupAction(invalidFormData as any)).rejects.toHaveProperty(
      "issues"
    )

    // Ensure no external calls were made
    expect(createClient).not.toHaveBeenCalled()
    expect(userService.createUser).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })
})
