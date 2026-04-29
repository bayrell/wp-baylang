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

use Runtime\DateTime;
use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\ItemNotFound;
use Runtime\Exceptions\FieldException;
use Runtime\Exceptions\RuntimeException;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\Required;
use Runtime\Serializer\StringType;
use Runtime\Serializer\TypeError;
use Runtime\ORM\Connection;
use Runtime\ORM\Cursor;
use Runtime\ORM\Query;
use Runtime\ORM\QueryField;
use Runtime\ORM\QueryFilter;
use Runtime\ORM\QueryResult;
use Runtime\ORM\Relation;
use Runtime\ORM\Record;
use Runtime\Web\ApiRequest;
use Runtime\Web\ApiResult;
use Runtime\Web\BaseApi;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\FieldErrors;
use Runtime\WordPress\EmailProvider;
use Runtime\WordPress\Database\Form;
use Runtime\WordPress\Database\FormData;
use Runtime\WordPress\Database\FormIP;
use Runtime\WordPress\Service\FormService;


class FormSubmitApi extends \Runtime\Web\BaseApi
{
	var $form;
	var $relation_form;
	var $relation_form_data;
	var $relation_form_ip;
	var $form_service;
	var $email;
	var $client_ip;
	
	
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "runtime.wordpress.form.submit"; }
	
	
	/**
	 * Set request
	 */
	function setRequest($request)
	{
		parent::setRequest($request);
		$this->client_ip = $request->storage->get("client_ip");
	}
	
	
	/**
	 * Returns form settings
	 */
	function actionSettings()
	{
		/* Validate data */
		$update_data = $this->filter($this->request->data, new \Runtime\Serializer\MapType(new \Runtime\Map([
			"form_name" => new \Runtime\Serializer\StringType(),
		])));
		/* Find form */
		$form_name = $update_data->get("form_name");
		$form = $this->form_service->findForm($form_name);
		if (!$form)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form"));
		}
		/* Get form settings */
		$form_settings = $form->settings;
		if (!$form_settings)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form settings"));
		}
		/* Set result */
		return $this->result->success(new \Runtime\Map([
			"message" => "Ok",
			"data" => new \Runtime\Map([
				"name" => $form_name,
				"settings" => $form_settings,
			]),
		]));
	}
	
	
	/**
	 * Action save
	 */
	function actionSave()
	{
		$errors = new \Runtime\Vector();
		/* Validate data */
		$update_data = $this->filter($this->request->data, new \Runtime\Serializer\MapType(new \Runtime\Map([
			"form_name" => new \Runtime\Serializer\StringType(),
			"form_title" => new \Runtime\Serializer\StringType(),
			"form_id" => new \Runtime\Serializer\StringType(),
			"item" => new \Runtime\Serializer\Required(),
		])));
		/* Get data */
		$site_name = "";
		$form_name = $update_data->get("form_name");
		$form_title = $update_data->get("form_title");
		$form_id = $update_data->get("form_id");
		/* Site name */
		$site_name = get_bloginfo("name");
		/* Find form */
		$form = $this->form_service->findForm($form_name);
		if (!$form)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($form_name, "Form"));
		}
		/* Validate item */
		$rules = $form->getRules();
		$item_data = $rules->filter($update_data->get("item"), $errors);
		if (!$item_data || $errors->count() > 0)
		{
			return $this->result->fail(new \Runtime\Exceptions\FieldException(new \Runtime\Map([
				"fields" => \Runtime\Serializer\TypeError::getMap($errors),
			])));
		}
		/* Spam check */
		$spam_check = $this->form_service->checkSpam($this->client_ip);
		if ($spam_check)
		{
			return $this->result->success(new \Runtime\Map([
				"message" => "Ok",
			]));
		}
		/* Save form */
		$form_data = $this->relation_form_data->createRecord();
		$form_data->form_id = $form->id;
		$form_data->form_title = $form_title ? $form_title : $form->name;
		$form_data->metrika_id = $form_id ? $form_id : "form";
		$form_data->data = $update_data->get("item");
		$form_data->spam = $spam_check;
		$this->relation_form_data->save($form_data);
		/* Send email */
		if (!$spam_check)
		{
			$this->form_service->sendEmail($form, $form_data, $this->email, $site_name);
		}
		/* Set result */
		return $this->result->success(new \Runtime\Map([
			"message" => "Ok",
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->form = null;
		$this->relation_form = new \Runtime\ORM\Relation("Runtime.WordPress.Database.Form");
		$this->relation_form_data = new \Runtime\ORM\Relation("Runtime.WordPress.Database.FormData");
		$this->relation_form_ip = new \Runtime\ORM\Relation("Runtime.WordPress.Database.FormIP");
		$this->form_service = new \Runtime\WordPress\Service\FormService();
		$this->email = \Runtime\rtl::getContext()->provider("email");
		$this->client_ip = "";
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Api.FormSubmitApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionSettings", "actionSave");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSettings") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "settings"]))
		);
		if ($field_name == "actionSave") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "save"]))
		);
		return null;
	}
}