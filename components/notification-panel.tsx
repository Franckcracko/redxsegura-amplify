"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Info, X } from "lucide-react"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return null

  const notifications = [
    {
      id: 1,
      type: "alert",
      message: "Tu reporte de incidencia requiere más información",
      time: "Hace 1 hora",
      icon: AlertCircle,
      color: "text-amber-500",
    },
    {
      id: 2,
      type: "success",
      message: "Reporte validado correctamente",
      time: "Hace 3 horas",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "info",
      message: "Recuerda actualizar tus datos de contacto",
      time: "Hace 1 día",
      icon: Info,
      color: "text-blue-500",
    },
    {
      id: 4,
      type: "info",
      message: "Nuevo boletín de seguridad financiera disponible",
      time: "Hace 2 días",
      icon: Info,
      color: "text-blue-500",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/20" onClick={onClose}>
      <div
        className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg transition-transform transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Notificaciones</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className="p-3 rounded-xl shadow-sm">
                  <div className="flex gap-3">
                    <notification.icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full rounded-lg">
              Ayuda y contacto
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
