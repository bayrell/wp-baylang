"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.WidgetSettings == 'undefined') Runtime.WordPress.Theme.WidgetSettings = {};
Runtime.WordPress.Theme.WidgetSettings.WidgetManager = class extends Runtime.BaseObject
{
	/**
	 * Init widgets
	 */
	init(provider)
	{
		provider.remove("Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings");
		provider.remove("Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings");
	}
	
	
	/**
	 * Returns group settings
	 */
	getGroupSettings()
	{
		return Runtime.Map.create({
		});
	}
	
	
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings()
	{
		return Runtime.Vector.create([
			new Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormModelSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Form.FormSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings(),
			new Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings(),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.WidgetManager"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetManagerInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.WidgetManager"] = Runtime.WordPress.Theme.WidgetSettings.WidgetManager;