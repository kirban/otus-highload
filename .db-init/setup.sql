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
  `firstName` VARCHAR(70),
  `lastName`VARCHAR(70),
  `age` INT(3),
  `gender` VARCHAR(100),
  `city` VARCHAR(100),
  `interests` VARCHAR(255),
  `pageId` INT UNSIGNED NOT NULL,
  PRIMARY KEY `pk_id`(`id`),
  FOREIGN KEY (pageId) REFERENCES personal_pages(id)
) ENGINE = InnoDB;
