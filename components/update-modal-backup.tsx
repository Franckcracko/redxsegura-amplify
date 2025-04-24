"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ActualizarRespaldoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ActualizarRespaldoModal({ isOpen, onClose }: ActualizarRespaldoModalProps) {
  const [periodo, setPeriodo] = useState<string>("")
  const [monto, setMonto] = useState<string>("")
  const [comentario, setComentario] = useState<string>("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar la actualización del respaldo
    console.log({ periodo, monto, comentario })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Actualizar respaldo manual</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="periodo">Periodo de respaldo</Label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger id="periodo" className="w-full rounded-lg border-gray-200">
                <SelectValue placeholder="Selecciona un periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="quincenal">Quincenal</SelectItem>
                <SelectItem value="mensual">Mensual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monto">Monto estimado de ingresos durante este periodo</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="monto"
                type="number"
                placeholder="2,000"
                className="pl-7 rounded-lg border-gray-200"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentario">Comentario adicional (opcional)</Label>
            <Textarea
              id="comentario"
              placeholder="Añade cualquier información relevante sobre este respaldo..."
              className="min-h-[80px] rounded-lg border-gray-200"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" className="w-full rounded-lg bg-red-600 hover:bg-red-700">
              Guardar respaldo
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
