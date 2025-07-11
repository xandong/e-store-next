/* eslint-disable no-extra-semi */
// src/services/users-service/userService.test.ts

// Mock the prisma client module.
// This replaces the actual prisma client with a mock object that we can control in our tests.
jest.mock("@/lib/prisma", () => ({
  __esModule: true, // This is needed for ES modules
  prisma: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn()
    }
  }
}))

import { prisma } from "@/lib/prisma"
import { UserService } from "."
import { Prisma } from "@/types/prisma/generated"

describe("UserService", () => {
  let userService: UserService

  // Before each test, we create a new instance of UserService with the mocked prisma client.
  // We also clear all mock function call histories to ensure tests are isolated.
  beforeEach(() => {
    jest.clearAllMocks()
    // We can cast prisma to `any` here because we're passing a mock, not a real PrismaClient instance.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userService = new UserService(prisma as any)
  })

  describe("getUserByIds", () => {
    it("should throw an error if no id or externalId is provided", async () => {
      // Expect the function to throw a specific error when called with no arguments.
      await expect(userService.getUserByIds()).rejects.toThrow(
        "ID do usuário não fornecido."
      )
    })

    it("should call findUnique with id and return user data when found", async () => {
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com"
      }
      // Configure the mock to return a specific user.
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

      const result = await userService.getUserByIds("1")

      // Verify that findUnique was called with the correct parameters.
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: "1" }
      })
      // Verify that the service returned the correct user.
      expect(result).toEqual(mockUser)
    })

    it("should call findUnique with externalId and return user data when found", async () => {
      const mockUser = {
        id: "1",
        externalId: "ext-123",
        name: "John Doe",
        email: "john.doe@example.com"
      }
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

      const result = await userService.getUserByIds(undefined, "ext-123")

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { externalId: "ext-123" }
      })
      expect(result).toEqual(mockUser)
    })

    it("should return null when user is not found", async () => {
      // Configure the mock to return null, simulating a user not found.
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await userService.getUserByIds("99")

      expect(result).toBeNull()
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      const errorMessage = "Database error"
      // Configure the mock to simulate a database error.
      ;(prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      )

      // Verify that the service method throws our custom, user-friendly error.
      await expect(userService.getUserByIds("1")).rejects.toThrow(
        "Não foi possível buscar o usuário."
      )
    })
  })

  describe("getUserList", () => {
    it("should return a list of users", async () => {
      const mockUsers = [
        { id: "1", name: "John Doe", email: "john.doe@example.com" },
        { id: "2", name: "Jane Smith", email: "jane.smith@example.com" }
      ]
      ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)

      const result = await userService.getUserList()

      expect(prisma.user.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockUsers)
    })

    it("should throw a custom error if Prisma throws an error", async () => {
      ;(prisma.user.findMany as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(userService.getUserList()).rejects.toThrow(
        "Não foi possível buscar a lista de usuários."
      )
    })
  })

  describe("createUser", () => {
    it("should create and return a new user", async () => {
      const newUserInput: Prisma.UserCreateInput = {
        externalId: "ext-456",
        email: "new.user@example.com",
        name: "New User"
      }
      const createdUser = { id: "3", ...newUserInput }
      ;(prisma.user.create as jest.Mock).mockResolvedValue(createdUser)

      const result = await userService.createUser(newUserInput)

      expect(prisma.user.create).toHaveBeenCalledWith({ data: newUserInput })
      expect(result).toEqual(createdUser)
    })

    it("should throw a custom error if Prisma throws an error on creation", async () => {
      const newUserInput: Prisma.UserCreateInput = {
        externalId: "ext-456",
        email: "new.user@example.com",
        name: "New User"
      }
      ;(prisma.user.create as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      )

      await expect(userService.createUser(newUserInput)).rejects.toThrow(
        "Não foi possível criar o usuário."
      )
    })
  })
})
