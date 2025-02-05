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
class Core_2025_01 extends \Runtime\ORM\BaseMigration
{
	public $name;
	public $required;
	public $migrations;
	public $up;
	public $down;
	/**
	 * Create forms
	 */
	function wp_forms()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("forms");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `name` varchar(255) NOT NULL,","  `api_name` varchar(255) NOT NULL,","  `settings` text NOT NULL,","  `email_to` varchar(255) NOT NULL,","  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,","  PRIMARY KEY (`id`)",") ENGINE=InnoDB"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("forms");
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/**
	 * Create forms
	 */
	function wp_forms_data()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("forms_data");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `form_id` bigint(20) DEFAULT NULL,","  `form_title` varchar(255) NOT NULL,","  `metrika_id` varchar(255) NOT NULL,","  `data` text NOT NULL,","  `utm` text NOT NULL,","  `spam` tinyint(4) NOT NULL DEFAULT 0,","  `gmtime_add` datetime NOT NULL,","  PRIMARY KEY (`id`),","  KEY `form_id` (`form_id`)",") ENGINE=InnoDB"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("forms_data");
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/**
	 * Create forms_ip
	 */
	function wp_forms_ip()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("forms_ip");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("` ("),"  `ip` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,","  `count` int(11) NOT NULL,","  `last` int(11) NOT NULL,","  PRIMARY KEY (`ip`)",") ENGINE=InnoDB"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("forms_ip");
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/**
	 * Create gallery
	 */
	function wp_gallery()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("gallery");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `api_name` varchar(255) NOT NULL,","  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,","  PRIMARY KEY (`id`)",") ENGINE=InnoDB"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("gallery");
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/**
	 * Create gallery item
	 */
	function wp_gallery_item()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("gallery_item");
			$table_name_gallery = $this->connection->getTableName("gallery");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `gallery_id` bigint(20) NOT NULL,","  `image_id` bigint(20) NOT NULL,","  `name` varchar(255) NOT NULL,","  `pos` bigint(20) NOT NULL,","  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,","  KEY `pos` (`pos`),","  PRIMARY KEY (`id`)",") ENGINE=InnoDB"]));
			$this->comment("Create foreign key " . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("_id"));
			$this->executeSQL(\Runtime\Vector::from(["ALTER TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`"),"  ADD CONSTRAINT `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("_id`"),"  FOREIGN KEY (`gallery_id`)","  REFERENCES `" . \Runtime\rtl::toStr($table_name_gallery) . \Runtime\rtl::toStr("`(`id`)"),"  ON DELETE RESTRICT ON UPDATE CASCADE"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("gallery_item");
			$this->executeSQL(\Runtime\Vector::from(["ALTER TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`"),"  DROP FOREIGN KEY `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("_id`")]));
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/**
	 * Create mail_delivery
	 */
	function wp_mail_delivery()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("mail_delivery");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("` ("),"  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Notify ID',","  `worker` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL " . \Runtime\rtl::toStr("COMMENT 'Worker for delivery message email, etc ..',"),"  `plan` varchar(150) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'default' " . \Runtime\rtl::toStr("COMMENT 'Delivery plan zakaz, billing, etc ...',"),"  `status` smallint(6) NOT NULL DEFAULT 0 " . \Runtime\rtl::toStr("COMMENT 'Delivery status. 0 - Planned, 1 - Delivered, 2 - Process, -1 - Error',"),"  `dest` longtext COLLATE utf8mb4_unicode_ci NOT NULL " . \Runtime\rtl::toStr("COMMENT 'Destination',"),"  `uuid` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL " . \Runtime\rtl::toStr("COMMENT 'Delivery uuid',"),"  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL " . \Runtime\rtl::toStr("COMMENT 'Title of the message',"),"  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL " . \Runtime\rtl::toStr("COMMENT 'Message',"),"  `gmtime_plan` datetime DEFAULT NULL " . \Runtime\rtl::toStr("COMMENT 'Time by UTC when delivery task will be started. ") . \Runtime\rtl::toStr("If null message must be send immediately',"),"  `gmtime_send` datetime DEFAULT NULL " . \Runtime\rtl::toStr("COMMENT 'Time by UTC when message have been sended',"),"  `send_email_error` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL " . \Runtime\rtl::toStr("COMMENT 'Delivery error message',"),"  `send_email_code` int(11) NOT NULL DEFAULT 0 COMMENT 'Delivery error code',","  `gmtime_add` datetime NOT NULL COMMENT 'Time of create record by UTC',","  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Delete message after delivery',","  PRIMARY KEY (`id`),","  UNIQUE KEY `uuid` (`uuid`),","  KEY `worker_plan` (`worker`,`plan`),","  KEY `status` (`status`),","  KEY `gmtime_add` (`gmtime_add`),","  KEY `gmtime_send` (`gmtime_send`),","  KEY `plan` (`plan`)",") ENGINE=InnoDB COMMENT='Log of delivered messages'"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("mail_delivery");
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/**
	 * Create mail_settings
	 */
	function wp_mail_settings()
	{
		return new \Runtime\ORM\BaseMigration(\Runtime\Map::from(["up"=>function ()
		{
			$table_name = $this->connection->getTableName("mail_settings");
			$this->comment("Create table " . \Runtime\rtl::toStr($table_name));
			$this->executeSQL(\Runtime\Vector::from(["CREATE TABLE `wp1_mail_settings` (","  `id` bigint(20) NOT NULL AUTO_INCREMENT,","  `enable` tinyint(4) NOT NULL,","  `plan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,","  `host` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,","  `port` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,","  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,","  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,","  `ssl_enable` tinyint(4) NOT NULL,","  `is_deleted` tinyint(4) NOT NULL,","  PRIMARY KEY (`id`),","  UNIQUE KEY `plan` (`plan`)",") ENGINE=InnoDB"]));
		},"down"=>function ()
		{
			$table_name = $this->connection->getTableName("mail_settings");
			$this->executeSQL(\Runtime\Vector::from(["DROP TABLES `" . \Runtime\rtl::toStr($table_name) . \Runtime\rtl::toStr("`")]));
		}]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "core_2025_01";
		$this->required = \Runtime\Vector::from([]);
		$this->migrations = \Runtime\Vector::from(["wp_forms","wp_forms_data","wp_forms_ip","wp_gallery","wp_gallery_item","wp_mail_delivery","wp_mail_settings"]);
		$this->up = null;
		$this->down = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Database.Migrations";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Database.Migrations.Core_2025_01";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.BaseMigration";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}