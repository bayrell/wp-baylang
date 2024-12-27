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
if (typeof BayLang.Helper == 'undefined') BayLang.Helper = {};
BayLang.Helper.Module = function(project, module_path)
{
	Runtime.BaseObject.call(this);
	this.path = module_path;
	this.project = project;
};
BayLang.Helper.Module.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Helper.Module.prototype.constructor = BayLang.Helper.Module;
Object.assign(BayLang.Helper.Module.prototype,
{
	/**
	 * Init module
	 */
	init: async function()
	{
		this.is_exists = false;
		if (!await Runtime.fs.isFolder(this.path))
		{
			return Promise.resolve(false);
		}
		/* Module json file */
		var module_json_path = this.path + Runtime.rtl.toStr("/") + Runtime.rtl.toStr("module.json");
		if (!await Runtime.fs.isFile(module_json_path))
		{
			return Promise.resolve(false);
		}
		/* Read file */
		var content = await Runtime.fs.readFile(module_json_path);
		var module_info = Runtime.rtl.json_decode(content);
		if (!module_info)
		{
			return Promise.resolve(false);
		}
		if (!module_info.has("name"))
		{
			return Promise.resolve(false);
		}
		this.is_exists = true;
		this.name = module_info.get("name");
		this.dest_path = module_info.get("dest");
		this.src_path = module_info.get("src");
		this.allow = module_info.get("allow");
		this.assets = module_info.get("assets");
		this.groups = module_info.get("groups");
		this.required_modules = module_info.get("require");
		this.submodules = module_info.get("modules");
		this.exclude = module_info.get("exclude");
		/* Load widgets */
		this.widgets = Runtime.Vector.from([]);
		if (module_info.has("widgets"))
		{
			var widgets = module_info.get("widgets");
			this.widgets = module_info.get("widgets").map((item) =>
			{
				var widget = new BayLang.Helper.Widget(this);
				widget.kind = item.get("kind");
				widget.name = item.get("name");
				return widget;
			});
		}
		return Promise.resolve(true);
	},
	/**
	 * Process project cache
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "is_exists", data);
		serializer.process(this, "assets", data);
		serializer.process(this, "groups", data);
		serializer.process(this, "name", data);
		serializer.process(this, "path", data);
		serializer.process(this, "routes", data);
		serializer.process(this, "dest_path", data);
		serializer.process(this, "src_path", data);
		serializer.process(this, "required_modules", data);
		serializer.process(this, "submodules", data);
		serializer.processItems(this, "widgets", data, (widget) =>
		{
			return new BayLang.Helper.Widget(this);
		});
	},
	/**
	 * Returns true if module is exists
	 */
	exists: function()
	{
		return this.is_exists;
	},
	/**
	 * Returns module path
	 */
	getPath: function()
	{
		return this.path;
	},
	/**
	 * Returns module name
	 */
	getName: function()
	{
		return this.name;
	},
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return (this.routes) ? (this.routes) : (Runtime.Vector.from([]));
	},
	/**
	 * Returns route by name
	 */
	getRoute: function(route_name)
	{
		return this.getRoutes().findItem(Runtime.lib.equalAttr("name", route_name));
	},
	/**
	 * Returns widgets
	 */
	getWidgets: function()
	{
		return (this.widgets) ? (this.widgets) : (Runtime.Vector.from([]));
	},
	/**
	 * Returns widget by name
	 */
	getWidget: function(widget_name)
	{
		return this.getWidgets().findItem(Runtime.lib.equalAttr("name", widget_name));
	},
	/**
	 * Returns source folder path
	 */
	getSourceFolderPath: function()
	{
		return (this.src_path) ? (Runtime.fs.join(Runtime.Vector.from([this.getPath(),this.src_path]))) : (null);
	},
	/**
	 * Returns dest folder path
	 */
	getDestFolderPath: function(lang)
	{
		if (!this.dest_path.has(lang))
		{
			return "";
		}
		return Runtime.fs.join(Runtime.Vector.from([this.getPath(),this.dest_path.get(lang)]));
	},
	/**
	 * Returns relative source path
	 */
	getRelativeSourcePath: function(file_path)
	{
		var source_path = this.getSourceFolderPath();
		if (!source_path)
		{
			return null;
		}
		var source_path_sz = Runtime.rs.strlen(source_path);
		if (Runtime.rs.substr(file_path, 0, source_path_sz) != source_path)
		{
			return null;
		}
		return Runtime.rs.addFirstSlash(Runtime.rs.substr(file_path, source_path_sz));
	},
	/**
	 * Returns true if module contains file
	 */
	checkFile: function(file_full_path)
	{
		return Runtime.rs.indexOf(file_full_path, this.path) == 0;
	},
	/**
	 * Check allow list
	 */
	checkAllow: function(file_name)
	{
		if (!this.allow)
		{
			return false;
		}
		var success = false;
		for (var i = 0; i < this.allow.count(); i++)
		{
			var file_match = this.allow.get(i);
			if (file_match == "")
			{
				continue;
			}
			var res = Runtime.re.match(file_match, file_name);
			/* Ignore */
			if (Runtime.rs.charAt(file_match, 0) == "!")
			{
				if (res)
				{
					success = false;
				}
			}
			else
			{
				if (res)
				{
					success = true;
				}
			}
		}
		return success;
	},
	/**
	 * Check exclude
	 */
	checkExclude: function(relative_src_file_path)
	{
		if (!this.exclude)
		{
			return false;
		}
		for (var i = 0; i < this.exclude.count(); i++)
		{
			var file_match = this.exclude.get(i);
			if (file_match == "")
			{
				continue;
			}
			file_match = Runtime.re.replace("\\/", "\\/", file_match);
			var res = Runtime.re.match(file_match, relative_src_file_path);
			if (res)
			{
				return true;
			}
		}
		return false;
	},
	/**
	 * Returns class name file path
	 */
	resolveClassName: function(class_name)
	{
		/* Check if class name start with module name */
		var module_name_sz = Runtime.rs.strlen(this.getName());
		if (Runtime.rs.substr(class_name, 0, module_name_sz) != this.getName())
		{
			return "";
		}
		/* Remove module name from class name */
		class_name = Runtime.rs.substr(class_name, module_name_sz);
		/* Return path to class name */
		var path = this.getSourceFolderPath();
		var arr = Runtime.rs.split(".", class_name);
		arr.prepend(path);
		return Runtime.fs.join(arr) + Runtime.rtl.toStr(".bay");
	},
	/**
	 * Resolve source path
	 */
	resolveSourceFilePath: function(relative_src_file_path)
	{
		return Runtime.fs.join(Runtime.Vector.from([this.getSourceFolderPath(),relative_src_file_path]));
	},
	/**
	 * Resolve dest path
	 */
	resolveDestFilePath: function(relative_src_file_path, lang)
	{
		var dest_folder_path = this.getDestFolderPath(lang);
		if (dest_folder_path == "")
		{
			return "";
		}
		/* Get dest file path */
		var dest_file_path = Runtime.fs.join(Runtime.Vector.from([dest_folder_path,relative_src_file_path]));
		/* Resolve extension */
		if (lang == "php")
		{
			dest_file_path = Runtime.re.replace("\\.bay$", ".php", dest_file_path);
			dest_file_path = Runtime.re.replace("\\.ui$", ".php", dest_file_path);
		}
		else if (lang == "es6")
		{
			dest_file_path = Runtime.re.replace("\\.bay$", ".js", dest_file_path);
			dest_file_path = Runtime.re.replace("\\.ui$", ".js", dest_file_path);
		}
		else if (lang == "nodejs")
		{
			dest_file_path = Runtime.re.replace("\\.bay$", ".js", dest_file_path);
			dest_file_path = Runtime.re.replace("\\.ui$", ".js", dest_file_path);
		}
		return dest_file_path;
	},
	/**
	 * Returns true if module has group
	 */
	hasGroup: function(group_name)
	{
		if (Runtime.rs.substr(group_name, 0, 1) != "@")
		{
			return false;
		}
		group_name = Runtime.rs.substr(group_name, 1);
		if (this.groups == null)
		{
			return false;
		}
		if (this.groups.indexOf(group_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Returns true if this module contains in module list include groups
	 */
	inModuleList: function(module_names)
	{
		for (var i = 0; i < module_names.count(); i++)
		{
			var module_name = module_names.get(i);
			if (this.name == module_name)
			{
				return true;
			}
			if (this.hasGroup(module_name))
			{
				return true;
			}
		}
		return false;
	},
	/**
	 * Rename module
	 */
	rename: function(new_module_name)
	{
		return ;
		if (!this.exists())
		{
			return ;
		}
		var new_file_name = Runtime.rs.lower(new_module_name);
		var old_file_name = this.file_name;
		/* Set new module name */
		this.info.set("name", new_module_name);
		/* Save file */
		var module_path = "/data/projects/" + Runtime.rtl.toStr(old_file_name);
		var module_json_path = module_path + Runtime.rtl.toStr("/") + Runtime.rtl.toStr("module.json");
		var content = Runtime.rtl.json_encode(this.info, Runtime.rtl.JSON_PRETTY);
		Runtime.fs.saveFile(module_json_path, content);
		/* Rename folder */
	},
	/**
	 * Compile file
	 */
	compile: async function(relative_src_file_path)
	{
		/* Get src file path */
		var src_file_path = this.resolveSourceFilePath(relative_src_file_path);
		if (src_file_path == "")
		{
			return Promise.resolve(false);
		}
		if (!this.checkFile(src_file_path))
		{
			return Promise.resolve(false);
		}
		/* Read file */
		if (!await Runtime.fs.isFile(src_file_path))
		{
			return Promise.resolve(false);
		}
		var file_content = await Runtime.fs.readFile(src_file_path);
		/* Parse file */
		var parser = new BayLang.LangBay.ParserBay();
		var res = parser.constructor.parse(parser, file_content);
		var file_op_code = res.get(1);
		if (!file_op_code)
		{
			return Promise.resolve(false);
		}
		/* Translate project languages */
		this.translateLanguages(relative_src_file_path, file_op_code);
		return Promise.resolve(true);
	},
	/**
	 * Translate file
	 */
	translateLanguages: async function(relative_src_file_path, op_code)
	{
		/* Translate project languages */
		var languages = this.project.getLanguages();
		for (var i = 0; i < languages.count(); i++)
		{
			var lang = languages.get(i);
			if (lang == "bay")
			{
				continue;
			}
			await this.translate(relative_src_file_path, op_code, lang);
		}
	},
	/**
	 * Translate file
	 */
	translate: async function(relative_src_file_path, op_code, lang)
	{
		/* Get dest file path */
		var dest_file_path = this.resolveDestFilePath(relative_src_file_path, lang);
		if (dest_file_path == "")
		{
			return Promise.resolve(false);
		}
		/* Create translator */
		var translator = BayLang.LangUtils.createTranslator(lang);
		if (!translator)
		{
			return Promise.resolve(false);
		}
		/* Translate */
		var res = translator.constructor.translate(translator, op_code);
		var dest_file_content = res.get(1);
		/* Create dest folder if not exists */
		var dest_dir_name = Runtime.rs.dirname(dest_file_path);
		if (!await Runtime.fs.isFolder(dest_dir_name))
		{
			await Runtime.fs.mkdir(dest_dir_name);
		}
		/* Save file */
		await Runtime.fs.saveFile(dest_file_path, dest_file_content);
		return Promise.resolve(true);
	},
	/**
	 * Returns projects assets
	 */
	getProjectAssets: function()
	{
		var project_assets = this.project.getAssets();
		project_assets = project_assets.filter((asset) =>
		{
			if (!asset.has("modules"))
			{
				return false;
			}
			/* Check module in modules names */
			var modules = asset.get("modules");
			if (!modules)
			{
				return false;
			}
			if (!(modules instanceof Runtime.Collection))
			{
				return false;
			}
			if (!this.inModuleList(modules))
			{
				return false;
			}
			return true;
		});
		return project_assets;
	},
	/**
	 * Update assets
	 */
	updateAssets: async function()
	{
		var languages = this.project.getLanguages();
		if (languages.indexOf("es6") == -1)
		{
			return Promise.resolve();
		}
		/* Builds assets with current module */
		var project_assets = this.getProjectAssets();
		for (var i = 0; i < project_assets.count(); i++)
		{
			await this.project.buildAsset(project_assets.get(i));
		}
	},
	/**
	 * Load routes
	 */
	loadRoutes: async function()
	{
		var route_processor = new BayLang.Helper.RouteProcessor(this);
		await route_processor.load();
		this.routes = route_processor.getRoutes();
	},
	/**
	 * Add widget
	 */
	addWidget: async function(widget)
	{
		/* Add widget */
		this.widgets.push(widget);
		/* Get path */
		var model_path = Runtime.rs.removeFirstSlash(this.getRelativeSourcePath(widget.getModelPath()));
		var component_path = Runtime.rs.removeFirstSlash(this.getRelativeSourcePath(widget.getComponentPath()));
		/* Add assets to module.json */
		var module_json_path = this.path + Runtime.rtl.toStr("/") + Runtime.rtl.toStr("module.json");
		var content = await Runtime.fs.readFile(module_json_path);
		var module_info = Runtime.rtl.json_decode(content);
		if (module_info.get("assets").indexOf(model_path) == -1)
		{
			module_info.get("assets").push(model_path);
		}
		if (module_info.get("assets").indexOf(component_path) == -1)
		{
			module_info.get("assets").push(component_path);
		}
		/* Add widget to module.json */
		if (!module_info.has("widgets"))
		{
			module_info.set("widgets", Runtime.Vector.from([]));
		}
		module_info.get("widgets").push(Runtime.Map.from({"kind":widget.kind,"name":widget.name}));
		/* Save module.json */
		content = Runtime.rtl.json_encode(module_info, Runtime.Serializer.JSON_PRETTY);
		await Runtime.fs.saveFile(module_json_path, content);
		/* Add assets to cache */
		if (this.assets.indexOf(model_path) == -1)
		{
			this.assets.push(model_path);
		}
		if (this.assets.indexOf(component_path) == -1)
		{
			this.assets.push(component_path);
		}
	},
	/**
	 * Remove widget
	 */
	removeWidget: async function(widget)
	{
		/* Remove item */
		this.widgets.removeItem(widget);
		/* Get path */
		var model_path = Runtime.rs.removeFirstSlash(this.getRelativeSourcePath(widget.getModelPath()));
		var component_path = Runtime.rs.removeFirstSlash(this.getRelativeSourcePath(widget.getComponentPath()));
		/* Remove assets from module.json */
		var module_json_path = this.path + Runtime.rtl.toStr("/") + Runtime.rtl.toStr("module.json");
		var content = await Runtime.fs.readFile(module_json_path);
		var module_info = Runtime.rtl.json_decode(content);
		var assets = module_info.get("assets");
		for (var i = assets.count() - 1; i >= 0; i--)
		{
			var file_name = assets.get(i);
			if (file_name == model_path || file_name == component_path)
			{
				assets.remove(i);
			}
		}
		/* Remove widget from module.json */
		if (module_info.has("widgets"))
		{
			var widgets = module_info.get("widgets");
			var pos = widgets.find(Runtime.lib.equalAttr("name", widget.name));
			if (pos >= 0)
			{
				widgets.remove(pos);
			}
		}
		/* Save module.json */
		content = Runtime.rtl.json_encode(module_info, Runtime.Serializer.JSON_PRETTY);
		await Runtime.fs.saveFile(module_json_path, content);
		/* Remove assets from cache */
		for (var i = this.assets.count() - 1; i >= 0; i--)
		{
			var file_name = this.assets.get(i);
			if (file_name == model_path || file_name == component_path)
			{
				this.assets.remove(i);
			}
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.project = null;
		this.is_exists = false;
		this.path = "";
		this.src_path = "";
		this.dest_path = Runtime.Map.from({});
		this.name = "";
		this.submodules = null;
		this.allow = null;
		this.assets = null;
		this.required_modules = null;
		this.routes = null;
		this.groups = null;
		this.widgets = null;
		this.exclude = null;
	},
});
Object.assign(BayLang.Helper.Module, Runtime.BaseObject);
Object.assign(BayLang.Helper.Module,
{
	/**
	 * Read project from folder
	 */
	readModule: async function(project, path)
	{
		var module = new BayLang.Helper.Module(project, path);
		await module.init();
		if (!module.exists())
		{
			return Promise.resolve(null);
		}
		return Promise.resolve(module);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Helper";
	},
	getClassName: function()
	{
		return "BayLang.Helper.Module";
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
Runtime.rtl.defClass(BayLang.Helper.Module);
window["BayLang.Helper.Module"] = BayLang.Helper.Module;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Helper.Module;