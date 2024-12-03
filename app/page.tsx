import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Benefits } from "@/components/sections/benefits"
import { Integration } from "@/components/sections/integration"
import { Companies } from "@/components/sections/companies"
import { Blog } from "@/components/sections/blog"
import { Newsletter } from "@/components/sections/newsletter"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Benefits />
        <Integration />
        <Companies />
        <Blog />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}