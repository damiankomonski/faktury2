import Image from "next/image"

const companies = [
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  },
  {
    name: "InnovateHub",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  },
  {
    name: "FutureFinance",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  },
  {
    name: "GlobalTech",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80",
  },
]

export function Companies() {
  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Zaufali Nam</h2>
          <p className="mt-4 text-gray-600">Dołącz do tysięcy firm, które już korzystają z Fakturki</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {companies.map((company) => (
            <div key={company.name} className="relative w-40 h-20">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}