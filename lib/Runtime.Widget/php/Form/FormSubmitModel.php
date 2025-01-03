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
namespace Runtime\Widget\Form;
class FormSubmitModel extends \Runtime\Widget\Form\FormModel
{
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$content = "Submit";
		$styles = \Runtime\Vector::from(["danger","large"]);
		/* Submit button params */
		if ($params->has("submit_button"))
		{
			$submit_button = $params->get("submit_button");
			if ($submit_button->has("text"))
			{
				$content = $submit_button->get("text");
			}
			if ($submit_button->has("styles"))
			{
				$styles = $submit_button->get("styles");
			}
		}
		/* Add submit Button */
		$submit_button = $this->bottom_buttons->addButton(\Runtime\Map::from(["widget_name"=>"submit","content"=>$content,"styles"=>$styles,"events"=>\Runtime\Map::from(["click"=>new \Runtime\Callback($this, "submit")])]));
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Form";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Form.FormModel";
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