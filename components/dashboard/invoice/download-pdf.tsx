"use client"

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { InvoicePDF } from './invoice-pdf'
import { toast } from 'sonner'

export async function downloadPDF(invoice: any) {
  try {
    const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `faktura-${invoice.id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating PDF:', error)
    toast.error('Wystąpił błąd podczas generowania PDF')
  }
}