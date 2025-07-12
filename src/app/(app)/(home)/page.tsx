import { getCategoriesListAction } from "@/app/_actions/categories/getCategoriesList"
import { getProductsListAction } from "@/app/_actions/products/getProductsList"

import { AppLayout } from "@/components/layout/app-layout"
import { Section } from "@/components/misc/section"
import type { Metadata } from "next"

export const revalidate = 5 * 60

export const metadata: Metadata = {
  title: "eStore - Sua Loja Online",
  description:
    "Encontre os melhores peças de roupa e acessórios. Compre online com segurança e rapidez na eStore.",
  keywords: [
    "roupa",
    "e-commerce",
    "vestuário",
    "comprar blusa",
    "loja de roupa"
  ],
  openGraph: {
    title: "eStore - Sua Loja Online",
    description:
      "Encontre os melhores jogos para todas as plataformas. Compre online com segurança e rapidez na eStore.",
    url: "https://e-store-br.vercel.app",
    siteName: "eStore",
    images: [
      {
        url: "https://e-store-br.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "Logo eStore"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "eStore - Sua Loja Online",
    description:
      "Encontre os melhores peças de roupa e acessórios. Compre online com segurança e rapidez na eStore.",
    creator: "@xandongurgel",
    images: ["https://e-store-br.vercel.app/logo.png"]
  }
}

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
