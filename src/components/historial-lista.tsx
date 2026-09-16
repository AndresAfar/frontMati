"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Hand,
  Keyboard,
  MessageSquareText,
  Mic,
  MousePointerClick,
  History,
} from "lucide-react";
import { useSession, type Evento } from "@/lib/session-context";

export function formatoHora(ts: number) {
  return new Date(ts).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const metaTipo: Record<
  Evento["tipo"],
  { icon: typeof Hand; etiqueta: string; color: string }
> = {
  seña: { icon: Hand, etiqueta: "Seña detectada", color: "text-success" },
  teclado: { icon: Keyboard, etiqueta: "Teclado", color: "text-primary" },
  texto: { icon: MessageSquareText, etiqueta: "Texto", color: "text-primary-light" },
  voz: { icon: Mic, etiqueta: "Voz", color: "text-warning" },
  boton: {
    icon: MousePointerClick,
    etiqueta: "Botón rápido",
    color: "text-primary-light",
  },
};

export default function HistorialLista({
  maxHeight = "420px",
  vacio,
}: {
  maxHeight?: string;
  vacio?: string;
}) {
  const { historial } = useSession();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [historial.length]);

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto flex flex-col gap-2 p-4"
      style={{ maxHeight }}
    >
      {historial.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 text-muted">
          <History className="h-10 w-10 mb-3" />
          <p className="text-sm font-medium">Aún no hay eventos</p>
          <p className="text-xs mt-1">
            {vacio ??
              "Las señas, botones y mensajes aparecerán aquí."}
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {historial.map((evento) => {
            const meta = metaTipo[evento.tipo];
            const esCajero = evento.origen === "cajero";
            return (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${esCajero ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    esCajero
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-ink"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold opacity-70 mb-0.5">
                    <meta.icon className="h-3 w-3" />
                    <span>{meta.etiqueta}</span>
                    <span>·</span>
                    <span>{formatoHora(evento.timestamp)}</span>
                  </div>
                  <p className="text-sm leading-snug">{evento.texto}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}
