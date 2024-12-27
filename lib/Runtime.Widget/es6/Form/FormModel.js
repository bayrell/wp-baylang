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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Form.FormModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Form.FormModel.prototype.constructor = Runtime.Widget.Form.FormModel;
Object.assign(Runtime.Widget.Form.FormModel.prototype,
{
	/**
	 * Create data storage
	 */
	createDataStorage: function()
	{
		return null;
	},
	/**
	 * Set data storage
	 */
	setDataStorage: function(storage)
	{
		this.storage = storage;
	},
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("foreign_key"))
		{
			this.foreign_key = params.get("foreign_key");
		}
		if (params.has("post_data"))
		{
			this.post_data = params.get("post_data");
		}
		if (params.has("show_result"))
		{
			this.show_result = params.get("show_result");
		}
		/* Setup params */
		if (params.has("fields"))
		{
			this.fields = Runtime.Vector.from([]);
			this.addFields(params.get("fields"));
		}
		/* Setup storage */
		if (params.has("storage"))
		{
			var storage = params.get("storage");
			if (storage instanceof Runtime.Entity.Factory)
			{
				this.storage = storage.factory();
			}
			else if (Runtime.rtl.isString(storage))
			{
				this.storage = Runtime.rtl.newInstance(storage, Runtime.Vector.from([this]));
			}
			else
			{
				this.storage = storage;
			}
		}
		if (this.storage == null)
		{
			this.storage = this.createDataStorage(params);
		}
		/* Setup storage form */
		if (this.storage != null)
		{
			this.storage.setForm(this);
		}
		/* Setup primary key */
		if (params.has("pk"))
		{
			this.pk = params.get("pk");
		}
		if (params.has("primary_key"))
		{
			this.primary_key = params.get("primary_key");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Load result */
		this.load = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"load"}));
		/* Result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"result","styles":Runtime.Vector.from(["margin_top"])}));
		/* Buttons */
		this.bottom_buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"bottom_buttons","styles":Runtime.Vector.from(["@widget_form__bottom_buttons"])}));
	},
	/**
	 * Add field
	 */
	addField: function(field)
	{
		/* Create model */
		if (field.has("model"))
		{
			var model = field.get("model");
			if (model instanceof Runtime.Web.ModelFactory)
			{
				var instance = model.factory(this);
				field.set("model", instance);
			}
		}
		/* Add field */
		this.fields.append(field);
		/* Add component */
		if (field.has("component"))
		{
			this.layout.addComponent(field.get("component"));
		}
	},
	/**
	 * Add fields
	 */
	addFields: function(fields)
	{
		for (var i = 0; i < fields.count(); i++)
		{
			this.addField(fields.get(i));
		}
	},
	/**
	 * Get field
	 */
	getField: function(field_name)
	{
		return this.fields.findItem(Runtime.lib.equalAttr("name", field_name));
	},
	/**
	 * Remove field
	 */
	removeField: function(field_name)
	{
		this.fields = this.fields.filter((field) =>
		{
			return field.get("name") != field_name;
		});
	},
	/**
	 * Returns field result
	 */
	getFieldResult: function(field_name)
	{
		if (this.fields_error.has(field_name))
		{
			return this.fields_error.get(field_name);
		}
		return Runtime.Vector.from([]);
	},
	/**
	 * Clear form
	 */
	clear: function()
	{
		this.pk = null;
		this.fields_error = Runtime.Map.from({});
		this.row_number = -1;
		this.clearItem();
		this.result.clear();
	},
	/**
	 * Clear form
	 */
	clearItem: function()
	{
		this.item = Runtime.Map.from({});
		for (var i = 0; i < this.fields.count(); i++)
		{
			var field = this.fields.get(i);
			var field_name = field.get("name");
			var default_value = field.get("default", "");
			this.item.set(field_name, default_value);
		}
	},
	/**
	 * Field changed event
	 */
	onFieldChange: function(field_name, value)
	{
		var old_value = this.item.get(field_name);
		this.item.set(field_name, value);
		this.emitAsync(new Runtime.Widget.Form.FormMessage(Runtime.Map.from({"name":"field_change","field_name":field_name,"old_value":old_value,"value":value})));
	},
	/**
	 * Returns item value
	 */
	getItemValue: function(field_name)
	{
		return this.item.get(field_name);
	},
	/**
	 * Returns primary key
	 */
	getPrimaryKey: function(item)
	{
		return item.intersect(this.primary_key);
	},
	/**
	 * Set item
	 */
	setItem: function(item)
	{
		if (item == null)
		{
			this.pk = null;
			this.item = Runtime.Map.from({});
		}
		else
		{
			this.pk = this.getPrimaryKey(item);
			this.item = item;
		}
	},
	/**
	 * Set row number
	 */
	setRowNumber: function(row_number)
	{
		this.row_number = row_number;
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "pk", data);
		serializer.process(this, "item", data);
		serializer.process(this, "load", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set api result
	 */
	setApiResult: function(res, action)
	{
		if (res == null)
		{
			return ;
		}
		/* Load */
		if (action == "load")
		{
			if (res.data.has("item"))
			{
				this.item = res.data.get("item");
			}
			this.load.setApiResult(res);
		}
		/* Submit */
		if (action == "submit")
		{
			if (res.data.has("item"))
			{
				this.item = res.data.get("item");
			}
			if (res.data.has("fields"))
			{
				this.fields_error = res.data.get("fields");
			}
			this.result.setApiResult(res);
		}
	},
	/**
	 * Returns post item
	 */
	getPostItem: function()
	{
		return this.item;
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		if (this.foreign_key)
		{
			post_data.set("foreign_key", this.foreign_key);
			if (post_data.has("item"))
			{
				var item = post_data.get("item");
				var keys = this.foreign_key.keys();
				for (var i = 0; i < keys.count(); i++)
				{
					var key = keys.get(i);
					item.set(key, this.foreign_key.get(key));
				}
			}
		}
		if (this.post_data)
		{
			post_data = post_data.concat(this.post_data);
		}
		return post_data;
	},
	/**
	 * Load form data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BaseModel.prototype.loadData.call(this, container);
		await this.loadForm();
	},
	/**
	 * Load form
	 */
	loadForm: async function()
	{
		if (!this.pk)
		{
			return Promise.resolve();
		}
		if (!this.storage)
		{
			return Promise.resolve();
		}
		/* Load data */
		var res = await this.storage.load();
		this.setApiResult(res, "load");
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
		if (!this.storage)
		{
			return Promise.resolve(null);
		}
		this.result.setWaitMessage();
		var res = await this.storage.submit();
		this.setApiResult(res, "submit");
		await this.emitAsync(new Runtime.Widget.Form.FormMessage(Runtime.Map.from({"name":"submit","result":res})));
		return Promise.resolve(res);
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Form.Form";
		this.widget_name = "form";
		this.foreign_key = null;
		this.post_data = null;
		this.fields = Runtime.Vector.from([]);
		this.fields_error = Runtime.Map.from({});
		this.row_number = -1;
		this.pk = null;
		this.item = Runtime.Map.from({});
		this.primary_key = Runtime.Vector.from([]);
		this.storage = null;
		this.bottom_buttons = null;
		this.load = null;
		this.result = null;
		this.show_result = true;
	},
});
Object.assign(Runtime.Widget.Form.FormModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Form.FormModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormModel);
window["Runtime.Widget.Form.FormModel"] = Runtime.Widget.Form.FormModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormModel;