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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.TableModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Table.TableModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Table.TableModel.prototype.constructor = Runtime.Widget.Table.TableModel;
Object.assign(Runtime.Widget.Table.TableModel.prototype,
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
		if (params.has("limit"))
		{
			this.limit = params.get("limit");
		}
		if (params.has("page"))
		{
			this.page = params.get("page");
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
		/* Setup pagination */
		if (params.has("pagination_class_name"))
		{
			this.pagination_class_name = params.get("pagination_class_name");
		}
		if (params.has("pagination_props"))
		{
			this.pagination_props = params.get("pagination_props");
		}
		/* Setup fields */
		if (params.has("fields"))
		{
			this.fields = Runtime.Vector.from([]);
			this.addFields(params.get("fields"));
		}
		/* Setup storage */
		if (params.has("storage"))
		{
			this.storage = this.createModel(params.get("storage"));
		}
		if (this.storage == null)
		{
			this.storage = this.createDataStorage(params);
		}
		/* Setup storage table */
		if (this.storage != null)
		{
			this.storage.setTable(this);
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Render list */
		this.render_list = this.addWidget("Runtime.Widget.RenderListModel", Runtime.Map.from({"widget_name":"render_list"}));
		/* Result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"result"}));
		/* Add layout */
		this.layout.addComponent(this.pagination_class_name);
	},
	/**
	 * Add field
	 */
	addField: function(field)
	{
		/* Create model */
		if (field.has("model"))
		{
			field.set("model", this.createModel(field.get("model")));
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
	 * Returns items
	 */
	getItems: function()
	{
		return this.items;
	},
	/**
	 * Returns item by row number
	 */
	getItemByRowNumber: function(row_number)
	{
		return this.items.get(row_number);
	},
	/**
	 * Returns item value
	 */
	getItemValue: function(item, field_name)
	{
		return item.get(field_name);
	},
	/**
	 * Returns selected item
	 */
	getSelectedItem: function()
	{
		return this.getItemByRowNumber(this.row_selected);
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "limit", data);
		serializer.process(this, "page", data);
		serializer.process(this, "pages", data);
		serializer.process(this, "items", data);
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
		if (action == "search" || action == "load" || action == "reload")
		{
			if (res.data.has("items"))
			{
				this.items = res.data.get("items");
			}
			if (res.data.has("page"))
			{
				this.page = res.data.get("page");
			}
			if (res.data.has("pages"))
			{
				this.pages = res.data.get("pages");
			}
			this.result.setApiResult(res);
		}
	},
	/**
	 * Merge post data
	 */
	mergePostData: function(post_data, action)
	{
		if (this.foreign_key)
		{
			post_data.set("foreign_key", this.foreign_key);
		}
		if (this.post_data)
		{
			post_data = post_data.concat(this.post_data);
		}
		return post_data;
	},
	/**
	 * Change page
	 */
	changePage: async function(page)
	{
		this.page = page;
		this.refresh();
	},
	/**
	 * Load table data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BaseModel.prototype.loadData.call(this, container);
		await this.reload();
	},
	/**
	 * Reload table data
	 */
	reload: async function()
	{
		if (!this.storage)
		{
			return Promise.resolve(null);
		}
		var res = await this.storage.load();
		this.setApiResult(res, "reload");
		return Promise.resolve(res);
	},
	/**
	 * Row click
	 */
	onRowClick: function(row_number)
	{
		this.emit(new Runtime.Widget.Table.TableMessage(Runtime.Map.from({"name":"row_click","data":Runtime.Map.from({"row_number":row_number})})));
	},
	/**
	 * Row button click
	 */
	onRowButtonClick: function(message)
	{
		this.emit(new Runtime.Widget.Table.TableMessage(Runtime.Map.from({"name":"row_button_click","message":message})));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Table.Table";
		this.widget_name = "table";
		this.pagination_class_name = "Runtime.Widget.Pagination";
		this.pagination_props = Runtime.Map.from({"name":"page"});
		this.storage = null;
		this.limit = 10;
		this.page = 0;
		this.pages = 0;
		this.row_selected = -1;
		this.foreign_key = null;
		this.post_data = null;
		this.fields = Runtime.Vector.from([]);
		this.items = Runtime.Vector.from([]);
		this.styles = Runtime.Vector.from([]);
		this.render_list = null;
		this.result = null;
	},
});
Object.assign(Runtime.Widget.Table.TableModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Table.TableModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.TableModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.TableModel);
window["Runtime.Widget.Table.TableModel"] = Runtime.Widget.Table.TableModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.TableModel;