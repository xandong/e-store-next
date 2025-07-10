import { PrismaClient } from "@/types/prisma/generated"
import { prisma } from "@/lib/prisma"

export class CartService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  async getCartByUserId(userId: number) {
    try {
      let cart = await this.prisma.cart.findUnique({
        where: {
          userId
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: {
            userId
          },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        })
      }

      if (!cart) {
        throw new Error("Erro ao obter um carrinho.")
      }
      return cart
    } catch (error) {
      console.error("Falha ao buscar carrinho:", error)
      throw new Error("Falha ao buscar carrinho.")
    }
  }

  async addProductToCart(userId: number, productId: string, quantity: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId }
      })

      if (!product) {
        throw new Error("Produto não encontrado.")
      }

      let cart = await this.prisma.cart.findUnique({
        where: { userId }
      })

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: { userId }
        })
      }

      const cartItem = await this.prisma.productItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          price: product.price,
          quantity
        }
      })

      return cartItem
    } catch (error) {
      console.error("Falha ao adicionar produto ao carrinho:", error)
      throw new Error("Falha ao adicionar produto ao carrinho.")
    }
  }
}

export const cartService = new CartService(prisma)
