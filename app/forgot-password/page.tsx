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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Link do resetowania hasła został wysłany na podany adres email!")
    setEmail("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-gray-50">
      <div className="w-full pt-8">
        <AuthLogo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Resetowanie hasła
          </CardTitle>
          <CardDescription className="text-center">
            Wprowadź swój adres email, aby zresetować hasło
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Wyślij link resetujący
            </Button>
            <p className="text-center text-sm text-gray-600">
              Pamiętasz hasło?{" "}
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