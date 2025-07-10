import { PrismaClient } from "@/types/prisma/generated"
import { prisma } from "@/lib/prisma"

export class CategoriesService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  async getCategories() {
    try {
      const categories = await this.prisma.category.findMany()
      return categories
    } catch (error) {
      console.error("Falha ao buscar categorias:", error)
      throw new Error("Falha ao buscar categorias.")
    }
  }

  async getCategoryBySlug(slug: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          slug
        }
      })
      return category
    } catch (error) {
      console.error("Falha ao buscar categoria:", error)
      throw new Error("Falha ao buscar categoria.")
    }
  }

  async createCategory(data: { name: string; slug: string; image: string }) {
    try {
      const category = await this.prisma.category.create({
        data
      })
      return category
    } catch (error) {
      console.error("Falha ao criar categoria:", error)
      throw new Error("Falha ao criar categoria.")
    }
  }

  async updateCategory(
    id: number,
    data: { name?: string; slug?: string; image?: string }
  ) {
    try {
      const category = await this.prisma.category.update({
        where: {
          id
        },
        data
      })
      return category
    } catch (error) {
      console.error("Falha ao atualizar categoria:", error)
      throw new Error("Falha ao atualizar categoria.")
    }
  }

  async deleteCategory(id: number) {
    try {
      await this.prisma.category.delete({
        where: {
          id
        }
      })
    } catch (error) {
      console.error("Falha ao deletar categoria:", error)
      throw new Error("Falha ao deletar categoria.")
    }
  }
}

export const categoriesService = new CategoriesService(prisma)
