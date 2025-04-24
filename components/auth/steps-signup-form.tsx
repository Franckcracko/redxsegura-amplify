'use client';

import { JSX, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "aws-amplify/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { validateCurp } from "@/lib/verificamex";

interface InputValues {
  value: string,
  required: boolean
}

interface User {
  firstname: InputValues;
  lastname: InputValues;
  birthday: InputValues;
  address: InputValues;
  tel: InputValues;
  curp: InputValues;
  nameRefer: InputValues;
  telRefer: InputValues;
  emailRefer: InputValues;
  email: InputValues;
  password: InputValues;
}

const INITIAL_STATE = {
  lastname: {
    value: '',
    required: true
  },
  firstname: {
    value: '',
    required: true
  },
  birthday: {
    value: '',
    required: true
  },
  address: {
    value: '',
    required: true
  },
  tel: {
    value: '',
    required: true
  },
  curp: {
    value: '',
    required: true
  },
  nameRefer: {
    value: '',
    required: true
  },
  telRefer: {
    value: '',
    required: true
  },
  emailRefer: {
    value: '',
    required: true
  },
  email: {
    value: '',
    required: true
  },
  password: {
    value: '',
    required: true
  }
}

export const StepsSignupForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [user, setUser] = useState<User>(INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeUser = (key: keyof typeof user, value: string) => {
    setUser({
      ...user,
      [key]: value
    })
  }

  const handleSubmit = async () => {
    if (isLoading) return
    setIsLoading(true)

    const userValues = {
      firstname: user.firstname.value,
      lastname: user.lastname.value,
      birthday: user.birthday.value,
      address: user.address.value,
      tel: user.tel.value,
      curp: user.curp.value,
      nameRefer: user.nameRefer.value,
      telRefer: user.telRefer.value,
      emailRefer: user.emailRefer.value,
      email: user.email.value,
      password: user.password.value,
    }

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: userValues.email,
        password: userValues.password,
        options: {
          userAttributes: {
            address: userValues.address,
            email: userValues.email,
            phoneNumber: userValues.tel,
            givenName: userValues.firstname,
            familyName: userValues.lastname,
            birthdate: userValues.birthday
          },
        }
      });

      toast('Usuario creado correctamente')

      setIsLoading(false)

      router.push('/auth/onboarding')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast('Error al crear usuario')
    }
  }

  const Steps: { fields: (keyof User)[]; component: JSX.Element; }[] = [
    {
      fields: ['lastname', 'firstname', 'birthday', 'address', 'tel'],
      component: <PersonalInformation key={'personal'} user={user} handleChangeUser={handleChangeUser} />,
    },
    {
      fields: ['curp'],
      component: <CardId key={'curp'} user={user} handleChangeUser={handleChangeUser} />,
    },
    {
      fields: ['nameRefer', 'telRefer', 'emailRefer'],
      component: <References key={'reference'} user={user} handleChangeUser={handleChangeUser} />,
    },
    {
      fields: ['email', 'password'],
      component: <UserForm key={'user'} user={user} handleChangeUser={handleChangeUser} />
    },
  ]

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      {
        Steps.map((step, index) =>
          currentStep === index + 1 && step.component
        )
      }
      <div className="space-y-2">
        {
          currentStep > 1 && (
            <Button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full"
              variant={"ghost"}
            >
              Anterior
            </Button>
          )
        }
        {
          currentStep < Steps.length && (
            <Button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="w-full"
            >
              Siguiente
            </Button>
          )
        }
        {
          currentStep === Steps.length && (
            <Button
              type="submit"
              className="w-full"
              disabled={
                Object.values(user).some((input) => input.required && !input.value)
                ||
                isLoading
              }
            >
              Registrar
            </Button>
          )
        }
      </div>
      <div className="text-center text-sm">
        Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Inicia sesión
        </Link>
      </div>
    </form>
  )
}

function PersonalInformation({ handleChangeUser, user }: { user: User; handleChangeUser: (key: keyof User, value: string) => void }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-1 text-center">Registrate</h1>
        <p className="text-lg text-gray-500 mb-5 text-center">
          Información basica
          <span className="text-muted-foreground block">Paso 1 de 4</span>
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="firstname">Nombre(s)</Label>
        <Input
          name="firstname"
          type="text"
          value={user.firstname.value}
          onChange={(e) => handleChangeUser('firstname', e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastname">Apellidos</Label>
        <Input
          name="lastname"
          type="text"
          value={user.lastname.value}
          onChange={(e) => handleChangeUser('lastname', e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="birthday">Cumpleaños</Label>
        <Input
          name="birthday"
          type="date"
          onChange={(e) => handleChangeUser('birthday', e.target.value)}
          value={user.birthday.value}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          name="address"
          type="text"
          onChange={(e) => handleChangeUser('address', e.target.value)}
          value={user.address.value}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tel">Numero telefónico</Label>
        <Input
          name="tel"
          type="tel"
          onChange={(e) => handleChangeUser('tel', e.target.value)}
          value={user.tel.value}
          required
        />
      </div>
    </>
  )
}

function CardId({ handleChangeUser, user }: { user: User; handleChangeUser: (key: keyof User, value: string) => void }) {
  const [verifiedCurp, setVerifiedCurp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-1 text-center">Identificación</h1>
        <p className="text-lg text-gray-500 mb-5 text-center">
          Selecciona el metodo para identificar tu cuenta
          <span className="text-muted-foreground block">Paso 2 de 4</span>
        </p>
      </div>
      <Tabs defaultValue="ine">
        <TabsList className="mx-auto">
          <TabsTrigger value="ine">INE</TabsTrigger>
          <TabsTrigger value="curp">CURP</TabsTrigger>
        </TabsList>
        <TabsContent value="ine" className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="ine-front">INE (parte frontal)</Label>
            <Input name="ine-front" type="file" capture accept="image/*" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ine-back">INE (parte trasera)</Label>
            <Input type="file" name="ine-back" capture accept="image/*" />
          </div>
        </TabsContent>
        <TabsContent value="curp">
          <div className="grid gap-2">
            <Label htmlFor="curp">CURP</Label>
            <div className="flex gap-1">
              <Input
                type="text"
                name="curp"
                onChange={async (e) => {
                  setVerifiedCurp(false)

                  handleChangeUser('curp', e.target.value)
                  if (e.target.value.length >= 18) {
                    setIsLoading(true)
                    try {
                      const response = await validateCurp({ curp: e.target.value.toUpperCase() })
                      console.log(JSON.stringify(response.data))
                      setVerifiedCurp(true)
                    } catch (error) {
                      console.log(error)
                      setVerifiedCurp(false)
                    }
                    setIsLoading(false)
                  }
                }}
                value={user.curp.value}
                disabled={isLoading}
              />
              {
                isLoading && (
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                )
              }
            </div>
          </div>
          {
            user.curp.value.length >= 18 && verifiedCurp && (
              <Alert variant={"destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Curp verificado</AlertTitle>
                <AlertDescription>
                  El curp es valido
                </AlertDescription>
              </Alert>
            )
          }
        </TabsContent>
      </Tabs>
    </>
  )
}

function References({ handleChangeUser, user }: { user: User; handleChangeUser: (key: keyof User, value: string) => void }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-1 text-center">Contacto</h1>
        <p className="text-lg text-gray-500 mb-5 text-center">
          Ten en cuenta que podriamos comunicarnos con el contacto que nos proveas
          <span className="text-muted-foreground block">Paso 3 de 4</span>
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name-refer">Nombre del contacto</Label>
        <Input
          name="name-refer"
          type="text"
          onChange={(e) => handleChangeUser('nameRefer', e.target.value)}
          value={user.nameRefer.value}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tel-refer">Numero telefonico</Label>
        <Input
          name="tel-refer"
          type="tel"
          onChange={(e) => handleChangeUser('telRefer', e.target.value)}
          value={user.telRefer.value}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email-refer">Correo electrónico</Label>
        <Input
          name="email-refer"
          type="email"
          onChange={(e) => handleChangeUser('emailRefer', e.target.value)}
          value={user.emailRefer.value}
          required
        />
      </div>

    </>
  )
}

function UserForm({ handleChangeUser, user }: { user: User; handleChangeUser: (key: keyof User, value: string) => void }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-1 text-center">Usuario</h1>
        <p className="text-lg text-gray-500 mb-5 text-center">
          <span className="text-muted-foreground block">Paso 4 de 4</span>
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          name="email"
          type="email"
          placeholder="m@example.com"
          onChange={(e) => handleChangeUser('email', e.target.value)}
          value={user.email.value}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Contraseña</Label>
        <Input
          name="password"
          type="password"
          placeholder="*******"
          onChange={(e) => handleChangeUser('password', e.target.value)}
          value={user.password.value}
          required
        />
      </div>
    </>
  )
}