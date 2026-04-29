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
namespace Runtime\WordPress\Service;

use Runtime\BaseObject;
use Runtime\DateTime;
use Runtime\ORM\Relation;
use Runtime\WordPress\Database\Form;
use Runtime\WordPress\Database\FormData;
use Runtime\WordPress\Database\FormIP;
use Runtime\WordPress\Theme\Components\Email\FormMessage;
use Runtime\WordPress\EmailProvider;


class FormService extends \Runtime\BaseObject
{
	var $form_relation;
	var $form_ip_relation;
	
	
	/**
	 * Find form
	 */
	function findForm($form_name)
	{
		return $this->form_relation->fetchRecord($this->form_relation->select()->where("api_name", "=", $form_name));
	}
	
	
	/**
	 * Find client by ip
	 */
	function findClient($client_ip)
	{
		return $this->form_ip_relation->fetchRecord($this->form_ip_relation->select()->where("ip", "=", $client_ip));
	}
	
	
	/**
	 * Check spam
	 */
	function checkSpam($client_ip)
	{
		$time = \Runtime\DateTime::now()->getTimestamp();
		$item = $this->findClient($client_ip);
		if (!$item)
		{
			$item = new \Runtime\WordPress\Database\FormIP();
			$item->count = 1;
			$item->ip = $client_ip;
			$item->last = $time;
			$this->form_ip_relation->save($item);
			return false;
		}
		$spam_result = false;
		$count = $item->count + 1;
		if ($item->last + 15 * 60 > $time)
		{
			if ($count > 3)
			{
				$spam_result = true;
			}
		}
		else
		{
			$count = 1;
		}
		$item->count = $count;
		$item->last = $time;
		$this->form_ip_relation->save($item);
		return $spam_result;
	}
	
	
	/**
	 * Send email
	 */
	function sendEmail($form, $form_data, $email, $site_name)
	{
		$email_dest = $form->email_to;
		$email_title = \Runtime\rs::join(" ", new \Runtime\Vector(
			$form_data->form_title,
			"from",
			$site_name,
			"N" . $form_data->id,
		));
		$email->send(new \Runtime\Map([
			"dest" => $email_dest,
			"title" => $email_title,
			"component" => "Runtime.WordPress.Theme.Components.Email.FormMessage",
			"props" => new \Runtime\Map([
				"site_name" => $site_name,
				"form_name" => $form->name,
				"form_title" => $form_data->form_title,
				"invoice_id" => $form_data->id,
				"metrika_id" => $form_data->metrika_id,
				"data" => $form_data->data,
			]),
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->form_relation = new \Runtime\ORM\Relation("Runtime.WordPress.Database.Form");
		$this->form_ip_relation = new \Runtime\ORM\Relation("Runtime.WordPress.Database.FormIP");
	}
	static function getClassName(){ return "Runtime.WordPress.Service.FormService"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}