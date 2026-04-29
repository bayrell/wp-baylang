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
if (typeof Runtime.WordPress.Admin.FormData == 'undefined') Runtime.WordPress.Admin.FormData = {};
Runtime.WordPress.Admin.FormData.FormDataPageModel = class extends Runtime.BaseModel
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
				"form_title": new Runtime.Serializer.StringType(),
				"form_name": new Runtime.Serializer.StringType(),
				"data": new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()),
				"gmtime_add": new Runtime.Serializer.DateTimeType(),
			})),
		})));
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Create table */
		this.table = this.createWidget("Runtime.Widget.Table.TableModel");
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		let result = this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.forms.data",
			"method_name": "search",
			"data": Runtime.Map.create({
				"page": this.page,
			}),
		}));
		if (result.isSuccess())
		{
			this.table.items = result.data.get("items");
			this.page = result.data.get("page");
			this.pages = result.data.get("pages");
		}
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Forms data");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.FormData.FormDataPage";
		this.table = null;
		this.page = 0;
		this.pages = 0;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.FormData.FormDataPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.FormData.FormDataPageModel"] = Runtime.WordPress.Admin.FormData.FormDataPageModel;