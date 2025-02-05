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
Runtime.WordPress.EmailProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.WordPress.EmailProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.WordPress.EmailProvider.prototype.constructor = Runtime.WordPress.EmailProvider;
Object.assign(Runtime.WordPress.EmailProvider.prototype,
{
	/**
	 * Returns settings
	 */
	loadSettings: async function()
	{
		if (this.settings != null)
		{
			return Promise.resolve();
		}
		this.settings = Runtime.Map.from({});
		var connection = Runtime.ORM.Connection.get();
		var q = Runtime.WordPress.Database.MailSettings.select().where("enable", "=", 1);
		var items = await connection.fetchAll(q);
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			this.settings.set(item.get("plan"), item.toMap());
		}
	},
	/**
	 * Send email
	 */
	send: async function(params)
	{
		var plan = params.get("plan", "default");
		var dest = params.get("dest", "");
		var title = params.get("title", "");
		var content = params.get("content", "");
		var component = params.get("component", "");
		var props = params.get("props", Runtime.Map.from({}));
		/* Render component */
		if (component != "")
		{
			var render_container = new Runtime.Web.RenderContainer();
			render_container.createLayout("email");
			render_container.layout.setPageTitle(title);
			render_container.layout.setPageComponent(component, props);
			var response = new Runtime.Web.RenderResponse(render_container);
			content = response.getContent();
		}
		/* Get connection */
		var connection = Runtime.ORM.Connection.get();
		/* Create email */
		var email = new Runtime.WordPress.Database.MailDelivery();
		email.set("worker", "email");
		email.set("plan", plan);
		email.set("uuid", Runtime.rs.uid());
		email.set("dest", dest);
		email.set("title", title);
		email.set("message", content);
		email.set("gmtime_plan", null);
		email.set("gmtime_send", null);
		/* Save email */
		await email.save(connection);
	},
	/**
	 * Send message
	 */
	sendMessage: async function(email)
	{
		if (email == null)
		{
			return Promise.resolve();
		}
		if (email.get("status") != 0)
		{
			return Promise.resolve();
		}
		var connection = Runtime.ORM.Connection.get();
		/* Check settings */
		var plan = email.get("plan");
		if (!this.settings)
		{
			return Promise.resolve();
		}
		if (!this.settings.has(plan))
		{
			plan = "default";
		}
		if (!this.settings.has(plan))
		{
			email.set("status", -1);
			email.set("send_email_error", "Settings not found");
			await email.save(connection);
			return Promise.resolve();
		}
		/* Get settings */
		var settings = this.settings.get(plan);
		/* Check email */
		if (email.get("dest") == "")
		{
			email.set("status", -1);
			email.set("send_email_error", "Destination is empty");
			await email.save(connection);
			return Promise.resolve();
		}
	},
	/**
	 * Send new messages
	 */
	sendNewMessages: async function()
	{
		var connection = Runtime.ORM.Connection.get();
		var q = Runtime.WordPress.Database.MailDelivery.select().where("status", "=", 0);
		var items = await connection.findRelations(q);
		for (var i = 0; i < items.count(); i++)
		{
			await this.sendMessage(items.get(i));
		}
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.settings = null;
	},
});
Object.assign(Runtime.WordPress.EmailProvider, Runtime.BaseProvider);
Object.assign(Runtime.WordPress.EmailProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.EmailProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
Runtime.rtl.defClass(Runtime.WordPress.EmailProvider);
window["Runtime.WordPress.EmailProvider"] = Runtime.WordPress.EmailProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.EmailProvider;