import { title } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Lock, Shield, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PublicHome() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">
              <Shield className="mr-1 h-4 w-4" />
              <span>Plataforma Financiera Segura</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span className={title({ color: "red", className: "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl" })}>Red X</span> Segura: Protegiendo tu futuro financiero
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Plataforma financiera líder en seguridad y confiabilidad. Gestiona tus inversiones, transacciones y
                ahorros con la máxima protección del mercado.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className={`bg-[#f64f6d] hover:bg-[#df2244]`} asChild>
                <Link href={"/auth/login"}>
                Comenzar ahora
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Lock className="mr-1 h-4 w-4 text-blue-600" />
                <span>100% Seguro</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src="/logo.webp"
                alt="Red X Segura - Plataforma financiera"
                width={500}
                height={500}
                className="mx-auto rounded-lg shadow-xl"
                priority
              />
              <div className="absolute -top-6 -right-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-blue-500 p-2">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Seguridad</p>
                    <p className="text-xl font-bold text-blue-600">100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-6 border-t border-gray-200 pt-10 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold">Máxima Seguridad</h3>
            <p className="text-sm text-gray-500">
              Protección de datos avanzada y transacciones encriptadas de extremo a extremo.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="rounded-full bg-blue-100 p-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold">Inversiones Inteligentes</h3>
            <p className="text-sm text-gray-500">
              Algoritmos avanzados para maximizar tus ganancias con riesgos controlados.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold">Acceso Controlado</h3>
            <p className="text-sm text-gray-500">
              Autenticación de múltiples factores y monitoreo constante de actividades.
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full h-[calc(100vh-100px)]">
    //   <main className="max-w-2xl mx-auto mt-16 md:mt-36 lg:mt-40 px-6">
    //     <div className="text-center ">
    //       <span className={title({ color: "red" })}>Red X&nbsp;</span>
    //       <span className={title()}>Segura&nbsp;</span>
    //       <br />
    //       <span className={title({ size: "sm", className: "hidden md:block" })}>
    //         Seguro de ingresos potenciado con IA
    //       </span>
    //       <div className={"mt-4 text-muted-foreground text-pretty text-center text-lg"}>
    //         Red X Segura es una plataforma de inteligencia artificial que te permite evaluar el riesgo de ingresos de tus clientes.
    //       </div>
    //     </div>

    //     <div className="mt-10 flex flex-col md:flex-row gap-x-10 gap-y-4 justify-center items-center flex-wrap">
    //       <Button asChild size={"lg"} className="w-full md:w-auto">
    //         <Link href={"/auth/login"}>
    //           Inicia Sesión
    //         </Link>
    //       </Button>
    //       <Button variant={"ghost"} size={"lg"} className="w-full md:w-auto" asChild>
    //         <Link href={"/auth/signup"}>
    //           Registrate
    //         </Link>
    //       </Button>
    //     </div>
    //   </main>
    // </div>
  );
}