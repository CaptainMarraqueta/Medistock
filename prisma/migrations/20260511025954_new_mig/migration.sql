/*
  Warnings:

  - You are about to drop the column `offerPercentage` on the `Medicamento` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Medicamento` table. All the data in the column will be lost.
  - You are about to drop the column `stockTotal` on the `Medicamento` table. All the data in the column will be lost.
  - The `estado` column on the `Receta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rol` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Venta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metodoPago` column on the `Venta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `medicamentoNombre` on table `DetalleVenta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtotal` on table `DetalleVenta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precioCompra` on table `Lote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precioVenta` on table `Lote` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `tipo` on the `MovimientoStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `descuento` on table `Venta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtotal` on table `Venta` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'CLIENTE', 'VENDEDOR');

-- CreateEnum
CREATE TYPE "EstadoVenta" AS ENUM ('PENDIENTE', 'PAGADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'TARJETA', 'TRANSFERENCIA');

-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('ENTRADA', 'SALIDA', 'AJUSTE', 'VENCIDO');

-- CreateEnum
CREATE TYPE "EstadoReceta" AS ENUM ('PENDIENTE', 'VALIDADA', 'RECHAZADA');

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_ventaId_fkey";

-- DropForeignKey
ALTER TABLE "Lote" DROP CONSTRAINT "Lote_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "MovimientoStock" DROP CONSTRAINT "MovimientoStock_loteId_fkey";

-- AlterTable
ALTER TABLE "DetalleVenta" ALTER COLUMN "medicamentoNombre" SET NOT NULL,
ALTER COLUMN "subtotal" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lote" ALTER COLUMN "precioCompra" SET NOT NULL,
ALTER COLUMN "precioVenta" SET NOT NULL;

-- AlterTable
ALTER TABLE "Medicamento" DROP COLUMN "offerPercentage",
DROP COLUMN "originalPrice",
DROP COLUMN "stockTotal";

-- AlterTable
ALTER TABLE "MovimientoStock" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoMovimiento" NOT NULL;

-- AlterTable
ALTER TABLE "Receta" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoReceta" NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'CLIENTE';

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoVenta" NOT NULL DEFAULT 'PENDIENTE',
DROP COLUMN "metodoPago",
ADD COLUMN     "metodoPago" "MetodoPago",
ALTER COLUMN "descuento" SET NOT NULL,
ALTER COLUMN "descuento" SET DEFAULT 0,
ALTER COLUMN "subtotal" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Medicamento_principioActivo_idx" ON "Medicamento"("principioActivo");

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
