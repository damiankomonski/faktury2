"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Mail, Pencil, Printer, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { downloadPDF } from "@/components/dashboard/invoice/download-pdf"

// Sample invoice data - in a real app, this would come from an API or database
const sampleInvoice = {
  id: "INV-2024-001",
  issueDate: "2024-03-21",
  issuePlace: "Warszawa",
  saleDate: "2024-03-21",
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
    name: "Firma ABC S.A.",
    nip: "0987654321",
    address: "ul. Testowa 456",
    postalCode: "00-002",
    city: "Warszawa",
    email: "kontakt@abc.pl",
    phone: "+48 123 456 789",
  },
  items: [
    {
      name: "Usługa programistyczna",
      quantity: "10",
      unit: "godz.",
      netPrice: "150,00",
      vatRate: "23%",
      netValue: "1500,00",
      grossValue: "1845,00",
    },
  ],
  payment: {
    method: "Przelew",
    dueDate: "14 dni",
    status: "Wystawiona",
  },
  totals: {
    netTotal: 1500.00,
    vatTotal: 345.00,
    grossTotal: 1845.00,
  },
  notes: "Dziękujemy za skorzystanie z naszych usług.",
}

export default function InvoicePreviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleStatusChange = (value: string) => {
    toast.success("Status faktury został zmieniony")
  }

  const handleSendEmail = () => {
    toast.success("Faktura została wysłana na email")
  }

  const handlePrint = () => {
    toast.success("Faktura została wysłana do druku")
  }

  const handleDelete = () => {
    toast.success("Faktura została usunięta")
    router.push("/dashboard/przychody")
  }

  const handleDownload = async (format: string) => {
    switch (format) {
      case 'pdf':
        await downloadPDF(sampleInvoice)
        break
      case 'xml':
        toast.success("Pobieranie XML...")
        break
      case 'json':
        toast.success("Pobieranie JSON...")
        break
      case 'usd':
        toast.success("Pobieranie faktury ustrukturyzowanej...")
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push("/dashboard/przychody")}
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót
        </Button>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleSendEmail}
          >
            <Mail className="h-4 w-4" />
            Wyślij
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Drukuj
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Pobierz
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('xml')}>
                XML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('json')}>
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('usd')}>
                Ustrukturyzowana faktura
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.push(`/dashboard/przychody/${params.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
            Edytuj
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 text-red-600 hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Usuń
          </Button>

          <Select defaultValue="issued" onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="issued">Wystawiona</SelectItem>
              <SelectItem value="paid">Opłacona</SelectItem>
              <SelectItem value="sent">Wysłana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">Faktura VAT</h2>
              <p className="text-sm text-gray-600">Nr: {sampleInvoice.id}</p>
              <p className="text-sm text-gray-600">Data wystawienia: {sampleInvoice.issueDate}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Miejsce wystawienia</p>
              <p className="text-sm text-gray-600">{sampleInvoice.issuePlace}</p>
              <p className="text-sm text-gray-600">Data sprzedaży: {sampleInvoice.saleDate}</p>
            </div>
          </div>

          {/* Seller and Buyer */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Sprzedawca</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{sampleInvoice.seller.name}</p>
                <p>NIP: {sampleInvoice.seller.nip}</p>
                <p>{sampleInvoice.seller.address}</p>
                <p>{sampleInvoice.seller.postalCode} {sampleInvoice.seller.city}</p>
                <p>Nr konta: {sampleInvoice.seller.accountNumber}</p>
                <p>Bank: {sampleInvoice.seller.bank}</p>
                <p>SWIFT: {sampleInvoice.seller.swift}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Nabywca</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{sampleInvoice.buyer.name}</p>
                <p>NIP: {sampleInvoice.buyer.nip}</p>
                <p>{sampleInvoice.buyer.address}</p>
                <p>{sampleInvoice.buyer.postalCode} {sampleInvoice.buyer.city}</p>
                <p>Email: {sampleInvoice.buyer.email}</p>
                <p>Tel: {sampleInvoice.buyer.phone}</p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Lp.</th>
                  <th className="text-left py-2">Nazwa</th>
                  <th className="text-left py-2">Ilość</th>
                  <th className="text-left py-2">J.m.</th>
                  <th className="text-right py-2">Cena netto</th>
                  <th className="text-right py-2">VAT</th>
                  <th className="text-right py-2">Wartość netto</th>
                  <th className="text-right py-2">Wartość brutto</th>
                </tr>
              </thead>
              <tbody>
                {sampleInvoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td className="text-right">{item.netPrice}</td>
                    <td className="text-right">{item.vatRate}</td>
                    <td className="text-right">{item.netValue}</td>
                    <td className="text-right">{item.grossValue}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td colSpan={6} className="text-right py-2">Razem:</td>
                  <td className="text-right py-2">{sampleInvoice.totals.netTotal.toFixed(2)}</td>
                  <td className="text-right py-2">{sampleInvoice.totals.grossTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Płatność</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Metoda: {sampleInvoice.payment.method}</p>
                <p>Termin: {sampleInvoice.payment.dueDate}</p>
                <p>Status: {sampleInvoice.payment.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Do zapłaty:</p>
              <p className="text-xl font-bold">{sampleInvoice.totals.grossTotal.toFixed(2)} PLN</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Uwagi</h3>
                <p className="text-sm text-gray-600">
                  {sampleInvoice.notes}
                </p>
              </div>
              <div className="md:text-right">
                <div className="mt-4">
                  <p className="text-sm font-semibold">Podpis osoby upoważnionej</p>
                  <div className="h-12 border-b border-dashed mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}