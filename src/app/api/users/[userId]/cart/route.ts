"use server"

import { NextResponse } from "next/server"
import { getCartAction } from "@/app/_actions/cart/getCartAction"

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId, 10)
  const data = await getCartAction(userId)
  return NextResponse.json(data)
}
