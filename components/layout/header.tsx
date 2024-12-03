"use client"

import Link from "next/link"
import { Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Receipt className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Fakturki</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/features" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2">Funkcje</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2">Cennik</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2">Blog</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2">Kontakt</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/signin">Zaloguj się</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Zarejestruj się</Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}