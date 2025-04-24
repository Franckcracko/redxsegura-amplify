"use client"

import { useState } from "react"
import Header from "@/components/header"
import BottomNav from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CreditCard, History, RefreshCw, Shield } from "lucide-react"
import PagoPrimaModal from "@/components/pay-prima-modal"
import ActualizarRespaldoModal from "@/components/update-modal-backup"

export default function SeguridadFinanciera() {
  const [isPrimaModalOpen, setIsPrimaModalOpen] = useState(false)
  const [isRespaldoModalOpen, setIsRespaldoModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto p-4 pb-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Seguridad Financiera</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Ingresos registrados</h3>
            <p className="text-2xl font-bold text-red-600">$8,750</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <span className="mr-1">+12%</span>
              <span>este mes</span>
            </div>
          </Card>

          <Card className="p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Actualización más reciente</h3>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-red-600 mr-1" />
              <p className="text-sm font-medium">Hace 3 días</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">15 de abril, 2023</p>
          </Card>
        </div>

        <Card className="p-4 rounded-xl shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Seguro de respaldo</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Activo</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-500">Prima mensual</p>
              <p className="text-lg font-semibold text-gray-800">$150 MXN</p>
            </div>
            <Button className="rounded-lg bg-red-600 hover:bg-red-700" onClick={() => setIsPrimaModalOpen(true)}>
              <CreditCard className="h-4 w-4 mr-2" />
              Pagar prima
            </Button>
          </div>

          <div className="text-xs text-gray-500">Próximo pago: 5 de mayo, 2023</div>
        </Card>

        <div className="space-y-4 mb-6">
          <Card className="p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <History className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Historial de respaldo</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700">
                Ver todo
              </Button>
            </div>

            <div className="h-24 w-full bg-gray-50 rounded-lg flex items-end p-2">
              {[40, 65, 45, 70, 55, 60, 80].map((height, i) => (
                <div key={i} className="flex-1 mx-1" style={{ height: `${height}%` }}>
                  <div className="w-full h-full bg-red-500 opacity-80 rounded-t-sm"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </Card>

          <Card className="p-4 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Frecuencia de respaldo</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-10 rounded-lg border-gray-200 text-sm" data-active="true">
                Semanal
              </Button>
              <Button variant="outline" className="h-10 rounded-lg border-gray-200 text-sm">
                Quincenal
              </Button>
              <Button variant="outline" className="h-10 rounded-lg border-gray-200 text-sm">
                Mensual
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-3">Próxima actualización programada: 22 de abril, 2023</p>
          </Card>

          <Card className="p-4 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <RefreshCw className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Actualizar respaldo manual</h3>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              Actualiza tu respaldo financiero en cualquier momento, sin esperar a la fecha programada.
            </p>

            <Button
              className="w-full rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              onClick={() => setIsRespaldoModalOpen(true)}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar ahora</span>
            </Button>
          </Card>
        </div>
      </main>

      <BottomNav currentPath="/dashboard/security" />

      <PagoPrimaModal isOpen={isPrimaModalOpen} onClose={() => setIsPrimaModalOpen(false)} />
      <ActualizarRespaldoModal isOpen={isRespaldoModalOpen} onClose={() => setIsRespaldoModalOpen(false)} />
    </div>
  )
}
