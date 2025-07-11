import { getProductByIdAction } from "@/app/_actions/products/getProductById"
import { Badge } from "@/components/_ui/badge"
import { AppLayout } from "@/components/layout/app-layout"
import { AddToCartButton } from "@/components/misc/add-to-cart-button"
import { BuyNowButton } from "@/components/misc/buy-now-button"
import { Gallery } from "@/components/misc/gallery"
import { numberToCurrency } from "@/utils/formatters"

export default async function ProductPage({
  params
}: {
  params: { productId: string }
}) {
  const product = await getProductByIdAction(params.productId)

  if (!product) return <div>Produto não encontrado</div>

  return (
    <AppLayout>
      <section className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative w-full rounded-xl overflow-hidden shadow-sm">
            <Gallery images={product.images || []} />
          </div>

          <article className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {product.title}
            </h1>

            {product.category && (
              <Badge variant="default" className="mt-2">
                {product.category.name}
              </Badge>
            )}

            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold">
              {numberToCurrency(product.price)}
            </p>

            <div className="flex mt-4 gap-3">
              <BuyNowButton />

              <AddToCartButton
                quantity={1}
                productId={product.id}
                title={product.title}
                price={product.price}
              />
            </div>
          </article>
        </div>
      </section>
    </AppLayout>
  )
}
