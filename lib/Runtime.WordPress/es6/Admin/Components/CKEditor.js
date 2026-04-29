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
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Components == 'undefined') Runtime.WordPress.Admin.Components = {};
Runtime.WordPress.Admin.Components.CKEditor = {
	name: "Runtime.WordPress.Admin.Components.CKEditor",
	extends: Runtime.Component,
	props: {
		name: {default: ""},
		value: {default: ""},
	},
	data: function()
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
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_ckeditor", componentHash])}));
			
			/* Element textarea */
			__v0.element("textarea", new Runtime.Map({"style": "display: none;", "@ref": "textarea", "name": this.name}));
			
			return __v;
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
			let value = this.instance.getData();
			this.old_value = value;
			this.value = value;
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": value,
				"old_value": this.value,
				"data": this.data,
			})));
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
		getClassName: function(){ return "Runtime.WordPress.Admin.Components.CKEditor"; },
	},
	getComponentStyle: function(){ return ".widget_ckeditor.h-1d98{min-height: 430px}.widget_ckeditor.h-1d98 *{box-sizing: content-box !important}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.WordPress.Admin.Components.CKEditor"] = Runtime.WordPress.Admin.Components.CKEditor;