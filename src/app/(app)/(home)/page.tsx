import { AppLayout } from "@/components/layout/app-layout"
import { getProductsList } from "../../_actions/products/getProductsList"
import { Section } from "@/components/misc/section"

export const revalidate = 60

export default async function Home() {
  const products = await getProductsList()

  return (
    <AppLayout>
      <Section products={products} />
    </AppLayout>
  )
}
