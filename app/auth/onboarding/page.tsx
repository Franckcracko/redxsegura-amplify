"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock,
  HelpCircle,
  Users,
  Briefcase,
  PenToolIcon as Tool,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const toolsWork = [
  { value: "taladro", label: "Taladro Eléctrico" },
  { value: "atornillador", label: "Atornillador Eléctrico" },
  { value: "rotomartillo", label: "Rotomartillo" },
  { value: "lijadora", label: "Lijadora" },
  { value: "sierra_circular", label: "Sierra Circular" },
  { value: "amoladora", label: "Amoladora Angular" },
  { value: "multimetro", label: "Multímetro Digital" },
  { value: "soldadora", label: "Soldadora" },
  { value: "compresor", label: "Compresor de Aire" },
  { value: "generador", label: "Generador Eléctrico" },
];

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  // Estado para almacenar todos los datos del formulario
  const [formData, setFormData] = useState({
    sectorEconomyActivity: "",
    economyActivity: "",
    incomeMethod: "",
    income: "",
    incomeSources: "",
    regularCustomers: "",
    depending: "",
    activityTime: "",
    workFrequency: "",
    tools: [] as { name: string; serie: number }[],
  })

  // Estado para la herramienta actual que se está agregando
  const [toolBox, setToolBox] = useState<{ name: string; serie: number } | null>(null)

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Función para manejar cambios en los selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Función para agregar una herramienta
  const addTool = () => {
    if (!toolBox?.name || !toolBox?.serie) return
    setFormData((prev) => ({
      ...prev,
      tools: [...prev.tools, toolBox],
    }))
    setToolBox(null)
  }

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Función para enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    // Aquí iría la lógica para enviar los datos
    router.push("/dashboard") // Redirigir al dashboard después de completar
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10">
      <div className="container max-w-2xl mx-auto px-4 md:px-6">
        {/* Header con logo y progreso */}
        <div className="mb-8 text-center">
          {/* <div className="flex justify-center mb-4">
            <div className="bg-red-500 text-white p-3 rounded-full">
              <CircleDollarSign size={24} />
            </div>
          </div> */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Red X Segura</h1>
          <p className="text-gray-600 mb-6">Configura tu perfil financiero para comenzar</p>

          {/* Indicador de progreso */}
          <div className="flex justify-between items-center mb-2 px-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep > index + 1
                    ? "bg-red-500 text-white"
                    : currentStep === index + 1
                      ? "bg-red-100 border-2 border-red-500 text-red-500"
                      : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {currentStep > index + 1 ? <CheckCircle2 size={16} /> : index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 mb-6 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenido del paso actual */}
        <Card className="shadow-md border-0">
          <form onSubmit={handleSubmit}>
            {/* Paso 1: Bienvenida e introducción */}
            {currentStep === 1 && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl">¡Bienvenido a Red X Segura!</CardTitle>
                  <CardDescription>
                    Vamos a configurar tu perfil financiero para ofrecerte los mejores servicios. Esto nos ayudará a
                    entender mejor tu situación económica.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="font-medium text-red-700 mb-2 flex items-center">
                      <HelpCircle size={18} className="mr-2" />
                      ¿Por qué necesitamos esta información?
                    </h3>
                    <p className="text-sm text-red-600">
                      La información que nos proporciones nos ayudará a crear un perfil financiero personalizado para
                      ofrecerte servicios adaptados a tus necesidades específicas. Todos tus datos están protegidos y
                      son confidenciales.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start">
                      <Briefcase className="text-red-500 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium">Actividad económica</h4>
                        <p className="text-sm text-gray-600">Información sobre tu trabajo y sector</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start">
                      <CircleDollarSign className="text-red-500 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium">Ingresos</h4>
                        <p className="text-sm text-gray-600">Detalles sobre tus fuentes de ingresos</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start">
                      <Users className="text-red-500 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium">Clientes y dependientes</h4>
                        <p className="text-sm text-gray-600">Información sobre tu red de clientes</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start">
                      <Tool className="text-red-500 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium">Herramientas</h4>
                        <p className="text-sm text-gray-600">Recursos que utilizas en tu trabajo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {/* Paso 2: Actividad económica */}
            {currentStep === 2 && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Briefcase className="mr-2" size={20} />
                    Actividad económica
                  </CardTitle>
                  <CardDescription>Cuéntanos sobre tu sector y actividad económica principal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="sectorEconomyActivity">Selecciona tu sector de actividad económica</Label>
                    <Select
                      name="sectorEconomyActivity"
                      value={formData.sectorEconomyActivity}
                      onValueChange={(value) => handleSelectChange("sectorEconomyActivity", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informal">Comercio Informal</SelectItem>
                        <SelectItem value="office">Oficio</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      El sector nos ayuda a entender el contexto de tu actividad económica
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="economyActivity">Actividad económica específica</Label>
                    <Select
                      name="economyActivity"
                      value={formData.economyActivity}
                      onValueChange={(value) => handleSelectChange("economyActivity", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una actividad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jardinero">Jardinero</SelectItem>
                        <SelectItem value="albañil">Albañil</SelectItem>
                        <SelectItem value="plomero">Plomero</SelectItem>
                        <SelectItem value="panadero">Panadero</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Describe la actividad específica a la que te dedicas</p>
                  </div>
                </CardContent>
              </>
            )}

            {/* Paso 3: Ingresos */}
            {currentStep === 3 && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CircleDollarSign className="mr-2" size={20} />
                    Información de ingresos
                  </CardTitle>
                  <CardDescription>Datos sobre tus ingresos y métodos de cobro</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="incomeMethod">¿Cómo recibes tus ingresos?</Label>
                    <Select
                      name="incomeMethod"
                      value={formData.incomeMethod}
                      onValueChange={(value) => handleSelectChange("incomeMethod", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Método de ingresos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Tarjeta</SelectItem>
                        <SelectItem value="cash">Efectivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="income">Cantidad de ingresos mensuales aproximados</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="income"
                        type="number"
                        className="pl-8"
                        placeholder="0.00"
                        value={formData.income}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Esta información nos ayuda a ofrecerte servicios financieros adecuados
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="incomeSources">Número de fuentes de ingresos</Label>
                    <Input
                      id="incomeSources"
                      type="text"
                      placeholder="Ej: 2"
                      value={formData.incomeSources}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      ¿De cuántas actividades o trabajos diferentes obtienes ingresos?
                    </p>
                  </div>
                </CardContent>
              </>
            )}

            {/* Paso 4: Clientes y dependientes */}
            {currentStep === 4 && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2" size={20} />
                    Clientes y dependientes
                  </CardTitle>
                  <CardDescription>Información sobre tu red de clientes y personas a tu cargo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="regularCustomers">Número de clientes fijos</Label>
                    <Input
                      id="regularCustomers"
                      type="text"
                      placeholder="Ej: 15"
                      value={formData.regularCustomers}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-gray-500">Clientes que te compran o contratan regularmente</p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="depending">Número de personas que dependen de ti</Label>
                    <Input
                      id="depending"
                      type="number"
                      placeholder="Ej: 3"
                      value={formData.depending}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-gray-500">Personas que dependen económicamente de tus ingresos</p>
                  </div>
                </CardContent>
              </>
            )}

            {/* Paso 5: Experiencia y frecuencia */}
            {currentStep === 5 && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-2" size={20} />
                    Experiencia y frecuencia
                  </CardTitle>
                  <CardDescription>Información sobre tu experiencia y ritmo de trabajo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="activityTime">Tiempo desempeñando la actividad</Label>
                    <Input
                      id="activityTime"
                      type="text"
                      placeholder="Ej: 2 años"
                      value={formData.activityTime}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-gray-500">¿Cuánto tiempo llevas realizando esta actividad?</p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="workFrequency">Frecuencia de trabajo</Label>
                    <Select
                      name="workFrequency"
                      value={formData.workFrequency}
                      onValueChange={(value) => handleSelectChange("workFrequency", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona la frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diaria</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="eventually">Eventual</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">¿Con qué frecuencia realizas tu actividad económica?</p>
                  </div>
                </CardContent>
              </>
            )}

            {/* Paso 6: Herramientas de trabajo */}
            {currentStep === 6 && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Tool className="mr-2" size={20} />
                    Herramientas de trabajo
                  </CardTitle>
                  <CardDescription>Registra las herramientas que utilizas para tu actividad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="toolsBox">Herramientas de trabajo</Label>

                    {formData.tools.length > 0 && (
                      <div className="border rounded-md p-3 mb-4">
                        <p className="text-sm font-medium mb-2">Herramientas registradas:</p>
                        <ul className="space-y-2">
                          {formData.tools.map((tool, index) => (
                            <li key={index} className="text-sm bg-gray-50 p-2 rounded flex justify-between">
                              <span>{tool.name}</span>
                              <span className="text-gray-500">Serie: {tool.serie}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" type="button" className="w-full">
                          Agregar herramienta
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Agrega tu herramienta de trabajo</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex flex-col gap-6">
                          <div className="grid gap-2">
                            <Label htmlFor="description-tool">Nombre</Label>
                            <Select
                              name="description-tool"
                              value={toolBox?.name}
                              onValueChange={(value) => {
                                setToolBox({ ...(toolBox || { name: "", serie: 0 }), name: value })
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona herramientas de trabajo" />
                              </SelectTrigger>
                              <SelectContent>
                                {
                                  toolsWork.map(t => (
                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="id-tool">Número de serie</Label>
                            <Input
                              id="id-tool"
                              type="text"
                              placeholder="Ej: 11111"
                              value={toolBox?.serie || ""}
                              onChange={(e) =>
                                setToolBox({ ...(toolBox || { name: "", serie: 0 }), serie: Number(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={addTool}>Agregar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <p className="text-xs text-gray-500">
                      Registra las herramientas principales que utilizas para tu trabajo
                    </p>
                  </div>
                </CardContent>
              </>
            )}

            {/* Botones de navegación */}
            <CardFooter className="flex justify-between border-t pt-6">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep} className="bg-red-600 hover:bg-red-700">
                  Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Completar perfil
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>

        {/* Texto de seguridad */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Tus datos están protegidos y son confidenciales
          </p>
        </div>
      </div>
    </div>
  )
}
