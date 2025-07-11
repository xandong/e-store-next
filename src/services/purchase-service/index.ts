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

  async getPurchaseById(id: string) {
    try {
      const purchase = await this.prisma.purchase.findUnique({
        where: {
          id
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

  async getPurchasesByUserId() {
    const externalUserId = await this.getUserExternalId()
    try {
      const purchases = await this.prisma.purchase.findMany({
        where: {
          user: { externalId: externalUserId }
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
      try {
        // 1. Separar os itens a conectar (já existem) e os a criar
        const itemsToConnect = items.filter((item) => item.productItemId)
        const itemsToCreate = items.filter(
          (item) => !item.productItemId && item.productId && item.quantity
        )

        // 2. Validação básica
        for (const item of itemsToCreate) {
          if (!item.productId || !item.quantity) {
            throw new Error("Itens a criar devem conter productId e quantity.")
          }
        }

        // 3. Criar novos ProductItems com base nos produtos
        const createdProductItems = await Promise.all(
          itemsToCreate.map(async (item) => {
            const product = await tx.product.findUnique({
              where: { id: item.productId! }
            })

            if (!product) {
              throw new Error(
                `Produto com id ${item.productId} não encontrado.`
              )
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

        // 4. Criar a compra com os itens conectados e criados
        const purchase = await tx.purchase.create({
          data: {
            user: { connect: { externalId: await this.getUserExternalId() } },
            status: PurchaseStatus.PENDING,
            productItems: {
              connect: itemsToConnect.map((item) => ({
                id: item.productItemId!
              })),
              connectOrCreate: [],
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

        // 5. Se veio de um carrinho, remover os itens conectados dele
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
      } catch (error) {
        console.error("Falha ao criar compra:", error)
        throw new Error("Falha ao criar compra.")
      }
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
