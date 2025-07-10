import { getProductByIdAction } from "@/app/_actions/products/getProductById"
import { Badge } from "@/components/_ui/badge"
import { AppLayout } from "@/components/layout/app-layout"
import { Gallery } from "@/components/misc/gallery"

export default async function ProductPage({
  params
}: {
  params: { id: number }
}) {
  const product = await getProductByIdAction(params.id)

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
              ${product.price?.toFixed(2)}
            </p>

            {/* Botões futuros ou ações */}
            {/* <div className="mt-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
                Adicionar ao carrinho
              </button>
            </div> */}
          </article>
        </div>
      </section>
    </AppLayout>
  )
}
