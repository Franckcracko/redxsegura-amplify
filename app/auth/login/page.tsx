"use client";

import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { signIn } from "aws-amplify/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await signIn({
        username: email,
        password: password,
      })
      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      toast.error("Error al iniciar sesión", {
        description: "Por favor, verifica tus credenciales e inténtalo de nuevo.",
      })
    }
    setIsLoading(false)
  }

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

        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="nombre@ejemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              {/* <Link href="/recuperar-password" className="text-xs text-red-600 hover:text-red-700">
                  ¿Olvidaste tu contraseña?
                </Link> */}
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="bg-[#f64f6d] hover:bg-[#df2244]"
          >
            {
              isLoading ? (
                "Inciando sesión..."
              ) : (
                "Iniciar sesión"
              )
            }
          </Button>
        </form>

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
