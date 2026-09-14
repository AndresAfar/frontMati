"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type DatoDetectado = {
  id: string;
  etiqueta: string;
  valor: string;
  confianza: number;
  confirmado: boolean;
};

export type AccionAgente = {
  id: number;
  texto: string;
  video: string;
  timestamp: number;
};

export type Origen = "cliente" | "cajero";
export type TipoEvento = "seña" | "texto" | "voz" | "boton" | "teclado";

export type Evento = {
  id: string;
  timestamp: number;
  origen: Origen;
  tipo: TipoEvento;
  texto: string;
};

type SessionContextValue = {
  accionAgente: AccionAgente | null;
  enviarAccion: (texto: string, tipo?: TipoEvento) => void;
  datosDetectados: DatoDetectado[];
  agregarDato: (dato: Omit<DatoDetectado, "id" | "confirmado">) => void;
  confirmarDato: (id: string) => void;
  eliminarDato: (id: string) => void;
  transcripcionLSC: string;
  setTranscripcionLSC: (texto: string) => void;
  historial: Evento[];
  agregarEvento: (evento: Omit<Evento, "id" | "timestamp">) => void;
  resetearSesion: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

const STORAGE_KEY = "lsc-banco-sesion";

const VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
];

type Stored = {
  accionAgente: AccionAgente | null;
  datosDetectados: DatoDetectado[];
  transcripcionLSC: string;
  historial: Evento[];
};

function cargarEstadoInicial(): Stored {
  if (typeof window === "undefined") {
    return {
      accionAgente: null,
      datosDetectados: [],
      transcripcionLSC: "",
      historial: [],
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Stored;
      return {
        accionAgente: parsed.accionAgente ?? null,
        datosDetectados: parsed.datosDetectados ?? [],
        transcripcionLSC: parsed.transcripcionLSC ?? "",
        historial: parsed.historial ?? [],
      };
    }
  } catch {
    /* ignore */
  }
  return {
    accionAgente: null,
    datosDetectados: [],
    transcripcionLSC: "",
    historial: [],
  };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [accionAgente, setAccionAgente] = useState<AccionAgente | null>(
    () => cargarEstadoInicial().accionAgente
  );
  const [datosDetectados, setDatosDetectados] = useState<DatoDetectado[]>(
    () => cargarEstadoInicial().datosDetectados
  );
  const [transcripcionLSC, setTranscripcionLSC] = useState<string>(
    () => cargarEstadoInicial().transcripcionLSC
  );
  const [historial, setHistorial] = useState<Evento[]>(
    () => cargarEstadoInicial().historial
  );

  useEffect(() => {
    const guardar = () => {
      const payload: Stored = {
        accionAgente,
        datosDetectados,
        transcripcionLSC,
        historial,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    };
    guardar();
  }, [accionAgente, datosDetectados, transcripcionLSC, historial]);

  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue) as Stored;
        setAccionAgente(parsed.accionAgente ?? null);
        setDatosDetectados(parsed.datosDetectados ?? []);
        setTranscripcionLSC(parsed.transcripcionLSC ?? "");
        setHistorial(parsed.historial ?? []);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const agregarEvento = useCallback(
    (evento: Omit<Evento, "id" | "timestamp">) => {
      setHistorial((prev) => [
        ...prev,
        { ...evento, id: crypto.randomUUID(), timestamp: Date.now() },
      ]);
    },
    []
  );

  const enviarAccion = useCallback(
    (texto: string, tipo: TipoEvento = "boton") => {
      const accion: AccionAgente = {
        id: Date.now(),
        texto,
        video: VIDEOS[Math.floor(Math.random() * VIDEOS.length)],
        timestamp: Date.now(),
      };
      setAccionAgente(accion);
      agregarEvento({ origen: "cajero", tipo, texto });
    },
    [agregarEvento]
  );

  const agregarDato = useCallback(
    (dato: Omit<DatoDetectado, "id" | "confirmado">) => {
      setDatosDetectados((prev) => [
        ...prev,
        { ...dato, id: crypto.randomUUID(), confirmado: false },
      ]);
    },
    []
  );

  const confirmarDato = useCallback((id: string) => {
    setDatosDetectados((prev) =>
      prev.map((d) => (d.id === id ? { ...d, confirmado: !d.confirmado } : d))
    );
  }, []);

  const eliminarDato = useCallback((id: string) => {
    setDatosDetectados((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const resetearSesion = useCallback(() => {
    setDatosDetectados([]);
    setTranscripcionLSC("");
    setAccionAgente(null);
    setHistorial([]);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        accionAgente,
        enviarAccion,
        datosDetectados,
        agregarDato,
        confirmarDato,
        eliminarDato,
        transcripcionLSC,
        setTranscripcionLSC,
        historial,
        agregarEvento,
        resetearSesion,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession debe usarse dentro de <SessionProvider>");
  }
  return ctx;
}
