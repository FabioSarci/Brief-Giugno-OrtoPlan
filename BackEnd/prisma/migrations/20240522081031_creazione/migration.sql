/*
  Warnings:

  - The values [ORTAGGIO,FIORE] on the enum `Pianta_tipologia` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `stagione_raccolto` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stagione_semina` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperatura_ottimale` to the `Pianta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pianta` ADD COLUMN `stagione_raccolto` ENUM('Autunno', 'Inverno', 'Primavera', 'Estate') NOT NULL,
    ADD COLUMN `stagione_semina` ENUM('Autunno', 'Inverno', 'Primavera', 'Estate') NOT NULL,
    ADD COLUMN `temperatura_ottimale` VARCHAR(191) NOT NULL,
    MODIFY `tipologia` ENUM('Ortaggio', 'Fiore') NOT NULL;

-- CreateTable
CREATE TABLE `Attivita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipologia` ENUM('Semina', 'Irrigazione', 'Concimazione', 'Diserbo', 'Potatura', 'Raccolto') NOT NULL,
    `ripetizione` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comune` (
    `cap` VARCHAR(191) NOT NULL,
    `denominazione` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lon` DOUBLE NOT NULL,

    PRIMARY KEY (`cap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_idpianta_fkey` FOREIGN KEY (`idpianta`) REFERENCES `Pianta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
