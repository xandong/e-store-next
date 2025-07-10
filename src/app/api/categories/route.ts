"use server"

import { NextResponse } from "next/server"
import { createCategoryAction } from "@/app/_actions/categories/createCategoryAction"

export async function POST(req: Request) {
  const body = await req.json()
  const data = await createCategoryAction(body)
  return NextResponse.json(data)
}
