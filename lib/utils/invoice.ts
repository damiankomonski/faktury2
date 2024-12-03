import { v4 as uuidv4 } from 'uuid'

export interface InvoiceItem {
  id: string
  name: string
  pkwiu?: string
  quantity: string
  unit: string
  netPrice: string
  vatRate: string
  netValue: string
  grossValue: string
}

export const calculateValues = (quantity: string, netPrice: string, vatRate: string) => {
  const qty = parseFloat(quantity) || 0
  const price = parseFloat(netPrice) || 0
  const vat = vatRate === "zw" || vatRate === "np" || vatRate === "no" ? 0 : parseInt(vatRate) / 100

  const netValue = qty * price
  const grossValue = netValue * (1 + vat)

  return {
    netValue: netValue.toFixed(2),
    grossValue: grossValue.toFixed(2),
  }
}

export const createEmptyInvoiceItem = (): InvoiceItem => ({
  id: uuidv4(),
  name: "",
  pkwiu: "",
  quantity: "",
  unit: "",
  netPrice: "",
  vatRate: "",
  netValue: "",
  grossValue: "",
})