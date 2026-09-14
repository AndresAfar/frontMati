"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Languages,
  Hand,
  Video,
  Keyboard,
  Volume2,
  History,
  X,
  Delete,
  Send,
  HandMetal,
  Radio,
} from "lucide-react";
import { useSession } from "@/lib/session-context";
import HistorialLista from "@/components/historial-lista";

type Modo = "señas" | "chat";

const FRASE = [
  "HOLA.",
  "NECESITO",
  "REALIZAR",
  "UN",
  "RETIRO",
  "DE",
  "$200.000",
  "DE",
  "MI",
  "CUENTA",
  "DE",
  "AHORROS.",
];

const respuestasRapidas = [
  { texto: "Sí", chip: null },
  { texto: "No", chip: null },
  {
    texto: "Consultar",
    chip: { etiqueta: "Acción", valor: "Consulta", confianza: 99 },
  },
  {
    texto: "Retirar",
    chip: { etiqueta: "Acción", valor: "Retiro", confianza: 99 },
  },
  {
    texto: "Cédula",
    chip: { etiqueta: "Cédula", valor: "Pendiente", confianza: 60 },
  },
] as const;

const filasTeclado = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

let deteccionEjecutada = false;

export default function ClientePage() {
  const {
    accionAgente,
    transcripcionLSC,
    setTranscripcionLSC,
    agregarDato,
    agregarEvento,
    resetearSesion,
  } = useSession();

  const [modo, setModo] = useState<Modo>("señas");
  const [historialAbierto, setHistorialAbierto] = useState(false);
  const [textoChat, setTextoChat] = useState("");

  useEffect(() => {
    if (deteccionEjecutada) return;
    deteccionEjecutada = true;

    resetearSesion();

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    FRASE.forEach((_, idx) => {
      const t = setTimeout(() => {
        const parcial = FRASE.slice(0, idx + 1).join(" ");
        setTranscripcionLSC(parcial);
      }, 400 + idx * 500);
      timeouts.push(t);
    });

    const detectar = (
      ms: number,
      etiqueta: string,
      valor: string,
      confianza: number
    ) => {
      const t = setTimeout(() => {
        agregarDato({ etiqueta, valor, confianza });
      }, ms);
      timeouts.push(t);
    };

    detectar(400 + 4 * 500, "Acción", "Retiro", 98);
    detectar(400 + 6 * 500, "Monto", "$200.000", 95);
    detectar(400 + 9 * 500, "Cuenta", "Ahorros", 92);
    detectar(400 + (FRASE.length - 1) * 500 + 800, "Cédula", "Pendiente", 40);

    const tFinal = setTimeout(() => {
      agregarEvento({
        origen: "cliente",
        tipo: "seña",
        texto: FRASE.join(" "),
      });
    }, 400 + (FRASE.length - 1) * 500 + 800);
    timeouts.push(tFinal);

    return () => timeouts.forEach(clearTimeout);
  }, [agregarDato, agregarEvento, resetearSesion, setTranscripcionLSC]);

  const expresar = (texto: string) => {
    setTranscripcionLSC(texto);
    agregarEvento({ origen: "cliente", tipo: "teclado", texto });
  };

  const tocarRespuesta = (resp: (typeof respuestasRapidas)[number]) => {
    expresar(resp.texto);
    if (resp.chip) agregarDato(resp.chip);
  };

  const enviarTexto = () => {
    const texto = textoChat.trim();
    if (!texto) return;
    expresar(texto);
    setTextoChat("");
  };

  const tocarTecla = (tecla: string) => {
    if (tecla === "del") {
      setTextoChat((p) => p.slice(0, -1));
    } else if (tecla === " ") {
      setTextoChat((p) => p + " ");
    } else {
      setTextoChat((p) => p + tecla);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="bg-[#0F2C59] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-lg p-2 text-slate-200 hover:bg-white/10 transition"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Languages className="h-6 w-6 text-emerald-400" />
            <span className="font-bold">Tablet Cliente</span>
          </div>
        </div>
        <button
          onClick={() => setHistorialAbierto(true)}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/20 transition"
        >
          <History className="h-4 w-4" />
          Historial
        </button>
      </header>

      {/* Selector de modo */}
      <div className="mx-auto w-full max-w-3xl px-4 pt-4">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-800 p-1 border border-slate-700">
          {(
            [
              { id: "señas", icon: HandMetal, label: "Dictar por Señas (LSC)" },
              { id: "chat", icon: Keyboard, label: "Escribir por Chat" },
            ] as const
          ).map((op) => (
            <button
              key={op.id}
              onClick={() => setModo(op.id)}
              className={`relative flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-bold transition ${
                modo === op.id ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {modo === op.id && (
                <motion.span
                  layoutId="modo-activo"
                  className="absolute inset-0 rounded-lg bg-emerald-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <op.icon className="h-5 w-5 relative z-10" />
              <span className="relative z-10">{op.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {modo === "señas" ? (
            <motion.section
              key="señas"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 aspect-video"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <Hand className="h-14 w-14 mx-auto mb-2 text-slate-600" />
                  <p className="text-sm">Realizando señas frente a la cámara</p>
                </div>
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 backdrop-blur">
                <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400">
                  En Línea — Reconociendo LSC
                </span>
              </div>

              <div className="absolute bottom-4 right-4 rounded-lg bg-black/50 px-3 py-1.5 flex items-center gap-2">
                <Video className="h-4 w-4 text-slate-300" />
                <span className="text-xs text-slate-300">CÁMARA FRONTAL</span>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="chat"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-4"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-3">
                <Keyboard className="h-4 w-4" />
                Escribe tu mensaje
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 mb-3 min-h-[52px]">
                <p className="text-lg font-bold text-white break-words">
                  {textoChat || "\u00A0"}
                  <span className="inline-block w-1 h-5 ml-0.5 bg-emerald-400 animate-pulse align-middle" />
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                {respuestasRapidas.map((resp) => (
                  <button
                    key={resp.texto}
                    onClick={() => tocarRespuesta(resp)}
                    className="rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 active:scale-95 transition"
                  >
                    {resp.texto}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                {filasTeclado.map((fila, i) => (
                  <div key={i} className="flex gap-1.5 justify-center">
                    {fila.map((tecla) => (
                      <button
                        key={tecla}
                        onClick={() => tocarTecla(tecla)}
                        className="flex-1 max-w-[44px] rounded-lg bg-slate-700 py-3 text-base font-bold text-white hover:bg-slate-600 active:scale-95 transition"
                      >
                        {tecla}
                      </button>
                    ))}
                  </div>
                ))}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => tocarTecla(" ")}
                    className="flex-1 rounded-lg bg-slate-700 py-3 text-xs font-bold text-white hover:bg-slate-600 active:scale-95 transition"
                  >
                    ESPACIO
                  </button>
                  <button
                    onClick={() => tocarTecla("del")}
                    className="rounded-lg bg-slate-700 px-4 py-3 flex items-center justify-center text-slate-300 hover:bg-slate-600"
                  >
                    <Delete className="h-5 w-5" />
                  </button>
                  <button
                    onClick={enviarTexto}
                    disabled={!textoChat.trim()}
                    className="rounded-lg bg-emerald-500 px-5 py-3 flex items-center justify-center text-white hover:bg-emerald-600 disabled:opacity-40"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Lo que dijiste */}
        <section className="rounded-2xl border border-emerald-500/30 bg-slate-800 p-5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-3">
            <Languages className="h-4 w-4" />
            Lo que dijiste
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white leading-tight break-words">
            {transcripcionLSC || "Aquí aparecerá tu mensaje..."}
          </p>
        </section>

        {/* Respuesta del cajero */}
        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-5 flex-1">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-4">
            <Volume2 className="h-4 w-4 text-emerald-400" />
            Respuesta del Cajero
          </div>

          <AnimatePresence mode="wait">
            {accionAgente ? (
              <motion.div
                key={accionAgente.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 mb-3">
                  <video
                    key={accionAgente.video}
                    className="w-full aspect-video object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={accionAgente.video} type="video/mp4" />
                    Tu navegador no soporta video HTML5.
                  </video>
                </div>
                <div className="flex items-start gap-2">
                  <Hand className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {accionAgente.texto}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vacio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 text-slate-500"
              >
                <Volume2 className="h-10 w-10 mb-3 text-slate-600" />
                <p className="text-sm font-medium">
                  Esperando respuesta del agente...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Drawer de historial */}
      <AnimatePresence>
        {historialAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setHistorialAbierto(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-slate-900 border-l border-slate-700 flex flex-col"
            >
              <header className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-emerald-400" />
                  <h2 className="font-bold text-white">Historial de la Atención</h2>
                </div>
                <button
                  onClick={() => setHistorialAbierto(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <HistorialLista maxHeight="100%" />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
