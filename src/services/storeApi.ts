import { Configuration, DefaultApi } from "@/types/generated"

export const config: Configuration = {
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL,
  isJsonMime: () => true
}

export const storeApi = new DefaultApi(config)
