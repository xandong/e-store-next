import { NextResponse } from "next/server"

import { getProductsListAction } from "@/app/_actions/products/getProductsList"

export async function GET() {
  const data = await getProductsListAction()
  return NextResponse.json(data)
}
