CREATE DATABASE `base_datos_prueba` ;
USE `base_datos_prueba`;

CREATE TABLE `Favorites` (
  `UserId` int NOT NULL,
  `PokemonId` int NOT NULL,
  `CreationDate` datetime(3) NOT NULL,
  PRIMARY KEY (`PokemonId`,`UserId`),
  KEY `Favorites_UserId_fkey` (`UserId`)
);


CREATE TABLE `Pokemons` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PokemonId` int NOT NULL,
  `UserId` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Games` varchar(191) NOT NULL,
  `Abilities` varchar(191) NOT NULL,
  `UpdatedDate` datetime(3) NOT NULL,
  `CreationDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Pokemons_Id_key` (`Id`),
  UNIQUE KEY `Pokemons_PokemonId_UserId_key` (`PokemonId`,`UserId`),
  KEY `Pokemons_UserId_fkey` (`UserId`)
);


CREATE TABLE `PokemonsType` (
  `PokemonId` int NOT NULL,
  `TypeId` int NOT NULL,
  `CreationDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`PokemonId`,`TypeId`),
  UNIQUE KEY `PokemonsType_PokemonId_TypeId_key` (`PokemonId`,`TypeId`),
  KEY `PokemonsType_TypeId_fkey` (`TypeId`)  
);


CREATE TABLE `Types` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CreationDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Types_Id_key` (`Id`),
  UNIQUE KEY `Types_Name_key` (`Name`)
);


CREATE TABLE `Users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(250) NOT NULL,
  `CreationDate` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Users_Id_key` (`Id`),
  UNIQUE KEY `Users_Email_key` (`Email`)
);

ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_PokemonId_fkey` FOREIGN KEY (`PokemonId`) REFERENCES `Pokemons` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Pokemons` ADD CONSTRAINT `Pokemons_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `PokemonsType` ADD CONSTRAINT `PokemonsType_PokemonId_fkey` FOREIGN KEY (`PokemonId`) REFERENCES `Pokemons` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `PokemonsType` ADD CONSTRAINT `PokemonsType_TypeId_fkey` FOREIGN KEY (`TypeId`) REFERENCES `Types` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;