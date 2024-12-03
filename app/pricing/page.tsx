import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Start",
    price: "0",
    description: "Idealny dla freelancerów i małych firm",
    features: [
      "Do 5 faktur miesięcznie",
      "Podstawowe szablony",
      "Eksport PDF",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "49",
    description: "Dla rozwijających się firm",
    features: [
      "Nielimitowane faktury",
      "Wszystkie szablony",
      "Faktury cykliczne",
      "Priorytetowe wsparcie",
    ],
  },
  {
    name: "Enterprise",
    price: "199",
    description: "Dla dużych organizacji",
    features: [
      "Wszystko z Pro",
      "API dostęp",
      "Dedykowany opiekun",
      "SLA gwarancja",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-4 md:px-6 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Proste i Przejrzyste Ceny
              </h1>
              <p className="mt-4 text-gray-600">
                Wybierz plan, który najlepiej odpowiada potrzebom Twojej firmy
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600"> PLN/msc</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Wybierz Plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}