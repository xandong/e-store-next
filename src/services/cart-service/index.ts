import { PrismaClient } from "@/types/prisma/generated"
import { prisma } from "@/lib/prisma"

export class CartService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  async getCartByUserId(supabaseId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { externalId: supabaseId }
      })

      if (!user) {
        throw new Error("Usuário não encontrado.")
      }

      let cart = await this.prisma.cart.findUnique({
        where: {
          userId: user.id
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
            userId: user.id
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

  async addProductToCart(
    supabaseId: string,
    productId: string,
    quantity: number
  ) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId }
      })

      if (!product) {
        throw new Error("Produto não encontrado.")
      }

      const user = await this.prisma.user.findUnique({
        where: { externalId: supabaseId }
      })

      if (!user) {
        throw new Error("Usuário não encontrado.")
      }

      let cart = await this.prisma.cart.findUnique({
        where: { userId: user.id }
      })

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: { userId: user.id }
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
