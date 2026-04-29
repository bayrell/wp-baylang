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
if (typeof Runtime.WordPress.Admin.MailLog == 'undefined') Runtime.WordPress.Admin.MailLog = {};
Runtime.WordPress.Admin.MailLog.MailLogPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("table", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"class_name": "Runtime.Widget.Table.TableModel",
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"worker": new Runtime.Serializer.StringType(),
				"plan": new Runtime.Serializer.StringType(),
				"status": new Runtime.Serializer.IntegerType(),
				"dest": new Runtime.Serializer.StringType(),
				"title": new Runtime.Serializer.StringType(),
				"message": new Runtime.Serializer.StringType(),
				"send_email_error": new Runtime.Serializer.StringType(),
				"gmtime_send": new Runtime.Serializer.DateTimeType(),
			})),
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.table = this.createWidget("Runtime.Widget.Table.TableModel");
		this.loader = this.createWidget("Runtime.Widget.Table.TableLoader", Runtime.Map.create({
			"table": this.table,
			"api_name": "admin.wordpress.mail.log.search",
			"method_name": "search",
			"page_name": "p",
		}));
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await this.loader.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Mail log");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.MailLog.MailLogPage";
		this.table = null;
		this.loader = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.MailLog.MailLogPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.MailLog.MailLogPageModel"] = Runtime.WordPress.Admin.MailLog.MailLogPageModel;