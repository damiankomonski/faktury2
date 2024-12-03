"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Receipt, FileText, Calculator, CheckCircle } from "lucide-react"

const documentTypes = [
  {
    id: "invoice",
    title: "Faktura",
    description: "Standardowa faktura VAT",
    icon: Receipt,
  },
  {
    id: "proforma",
    title: "Faktura proforma",
    description: "Dokument przed właściwą fakturą",
    icon: FileText,
  },
  {
    id: "advance",
    title: "Faktura zaliczkowa",
    description: "Dokument dla płatności częściowych",
    icon: Calculator,
  },
  {
    id: "final",
    title: "Faktura końcowa",
    description: "Ostateczny dokument rozliczeniowy",
    icon: CheckCircle,
  },
]

export function NewInvoiceModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleTypeSelect = (type: string) => {
    setOpen(false)
    router.push(`/dashboard/przychody/nowa-faktura?type=${type}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nowa Faktura</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Wybierz typ dokumentu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {documentTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <type.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{type.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}