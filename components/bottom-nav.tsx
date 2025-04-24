import { Home, Shield, Upload, User } from "lucide-react"
import Link from "next/link"

interface BottomNavProps {
  currentPath: string
}

export default function BottomNav({ currentPath }: BottomNavProps) {
  return (
    <nav className="z-10 bg-white border-t border-gray-100 flex justify-around py-2">
      <Link
        href="/dashboard"
        className={`flex flex-col items-center p-2 ${currentPath === "/" ? "text-red-600" : "text-gray-500"}`}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Inicio</span>
      </Link>

      <Link
        href="/dashboard/security"
        className={`flex flex-col items-center p-2 ${
          currentPath === "/dashboard/security" ? "text-red-600" : "text-gray-500"
        }`}
      >
        <Shield className="h-5 w-5" />
        <span className="text-xs mt-1">Seguridad</span>
      </Link>

      <Link
        href="/dashboard/report"
        className={`flex flex-col items-center p-2 ${currentPath === "/dashboard/report" ? "text-red-600" : "text-gray-500"}`}
      >
        <Upload className="h-5 w-5" />
        <span className="text-xs mt-1">Reportar</span>
      </Link>

      <Link
        href="/dashboard/profile"
        className={`flex flex-col items-center p-2 ${currentPath === "/dashboard/profile" ? "text-red-600" : "text-gray-500"}`}
      >
        <User className="h-5 w-5" />
        <span className="text-xs mt-1">Perfil</span>
      </Link>
    </nav>
  )
}
