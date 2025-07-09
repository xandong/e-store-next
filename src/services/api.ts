import {
  Configuration,
  AuthenticationApi,
  UsersApi,
  CategoriesApi,
  ProductsApi
} from "@/types/api/generated"

export const config: Configuration = {
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL,
  isJsonMime: () => true
}

export const authenticationApi = new AuthenticationApi(config)
export const usersApi = new UsersApi(config)
export const categoriesApi = new CategoriesApi(config)
export const productsApi = new ProductsApi(config)
