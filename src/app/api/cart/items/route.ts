import { NextResponse } from "next/server"
import { addProductToCartAction } from "@/app/_actions/cart/addProductToCartAction"

export async function POST(req: Request) {
  const body = await req.json()
  const { productId, quantity } = body

  try {
    const cart = await addProductToCartAction(productId, quantity)
    return NextResponse.json(cart, { status: 200 })
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
