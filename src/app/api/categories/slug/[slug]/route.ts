"use server"

import { NextResponse } from "next/server"
import { getCategoryBySlugAction } from "@/app/_actions/categories/getCategoryBySlugAction" // This action needs to be created

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const data = await getCategoryBySlugAction(params.slug)
  return NextResponse.json(data)
}
