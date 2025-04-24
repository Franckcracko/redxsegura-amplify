"use client";

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Loader2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { validateCurp } from "@/lib/verificamex";
import { toast } from "sonner";
import { signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/user";

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    typeDocument: "curp",
    documentValidated: false,
    nameRefer: "",
    telRefer: "",
    emailRefer: "",
    acceptTerms: false,
    curp: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      typeDocument: value,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      acceptTerms: checked,
    })
  }

  const handleSubmit = async () => {
    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            phone_number: formData.phone,
            address: formData.address,
            birthdate: formData.birthDate,
            given_name: formData.firstname,
            family_name: formData.lastname
          },
          clientMetadata: {
            onboarding: ''
          },
          autoSignIn: true
        }
      });

      await createUser({
        telRefer: formData.telRefer,
        emailRefer: formData.emailRefer,
        nameRefer: formData.nameRefer,
        email: formData.email,
        phone: formData.phone,
        firstname: formData.firstname,
        lastname: formData.lastname,
        birthDate: formData.birthDate,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        acceptTerms: formData.acceptTerms,
        documentValidated: formData.documentValidated
      })

      router.push("/auth/verification")
    } catch (error) {
      console.error(error)
      toast.error("Error al crear usuario", {
        description: "Por favor, intenta de nuevo"
      })
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <form onSubmit={(e) => {
        e.preventDefault()
        if (step === 4) {
          handleSubmit()
        } else {
          nextStep()
        }
      }} className="mx-auto flex w-full flex-col justify-center space-y-6 px-4 md:px-6 ">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Crea tu cuenta en Red X Segura</h1>
          <p className="text-sm text-muted-foreground">
            Completa el formulario para acceder a todos nuestros servicios
          </p>
        </div>

        <div className="flex justify-between">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step === i
                  ? "border-red-600 bg-red-100 text-red-600"
                  : step > i
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                  }`}
              >
                {step > i ? <Check className="h-5 w-5" /> : i}
              </div>
              <span className="mt-2 text-xs text-center text-gray-500">
                {i === 1
                  ? "Información básica"
                  : i === 2
                    ? "Datos personales"
                    : i === 3
                      ? "Verificación"
                      : "Confirmación"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">Nombre</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nombre@redxsegura.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500">
                  La contraseña debe tener al menos 8 caracteres, una mayúscula y un número
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle, número, piso"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Tu ciudad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Código postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="00000"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de documento</Label>
                <RadioGroup
                  value={formData.typeDocument}
                  onValueChange={(value) => {
                    setFormData(prevState => ({ ...prevState, documentValidated: false }))
                    handleRadioChange(value)
                  }}
                  className="flex flex-col space-y-2"
                >
                  {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ine" id="ine" />
                    <Label htmlFor="ine">INE</Label>
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="curp" id="curp" />
                    <Label htmlFor="curp">CURP</Label>
                  </div>
                </RadioGroup>
              </div>
              {/* {
                formData.typeDocument === "ine" && (
                  <ValidatorID />
                )
              } */}
              {
                formData.typeDocument === "curp" && (
                  <ValidatorCurp
                    curp={formData.curp}
                    handleChangeCurp={(value) => { setFormData(prevState => ({ ...prevState, curp: value })) }}
                    handleChangeValidatedDocument={(value) => { setFormData(prevState => ({ ...prevState, documentValidated: value })) }}
                  />
                )
              }

            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 text-lg font-medium">Resumen de tu información</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Nombre completo</p>
                    <p className="font-medium">
                      {formData.firstname} {formData.lastname}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Correo electrónico</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Teléfono</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fecha de nacimiento</p>
                    <p className="font-medium">{formData.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dirección</p>
                    <p className="font-medium">{formData.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ciudad y CP</p>
                    <p className="font-medium">
                      {formData.city}, {formData.postalCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tipo de documento</p>
                    <p className="font-medium">{formData.typeDocument.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={handleCheckboxChange} />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los términos y condiciones
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Al registrarte, aceptas nuestros{" "}
                      <Link href="/terms" className="text-red-600 hover:text-red-700 underline">
                        términos de servicio
                      </Link>{" "}
                      y{" "}
                      <Link href="/politic" className="text-red-600 hover:text-red-700 underline">
                        política de privacidad
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Anterior
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Volver al login
              </Button>
            </Link>
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              Siguiente <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!formData.acceptTerms || !formData.documentValidated}
              className="bg-red-600 hover:bg-red-700"
            >
              Completar registro
            </Button>
          )}
        </div>

        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-red-600 hover:text-red-700">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  )
}

function ValidatorCurp({ handleChangeValidatedDocument, handleChangeCurp, curp }: { curp: string; handleChangeCurp: (value: string) => void; handleChangeValidatedDocument: (value: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="space-y-2">
      <Label>Introduce tu CURP</Label>
      <Input
        id="curp"
        name="curp"
        placeholder="CURP"
        value={curp}
        onChange={async (e) => {
          if (isLoading) return

          handleChangeCurp(e.target.value.toUpperCase())
          handleChangeValidatedDocument(false)

          if (e.target.value.length >= 18) {
            setIsLoading(true)
            try {
              const response = await validateCurp({ curp: e.target.value.toUpperCase() })
              const succesfully = response.data.citizen.status

              handleChangeValidatedDocument(succesfully)

              toast.success("CURP validado correctamente")
            } catch (error) {
              console.log(error)
              toast.error("Error al validar el CURP")
              handleChangeValidatedDocument(false)
            }
            setIsLoading(false)
          }
        }}
        required
      />
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </div>
  )
}

// function ValidatorID() {
//   // const [isValidating, setIsValidating] = useState(false)
//   const [, setFormData] = useState<{
//     frontIne: string,
//     ineSelfie: string
//   }>({
//     frontIne: "",
//     ineSelfie: ""
//   })

//   const documentIne = useRef<HTMLInputElement>(null)
//   const selfieIne = useRef<HTMLInputElement>(null)

//   return (
//     <>
//       <div className="space-y-2">
//         <Label>Sube una foto de tu INE (frontal)</Label>
//         <div
//           onClick={() => documentIne.current && documentIne.current.click()}
//           className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
//         >
//           <Upload className="h-10 w-10 text-gray-400" />
//           <p className="mt-2 text-sm text-gray-500">Haz clic para subir o arrastra y suelta</p>
//           <p className="text-xs text-gray-400">PNG, JPG o PDF (máx. 5MB)</p>
//         </div>
//         <Input
//           id="ineFrontal"
//           name="ineFrontal"
//           type="file"
//           ref={documentIne}
//           multiple={false}
//           className="hidden"
//           accept="image/*"
//           capture
//           onChange={(e) => {
//             if (e.target.files) {
//               const file = e.target.files[0]
//               if (file) {
//                 const reader = new FileReader();

//                 reader.onload = function (e) {
//                   const base64Ine = e.target?.result || "";
//                   setFormData(prevState => ({ ...prevState, frontIne: base64Ine.toString() }))
//                 };

//                 reader.readAsDataURL(file);
//               }
//             }
//           }}
//         />
//       </div>

//       <div className="space-y-2">
//         <Label>Sube una foto de tu rostro (selfie)</Label>
//         <div
//           onClick={() => selfieIne.current && selfieIne.current.click()}
//           className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
//         >
//           <Upload className="h-10 w-10 text-gray-400" />
//           <p className="mt-2 text-sm text-gray-500">Haz clic para subir o arrastra y suelta</p>
//           <p className="text-xs text-gray-400">PNG o JPG (máx. 5MB)</p>
//         </div>
//         <Input
//           id="ineSelfie"
//           name="ineSelfie"
//           type="file"
//           ref={selfieIne}
//           multiple={false}
//           className="hidden"
//           accept="image/*"
//           capture
//           onChange={(e) => {
//             if (e.target.files) {
//               const file = e.target.files[0]
//               if (file) {
//                 const reader = new FileReader();

//                 reader.onload = function (e) {
//                   const base64Ine = e.target?.result || "";
//                   setFormData(prevState => ({ ...prevState, ineSelfie: base64Ine.toString() }))
//                 };

//                 reader.readAsDataURL(file);
//               }
//             }
//           }}
//         />

//       </div>
//     </>
//   )
// }