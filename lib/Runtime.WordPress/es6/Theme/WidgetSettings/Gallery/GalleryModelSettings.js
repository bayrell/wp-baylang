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
if (typeof Runtime.WordPress.Theme.WidgetSettings == 'undefined') Runtime.WordPress.Theme.WidgetSettings = {};
if (typeof Runtime.WordPress.Theme.WidgetSettings.Gallery == 'undefined') Runtime.WordPress.Theme.WidgetSettings.Gallery = {};
Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings.prototype.constructor = Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings;
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "WP_GalleryModel";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "gallery";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return true;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.model_class_name != this.getModelName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * On change
	 */
	onChange: function(runtime, model, param)
	{
		/* Change api name */
		if (param.name == "api_name")
		{
			model.api_name = param.value;
			model.loadItems();
			return true;
		}
		return false;
	},
	/**
	 * Load form name options
	 */
	loadOptions: async function(runtime, widget)
	{
		if (!this.api_names)
		{
			var data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.from({"api_name":"admin.wordpress.gallery.search","method_name":"actionSearch","data":Runtime.Map.from({"limit":"1000"})}));
			var result = await widget.page_model.layout.callApi(data);
			if (result.isSuccess())
			{
				var result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
				this.api_names = result_data.get("items").map((item) =>
				{
					return Runtime.Map.from({"key":item.get("api_name"),"value":item.get("api_name")});
				});
			}
			else
			{
				this.api_names = Runtime.Vector.from([]);
			}
		}
		if (!this.image_sizes)
		{
			var data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.from({"api_name":"admin.wordpress.gallery.search","method_name":"actionImageSizes"}));
			var result = await widget.page_model.layout.callApi(data);
			if (result.isSuccess())
			{
				var result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
				this.image_sizes = result_data.get("items").map((name) =>
				{
					return Runtime.Map.from({"key":name,"value":name});
				});
			}
			else
			{
				this.image_sizes = Runtime.Vector.from([]);
			}
		}
	},
	/**
	 * Setup widget
	 */
	setup: async function(runtime, widget)
	{
		/* Load options */
		await this.loadOptions(runtime, widget);
		/* Add api_names to widget */
		if (this.api_names)
		{
			var parameter = widget.params.findItem((param) =>
			{
				return param.name == "api_name";
			});
			if (parameter)
			{
				var options = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.api_names);
				parameter.props.set("options", options);
			}
		}
		/* Setup image sizes */
		if (this.image_sizes)
		{
			var image_sizes = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.image_sizes);
			/* Set big_size */
			var parameter = widget.params.findItem((param) =>
			{
				return param.name == "big_size";
			});
			if (parameter)
			{
				parameter.props.set("options", image_sizes);
			}
			/* Set small_size */
			var parameter = widget.params.findItem((param) =>
			{
				return param.name == "small_size";
			});
			if (parameter)
			{
				parameter.props.set("options", image_sizes);
			}
		}
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"api_name","label":"Api name","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"dialog_image_contains","label":"Dialog image contains","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"false","value":"No"}),Runtime.Map.from({"key":"true","value":"Yes"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"small_size","label":"Small image","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"big_size","label":"Big image","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([])})}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"modules":Runtime.Vector.from(["Runtime.Entity.Factory"]),"model":Runtime.rs.join("\n", Runtime.Vector.from(["this.form = this.addWidget(classof WP_GalleryModel, {","\t'widget_name': 'gallery',","\t'apiname': 'default',","});"]))});
		}});
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.api_names = null;
		this.image_sizes = null;
	},
});
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings";
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
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings);
window["Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings"] = Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings;