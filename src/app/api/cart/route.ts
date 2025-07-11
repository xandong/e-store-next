import { NextResponse } from "next/server"
import { getCartAction } from "@/app/_actions/cart/getCartAction"

export async function GET() {
  try {
    const cart = await getCartAction()
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
