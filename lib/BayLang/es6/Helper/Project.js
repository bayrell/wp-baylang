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
BayLang.Helper.Project = function(project_path)
{
	Runtime.BaseObject.call(this);
	this.path = project_path;
};
BayLang.Helper.Project.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Helper.Project.prototype.constructor = BayLang.Helper.Project;
Object.assign(BayLang.Helper.Project.prototype,
{
	/**
	 * Init project
	 */
	init: async function()
	{
		this.info = null;
		var project_json_path = Runtime.fs.join(Runtime.Vector.from([this.path,"project.json"]));
		if (!await Runtime.fs.isFolder(this.path))
		{
			return Promise.resolve(false);
		}
		if (!await Runtime.fs.isFile(project_json_path))
		{
			return Promise.resolve(false);
		}
		/* Read file */
		var content = await Runtime.fs.readFile(project_json_path);
		var project_info = Runtime.rtl.json_decode(content);
		if (!project_info)
		{
			return Promise.resolve(false);
		}
		if (!project_info.has("name"))
		{
			return Promise.resolve(false);
		}
		this.info = project_info;
	},
	/**
	 * Returns project cache path
	 */
	getCachePath: function()
	{
		return (this.exists()) ? (Runtime.fs.join(Runtime.Vector.from([this.getPath(),".cache","cache.json"]))) : ("");
	},
	/**
	 * Read project from cache
	 */
	readCache: async function()
	{
		/* Get json path */
		var cache_path = this.getCachePath();
		if (!await Runtime.fs.isFile(cache_path))
		{
			return Promise.resolve(false);
		}
		/* Read file */
		var content = await Runtime.fs.readFile(cache_path);
		var data = Runtime.rtl.json_decode(content);
		if (!data)
		{
			return Promise.resolve(false);
		}
		/* Import data */
		var serializer = new Runtime.Serializer();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		serializer.setFlag(Runtime.Serializer.DECODE);
		this.serialize(serializer, data);
		return Promise.resolve(true);
	},
	/**
	 * Save project to cache
	 */
	saveCache: async function()
	{
		/* Get json folder */
		var cache_path = this.getCachePath();
		var folder_path = Runtime.rs.dirname(cache_path);
		if (!await Runtime.fs.isFolder(folder_path))
		{
			await Runtime.fs.mkdir(folder_path);
		}
		/* Create serializer */
		var serializer = new Runtime.SerializerJson();
		serializer.setFlag(Runtime.Serializer.JSON_PRETTY);
		/* Save cache to file */
		var content = serializer.encode(this);
		await Runtime.fs.saveFile(cache_path, content);
	},
	/**
	 * Process project cache
	 */
	serialize: function(serializer, data)
	{
		serializer.processItems(this, "modules", data, (serializer, module) =>
		{
			return new BayLang.Helper.Module(this, module.get("path"));
		});
	},
	/**
	 * Load object
	 */
	load: async function(is_force)
	{
		if (is_force == undefined) is_force = false;
		if (!this.exists())
		{
			return Promise.resolve();
		}
		var is_loaded = false;
		if (!is_force)
		{
			is_loaded = await this.readCache();
		}
		if (!is_loaded)
		{
			/* Read and load modules */
			await this.readModules();
			await this.loadModules();
			/* Save to cache */
			await this.saveCache();
		}
	},
	/**
	 * Returns true if project is exists
	 */
	exists: function()
	{
		return this.info != null;
	},
	/**
	 * Returns project path
	 */
	getPath: function()
	{
		return (this.exists()) ? (this.path) : ("");
	},
	/**
	 * Returns project file_name
	 */
	getID: function()
	{
		return (this.exists()) ? (Runtime.rs.basename(this.path)) : ("");
	},
	/**
	 * Returns project name
	 */
	getName: function()
	{
		return (this.exists()) ? (this.info.get("name")) : ("");
	},
	/**
	 * Set project name
	 */
	setName: function(name)
	{
		if (!this.exists())
		{
			return ;
		}
		this.info.set("name", name);
	},
	/**
	 * Returns project description
	 */
	getDescription: function()
	{
		return (this.exists()) ? (this.info.get("description")) : ("");
	},
	/**
	 * Set project description
	 */
	setDescription: function(description)
	{
		if (!this.exists())
		{
			return ;
		}
		this.info.set("description", description);
	},
	/**
	 * Returns project type
	 */
	getType: function()
	{
		return (this.exists()) ? (this.info.get("type")) : ("");
	},
	/**
	 * Set project type
	 */
	setType: function(project_type)
	{
		if (!this.exists())
		{
			return ;
		}
		this.info.set("type", project_type);
	},
	/**
	 * Returns assets
	 */
	getAssets: function()
	{
		return (this.exists()) ? (this.info.get("assets")) : (Runtime.Vector.from([]));
	},
	/**
	 * Returns languages
	 */
	getLanguages: function()
	{
		return (this.exists()) ? (this.info.get("languages")) : (Runtime.Vector.from([]));
	},
	/**
	 * Returns module
	 */
	getModule: function(module_name)
	{
		return this.modules.get(module_name);
	},
	/**
	 * Returns modules by group name
	 */
	getModulesByGroupName: function(group_name)
	{
		/* Get modules */
		var modules = this.modules.transition((module, module_name) =>
		{
			return module;
		});
		/* Filter modules by group */
		modules = modules.filter((module) =>
		{
			return module.hasGroup(group_name);
		});
		/* Get names */
		modules = modules.map(Runtime.lib.attr("name"));
		/* Return modules */
		return modules;
	},
	/**
	 * Returns widget
	 */
	getWidget: async function(widget_name)
	{
		if (!this.modules)
		{
			return Promise.resolve(null);
		}
		/* Find widget by name */
		var modules = this.modules.keys().sort();
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.get(i);
			var module = this.modules.get(module_name);
			var widget = module.getWidget(widget_name);
			if (widget)
			{
				return Promise.resolve(widget);
			}
		}
		return Promise.resolve(null);
	},
	/**
	 * Save project
	 */
	saveInfo: async function()
	{
		var project_json_path = Runtime.fs.join(Runtime.Vector.from([this.path,"project.json"]));
		var content = Runtime.rtl.json_encode(this.info, Runtime.rtl.JSON_PRETTY);
		await Runtime.fs.saveFile(project_json_path, content);
	},
	/**
	 * Find module by file name
	 */
	findModuleByFileName: function(file_name)
	{
		var res = null;
		var module_path_sz = -1;
		var module_names = this.modules.keys();
		for (var i = 0; i < module_names.count(); i++)
		{
			var module_name = module_names.get(i);
			var module = this.modules.get(module_name);
			if (module.checkFile(file_name))
			{
				var sz = Runtime.rs.strlen(module.path);
				if (module_path_sz < sz)
				{
					module_path_sz = sz;
					res = module;
				}
			}
		}
		return res;
	},
	/**
	 * Load modules
	 */
	loadModules: async function()
	{
		var modules = this.modules.keys().sort();
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.get(i);
			var module = this.modules.get(module_name);
			await module.loadRoutes();
		}
	},
	/**
	 * Read modules
	 */
	readModules: async function()
	{
		if (!this.exists())
		{
			return Promise.resolve();
		}
		this.modules = Runtime.Map.from({});
		/* Read sub modules */
		await this.readSubModules(this.path, this.info.get("modules"));
	},
	/**
	 * Read sub modules
	 */
	readSubModules: async function(path, items)
	{
		if (!items)
		{
			return Promise.resolve();
		}
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			var module_src = item.get("src");
			var module_type = item.get("type");
			var folder_path = Runtime.fs.join(Runtime.Vector.from([path,module_src]));
			/* Read from folder */
			if (module_type == "folder")
			{
				await this.readModuleFromFolder(folder_path);
			}
			else
			{
				var module = BayLang.Helper.Module.readModule(this, folder_path);
				if (module)
				{
					/* Set module */
					this.modules.set(module.getName(), module);
					/* Read sub modules */
					await this.readSubModules(module.getPath(), module.submodules);
				}
			}
		}
	},
	/**
	 * Read sub modules
	 */
	readModuleFromFolder: async function(folder_path)
	{
		if (!await Runtime.fs.isFolder(folder_path))
		{
			return Promise.resolve();
		}
		var items = await Runtime.fs.listDir(folder_path);
		for (var i = 0; i < items.count(); i++)
		{
			var file_name = items.get(i);
			if (file_name == ".")
			{
				continue;
			}
			if (file_name == "..")
			{
				continue;
			}
			/* Read module */
			var module = BayLang.Helper.Module.readModule(this, Runtime.fs.join(Runtime.Vector.from([folder_path,file_name])));
			if (module)
			{
				/* Set module */
				this.modules.set(module.getName(), module);
				/* Read sub modules */
				this.readSubModules(module.getPath(), module.submodules);
			}
		}
	},
	/**
	 * Sort modules
	 */
	sortRequiredModules: function(modules)
	{
		var result = Runtime.Vector.from([]);
		var add_module;
		add_module = (module_name) =>
		{
			if (modules.indexOf(module_name) == -1)
			{
				return ;
			}
			/* Get module by name */
			var module = this.modules.get(module_name);
			if (!module)
			{
				return ;
			}
			/* Add required modules */
			if (module.required_modules != null)
			{
				for (var i = 0; i < module.required_modules.count(); i++)
				{
					add_module(module.required_modules.get(i));
				}
			}
			/* Add module if not exists */
			if (result.indexOf(module_name) == -1)
			{
				result.push(module_name);
			}
		};
		for (var i = 0; i < modules.count(); i++)
		{
			add_module(modules.get(i));
		}
		return result;
	},
	/**
	 * Returns assets modules
	 */
	getAssetModules: function(asset)
	{
		var modules = asset.get("modules");
		/* Extends modules */
		var new_modules = Runtime.Vector.from([]);
		modules.each((module_name) =>
		{
			if (Runtime.rs.substr(module_name, 0, 1) == "@")
			{
				/* Get group modules by name */
				var group_modules = this.getModulesByGroupName(module_name);
				/* Append group modules */
				new_modules.appendItems(group_modules);
			}
			else
			{
				new_modules.push(module_name);
			}
		});
		modules = new_modules.removeDuplicates();
		/* Sort modules by requires */
		modules = this.sortRequiredModules(modules);
		return modules;
	},
	/**
	 * Build asset
	 */
	buildAsset: async function(asset)
	{
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(asset, "dest"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var asset_path_relative = __v0.value();
		if (asset_path_relative == "")
		{
			return Promise.resolve();
		}
		/* Get asset dest path */
		var asset_path = Runtime.fs.join(Runtime.Vector.from([this.path,asset_path_relative]));
		var asset_content = "";
		/* Get modules names in asset */
		var modules = this.getAssetModules(asset);
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.get(i);
			var module = this.modules.get(module_name);
			if (!module)
			{
				continue;
			}
			/* Get files */
			for (var j = 0; j < module.assets.count(); j++)
			{
				var file_name = module.assets.get(j);
				var file_source_path = module.resolveSourceFilePath(file_name);
				var file_dest_path = module.resolveDestFilePath(file_name, "es6");
				if (file_dest_path)
				{
					if (await Runtime.fs.isFile(file_dest_path))
					{
						var content = await Runtime.fs.readFile(file_dest_path);
						asset_content += Runtime.rtl.toStr(content + Runtime.rtl.toStr("\n"));
					}
					else if (await Runtime.fs.isFile(file_source_path) && Runtime.rs.extname(file_source_path) == "js")
					{
						var content = await Runtime.fs.readFile(file_source_path);
						asset_content += Runtime.rtl.toStr(content + Runtime.rtl.toStr("\n"));
					}
				}
			}
		}
		/* Create directory if does not exists */
		var dir_name = Runtime.rs.dirname(asset_path);
		if (!await Runtime.fs.isDir(dir_name))
		{
			await Runtime.fs.mkdir(dir_name);
		}
		/* Save file */
		await Runtime.fs.saveFile(asset_path, asset_content);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.path = "";
		this.info = null;
		this.modules = null;
	},
});
Object.assign(BayLang.Helper.Project, Runtime.BaseObject);
Object.assign(BayLang.Helper.Project,
{
	/**
	 * Read projects
	 */
	readProjects: async function(projects_path)
	{
		if (!await Runtime.fs.isFolder(projects_path))
		{
			return Promise.resolve(Runtime.Vector.from([]));
		}
		var result = Runtime.Vector.from([]);
		var items = await Runtime.fs.listDir(projects_path);
		for (var i = 0; i < items.count(); i++)
		{
			var file_name = items.get(i);
			if (file_name == ".")
			{
				continue;
			}
			if (file_name == "..")
			{
				continue;
			}
			var project = await this.readProject(Runtime.fs.join(Runtime.Vector.from([projects_path,file_name])));
			if (project)
			{
				result.push(project);
			}
		}
		return Promise.resolve(result);
	},
	/**
	 * Read project from folder
	 */
	readProject: async function(project_path)
	{
		var project = new BayLang.Helper.Project(project_path);
		await project.init();
		if (!project.exists())
		{
			return Promise.resolve(null);
		}
		return Promise.resolve(project);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Helper";
	},
	getClassName: function()
	{
		return "BayLang.Helper.Project";
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
		BayLang.Helper.CacheInterface,
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(BayLang.Helper.Project);
window["BayLang.Helper.Project"] = BayLang.Helper.Project;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Helper.Project;