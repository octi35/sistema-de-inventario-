import { NextResponse } from "next/server";
import { mockMovements } from "@/data/mock";
// import { prisma } from "@/lib/prisma";
// import { movementSchema } from "@/lib/validations";

// GET /api/movements
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type      = searchParams.get("type");
    const depositId = searchParams.get("depositId");
    const productId = searchParams.get("productId");
    const from      = searchParams.get("from");
    const to        = searchParams.get("to");
    const page      = parseInt(searchParams.get("page")     ?? "1");
    const pageSize  = parseInt(searchParams.get("pageSize") ?? "20");

    let movements = [...mockMovements];

    if (type)      movements = movements.filter((m) => m.type === type);
    if (depositId) movements = movements.filter((m) => m.deposit.id === depositId);
    if (productId) movements = movements.filter((m) => m.product.id === productId);
    if (from)      movements = movements.filter((m) => new Date(m.createdAt) >= new Date(from));
    if (to)        movements = movements.filter((m) => new Date(m.createdAt) <= new Date(to));

    const total      = movements.length;
    const totalPages = Math.ceil(total / pageSize);
    const data       = movements.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({ data, total, page, pageSize, totalPages });
  } catch (error) {
    console.error("[GET /api/movements]", error);
    return NextResponse.json({ error: "Error al obtener movimientos" }, { status: 500 });
  }
}

// POST /api/movements
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Validar con Zod + actualizar stock en Prisma transacción
    // const parsed = movementSchema.safeParse(body);
    // if (!parsed.success) {
    //   return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    // }

    // Con Prisma (transacción para actualizar stock):
    // const movement = await prisma.$transaction(async (tx) => {
    //   const mov = await tx.stockMovement.create({ data: parsed.data });
    //   const delta = parsed.data.type === "INGRESO" ? parsed.data.quantity : -parsed.data.quantity;
    //   await tx.product.update({
    //     where: { id: parsed.data.productId },
    //     data: { currentStock: { increment: delta } }
    //   });
    //   return mov;
    // });

    const newMovement = {
      id:        `m-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newMovement, { status: 201 });
  } catch (error) {
    console.error("[POST /api/movements]", error);
    return NextResponse.json({ error: "Error al registrar movimiento" }, { status: 500 });
  }
}
