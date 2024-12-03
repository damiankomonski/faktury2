import Link from "next/link"
import { Receipt } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Receipt className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Fakturki</span>
          </Link>
          <p className="text-sm text-gray-600">
            Profesjonalne fakturowanie uproszczone dla firm każdej wielkości.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Produkt</h3>
          <ul className="space-y-2">
            <li><Link href="/features" className="text-sm text-gray-600 hover:text-primary">Funkcje</Link></li>
            <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-primary">Cennik</Link></li>
            <li><Link href="/templates" className="text-sm text-gray-600 hover:text-primary">Szablony</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Firma</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-sm text-gray-600 hover:text-primary">O nas</Link></li>
            <li><Link href="/blog" className="text-sm text-gray-600 hover:text-primary">Blog</Link></li>
            <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary">Kontakt</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Prawne</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">Polityka Prywatności</Link></li>
            <li><Link href="/terms" className="text-sm text-gray-600 hover:text-primary">Regulamin</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container py-6 border-t">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Fakturki. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}