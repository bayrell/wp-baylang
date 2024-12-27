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
Runtime.Widget.Form.FormDeleteProxyStorage = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Form.FormDeleteProxyStorage.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Form.FormDeleteProxyStorage.prototype.constructor = Runtime.Widget.Form.FormDeleteProxyStorage;
Object.assign(Runtime.Widget.Form.FormDeleteProxyStorage.prototype,
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
		/* Delete item */
		if (this.form.row_number >= 0)
		{
			var items = this.getItems();
			items.remove(this.form.row_number);
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
Object.assign(Runtime.Widget.Form.FormDeleteProxyStorage, Runtime.BaseObject);
Object.assign(Runtime.Widget.Form.FormDeleteProxyStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormDeleteProxyStorage";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormDeleteProxyStorage);
window["Runtime.Widget.Form.FormDeleteProxyStorage"] = Runtime.Widget.Form.FormDeleteProxyStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormDeleteProxyStorage;