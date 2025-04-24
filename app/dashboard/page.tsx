"use client"

import { useState } from "react"
import Header from "@/components/header"
import BottomNav from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Upload } from "lucide-react"
import Link from "next/link"
import UpdateModalIncidense from "@/components/update-modal-incidence"

export default function Home() {
  const [isActualizarModalOpen, setIsActualizarModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Inicio</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Respaldo actual</h3>
            <p className="text-2xl font-bold text-blue-600">$12,450</p>
          </Card>

          <Card className="p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Ingresos reportados</h3>
            <p className="text-2xl font-bold text-green-600">$3,200</p>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="h-14 rounded-xl border-gray-200 shadow-sm flex flex-col items-center justify-center gap-1"
            onClick={() => setIsActualizarModalOpen(true)}
          >
            <FileText className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">Actualizar incidencia</span>
          </Button>

          <Button
            className="h-14 rounded-xl bg-red-600 hover:bg-red-700 flex flex-col items-center justify-center gap-1"
            asChild
          >
            <Link href="/dashboard/report">
              <Upload className="h-5 w-5 text-white" />
              <span className="text-sm font-medium">Reportar incidencia</span>
            </Link>
          </Button>
        </div>

        <Card className="p-4 rounded-xl shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Respaldo financiero</h3>
            <BarChart3 className="h-4 w-4 text-gray-400" />
          </div>
          <div className="h-32 w-full bg-gray-50 rounded-lg flex items-end p-2">
            {[40, 65, 45, 70, 55, 60, 80].map((height, i) => (
              <div key={i} className="flex-1 mx-1" style={{ height: `${height}%` }}>
                <div className="w-full h-full bg-red-500 opacity-80 rounded-t-sm"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>
        </Card>
      </main>

      <BottomNav currentPath="/dashboard" />

      <UpdateModalIncidense isOpen={isActualizarModalOpen} onClose={() => setIsActualizarModalOpen(false)} />
    </div>
  )
}
