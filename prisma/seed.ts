import { storeApi } from "@/services/api"
import { PrismaClient } from "@/types/prisma/generated"

const prisma = new PrismaClient()

const main = async () => {
  try {
    const response = await storeApi.productsGet()
    console.log({ data: response.data })

    // const categories = await prisma.$transaction([
    //   prisma.category.deleteMany({}),
    //   prisma.category.createMany({
    //     data: DEFAULT_CATEGORIES.map((category) => ({
    //       name: category,
    //       type: CategoryType.PUBLIC
    //     })),
    //     skipDuplicates: true
    //   })
    // ])

    // const existingCategoryNames = categories.map((category) => category.name)

    // const uniqueCategories = DEFAULT_CATEGORIES.filter(
    //   (defaultCategory) => !existingCategoryNames.includes(defaultCategory)
    // )

    // if (uniqueCategories.length > 0) {
    //   await prisma.transactionCategory.createMany({
    //     data: uniqueCategories.map((category) => ({
    //       name: category,
    //       type: CategoryType.PUBLIC
    //     })),
    //     skipDuplicates: true
    //   })
    // }
  } catch (error) {
    console.error("[SEED]: ", { error })
  } finally {
    prisma.$disconnect()
  }
}

main()
