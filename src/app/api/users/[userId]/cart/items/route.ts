"use server"

import { NextResponse } from "next/server"
import { addProductToCartAction } from "@/app/_actions/cart/addProductToCartAction"

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId, 10)
  const body = await req.json()
  const data = await addProductToCartAction({ ...body, userId })
  return NextResponse.json(data)
}
