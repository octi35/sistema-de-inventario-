import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: { default: "StockPro", template: "%s | StockPro" },
  description: "StockPro funcionando como App Nativa Mac",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* El escritorio virtual de Mac que contiene la aplicación flotante */}
        <div className="mac-desktop">
          
          {/* El contenedor real de la "Ventana Mac" con sombra masiva y border radius */}
          <div className="mac-app-window">
            
            <Sidebar />
            
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              background: "var(--mac-bg)", /* Panel derecho casi blanco solido */
              position: "relative",
              overflow: "hidden"
            }}>
              
              <Header />
              
              <main className="mac-main-content" style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 32px",
                paddingBottom: "40px",
              }}>
                {children}
              </main>

            </div>

          </div>

        </div>
      </body>
    </html>
  );
}
