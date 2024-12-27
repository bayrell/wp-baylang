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
if (typeof BayLang.Constructor.Backend == 'undefined') BayLang.Constructor.Backend = {};
if (typeof BayLang.Constructor.Backend.Api == 'undefined') BayLang.Constructor.Backend.Api = {};
BayLang.Constructor.Backend.Api.WidgetApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.WidgetApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
BayLang.Constructor.Backend.Api.WidgetApi.prototype.constructor = BayLang.Constructor.Backend.Api.WidgetApi;
Object.assign(BayLang.Constructor.Backend.Api.WidgetApi.prototype,
{
});
Object.assign(BayLang.Constructor.Backend.Api.WidgetApi, Runtime.Web.BaseApi);
Object.assign(BayLang.Constructor.Backend.Api.WidgetApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.widget";
	},
	/**
	 * Load widget
	 */
	getOpCode: async function(api)
	{
		var project_id = api.post_data.get("project_id");
		var current_widget = api.post_data.get("current_widget");
		/* Find project */
		var project = await BayLang.Constructor.Backend.ApiHook.getProject(project_id);
		if (!project)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(project_id, "Project"))
		}
		/* Load project */
		await project.load();
		/* Find widget */
		var widget = await project.getWidget(current_widget);
		if (!widget)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(current_widget, "Widget"))
		}
		/* Load widget */
		await widget.load();
		/* Get widget op code */
		var component = await widget.getComponentOpCode();
		var model = await widget.getModelOpCode();
		/* Get component path */
		if (!component)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Failed to load widget '" + Runtime.rtl.toStr(current_widget) + Runtime.rtl.toStr("'")))
		}
		/* Success */
		api.success(Runtime.Map.from({"data":Runtime.Map.from({"component":component,"model":model})}));
	},
	/**
	 * Save widget
	 */
	save: async function(api)
	{
		var project_id = api.post_data.get("project_id");
		var current_widget = api.post_data.get("current_widget");
		/* Find project */
		var project = await BayLang.Constructor.Backend.ApiHook.getProject(project_id);
		if (!project)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(project_id, "Project"))
		}
		/* Load project */
		await project.load();
		/* Find widget */
		var widget = await project.getWidget(current_widget);
		if (!widget)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(current_widget, "Widget"))
		}
		/* Load widget */
		await widget.load();
		/* Get component path */
		var component_path = widget.getComponentPath();
		if (!component_path)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Failed to load widget '" + Runtime.rtl.toStr(current_widget) + Runtime.rtl.toStr("'")))
		}
		/* Save file */
		this.saveFile(widget, widget.getComponentPath(), api.post_data.get("component"));
		this.saveFile(widget, widget.getModelPath(), api.post_data.get("model"));
		/* Update assets */
		widget.module.updateAssets();
		BayLang.Constructor.Backend.ApiHook.updateAssets();
		/* Success */
		api.success();
	},
	/**
	 * Save file
	 */
	saveFile: function(widget, file_path, content)
	{
		/* Get op_code */
		var serializer = new Runtime.SerializerBase64();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		var op_code = serializer.decode(content);
		/* Translate */
		var translator = new BayLang.LangBay.TranslatorBay();
		var res = translator.constructor.translate(translator, op_code);
		var content = res.get(1);
		/* Save content */
		Runtime.fs.saveFile(file_path, content);
		/* Compile file */
		var relative_src_file_path = widget.module.getRelativeSourcePath(file_path);
		widget.module.compile(relative_src_file_path);
		/* widget.module.translateLanguages(relative_src_file_path, op_code); */
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.WidgetApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseApi";
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
			"getOpCode",
			"save",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "getOpCode")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "save")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.WidgetApi);
window["BayLang.Constructor.Backend.Api.WidgetApi"] = BayLang.Constructor.Backend.Api.WidgetApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.WidgetApi;