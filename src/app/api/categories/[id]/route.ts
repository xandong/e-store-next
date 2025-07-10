"use server"

import { NextResponse } from "next/server"
import { updateCategoryAction } from "@/app/_actions/categories/updateCategoryAction"
import { deleteCategoryAction } from "@/app/_actions/categories/deleteCategoryAction"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10)
  const body = await req.json()
  const data = await updateCategoryAction({ ...body, id })
  return NextResponse.json(data)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10)
  await deleteCategoryAction(id)
  return new NextResponse(null, { status: 204 })
}
