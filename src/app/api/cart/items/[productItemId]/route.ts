"use server"

import { NextResponse } from "next/server"

import { getProductItemByIdAction } from "@/app/_actions/product-item/getProductItemByIdAction"
import { updateProductItemQuantityAction } from "@/app/_actions/product-item/updateProductItemQuantityAction"
import { removeProductItemAction } from "@/app/_actions/product-item/removeProductItemAction"

export async function GET(
  req: Request,
  { params }: { params: { productItemId: string } }
) {
  const data = await getProductItemByIdAction(params.productItemId)
  return NextResponse.json(data)
}

export async function PUT(
  req: Request,
  { params }: { params: { productItemId: string } }
) {
  const productItemId = params.productItemId
  const body = await req.json()
  const data = await updateProductItemQuantityAction({ ...body, productItemId })
  return NextResponse.json(data)
}

export async function DELETE(
  req: Request,
  { params }: { params: { productItemId: string } }
) {
  const productItemId = params.productItemId
  await removeProductItemAction(productItemId)
  return new NextResponse(null, { status: 204 })
}
