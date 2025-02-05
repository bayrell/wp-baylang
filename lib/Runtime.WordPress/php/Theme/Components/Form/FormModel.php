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
namespace Runtime\WordPress\Theme\Components\Form;
class FormModel extends \Runtime\Widget\Form\FormSubmitModel
{
	public $form_name;
	public $form_title;
	public $metrika_event;
	public $metrika_form_id;
	public $redirect_url;
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "fields", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("form_name"))
		{
			$this->form_name = $params->get("form_name");
		}
		if ($params->has("form_title"))
		{
			$this->form_title = $params->get("form_title");
		}
		if ($params->has("metrika_event"))
		{
			$this->metrika_event = $params->get("metrika_event");
		}
		if ($params->has("metrika_form_id"))
		{
			$this->metrika_form_id = $params->get("metrika_form_id");
		}
		if ($params->has("redirect_url"))
		{
			$this->redirect_url = $params->get("redirect_url");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup storage */
		if ($this->storage == null)
		{
			$this->storage = new \Runtime\Widget\Form\FormSubmitStorage(\Runtime\Map::from(["api_name"=>"runtime.wordpress.form.submit"]));
			$this->storage->setForm($this);
		}
	}
	/**
	 * Merge post data
	 */
	function mergePostData($post_data, $action)
	{
		$post_data = parent::mergePostData($post_data, $action);
		$post_data->set("form_name", $this->form_name);
		$post_data->set("form_title", $this->form_title);
		$post_data->set("metrika_form_id", $this->metrika_form_id);
		return $post_data;
	}
	/**
	 * Returns field component
	 */
	function getFieldComponent($field_type)
	{
		if ($field_type == "textarea")
		{
			return "Runtime.Widget.TextArea";
		}
		return "Runtime.Widget.Input";
	}
	/**
	 * Load form
	 */
	function loadForm()
	{
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"runtime.wordpress.form.submit","method_name"=>"actionSettings","data"=>\Runtime\Map::from(["form_name"=>$this->form_name])]));
		if ($result->isSuccess())
		{
			/* Clear fields */
			$this->fields = \Runtime\Vector::from([]);
			/* Add new fields */
			$fields = $result->data->get("settings")->get("fields");
			if ($fields)
			{
				for ($i = 0; $i < $fields->count(); $i++)
				{
					$field = $fields->get($i);
					$this->addField(\Runtime\Map::from(["name"=>$field->get("name"),"label"=>$field->get("title"),"component"=>$this->getFieldComponent($field->get("type")),"props"=>\Runtime\Map::from(["placeholder"=>$field->get("placeholder")])]));
				}
			}
		}
	}
	/**
	 * Submit form
	 */
	function submit()
	{
		$res = parent::submit();
		/* Send event */
		\Runtime\rtl::getContext()->callHook("runtime.wordpress::form_submit", \Runtime\Map::from(["form"=>$this,"res"=>$res]));
		/* Redirect */
		if ($res->isSuccess() && $this->redirect_url != "")
		{
			$document->location = $this->redirect_url;
		}
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->form_name = "";
		$this->form_title = "";
		$this->metrika_event = "";
		$this->metrika_form_id = "";
		$this->redirect_url = "";
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Form";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
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