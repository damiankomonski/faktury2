"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Dziękujemy za subskrypcję!")
    setEmail("")
  }

  return (
    <section className="py-16 px-4 md:px-6 bg-blue-50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Bądź na Bieżąco</h2>
          <p className="mt-4 mb-8 text-gray-600">
            Zapisz się do naszego newslettera, aby otrzymywać najnowsze funkcje, porady i najlepsze praktyki fakturowania.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Wpisz swój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
              required
            />
            <Button type="submit">
              Subskrybuj
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}