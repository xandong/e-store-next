"use server"

import { NextResponse } from "next/server"
import { getPurchaseHistoryAction } from "@/app/_actions/purchase/getPurchaseHistoryAction"

import { createPurchaseAction } from "@/app/_actions/purchase/createPurchaseAction"

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId, 10)
  const body = await req.json()
  const data = await createPurchaseAction({ ...body, userId })
  return NextResponse.json(data)
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId, 10)
  const data = await getPurchaseHistoryAction(userId)
  return NextResponse.json(data)
}
