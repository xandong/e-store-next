"use server"

import { NextResponse } from "next/server"
import { getPurchaseByIdAction } from "@/app/_actions/purchase/getPurchaseByIdAction"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await getPurchaseByIdAction(params.id)
  return NextResponse.json(data)
}
