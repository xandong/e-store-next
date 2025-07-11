import Image from "next/image"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { ProductItemType } from "@/context/cart-context"
import { useCart } from "@/context/cart-context"
import { numberToCurrency } from "@/utils/formatters"

import { Button } from "../_ui/button"

export const CartCardItem = ({ item }: { item: ProductItemType }) => {
  const { updateCartItemQuantity, removeCartItem } = useCart()

  const handleIncrease = () => {
    updateCartItemQuantity(item.id, item.quantity + 1)
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    removeCartItem(item.id)
  }

  return (
    <div className="flex items-center gap-4 border rounded-lg p-3">
      <Image
        src={item.product.images[0] || ""}
        alt={item.product.title}
        width={80}
        height={80}
        className="rounded-md object-cover border"
      />
      <div className="flex-1 flex flex-col justify-between">
        <span className="font-medium text-sm">{item.product.title}</span>

        <div className="flex items-center gap-2 mt-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <Button size="icon" variant="ghost" onClick={handleIncrease}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        <span className="text-sm font-semibold mt-1">
          {numberToCurrency(item.price * item.quantity)}
        </span>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="text-destructive"
        onClick={handleRemove}
      >
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </div>
  )
}
