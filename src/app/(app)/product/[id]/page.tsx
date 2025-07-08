import { getProductById } from "@/app/_actions/products/getProductById"
import { AppLayout } from "@/components/layout/app-layout"
import { Gallery } from "@/components/misc/gallery"

export default async function ProductPage({
  params
}: {
  params: { id: number }
}) {
  const product = await getProductById(params.id)

  return (
    <AppLayout>
      <section className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
            <Gallery images={product.images || []} />
            {/* <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.title || "Imagem do produto"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            /> */}
          </div>

          <article className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {product.title}
            </h1>

            {product.category && (
              <span className="inline-block w-fit bg-indigo-500 text-white text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full">
                {product.category.name}
              </span>
            )}

            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
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
