import { productsApi } from "@/services/api"

export const getProductByIdAction = async (id: number) => {
  return (await productsApi.getProductById(id)).data
}
