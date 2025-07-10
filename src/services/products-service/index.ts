import { PrismaClient } from "@/types/prisma/generated"
import { prisma } from "@/lib/prisma"

export class ProductService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  async getProducts() {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          category: true
        }
      })
      return products
    } catch (error) {
      console.error("Falha ao buscar produtos:", error)
      throw new Error("Falha ao buscar produtos.")
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id
        },
        include: {
          category: true
        }
      })
      return product
    } catch (error) {
      console.error("Falha ao buscar produto:", error)
      throw new Error("Falha ao buscar produto.")
    }
  }

  async createProduct(data: {
    title: string
    slug: string
    price: number
    description?: string
    images: string[]
    categoryId?: number
  }) {
    try {
      const product = await this.prisma.product.create({
        data
      })
      return product
    } catch (error) {
      console.error("Falha ao criar produto:", error)
      throw new Error("Falha ao criar produto.")
    }
  }

  async updateProduct(
    id: string,
    data: {
      title?: string
      slug?: string
      price?: number
      description?: string
      images?: string[]
      categoryId?: number
    }
  ) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id
        },
        data
      })
      return product
    } catch (error) {
      console.error("Falha ao atualizar produto:", error)
      throw new Error("Falha ao atualizar produto.")
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.prisma.product.delete({
        where: {
          id
        }
      })
    } catch (error) {
      console.error("Falha ao deletar produto:", error)
      throw new Error("Falha ao deletar produto.")
    }
  }
}

export const productService = new ProductService(prisma)
