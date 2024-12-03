import Link from "next/link"

export function AuthFooter() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      <div className="space-x-4">
        <Link href="/privacy" className="hover:text-primary">
          Polityka Prywatności
        </Link>
        <Link href="/terms" className="hover:text-primary">
          Regulamin
        </Link>
      </div>
      <div className="mt-2">
        © {new Date().getFullYear()} Fakturki. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  )
}