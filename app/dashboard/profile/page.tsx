"use client";

import Header from "@/components/header"
import BottomNav from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"
import { UserAttributeKey, fetchUserAttributes, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Perfil() {
  const router = useRouter()
  const [dataUser, setDataUser] = useState<Partial<Record<UserAttributeKey, string>>>({})
  const handleSignOut = async () => {
    await signOut()
    router.replace("/auth/login")
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchUserAttributes()
        setDataUser(response)
      } catch (error) {
        console.log(error)
        router.replace("/login")
      }
    }
    getData()
  }, [])


  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Perfil</h1>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <Card className="p-4 rounded-xl shadow-sm mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Mis datos</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input id="nombre" defaultValue={`${dataUser.given_name} ${dataUser.family_name}`} className="rounded-lg border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                defaultValue={dataUser.email}
                className="rounded-lg border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" type="tel" defaultValue={dataUser.phone_number} className="rounded-lg border-gray-200" />
            </div>

            <Button variant="outline" className="w-full rounded-lg border-gray-200">
              Actualizar datos
            </Button>
          </div>
        </Card>

        <Card className="p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Frecuencia de actualización</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frecuencia">Recordatorios de actualización</Label>
              <Select defaultValue="mensual">
                <SelectTrigger id="frecuencia" className="w-full rounded-lg border-gray-200">
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="quincenal">Quincenal</SelectItem>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notificaciones">Método de notificación</Label>
              <Select defaultValue="app">
                <SelectTrigger id="notificaciones" className="w-full rounded-lg border-gray-200">
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="app">Notificaciones en la app</SelectItem>
                  <SelectItem value="email">Correo electrónico</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="todos">Todos los métodos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full rounded-lg bg-red-600 hover:bg-red-700">Guardar preferencias</Button>
            <Button variant={"ghost"} className="w-full rounded-lg hover:bg-red-700" onClick={handleSignOut}>Cerrar sesión</Button>
          </div>
        </Card>
      </main>

      <BottomNav currentPath="/dashboard/profile" />
    </div>
  )
}
