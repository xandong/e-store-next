import { categoriesApi } from "@/services/api"

export const getCategoriesListAction = async () => {
  return (await categoriesApi.getCategories()).data
}
