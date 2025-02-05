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
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FormSaveModel = function()
{
	Runtime.Widget.Form.FormModel.apply(this, arguments);
};
Runtime.WordPress.Admin.FormSettings.FormSaveModel.prototype = Object.create(Runtime.Widget.Form.FormModel.prototype);
Runtime.WordPress.Admin.FormSettings.FormSaveModel.prototype.constructor = Runtime.WordPress.Admin.FormSettings.FormSaveModel;
Object.assign(Runtime.WordPress.Admin.FormSettings.FormSaveModel.prototype,
{
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		Runtime.Widget.Form.FormModel.prototype.mergePostData.call(this, post_data, action);
		if (post_data.has("item"))
		{
			var item = post_data.get("item");
			if (item && item.has("settings"))
			{
				var settings = item.get("settings");
				item.set("settings", Runtime.rtl.json_encode(settings));
			}
		}
		return post_data;
	},
	/**
	 * Set item
	 */
	setItem: function(item)
	{
		Runtime.Widget.Form.FormModel.prototype.setItem.call(this, item);
		if (this.item && this.item.has("settings"))
		{
			var settings = this.item.get("settings");
			this.item.set("settings", Runtime.rtl.json_decode(settings));
		}
	},
});
Object.assign(Runtime.WordPress.Admin.FormSettings.FormSaveModel, Runtime.Widget.Form.FormModel);
Object.assign(Runtime.WordPress.Admin.FormSettings.FormSaveModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.FormSettings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.FormSettings.FormSaveModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.FormSettings.FormSaveModel);
window["Runtime.WordPress.Admin.FormSettings.FormSaveModel"] = Runtime.WordPress.Admin.FormSettings.FormSaveModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.FormSettings.FormSaveModel;