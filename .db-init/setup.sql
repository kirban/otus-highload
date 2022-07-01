CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(20),
  `lastName`VARCHAR(20),
  `age` INT(10),
  `gender` VARCHAR(10),
  `city` VARCHAR(10),
  `interests` VARCHAR(255),
  `page` INT,
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `personal_pages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255),
  `userId` INT UNSIGNED NOT NULL,
  PRIMARY KEY `pk_id`(`id`),
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE = InnoDB;