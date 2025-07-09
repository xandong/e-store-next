import { AppLayout } from "@/components/layout/app-layout"
import { getProductsList } from "../../_actions/products/getProductsList"
import { Section } from "@/components/misc/section"

export const revalidate = 60

export default async function Home() {
  const products = await getProductsList()
  // const categories = products.reduce<string[]>((acc, product) => {
  //   if (!product.category) return acc
  //   if (!acc.includes(product.category)) {
  //     acc.push(product.category)
  //   }
  //   return acc
  // }, [])

  return (
    <AppLayout>
      <div className="w-full flex flex-col p-4 gap-8">
        <Section products={products} />
        <Section products={products} />
      </div>
    </AppLayout>
  )
}
