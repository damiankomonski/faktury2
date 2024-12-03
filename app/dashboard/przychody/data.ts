"use client"

import { v4 as uuidv4 } from 'uuid'

export const statusColors = {
  opłacona: "bg-green-100 text-green-800",
  oczekująca: "bg-yellow-100 text-yellow-800",
  przeterminowana: "bg-red-100 text-red-800",
}

export const documentTypes = [
  { id: "all", label: "Wszystkie" },
  { id: "invoice", label: "Faktura" },
  { id: "proforma", label: "Faktura proforma" },
  { id: "advance", label: "Faktura zaliczkowa" },
  { id: "final", label: "Faktura końcowa" },
  { id: "correction", label: "Faktura korygująca" },
  { id: "bill", label: "Rachunek" },
]

export type Invoice = {
  id: string
  type: string
  netAmount: string
  grossAmount: string
  client: string
  issueDate: string
  dueDate: string
  status: string
}

// Use deterministic data for initial render
export const baseInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    type: "invoice",
    netAmount: "1000,00",
    grossAmount: "1230,00",
    client: "Firma A Sp. z o.o.",
    issueDate: "2024-03-15",
    dueDate: "2024-03-29",
    status: "opłacona",
  },
  {
    id: "INV-2024-002",
    type: "proforma",
    netAmount: "2500,00",
    grossAmount: "3075,00",
    client: "Firma B S.A.",
    issueDate: "2024-03-14",
    dueDate: "2024-03-28",
    status: "oczekująca",
  },
  {
    id: "INV-2024-003",
    type: "advance",
    netAmount: "1750,00",
    grossAmount: "2152,50",
    client: "Firma C Sp. z o.o.",
    issueDate: "2024-03-10",
    dueDate: "2024-03-24",
    status: "przeterminowana",
  },
]

export const generateAdditionalInvoices = (startIndex: number, count: number): Invoice[] => {
  const types = documentTypes.slice(1).map(t => t.id)
  const statuses = ['opłacona', 'oczekująca', 'przeterminowana']
  
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i
    return {
      id: `INV-2024-${String(index).padStart(3, '0')}`,
      type: types[index % types.length],
      netAmount: `${(index * 1000)},00`,
      grossAmount: `${(index * 1230)},00`,
      client: `Firma ${String.fromCharCode(68 + (index % 20))} ${index % 2 === 0 ? 'Sp. z o.o.' : 'S.A.'}`,
      issueDate: new Date(2024, 2, (index % 30) + 1).toISOString().split('T')[0],
      dueDate: new Date(2024, 3, (index % 30) + 1).toISOString().split('T')[0],
      status: statuses[index % statuses.length],
    }
  })
}