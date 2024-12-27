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
namespace Runtime\WordPress\Api;
class FormSubmitApi extends \Runtime\Web\BaseApi
{
	public $form;
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "runtime.wordpress.form.submit";
	}
	/**
	 * Returns form settings
	 */
	function actionItem()
	{
		$conn = \Runtime\ORM\Connection::get();
		/* Find form */
		$form_name = \Runtime\rtl::attr($this->post_data, "form_name");
		$this->form = $conn->findRelationByObject("forms", \Runtime\Map::from(["api_name"=>$form_name]));
		if (!$this->form)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form"));
		}
		/* Get form settings */
		$settings = $this->form->get("settings");
		$form_settings = \Runtime\rtl::json_decode($settings);
		if (!$form_settings)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form settings"));
		}
		/* Set result */
		$this->result->success(\Runtime\Map::from(["message"=>"Ok","data"=>\Runtime\Map::from(["name"=>$form_name,"settings"=>$form_settings])]));
	}
	/**
	 * Check spam
	 */
	function checkSpam()
	{
		$conn = \Runtime\ORM\Connection::get();
		$client_ip = \Runtime\rtl::attr($this->backend_storage, "client_ip");
		$time = \Runtime\DateTime::now()->getTimestamp();
		$item = $conn->findRelationByObject("forms_ip", \Runtime\Map::from(["ip"=>$client_ip]));
		if (!$item)
		{
			$item = new \Runtime\ORM\Relation("forms_ip");
			$item->set("count", 1);
			$item->set("ip", $client_ip);
			$item->set("last", $time);
			$item->save($conn);
			return false;
		}
		$spam_result = false;
		$count = $item->get("count") + 1;
		if ($item->get("last") + 15 * 60 > $time)
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
		$item->set("count", $count);
		$item->set("last", $time);
		$item->save($conn);
		return $spam_result;
	}
	/**
	 * Validate item
	 */
	function validateItem($update_data)
	{
		/* Get settings */
		$settings_str = $this->form->get("settings");
		$settings = \Runtime\rtl::json_decode($settings_str);
		if (!$settings)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Settings error"));
		}
		/* Default update data */
		if ($update_data == null)
		{
			$update_data = \Runtime\Map::from([]);
		}
		/* Creat new data */
		$new_data = new \Runtime\Map();
		$fields_result = $this->result->data->get("fields");
		/* Check fields */
		$fields = \Runtime\rtl::attr($settings, "fields");
		if ($fields)
		{
			for ($i = 0; $i < $fields->count(); $i++)
			{
				$field_settings = $fields->get($i);
				$field_name = \Runtime\rtl::attr($field_settings, "name");
				$field_title = \Runtime\rtl::attr($field_settings, "title");
				$required = \Runtime\rtl::to(\Runtime\rtl::attr($field_settings, "required"), ["e"=>"bool"]);
				$value = ($update_data->has($field_name)) ? (\Runtime\rs::trim(\Runtime\rtl::attr($update_data, $field_name))) : ("");
				/* Set value */
				$new_data->set($field_name, $value);
				/* Check field */
				if (!$required)
				{
					continue;
				}
				if ($value == "")
				{
					$fields_result->addFieldError($field_name, "Field is required");
				}
			}
		}
		/* Check fields error */
		$fields = $this->result->data->get("fields");
		if (!$fields->isSuccess())
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Widget\Crud\FieldException());
		}
		return $new_data;
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		$conn = \Runtime\ORM\Connection::get();
		/* Find form */
		$form_name = \Runtime\rtl::attr($this->post_data, "form_name");
		$this->form = $conn->findRelationByObject("forms", \Runtime\Map::from(["api_name"=>$form_name]));
		if (!$this->form)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form"));
		}
		/* Create field result */
		$this->result->data->set("fields", new \Runtime\Widget\Crud\FieldResult());
		/* Validate item */
		$update_data = \Runtime\rtl::attr($this->post_data, "item");
		$update_data = $this->validateItem($update_data);
		/* Get title */
		$form_title = $this->form->get("name");
		if ($this->post_data->has("title"))
		{
			$form_title = $this->post_data->get("title");
		}
		/* Spam check */
		$spam_check = $this->checkSpam();
		if ($spam_check)
		{
			return $this->result->success(\Runtime\Map::from(["message"=>"Ok"]));
		}
		/* Save form */
		$form_data = new \Runtime\ORM\Relation("forms_data");
		$form_data->set("form_id", $this->form->get("id"));
		$form_data->set("form_title", $form_title);
		$form_data->set("data", $update_data);
		$form_data->set("spam", $spam_check);
		$form_data->set("gmtime_add", \Runtime\DateTime::now());
		$form_data->save($conn);
		/* Set result */
		$this->result->success(\Runtime\Map::from(["message"=>"Ok"]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->form = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Api";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Api.FormSubmitApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApi";
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
			"actionItem",
			"actionSave",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionItem")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionSave")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}