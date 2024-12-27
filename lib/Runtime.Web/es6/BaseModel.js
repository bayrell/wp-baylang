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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BaseModel = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	/* Setup widget params */
	this.initParams(params);
	/* Init widget settings */
	this.initWidget(params);
	if (this.layout != null && this.component != "")
	{
		this.layout.addComponent(this.component);
	}
};
Runtime.Web.BaseModel.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BaseModel.prototype.constructor = Runtime.Web.BaseModel;
Object.assign(Runtime.Web.BaseModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		if (params == null)
		{
			return ;
		}
		if (params.has("layout"))
		{
			this.layout = params.get("layout");
		}
		if (params.has("component"))
		{
			this.component = params.get("component");
		}
		if (params.has("widget_name"))
		{
			this.widget_name = params.get("widget_name");
		}
		if (params.has("events"))
		{
			var events = params.get("events");
			events.each((f, message_name) =>
			{
				this.addListener(message_name, f);
			});
		}
		if (params.has("parent_widget"))
		{
			var parent_widget = params.get("parent_widget");
			this.layout = parent_widget.layout;
			this.parent_widget = parent_widget;
			parent_widget.widgets.set(this.widget_name, this);
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
	},
	/**
	 * Create model
	 */
	createModel: function(params, default_model)
	{
		if (default_model == undefined) default_model = "";
		var model = null;
		if (Runtime.rtl.isString(params))
		{
			model = this.addWidget(params);
		}
		else if (params instanceof Runtime.Web.BaseModel)
		{
			model = params;
		}
		else if (params instanceof Runtime.Web.ModelFactory)
		{
			model = params.factory(this);
		}
		else if (params instanceof Runtime.Entity.Factory)
		{
			model = params.factory();
		}
		else if (params instanceof Runtime.Dict)
		{
			if (params.has("factory"))
			{
				model = this.createModel(params.get("factory"));
			}
			else
			{
				var class_name = params.get("model", default_model);
				model = this.addWidget(class_name, params);
			}
		}
		return model;
	},
	/**
	 * Add widget
	 */
	addWidget: function(class_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		params.set("parent_widget", this);
		var widget = Runtime.rtl.newInstance(class_name, Runtime.Vector.from([params]));
		return widget;
	},
	/**
	 * Returns widget by name
	 */
	getWidget: function(widget_name)
	{
		return this.widgets.get(widget_name);
	},
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return this.widget_name;
	},
	/**
	 * Clear listeners
	 */
	clearListener: function(message_name)
	{
		var chain = new Runtime.Chain();
		chain.setReturnValue(false);
		this.listeners.set(message_name, chain);
	},
	/**
	 * Add listener
	 */
	addListener: function(message_name, f, priority)
	{
		if (priority == undefined) priority = 100;
		if (!this.listeners.has(message_name))
		{
			this.clearListener(message_name);
		}
		if (Runtime.rtl.isCallable(f))
		{
			var chain = this.listeners.get(message_name);
			chain.add(f, priority);
			chain.sort();
		}
	},
	/**
	 * Emit message
	 */
	emit: function(message)
	{
		if (message.widget == null)
		{
			message.widget = this;
		}
		this.emitMessage(message.constructor.getClassName(), message);
		this.emitMessage(message.name, message);
	},
	/**
	 * Emit message
	 */
	emitMessage: function(message_name, message)
	{
		if (!this.listeners.has(message_name))
		{
			return ;
		}
		var chain = this.listeners.get(message_name);
		chain.apply(message);
	},
	/**
	 * Async emit message
	 */
	emitAsync: async function(message)
	{
		if (message.widget == null)
		{
			message.widget = this;
		}
		await this.emitMessageAsync(message.constructor.getClassName(), message);
		await this.emitMessageAsync(message.name, message);
	},
	/**
	 * Async emit message
	 */
	emitMessageAsync: async function(message_name, message)
	{
		if (!this.listeners.has(message_name))
		{
			return Promise.resolve();
		}
		var chain = this.listeners.get(message_name);
		await chain.applyAsync(message);
	},
	/**
	 * Load data
	 */
	loadData: async function(container)
	{
		if (this.is_data_loaded)
		{
			return Promise.resolve();
		}
		var widgets_keys = this.widgets.keys();
		for (var i = 0; i < widgets_keys.count(); i++)
		{
			var widget_key = widgets_keys.get(i);
			var widget = this.widgets.get(widget_key);
			if (widget instanceof Runtime.Web.BaseModel)
			{
				await widget.loadData(container);
			}
		}
		this.is_data_loaded = true;
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "component", data);
		serializer.process(this, "widget_name", data);
		serializer.processItems(this, "widgets", data, this.serializeCreateWidget.bind(this));
		serializer.process(this, "is_data_loaded", data);
	},
	/**
	 * Process frontend data
	 */
	serializeCreateWidget: function(serializer, data)
	{
		var class_name = data.get("__class_name__");
		var widget_name = data.get("widget_name");
		/* If BaseModel */
		if (Runtime.rtl.is_instanceof(class_name, "Runtime.Web.BaseModel"))
		{
			var widget = this.widgets.get(widget_name);
			if (widget != null)
			{
				return widget;
			}
			return this.addWidget(class_name, Runtime.Map.from({"widget_name":widget_name}));
		}
		/* Create object */
		return Runtime.rtl.newInstance(class_name);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.parent_widget = null;
		this.layout = null;
		this.component = "";
		this.widget_name = "";
		this.listeners = Runtime.Map.from({});
		this.widgets = Runtime.Map.from({});
		this.is_data_loaded = false;
	},
});
Object.assign(Runtime.Web.BaseModel, Runtime.BaseObject);
Object.assign(Runtime.Web.BaseModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseModel";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.BaseModel);
window["Runtime.Web.BaseModel"] = Runtime.Web.BaseModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseModel;