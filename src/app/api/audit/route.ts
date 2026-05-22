import { NextResponse } from "next/server";
import { mockAuditLogs } from "@/data/mock";

// GET /api/audit
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action   = searchParams.get("action");
    const entity   = searchParams.get("entity");
    const userId   = searchParams.get("userId");
    const from     = searchParams.get("from");
    const to       = searchParams.get("to");
    const page     = parseInt(searchParams.get("page")     ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "20");

    let logs = [...mockAuditLogs];

    if (action) logs = logs.filter((l) => l.action === action);
    if (entity) logs = logs.filter((l) => l.entity === entity);
    if (userId) logs = logs.filter((l) => l.user.id === userId);
    if (from)   logs = logs.filter((l) => new Date(l.createdAt) >= new Date(from));
    if (to)     logs = logs.filter((l) => new Date(l.createdAt) <= new Date(to));

    const total      = logs.length;
    const totalPages = Math.ceil(total / pageSize);
    const data       = logs.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({ data, total, page, pageSize, totalPages });
  } catch (error) {
    console.error("[GET /api/audit]", error);
    return NextResponse.json({ error: "Error al obtener auditoría" }, { status: 500 });
  }
}
