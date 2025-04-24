"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, ArrowRight, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { confirmSignUp } from "aws-amplify/auth"

export default function VerificationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsEmailValid(emailRegex.test(email))
  }, [email])

  const sendVerificationCode = () => {
    setStep(2)
    setTimeLeft(60)
    setCanResend(false)
    setVerificationResult(null)

    console.log(`Enviando código de verificación a ${email}`)
  }

  const verifyOtp = async (code: string) => {
    setIsVerifying(true)
    try {
      const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (confirmSignUpNextStep.signUpStep === 'DONE') {
        return router.replace("/auth/onboarding")
      }
    } catch (error) {
      console.error("Error al verificar el código:", error)
      setVerificationResult("error")
      setErrorMessage("El código de verificación es incorrecto. Por favor, inténtalo de nuevo.")
    }
    setIsVerifying(false)
  }

  // Reenviar código
  const resendCode = () => {
    setTimeLeft(60)
    setCanResend(false)
    setVerificationResult(null)

    // En un caso real, aquí se enviaría una nueva solicitud al backend
    console.log(`Reenviando código de verificación a ${email}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <Mail className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verificación de cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1
              ? "Ingresa tu correo electrónico para recibir un código de verificación"
              : `Te hemos enviado un código de verificación a ${email}`}
          </p>
        </div>

        <Card className="shadow-md border-0">
          {step === 1 ? (
            <>
              <CardHeader>
                <CardTitle>Verificación por correo</CardTitle>
                <CardDescription>
                  Enviaremos un código de verificación a tu correo electrónico para confirmar tu identidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    autoComplete="email"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={sendVerificationCode}
                  disabled={!isEmailValid}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Enviar código <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Ingresa el código de verificación</CardTitle>
                <CardDescription>Hemos enviado un código de 6 dígitos a tu correo electrónico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Campos para el código OTP */}
                <div>
                  <Label htmlFor="otp-input" className="sr-only">
                    Código OTP
                  </Label>
                  <div className="flex justify-between gap-2">
                    <Input
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="text-center text-xl font-semibold"
                      autoComplete="one-time-code"
                    />
                  </div>
                </div>

                {/* Temporizador y reenvío */}
                <div className="text-center text-sm">
                  {canResend ? (
                    <Button variant="link" onClick={resendCode} className="text-red-600 p-0">
                      Reenviar código
                    </Button>
                  ) : (
                    <p className="text-gray-500">
                      Reenviar código en <span className="font-medium">{timeLeft}</span> segundos
                    </p>
                  )}
                </div>

                {/* Mensajes de resultado */}
                {verificationResult === "success" && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>Verificación exitosa</AlertTitle>
                    <AlertDescription>Tu correo ha sido verificado correctamente.</AlertDescription>
                  </Alert>
                )}

                {verificationResult === "error" && (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertTitle>Error de verificación</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  onClick={() => verifyOtp(code)}
                  disabled={!code || isVerifying || verificationResult === "success"}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Verificando...
                    </>
                  ) : (
                    "Verificar código"
                  )}
                </Button>
                <Button variant="outline" onClick={() => setStep(1)} className="w-full" disabled={isVerifying}>
                  Cambiar correo electrónico
                </Button>
              </CardFooter>
            </>
          )}
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">Red X Segura nunca compartirá tu información con terceros</p>
        </div>
      </div>
    </div>
  )
}
