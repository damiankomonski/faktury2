import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const posts = [
  {
    title: "10 Wskazówek do Profesjonalnego Fakturowania",
    excerpt: "Dowiedz się, jak tworzyć faktury, które są szybciej opłacane i utrzymują profesjonalny wizerunek.",
    date: "21 marca 2024",
    readTime: "5 min czytania",
  },
  {
    title: "Efektywne Zarządzanie Opóźnionymi Płatnościami",
    excerpt: "Strategie i najlepsze praktyki radzenia sobie z opóźnionymi płatnościami i utrzymania płynności finansowej.",
    date: "18 marca 2024",
    readTime: "4 min czytania",
  },
  {
    title: "Najlepsze Praktyki Projektowania Faktur",
    excerpt: "Wskazówki projektowe, które sprawią, że Twoje faktury będą się wyróżniać i odzwierciedlać tożsamość Twojej marki.",
    date: "15 marca 2024",
    readTime: "6 min czytania",
  },
]

export function Blog() {
  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Najnowsze z Naszego Bloga</h2>
          <p className="mt-4 text-gray-600">Porady, triki i spostrzeżenia dotyczące fakturowania i zarządzania biznesem</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.excerpt}</p>
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
  )
}