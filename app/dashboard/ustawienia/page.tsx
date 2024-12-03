"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function SettingsPage() {
  const [companyData, setCompanyData] = useState({
    name: "",
    nip: "",
    address: "",
    postalCode: "",
    city: "",
    bankAccount: "",
    bankName: "",
    swift: "",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    invoiceReminders: true,
    paymentConfirmations: true,
    marketingEmails: false,
  })

  const handleSave = () => {
    toast.success("Ustawienia zostały zapisane")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ustawienia</h1>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company">Dane firmy</TabsTrigger>
          <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
          <TabsTrigger value="preferences">Preferencje</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Dane firmy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nazwa firmy</Label>
                  <Input
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>NIP</Label>
                  <Input
                    value={companyData.nip}
                    onChange={(e) => setCompanyData({ ...companyData, nip: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Adres</Label>
                  <Input
                    value={companyData.address}
                    onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label>Kod pocztowy</Label>
                    <Input
                      value={companyData.postalCode}
                      onChange={(e) => setCompanyData({ ...companyData, postalCode: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Miejscowość</Label>
                    <Input
                      value={companyData.city}
                      onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Numer konta</Label>
                  <Input
                    value={companyData.bankAccount}
                    onChange={(e) => setCompanyData({ ...companyData, bankAccount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nazwa banku</Label>
                  <Input
                    value={companyData.bankName}
                    onChange={(e) => setCompanyData({ ...companyData, bankName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SWIFT</Label>
                  <Input
                    value={companyData.swift}
                    onChange={(e) => setCompanyData({ ...companyData, swift: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Powiadomienia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Powiadomienia email</Label>
                    <div className="text-sm text-muted-foreground">
                      Otrzymuj powiadomienia o nowych fakturach
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Przypomnienia o fakturach</Label>
                    <div className="text-sm text-muted-foreground">
                      Otrzymuj przypomnienia o zbliżających się terminach płatności
                    </div>
                  </div>
                  <Switch
                    checked={notifications.invoiceReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, invoiceReminders: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Potwierdzenia płatności</Label>
                    <div className="text-sm text-muted-foreground">
                      Otrzymuj potwierdzenia otrzymanych płatności
                    </div>
                  </div>
                  <Switch
                    checked={notifications.paymentConfirmations}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, paymentConfirmations: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Wiadomości marketingowe</Label>
                    <div className="text-sm text-muted-foreground">
                      Otrzymuj informacje o nowych funkcjach i promocjach
                    </div>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, marketingEmails: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferencje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sekcja w przygotowaniu
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Zapisz zmiany</Button>
      </div>
    </div>
  )
}