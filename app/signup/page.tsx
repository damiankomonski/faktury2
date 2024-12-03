"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { AuthLogo } from "@/components/auth/auth-logo"
import { AuthFooter } from "@/components/auth/auth-footer"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Hasła nie są identyczne!")
      return
    }
    toast.success("Konto zostało utworzone!")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-gray-50">
      <div className="w-full pt-8">
        <AuthLogo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Utwórz konto
          </CardTitle>
          <CardDescription className="text-center">
            Wprowadź swoje dane, aby utworzyć konto
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Imię i Nazwisko</Label>
              <Input
                id="name"
                placeholder="Jan Kowalski"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nazwa@firma.pl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Akceptuję{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  regulamin
                </Link>{" "}
                i{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  politykę prywatności
                </Link>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Zarejestruj się
            </Button>
            <p className="text-center text-sm text-gray-600">
              Masz już konto?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Zaloguj się
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      <AuthFooter />
    </div>
  )
}