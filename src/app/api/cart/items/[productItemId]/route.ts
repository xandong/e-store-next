import { NextResponse } from "next/server"
import { updateProductItemQuantityAction } from "@/app/_actions/product-item/updateProductItemQuantityAction"
import { removeProductItemAction } from "@/app/_actions/product-item/removeProductItemAction"

export async function PUT(
  req: Request,
  { params }: { params: { productItemId: string } }
) {
  const { productItemId } = params
  const body = await req.json()
  const { quantity } = body

  try {
    const updatedCartItem = await updateProductItemQuantityAction(
      productItemId,
      quantity
    )
    return NextResponse.json(updatedCartItem, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productItemId: string } }
) {
  const { productItemId } = params

  try {
    await removeProductItemAction(productItemId)
    return new NextResponse(null, { status: 204 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    )
  }
}
