export function Integration() {
  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="lg:order-2">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Integracja z Systemami Księgowymi
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Bezproblemowa integracja z popularnymi systemami księgowymi 
                  pozwala na automatyczną synchronizację danych i eliminuje 
                  potrzebę ręcznego wprowadzania informacji.
                </p>
                <p className="text-gray-600">
                  Wspieramy integrację z wiodącymi platformami księgowymi, 
                  zapewniając płynny przepływ danych i zgodność z przepisami.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:order-1">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-primary text-lg font-medium">
                Schemat integracji
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}