"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  Check,
  Copy,
  Trash2,
  BadgeCheck,
  Inbox,
} from "lucide-react";
import { useSession } from "@/lib/session-context";
import { useState } from "react";

function barraConfianza(confianza: number) {
  if (confianza >= 90) return "bg-success";
  if (confianza >= 70) return "bg-warning";
  return "bg-error";
}

export default function SeccionA() {
  const { datosDetectados, confirmarDato, eliminarDato } = useSession();
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiar = (id: string, valor: string) => {
    navigator.clipboard?.writeText(valor).catch(() => {});
    setCopiado(id);
    setTimeout(() => setCopiado(null), 1200);
  };

  return (
    <section className="flex flex-col bg-surface rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <div>
          <h2 className="font-bold text-ink text-sm">
            Datos Detectados Temporales
          </h2>
          <p className="text-xs text-muted">
            Extraídos de la conversación LSC · Sesión actual
          </p>
        </div>
      </header>

      <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
        {datosDetectados.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 text-muted">
            <Inbox className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">Sin datos detectados aún</p>
            <p className="text-xs mt-1">
              La transcripción LSC irá llenando esta sesión automáticamente.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {datosDetectados.map((dato) => (
              <motion.div
                key={dato.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl border p-3 ${
                  dato.confirmado
                    ? "border-success-200 bg-success-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {dato.confirmado && (
                      <BadgeCheck className="h-4 w-4 text-success shrink-0" />
                    )}
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted truncate">
                      {dato.etiqueta}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copiar(dato.id, dato.valor)}
                      className="rounded-md p-1.5 text-muted hover:bg-white hover:text-ink transition"
                      aria-label="Copiar valor"
                    >
                      {copiado === dato.id ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => eliminarDato(dato.id)}
                      className="rounded-md p-1.5 text-muted hover:bg-white hover:text-error transition"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-1 text-base font-bold text-ink break-words">
                  {dato.valor}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barraConfianza(
                        dato.confianza
                      )}`}
                      style={{ width: `${dato.confianza}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-muted">
                    {dato.confianza}%
                  </span>
                  <button
                    onClick={() => confirmarDato(dato.id)}
                    className={`ml-1 rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                      dato.confirmado
                        ? "bg-success text-white"
                        : "bg-white text-muted border border-slate-200 hover:border-success-400 hover:text-success-600"
                    }`}
                  >
                    {dato.confirmado ? "Confirmado" : "Confirmar"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
