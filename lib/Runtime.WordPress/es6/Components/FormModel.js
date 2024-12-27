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
if (typeof Runtime.WordPress.Components == 'undefined') Runtime.WordPress.Components = {};
Runtime.WordPress.Components.FormModel = function()
{
	Runtime.Widget.Form.FormSubmitModel.apply(this, arguments);
};
Runtime.WordPress.Components.FormModel.prototype = Object.create(Runtime.Widget.Form.FormSubmitModel.prototype);
Runtime.WordPress.Components.FormModel.prototype.constructor = Runtime.WordPress.Components.FormModel;
Object.assign(Runtime.WordPress.Components.FormModel.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "fields", data);
		serializer.process(this, "form_name", data);
		Runtime.Widget.Form.FormSubmitModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Form.FormSubmitModel.prototype.initWidget.call(this, params);
		/* Set form name */
		if (params.has("form_name"))
		{
			this.form_name = params.get("form_name");
		}
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
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"runtime.wordpress.form.submit","method_name":"actionItem","data":Runtime.Map.from({"form_name":this.form_name})}));
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
					this.addField(Runtime.Map.from({"name":field.get("name"),"label":field.get("title"),"component":this.getFieldComponent(field.get("type"))}));
				}
			}
		}
	},
	_init: function()
	{
		Runtime.Widget.Form.FormSubmitModel.prototype._init.call(this);
		this.form_name = "";
	},
});
Object.assign(Runtime.WordPress.Components.FormModel, Runtime.Widget.Form.FormSubmitModel);
Object.assign(Runtime.WordPress.Components.FormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Components.FormModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Components.FormModel);
window["Runtime.WordPress.Components.FormModel"] = Runtime.WordPress.Components.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Components.FormModel;