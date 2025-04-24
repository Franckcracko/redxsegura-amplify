import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SigninPage() {
  return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto px-4 md:px-6 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Red X Segura</h1>
            <p className="text-sm text-muted-foreground">Ingresa a tu cuenta para acceder a la plataforma</p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                placeholder="nombre@ejemplo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                {/* <Link href="/recuperar-password" className="text-xs text-red-600 hover:text-red-700">
                  ¿Olvidaste tu contraseña?
                </Link> */}
              </div>
              <Input id="password" type="password" autoComplete="current-password" />
            </div>
            <Button className="bg-[#f64f6d] hover:bg-[#df2244]">Iniciar sesión</Button>
          </div>

          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/signup" className="text-red-600 hover:text-red-700">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
  )
}
