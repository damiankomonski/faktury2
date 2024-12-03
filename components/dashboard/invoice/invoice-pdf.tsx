"use client"

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    color: '#666',
    width: 80,
  },
  value: {
    fontSize: 10,
  },
  table: {
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  tableCell: {
    fontSize: 10,
  },
  col1: { width: '5%' },
  col2: { width: '30%' },
  col3: { width: '10%' },
  col4: { width: '10%' },
  col5: { width: '15%' },
  col6: { width: '10%' },
  col7: { width: '10%' },
  col8: { width: '10%' },
  summary: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 10,
    marginRight: 10,
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  signature: {
    width: '40%',
    borderTopWidth: 1,
    borderTopColor: '#999',
    paddingTop: 5,
  },
  signatureText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
  },
})

interface InvoicePDFProps {
  invoice: {
    id: string
    issueDate: string
    issuePlace: string
    saleDate: string
    seller: {
      name: string
      nip: string
      address: string
      postalCode: string
      city: string
      accountNumber: string
      bank: string
      swift: string
    }
    buyer: {
      name: string
      nip: string
      address: string
      postalCode: string
      city: string
      email: string
      phone: string
    }
    items: Array<{
      name: string
      quantity: string
      unit: string
      netPrice: string
      vatRate: string
      netValue: string
      grossValue: string
    }>
    payment: {
      method: string
      dueDate: string
      status: string
    }
    totals: {
      netTotal: number
      vatTotal: number
      grossTotal: number
    }
    notes?: string
  }
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Faktura VAT</Text>
            <Text style={styles.subtitle}>Nr: {invoice.id}</Text>
            <Text style={styles.subtitle}>Data wystawienia: {invoice.issueDate}</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Miejsce wystawienia: {invoice.issuePlace}</Text>
            <Text style={styles.subtitle}>Data sprzedaży: {invoice.saleDate}</Text>
          </View>
        </View>

        {/* Seller and Buyer */}
        <View style={[styles.section, { flexDirection: 'row' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Sprzedawca</Text>
            <Text style={styles.value}>{invoice.seller.name}</Text>
            <Text style={styles.value}>NIP: {invoice.seller.nip}</Text>
            <Text style={styles.value}>{invoice.seller.address}</Text>
            <Text style={styles.value}>{invoice.seller.postalCode} {invoice.seller.city}</Text>
            <Text style={styles.value}>Nr konta: {invoice.seller.accountNumber}</Text>
            <Text style={styles.value}>Bank: {invoice.seller.bank}</Text>
            <Text style={styles.value}>SWIFT: {invoice.seller.swift}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Nabywca</Text>
            <Text style={styles.value}>{invoice.buyer.name}</Text>
            <Text style={styles.value}>NIP: {invoice.buyer.nip}</Text>
            <Text style={styles.value}>{invoice.buyer.address}</Text>
            <Text style={styles.value}>{invoice.buyer.postalCode} {invoice.buyer.city}</Text>
            <Text style={styles.value}>Email: {invoice.buyer.email}</Text>
            <Text style={styles.value}>Tel: {invoice.buyer.phone}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.col1]}>Lp.</Text>
            <Text style={[styles.tableCell, styles.col2]}>Nazwa</Text>
            <Text style={[styles.tableCell, styles.col3]}>Ilość</Text>
            <Text style={[styles.tableCell, styles.col4]}>J.m.</Text>
            <Text style={[styles.tableCell, styles.col5]}>Cena netto</Text>
            <Text style={[styles.tableCell, styles.col6]}>VAT</Text>
            <Text style={[styles.tableCell, styles.col7]}>W. netto</Text>
            <Text style={[styles.tableCell, styles.col8]}>W. brutto</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.col2]}>{item.name}</Text>
              <Text style={[styles.tableCell, styles.col3]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.col4]}>{item.unit}</Text>
              <Text style={[styles.tableCell, styles.col5]}>{item.netPrice}</Text>
              <Text style={[styles.tableCell, styles.col6]}>{item.vatRate}</Text>
              <Text style={[styles.tableCell, styles.col7]}>{item.netValue}</Text>
              <Text style={[styles.tableCell, styles.col8]}>{item.grossValue}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Suma netto:</Text>
            <Text style={styles.summaryValue}>{invoice.totals.netTotal.toFixed(2)} PLN</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Suma VAT:</Text>
            <Text style={styles.summaryValue}>{invoice.totals.vatTotal.toFixed(2)} PLN</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Suma brutto:</Text>
            <Text style={styles.summaryValue}>{invoice.totals.grossTotal.toFixed(2)} PLN</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Płatność</Text>
          <Text style={styles.value}>Metoda: {invoice.payment.method}</Text>
          <Text style={styles.value}>Termin: {invoice.payment.dueDate}</Text>
          <Text style={styles.value}>Status: {invoice.payment.status}</Text>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uwagi</Text>
            <Text style={styles.value}>{invoice.notes}</Text>
          </View>
        )}

        {/* Signatures */}
        <View style={styles.signatures}>
          <View style={styles.signature}>
            <Text style={styles.signatureText}>Podpis osoby upoważnionej do wystawienia</Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.signatureText}>Podpis osoby upoważnionej do odbioru</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}