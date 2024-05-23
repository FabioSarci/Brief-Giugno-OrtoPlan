/*
  Warnings:

  - Added the required column `idpiantagione` to the `Attivita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attivita` ADD COLUMN `idpiantagione` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_cap_fkey` FOREIGN KEY (`cap`) REFERENCES `Comune`(`cap`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attivita` ADD CONSTRAINT `Attivita_idpiantagione_fkey` FOREIGN KEY (`idpiantagione`) REFERENCES `Piantagione`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
