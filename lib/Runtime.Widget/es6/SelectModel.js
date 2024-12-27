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
Runtime.Widget.SelectModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.SelectModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.SelectModel.prototype.constructor = Runtime.Widget.SelectModel;
Object.assign(Runtime.Widget.SelectModel.prototype,
{
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
		if (params.has("filter"))
		{
			this.filter = params.get("filter");
		}
		if (params.has("foreign_key"))
		{
			this.foreign_key = params.get("foreign_key");
		}
		if (params.has("transform"))
		{
			this.transform = params.get("transform");
		}
		/* Setup storage */
		if (params.has("storage"))
		{
			this.storage = this.createModel(params.get("storage"));
		}
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
		/* Result */
		this.result = this.addWidget("Runtime.Widget.WidgetResultModel", Runtime.Map.from({"widget_name":"result"}));
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "items", data);
		serializer.process(this, "result", data);
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
		/* Set items */
		if (res.data.has("items"))
		{
			this.items = res.data.get("items");
			if (this.transform)
			{
				this.items = this.items.map(this.transform);
			}
		}
		/* Set result */
		this.result.setApiResult(res);
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
		return post_data;
	},
	/**
	 * Load table data
	 */
	loadData: async function(container)
	{
		await Runtime.Web.BaseModel.prototype.loadData.call(this, container);
		var res = await this.storage.load();
		this.setApiResult(res, "load");
	},
	/**
	 * Returns options
	 */
	getOptions: function()
	{
		return (this.filter) ? (this.items.filter(this.filter)) : (this.items);
	},
	/**
	 * Returns props
	 */
	getProps: function(data)
	{
		var result = Runtime.Map.from({"options":this.getOptions()});
		return result;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.SelectWrap";
		this.items = Runtime.Vector.from([]);
		this.foreign_key = null;
		this.storage = null;
		this.result = null;
		this.filter = null;
		this.transform = null;
		this.page = 0;
		this.limit = -1;
	},
});
Object.assign(Runtime.Widget.SelectModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.SelectModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SelectModel";
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
Runtime.rtl.defClass(Runtime.Widget.SelectModel);
window["Runtime.Widget.SelectModel"] = Runtime.Widget.SelectModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SelectModel;