import { NextResponse } from "next/server";
import { mockDashboardStats, mockMovements, mockAlerts } from "@/data/mock";

// GET /api/reports
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? "summary";

    if (type === "summary") {
      return NextResponse.json({
        stats: mockDashboardStats,
        recentMovements: mockMovements.slice(0, 10),
        activeAlerts: mockAlerts.filter((a) => !a.resolved),
      });
    }

    if (type === "movements") {
      const from = searchParams.get("from");
      const to   = searchParams.get("to");
      let movs = [...mockMovements];
      if (from) movs = movs.filter((m) => new Date(m.createdAt) >= new Date(from));
      if (to)   movs = movs.filter((m) => new Date(m.createdAt) <= new Date(to));
      return NextResponse.json({ data: movs, total: movs.length });
    }

    return NextResponse.json({ error: "Tipo de reporte inválido" }, { status: 400 });
  } catch (error) {
    console.error("[GET /api/reports]", error);
    return NextResponse.json({ error: "Error al generar reporte" }, { status: 500 });
  }
}
