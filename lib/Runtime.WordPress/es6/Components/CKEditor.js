"use strict;"
/*
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
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.CKEditor = {
	name: "Runtime.WordPress.Components.CKEditor",
	extends: Runtime.Web.Component,
	props: {
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
	},
	data: function ()
	{
		return {
			change_timer: null,
			old_value: null,
			instance: null,
			is_instance_created: false,
		};
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_ckeditor"])});
			
			/* Element 'textarea' */
			let __v1 = this._e(__v0, "textarea", {"style":"display: none;","ref":"textarea","name":this.name});
			
			return this._flatten(__v);
		},
		/**
 * Component mounted
 */
		onMounted: function()
		{
			this.nextTick(() => {
		
		var conf = JSON.parse(JSON.stringify( ckeditorSettings.configuration ));
		conf["customConfig"] = "/wp-content/plugins/ckeditor-for-wordpress/ckeditor.config.small.js";
		
		this.instance = CKEDITOR.replace(this.getRef("textarea"), conf);
		this.instance.on('change', ()=>{ 
			if (this.change_timer == null)
			{
				this.change_timer = setTimeout(this.onContentChange.bind(this), 200);
			}
		});
		
		/* Set data */
		this.instance.setData(this.value);
		this.old_value = this.value;
		
		/* Set created */
		this.is_instance_created = true;
	});
		},
		/**
 * On code changed
 */
		onContentChange: function()
		{
			this.change_timer = null;
			var value = this.instance.getData();
			this.old_value = value;
			this.value = value;
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":value,"old_value":this.value,"data":this.data})));
		},
		/**
 * On updated
 */
		onUpdated: function()
		{
			if (this.is_instance_created && this.old_value != this.value)
			{
				this.instance.setData(this.value);
			}
		},
	},
};
Object.assign(Runtime.WordPress.Components.CKEditor,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_ckeditor.h-2122{min-height: 430px}.widget_ckeditor.h-2122 *{box-sizing: content-box !important}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.CKEditor";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.WordPress.Components.CKEditor);
window["Runtime.WordPress.Components.CKEditor"] = Runtime.WordPress.Components.CKEditor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.CKEditor;