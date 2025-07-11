"use server"

import { NextResponse } from "next/server"

import { getProductByIdAction } from "@/app/_actions/products/getProductById"
import { updateProductAction } from "@/app/_actions/products/updateProductAction"
import { deleteProductAction } from "@/app/_actions/products/deleteProductAction"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await getProductByIdAction(Number(params.id))
  return NextResponse.json(data)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await req.json()
  const data = await updateProductAction({ ...body, id })
  return NextResponse.json(data)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  await deleteProductAction(id)
  return new NextResponse(null, { status: 204 })
}
