"use client";

import { Plus, Settings, User as UserIcon, ShieldAlert } from "lucide-react";

// Mock para usuarios 
const mockUsers = [
  { id: 1, name: "Admin Sistema", email: "admin@inventario.com", role: "Super Admin",   status: "Activo" },
  { id: 2, name: "María González",email: "maria.g@inventario.com",role: "Gerente",      status: "Activo" },
  { id: 3, name: "Carlos Pérez",  email: "c.perez@inventario.com",role: "Operador",     status: "Activo" },
  { id: 4, name: "Lucía Fernández",email:"lucia.f@inventario.com",role: "Auditor",      status: "Inactivo" },
];

export default function UsuariosPage() {
  return (
    <div className="anim-enter" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Header Estilo Mac */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 className="sf-title-lg">Usuarios del Sistema</h1>
          <p style={{ fontSize: "13px", color: "var(--tx-secondary)", marginTop: "4px" }}>
            Gestión de accesos y perfiles
          </p>
        </div>
        <button className="btn-mac btn-mac-primary" style={{ height: "28px" }}>
          <Plus style={{ width: "14px", height: "14px" }} />
          Añadir Usuario
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        
        {/* User Card (Mac Contacts style) */}
        {mockUsers.map(user => {
           const isActive = user.status === "Activo";
           const isSys = user.role === "Super Admin";

           return (
              <div key={user.id} className="widget" style={{ padding: "16px", display: "flex", gap: "16px", alignItems: "center", cursor: "pointer" }}>
                 
                 {/* Avatar */}
                 <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(180deg, #E5E5EA 0%, #D1D1D6 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)", flexShrink: 0 }}>
                    {isSys ? <ShieldAlert style={{ width: "24px", height: "24px", color: "white" }} /> : <UserIcon style={{ width: "24px", height: "24px", color: "white" }} />}
                 </div>
                 
                 {/* Detail */}
                 <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--tx-primary)", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</h4>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isActive ? "var(--sys-green)" : "var(--sys-red)", flexShrink: 0 }} />
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--tx-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                    <div style={{ marginTop: "6px" }}>
                       <span style={{ fontSize: "10px", fontWeight: 600, background: isSys ? "rgba(255,59,48,0.1)" : "rgba(0,122,255,0.1)", color: isSys ? "var(--sys-red)" : "var(--sys-blue)", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>
                          {user.role}
                       </span>
                    </div>
                 </div>

                 {/* Chevron */}
                 <button className="btn-mac-ghost" style={{ padding: "4px" }}>
                    <Settings style={{ width: "14px", height: "14px", color: "var(--tx-tertiary)" }} />
                 </button>

              </div>
           )
        })}
      </div>

    </div>
  );
}
