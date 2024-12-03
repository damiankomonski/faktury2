import { CheckCircle, Clock, Cloud, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: CheckCircle,
    title: "Profesjonalne Szablony",
    description: "Wybieraj spośród wielu profesjonalnie zaprojektowanych szablonów faktur.",
  },
  {
    icon: Clock,
    title: "Oszczędność Czasu",
    description: "Twórz i wysyłaj faktury w mniej niż 2 minuty.",
  },
  {
    icon: Cloud,
    title: "Chmura",
    description: "Dostęp do faktur w dowolnym miejscu i czasie dzięki bezpiecznej chmurze.",
  },
  {
    icon: Shield,
    title: "Bezpieczne Płatności",
    description: "Zintegrowane przetwarzanie płatności z bezpieczeństwem bankowym.",
  },
]

export function Features() {
  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Funkcje, Które Pokochasz</h2>
          <p className="mt-4 text-gray-600">Wszystko, czego potrzebujesz do efektywnego zarządzania fakturami</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}