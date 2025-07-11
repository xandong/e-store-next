import { getCategoriesListAction } from "@/app/_actions/categories/getCategoriesList"
import { getProductsListAction } from "@/app/_actions/products/getProductsList"

import { AppLayout } from "@/components/layout/app-layout"
import { Section } from "@/components/misc/section"

export const revalidate = 60

export default async function Home() {
  const products = await getProductsListAction()
  const categories = await getCategoriesListAction()

  return (
    <AppLayout>
      <div className="w-full flex flex-col p-4 gap-8 my-6">
        {categories.map((category) => (
          <Section
            key={category.id}
            category={category}
            products={products.filter(
              (product) => product.categoryId === category.id
            )}
          />
        ))}
      </div>
    </AppLayout>
  )
}
