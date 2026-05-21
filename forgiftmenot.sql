-- ForGiftMeNot cleaned MySQL schema
-- Generated from drawSQL export cleanup

DROP DATABASE IF EXISTS `forgiftmenot`;
CREATE DATABASE `forgiftmenot` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `forgiftmenot`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Gifts`;
DROP TABLE IF EXISTS `UserLists`;
DROP TABLE IF EXISTS `Lists`;
DROP TABLE IF EXISTS `Users`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `Users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_num` VARCHAR(255) NULL,
    `verified` TINYINT(1) NOT NULL DEFAULT 0,
    `admin` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    UNIQUE KEY `users_username_unique` (`username`),
    UNIQUE KEY `users_email_unique` (`email`),
    UNIQUE KEY `users_phone_num_unique` (`phone_num`)
);

CREATE TABLE `Lists` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `owner_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `is_shareable` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    KEY `lists_owner_id_index` (`owner_id`),

    CONSTRAINT `lists_owner_id_foreign`
        FOREIGN KEY (`owner_id`) REFERENCES `Users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `UserLists` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `list_id` INT NOT NULL,
    `role` ENUM('owner', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
    `last_opened_at` DATETIME NULL,
    `pinned_at` DATETIME NULL,
    `archived_at` DATETIME NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    UNIQUE KEY `userlists_user_id_list_id_unique` (`user_id`, `list_id`),
    KEY `userlists_list_id_index` (`list_id`),
    KEY `userlists_recent_index` (`user_id`, `archived_at`, `pinned_at`, `last_opened_at`),

    CONSTRAINT `userlists_user_id_foreign`
        FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT `userlists_list_id_foreign`
        FOREIGN KEY (`list_id`) REFERENCES `Lists` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `Gifts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `list_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NULL,
    `url` VARCHAR(2048) NULL,
    `image_url` VARCHAR(2048) NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `priority` ENUM('low', 'medium', 'high') NULL,
    `reserved_by_user_id` INT NULL,
    `purchased_by_user_id` INT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    KEY `gifts_list_id_index` (`list_id`),
    KEY `gifts_reserved_by_user_id_index` (`reserved_by_user_id`),
    KEY `gifts_purchased_by_user_id_index` (`purchased_by_user_id`),

    CONSTRAINT `gifts_list_id_foreign`
        FOREIGN KEY (`list_id`) REFERENCES `Lists` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT `gifts_reserved_by_user_id_foreign`
        FOREIGN KEY (`reserved_by_user_id`) REFERENCES `Users` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT `gifts_purchased_by_user_id_foreign`
        FOREIGN KEY (`purchased_by_user_id`) REFERENCES `Users` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT `gifts_quantity_check` 
        CHECK (`quantity` > 0)
);


-- =========================================
-- Seed Users
-- Password for all users:
-- $2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy
-- =========================================

INSERT INTO `Users`
(`username`, `password_hash`, `first_name`, `last_name`, `email`, `phone_num`, `verified`, `admin`)
VALUES
('denver', '$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy', 'Denver', 'Smith', 'denver@example.com', '6145551001', 1, 1),
('alice', '$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy', 'Alice', 'Johnson', 'alice@example.com', '6145551002', 1, 0),
('bob', '$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy', 'Bob', 'Williams', 'bob@example.com', '6145551003', 1, 0),
('carol', '$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy', 'Carol', 'Davis', 'carol@example.com', '6145551004', 1, 0);

-- =========================================
-- Seed Lists
-- =========================================

INSERT INTO `Lists`
(`owner_id`, `name`, `description`, `is_shareable`)
VALUES
(1, 'Denver Birthday Wishlist', 'Things Denver wants for birthday', TRUE),
(1, 'Private Tech Upgrades', 'Personal hardware planning', FALSE),
(2, 'Alice Wedding Ideas', 'Wedding registry and ideas', TRUE),
(3, 'Bob Gaming Setup', 'Streaming and gaming gear', TRUE);

-- =========================================
-- Seed UserLists
-- =========================================

INSERT INTO `UserLists`
(`user_id`, `list_id`, `role`, `last_opened_at`, `pinned_at`)
VALUES
-- Denver owns his lists
(1, 1, 'owner', NOW(), NOW()),
(1, 2, 'owner', NOW(), NULL),

-- Alice owns hers
(2, 3, 'owner', NOW(), NULL),

-- Bob owns his
(3, 4, 'owner', NOW(), NULL),

-- Shared access
(2, 1, 'viewer', NOW(), NULL),
(3, 1, 'editor', NOW(), NULL),
(4, 1, 'viewer', NOW(), NULL),

(1, 3, 'editor', NOW(), NULL),
(4, 3, 'viewer', NOW(), NULL),

(1, 4, 'viewer', NOW(), NULL);

-- =========================================
-- Seed Gifts
-- =========================================

INSERT INTO `Gifts`
(`list_id`, `name`, `description`, `price`, `url`, `image_url`, `quantity`, `priority`, `reserved_by_user_id`, `purchased_by_user_id`)
VALUES
(
    1,
    'Sony WH-1000XM5 Headphones',
    'Noise cancelling headphones',
    349.99,
    'https://www.amazon.com/',
    NULL,
    1,
    'high',
    2,
    NULL
),
(
    1,
    'Steam Gift Card',
    'Wallet funds for games',
    50.00,
    NULL,
    NULL,
    2,
    'medium',
    NULL,
    NULL
),
(
    2,
    'RTX 5070',
    'GPU upgrade for gaming PC',
    699.99,
    NULL,
    NULL,
    1,
    'high',
    NULL,
    NULL
),
(
    3,
    'Wedding Venue Decorations',
    'Decor inspiration pieces',
    200.00,
    NULL,
    NULL,
    1,
    'medium',
    1,
    NULL
),
(
    4,
    'Elgato Stream Deck',
    'Streaming control pad',
    149.99,
    NULL,
    NULL,
    1,
    'low',
    NULL,
    NULL
);