import { notFound } from "next/navigation"
import { getProductByIdAction } from "@/app/_actions/products/getProductById"

import { AppLayout } from "@/components/layout/app-layout"
import { Gallery } from "@/components/misc/gallery"
import { ProductInfo } from "@/components/product/product-info"
import { BackButton } from "@/components/misc/back-button"

export const revalidate = 60 * 60

export async function generateMetadata({
  params
}: {
  params: { productId: string }
}) {
  const product = await getProductByIdAction(params.productId)
  if (!product) return {}

  return {
    title: `${product.title} - Loja`,
    description: product.description?.slice(0, 160),
    openGraph: {
      images: product.images?.[0] ? [{ url: product.images[0] }] : []
    }
  }
}

export default async function ProductPage({
  params
}: {
  params: { productId: string }
}) {
  const product = await getProductByIdAction(params.productId)

  if (!product) return notFound()

  return (
    <AppLayout>
      <div className="flex flex-col gap-3 items-start p-6 md:p-10">
        <BackButton />

        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative w-full rounded-xl overflow-hidden shadow-sm">
              <Gallery images={product.images || []} />
            </div>

            <ProductInfo product={product} category={product.category} />
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
