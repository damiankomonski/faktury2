"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Box,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  Menu,
  Package,
  Receipt,
  Settings,
  Users,
  X,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Przychody",
    icon: CreditCard,
    submenu: [
      { title: "Wszystkie", href: "/dashboard/przychody" },
      { title: "Faktury", href: "/dashboard/faktury" },
    ],
  },
  {
    title: "Wydatki",
    icon: Receipt,
    submenu: [
      { title: "Wszystkie", href: "/dashboard/wydatki" },
    ],
  },
  {
    title: "Klienci",
    icon: Users,
    submenu: [
      { title: "Wszystkie", href: "/dashboard/klienci" },
    ],
  },
  {
    title: "Magazyn",
    icon: Box,
    submenu: [
      { title: "Produkty", href: "/dashboard/produkty" },
    ],
  },
  {
    title: "Ustawienia",
    href: "/dashboard/ustawienia",
    icon: Settings,
  },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1 p-4">
      {menuItems.map((item, index) => {
        if (item.submenu) {
          return (
            <Collapsible key={index} className="space-y-1">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pl-9">
                {item.submenu.map((subitem, subindex) => (
                  <Link
                    key={subindex}
                    href={subitem.href}
                    onClick={onLinkClick}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm hover:bg-gray-100",
                      pathname === subitem.href && "bg-gray-100 font-medium"
                    )}
                  >
                    {subitem.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )
        }
        return (
          <Link
            key={index}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center space-x-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100",
              pathname === item.href && "bg-gray-100 font-medium"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute left-4 top-3">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" onClick={handleLinkClick} className="flex items-center space-x-2">
              <Receipt className="h-6 w-6 text-primary" />
              <span className="font-bold">Fakturki</span>
            </Link>
          </div>
          <SidebarContent onLinkClick={handleLinkClick} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r bg-gray-50/40 h-screen">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Receipt className="h-6 w-6 text-primary" />
            <span className="font-bold">Fakturki</span>
          </Link>
        </div>
        <SidebarContent />
      </div>
    </>
  )
}