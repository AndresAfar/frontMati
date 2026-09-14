# PROYECTO: Frontend Mockup - LSC Ventanilla Bancaria (Paleta 1: Banco Accesible)

Eres un desarrollador Frontend experto en Next.js (App Router), Tailwind CSS, Framer Motion y Lucide Icons.
Vamos a construir la INTERFAZ MOCKUP INTERACTIVA para un sistema de traducción bidireccional en tiempo real de Lengua de Señas Colombiana (LSC) en ventanilla bancaria.

⚠️ ALCANCE Y ARQUITECTURA: Este sistema es una herramienta externa e independiente para accesibilidad en ventanilla. NO se conecta a bases de datos bancarias, NO almacena datos de clientes ni procesa transacciones financieras reales. Únicamente gestiona el flujo de comunicación y recopila memoria temporal durante la sesión activa.

## ⛔ PROTOCOLO DE EJECUCIÓN
1. Construye el código directamente con Next.js (App Router) y Tailwind CSS.
2. Usaremos estados locales (`useState`) para simular la persistencia de datos compartidos entre la vista del cliente y la del cajero.
3. Entrega al final un resumen de archivos y comandos para probar (`npm run dev`).

## 🎨 SISTEMA DE DISEÑO Y PALETA DE COLORES
- **Header / Marca:** `#0F2C59` (Azul Marino Bancario) -> `bg-[#0F2C59]`
- **Acento / Estado:** `#10B981` (Verde Esmeralda) -> `bg-emerald-500` / `text-emerald-400`
- **Fondo Dark (Tablet Cliente):** `#0F172A` (Azul Noche Dark) -> `bg-slate-900`
- **Fondo Light (Pantalla Cajero):** `#F8FAFC` (Gris Neutro) -> `bg-slate-50`
- **Superficies / Cards:** `#FFFFFF` y `#1E293B`

## 📋 ESPECIFICACIÓN DE VISTAS Y MÓDULOS

### 1. Vista Pantalla del Cajero (`/cajero`) - Aprovechamiento Total de Pantalla
- **NO USAR FORMULARIO TRADICIONAL DE BANCO.**
- **Sección A: Registro de Datos Detectados Temporales (Session Memory Log):**
  - Panel que almacena dinámicamente los chips/tarjetas con la información clave detectada durante la sesión (ej: `[Acción: Retiro]`, `[Monto: $200.000]`, `[Cuenta: Ahorros]`, `[Cédula: Pendiente]`).
  - Botón de copiar/descartar por cada dato extraído. Los datos se borran al reiniciar la sesión.
- **Sección B: Módulo de Comunicación Multimodal del Cajero:**
  - **Botonera / Palabras Clave Rápidas:** Grid de botones directos ("Solicitar Cédula", "Digite Clave", "Confirmar Monto", "Entregar Dinero", "Saldo Insuficiente", "Esperar Momento").
  - **Entrada de Texto Libre (Chat):** Campo para frases personalizadas.
  - **Entrada de Voz (STT):** Botón de micrófono con animación de onda activa.
  - **Acción Unificada:** Cualquiera de las 3 opciones dispara el envío visual hacia la tablet del cliente.
- **Sección C: Visor de Cámara y Transcripción LSC en Tiempo Real.**
- **Sección D: Historial Unificado de la Atención (Chat de Sesión):**
  - Registro cronológico de todos los eventos (señas detectadas, botones presionados, mensajes de voz y texto).

### 2. Vista Tablet Cliente (`/cliente`) - Aprovechamiento de Pantalla Vertical/Horizontal
- **Barra de Selección de Modo (Dual Input):**
  - Toggle o Tabs principales: `[ 🖐️ Dictar por Señas (LSC) ]` vs `[ ⌨️ Escribir por Chat / Teclado ]`.
  - **Modo Señas:** Activa el feed de cámara con indicador *"En Línea - Reconociendo LSC"*.
  - **Modo Chat:** Muestra un teclado táctil grande + botones de respuestas rápidas ("Sí", "No", "Consultar", "Retirar", "Cédula").
- **Área "Lo que Dijiste" (Feedback del Cliente):**
  - Muestra en texto gigante lo que el cliente acaba de expresar por señas o por teclado.
- **Área "Respuesta del Cajero" (Video LSC + Subtítulos):**
  - Reproductor de video HTML5 (usando CDN de prueba en loop) que reproduce la animación LSC de la frase enviada por el cajero.
  - Subtítulo inferior gigante en alto contraste (ej: *"Por favor, dígame o digite su Número de Identificación"*).
- **Historial Unificado de la Atención (Drawer/Panel Lateral):**
  - Panel colapsable para revisar toda la conversación de la cita actual.

### 3. Vista Home / Demo (`/`)
- Panel de selección para navegar fácil entre la vista del `/cliente` y la del `/cajero`.

## EMPECEMOS
Crea los componentes interactivos asegurando que al hacer clic en los botones rápidos del cajero se active la respuesta visual y en video en el módulo.