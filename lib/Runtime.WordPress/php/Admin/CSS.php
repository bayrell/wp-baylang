<?php
/*
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
namespace Runtime\WordPress\Admin;
class CSS extends \Runtime\Web\Component
{
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.RowButtons","Runtime.Widget.Select","Runtime.Widget.TextArea","Runtime.Widget.Dialog.Dialog","Runtime.Widget.Table.Table"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(":root{--widget-font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif}#core_ui_root{margin-top: 20px}.widget_table.h-6434 .widget_table__top_buttons.h-a598{margin-bottom: calc(var(--widget-space) * 2)}.widget_table.h-6434 .widget_table__table{border: 1px solid #ccc;border-radius: 4px}.widget_table.h-6434 .widget_table__th{text-align: left}.widget_table.h-6434 .widget_table__th,.widget_table.h-6434 .widget_table__td{border-bottom: 1px solid #ccc;padding: 10px}.widget_table.h-6434 .widget_table__tr:nth-child(odd){background-color: white}.widget_table.h-6434 .widget_table__tr:nth-child(even){background-color: #f0f0f0}.widget_select.h-d72d{max-width: 100%}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.CSS";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Component";
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