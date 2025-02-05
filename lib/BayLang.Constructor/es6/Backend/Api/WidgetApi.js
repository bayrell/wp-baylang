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
	/**
	 * Load widget
	 */
	getOpCode: async function()
	{
		var service = new BayLang.Constructor.Backend.Service.WidgetService();
		var project_id = this.post_data.get("project_id");
		var current_widget = this.post_data.get("current_widget");
		/* Load project */
		await service.loadProject(project_id);
		/* Load modules */
		await service.loadItem(Runtime.Map.from({"id":current_widget}));
		/* Load widget */
		await service.item.load();
		/* Get widget op code */
		var component = await service.item.getComponentOpCode();
		var model = await service.item.getModelOpCode();
		/* Get component path */
		if (!component)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Failed to load widget '" + Runtime.rtl.toStr(current_widget) + Runtime.rtl.toStr("'")))
		}
		/* Success */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"component":component,"model":model})}));
	},
	/**
	 * Save widget
	 */
	save: async function()
	{
		var service = new BayLang.Constructor.Backend.Service.WidgetService();
		var project_id = this.post_data.get("project_id");
		var current_widget = this.post_data.get("current_widget");
		/* Load project */
		await service.loadProject(project_id);
		/* Load modules */
		await service.loadItem(Runtime.Map.from({"id":current_widget}));
		/* Load widget */
		await service.item.load();
		/* Get component path */
		var component_path = service.item.getComponentPath();
		if (!component_path)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Failed to load widget '" + Runtime.rtl.toStr(current_widget) + Runtime.rtl.toStr("'")))
		}
		/* Save file */
		await service.saveFile(service.item.getComponentPath(), this.post_data.get("component"));
		await service.saveFile(service.item.getModelPath(), this.post_data.get("model"));
		/* Update assets */
		await service.item.module.updateAssets();
		await BayLang.Constructor.Backend.ApiHook.updateAssets();
		/* Success */
		this.success();
	},
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