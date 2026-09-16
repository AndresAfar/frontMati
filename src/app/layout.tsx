import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/lib/session-context";

export const metadata: Metadata = {
  title: "LSC Banco - Banco Accesible",
  description:
    "Mockup visual e interactivo del sistema de atención bancaria con traducción de Lengua de Señas Colombiana (LSC).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-background text-ink">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
