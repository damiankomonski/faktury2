"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { documentTypes } from "../data"
import { countries } from "@/lib/constants/invoice"
import { InvoiceItem, calculateValues, createEmptyInvoiceItem } from "@/lib/utils/invoice"
import { InvoiceItems } from "@/components/dashboard/invoice/invoice-items"
import { Card, CardContent } from "@/components/ui/card"

export default function NewInvoicePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const documentType = documentTypes.find(t => t.id === type)?.label || "Faktura"

  const [issueDate, setIssueDate] = useState<Date | null>(new Date())
  const [saleDate, setSaleDate] = useState<Date | null>(new Date())
  const [customerType, setCustomerType] = useState("company")
  const [items, setItems] = useState<InvoiceItem[]>([createEmptyInvoiceItem()])
  const [showPkwiu, setShowPkwiu] = useState(false)

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

  const handleCancel = () => {
    router.push("/dashboard/przychody")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nowa faktura</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Anuluj
          </Button>
          <Button>
            Dodaj fakturę
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label>Numer</Label>
              <Input placeholder="Automatycznie" disabled />
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
              <Input placeholder="Wprowadź miejsce wystawienia" />
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
              <Input placeholder="Imię i nazwisko / Nazwa firmy" />
              <Input placeholder="NIP" type="number" />
              <Input placeholder="Adres" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Kod pocztowy" />
                <Input placeholder="Miejscowość" />
              </div>
              <Input placeholder="Numer konta" type="number" />
              <Input placeholder="Nazwa banku" />
              <Input placeholder="SWIFT" />
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
                <Input placeholder="Imię i nazwisko / Nazwa firmy" />
                {customerType === "company" && (
                  <Input placeholder="NIP" type="number" />
                )}
                <Input placeholder="Adres" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Kod pocztowy" />
                  <Input placeholder="Miejscowość" />
                </div>
                <Select>
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
                <Input placeholder="Email" type="email" />
                <Input placeholder="Telefon" type="tel" />
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
            <div className="text-sm text-gray-500">Typ dokumentu: {documentType}</div>
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
              <Select>
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
              <Select>
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
              <Select>
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
              <Textarea placeholder="Wprowadź dodatkowe uwagi do faktury" className="min-h-[100px]" />
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
              <Select>
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
              <Select>
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