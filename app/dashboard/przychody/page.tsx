"use client"

import { useState } from "react"
import Link from "next/link"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Eye, Edit, FileDown, Mail, Trash2, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { baseInvoices, generateAdditionalInvoices, statusColors, documentTypes } from "./data"
import { NewInvoiceModal } from "@/components/dashboard/new-invoice-modal"

export default function PrzychodyPage() {
  const [sortConfig, setSortConfig] = useState({
    key: "issueDate",
    direction: "desc",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("50")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [grossAmountRange, setGrossAmountRange] = useState({ min: "", max: "" })
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  const allInvoices = [...baseInvoices, ...generateAdditionalInvoices(4, 47)]

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    })
  }

  const filteredInvoices = allInvoices
    .filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGrossAmount =
        (!grossAmountRange.min ||
          parseFloat(invoice.grossAmount.replace(",", "")) >=
            parseFloat(grossAmountRange.min)) &&
        (!grossAmountRange.max ||
          parseFloat(invoice.grossAmount.replace(",", "")) <=
            parseFloat(grossAmountRange.max))

      const matchesDate =
        (!dateRange[0] ||
          new Date(invoice.issueDate) >= dateRange[0]) &&
        (!dateRange[1] ||
          new Date(invoice.issueDate) <= dateRange[1])

      const matchesStatus =
        selectedStatus === "all" || invoice.status === selectedStatus

      const matchesType =
        selectedType === "all" || invoice.type === selectedType

      return matchesSearch && matchesGrossAmount && matchesDate && matchesStatus && matchesType
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a]
      const bValue = b[sortConfig.key as keyof typeof b]
      
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })

  const pageCount = Math.ceil(filteredInvoices.length / parseInt(itemsPerPage))
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * parseInt(itemsPerPage),
    currentPage * parseInt(itemsPerPage)
  )

  const handleSelectAllRows = (checked: boolean) => {
    setSelectedRows(checked ? filteredInvoices.map(invoice => invoice.id) : [])
  }

  const handleSelectRow = (invoiceId: string, checked: boolean) => {
    setSelectedRows(prev =>
      checked ? [...prev, invoiceId] : prev.filter(id => id !== invoiceId)
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Przychody</h1>
        <NewInvoiceModal />
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Label>Wyszukaj</Label>
            <Input
              placeholder="Szukaj po numerze lub kliencie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="opłacona">Opłacona</SelectItem>
                <SelectItem value="oczekująca">Oczekująca</SelectItem>
                <SelectItem value="przeterminowana">Przeterminowana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Typ dokumentu</Label>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kwota brutto</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Od"
                value={grossAmountRange.min}
                onChange={(e) =>
                  setGrossAmountRange((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Do"
                value={grossAmountRange.max}
                onChange={(e) =>
                  setGrossAmountRange((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label>Data wystawienia</Label>
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Wybierz zakres dat"
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1",
                "text-sm shadow-sm transition-colors placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
            />
          </div>
        </div>

        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Wybrano {selectedRows.length}{" "}
              {selectedRows.length === 1 ? "fakturę" : "faktur"}
            </span>
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Pobierz wybrane
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Wyślij wybrane
            </Button>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <Checkbox
                    checked={
                      selectedRows.length > 0 &&
                      selectedRows.length === filteredInvoices.length
                    }
                    onCheckedChange={handleSelectAllRows}
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                  <div className="flex items-center gap-1">
                    Numer
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                  <div className="flex items-center gap-1">
                    Typ dokumentu
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("netAmount")}>
                  <div className="flex items-center gap-1">
                    Kwota netto
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("grossAmount")}>
                  <div className="flex items-center gap-1">
                    Kwota brutto
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("client")}>
                  <div className="flex items-center gap-1">
                    Klient
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("issueDate")}>
                  <div className="flex items-center gap-1">
                    Data wystawienia
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("dueDate")}>
                  <div className="flex items-center gap-1">
                    Data płatności
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-1">
                    Status
                  </div>
                </TableHead>
                <TableHead className="w-[30px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(invoice.id)}
                      onCheckedChange={(checked) => handleSelectRow(invoice.id, checked as boolean)}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </TableCell>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>
                    {documentTypes.find(t => t.id === invoice.type)?.label}
                  </TableCell>
                  <TableCell>{invoice.netAmount} zł</TableCell>
                  <TableCell>{invoice.grossAmount} zł</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status as keyof typeof statusColors]}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/przychody/${invoice.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Podgląd
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/przychody/${invoice.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edytuj
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileDown className="mr-2 h-4 w-4" />
                          Pobierz
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Wyślij
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select
              value={itemsPerPage}
              onValueChange={setItemsPerPage}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50 faktur na stronę</SelectItem>
                <SelectItem value="100">100 faktur na stronę</SelectItem>
                <SelectItem value="250">250 faktur na stronę</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Poprzednie
            </Button>
            <span className="text-sm text-gray-600">
              Strona {currentPage} z {pageCount}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
              disabled={currentPage === pageCount}
            >
              Następne
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}