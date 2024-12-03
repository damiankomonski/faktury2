import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const posts = [
  {
    title: "10 Wskazówek do Profesjonalnego Fakturowania",
    excerpt: "Dowiedz się, jak tworzyć faktury, które są szybciej opłacane i utrzymują profesjonalny wizerunek.",
    date: "21 marca 2024",
    readTime: "5 min czytania",
    category: "Porady",
  },
  {
    title: "Efektywne Zarządzanie Opóźnionymi Płatnościami",
    excerpt: "Strategie i najlepsze praktyki radzenia sobie z opóźnionymi płatnościami i utrzymania płynności finansowej.",
    date: "18 marca 2024",
    readTime: "4 min czytania",
    category: "Zarządzanie",
  },
  {
    title: "Najlepsze Praktyki Projektowania Faktur",
    excerpt: "Wskazówki projektowe, które sprawią, że Twoje faktury będą się wyróżniać i odzwierciedlać tożsamość Twojej marki.",
    date: "15 marca 2024",
    readTime: "6 min czytania",
    category: "Design",
  },
  {
    title: "Automatyzacja Procesu Fakturowania",
    excerpt: "Jak wykorzystać automatyzację do usprawnienia procesu fakturowania i oszczędzania czasu.",
    date: "12 marca 2024",
    readTime: "7 min czytania",
    category: "Automatyzacja",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-4 md:px-6 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Blog Fakturki
              </h1>
              <p className="mt-4 text-gray-600">
                Najnowsze artykuły, porady i aktualności ze świata fakturowania
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.title}>
                  <CardHeader>
                    <div className="text-sm text-primary mb-2">{post.category}</div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {post.date} · {post.readTime}
                    </div>
                    <Button variant="ghost" size="sm">Czytaj Więcej</Button>
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