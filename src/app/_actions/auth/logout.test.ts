/* eslint-disable no-extra-semi */
// src/app/_actions/auth/logout.test.ts

// Mock external dependencies
jest.mock("@/services/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signOut: jest.fn()
    }
  }))
}))
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}))
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

import { logoutAction } from "./logout"
import { createClient } from "@/services/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

describe("logoutAction", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should successfully log out the user", async () => {
    // Mock successful Supabase signOut
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: jest.fn().mockResolvedValue({ error: null })
      }
    })

    await logoutAction()

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.signOut).toHaveBeenCalledTimes(1)
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/login")
  })

  it("should handle Supabase logout error", async () => {
    const mockError = new Error("Logout failed")
    // Mock failed Supabase signOut
    ;(createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: jest.fn().mockResolvedValue({ error: mockError })
      }
    })

    // Spy on console.error to check if the error is logged
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await logoutAction()

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1)
    expect((await createClient()).auth.signOut).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith({ error: mockError })
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/login")

    // Restore console.error
    consoleErrorSpy.mockRestore()
  })
})
