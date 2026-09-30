"use client";

import Link from "next/link";
import {
  MonitorSmartphone,
  Banknote,
  ArrowRight,
  Palette,
} from "lucide-react";

const demos = [
  {
    href: "/cliente",
    icon: MonitorSmartphone,
    title: "Tablet Cliente",
    subtitle: "Dictado por señas o chat táctil",
    description:
      "Modo dual (señas LSC / teclado), feedback gigante, avatar intérprete y historial colapsable.",
    accent: "success",
  },
  {
    href: "/cajero",
    icon: Banknote,
    title: "Pantalla Cajero",
    subtitle: "Estación de atención multimodal",
    description:
      "Datos detectados, botones rápidos, voz/texto, feed LSC en vivo e historial unificado de sesión.",
    accent: "primary",
  },
  {
    href: "/ui",
    icon: Palette,
    title: "Guía de Estilos",
    subtitle: "Paleta y componentes",
    description:
      "Referencia visual de colores, tipografía, botones, alertas, formularios y componentes del sistema.",
    accent: "warning",
  },
];

const acentoFondo: Record<string, string> = {
  success: "bg-success text-white",
  primary: "bg-primary text-white",
  warning: "bg-warning text-white",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <header className="w-full bg-primary text-white">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-blanco.png"
              alt="Logo Banco Contigo"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold leading-tight">Banco Contigo</h1>
              <p className="text-xs text-primary-100">
                Atención accesible en LSC
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-success-500/20 px-3 py-1 text-xs font-semibold text-success-300">
            <span className="h-2 w-2 rounded-full bg-success-400 animate-pulse" />
            Demo Interactiva
          </span>
        </div>
      </header>

      <section className="flex-1 mx-auto max-w-5xl w-full px-6 py-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Sistema de Atención Bancaria con{" "}
            <span className="text-primary">Lengua de Señas Colombiana</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Selecciona una vista para explorar el mockup interactivo del flujo
            de atención accesible entre el cliente y el cajero.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface p-7 transition hover:border-primary-300 hover:shadow-lg"
            >
              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 ${acentoFondo[d.accent]}`}
              >
                <d.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-ink">{d.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {d.subtitle}
              </p>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {d.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Abrir vista
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-6 flex flex-col items-center gap-2 text-center text-xs text-muted">
        <img
          src="/logo-azul.png"
          alt="Logo Banco Contigo"
          className="h-8 w-auto"
        />
        Mockup visual — Banco Accesible · LSC
      </footer>
    </main>
  );
}
