"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ArrowLeftRight, Warehouse,
  Truck, ShoppingCart, BarChart3, Bell, ClipboardList,
  Users, LogOut,
} from "lucide-react";
import { mockAlerts } from "@/data/mock";

const navLinks = [
  { group: "Principal",  items: [{ href: "/",          label: "Dashboard",   icon: LayoutDashboard }] },
  { group: "Inventario", items: [
    { href: "/productos",   label: "Productos",   icon: Package },
    { href: "/movimientos", label: "Movimientos", icon: ArrowLeftRight },
    { href: "/depositos",   label: "Depósitos",   icon: Warehouse },
  ]},
  { group: "Compras", items: [
    { href: "/proveedores", label: "Proveedores", icon: Truck },
    { href: "/pedidos",     label: "Pedidos",     icon: ShoppingCart },
  ]},
  { group: "Control", items: [
    { href: "/reportes",  label: "Reportes",  icon: BarChart3 },
    { href: "/alertas",   label: "Alertas",   icon: Bell },
    { href: "/auditoria", label: "Auditoría", icon: ClipboardList },
    { href: "/usuarios",  label: "Usuarios",  icon: Users },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const n = mockAlerts.filter((a) => !a.resolved).length;

  return (
    <aside className="mac-sidebar-vibrancy" style={{
      width: "240px",
      display: "flex", flexDirection: "column",
      zIndex: 50,
      position: "relative"
    }}>

      {/* Mac Traffic Lights & Drag Bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "16px 14px", height: "52px"
      }}>
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--sys-red)", border: "1px solid rgba(0,0,0,0.12)" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--sys-yellow)", border: "1px solid rgba(0,0,0,0.12)" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--sys-green)", border: "1px solid rgba(0,0,0,0.12)" }} />
      </div>

      <div style={{ padding: "0 14px", marginBottom: "16px" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--tx-primary)", letterSpacing: "-0.01em" }}>StockPro</p>
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1, overflowY: "auto",
        padding: "0 10px 20px", display: "flex", flexDirection: "column", gap: "16px",
      }}>
        {navLinks.map((group) => (
          <div key={group.group}>
            <p style={{
              padding: "0 10px", marginBottom: "4px",
              fontSize: "11px", fontWeight: 600,
              color: "var(--tx-tertiary)", letterSpacing: "0.01em",
            }}>
              {group.group}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                const showBadge = href === "/alertas" && n > 0;
                
                return (
                  <li key={href}>
                    <Link href={href} className={`mac-nav-item ${active ? "active" : ""}`}>
                      <Icon className="mac-nav-icon" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{label}</span>
                      {showBadge && (
                        <span style={{
                          minWidth: "16px", height: "16px", borderRadius: "8px",
                          background: active ? "#FFF" : "var(--tx-tertiary)",
                          color: active ? "var(--sys-blue)" : "#FFF",
                          fontSize: "10px", fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          padding: "0 5px",
                        }}>
                          {n}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div style={{ padding: "12px 10px" }}>
        <div className="mac-nav-item" style={{ padding: "4px 8px" }}>
           <img 
              src={`https://i.pravatar.cc/150?u=admin`} 
              alt="User" 
              style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.1)" }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--tx-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Admin Sistema
              </p>
            </div>
        </div>
      </div>
    </aside>
  );
}
