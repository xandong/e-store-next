// Mock the @/lib/prisma module FIRST
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    }
  }
}))

import { PrismaClient } from "@/types/prisma/generated"
/* eslint-disable no-extra-semi */
// import { PrismaClient } from "@/types/prisma/generated"
import { UserService } from "."

// Mock the @prisma/client module
jest.mock("@/types/prisma/generated", () => {
  const mockUser = {
    findUnique: jest.fn(),
    findMany: jest.fn()
  }
  const mockPrismaClient = {
    user: mockUser
  }
  return {
    PrismaClient: jest.fn(() => mockPrismaClient)
  }
})

describe("UserService", () => {
  let userService: UserService
  let mockPrisma: PrismaClient

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Create a new mock PrismaClient instance for each test
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>
    userService = new UserService(mockPrisma)
  })

  describe("getUserById", () => {
    it("should return user data when found", async () => {
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com"
      }
      ;(mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

      const result = await userService.getUserById(1)

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      })
      expect(result).toEqual(mockUser)
    })

    it("should return null when user not found", async () => {
      ;(mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await userService.getUserById(99)

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 99 }
      })
      expect(result).toBeNull()
    })

    it("should throw an error if Prisma throws an error", async () => {
      const errorMessage = "Database error"
      ;(mockPrisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      )

      await expect(userService.getUserById(1)).rejects.toThrow(
        "Não foi possível buscar o usuário."
      )
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      })
    })
  })

  describe("getUserList", () => {
    it("should return a list of users when found", async () => {
      const mockUsers = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" }
      ]
      ;(mockPrisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)

      const result = await userService.getUserList()

      expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockUsers)
    })

    it("should return an empty array when no users are found", async () => {
      ;(mockPrisma.user.findMany as jest.Mock).mockResolvedValue([])

      const result = await userService.getUserList()

      expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual([])
    })

    it("should throw an error if Prisma throws an error", async () => {
      const errorMessage = "Database error during list fetch"
      ;(mockPrisma.user.findMany as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      )

      await expect(userService.getUserList()).rejects.toThrow(
        "Não foi possível buscar a lista de usuários."
      )
      expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1)
    })
  })
})
