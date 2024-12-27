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
Runtime.Widget.Form.FormDeleteStorage = function()
{
	Runtime.Widget.Form.FormSaveStorage.apply(this, arguments);
};
Runtime.Widget.Form.FormDeleteStorage.prototype = Object.create(Runtime.Widget.Form.FormSaveStorage.prototype);
Runtime.Widget.Form.FormDeleteStorage.prototype.constructor = Runtime.Widget.Form.FormDeleteStorage;
Object.assign(Runtime.Widget.Form.FormDeleteStorage.prototype,
{
	/**
	 * Submit form
	 */
	submit: async function()
	{
		var post_data = Runtime.Map.from({"pk":this.form.pk});
		post_data = this.form.mergePostData(post_data, "submit");
		var res = await this.form.layout.callApi(Runtime.Map.from({"api_name":this.getApiName(),"method_name":"actionDelete","data":post_data}));
		return Promise.resolve(res);
	},
});
Object.assign(Runtime.Widget.Form.FormDeleteStorage, Runtime.Widget.Form.FormSaveStorage);
Object.assign(Runtime.Widget.Form.FormDeleteStorage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormDeleteStorage";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormDeleteStorage);
window["Runtime.Widget.Form.FormDeleteStorage"] = Runtime.Widget.Form.FormDeleteStorage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormDeleteStorage;