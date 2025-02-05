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
namespace Runtime\WordPress\Theme\Api;
class FormSubmitApi extends \Runtime\Web\BaseApi
{
	public $form;
	public $rules;
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
	function actionSettings()
	{
		$conn = \Runtime\ORM\Connection::get();
		/* Find form */
		$form_name = \Runtime\rtl::attr($this->post_data, "form_name");
		$this->form = \Runtime\WordPress\Database\Form::findByFilter($conn, \Runtime\Vector::from([new \Runtime\ORM\QueryFilter("api_name", "=", $form_name)]));
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
		$client_ip = $this->layout->getStorage()->backend->get("client_ip");
		$time = \Runtime\DateTime::now()->getTimestamp();
		$item = \Runtime\WordPress\Database\FormIP::findByFilter($conn, \Runtime\Vector::from([new \Runtime\ORM\QueryFilter("ip", "=", $client_ip)]));
		if (!$item)
		{
			$item = new \Runtime\WordPress\Database\FormIP();
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
		$value_data = new \Runtime\Map();
		/* Add site name */
		$site_name = "";
		$site_name = get_bloginfo("", "name");
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
				$value_data->set($field_title, $value);
				/* Check field */
				if (!$required)
				{
					continue;
				}
				if ($value == "")
				{
					$this->rules->addFieldError($field_name, "Field is required");
				}
			}
		}
		/* Check fields error */
		if (!$this->rules->correct())
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Widget\Crud\FieldException());
		}
		return \Runtime\Map::from(["data"=>$new_data,"values"=>$value_data,"site_name"=>$site_name]);
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		$conn = \Runtime\ORM\Connection::get();
		/* Find form */
		$form_name = \Runtime\rtl::attr($this->post_data, "form_name");
		$this->form = \Runtime\WordPress\Database\Form::findByFilter($conn, \Runtime\Vector::from([new \Runtime\ORM\QueryFilter("api_name", "=", $form_name)]));
		if (!$this->form)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form"));
		}
		/* Create field result */
		$this->result->data->set("fields", $this->rules->fields);
		/* Validate item */
		$update_data = \Runtime\rtl::attr($this->post_data, "item");
		$result = $this->validateItem($update_data);
		/* Get form title */
		$form_title = "";
		if ($this->post_data->has("form_title"))
		{
			$form_title = $this->post_data->get("form_title");
		}
		if ($form_title == "")
		{
			$form_title = $this->form->get("name");
		}
		/* Get metrika id */
		$metrika_form_id = "";
		if ($this->post_data->has("metrika_form_id"))
		{
			$metrika_form_id = $this->post_data->get("metrika_form_id");
		}
		if ($metrika_form_id == "")
		{
			$metrika_form_id = "form";
		}
		/* Spam check */
		$spam_check = $this->checkSpam();
		if ($spam_check)
		{
			return $this->result->success(\Runtime\Map::from(["message"=>"Ok"]));
		}
		/* Save form */
		$form_data = new \Runtime\WordPress\Database\FormData();
		$form_data->set("form_id", $this->form->get("id"));
		$form_data->set("form_title", $form_title);
		$form_data->set("metrika_id", $metrika_form_id);
		$form_data->set("data", $result->get("data"));
		$form_data->set("spam", $spam_check);
		$form_data->save($conn);
		/* Send email */
		if (!$spam_check)
		{
			$email = \Runtime\rtl::getContext()->provider("email");
			$email_dest = $this->form->get("email_to");
			$email_title = \Runtime\rs::join(" ", \Runtime\Vector::from([$form_title,"from",$result->get("site_name"),"N" . \Runtime\rtl::toStr($form_data->get("id"))]));
			$email->send(\Runtime\Map::from(["dest"=>$email_dest,"title"=>$email_title,"component"=>"Runtime.WordPress.Theme.Components.Email.FormMessage","props"=>\Runtime\Map::from(["site_name"=>$result->get("site_name"),"form_name"=>$this->form->get("name"),"form_title"=>$form_title,"invoice_id"=>$form_data->get("id"),"metrika_form_id"=>$metrika_form_id,"data"=>$result->get("values")])]));
		}
		/* Set result */
		$this->result->success(\Runtime\Map::from(["message"=>"Ok"]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->form = null;
		$this->rules = new \Runtime\Widget\Crud\RulesManager();
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Api";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Api.FormSubmitApi";
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
			"actionSettings",
			"actionSave",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSettings")
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