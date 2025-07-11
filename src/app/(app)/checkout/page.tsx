import { AppLayout } from "@/components/layout/app-layout"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export default function CheckoutPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p>Informações de envio e pagamento (a ser implementado)</p>
          </div>

          <div>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
