import { AppLayout } from "@/components/layout/app-layout"
import { getPurchasesListAction } from "@/app/_actions/purchase/getPurchasesListAction"
import { PurchaseCardItem } from "@/components/purchase/purchase-card-item"
import { BackButton } from "@/components/misc/back-button"

export default async function PurchasesPage() {
  const purchases = await getPurchasesListAction()

  return (
    <AppLayout>
      <div className="flex-1 w-full flex flex-col items-start gap-4">
        <BackButton href="/" />

        <div className="container mx-auto p-4 w-full max-w-5xl">
          <h1 className="text-3xl font-bold mb-6">Minhas Compras</h1>
          <div className="grid space-y-4">
            {purchases.map((purchase) => (
              <PurchaseCardItem key={purchase.id} purchase={purchase} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
