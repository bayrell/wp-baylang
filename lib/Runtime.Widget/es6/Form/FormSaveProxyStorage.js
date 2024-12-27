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
Runtime.Widget.Form.FormSaveProxyStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Form.FormSaveProxyStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Form.FormSaveProxyStorage.prototype.constructor = Runtime.Widget.Form.FormSaveProxyStorage;
Object.assign(Runtime.Widget.Form.FormSaveProxyStorage.prototype,
{
	/**
	 * Set form
	 */
	setForm: function(form)
	{
		this.form = form;
	},
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return Runtime.rtl.attr(this.container, this.path);
	},
	/**
	 * Load form
	 */
	load: async function()
	{
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		/* Get post data */
		var post_data = Runtime.Map.from({"item":this.form.getPostItem()});
		var post_data = this.form.mergePostData(post_data, "load");
		/* Copy item */
		var item = post_data.get("item");
		item = Runtime.Serializer.copy(item);
		/* Save item */
		var items = this.getItems();
		if (this.form.row_number == -1)
		{
			items.push(item);
		}
		else
		{
			items.set(this.form.row_number, item);
		}
		/* Success result */
		var res = new Runtime.Web.ApiResult();
		res.success();
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.container = null;
		this.path = null;
		this.form = null;
	},
});
Object.assign(Runtime.Widget.Form.FormSaveProxyStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Form.FormSaveProxyStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveProxyStorage";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormSaveProxyStorage);
window["Runtime.Widget.Form.FormSaveProxyStorage"] = Runtime.Widget.Form.FormSaveProxyStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSaveProxyStorage;