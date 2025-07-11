import { PrismaClient, PurchaseStatus } from "@/types/prisma/generated"
import { prisma } from "@/lib/prisma"
import { createClient } from "../supabase/server"
export class PurchaseService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient as PrismaClient
  }

  async getUserExternalId() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    return data.user?.id
  }

  async getPurchaseById(id: string, userId: string) {
    try {
      const purchase = await this.prisma.purchase.findUnique({
        where: {
          id,
          userId
        },
        include: {
          productItems: {
            include: {
              product: true
            }
          }
        }
      })
      return purchase
    } catch (error) {
      console.error("Falha ao buscar compra:", error)
      throw new Error("Falha ao buscar compra.")
    }
  }

  async getPurchasesByUserId(userId: string) {
    try {
      const purchases = await this.prisma.purchase.findMany({
        where: {
          userId
        },
        include: {
          productItems: {
            include: {
              product: true
            }
          }
        }
      })
      return purchases
    } catch (error) {
      console.error("Falha ao buscar compras do usuário:", error)
      throw new Error("Falha ao buscar compras do usuário.")
    }
  }

  async createPurchase(
    userId: string,
    items: { productItemId?: string; productId?: string; quantity?: number }[],
    cartId?: string
  ) {
    return this.prisma.$transaction(async (tx) => {
      const itemsToConnect = items.filter((item) => item.productItemId)
      const itemsToCreate = items.filter(
        (item) => !item.productItemId && item.productId && item.quantity
      )

      for (const item of itemsToCreate) {
        if (!item.productId || !item.quantity) {
          throw new Error("Itens a criar devem conter productId e quantity.")
        }
      }

      // Criar novos ProductItems com base nos produtos
      const createdProductItems = await Promise.all(
        itemsToCreate.map(async (item) => {
          const product = await tx.product.findUnique({
            where: { id: item.productId! }
          })

          if (!product) {
            throw new Error(`Produto com id ${item.productId} não encontrado.`)
          }

          return tx.productItem.create({
            data: {
              productId: item.productId!,
              quantity: item.quantity!,
              price: product.price
            }
          })
        })
      )

      let itemsToConnectTotal = 0

      if (itemsToConnect.length > 0) {
        for (const item of itemsToConnect) {
          const productItem = await tx.productItem.findUnique({
            where: { id: item.productItemId! }
          })

          if (!productItem) {
            throw new Error(
              `ProductItem com id ${item.productItemId} não encontrado.`
            )
          }
          itemsToConnectTotal += productItem.price * productItem.quantity
        }
      }

      const total =
        createdProductItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ) + itemsToConnectTotal

      // Criar a compra com os itens conectados e criados
      const purchase = await tx.purchase.create({
        data: {
          userId,
          status: PurchaseStatus.PENDING,
          total,
          productItems: {
            connect: itemsToConnect.map((item) => ({
              id: item.productItemId!
            })),
            createMany: {
              data: createdProductItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
              }))
            }
          }
        }
      })

      // Se veio de um carrinho, remover os itens conectados dele
      if (cartId && itemsToConnect.length > 0) {
        await tx.cart.update({
          where: { id: cartId },
          data: {
            items: {
              disconnect: itemsToConnect.map((item) => ({
                id: item.productItemId!
              }))
            }
          }
        })
      }

      return purchase
    })
  }

  async updatePurchaseStatus(id: string, status: PurchaseStatus) {
    try {
      const updatedPurchase = await this.prisma.purchase.update({
        where: {
          id
        },
        data: {
          status
        }
      })
      return updatedPurchase
    } catch (error) {
      console.error("Falha ao atualizar status da compra:", error)
      throw new Error("Falha ao atualizar status da compra.")
    }
  }
}

export const purchaseService = new PurchaseService(prisma)
