<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
namespace Runtime\WordPress\Database\Migrations;

use Runtime\ORM\BaseMigration;
use Runtime\ORM\Query;


class Core_2026 extends \Runtime\ORM\BaseMigration
{
	/**
	 * Migration name
	 */
	var $name;
	
	
	/**
	 * Required migrations
	 */
	var $required;
	
	
	/**
	 * List of migrations
	 */
	var $migrations;
	
	
	/**
	 * Up migration
	 */
	var $up;
	
	
	/**
	 * Down migration
	 */
	var $down;
	
	
	/**
	 * Create forms
	 */
	function wp_forms()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("forms");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
					"  `name` varchar(255) NOT NULL,",
					"  `api_name` varchar(255) NOT NULL,",
					"  `settings` text NOT NULL,",
					"  `email_to` varchar(255) NOT NULL,",
					"  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,",
					"  PRIMARY KEY (`id`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("forms");
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/**
	 * Create forms
	 */
	function wp_forms_data()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("forms_data");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
					"  `form_id` bigint(20) DEFAULT NULL,",
					"  `form_title` varchar(255) NOT NULL,",
					"  `metrika_id` varchar(255) NOT NULL,",
					"  `data` text NOT NULL,",
					"  `utm` text NOT NULL,",
					"  `spam` tinyint(4) NOT NULL DEFAULT 0,",
					"  `gmtime_add` datetime NOT NULL,",
					"  PRIMARY KEY (`id`),",
					"  KEY `form_id` (`form_id`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("forms_data");
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/**
	 * Create forms_ip
	 */
	function wp_forms_ip()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("forms_ip");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `ip` varchar(64) NOT NULL,",
					"  `count` int(11) NOT NULL,",
					"  `last` int(11) NOT NULL,",
					"  PRIMARY KEY (`ip`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("forms_ip");
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/**
	 * Create gallery
	 */
	function wp_gallery()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("gallery");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
					"  `api_name` varchar(255) NOT NULL,",
					"  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,",
					"  PRIMARY KEY (`id`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("gallery");
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/**
	 * Create gallery item
	 */
	function wp_gallery_item()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("gallery_item");
				$table_name_gallery = $this->connection->getTableName("gallery");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
					"  `gallery_id` bigint(20) NOT NULL,",
					"  `image_id` bigint(20) NOT NULL,",
					"  `name` varchar(255) NOT NULL,",
					"  `pos` bigint(20) NOT NULL,",
					"  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,",
					"  KEY `pos` (`pos`),",
					"  PRIMARY KEY (`id`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
				));
				$this->comment("Create foreign key " . $table_name . "_id");
				$this->executeSQL(new \Runtime\Vector(
					"ALTER TABLE `" . $table_name . "`",
					"  ADD CONSTRAINT `" . $table_name . "_id`",
					"  FOREIGN KEY (`gallery_id`)",
					"  REFERENCES `" . $table_name_gallery . "`(`id`)",
					"  ON DELETE RESTRICT ON UPDATE CASCADE",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("gallery_item");
				$this->executeSQL(new \Runtime\Vector(
					"ALTER TABLE `" . $table_name . "`",
					"  DROP FOREIGN KEY `" . $table_name . "_id`",
				));
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/**
	 * Create mail_delivery
	 */
	function wp_mail_delivery()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("mail_delivery");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Notify ID',",
					"  `worker` varchar(150) NOT NULL " . "COMMENT 'Worker for delivery message email, etc ..',",
					"  `plan` varchar(150) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'default' " . "COMMENT 'Delivery plan zakaz, billing, etc ...',",
					"  `status` smallint(6) NOT NULL DEFAULT 0 " . "COMMENT 'Delivery status. 0 - Planned, 1 - Delivered, 2 - Process, -1 - Error',",
					"  `dest` longtext NOT NULL COMMENT 'Destination',",
					"  `uuid` varchar(150) DEFAULT NULL COMMENT 'Delivery uuid',",
					"  `title` varchar(255) NOT NULL COMMENT 'Title of the message',",
					"  `message` longtext NOT NULL COMMENT 'Message',",
					"  `gmtime_plan` datetime DEFAULT NULL " . "COMMENT 'Time by UTC when delivery task will be started. " . "If null message must be send immediately',",
					"  `gmtime_send` datetime DEFAULT NULL " . "COMMENT 'Time by UTC when message have been sended',",
					"  `send_email_error` varchar(255) NOT NULL " . "COMMENT 'Delivery error message',",
					"  `send_email_code` int(11) NOT NULL DEFAULT 0 COMMENT 'Delivery error code',",
					"  `gmtime_add` datetime NOT NULL COMMENT 'Time of create record by UTC',",
					"  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Delete message after delivery',",
					"  PRIMARY KEY (`id`),",
					"  UNIQUE KEY `uuid` (`uuid`),",
					"  KEY `worker_plan` (`worker`,`plan`),",
					"  KEY `status` (`status`),",
					"  KEY `gmtime_add` (`gmtime_add`),",
					"  KEY `gmtime_send` (`gmtime_send`),",
					"  KEY `plan` (`plan`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Log of delivered messages'",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("mail_delivery");
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/**
	 * Create mail_settings
	 */
	function wp_mail_settings()
	{
		return new \Runtime\ORM\BaseMigration(new \Runtime\Map([
			"up" => function ()
			{
				$table_name = $this->connection->getTableName("mail_settings");
				$this->comment("Create table " . $table_name);
				$this->executeSQL(new \Runtime\Vector(
					"CREATE TABLE `" . $table_name . "` (",
					"  `id` bigint(20) NOT NULL AUTO_INCREMENT,",
					"  `enable` tinyint(4) NOT NULL,",
					"  `plan` varchar(255) NOT NULL,",
					"  `host` varchar(255) NOT NULL,",
					"  `port` varchar(255) NOT NULL,",
					"  `login` varchar(255) NOT NULL,",
					"  `password` varchar(255) NOT NULL,",
					"  `ssl_enable` tinyint(4) NOT NULL,",
					"  `is_deleted` tinyint(4) NOT NULL,",
					"  PRIMARY KEY (`id`),",
					"  UNIQUE KEY `plan` (`plan`)",
					") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
				));
			},
			"down" => function ()
			{
				$table_name = $this->connection->getTableName("mail_settings");
				$this->executeSQL(new \Runtime\Vector("DROP TABLES `" . $table_name . "`"));
			},
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->name = "core_2026";
		$this->required = new \Runtime\Vector();
		$this->migrations = new \Runtime\Vector(
			"wp_forms",
			"wp_forms_data",
			"wp_forms_ip",
			"wp_gallery",
			"wp_gallery_item",
			"wp_mail_delivery",
			"wp_mail_settings",
		);
		$this->up = null;
		$this->down = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Database.Migrations.Core_2026"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}