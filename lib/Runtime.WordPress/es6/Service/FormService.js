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
if (typeof Runtime.WordPress.Service == 'undefined') Runtime.WordPress.Service = {};
Runtime.WordPress.Service.FormService = class extends Runtime.BaseObject
{
	/**
	 * Find form
	 */
	async findForm(form_name)
	{
		return await this.form_relation.fetchRecord(this.form_relation.select().where("api_name", "=", form_name));
	}
	
	
	/**
	 * Find client by ip
	 */
	async findClient(client_ip)
	{
		return this.form_ip_relation.fetchRecord(this.form_ip_relation.select().where("ip", "=", client_ip));
	}
	
	
	/**
	 * Check spam
	 */
	async checkSpam(client_ip)
	{
		let time = Runtime.DateTime.now().getTimestamp();
		let item = await this.findClient(client_ip);
		if (!item)
		{
			item = new Runtime.WordPress.Database.FormIP();
			item.count = 1;
			item.ip = client_ip;
			item.last = time;
			await this.form_ip_relation.save(item);
			return false;
		}
		let spam_result = false;
		let count = item.count + 1;
		if (item.last + 15 * 60 > time)
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
		item.count = count;
		item.last = time;
		await this.form_ip_relation.save(item);
		return spam_result;
	}
	
	
	/**
	 * Send email
	 */
	async sendEmail(form, form_data, email, site_name)
	{
		let email_dest = form.email_to;
		let email_title = Runtime.rs.join(" ", Runtime.Vector.create([
			form_data.form_title,
			"from",
			site_name,
			"N" + String(form_data.id),
		]));
		await email.send(Runtime.Map.create({
			"dest": email_dest,
			"title": email_title,
			"component": "Runtime.WordPress.Theme.Components.Email.FormMessage",
			"props": Runtime.Map.create({
				"site_name": site_name,
				"form_name": form.name,
				"form_title": form_data.form_title,
				"invoice_id": form_data.id,
				"metrika_id": form_data.metrika_id,
				"data": form_data.data,
			}),
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.form_relation = new Runtime.ORM.Relation("Runtime.WordPress.Database.Form");
		this.form_ip_relation = new Runtime.ORM.Relation("Runtime.WordPress.Database.FormIP");
	}
	static getClassName(){ return "Runtime.WordPress.Service.FormService"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Service.FormService"] = Runtime.WordPress.Service.FormService;