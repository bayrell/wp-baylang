"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.AppHook = class extends Runtime.Hooks.RuntimeHook
{
	static ASSETS = "runtime.widget::assets";
	static INIT_WIDGET = "baylang::init_widget";
	
	
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(Runtime.Hooks.RuntimeHook.COMPONENTS, "components", 50);
		this.register(this.constructor.INIT_WIDGET, "initWidget");
	}
	
	
	/**
	 * Components
	 */
	components(params)
	{
		let components = Runtime.Vector.create([
			"Runtime.Widget.CSS",
		]);
		components.appendItems(params.get("components"));
		params.set("components", components);
	}
	
	
	/**
	 * Init widget
	 */
	initWidget(params)
	{
		let widget_class = "BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent";
		let provider = params.get("provider");
		/* Image */
		provider.registerWidget(Runtime.Map.create({
			"name": "image",
			"label": "Image",
			"component": "Runtime.Widget.Image",
			"widget": widget_class,
			"props": new Runtime.Map(),
		}));
		/* Section */
		provider.registerWidget(Runtime.Map.create({
			"name": "section",
			"label": "Section",
			"component": "Runtime.Widget.Section",
			"widget": widget_class,
			"props": new Runtime.Map(),
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.Widget.AppHook"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.AppHook"] = Runtime.Widget.AppHook;