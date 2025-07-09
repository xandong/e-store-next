// import { PrismaClient } from "@prisma/client"

// Definimos a classe UserService
export class UserService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  /**
   * Busca um usuário pelo seu ID no banco de dados.
   * @param id O ID do usuário a ser buscado.
   * @returns O usuário encontrado ou null se não existir.
   */
  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      return user
    } catch (error) {
      console.error("Falha ao buscar usuário:", error)
      throw new Error("Não foi possível buscar o usuário.")
    }
  }

  /**
   * Busca uma lista de usuários no banco de dados.
   * @returns Uma lista de usuários.
   */
  async getUserList() {
    try {
      const users = await this.prisma.user.findMany()
      return users
    } catch (error) {
      console.error("Falha ao buscar lista de usuários:", error)
      throw new Error("Não foi possível buscar a lista de usuários.")
    }
  }

  // Você pode adicionar outros métodos aqui, como createUser, updateUser, deleteUser, etc.
  // async createUser(data: Prisma.UserCreateInput) { ... }
}

import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@/types/prisma/generated"

export const userService = new UserService(prisma)
