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
if (typeof Runtime.WordPress.Theme.WidgetSettings.Button == 'undefined') Runtime.WordPress.Theme.WidgetSettings.Button = {};
Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings = class extends Runtime.BaseObject
{
	/**
	 * Returns widget name
	 */
	getWidgetName(){ return "Button form"; }
	
	
	/**
	 * Returns alias name
	 */
	getAliasName(){ return "WP_ButtonForm"; }
	
	
	/**
	 * Returns component name
	 */
	getComponentName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonForm"; }
	
	
	/**
	 * Returns model name
	 */
	getModelName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonFormModel"; }
	
	
	/**
	 * Returns selector name
	 */
	getSelectorName(){ return "button"; }
	
	
	/**
	 * Returns group name
	 */
	getGroupName(){ return "widget"; }
	
	
	/**
	 * Returns true if model
	 */
	isModel(){ return false; }
	
	
	/**
	 * Returns true if is widget settings
	 */
	checkWidget(widget)
	{
		if (!widget.isComponent()) return false;
		if (widget.component_class_name != this.getComponentName()) return false;
		return true;
	}
	
	
	/**
	 * Can insert widget
	 */
	canInsert(widget)
	{
		return false;
	}
	
	
	/**
	 * Returns params
	 */
	getParams()
	{
		return Runtime.Vector.create([
			new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent"),
		]);
	}
	
	
	/**
	 * Returns default template
	 */
	getDefaultTemplate()
	{
		return Runtime.Map.create({
			"default": () =>
			{
				return Runtime.Map.create({
					"content": Runtime.rs.join("\n", Runtime.Vector.create([
						"<use name='Runtime.Widget.Button' component='true' />",
						"<style>",
						"%(Button)widget_button{",
						"}",
						"</style>",
						"<template>Click</template>",
					])),
				});
			},
		});
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"]; }
};
window["Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings"] = Runtime.WordPress.Theme.WidgetSettings.Button.ButtonFormSettings;