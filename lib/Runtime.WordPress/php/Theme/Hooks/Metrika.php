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
namespace Runtime\WordPress\Theme\Hooks;

use Runtime\Web\ApiResult;
use Runtime\Web\Hooks\AppHook as BaseAppHook;
use Runtime\WordPress\Theme\Components\Form\FormModel;


class Metrika extends \Runtime\Web\Hooks\AppHook
{
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register("runtime.wordpress::form_submit", "form_submit");
	}
	
	
	/**
	 * Submit form event
	 */
	function form_submit($data)
	{
		$res = $data->get("res");
		if (!$res->isSuccess()) return;
		/* Check form */
		$form = $data->get("form");
		if (!$form instanceof \Runtime\WordPress\Theme\Components\Form\FormModel) return;
		/* Get event name */
		$event_name = $form->metrika_event;
		if ($event_name == "")
		{
			$res = new \Runtime\Map([
				"event_name" => "submit",
			]);
			\Runtime\rtl::getContext()->hook("runtime.wordpress::form_submit_event_name", $res);
			$event_name = $res->get("event_name");
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Hooks.Metrika"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}