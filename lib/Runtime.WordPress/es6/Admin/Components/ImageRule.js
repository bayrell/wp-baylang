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
if (typeof Runtime.WordPress.Admin.Components == 'undefined') Runtime.WordPress.Admin.Components = {};
Runtime.WordPress.Admin.Components.ImageRule = function()
{
	Runtime.Widget.Crud.Rules.CrudRule.apply(this, arguments);
};
Runtime.WordPress.Admin.Components.ImageRule.prototype = Object.create(Runtime.Widget.Crud.Rules.CrudRule.prototype);
Runtime.WordPress.Admin.Components.ImageRule.prototype.constructor = Runtime.WordPress.Admin.Components.ImageRule;
Object.assign(Runtime.WordPress.Admin.Components.ImageRule.prototype,
{
	/**
	 * Save item
	 */
	onSaveBefore: async function(service)
	{
		if (!service.data.has(this.name))
		{
			return Promise.resolve();
		}
		/* Get image id */
		var image = service.data.get(this.name);
		var image_id = image.get("id");
		/* Set image id */
		service.data.set(this.key, image_id);
	},
	/**
	 * Search after
	 */
	onSearchAfter: function(service)
	{
		var items = service.items;
		var images = service.items.map((item) =>
		{
			return item.get(this.key);
		}).filter((id) =>
		{
			return id > 0;
		});
		/* Load images */
		var connection = service.getConnection();
		var result = Runtime.WordPress.WP_Helper.loadImages(connection, images);
		/* Map items */
		for (var i = 0; i < service.items.count(); i++)
		{
			var item = service.items.get(i);
			var image_id = item.get(this.key);
			item.set(this.name, result.get(image_id));
		}
	},
	_init: function()
	{
		Runtime.Widget.Crud.Rules.CrudRule.prototype._init.call(this);
		this.name = "";
		this.key = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "key")return this.key;
		return Runtime.Widget.Crud.Rules.CrudRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.WordPress.Admin.Components.ImageRule, Runtime.Widget.Crud.Rules.CrudRule);
Object.assign(Runtime.WordPress.Admin.Components.ImageRule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Components.ImageRule";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
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
		a.push("name");
		a.push("key");
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Components.ImageRule);
window["Runtime.WordPress.Admin.Components.ImageRule"] = Runtime.WordPress.Admin.Components.ImageRule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Components.ImageRule;