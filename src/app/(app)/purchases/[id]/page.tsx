import { AppLayout } from "@/components/layout/app-layout"
import { getPurchaseByIdAction } from "@/app/_actions/purchase/getPurchaseByIdAction"
import { PurchaseDetails } from "@/components/purchase/purchase-details"
import { BackButton } from "@/components/misc/back-button"

export default async function PurchaseDetailsPage({
  params
}: {
  params: { id: string }
}) {
  const purchase = await getPurchaseByIdAction(params.id)

  if (!purchase || !purchase.productItems.every((item) => item.product)) {
    return null
  }

  const validPurchase = {
    ...purchase,
    productItems: purchase.productItems
      .filter((item) => item.product)
      .map((item) => ({
        ...item,
        product: item.product!
      }))
  }

  return (
    <AppLayout>
      <div className="flex-1 w-full flex flex-col items-start gap-4">
        <BackButton href="/purchases" />

        <div className="container mx-auto p-4">
          <PurchaseDetails purchase={validPurchase} />
        </div>
      </div>
    </AppLayout>
  )
}
