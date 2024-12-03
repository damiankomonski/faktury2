import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Features } from "@/components/sections/features"

const features = [
  {
    title: "Automatyczne Przypomnienia",
    description: "System automatycznie wysyła przypomnienia o płatnościach, oszczędzając Twój czas i poprawiając przepływ gotówki.",
  },
  {
    title: "Faktury Cykliczne",
    description: "Ustaw automatyczne generowanie i wysyłanie faktur dla stałych klientów w określonych odstępach czasu.",
  },
  {
    title: "Wielowalutowość",
    description: "Wystawiaj faktury w różnych walutach z automatycznym przeliczaniem według aktualnych kursów.",
  },
  {
    title: "Raporty i Analityka",
    description: "Szczegółowe raporty i analizy pomagają śledzić przepływ gotówki i podejmować lepsze decyzje biznesowe.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-4 md:px-6 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Wszystkie Funkcje, Których Potrzebujesz
              </h1>
              <p className="mt-4 text-gray-600">
                Odkryj pełen zakres możliwości, które pomogą Ci usprawnić proces fakturowania
              </p>
            </div>
            <Features />
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}