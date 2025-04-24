"use client"

import Header from "@/components/header"
import BottomNav from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"

export default function Reportar() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto p-4 pb-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reportar Incidencia</h1>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de incidencia</Label>
              <Select>
                <SelectTrigger id="tipo" className="w-full rounded-lg border-gray-200">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enfermedad">Enfermedad</SelectItem>
                  <SelectItem value="perdida">Pérdida de equipo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe la incidencia..."
                className="min-h-[100px] rounded-lg border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input id="fecha" type="date" className="rounded-lg border-gray-200" />
            </div>
          </div>

          <Card className="p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Validación de evidencia</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox id="check1" />
                <Label htmlFor="check1" className="text-sm font-normal leading-tight">
                  ¿El documento tiene nombre y fecha?
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="check2" />
                <Label htmlFor="check2" className="text-sm font-normal leading-tight">
                  ¿Incluye firma o sello médico?
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="check3" />
                <Label htmlFor="check3" className="text-sm font-normal leading-tight">
                  ¿La imagen es legible?
                </Label>
              </div>
            </div>
          </Card>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="text-sm font-medium text-gray-700 mb-1">Subir comprobante</h3>
              <p className="text-xs text-gray-500 mb-4">Arrastra y suelta o haz clic para seleccionar</p>
              <Input id="file" type="file" className="hidden" />
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-200"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("file")?.click()
                }}
              >
                Seleccionar archivo
              </Button>
            </div>
          </div>

          <Button className="w-full rounded-lg bg-red-600 hover:bg-red-700 py-6">Enviar reporte</Button>
        </form>
      </main>

      <BottomNav currentPath="/dashboard/report" />
    </div>
  )
}
