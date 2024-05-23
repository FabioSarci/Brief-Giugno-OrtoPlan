-- CreateTable
CREATE TABLE `Pianta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipologia` ENUM('ORTAGGIO', 'FIORE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piantagione` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descrizione` VARCHAR(191) NOT NULL,
    `datacreazione` DATETIME(3) NOT NULL,
    `cap` VARCHAR(191) NOT NULL,
    `idutente` INTEGER NOT NULL,
    `idpianta` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_idutente_fkey` FOREIGN KEY (`idutente`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
