import { NextResponse } from "next/server";
import { mockAlerts, mockProducts } from "@/data/mock";

// GET /api/alerts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get("resolved");

    let alerts = [...mockAlerts];

    if (resolved === "false") alerts = alerts.filter((a) => !a.resolved);
    if (resolved === "true")  alerts = alerts.filter((a) =>  a.resolved);

    // Con Prisma: también se pueden generar alertas automáticas por stock bajo
    // const lowStockProducts = await prisma.product.findMany({
    //   where: { currentStock: { lte: prisma.product.fields.minStock } }
    // });

    return NextResponse.json({ data: alerts, total: alerts.length });
  } catch (error) {
    console.error("[GET /api/alerts]", error);
    return NextResponse.json({ error: "Error al obtener alertas" }, { status: 500 });
  }
}

// PUT /api/alerts — Resolver una alerta o configurar umbral
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Mock: marcar alerta como resuelta
    if (body.action === "resolve" && body.alertId) {
      return NextResponse.json({
        message: `Alerta ${body.alertId} resuelta`,
        resolvedAt: new Date().toISOString(),
      });
    }

    // Mock: configurar stock mínimo de un producto
    if (body.action === "setMinStock" && body.productId && body.minStock !== undefined) {
      const product = mockProducts.find((p) => p.id === body.productId);
      if (!product) {
        return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
      }
      return NextResponse.json({
        message: `Stock mínimo de "${product.name}" actualizado a ${body.minStock}`,
      });
    }

    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
  } catch (error) {
    console.error("[PUT /api/alerts]", error);
    return NextResponse.json({ error: "Error al actualizar alerta" }, { status: 500 });
  }
}
