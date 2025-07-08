import { storeApi } from "@/services/storeApi"

export const getProductsList = async () => {
  return (await storeApi.productsGet()).data
}
