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
Runtime.Widget.Form.FormSubmitStorage = function()
{
	Runtime.Widget.Form.FormSaveStorage.apply(this, arguments);
};
Runtime.Widget.Form.FormSubmitStorage.prototype = Object.create(Runtime.Widget.Form.FormSaveStorage.prototype);
Runtime.Widget.Form.FormSubmitStorage.prototype.constructor = Runtime.Widget.Form.FormSubmitStorage;
Object.assign(Runtime.Widget.Form.FormSubmitStorage.prototype,
{
	/**
	 * Returns method name
	 */
	getMethodName: function(name)
	{
		if (name == "submit")
		{
			return this.action;
		}
		return "";
	},
	/**
	 * Load form
	 */
	load: async function()
	{
		return Promise.resolve(null);
	},
	_init: function()
	{
		Runtime.Widget.Form.FormSaveStorage.prototype._init.call(this);
		this.action = "actionSave";
	},
});
Object.assign(Runtime.Widget.Form.FormSubmitStorage, Runtime.Widget.Form.FormSaveStorage);
Object.assign(Runtime.Widget.Form.FormSubmitStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSubmitStorage";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormSaveStorage";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormSubmitStorage);
window["Runtime.Widget.Form.FormSubmitStorage"] = Runtime.Widget.Form.FormSubmitStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSubmitStorage;