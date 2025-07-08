import { AppLayout } from "@/components/layout/app-layout"
import { getProductsList } from "../../_actions/products/getProductsList"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60

export default async function Home() {
  const products = await getProductsList()

  return (
    <AppLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <Image
              src={product.images?.[0] || ""}
              alt={product.title || ""}
              width={192}
              height={192}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                {product.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-1 truncate">
                {product.description}
              </p>
              <p className="text-zinc-900 dark:text-zinc-200 font-bold mt-2">
                ${product.price?.toFixed(2)}
              </p>
              {product.category && (
                <span className="inline-block mt-2 text-xs text-white bg-indigo-500 rounded-full px-3 py-1">
                  {product.category.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
