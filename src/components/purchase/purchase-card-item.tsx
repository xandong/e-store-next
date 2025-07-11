import Link from "next/link"
import { numberToCurrency } from "@/utils/formatters"
import { Purchase } from "@/types/prisma/generated"

export const PurchaseCardItem = ({ purchase }: { purchase: Purchase }) => {
  return (
    <Link href={`/purchases/${purchase.id}`}>
      <div className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent/5 bg-gray-50 transition-colors">
        <div>
          <p className="font-semibold">Compra #{purchase.id.slice(0, 8)}</p>
          <p className="text-sm text-gray-500">Status: {purchase.status}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{numberToCurrency(purchase.total)}</p>
          <p className="text-sm text-gray-500">
            {new Date(purchase.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  )
}
