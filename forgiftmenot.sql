CREATE DATABASE IF NOT EXISTS forgiftmenot;
USE forgiftmenot;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	UNIQUE (username),
	UNIQUE (email),
	INDEX (created_at),
	INDEX (updated_at),
	INDEX (username, email)
)ENGINE=InnoDB;