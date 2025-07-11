import { PrismaClient } from "@/types/prisma/generated"
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS_BY_CATEGORY } from "./data"

const prisma = new PrismaClient()

const main = async () => {
  try {
    // Seed categories if they don't exist
    const existingCategory = await prisma.category.findFirst()
    if (!existingCategory) {
      await prisma.category.createMany({
        data: DEFAULT_CATEGORIES.map((category, index) => ({
          id: index + 1, // Assign IDs starting from 1
          name: category.name,
          slug: category.slug, // Use slug from DEFAULT_CATEGORIES
          image:
            "https://http2.mlstatic.com/D_NQ_NP_2X_234567-MLB34567890123_032023-F.jpg"
        })),
        skipDuplicates: true
      })
      console.log("Categories seeded successfully.")
    }

    // Seed products if they don't exist
    const existingProduct = await prisma.product.findFirst()
    if (!existingProduct) {
      // Map category slugs to their IDs
      const categorySlugToId = Object.fromEntries(
        DEFAULT_CATEGORIES.map((category, index) => [category.slug, index + 1])
      )

      // Flatten products and map to Prisma-compatible format
      const products = DEFAULT_PRODUCTS_BY_CATEGORY.flatMap((categoryObj) => {
        const categoryKey = Object.keys(
          categoryObj
        )[0] as keyof typeof categoryObj
        const categoryId =
          categorySlugToId[categoryKey.replace(/([A-Z])/g, "-$1").toLowerCase()]
        if (!categoryId) {
          console.warn(
            `Category ${categoryKey} not found in DEFAULT_CATEGORIES.`
          )
          return []
        }
        return categoryObj![categoryKey]!.map((product) => ({
          id: product.id,
          title: product.title,
          slug: product.slug,
          price: product.price,
          description: product.description,
          images: product.images,
          externalId: product.externalId,
          categoryId: categoryId,
          createdAt: product.createdAt
        }))
      })

      await prisma.product.createMany({
        data: products,
        skipDuplicates: true
      })
      console.log("Products seeded successfully.")
    }
  } catch (error) {
    console.error("[SEED ERROR]:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error("[SEED FAILED]:", e)
  process.exit(1)
})
