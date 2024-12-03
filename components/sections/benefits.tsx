export function Benefits() {
  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Automatyzacja Procesów Fakturowania
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Nasza platforma automatyzuje żmudne zadania związane z fakturowaniem, 
                pozwalając Ci skupić się na rozwoju Twojego biznesu. Automatyczne 
                przypomnienia, cykliczne faktury i śledzenie płatności to tylko 
                niektóre z dostępnych funkcji.
              </p>
              <p className="text-gray-600">
                Dzięki zaawansowanym algorytmom i intuicyjnemu interfejsowi, 
                tworzenie profesjonalnych faktur nigdy nie było prostsze.
              </p>
            </div>
          </div>
          <div className="lg:pl-8">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-primary text-lg font-medium">
                Wizualizacja procesu
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}