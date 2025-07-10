import { PrismaClient } from "@/types/prisma/generated"
import { prisma } from "@/lib/prisma"

export class ProductItemService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  async getProductItemById(id: string) {
    try {
      const productItem = await this.prisma.productItem.findUnique({
        where: {
          id
        },
        include: {
          product: true
        }
      })
      return productItem
    } catch (error) {
      console.error("Falha ao buscar item de produto:", error)
      throw new Error("Falha ao buscar item de produto.")
    }
  }

  async updateProductItemQuantity(id: string, quantity: number) {
    try {
      const updatedProductItem = await this.prisma.productItem.update({
        where: {
          id
        },
        data: {
          quantity
        }
      })
      return updatedProductItem
    } catch (error) {
      console.error("Falha ao atualizar quantidade do item de produto:", error)
      throw new Error("Falha ao atualizar quantidade do item de produto.")
    }
  }

  async removeProductItem(id: string) {
    try {
      await this.prisma.productItem.delete({
        where: {
          id
        }
      })
    } catch (error) {
      console.error("Falha ao remover item de produto:", error)
      throw new Error("Falha ao remover item de produto.")
    }
  }
}

export const productItemService = new ProductItemService(prisma)
