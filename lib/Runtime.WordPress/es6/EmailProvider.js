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
Runtime.WordPress.EmailProvider = class extends Runtime.BaseProvider
{
	/**
	 * Returns settings
	 */
	async loadSettings()
	{
		if (this.settings != null) return;
		this.settings = new Runtime.Map();
		let relation = new Runtime.ORM.Relation("Runtime.WordPress.Database.MailSettings");
		let q = relation.select().where("enable", "=", 1);
		let items = await relation.fetchAll(q);
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			this.settings.set(item.get("plan"), item);
		}
	}
	
	
	/**
	 * Send email
	 */
	async send(params)
	{
		let plan = params.get("plan", "default");
		let dest = params.get("dest", "");
		let title = params.get("title", "");
		let content = params.get("content", "");
		let component = params.get("component", "");
		let props = params.get("props", new Runtime.Map());
		let model = params.get("model", null);
		/* Render component */
		let render_container = new Runtime.Web.RenderContainer();
		render_container.createLayout("email");
		render_container.layout.title = title;
		if (component != "")
		{
			render_container.layout.setCurrentPage(component, props);
		}
		else if (model != null)
		{
			render_container.layout.current_page_model = model.constructor.getClassName();
			render_container.layout.pages.set(render_container.layout.current_page_model, model);
		}
		content = render_container.renderApp();
		/* Create email */
		let item = new Runtime.WordPress.Database.MailDelivery();
		item.worker = "email";
		item.plan = plan;
		item.uuid = Runtime.rs.uid();
		item.dest = dest;
		item.title = title;
		item.message = content;
		item.gmtime_plan = null;
		item.gmtime_send = null;
		/* Save email */
		await item.save();
	}
	
	
	/**
	 * Send message
	 */
	async sendMessage(email)
	{
		if (email == null) return;
		if (email.status != 0) return;
		/* Check settings */
		let plan = email.plan;
		if (!this.settings) return;
		if (!this.settings.has(plan))
		{
			plan = "default";
		}
		if (!this.settings.has(plan))
		{
			email.status = -1;
			email.send_email_error = "Settings not found";
			await email.save();
			return;
		}
		/* Get settings */
		let settings = this.settings.get(plan);
		/* Check email */
		if (email.dest == "")
		{
			email.status = -1;
			email.send_email_error = "Destination is empty";
			await email.save();
			return;
		}
	}
	
	
	/**
	 * Send new messages
	 */
	async sendNewMessages()
	{
		let relation = new Runtime.ORM.Relation("Runtime.WordPress.Database.MailDelivery");
		let q = relation.select().where("status", "=", 0);
		let items = await relation.fetchAllRecords(q);
		for (let i = 0; i < items.count(); i++)
		{
			await this.sendMessage(items.get(i));
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.settings = null;
	}
	static getClassName(){ return "Runtime.WordPress.EmailProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.EmailProvider"] = Runtime.WordPress.EmailProvider;