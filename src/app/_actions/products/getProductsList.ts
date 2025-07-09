import { productsApi } from "@/services/api"

export const getProductsListAction = async () => {
  return (await productsApi.getProducts()).data
}
