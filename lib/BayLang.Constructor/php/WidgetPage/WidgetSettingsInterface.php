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
namespace BayLang\Constructor\WidgetPage;
interface WidgetSettingsInterface
{
	/**
	 * Returns widget name
	 */
	function getWidgetName();
	/**
	 * Returns alias name
	 */
	function getAliasName();
	/**
	 * Returns component name
	 */
	function getComponentName();
	/**
	 * Returns model name
	 */
	function getModelName();
	/**
	 * Returns selector name
	 */
	function getSelectorName();
	/**
	 * Returns group name
	 */
	function getGroupName();
	/**
	 * Returns true if model
	 */
	function isModel();
	/**
	 * Returns true if is widget settings
	 */
	function checkWidget($widget);
	/**
	 * Can insert widget
	 */
	function canInsert($widget);
	/**
	 * Returns params
	 */
	function getParams();
	/**
	 * Returns default template
	 */
	function getDefaultTemplate();
}