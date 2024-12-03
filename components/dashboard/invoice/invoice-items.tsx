"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { InvoiceItem } from "@/lib/utils/invoice"
import { units, vatRates } from "@/lib/constants/invoice"

interface InvoiceItemsProps {
  items: InvoiceItem[]
  onItemChange: (id: string, field: keyof InvoiceItem, value: string) => void
  onAddItem: () => void
  onRemoveItem: (id: string) => void
  showPkwiu?: boolean
}

export function InvoiceItems({ items, onItemChange, onAddItem, onRemoveItem, showPkwiu }: InvoiceItemsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-8 items-start">
            <div className="sm:col-span-2 lg:col-span-1">
              <Input
                placeholder="Nazwa"
                value={item.name}
                onChange={(e) => onItemChange(item.id, "name", e.target.value)}
              />
            </div>
            {showPkwiu && (
              <div>
                <Input
                  placeholder="PKWiU"
                  value={item.pkwiu || ""}
                  onChange={(e) => onItemChange(item.id, "pkwiu", e.target.value)}
                />
              </div>
            )}
            <div>
              <Input
                type="number"
                placeholder="Ilość"
                value={item.quantity}
                onChange={(e) => onItemChange(item.id, "quantity", e.target.value)}
              />
            </div>
            <div>
              <Select
                value={item.unit}
                onValueChange={(value) => onItemChange(item.id, "unit", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Jednostka" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                type="number"
                placeholder="Cena netto"
                value={item.netPrice}
                onChange={(e) => onItemChange(item.id, "netPrice", e.target.value)}
              />
            </div>
            <div>
              <Select
                value={item.vatRate}
                onValueChange={(value) => onItemChange(item.id, "vatRate", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="VAT" />
                </SelectTrigger>
                <SelectContent>
                  {vatRates.map((rate) => (
                    <SelectItem key={rate.id} value={rate.id}>
                      {rate.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Wartość netto"
                value={item.netValue}
                readOnly
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Wartość brutto"
                value={item.grossValue}
                readOnly
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item.id)}
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={onAddItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Dodaj pozycję
      </Button>
    </div>
  )
}