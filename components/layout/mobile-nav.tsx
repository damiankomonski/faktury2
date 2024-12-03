"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Funkcje", href: "/features" },
  { name: "Cennik", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Kontakt", href: "/contact" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-4 pt-4 border-t">
            <Button variant="ghost" asChild>
              <Link href="/signin">Zaloguj się</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Zarejestruj się</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}