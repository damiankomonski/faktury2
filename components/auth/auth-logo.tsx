import Link from "next/link"
import { Receipt } from "lucide-react"

export function AuthLogo() {
  return (
    <Link href="/" className="flex items-center justify-center space-x-2">
      <Receipt className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold">Fakturki</span>
    </Link>
  )
}