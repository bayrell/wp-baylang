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
if (typeof Runtime.WordPress.Api == 'undefined') Runtime.WordPress.Api = {};
Runtime.WordPress.Api.FormSubmitApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.WordPress.Api.FormSubmitApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.WordPress.Api.FormSubmitApi.prototype.constructor = Runtime.WordPress.Api.FormSubmitApi;
Object.assign(Runtime.WordPress.Api.FormSubmitApi.prototype,
{
	/**
	 * Returns form settings
	 */
	actionItem: async function()
	{
		var conn = Runtime.ORM.Connection.get();
		/* Find form */
		var form_name = Runtime.rtl.attr(this.post_data, "form_name");
		this.form = await conn.findRelationByObject("forms", Runtime.Map.from({"api_name":form_name}));
		if (!this.form)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form"))
		}
		/* Get form settings */
		var settings = this.form.get("settings");
		var form_settings = Runtime.rtl.json_decode(settings);
		if (!form_settings)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form settings"))
		}
		/* Set result */
		this.result.success(Runtime.Map.from({"message":"Ok","data":Runtime.Map.from({"name":form_name,"settings":form_settings})}));
	},
	/**
	 * Check spam
	 */
	checkSpam: async function()
	{
		var conn = Runtime.ORM.Connection.get();
		var client_ip = Runtime.rtl.attr(this.backend_storage, "client_ip");
		var time = Runtime.DateTime.now().getTimestamp();
		var item = await conn.findRelationByObject("forms_ip", Runtime.Map.from({"ip":client_ip}));
		if (!item)
		{
			item = new Runtime.ORM.Relation("forms_ip");
			item.set("count", 1);
			item.set("ip", client_ip);
			item.set("last", time);
			await item.save(conn);
			return Promise.resolve(false);
		}
		var spam_result = false;
		var count = item.get("count") + 1;
		if (item.get("last") + 15 * 60 > time)
		{
			if (count > 3)
			{
				spam_result = true;
			}
		}
		else
		{
			count = 1;
		}
		item.set("count", count);
		item.set("last", time);
		await item.save(conn);
		return Promise.resolve(spam_result);
	},
	/**
	 * Validate item
	 */
	validateItem: async function(update_data)
	{
		/* Get settings */
		var settings_str = this.form.get("settings");
		var settings = Runtime.rtl.json_decode(settings_str);
		if (!settings)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Settings error"))
		}
		/* Default update data */
		if (update_data == null)
		{
			update_data = Runtime.Map.from({});
		}
		/* Creat new data */
		var new_data = new Runtime.Map();
		var fields_result = this.result.data.get("fields");
		/* Check fields */
		var fields = Runtime.rtl.attr(settings, "fields");
		if (fields)
		{
			for (var i = 0; i < fields.count(); i++)
			{
				var field_settings = fields.get(i);
				var field_name = Runtime.rtl.attr(field_settings, "name");
				var field_title = Runtime.rtl.attr(field_settings, "title");
				var required = Runtime.rtl.to(Runtime.rtl.attr(field_settings, "required"), {"e":"bool"});
				var value = (update_data.has(field_name)) ? (Runtime.rs.trim(Runtime.rtl.attr(update_data, field_name))) : ("");
				/* Set value */
				new_data.set(field_name, value);
				/* Check field */
				if (!required)
				{
					continue;
				}
				if (value == "")
				{
					fields_result.addFieldError(field_name, "Field is required");
				}
			}
		}
		/* Check fields error */
		var fields = this.result.data.get("fields");
		if (!fields.isSuccess())
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Widget.Crud.FieldException())
		}
		return Promise.resolve(new_data);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		var conn = Runtime.ORM.Connection.get();
		/* Find form */
		var form_name = Runtime.rtl.attr(this.post_data, "form_name");
		this.form = await conn.findRelationByObject("forms", Runtime.Map.from({"api_name":form_name}));
		if (!this.form)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form"))
		}
		/* Create field result */
		this.result.data.set("fields", new Runtime.Widget.Crud.FieldResult());
		/* Validate item */
		var update_data = Runtime.rtl.attr(this.post_data, "item");
		update_data = await this.validateItem(update_data);
		/* Get title */
		var form_title = this.form.get("name");
		if (this.post_data.has("title"))
		{
			form_title = this.post_data.get("title");
		}
		/* Spam check */
		var spam_check = this.checkSpam();
		if (spam_check)
		{
			return Promise.resolve(this.result.success(Runtime.Map.from({"message":"Ok"})));
		}
		/* Save form */
		var form_data = new Runtime.ORM.Relation("forms_data");
		form_data.set("form_id", this.form.get("id"));
		form_data.set("form_title", form_title);
		form_data.set("data", update_data);
		form_data.set("spam", spam_check);
		form_data.set("gmtime_add", Runtime.DateTime.now());
		await form_data.save(conn);
		/* Set result */
		this.result.success(Runtime.Map.from({"message":"Ok"}));
	},
	_init: function()
	{
		Runtime.Web.BaseApi.prototype._init.call(this);
		this.form = null;
	},
});
Object.assign(Runtime.WordPress.Api.FormSubmitApi, Runtime.Web.BaseApi);
Object.assign(Runtime.WordPress.Api.FormSubmitApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "runtime.wordpress.form.submit";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Api.FormSubmitApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseApi";
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
			"actionItem",
			"actionSave",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionItem")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "actionSave")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Api.FormSubmitApi);
window["Runtime.WordPress.Api.FormSubmitApi"] = Runtime.WordPress.Api.FormSubmitApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Api.FormSubmitApi;