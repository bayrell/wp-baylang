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
if (typeof BayLang.Constructor.Backend.Service == 'undefined') BayLang.Constructor.Backend.Service = {};
BayLang.Constructor.Backend.Service.WidgetService = function()
{
	Runtime.Widget.Crud.CrudService.apply(this, arguments);
};
BayLang.Constructor.Backend.Service.WidgetService.prototype = Object.create(Runtime.Widget.Crud.CrudService.prototype);
BayLang.Constructor.Backend.Service.WidgetService.prototype.constructor = BayLang.Constructor.Backend.Service.WidgetService;
Object.assign(BayLang.Constructor.Backend.Service.WidgetService.prototype,
{
	/**
	 * Init rules
	 */
	initRules: function()
	{
		this.rules.addRules(Runtime.Vector.from([new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"id"})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"module_id"}))]));
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["id","module_id"]);
	},
	/**
	 * Load project
	 */
	loadProject: async function(project_id)
	{
		this.project = await BayLang.Constructor.Backend.ApiHook.getProject(project_id);
		if (!this.project)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(project_id, "Project"))
		}
		/* Load project */
		await this.project.load();
		/* Get fonts path */
		this.assets_path = BayLang.Constructor.Backend.ApiHook.getAssetsPath(this.project);
		this.fonts_path = Runtime.fs.join(Runtime.Vector.from([this.assets_path,"fonts"]));
	},
	/**
	 * Load module
	 */
	loadModule: async function(module_id)
	{
		this.module = this.project.getModule(module_id);
		if (!this.module)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(module_id, "Module"))
		}
	},
	/**
	 * New item
	 */
	newItem: async function()
	{
		return new BayLang.Helper.Widget(this.module);
	},
	/**
	 * Set item
	 */
	setItemValue: function(item, key, value)
	{
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		var widget_name = pk.get("id");
		return Promise.resolve(this.project.getWidget(widget_name));
	},
	/**
	 * Load item
	 */
	loadItem: async function(pk, create_instance)
	{
		if (create_instance == undefined) create_instance = false;
		await Runtime.Widget.Crud.CrudService.prototype.loadItem.call(this, pk, create_instance);
		this.module = this.item.module;
	},
	/**
	 * Convert item
	 */
	convertItem: function(item, fields)
	{
		/* Get data */
		var data = Runtime.Map.from({"id":item.name,"module_id":item.module.getName()});
		return data.intersect(fields);
	},
	/**
	 * Load items
	 */
	loadItems: async function()
	{
		/* Get widgets */
		this.items = this.project.modules.transition((module) =>
		{
			return module;
		}).map((module) =>
		{
			return module.getWidgets();
		}).flatten();
		/* Sort widgets */
		this.page = 0;
		this.pages = 1;
		this.items = this.items.sort((a, b) =>
		{
			return Runtime.rs.compare(a.name, b.name);
		});
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
		if (!this.isCreate())
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Method are not allowed"))
		}
		await this.createWidget();
	},
	/**
	 * Create widget
	 */
	createWidget: async function()
	{
		var widget_name = this.data.get("id");
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
		this.item = this.newItem();
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
		await this.module.updateAssets();
		await BayLang.Constructor.Backend.ApiHook.updateAssets();
		/* Save cache */
		await this.project.saveCache();
	},
	/**
	 * Save file
	 */
	saveFile: async function(file_path, base64_content)
	{
		/* Get op_code */
		var serializer = new Runtime.SerializerBase64();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		var op_code = serializer.decode(base64_content);
		if (!op_code)
		{
			return Promise.resolve();
		}
		/* Translate */
		var translator = new BayLang.LangBay.TranslatorBay();
		var res = translator.constructor.translate(translator, op_code);
		var content = res.get(1);
		/* Save content */
		await Runtime.fs.saveFile(file_path, content);
		/* Compile file */
		var relative_src_file_path = this.module.getRelativeSourcePath(file_path);
		this.module.compile(relative_src_file_path);
		/* widget.module.translateLanguages(relative_src_file_path, op_code); */
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
	 * Delete item
	 */
	deleteItem: async function()
	{
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
		await this.module.updateAssets();
		await BayLang.Constructor.Backend.ApiHook.updateAssets();
		/* Save cache */
		await this.project.saveCache();
	},
	_init: function()
	{
		Runtime.Widget.Crud.CrudService.prototype._init.call(this);
		this.module = null;
		this.project = null;
		this.assets_path = "";
		this.fonts_path = "";
	},
});
Object.assign(BayLang.Constructor.Backend.Service.WidgetService, Runtime.Widget.Crud.CrudService);
Object.assign(BayLang.Constructor.Backend.Service.WidgetService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Service";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Service.WidgetService";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.CrudService";
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Service.WidgetService);
window["BayLang.Constructor.Backend.Service.WidgetService"] = BayLang.Constructor.Backend.Service.WidgetService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Service.WidgetService;