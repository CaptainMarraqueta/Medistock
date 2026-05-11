/*
  Warnings:

  - A unique constraint covering the columns `[codigoInterno]` on the table `Medicamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Medicamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Receta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "precioCompra" DOUBLE PRECISION,
ADD COLUMN     "precioVenta" DOUBLE PRECISION,
ADD COLUMN     "stockMinimo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Medicamento" ADD COLUMN     "codigoInterno" TEXT,
ADD COLUMN     "laboratorio" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Receta" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "metodoPago" TEXT;

-- CreateTable
CREATE TABLE "MovimientoStock" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "motivo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loteId" INTEGER NOT NULL,

    CONSTRAINT "MovimientoStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicamento_codigoInterno_key" ON "Medicamento"("codigoInterno");

-- AddForeignKey
ALTER TABLE "MovimientoStock" ADD CONSTRAINT "MovimientoStock_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
