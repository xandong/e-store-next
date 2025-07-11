import Image from "next/image"
import { numberToCurrency } from "@/utils/formatters"
import { Purchase } from "@/types/prisma/generated"
import { ProductItemType } from "@/context/cart-context"
import Link from "next/link"

export const PurchaseDetails = ({
  purchase
}: {
  purchase: Purchase & { productItems: ProductItemType[] }
}) => {
  return (
    <div className="p-6 border rounded-lg shadow-md max-w-2xl mx-auto bg-white/80">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Detalhes da Compra
      </h2>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-lg font-semibold">
            Compra #{purchase.id.slice(0, 8)}
          </p>
          <p className="text-gray-500">
            Data: {new Date(purchase.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">
            Total: {numberToCurrency(purchase.total)}
          </p>
          <p className="font-semibold capitalize">
            Status: {purchase.status.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-t pt-4">Itens</h3>
        {[...purchase.productItems, ...purchase.productItems].map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-2">
            <Link href={`/products/${item.productId}`}>
              <Image
                src={item.product.images[0] || ""}
                alt={item.product.title}
                width={64}
                height={64}
                className="rounded-md object-cover border"
              />
            </Link>
            <div className="flex-1">
              <p className="font-medium">{item.product.title}</p>
              <p className="text-sm text-gray-500">
                Quantidade: {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              {numberToCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
