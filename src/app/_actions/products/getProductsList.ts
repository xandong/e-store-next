"use server"

import { z } from "zod"
import { productService } from "@/services/products-service"

const getProductsListSchema = z.void() // No input for this action

export async function getProductsListAction() {
  getProductsListSchema.parse(undefined) // Validate no input
  const products = await productService.getProducts()
  return products
}
