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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
BayLang.Constructor.Frontend.ConstructorHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
BayLang.Constructor.Frontend.ConstructorHook.prototype = Object.create(Runtime.BaseHook.prototype);
BayLang.Constructor.Frontend.ConstructorHook.prototype.constructor = BayLang.Constructor.Frontend.ConstructorHook;
Object.assign(BayLang.Constructor.Frontend.ConstructorHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.GET_FRAME_PAGE_URL);
	},
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.GET_FRAME_PAGE_URL)
		{
			return "get_frame_page_url";
		}
		return "";
	},
	/**
	 * Returns projects list
	 */
	get_frame_page_url: function(params)
	{
		var page_url = "/project/" + Runtime.rtl.toStr(params.get("project_id")) + Runtime.rtl.toStr("/iframe/open/widget?widget_name=") + Runtime.rtl.toStr(params.get("current_widget"));
		params.set("page_url", page_url);
	},
});
Object.assign(BayLang.Constructor.Frontend.ConstructorHook, Runtime.BaseHook);
Object.assign(BayLang.Constructor.Frontend.ConstructorHook,
{
	GET_FRAME_PAGE_URL: "baylang.constructor::get_frame_page_url",
	/**
	 * Returns projects list
	 */
	getFramePageUrl: function(project_id, current_widget)
	{
		var result = Runtime.rtl.getContext().callHook(this.GET_FRAME_PAGE_URL, Runtime.Map.from({"page_url":"","project_id":project_id,"current_widget":current_widget}));
		return result.get("page_url");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.ConstructorHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.ConstructorHook);
window["BayLang.Constructor.Frontend.ConstructorHook"] = BayLang.Constructor.Frontend.ConstructorHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.ConstructorHook;