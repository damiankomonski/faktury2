"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { AuthLogo } from "@/components/auth/auth-logo"
import { AuthFooter } from "@/components/auth/auth-footer"

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Zalogowano pomyślnie!")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-gray-50">
      <div className="w-full pt-8">
        <AuthLogo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Zaloguj się</CardTitle>
          <CardDescription className="text-center">
            Wprowadź swoje dane, aby się zalogować
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Hasło</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Zaloguj się
            </Button>
            <p className="text-center text-sm text-gray-600">
              Nie masz jeszcze konta?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Zarejestruj się
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      <AuthFooter />
    </div>
  )
}