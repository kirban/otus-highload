CREATE DATABASE IF NOT EXISTS `sessions`;

USE `my_db`;

CREATE TABLE IF NOT EXISTS `personal_pages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255),
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hash` VARCHAR(255),
  `userName` VARCHAR(20),
  `firstName` VARCHAR(20),
  `lastName`VARCHAR(20),
  `age` INT(10),
  `gender` VARCHAR(10),
  `city` VARCHAR(10),
  `interests` VARCHAR(255),
  `pageId` INT UNSIGNED NOT NULL,
  PRIMARY KEY `pk_id`(`id`),
  FOREIGN KEY (pageId) REFERENCES personal_pages(id)
) ENGINE = InnoDB;
