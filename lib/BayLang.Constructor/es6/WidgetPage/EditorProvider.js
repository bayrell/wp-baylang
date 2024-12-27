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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.WidgetPage == 'undefined') BayLang.Constructor.WidgetPage = {};
BayLang.Constructor.WidgetPage.EditorProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.EditorProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
BayLang.Constructor.WidgetPage.EditorProvider.prototype.constructor = BayLang.Constructor.WidgetPage.EditorProvider;
Object.assign(BayLang.Constructor.WidgetPage.EditorProvider.prototype,
{
	/**
	 * Add group
	 */
	addGroup: function(group)
	{
		var group_name = group.get("name");
		var item = this.groups.findItem(Runtime.lib.equalAttr("name", group_name));
		if (item != null)
		{
			return ;
		}
		this.groups.push(group);
	},
	/**
	 * Init provider
	 */
	init: async function()
	{
		/* Get widgets managers */
		var managers = Runtime.rtl.getContext().getEntities("BayLang.Constructor.WidgetPage.WidgetManagerAnnotation");
		for (var i = 0; i < managers.count(); i++)
		{
			var annotation = managers.get(i);
			this.managers.push(annotation.factory());
		}
		/* Get widgets */
		for (var i = 0; i < this.managers.count(); i++)
		{
			var manager = this.managers.get(i);
			/* Get groups settings */
			var groups = manager.getGroupSettings();
			var group_names = groups.keys();
			for (var j = 0; j < group_names.count(); j++)
			{
				var group_name = group_names.get(j);
				var group = groups.get(group_name);
				group.set("name", group_name);
				this.addGroup(group);
			}
			/* Get widgets settings */
			var widgets = manager.getWidgetSettings();
			for (var j = 0; j < widgets.count(); j++)
			{
				var widget_settings = widgets.get(j);
				/* Add widget */
				this.widgets.push(widget_settings);
				/* Add settings */
				this.settings.set(widget_settings.constructor.getClassName(), widget_settings);
				/* Add widget by model name */
				if (widget_settings.isModel())
				{
					this.settings.set(widget_settings.getModelName(), widget_settings);
				}
				else
				{
					this.settings.set(widget_settings.getComponentName(), widget_settings);
				}
			}
		}
		/* Widgets init */
		for (var i = 0; i < this.managers.count(); i++)
		{
			var manager = this.managers.get(i);
			manager.init(this);
		}
		/* Sort groups */
		this.groups = this.groups.sort(Runtime.lib.sortAttr("priority", "asc"));
	},
	/**
	 * Returns groups list
	 */
	getGroups: function()
	{
		return this.groups.slice();
	},
	/**
	 * Returns widgets list
	 */
	getWidgets: function()
	{
		return this.widgets.slice();
	},
	/**
	 * Returns widget settings
	 */
	get: function(class_name)
	{
		return this.settings.get(class_name);
	},
	/**
	 * Get model settings
	 */
	getModelSettings: function(widget)
	{
		/* Find settings */
		for (var i = 0; i < this.widgets.count(); i++)
		{
			var settings = this.widgets.get(i);
			if (!settings.isModel())
			{
				continue;
			}
			if (settings.checkWidget(widget))
			{
				return settings;
			}
		}
		return null;
	},
	/**
	 * Get widget settings
	 */
	getWidgetSettings: function(widget)
	{
		/* Find settings */
		for (var i = 0; i < this.widgets.count(); i++)
		{
			var settings = this.widgets.get(i);
			if (settings.isModel())
			{
				continue;
			}
			if (settings.checkWidget(widget))
			{
				return settings;
			}
		}
		return null;
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.groups = Runtime.Vector.from([]);
		this.managers = Runtime.Vector.from([]);
		this.widgets = Runtime.Vector.from([]);
		this.settings = Runtime.Map.from({});
	},
});
Object.assign(BayLang.Constructor.WidgetPage.EditorProvider, Runtime.BaseProvider);
Object.assign(BayLang.Constructor.WidgetPage.EditorProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.EditorProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.EditorProvider);
window["BayLang.Constructor.WidgetPage.EditorProvider"] = BayLang.Constructor.WidgetPage.EditorProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.EditorProvider;