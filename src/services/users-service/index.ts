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
  async getUserByIds(id?: string, externalId?: string) {
    if (!id && !externalId) {
      throw new Error("ID do usuário não fornecido.")
    }

    try {
      if (externalId) {
        const user = await this.prisma.user.findUnique({
          where: {
            externalId
          }
        })
        return user
      }

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

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({ data })

      return user
    } catch (error) {
      console.error("Falha ao criar usuário:", error)
      throw new Error("Não foi possível criar o usuário.")
    }
  }
}

import { prisma } from "@/lib/prisma"
import { Prisma, PrismaClient } from "@/types/prisma/generated"

export const userService = new UserService(prisma)
