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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSaveStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Form.FormSaveStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Form.FormSaveStorage.prototype.constructor = Runtime.Widget.Form.FormSaveStorage;
Object.assign(Runtime.Widget.Form.FormSaveStorage.prototype,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return this.api_name;
	},
	/**
	 * Returns method name
	 */
	getMethodName: function(name)
	{
		if (name == "load")
		{
			return "actionItem";
		}
		if (name == "submit")
		{
			return "actionSave";
		}
		return "";
	},
	/**
	 * Set form
	 */
	setForm: function(form)
	{
		this.form = form;
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		var post_data = Runtime.Map.from({"pk":this.form.pk});
		post_data = this.form.mergePostData(post_data, "load");
		var res = await this.form.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":this.getMethodName("load"),"data":post_data}));
		return Promise.resolve(res);
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		var post_data = Runtime.Map.from({"pk":this.form.pk,"item":this.form.getPostItem()});
		post_data = this.form.mergePostData(post_data, "submit");
		var res = await this.form.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":this.getMethodName("submit"),"data":post_data}));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.api_name = "";
		this.form = null;
	},
});
Object.assign(Runtime.Widget.Form.FormSaveStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Form.FormSaveStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveStorage";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		Runtime.Widget.Form.FormStorageInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.Form.FormSaveStorage);
window["Runtime.Widget.Form.FormSaveStorage"] = Runtime.Widget.Form.FormSaveStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSaveStorage;