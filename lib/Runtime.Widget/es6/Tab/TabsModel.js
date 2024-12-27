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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.TabsModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Tab.TabsModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Tab.TabsModel.prototype.constructor = Runtime.Widget.Tab.TabsModel;
Object.assign(Runtime.Widget.Tab.TabsModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("active"))
		{
			this.active = params.get("active");
		}
		if (params.has("items"))
		{
			this.items = params.get("items");
		}
		if (params.has("render"))
		{
			this.render = params.get("render");
		}
	},
	/**
	 * Returns true if active
	 */
	isActive: function(tab_key)
	{
		return this.active == tab_key;
	},
	/**
	 * Set active
	 */
	setActive: function(active)
	{
		this.active = active;
	},
	/**
	 * Can show
	 */
	canShow: function(tab_key)
	{
		var tab = this.items.findItem(Runtime.lib.equalAttr("key", tab_key));
		if (tab == null)
		{
			return false;
		}
		if (tab.has("href") && tab.get("key") != tab_key)
		{
			return false;
		}
		return true;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.active = "";
		this.items = Runtime.Vector.from([]);
		this.render = true;
		this.component = "Runtime.Widget.Tab.Tabs";
	},
});
Object.assign(Runtime.Widget.Tab.TabsModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Tab.TabsModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Tab";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tab.TabsModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Widget.Tab.TabsModel);
window["Runtime.Widget.Tab.TabsModel"] = Runtime.Widget.Tab.TabsModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tab.TabsModel;