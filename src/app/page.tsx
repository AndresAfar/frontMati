"use client";

import Link from "next/link";
import {
  MonitorSmartphone,
  Banknote,
  Languages,
  ArrowRight,
} from "lucide-react";

const demos = [
  {
    href: "/cliente",
    icon: MonitorSmartphone,
    title: "Tablet Cliente",
    subtitle: "Dictado por señas o chat táctil",
    description:
      "Modo dual (señas LSC / teclado), feedback gigante, avatar intérprete y historial colapsable.",
    accent: "emerald",
  },
  {
    href: "/cajero",
    icon: Banknote,
    title: "Pantalla Cajero",
    subtitle: "Estación de atención multimodal",
    description:
      "Datos detectados, botones rápidos, voz/texto, feed LSC en vivo e historial unificado de sesión.",
    accent: "navy",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      <header className="w-full bg-[#0F2C59] text-white">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Banco Contigo</h1>
              <p className="text-xs text-slate-300">
                Atención accesible en LSC
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Demo Interactiva
          </span>
        </div>
      </header>

      <section className="flex-1 mx-auto max-w-5xl w-full px-6 py-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sistema de Atención Bancaria con{" "}
            <span className="text-emerald-400">Lengua de Señas Colombiana</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Selecciona una vista para explorar el mockup interactivo del flujo
            de atención accesible entre el cliente y el cajero.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-7 transition hover:border-slate-500 hover:bg-slate-800/70"
            >
              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 ${
                  d.accent === "emerald"
                    ? "bg-emerald-500 text-white"
                    : "bg-[#0F2C59] text-white"
                }`}
              >
                <d.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">{d.title}</h3>
              <p className="mt-1 text-sm font-medium text-emerald-400">
                {d.subtitle}
              </p>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {d.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Abrir vista
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Mockup visual — Banco Accesible · Paleta 1 · LSC
      </footer>
    </main>
  );
}
