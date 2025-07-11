"use server"

import { NextResponse } from "next/server"
import { createProductAction } from "@/app/_actions/products/createProductAction"

export async function POST(req: Request) {
  const body = await req.json()
  const data = await createProductAction(body)
  return NextResponse.json(data)
}
