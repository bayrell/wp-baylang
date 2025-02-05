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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Api == 'undefined') Runtime.WordPress.Theme.Api = {};
Runtime.WordPress.Theme.Api.FormSubmitApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.WordPress.Theme.Api.FormSubmitApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.WordPress.Theme.Api.FormSubmitApi.prototype.constructor = Runtime.WordPress.Theme.Api.FormSubmitApi;
Object.assign(Runtime.WordPress.Theme.Api.FormSubmitApi.prototype,
{
	/**
	 * Returns form settings
	 */
	actionSettings: async function()
	{
		var conn = Runtime.ORM.Connection.get();
		/* Find form */
		var form_name = Runtime.rtl.attr(this.post_data, "form_name");
		this.form = await Runtime.WordPress.Database.Form.findByFilter(conn, Runtime.Vector.from([new Runtime.ORM.QueryFilter("api_name", "=", form_name)]));
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
		var client_ip = this.layout.getStorage().backend.get("client_ip");
		var time = Runtime.DateTime.now().getTimestamp();
		var item = await Runtime.WordPress.Database.FormIP.findByFilter(conn, Runtime.Vector.from([new Runtime.ORM.QueryFilter("ip", "=", client_ip)]));
		if (!item)
		{
			item = new Runtime.WordPress.Database.FormIP();
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
		var value_data = new Runtime.Map();
		/* Add site name */
		var site_name = "";
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
				value_data.set(field_title, value);
				/* Check field */
				if (!required)
				{
					continue;
				}
				if (value == "")
				{
					this.rules.addFieldError(field_name, "Field is required");
				}
			}
		}
		/* Check fields error */
		if (!this.rules.correct())
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Widget.Crud.FieldException())
		}
		return Promise.resolve(Runtime.Map.from({"data":new_data,"values":value_data,"site_name":site_name}));
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		var conn = Runtime.ORM.Connection.get();
		/* Find form */
		var form_name = Runtime.rtl.attr(this.post_data, "form_name");
		this.form = await Runtime.WordPress.Database.Form.findByFilter(conn, Runtime.Vector.from([new Runtime.ORM.QueryFilter("api_name", "=", form_name)]));
		if (!this.form)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form"))
		}
		/* Create field result */
		this.result.data.set("fields", this.rules.fields);
		/* Validate item */
		var update_data = Runtime.rtl.attr(this.post_data, "item");
		var result = await this.validateItem(update_data);
		/* Get form title */
		var form_title = "";
		if (this.post_data.has("form_title"))
		{
			form_title = this.post_data.get("form_title");
		}
		if (form_title == "")
		{
			form_title = this.form.get("name");
		}
		/* Get metrika id */
		var metrika_form_id = "";
		if (this.post_data.has("metrika_form_id"))
		{
			metrika_form_id = this.post_data.get("metrika_form_id");
		}
		if (metrika_form_id == "")
		{
			metrika_form_id = "form";
		}
		/* Spam check */
		var spam_check = await this.checkSpam();
		if (spam_check)
		{
			return Promise.resolve(this.result.success(Runtime.Map.from({"message":"Ok"})));
		}
		/* Save form */
		var form_data = new Runtime.WordPress.Database.FormData();
		form_data.set("form_id", this.form.get("id"));
		form_data.set("form_title", form_title);
		form_data.set("metrika_id", metrika_form_id);
		form_data.set("data", result.get("data"));
		form_data.set("spam", spam_check);
		await form_data.save(conn);
		/* Send email */
		if (!spam_check)
		{
			var email = Runtime.rtl.getContext().provider("email");
			var email_dest = this.form.get("email_to");
			var email_title = Runtime.rs.join(" ", Runtime.Vector.from([form_title,"from",result.get("site_name"),"N" + Runtime.rtl.toStr(form_data.get("id"))]));
			await email.send(Runtime.Map.from({"dest":email_dest,"title":email_title,"component":"Runtime.WordPress.Theme.Components.Email.FormMessage","props":Runtime.Map.from({"site_name":result.get("site_name"),"form_name":this.form.get("name"),"form_title":form_title,"invoice_id":form_data.get("id"),"metrika_form_id":metrika_form_id,"data":result.get("values")})}));
		}
		/* Set result */
		this.result.success(Runtime.Map.from({"message":"Ok"}));
	},
	_init: function()
	{
		Runtime.Web.BaseApi.prototype._init.call(this);
		this.form = null;
		this.rules = new Runtime.Widget.Crud.RulesManager();
	},
});
Object.assign(Runtime.WordPress.Theme.Api.FormSubmitApi, Runtime.Web.BaseApi);
Object.assign(Runtime.WordPress.Theme.Api.FormSubmitApi,
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
		return "Runtime.WordPress.Theme.Api";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Api.FormSubmitApi";
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
			"actionSettings",
			"actionSave",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSettings")
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Api.FormSubmitApi);
window["Runtime.WordPress.Theme.Api.FormSubmitApi"] = Runtime.WordPress.Theme.Api.FormSubmitApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Api.FormSubmitApi;