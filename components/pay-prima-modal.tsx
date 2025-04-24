"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface PagoPrimaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PagoPrimaModal({ isOpen, onClose }: PagoPrimaModalProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Pagar prima del seguro</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Resumen de información</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Dependientes económicos</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ingresos mensuales</span>
                <span className="font-medium">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Frecuencia laboral</span>
                <span className="font-medium">Quincenal</span>
              </div>
            </div>
          </div>

          <Card className="p-4 rounded-xl shadow-sm bg-blue-50 border-blue-100">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Prima calculada</p>
              <p className="text-3xl font-bold text-blue-600">$150 MXN</p>
              <p className="text-xs text-gray-500 mt-1">Cobertura mensual</p>
            </div>
          </Card>

          <div>
            <button
              className="flex items-center text-sm text-blue-600 font-medium"
              onClick={() => setShowDetails(!showDetails)}
            >
              Ver detalle del cálculo
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>

            {showDetails && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Prima base</span>
                  <span>$100 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ajuste por dependientes</span>
                  <span>+$30 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ajuste por ingresos</span>
                  <span>+$20 MXN</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>$150 MXN</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-4">
          <Button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-6">Pagar ahora</Button>

          <div className="text-center">
            <button className="text-sm text-gray-500 hover:text-blue-600">Métodos de pago</button>
          </div>
        </div>
      </div>
    </div>
  )
}
