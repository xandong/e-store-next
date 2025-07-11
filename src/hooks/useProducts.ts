import useSWR from "swr"

import { Product } from "@/types/prisma/generated"

export function useProducts() {
  return useSWR<Product[]>("actions/products", (url: string) =>
    fetch(url).then((res) => res.json())
  )
}
