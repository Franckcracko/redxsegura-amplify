import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublicHome() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "red" })}>Red X&nbsp;</span>
        <span className={title()}>Segura&nbsp;</span>
        <br />
        <span className={title()}>
          Seguro de ingresos colaborativo con IA y Blockchain.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Una red financiera para trabajadores informales, con transparencia y
          apoyo comunitario.
        </div>
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href={"/auth/login"}>
            Inicia Sesión
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/auth/signup"}>
            Registrate
          </Link>
        </Button>
      </div>
    </section>
  );
}