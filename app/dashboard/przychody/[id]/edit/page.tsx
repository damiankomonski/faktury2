"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { documentTypes } from "../../data"
import { countries } from "@/lib/constants/invoice"
import { InvoiceItem, calculateValues, createEmptyInvoiceItem } from "@/lib/utils/invoice"
import { InvoiceItems } from "@/components/dashboard/invoice/invoice-items"
import { toast } from "sonner"

// Sample invoice data - in a real app, this would come from an API
const sampleInvoice = {
  id: "INV-2024-001",
  type: "invoice",
  number: "FV/2024/03/001",
  issueDate: new Date("2024-03-21"),
  issuePlace: "Warszawa",
  saleDate: new Date("2024-03-21"),
  seller: {
    name: "Firma XYZ Sp. z o.o.",
    nip: "1234567890",
    address: "ul. Przykładowa 123",
    postalCode: "00-001",
    city: "Warszawa",
    accountNumber: "12 1234 5678 9012 3456 7890 1234",
    bank: "Example Bank",
    swift: "EXAMPLEXX",
  },
  buyer: {
    type: "company",
    name: "Firma ABC S.A.",
    nip: "0987654321",
    address: "ul. Testowa 456",
    postalCode: "00-002",
    city: "Warszawa",
    country: "pl",
    email: "kontakt@abc.pl",
    phone: "+48 123 456 789",
  },
  items: [
    {
      id: "1",
      name: "Usługa programistyczna",
      quantity: "10",
      unit: "hours",
      netPrice: "150,00",
      vatRate: "23",
      netValue: "1500,00",
      grossValue: "1845,00",
    },
  ],
  payment: {
    method: "transfer",
    dueDate: "14",
    status: "issued",
  },
  notes: "Dziękujemy za skorzystanie z naszych usług.",
  currency: "pln",
  language: "pl",
}

export default function EditInvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [issueDate, setIssueDate] = useState<Date | null>(null)
  const [saleDate, setSaleDate] = useState<Date | null>(null)
  const [customerType, setCustomerType] = useState("company")
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [showPkwiu, setShowPkwiu] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch invoice data
    setIssueDate(sampleInvoice.issueDate)
    setSaleDate(sampleInvoice.saleDate)
    setCustomerType(sampleInvoice.buyer.type)
    setItems(sampleInvoice.items as InvoiceItem[])
    setLoading(false)
  }, [])

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          
          if (field === "quantity" || field === "netPrice" || field === "vatRate") {
            const { netValue, grossValue } = calculateValues(
              updatedItem.quantity,
              updatedItem.netPrice,
              updatedItem.vatRate
            )
            return {
              ...updatedItem,
              netValue,
              grossValue,
            }
          }
          
          return updatedItem
        }
        return item
      })
    )
  }

  const addItem = () => {
    setItems(prev => [...prev, createEmptyInvoiceItem()])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const calculateTotals = () => {
    return items.reduce((acc, item) => {
      const netValue = parseFloat(item.netValue) || 0
      const grossValue = parseFloat(item.grossValue) || 0
      const vatValue = grossValue - netValue

      return {
        netTotal: acc.netTotal + netValue,
        vatTotal: acc.vatTotal + vatValue,
        grossTotal: acc.grossTotal + grossValue,
      }
    }, { netTotal: 0, vatTotal: 0, grossTotal: 0 })
  }

  const { netTotal, vatTotal, grossTotal } = calculateTotals()

  const handleSave = () => {
    toast.success("Faktura została zaktualizowana")
    router.push("/dashboard/przychody")
  }

  const handleCancel = () => {
    router.push("/dashboard/przychody")
  }

  if (loading) {
    return <div>Ładowanie...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edytuj fakturę</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Anuluj
          </Button>
          <Button onClick={handleSave}>
            Zapisz zmiany
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label>Numer</Label>
              <Input defaultValue={sampleInvoice.number} />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label>Data wystawienia</Label>
              <DatePicker
                selected={issueDate}
                onChange={date => setIssueDate(date)}
                dateFormat="yyyy-MM-dd"
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1",
                  "text-sm shadow-sm transition-colors placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                )}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label>Miejsce wystawienia</Label>
              <Input defaultValue={sampleInvoice.issuePlace} />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label>Data sprzedaży</Label>
              <DatePicker
                selected={saleDate}
                onChange={date => setSaleDate(date)}
                dateFormat="yyyy-MM-dd"
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1",
                  "text-sm shadow-sm transition-colors placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Sprzedawca</h2>
            <div className="grid gap-4">
              <Input defaultValue={sampleInvoice.seller.name} placeholder="Imię i nazwisko / Nazwa firmy" />
              <Input defaultValue={sampleInvoice.seller.nip} placeholder="NIP" type="number" />
              <Input defaultValue={sampleInvoice.seller.address} placeholder="Adres" />
              <div className="grid grid-cols-2 gap-4">
                <Input defaultValue={sampleInvoice.seller.postalCode} placeholder="Kod pocztowy" />
                <Input defaultValue={sampleInvoice.seller.city} placeholder="Miejscowość" />
              </div>
              <Input defaultValue={sampleInvoice.seller.accountNumber} placeholder="Numer konta" type="number" />
              <Input defaultValue={sampleInvoice.seller.bank} placeholder="Nazwa banku" />
              <Input defaultValue={sampleInvoice.seller.swift} placeholder="SWIFT" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Nabywca</h2>
            <div className="space-y-4">
              <RadioGroup
                value={customerType}
                onValueChange={setCustomerType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Firma</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="person" id="person" />
                  <Label htmlFor="person">Osoba prywatna</Label>
                </div>
              </RadioGroup>

              <div className="grid gap-4">
                <Input defaultValue={sampleInvoice.buyer.name} placeholder="Imię i nazwisko / Nazwa firmy" />
                {customerType === "company" && (
                  <Input defaultValue={sampleInvoice.buyer.nip} placeholder="NIP" type="number" />
                )}
                <Input defaultValue={sampleInvoice.buyer.address} placeholder="Adres" />
                <div className="grid grid-cols-2 gap-4">
                  <Input defaultValue={sampleInvoice.buyer.postalCode} placeholder="Kod pocztowy" />
                  <Input defaultValue={sampleInvoice.buyer.city} placeholder="Miejscowość" />
                </div>
                <Select defaultValue={sampleInvoice.buyer.country}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz kraj" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input defaultValue={sampleInvoice.buyer.email} placeholder="Email" type="email" />
                <Input defaultValue={sampleInvoice.buyer.phone} placeholder="Telefon" type="tel" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Pozycje na fakturze</h2>
              <Button variant="outline" size="sm" onClick={() => setShowPkwiu(!showPkwiu)}>
                {showPkwiu ? "Ukryj PKWiU" : "Dodaj PKWiU"}
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Typ dokumentu: {documentTypes.find(t => t.id === sampleInvoice.type)?.label}
            </div>
          </div>

          <InvoiceItems
            items={items}
            onItemChange={handleItemChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            showPkwiu={showPkwiu}
          />

          <div className="mt-6 flex justify-end">
            <div className="space-y-2 text-right">
              <div>Suma netto: <span className="font-semibold">{netTotal.toFixed(2)} PLN</span></div>
              <div>Suma VAT: <span className="font-semibold">{vatTotal.toFixed(2)} PLN</span></div>
              <div>Suma brutto: <span className="font-semibold">{grossTotal.toFixed(2)} PLN</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Label>Płatność</Label>
              <Select defaultValue={sampleInvoice.payment.method}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz metodę płatności" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">Przelew</SelectItem>
                  <SelectItem value="card">Karta płatnicza</SelectItem>
                  <SelectItem value="cash">Gotówka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Termin płatności</Label>
              <Select defaultValue={sampleInvoice.payment.dueDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz termin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dzień</SelectItem>
                  <SelectItem value="3">3 dni</SelectItem>
                  <SelectItem value="5">5 dni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select defaultValue={sampleInvoice.payment.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="issued">Wystawiona</SelectItem>
                  <SelectItem value="paid">Opłacona</SelectItem>
                  <SelectItem value="sent">Wysłana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Podpis Sprzedawcy</Label>
              <Input placeholder="Wprowadź podpis sprzedawcy" />
            </div>
            <div>
              <Label>Podpis Nabywcy</Label>
              <Input placeholder="Wprowadź podpis nabywcy" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label>Uwagi</Label>
              <Textarea 
                defaultValue={sampleInvoice.notes}
                placeholder="Wprowadź dodatkowe uwagi do faktury" 
                className="min-h-[100px]" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Waluta i język</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Waluta</Label>
              <Select defaultValue={sampleInvoice.currency}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz walutę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pln">PLN</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Język</Label>
              <Select defaultValue={sampleInvoice.language}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz język" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pl">Polski</SelectItem>
                  <SelectItem value="en">Angielski</SelectItem>
                  <SelectItem value="de">Niemiecki</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}