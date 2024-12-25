SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `wp1_forms`;
CREATE TABLE `wp1_forms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `api_name` varchar(255) NOT NULL,
  `settings` text NOT NULL,
  `email_to` varchar(255) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `wp1_forms_data`;
CREATE TABLE `wp1_forms_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `form_id` bigint(20) DEFAULT NULL,
  `form_title` varchar(255) NOT NULL,
  `form_position` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `utm` text NOT NULL,
  `send_email_uuid` varchar(255) NOT NULL,
  `send_email_code` tinyint(4) NOT NULL DEFAULT 0,
  `send_email_error` varchar(255) NOT NULL,
  `spam` tinyint(4) NOT NULL DEFAULT 0,
  `gmtime_add` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `form_id` (`form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `wp1_forms_ip`;
CREATE TABLE `wp1_forms_ip` (
  `ip` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `count` int(11) NOT NULL,
  `last` int(11) NOT NULL,
  PRIMARY KEY (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
