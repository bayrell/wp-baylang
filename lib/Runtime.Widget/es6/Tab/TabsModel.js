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
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.TabsModel = class extends Runtime.BaseModel
{
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("active")) this.active = params.get("active");
		if (params.has("render")) this.render = params.get("render");
	}
	
	
	/**
	 * Returns true if active
	 */
	isActive(name){ return this.active == name; }
	
	
	/**
	 * Set active
	 */
	setActive(active)
	{
		this.active = active;
	}
	
	
	/**
	 * Can show
	 */
	canShow(tab_key)
	{
		let tab = this.items.findItem(Runtime.lib.equalAttr("key", tab_key));
		if (tab == null) return false;
		if (tab.has("href") && tab.get("key") != tab_key) return false;
		return true;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.active = "";
		this.render = true;
		this.component = "Runtime.Widget.Tab.Tabs";
	}
	static getClassName(){ return "Runtime.Widget.Tab.TabsModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Tab.TabsModel"] = Runtime.Widget.Tab.TabsModel;