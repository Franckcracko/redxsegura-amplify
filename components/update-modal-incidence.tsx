"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ActualizarIncidenciaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ActualizarIncidenciaModal({ isOpen, onClose }: ActualizarIncidenciaModalProps) {
  const [selectedIncidencia, setSelectedIncidencia] = useState<string>("")
  const [reemplazarEvidencia, setReemplazarEvidencia] = useState<boolean>(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar la actualización
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Actualizar incidencia</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="incidencia">Selecciona incidencia</Label>
            <Select value={selectedIncidencia} onValueChange={setSelectedIncidencia}>
              <SelectTrigger id="incidencia" className="w-full rounded-lg border-gray-200">
                <SelectValue placeholder="Selecciona una incidencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enfermedad-12-03">Enfermedad reportada el 12/03</SelectItem>
                <SelectItem value="perdida-04-04">Pérdida de equipo 04/04</SelectItem>
                <SelectItem value="otro-15-04">Otro incidente 15/04</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Nueva descripción o comentario adicional</Label>
            <Textarea
              id="descripcion"
              placeholder="Escribe aquí información adicional o actualizada sobre la incidencia..."
              className="min-h-[100px] rounded-lg border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidencia">Subir nuevo comprobante o evidencia (opcional)</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 mb-3">Arrastra y suelta o haz clic para seleccionar</p>
                <Input id="file" type="file" className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-200"
                  onClick={() => document.getElementById("file")?.click()}
                >
                  Seleccionar archivo
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="reemplazar"
              checked={reemplazarEvidencia}
              onCheckedChange={(checked) => setReemplazarEvidencia(checked as boolean)}
            />
            <Label htmlFor="reemplazar" className="text-sm font-normal leading-tight">
              ¿Deseas reemplazar la evidencia anterior?
            </Label>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" className="w-full rounded-lg bg-red-600 hover:bg-red-700">
              Actualizar
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
