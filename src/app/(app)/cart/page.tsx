import { CartInfo } from "@/components/cart/cart-info"
import { AppLayout } from "@/components/layout/app-layout"
import { BackButton } from "@/components/misc/back-button"

export default function CartPage() {
  return (
    <AppLayout>
      <BackButton />

      <div className="w-full flex-1 p-4 my-6 flex flex-col gap-4">
        <CartInfo />
      </div>
    </AppLayout>
  )
}
