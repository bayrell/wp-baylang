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
BayLang.Constructor.Backend.Api.WidgetSaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.WidgetSaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
BayLang.Constructor.Backend.Api.WidgetSaveApi.prototype.constructor = BayLang.Constructor.Backend.Api.WidgetSaveApi;
Object.assign(BayLang.Constructor.Backend.Api.WidgetSaveApi.prototype,
{
	/**
	 * Returns rules
	 */
	getRules: function()
	{
		return Runtime.Vector.from([new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"id"})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"module_id"}))]);
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","module_id"]);
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["id","module_id"]);
	},
	/**
	 * New item
	 */
	newItem: async function()
	{
		return new BayLang.Helper.Widget(this.module);
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		var widget_name = pk.get("id");
		return Promise.resolve(this.module.getWidget(widget_name));
	},
	/**
	 * Action before
	 */
	onActionBefore: async function()
	{
		/* Get project */
		var project_id = Runtime.rtl.attr(this.post_data, ["foreign_key", "project_id"]);
		this.project = await BayLang.Constructor.Backend.ApiHook.getProject(project_id);
		if (!this.project)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(project_id, "Project"))
		}
		/* Load project */
		await this.project.load();
		/* Get module */
		var module_id = Runtime.rtl.attr(this.post_data, ["foreign_key", "module_id"]);
		this.module = this.project.getModule(module_id);
		if (!this.module)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(module_id, "Module"))
		}
	},
	/**
	 * Create widget
	 */
	createWidget: async function()
	{
		var widget_name = this.data.get("id");
		/* Check widget is exists */
		var widget = this.findItem(Runtime.Map.from({"id":widget_name}));
		if (widget)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Widget already exists"))
		}
		/* Check widget prefix */
		var module_name = this.module.getName();
		var widget_prefix = Runtime.rs.substr(widget_name, 0, Runtime.rs.strlen(module_name));
		if (widget_prefix != module_name)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Widget prefix error. Must be " + Runtime.rtl.toStr(module_name)))
		}
		/* Check widget is model */
		var is_model_based = Runtime.rs.substr(widget_name, -5) == "Model";
		if (!is_model_based)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Widget must be model"))
		}
		/* Set widget name */
		this.item.kind = "widget";
		this.item.name = widget_name;
		this.item.component_name = Runtime.rs.substr(widget_name, 0, -5);
		/* Set model path */
		var model_path = this.item.getModelPath();
		var component_path = this.item.getComponentPath();
		var widget_dir = Runtime.rs.dirname(model_path);
		/* Create directory if not exists */
		if (!await Runtime.fs.exists(widget_dir))
		{
			await Runtime.fs.mkDir(widget_dir);
		}
		/* Create file */
		await this.createModel(model_path, this.item.name, this.item.component_name);
		await this.createComponent(component_path, this.item.component_name);
		/* Add widget */
		await this.module.addWidget(this.item);
		/* Compile model */
		this.module.compile(this.module.getRelativeSourcePath(model_path));
		/* Compile component */
		this.module.compile(this.module.getRelativeSourcePath(component_path));
		/* Update assets */
		this.module.updateAssets();
		/* Save cache */
		await this.project.saveCache();
		/* Result */
		this.success();
	},
	/**
	 * Create model
	 */
	createModel: async function(file_path, model_name, component_name)
	{
		var arr = Runtime.rs.split(".", model_name);
		var namespace_name = Runtime.rs.join(".", arr.slice(0, -1));
		var model_short_name = arr.last();
		/* Get content */
		var content = Runtime.Vector.from([]);
		content.push("namespace " + Runtime.rtl.toStr(namespace_name) + Runtime.rtl.toStr(";"));
		content.push("");
		content.push("use Runtime.Web.BasePageModel;");
		content.push("use Runtime.Web.RenderContainer;");
		content.push("");
		content.push("");
		content.push("class " + Runtime.rtl.toStr(model_short_name) + Runtime.rtl.toStr(" extends BasePageModel"));
		content.push("{");
		content.push("\tstring component = \"" + Runtime.rtl.toStr(component_name) + Runtime.rtl.toStr("\";"));
		content.push("\t");
		content.push("\t");
		content.push("\t/**");
		content.push("\t * Init widget settings");
		content.push("\t */");
		content.push("\tvoid initWidget(Dict params)");
		content.push("\t{");
		content.push("\t\tparent(params);");
		content.push("\t}");
		content.push("\t");
		content.push("\t");
		content.push("\t/**");
		content.push("\t * Build title");
		content.push("\t */");
		content.push("\tvoid buildTitle(RenderContainer container)");
		content.push("\t{");
		content.push("\t\tthis.layout.setPageTitle(\"Widget page\");");
		content.push("\t}");
		content.push("}");
		/* Save file */
		var file_content = Runtime.rs.join("\n", content);
		await Runtime.fs.saveFile(file_path, file_content);
	},
	/**
	 * Create component
	 */
	createComponent: async function(file_path, component_name)
	{
		/* Get content */
		var content = Runtime.Vector.from([]);
		content.push("<class name=\"" + Runtime.rtl.toStr(component_name) + Runtime.rtl.toStr("\">"));
		content.push("");
		content.push("<use name=\"Runtime.Widget.Section\" component=\"true\" />");
		content.push("");
		content.push("<style>");
		content.push(".main_section{");
		content.push("\tpadding-top: 20px;");
		content.push("\tpadding-bottom: 20px;");
		content.push("\tbackground-position: center top;");
		content.push("\tbackground-repeat: no-repeat;");
		content.push("\tbackground-size: cover;");
		content.push("}");
		content.push("</style>");
		content.push("");
		content.push("<template>");
		content.push("\t<div class=\"page\">");
		content.push("\t\t<Section class=\"main_section\">");
		content.push("\t\t\t<div class=\"page_text\" >Content</div>");
		content.push("\t\t</Section>");
		content.push("\t</div>");
		content.push("</template>");
		content.push("");
		content.push("</class>");
		/* Save file */
		var file_content = Runtime.rs.join("\n", content);
		await Runtime.fs.saveFile(file_path, file_content);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Load data */
		await this.loadItem();
		await this.loadData();
		/* Create widget */
		if (this.pk == null)
		{
			await this.createWidget();
			return Promise.resolve();
		}
		throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Method are not allowed"))
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		/* Load data */
		await this.loadItem();
		/* Load widget */
		await this.item.load(true);
		/* Remove files */
		var model_path = this.item.getModelPath();
		var component_path = this.item.getComponentPath();
		if (await Runtime.fs.isFile(model_path))
		{
			await Runtime.fs.unlink(model_path);
		}
		if (await Runtime.fs.isFile(component_path))
		{
			await Runtime.fs.unlink(component_path);
		}
		/* Remove widget */
		await this.module.removeWidget(this.item);
		/* Update assets */
		this.module.updateAssets();
		/* Save cache */
		await this.project.saveCache();
		/* Result */
		this.success();
	},
	_init: function()
	{
		Runtime.Widget.Crud.SaveApi.prototype._init.call(this);
		this.project = null;
		this.module = null;
	},
});
Object.assign(BayLang.Constructor.Backend.Api.WidgetSaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(BayLang.Constructor.Backend.Api.WidgetSaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.widget::save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.WidgetSaveApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
			"actionSave",
			"actionDelete",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSave")
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
		if (field_name == "actionDelete")
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.WidgetSaveApi);
window["BayLang.Constructor.Backend.Api.WidgetSaveApi"] = BayLang.Constructor.Backend.Api.WidgetSaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.WidgetSaveApi;