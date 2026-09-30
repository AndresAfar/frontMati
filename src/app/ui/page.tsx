import Link from "next/link";
import {
  ArrowLeft,
  Palette,
  Info,
  Check,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mic,
  Send,
  Radio,
  Volume2,
  Languages,
  Hand,
  Trash2,
  Copy,
  Zap,
  History,
  Search,
  Keyboard,
  MousePointerClick,
  MessageSquareText,
} from "lucide-react";

const coloresMarca = [
  { hex: "#1d457d", nombre: "Azul", uso: "Color 1 · Primary" },
  { hex: "#41b5c2", nombre: "Teal", uso: "Color 2 · Primary light / Success" },
  { hex: "#f8bb00", nombre: "Amarillo", uso: "Color 3 · Warning" },
  { hex: "#f69900", nombre: "Naranja", uso: "Color 4 · Error" },
];

const neutros = [
  { hex: "#0d203b", nombre: "Dark", uso: "Superficies oscuras (video)" },
  { hex: "#F5F7FA", nombre: "Background", uso: "Fondo de página" },
  { hex: "#FFFFFF", nombre: "Surface", uso: "Tarjetas / superficies" },
  { hex: "#1F2937", nombre: "Ink", uso: "Texto principal" },
  { hex: "#64748B", nombre: "Muted", uso: "Texto secundario" },
];

function Section({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-ink">{titulo}</h2>
        {descripcion && <p className="text-sm text-muted mt-1">{descripcion}</p>}
      </div>
      {children}
    </section>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted break-words">
      {children}
    </p>
  );
}

function Demo({
  children,
  spec,
}: {
  children: React.ReactNode;
  spec?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-surface p-4">
      {children}
      {spec && <Spec>{spec}</Spec>}
    </div>
  );
}

export default function UiPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <header className="bg-primary text-white px-5 py-4 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg p-2 text-white/90 hover:bg-white/10 transition"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary-light" />
          <span className="font-bold">Guía de Estilos</span>
        </div>
        <span className="ml-auto hidden sm:inline-flex items-center gap-2 rounded-full bg-success-500/20 px-3 py-1 text-xs font-semibold text-success-300">
          Design System
        </span>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 flex flex-col gap-12">
        {/* Paleta de colores */}
        <Section
          titulo="Paleta de colores"
          descripcion="Colores de marca y tokens semánticos usados en toda la aplicación."
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {coloresMarca.map((c) => (
              <div key={c.hex} className="flex flex-col gap-2">
                <div
                  className="h-16 rounded-xl"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{c.nombre}</p>
                  <p className="font-mono text-xs text-muted">{c.hex}</p>
                  <p className="text-xs text-muted">{c.uso}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {neutros.map((c) => (
              <div key={c.hex} className="flex flex-col gap-2">
                <div
                  className="h-16 rounded-xl border border-slate-200"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{c.nombre}</p>
                  <p className="font-mono text-xs text-muted">{c.hex}</p>
                  <p className="text-xs text-muted">{c.uso}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tipografía */}
        <Section
          titulo="Tipografía"
          descripcion="Escala de textos y jerarquías usadas en las vistas."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Demo spec="text-4xl sm:text-5xl font-extrabold">
              <p className="text-4xl font-extrabold text-ink">Título grande</p>
            </Demo>
            <Demo spec="text-2xl sm:text-3xl font-extrabold">
              <p className="text-2xl font-extrabold text-ink">Título medio</p>
            </Demo>
            <Demo spec="text-xl font-bold">
              <p className="text-xl font-bold text-ink">Título pequeño</p>
            </Demo>
            <Demo spec="text-base text-ink">
              <p className="text-base text-ink">
                Texto de cuerpo con información principal de la vista.
              </p>
            </Demo>
            <Demo spec="text-sm text-muted">
              <p className="text-sm text-muted">
                Texto secundario, descripciones y apoyos.
              </p>
            </Demo>
            <Demo spec="font-mono text-xs text-muted">
              <p className="font-mono text-xs text-muted">
                #1d457d · etiquetas de código
              </p>
            </Demo>
          </div>
        </Section>

        {/* Botones */}
        <Section
          titulo="Botones"
          descripcion="Estados principales, secundarios y de acción."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Demo spec="bg-primary text-white hover:bg-primary-600">
              <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-600 transition">
                Botón primario
              </button>
            </Demo>
            <Demo spec="bg-success text-white">
              <button className="rounded-lg bg-success px-4 py-2.5 text-sm font-bold text-white transition">
                Botón success
              </button>
            </Demo>
            <Demo spec="bg-warning text-white">
              <button className="rounded-lg bg-warning px-4 py-2.5 text-sm font-bold text-white transition">
                Botón warning
              </button>
            </Demo>
            <Demo spec="bg-error text-white">
              <button className="rounded-lg bg-error px-4 py-2.5 text-sm font-bold text-white transition">
                Botón error
              </button>
            </Demo>
            <Demo spec="bg-white border border-slate-200 text-ink">
              <button className="rounded-lg bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-slate-100">
                Botón outline
              </button>
            </Demo>
            <Demo spec="text-primary hover:bg-primary-50">
              <button className="rounded-lg px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary-50">
                Botón ghost
              </button>
            </Demo>
            <Demo spec="bg-primary text-white opacity-40 (disabled)">
              <button
                disabled
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white opacity-40"
              >
                Botón deshabilitado
              </button>
            </Demo>
            <Demo spec="bg-primary text-white rounded-full h-14 w-14">
              <button className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center transition hover:bg-primary-600">
                <Mic className="h-5 w-5" />
              </button>
            </Demo>
            <Demo spec="bg-primary text-white (con ícono)">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-600 transition">
                <Send className="h-4 w-4" />
                Enviar
              </button>
            </Demo>
          </div>
        </Section>

        {/* Alertas */}
        <Section
          titulo="Alertas"
          descripcion="Mensajes de estado: éxito, advertencia, error e información."
        >
          <div className="flex flex-col gap-3">
            <Demo spec="bg-success-50 border-success-200 text-success-700">
              <div className="flex items-center gap-2 rounded-lg bg-success-50 border border-success-200 px-3 py-2.5 text-sm text-success-700">
                <CheckCircle2 className="h-4 w-4" />
                Su transacción fue exitosa. Puede retirar su dinero.
              </div>
            </Demo>
            <Demo spec="bg-warning-50 border-warning-200 text-warning-700">
              <div className="flex items-center gap-2 rounded-lg bg-warning-50 border border-warning-200 px-3 py-2.5 text-sm text-warning-700">
                <AlertTriangle className="h-4 w-4" />
                Su saldo es insuficiente para esta transacción.
              </div>
            </Demo>
            <Demo spec="bg-error-50 border-error-200 text-error-700">
              <div className="flex items-center gap-2 rounded-lg bg-error-50 border border-error-200 px-3 py-2.5 text-sm text-error-700">
                <XCircle className="h-4 w-4" />
                Ocurrió un error al procesar la solicitud.
              </div>
            </Demo>
            <Demo spec="bg-primary-50 border-primary-200 text-primary-700">
              <div className="flex items-center gap-2 rounded-lg bg-primary-50 border border-primary-200 px-3 py-2.5 text-sm text-primary-700">
                <Info className="h-4 w-4" />
                Un momento por favor, estoy procesando su solicitud.
              </div>
            </Demo>
          </div>
        </Section>

        {/* Badges, chips y spans */}
        <Section
          titulo="Badges, chips y spans"
          descripcion="Indicadores de estado y etiquetas compactas."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Demo spec="bg-success-500/20 text-success-300 (sobre oscuro)">
              <div className="rounded-xl bg-dark p-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-success-500/20 px-3 py-1.5 text-xs font-semibold text-success-300">
                  <Radio className="h-3.5 w-3.5 text-success-400 animate-pulse" />
                  En Línea — Reconociendo LSC
                </span>
              </div>
            </Demo>
            <Demo spec="bg-primary text-white (chip de acción)">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white">
                  Retirar
                </span>
                <span className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white">
                  Consultar
                </span>
                <span className="rounded-lg bg-success px-3 py-2 text-sm font-bold text-white">
                  Confirmado
                </span>
              </div>
            </Demo>
            <Demo spec="text-success / text-warning / text-primary-light (meta)">
              <div className="flex flex-wrap gap-3 text-xs font-semibold">
                <span className="text-success">Seña detectada</span>
                <span className="text-warning">Voz</span>
                <span className="text-primary">Teclado</span>
                <span className="text-primary-light">Texto</span>
              </div>
            </Demo>
            <Demo spec="badge de cabecera (estado)">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-success-500/20 px-3 py-1 text-xs font-semibold text-success-300">
                  <span className="h-2 w-2 rounded-full bg-success-400 animate-pulse" />
                  Estación Cajero
                </span>
              </div>
            </Demo>
          </div>
        </Section>

        {/* Formularios */}
        <Section
          titulo="Formularios"
          descripcion="Campos de texto y entrada de datos."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Demo spec="border-slate-300 focus:ring-2 focus:ring-primary">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escriba una frase para el cliente..."
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="rounded-lg bg-primary px-3 py-2.5 text-white hover:bg-primary-600 transition">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </Demo>
            <Demo spec="input con búsqueda">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </Demo>
            <Demo spec="input deshabilitado">
              <input
                type="text"
                disabled
                placeholder="Campo deshabilitado"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-muted"
              />
            </Demo>
            <Demo spec="área de escritura (chat)">
              <div className="rounded-xl bg-background border border-slate-200 px-4 py-3 min-h-[52px]">
                <p className="text-2xl font-bold text-ink">
                  HOLA. NECESITO REALIZAR
                  <span className="inline-block w-1 h-6 ml-0.5 bg-primary animate-pulse align-middle" />
                </p>
              </div>
            </Demo>
          </div>
        </Section>

        {/* Superficies / tarjetas */}
        <Section
          titulo="Superficies y tarjetas"
          descripcion="Contenedores principales de contenido."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Demo spec="bg-surface border border-slate-200 shadow-sm rounded-2xl">
              <div className="rounded-2xl border border-slate-200 bg-surface shadow-sm overflow-hidden">
                <header className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-bold text-ink text-sm">
                      Historial Unificado
                    </h3>
                    <p className="text-xs text-muted">
                      Registro cronológico de la sesión
                    </p>
                  </div>
                </header>
                <div className="p-4 text-sm text-muted">
                  Contenido de la tarjeta...
                </div>
              </div>
            </Demo>
            <Demo spec="bg-dark rounded-2xl (superficie oscura)">
              <div className="rounded-2xl bg-dark aspect-video flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <Hand className="h-14 w-14 mx-auto mb-2 text-slate-500" />
                  <p className="text-sm">Señando frente a la cámara</p>
                </div>
              </div>
            </Demo>
          </div>
        </Section>

        {/* Componentes varios */}
        <Section
          titulo="Componentes varios"
          descripcion="Barras de confianza, burbujas de chat, selector de modo y estado vacío."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Demo spec="barra de confianza: bg-success / bg-warning / bg-error">
              <div className="flex flex-col gap-3">
                {[
                  { v: 98, c: "bg-success" },
                  { v: 80, c: "bg-warning" },
                  { v: 40, c: "bg-error" },
                ].map((b) => (
                  <div key={b.v} className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${b.c}`}
                        style={{ width: `${b.v}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-muted">
                      {b.v}%
                    </span>
                  </div>
                ))}
              </div>
            </Demo>

            <Demo spec="burbujas de chat: cajero / cliente">
              <div className="flex flex-col gap-2">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl px-3 py-2 bg-primary text-white">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold opacity-70 mb-0.5">
                      <MousePointerClick className="h-3 w-3" />
                      Botón rápido · 10:21:04
                    </div>
                    <p className="text-sm leading-snug">
                      Por favor, dígame su Número de Identificación.
                    </p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl px-3 py-2 bg-slate-100 text-ink">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold opacity-70 mb-0.5">
                      <MessageSquareText className="h-3 w-3" />
                      Teclado · 10:20:58
                    </div>
                    <p className="text-sm leading-snug">HOLA. NECESITO RETIRAR</p>
                  </div>
                </div>
              </div>
            </Demo>

            <Demo spec="selector de modo (segmentado)">
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface p-1 border border-slate-200">
                <button className="relative flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-lg font-bold bg-primary text-white">
                  <Hand className="h-5 w-5" />
                  Dictar por Señas
                </button>
                <button className="relative flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-lg font-bold text-muted">
                  <Keyboard className="h-5 w-5" />
                  Escribir por Chat
                </button>
              </div>
            </Demo>

            <Demo spec="estado vacío">
              <div className="flex flex-col items-center justify-center text-center py-10 text-muted">
                <Volume2 className="h-10 w-10 mb-3 text-slate-300" />
                <p className="text-sm font-medium">
                  Esperando respuesta del agente...
                </p>
              </div>
            </Demo>

            <Demo spec="tecla de teclado (input táctil)">
              <div className="flex gap-1.5">
                {["1", "2", "3"].map((k) => (
                  <button
                    key={k}
                    className="flex-1 max-w-[52px] rounded-lg bg-white border border-slate-200 py-3.5 text-xl font-bold text-ink hover:bg-slate-100 transition"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </Demo>

            <Demo spec="acciones de ícono (copiar / eliminar)">
              <div className="flex items-center gap-2">
                <button className="rounded-md p-1.5 text-muted hover:bg-slate-100 hover:text-ink transition">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="rounded-md p-1.5 text-muted hover:bg-slate-100 hover:text-error transition">
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="rounded-md p-1.5 text-muted hover:bg-slate-100 hover:text-success transition">
                  <Check className="h-4 w-4" />
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                  <Zap className="h-3.5 w-3.5 text-success" />
                  Palabras clave rápidas
                </span>
              </div>
            </Demo>
          </div>
        </Section>
      </div>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-muted">
        Guía de estilos — Banco Accesible · Design System
      </footer>
    </main>
  );
}
