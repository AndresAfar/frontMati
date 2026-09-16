"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mic,
  Square,
  Send,
  MessageSquareText,
  Zap,
  Waves,
} from "lucide-react";
import { useSession } from "@/lib/session-context";
import { botonesRapidos } from "@/lib/frases";

const MENSAJE_STT_SIMULADO =
  "Por favor, dígame o digite su Número de Identificación.";

export default function SeccionB() {
  const { enviarAccion } = useSession();
  const [texto, setTexto] = useState("");
  const [escuchando, setEscuchando] = useState(false);
  const [textoVoz, setTextoVoz] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [soportaSTT, setSoportaSTT] = useState(false);

  const reconocimientoRef = useRef<{
    stop: () => void;
    abort: () => void;
  } | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;
    setSoportaSTT(Boolean(SR));
    return () => {
      reconocimientoRef.current?.abort();
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, []);

  const despachar = (frase: string, tipo: "boton" | "texto" | "voz" = "boton") => {
    enviarAccion(frase, tipo);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 2500);
  };

  const simularSTT = () => {
    setEscuchando(true);
    setTextoVoz("");
    let i = 0;
    typingRef.current = setInterval(() => {
      setTextoVoz(MENSAJE_STT_SIMULADO.slice(0, i + 1));
      i += 1;
      if (i >= MENSAJE_STT_SIMULADO.length) {
        if (typingRef.current) clearInterval(typingRef.current);
        setEscuchando(false);
        despachar(MENSAJE_STT_SIMULADO, "voz");
      }
    }, 70);
  };

  const toggleMicrofono = () => {
    if (escuchando) {
      reconocimientoRef.current?.stop();
      if (typingRef.current) clearInterval(typingRef.current);
      setEscuchando(false);
      return;
    }
    if (!soportaSTT) {
      simularSTT();
      return;
    }
    iniciarSTT();
  };

  const iniciarSTT = () => {
    const SR =
      (window as unknown as {
        SpeechRecognition?: new () => {
          lang: string;
          continuous: boolean;
          interimResults: boolean;
          onresult: (e: unknown) => void;
          onend: () => void;
          onerror: () => void;
          start: () => void;
          stop: () => void;
          abort: () => void;
        };
      }).SpeechRecognition ||
      (window as unknown as {
        webkitSpeechRecognition?: new () => {
          lang: string;
          continuous: boolean;
          interimResults: boolean;
          onresult: (e: unknown) => void;
          onend: () => void;
          onerror: () => void;
          start: () => void;
          stop: () => void;
          abort: () => void;
        };
      }).webkitSpeechRecognition;

    if (!SR) return simularSTT();

    const reconocimiento = new SR();
    reconocimiento.lang = "es-CO";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = true;
    reconocimientoRef.current = reconocimiento;

    reconocimiento.onresult = (event: unknown) => {
      const e = event as { results: ArrayLike<ArrayLike<{ transcript: string }>> };
      const transcripto = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setTextoVoz(transcripto);
    };

    reconocimiento.onend = () => {
      setEscuchando(false);
      if (textoVoz) despachar(textoVoz, "voz");
      reconocimientoRef.current = null;
    };

    reconocimiento.onerror = () => {
      setEscuchando(false);
      reconocimientoRef.current = null;
    };

    setEscuchando(true);
    setTextoVoz("");
    reconocimiento.start();
  };

  const enviarTexto = () => {
    const frase = texto.trim();
    if (!frase) return;
    despachar(frase, "texto");
    setTexto("");
  };

  return (
    <section className="flex flex-col bg-surface rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <MessageSquareText className="h-5 w-5 text-primary" />
        <div>
          <h2 className="font-bold text-ink text-sm">
            Comunicación Multimodal
          </h2>
          <p className="text-xs text-muted">
            Voz · Chat · Botones rápidos hacia la tablet del cliente
          </p>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* Botones rápidos */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted mb-2">
            <Zap className="h-3.5 w-3.5 text-success" />
            Palabras clave rápidas
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {botonesRapidos.map((b) => (
              <button
                key={b.etiqueta}
                onClick={() => despachar(b.texto)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-xs font-semibold text-ink transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 active:scale-[0.98]"
              >
                {b.etiqueta}
              </button>
            ))}
          </div>
        </div>

        {/* Voz */}
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMicrofono}
              className={`relative h-14 w-14 rounded-full flex items-center justify-center transition ${
                escuchando
                  ? "bg-success text-white"
                  : "bg-primary text-white hover:bg-primary-600"
              }`}
            >
              {escuchando ? (
                <Square className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              {escuchando ? (
                <div className="flex items-end gap-1 h-6" aria-hidden>
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 bg-success rounded-full"
                      animate={{ height: [6, 24, 10, 22, 6] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-xs font-semibold text-muted">
                  Toque el micrófono para hablar
                </p>
              )}
              <p className="text-[11px] text-muted mt-1 flex items-center gap-1">
                <Waves className="h-3 w-3" />
                {soportaSTT
                  ? "Reconocimiento de voz activo"
                  : "Simulación de voz (demo)"}
              </p>
            </div>
          </div>

          {textoVoz && (
            <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
              <p className="text-sm text-ink">“{textoVoz}”</p>
            </div>
          )}
        </div>

        {/* Chat / texto libre */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted mb-2">
            <MessageSquareText className="h-3.5 w-3.5 text-primary" />
            Frase personalizada
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarTexto()}
              placeholder="Escriba una frase para el cliente..."
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={enviarTexto}
              disabled={!texto.trim()}
              className="rounded-lg bg-primary px-3 py-2.5 text-white hover:bg-primary-600 transition disabled:opacity-40"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {enviado && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg bg-success-50 border border-success-200 px-3 py-2 text-xs text-success-700 flex items-center gap-2"
            >
              <Send className="h-3.5 w-3.5" />
              Acción enviada: el avatar interpreta en la tablet del cliente.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
