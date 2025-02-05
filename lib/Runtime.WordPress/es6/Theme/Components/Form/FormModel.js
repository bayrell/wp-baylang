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
if (typeof Runtime.WordPress.Theme.Components.Form == 'undefined') Runtime.WordPress.Theme.Components.Form = {};
Runtime.WordPress.Theme.Components.Form.FormModel = function()
{
	Runtime.Widget.Form.FormSubmitModel.apply(this, arguments);
};
Runtime.WordPress.Theme.Components.Form.FormModel.prototype = Object.create(Runtime.Widget.Form.FormSubmitModel.prototype);
Runtime.WordPress.Theme.Components.Form.FormModel.prototype.constructor = Runtime.WordPress.Theme.Components.Form.FormModel;
Object.assign(Runtime.WordPress.Theme.Components.Form.FormModel.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "fields", data);
		Runtime.Widget.Form.FormSubmitModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Form.FormSubmitModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("form_name"))
		{
			this.form_name = params.get("form_name");
		}
		if (params.has("form_title"))
		{
			this.form_title = params.get("form_title");
		}
		if (params.has("metrika_event"))
		{
			this.metrika_event = params.get("metrika_event");
		}
		if (params.has("metrika_form_id"))
		{
			this.metrika_form_id = params.get("metrika_form_id");
		}
		if (params.has("redirect_url"))
		{
			this.redirect_url = params.get("redirect_url");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Form.FormSubmitModel.prototype.initWidget.call(this, params);
		/* Setup storage */
		if (this.storage == null)
		{
			this.storage = new Runtime.Widget.Form.FormSubmitStorage(Runtime.Map.from({"api_name":"runtime.wordpress.form.submit"}));
			this.storage.setForm(this);
		}
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		post_data = Runtime.Widget.Form.FormSubmitModel.prototype.mergePostData.call(this, post_data, action);
		post_data.set("form_name", this.form_name);
		post_data.set("form_title", this.form_title);
		post_data.set("metrika_form_id", this.metrika_form_id);
		return post_data;
	},
	/**
	 * Returns field component
	 */
	getFieldComponent: function(field_type)
	{
		if (field_type == "textarea")
		{
			return "Runtime.Widget.TextArea";
		}
		return "Runtime.Widget.Input";
	},
	/**
	 * Load form
	 */
	loadForm: async function()
	{
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"runtime.wordpress.form.submit","method_name":"actionSettings","data":Runtime.Map.from({"form_name":this.form_name})}));
		if (result.isSuccess())
		{
			/* Clear fields */
			this.fields = Runtime.Vector.from([]);
			/* Add new fields */
			var fields = result.data.get("settings").get("fields");
			if (fields)
			{
				for (var i = 0; i < fields.count(); i++)
				{
					var field = fields.get(i);
					this.addField(Runtime.Map.from({"name":field.get("name"),"label":field.get("title"),"component":this.getFieldComponent(field.get("type")),"props":Runtime.Map.from({"placeholder":field.get("placeholder")})}));
				}
			}
		}
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		var res = await Runtime.Widget.Form.FormSubmitModel.prototype.submit.call(this);
		/* Send event */
		await Runtime.rtl.getContext().callHook("runtime.wordpress::form_submit", Runtime.Map.from({"form":this,"res":res}));
		/* Redirect */
		if (res.isSuccess() && this.redirect_url != "")
		{
			document.location = this.redirect_url;
		}
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.Widget.Form.FormSubmitModel.prototype._init.call(this);
		this.form_name = "";
		this.form_title = "";
		this.metrika_event = "";
		this.metrika_form_id = "";
		this.redirect_url = "";
	},
});
Object.assign(Runtime.WordPress.Theme.Components.Form.FormModel, Runtime.Widget.Form.FormSubmitModel);
Object.assign(Runtime.WordPress.Theme.Components.Form.FormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Form";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Form.FormModel);
window["Runtime.WordPress.Theme.Components.Form.FormModel"] = Runtime.WordPress.Theme.Components.Form.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Form.FormModel;