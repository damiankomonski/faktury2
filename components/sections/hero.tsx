import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-24 px-4 md:px-6 lg:py-32 bg-white">
      <div className="container flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Twórz Profesjonalne Faktury <br className="hidden sm:inline" />
          w Kilka Minut
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
          Generuj, zarządzaj i wysyłaj faktury bez wysiłku. Idealne rozwiązanie dla freelancerów, małych firm i przedsiębiorców.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">Rozpocznij Za Darmo</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">Zobacz Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}