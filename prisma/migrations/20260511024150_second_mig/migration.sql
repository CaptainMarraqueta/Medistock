/*
  Warnings:

  - You are about to drop the column `validada` on the `Receta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigoBarra]` on the table `Medicamento` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "medicamentoNombre" TEXT,
ADD COLUMN     "subtotal" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Medicamento" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "codigoBarra" TEXT,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "offerPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stockTotal" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MovimientoStock" ADD COLUMN     "usuarioId" INTEGER;

-- AlterTable
ALTER TABLE "Receta" DROP COLUMN "validada",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'pendiente';

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "descuento" DOUBLE PRECISION,
ADD COLUMN     "subtotal" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Lote_fechaVencimiento_idx" ON "Lote"("fechaVencimiento");

-- CreateIndex
CREATE UNIQUE INDEX "Medicamento_codigoBarra_key" ON "Medicamento"("codigoBarra");

-- CreateIndex
CREATE INDEX "Medicamento_nombre_idx" ON "Medicamento"("nombre");

-- CreateIndex
CREATE INDEX "Medicamento_marca_idx" ON "Medicamento"("marca");

-- CreateIndex
CREATE INDEX "Venta_createdAt_idx" ON "Venta"("createdAt");
