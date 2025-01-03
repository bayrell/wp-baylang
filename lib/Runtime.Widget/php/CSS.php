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
namespace Runtime\Widget;
class CSS extends \Runtime\Web\Component
{
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(":root{--widget-font-family: 'Ubuntu', sans-serif;--widget-font-size: 14px;--widget-font-size-h1: 1.8em;--widget-font-size-h2: 1.5em;--widget-font-size-h3: 1.2em;--widget-font-size-h4: 1em;--widget-font-size-h5: 1em;--widget-font-size-h6: 1em;--widget-line-height: normal;--widget-space: 0.5em;--widget-color-border: #e0e1e6;--widget-color-success: #198754;--widget-color-success-text: #fff;--widget-color-danger-text: #fff;--widget-color-danger: #dc3545;--widget-color-default: #fff;--widget-color-hover: rgba(0, 0, 0, 0.075);--widget-color-link: #337ab7;--widget-color-primary-text: #fff;--widget-color-primary: #337ab7;--widget-color-selected-text: #fff;--widget-color-selected: #337ab7;--widget-color-text: #000;--widget-color-table-background: #fff;--widget-border-width: 1px;--widget-button-padding-x: 12.6px;--widget-button-padding-y: 7px;--widget-button-padding-small-x: 10px;--widget-button-padding-small-y: 5.6px;--widget-button-padding-large-x: 17.5px;--widget-button-padding-large-y: 9.8px;--widget-input-padding-x: 10px;--widget-input-padding-y: 7px;--widget-margin-h1: 1.8em 0px;--widget-margin-h2: 1.5em 0px;--widget-margin-h3: 1.2em 0px;--widget-margin-h4: 1em 0px;--widget-margin-h5: 1em 0px;--widget-margin-h6: 1em 0px}.core_ui_root{font-family: var(--widget-font-family);font-size: var(--widget-font-size);line-height: var(--widget-line-height);box-sizing: border-box;width: 100%;padding: 0;margin: 0}.core_ui_root *{box-sizing: border-box}.link{text-decoration: none;color: var(--widget-color-link);cursor: pointer}.link:hover,.link:visited:hover{text-decoration: underline;color: red}.link:visited{text-decoration: none;color: var(--widget-color-link)}.nolink{text-decoration: inherit;color: inherit}.nolink:hover,.nolink:visited,.nolink:visited:hover{text-decoration: inherit;color: inherit}.cursor{cursor:pointer}.nowrap{white-space: nowrap}.bold{font-weight:bold}.nobold{font-weight:normal}.underline{text-decoration: underline}.center{text-align: center}.left{text-align: left}.right{text-align: right}.clear{clear: both}.hidden{display: none}.inline-block{display: inline-block}.scroll-lock{overflow: hidden;padding-right: 12px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.CSS";
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