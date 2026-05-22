"use client";

import { Search, Plus, Bell, ChevronLeft, ChevronRight, Share } from "lucide-react";

export default function Header() {
  return (
    <header className="mac-topbar-vibrancy" style={{
      height: "52px", /* Toolbar de macOS suele ser más compacta */
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "0 16px",
      position: "relative",
      zIndex: 40,
    }}>
      
      {/* Botones de navegación (Back/Forward) típicos en Mac */}
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <button className="btn-mac-ghost" aria-label="Atrás">
          <ChevronLeft style={{ width: "16px", height: "16px" }} />
        </button>
        <button className="btn-mac-ghost" aria-label="Adelante">
          <ChevronRight style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
      
      {/* Título de la sección en el Toolbar (opcional) */}
      <div style={{ flex: 1, textAlign: "center", paddingRight: "40px" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--tx-primary)", letterSpacing: "-0.01em" }}>
          Inventario
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        
        {/* Input Safari/Finder style */}
        <div style={{ position: "relative", width: "160px" }}>
          <Search style={{
            position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)",
            width: "12px", height: "12px", color: "var(--tx-tertiary)", pointerEvents: "none",
          }} />
          <input
            type="search"
            placeholder="Buscar..."
            className="input-mac"
            style={{ paddingLeft: "22px", height: "26px", fontSize: "12px" }}
          />
        </div>

        {/* Action icons */}
        <button className="btn-mac btn-mac-secondary" aria-label="Nuevo">
          <Plus style={{ width: "14px", height: "14px" }} />
        </button>
        
        <button className="btn-mac btn-mac-secondary" aria-label="Compartir">
          <Share style={{ width: "13px", height: "13px" }} />
        </button>
        
      </div>
    </header>
  );
}
