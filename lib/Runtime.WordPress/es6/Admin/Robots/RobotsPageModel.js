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
if (typeof Runtime.WordPress.Admin.Robots == 'undefined') Runtime.WordPress.Admin.Robots = {};
Runtime.WordPress.Admin.Robots.RobotsPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("form", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"class_name": "Runtime.Widget.Form.FormModel",
			"item_type": new Runtime.Serializer.MapType(Runtime.Map.create({
				"content": new Runtime.Serializer.StringType(new Runtime.Map()),
			})),
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Add form */
		this.form = this.createWidget("Runtime.Widget.Form.FormModel");
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.robots",
			"method_name": "item",
		}));
		if (result.isSuccess())
		{
			this.form.item = Runtime.Map.create({
				"content": result.data.get("content"),
			});
		}
	}
	
	
	/**
	 * Save form
	 */
	async onSave()
	{
		this.form.setWaitMessage();
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.robots",
			"method_name": "save",
			"data": Runtime.Map.create({
				"content": this.form.item.get("content"),
			}),
		}));
		this.form.setApiResult(result);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Robots TXT");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Robots.RobotsPage";
		this.form = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Robots.RobotsPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Robots.RobotsPageModel"] = Runtime.WordPress.Admin.Robots.RobotsPageModel;