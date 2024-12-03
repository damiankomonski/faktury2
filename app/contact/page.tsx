"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    details: ["ul. Przykładowa 123", "00-001 Warszawa", "Polska"],
  },
  {
    icon: Phone,
    title: "Telefon",
    details: ["+48 123 456 789", "Pon-Pt: 9:00 - 17:00"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["kontakt@fakturki.pl", "pomoc@fakturki.pl"],
  },
]

const faqItems = [
  {
    question: "Jak mogę rozpocząć korzystanie z Fakturki?",
    answer: "Wystarczy zarejestrować się na naszej stronie i wybrać odpowiedni plan. Możesz rozpocząć od darmowego planu Start.",
  },
  {
    question: "Czy mogę eksportować faktury do PDF?",
    answer: "Tak, wszystkie plany umożliwiają eksport faktur do formatu PDF.",
  },
  {
    question: "Czy oferujecie wsparcie techniczne?",
    answer: "Tak, zapewniamy wsparcie techniczne poprzez email dla wszystkich planów, a dla planów Pro i Enterprise oferujemy priorytetowe wsparcie.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Wiadomość została wysłana!")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-4 md:px-6 bg-white">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  Skontaktuj się z Nami
                </h1>
                <p className="mt-4 text-gray-600">
                  Jesteśmy tutaj, aby pomóc. Skontaktuj się z nami w dowolny sposób.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-primary/10 rounded-full mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      {item.details.map((detail, index) => (
                        <p key={index} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Wyślij nam wiadomość</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">Imię i Nazwisko</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Temat</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Wiadomość</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Wyślij Wiadomość</Button>
                  </form>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}