"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.ConfirmDialogModel = class extends Runtime.Widget.Dialog.DialogModel
{
	/**
	 * Init widget
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.result = this.createWidget("Runtime.Widget.ResultModel");
	}
	
	
	/**
	 * Set wait message
	 */
	setWaitMessage()
	{
		this.result.setWaitMessage();
	}
	
	
	/**
	 * Set api result
	 */
	setApiResult(result)
	{
		this.result.setApiResult(result);
	}
	
	
	/**
	 * Show
	 */
	show()
	{
		super.show();
		this.result.clear();
	}
	
	
	/**
	 * Confirm
	 */
	confirm()
	{
		this.listener.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.create({
			"name": "confirm",
			"action": this.action,
		})));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Dialog.ConfirmDialog";
		this.action = "";
		this.title = "";
		this.title_button = "";
		this.title_button_styles = Runtime.Vector.create([]);
		this.content = "";
		this.result = null;
	}
	static getClassName(){ return "Runtime.Widget.Dialog.ConfirmDialogModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Dialog.ConfirmDialogModel"] = Runtime.Widget.Dialog.ConfirmDialogModel;