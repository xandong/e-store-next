import { storeApi } from "@/services/storeApi"

export const getProductById = async (id: number) => {
  return (await storeApi.productsIdGet(id)).data
}
