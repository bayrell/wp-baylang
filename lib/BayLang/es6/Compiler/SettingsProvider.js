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
if (typeof BayLang.Compiler == 'undefined') BayLang.Compiler = {};
BayLang.Compiler.SettingsProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
BayLang.Compiler.SettingsProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
BayLang.Compiler.SettingsProvider.prototype.constructor = BayLang.Compiler.SettingsProvider;
Object.assign(BayLang.Compiler.SettingsProvider.prototype,
{
	/**
	 * Returns modules
	 */
	getModules: function()
	{
		return this.modules;
	},
	/**
	 * Start
	 */
	start: async function()
	{
		this.project_json_path = Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().base_path,"project.json"]));
		await this.reload();
	},
	/**
	 * Check provider
	 */
	check: async function()
	{
		var file_name = this.project_json_path;
		var is_file = await Runtime.fs.isFile(file_name);
		if (!is_file)
		{
			throw new Runtime.Exceptions.RuntimeException("File '" + file_name + "' does not exists")
		}
		if (!this.config)
		{
			throw new Runtime.Exceptions.RuntimeException("File '" + file_name + "' contains error ")
		}
	},
	/**
	 * Read settings from file
	 */
	reload: async function()
	{
		var file_name = this.project_json_path;
		var is_file = await Runtime.fs.isFile(file_name);
		if (!is_file)
		{
			return Promise.resolve();
		}
		var file_content = await Runtime.fs.readFile(file_name);
		this.config = Runtime.rtl.json_decode(file_content);
		this.project_path = Runtime.rs.dirname(file_name);
		this.modules = Runtime.Map.from({});
		/* Load modules */
		await this.readModules(this.project_path, this.config);
	},
	/**
	 * Returns modules from config
	 */
	readModules: async function(config_path, config)
	{
		if (!config)
		{
			return Promise.resolve();
		}
		if (!config.has("modules"))
		{
			return Promise.resolve();
		}
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(config, "modules"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
		var modules_info = __v0.value();
		for (var i = 0; i < modules_info.count(); i++)
		{
			var __v1 = new Runtime.Monad(Runtime.rtl.attr(modules_info, i));
			__v1 = __v1.monad(Runtime.rtl.m_to("Runtime.Dict", Runtime.Map.from({})));
			var module_info = __v1.value();
			var __v2 = new Runtime.Monad(Runtime.rtl.attr(module_info, "src"));
			__v2 = __v2.monad(Runtime.rtl.m_to("string", ""));
			var module_src = __v2.value();
			var __v3 = new Runtime.Monad(Runtime.rtl.attr(module_info, "type"));
			__v3 = __v3.monad(Runtime.rtl.m_to("string", ""));
			var module_type = __v3.value();
			if (module_type == "module")
			{
				var module_path = Runtime.fs.join(Runtime.Vector.from([config_path,module_src]));
				var module = await this.readModule(module_path);
			}
			else if (module_type == "folder")
			{
				var folder_path = Runtime.fs.join(Runtime.Vector.from([config_path,module_src]));
				var folder_modules = await this.readModulesFromFolder(folder_path);
			}
		}
	},
	/**
	 * Read modules from folder
	 */
	readModulesFromFolder: async function(folder_path)
	{
		var file_names = await Runtime.fs.listDir(folder_path);
		for (var i = 0; i < file_names.count(); i++)
		{
			var file_name = Runtime.rtl.attr(file_names, i);
			var module_path = Runtime.fs.join(Runtime.Vector.from([folder_path,file_name]));
			await this.readModule(module_path);
		}
	},
	/**
	 * Read module from folder
	 */
	readModule: async function(module_path)
	{
		var module_json_path = Runtime.fs.join(Runtime.Vector.from([module_path,"module.json"]));
		var is_file = await Runtime.fs.isFile(module_json_path);
		if (!is_file)
		{
			return Promise.resolve(null);
		}
		var module_json_content = await Runtime.fs.readFile(module_json_path);
		var module_json = Runtime.rtl.json_decode(module_json_content);
		if (!module_json)
		{
			return Promise.resolve(null);
		}
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(module_json, "name"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var module_name = __v0.value();
		if (module_name == "")
		{
			return Promise.resolve(null);
		}
		/* Create module */
		var module = new BayLang.Compiler.Module(Runtime.Map.from({"name":module_name,"config":module_json,"path":module_path}));
		/* Read submodules */
		await this.readModules(module_path, module_json);
		/* Add module */
		if (module && !this.modules.has(module_name))
		{
			this.modules.set(module_name, module);
		}
		return Promise.resolve(module);
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
			var module_name = Runtime.rtl.attr(module_names, i);
			var module = Runtime.rtl.attr(this.modules, module_name);
			if (Runtime.rs.indexOf(file_name, module.path) == 0)
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
	 * Resolve source file.
	 * Find module, file_name by file
	 */
	resolveSourceFile: async function(file_path)
	{
		if (!await Runtime.fs.isFile(file_path))
		{
			return Promise.resolve(null);
		}
		var module = this.findModuleByFileName(file_path);
		if (!module)
		{
			return Promise.resolve(null);
		}
		var module_path = module.getModulePath();
		if (Runtime.rs.indexOf(file_path, module_path) != 0)
		{
			return Promise.resolve(null);
		}
		var module_ext_name = Runtime.rs.extname(file_path);
		var d = Runtime.Map.from({"file_path":file_path,"file_name":Runtime.rs.substr(file_path, Runtime.rs.strlen(module_path)),"module":module,"src_file_name":null,"ext_name":module_ext_name,"success":false});
		var module_src_path = module.getSourcePath();
		if (Runtime.rs.indexOf(file_path, module_src_path) != 0)
		{
			return Promise.resolve(d);
		}
		var src_file_name = Runtime.rs.substr(file_path, Runtime.rs.strlen(module_src_path));
		src_file_name = Runtime.rs.removeFirstSlash(src_file_name);
		d.set("src_file_name", src_file_name);
		if (module.checkExclude(src_file_name))
		{
			return Promise.resolve(d);
		}
		d.set("success", module.checkAllow(src_file_name));
		return Promise.resolve(d);
	},
	/**
	 * Compile file to lang
	 */
	compileFile: async function(file_path, lang, log_level)
	{
		if (log_level == undefined) log_level = 0;
		var file_info = await this.resolveSourceFile(file_path);
		if (!Runtime.rtl.attr(file_info, "success"))
		{
			return Promise.resolve(file_info);
		}
		if ((log_level & 2) == 2)
		{
			Runtime.io.print(file_path);
		}
		else if ((log_level & 1) == 1)
		{
			Runtime.io.print(Runtime.rtl.attr(file_info, "src_file_name"));
		}
		var ext_name = Runtime.rtl.attr(file_info, "ext_name");
		var container = Runtime.Map.from({"op_code":null,"success":false,"content":"","result":"","lang":""});
		/* Set content */
		var content = await Runtime.fs.readFile(file_path);
		container.set("content", content);
		if (ext_name == "bay")
		{
			var parser = new BayLang.LangBay.ParserBay();
			var op_code = BayLang.LangUtils.parse(parser, content);
			container.set("op_code", op_code);
		}
		var is_lang = (ext_name, lang) =>
		{
			/* ES6 */
			if (ext_name == "es6" && lang == "es6")
			{
				return true;
			}
			if (ext_name == "js" && lang == "es6")
			{
				return true;
			}
			/* NodeJS */
			if (ext_name == "node" && lang == "nodejs")
			{
				return true;
			}
			if (ext_name == "nodejs" && lang == "nodejs")
			{
				return true;
			}
			if (ext_name == "js" && lang == "nodejs")
			{
				return true;
			}
			/* PHP */
			if (ext_name == "php" && lang == "php")
			{
				return true;
			}
			return false;
		};
		var save_file = async (file_info, container) =>
		{
			var src_file_name = Runtime.rtl.attr(file_info, "src_file_name");
			var module = Runtime.rtl.attr(file_info, "module");
			var dest_path = module.resolveDestFile(this.project_path, src_file_name, container.get("lang"));
			if (dest_path == "")
			{
				return Promise.resolve(false);
			}
			/* Create directory if does not exists */
			var dir_name = Runtime.rs.dirname(dest_path);
			if (!await Runtime.fs.isDir(dir_name))
			{
				await Runtime.fs.mkdir(dir_name);
			}
			/* Save file */
			await Runtime.fs.saveFile(dest_path, Runtime.rtl.attr(container, "result"));
			if ((log_level & 2) == 2)
			{
				Runtime.io.print("=> " + Runtime.rtl.toStr(dest_path));
			}
			return Promise.resolve(true);
		};
		var languages = Runtime.Vector.from([]);
		if (lang == "")
		{
			var __v0 = new Runtime.Monad(Runtime.rtl.attr(this.config, "languages"));
			__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
			languages = __v0.value();
		}
		else
		{
			languages = Runtime.Vector.from([lang]);
		}
		for (var i = 0; i < languages.count(); i++)
		{
			var __v0 = new Runtime.Monad(Runtime.rtl.attr(languages, i));
			__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
			var lang_name = __v0.value();
			var op_code = Runtime.rtl.attr(container, "op_code");
			container.set("success", false);
			container.set("lang", lang_name);
			container.set("result", "");
			if (ext_name == "bay")
			{
				if (op_code)
				{
					var t = BayLang.LangUtils.createTranslator(lang_name);
					if (t)
					{
						container.set("result", BayLang.LangUtils.translate(t, op_code));
						container.set("success", true);
					}
				}
			}
			else if (is_lang(ext_name, lang_name))
			{
				container.set("result", container.get("content"));
				container.set("success", true);
			}
			if (container.get("success"))
			{
				await save_file(file_info, container, lang_name);
			}
		}
		if ((log_level & 2) == 2)
		{
			Runtime.io.print("Ok");
		}
		return Promise.resolve(file_info);
	},
	/**
	 * Compile module to lang
	 */
	compileModule: async function(module_name, lang)
	{
		if (lang == undefined) lang = "";
		if (!this.modules.has(module_name))
		{
			Runtime.io.print_error("Module " + module_name + " not found");
			return Promise.resolve(false);
		}
		/* Get module */
		var module = this.modules.get(module_name);
		var module_src_path = module.getSourcePath();
		var is_success = true;
		/* Read files */
		var files = await Runtime.fs.listDirRecursive(module_src_path);
		for (var i = 0; i < files.count(); i++)
		{
			var file_name = Runtime.rtl.attr(files, i);
			var file_path = Runtime.fs.join(Runtime.Vector.from([module_src_path,file_name]));
			if (module.checkExclude(file_name))
			{
				continue;
			}
			if (!await Runtime.fs.isFile(file_path))
			{
				continue;
			}
			try
			{
				await this.compileFile(file_path, lang, 1);
			}
			catch (_ex)
			{
				if (_ex instanceof BayLang.Exceptions.ParserUnknownError)
				{
					var e = _ex;
					
					Runtime.io.print_error(e.toString());
					is_success = false;
				}
				else if (true)
				{
					var e = _ex;
					
					Runtime.io.print_error(e);
					is_success = false;
				}
				else
				{
					throw _ex;
				}
			}
		}
		if (is_success)
		{
			await this.updateModule(module_name);
		}
		return Promise.resolve(is_success);
	},
	/**
	 * Update module
	 */
	updateModule: async function(module_name)
	{
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(this.config, "languages"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
		var languages = __v0.value();
		if (languages.indexOf("es6") == -1)
		{
			return Promise.resolve(-1);
		}
		if (!this.modules.has(module_name))
		{
			Runtime.io.print_error("Module " + module_name + " not found");
			return Promise.resolve(-1);
		}
		/* Make assets by module name */
		var assets = this.getAssetsByModule(module_name);
		for (var i = 0; i < assets.count(); i++)
		{
			await this.makeAsset(assets.get(i));
		}
		return Promise.resolve(0);
	},
	/**
	 * Get assets by module name
	 */
	getAssetsByModule: function(module_name)
	{
		var module = Runtime.rtl.attr(this.modules, module_name);
		/* Find assets by module */
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(this.config, "assets"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
		var assets = __v0.value();
		assets = assets.filter((asset) =>
		{
			if (!asset.has("modules"))
			{
				return false;
			}
			/* Check module in modules names */
			var __v1 = new Runtime.Monad(Runtime.rtl.attr(asset, "modules"));
			__v1 = __v1.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
			var modules = __v1.value();
			if (!module.inModuleList(modules))
			{
				return false;
			}
			return true;
		});
		return assets;
	},
	/**
	 * Returns modules by group name
	 */
	getGroupModules: function(group_name)
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
			/* Add required modules */
			var module = this.modules.get(module_name);
			if (module.config.has("require"))
			{
				var required_modules = module.config.get("require");
				for (var i = 0; i < required_modules.count(); i++)
				{
					add_module(required_modules.get(i));
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
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(asset, "modules"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
		var modules = __v0.value();
		/* Extends modules */
		var new_modules = Runtime.Vector.from([]);
		modules.each((module_name) =>
		{
			if (Runtime.rs.substr(module_name, 0, 1) == "@")
			{
				/* Get group modules by name */
				var group_modules = this.getGroupModules(module_name);
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
	 * Make assets
	 */
	makeAsset: async function(asset)
	{
		var modules = this.getAssetModules(asset);
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(asset, "dest"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var asset_path_relative = __v0.value();
		if (asset_path_relative == "")
		{
			return Promise.resolve();
		}
		var asset_path = Runtime.fs.join(Runtime.Vector.from([this.project_path,asset_path_relative]));
		var asset_content = "";
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = Runtime.rtl.attr(modules, i);
			var module = Runtime.rtl.attr(this.modules, module_name);
			if (module)
			{
				var __v1 = new Runtime.Monad(Runtime.rtl.attr(module.config, "assets"));
				__v1 = __v1.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
				var files = __v1.value();
				for (var j = 0; j < files.count(); j++)
				{
					var file_name = Runtime.rtl.attr(files, j);
					var file_source_path = module.resolveSourceFile(file_name);
					var file_dest_path = module.resolveDestFile(this.project_path, file_name, "es6");
					if (file_dest_path == "")
					{
						continue;
					}
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
		Runtime.io.print("Bundle to => " + Runtime.rtl.toStr(asset_path_relative));
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.project_path = "";
		this.project_json_path = "";
		this.config = Runtime.Map.from({});
		this.modules = Runtime.Map.from({});
	},
});
Object.assign(BayLang.Compiler.SettingsProvider, Runtime.BaseProvider);
Object.assign(BayLang.Compiler.SettingsProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.SettingsProvider";
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
Runtime.rtl.defClass(BayLang.Compiler.SettingsProvider);
window["BayLang.Compiler.SettingsProvider"] = BayLang.Compiler.SettingsProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.SettingsProvider;