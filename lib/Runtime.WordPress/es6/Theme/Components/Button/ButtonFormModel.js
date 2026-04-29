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
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Button == 'undefined') Runtime.WordPress.Theme.Components.Button = {};
Runtime.WordPress.Theme.Components.Button.ButtonFormModel = class extends Runtime.Widget.ButtonModel
{
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("dialog_settings")) this.dialog_settings = params.get("dialog_settings");
		if (params.has("form_settings")) this.form_settings = params.get("form_settings");
	}
	
	
	/**
	 * Init widget params
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Add form */
		this.form = this.addWidget("Runtime.WordPress.Theme.Components.Form.FormModel", this.form_settings.concat(Runtime.Map.create({
			"widget_name": "form",
		})));
		/* Add dialog */
		this.dialog = this.addWidget("Runtime.WordPress.Theme.Components.Form.FormDialogModel", this.dialog_settings.concat(Runtime.Map.create({
			"widget_name": "dialog",
			"form": this.form,
		})));
		/* Set form title */
		this.form.form_title = this.dialog.title;
	}
	
	
	/**
	 * Set title
	 */
	setTitle(title)
	{
		this.dialog.title = title;
		this.form.form_title = title;
	}
	
	
	/**
	 * On click
	 */
	onClick(data)
	{
		if (data == undefined) data = null;
		this.dialog.show();
		super.onClick(data);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.dialog = null;
		this.form = null;
		this.dialog_settings = new Runtime.Map();
		this.form_settings = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonFormModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Components.Button.ButtonFormModel"] = Runtime.WordPress.Theme.Components.Button.ButtonFormModel;