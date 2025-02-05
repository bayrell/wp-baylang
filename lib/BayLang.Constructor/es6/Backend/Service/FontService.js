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
BayLang.Constructor.Backend.Service.FontService = function()
{
	Runtime.Widget.Crud.CrudService.apply(this, arguments);
};
BayLang.Constructor.Backend.Service.FontService.prototype = Object.create(Runtime.Widget.Crud.CrudService.prototype);
BayLang.Constructor.Backend.Service.FontService.prototype.constructor = BayLang.Constructor.Backend.Service.FontService;
Object.assign(BayLang.Constructor.Backend.Service.FontService.prototype,
{
	/**
	 * Init rules
	 */
	initRules: function()
	{
		this.rules.addRules(Runtime.Vector.from([new Runtime.Widget.Crud.Rules.MatchRule(Runtime.Map.from({"name":"api_name","regular":Runtime.Widget.Crud.Rules.MatchRule.ALPHA_NUMERIC_DASH})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"name"}))]));
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["name","css"]);
	},
	/**
	 * Returns primary key
	 */
	getPrimaryKey: function(item)
	{
		return Runtime.Map.from({"name":item.get("name")});
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
	 * New item
	 */
	newItem: async function()
	{
		return Runtime.Map.from({"exists":false,"files":Runtime.Vector.from([])});
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		if (pk == null)
		{
			return Promise.resolve(null);
		}
		var font_name = pk.get("name");
		var font_path = Runtime.fs.join(Runtime.Vector.from([this.fonts_path,font_name]));
		if (!await Runtime.fs.isDir(font_path))
		{
			return Promise.resolve(null);
		}
		return Promise.resolve(Runtime.Map.from({"exists":true,"name":font_name,"path":font_path,"files":Runtime.Vector.from([])}));
	},
	/**
	 * Load item
	 */
	loadItem: async function(pk, create_instance)
	{
		if (create_instance == undefined) create_instance = true;
		await Runtime.Widget.Crud.CrudService.prototype.loadItem.call(this, pk, create_instance);
		/* Load css */
		var folder_path = this.item.get("path");
		var file_css_path = Runtime.fs.join(Runtime.Vector.from([folder_path,"style.scss"]));
		if (await Runtime.fs.exists(file_css_path))
		{
			var css_content = await Runtime.fs.readFile(file_css_path);
			this.item.set("css", css_content);
		}
		/* Load files */
		if (await Runtime.fs.exists(folder_path))
		{
			var files = await Runtime.fs.listDir(folder_path);
			files = files.map((name) =>
			{
				return Runtime.Map.from({"name":name});
			});
			this.item.set("files", files);
		}
	},
	/**
	 * Load items
	 */
	loadItems: async function()
	{
		/* Get items */
		this.items = Runtime.Vector.from([]);
		this.page = 0;
		this.pages = 1;
		if (await Runtime.fs.isDir(this.fonts_path))
		{
			this.items = await Runtime.fs.listDir(this.fonts_path);
			this.items = this.items.map((name) =>
			{
				return Runtime.Map.from({"name":name});
			});
		}
	},
	/**
	 * Rebuild assets
	 */
	rebuild: async function()
	{
		if (!await Runtime.fs.isDir(this.fonts_path))
		{
			return Promise.resolve();
		}
		/* Get items */
		var items = Runtime.Vector.from([]);
		items = await Runtime.fs.listDir(this.fonts_path);
		/* Read styles */
		var content = Runtime.Vector.from(["<!--"," *  Fonts","-->","","<class name=\"App.Components.Blocks.Fonts\">","<style>"]);
		for (var i = 0; i < items.count(); i++)
		{
			var font_name = items.get(i);
			var file_css_path = Runtime.fs.join(Runtime.Vector.from([this.fonts_path,font_name,"style.scss"]));
			if (await Runtime.fs.exists(file_css_path))
			{
				var css_content = await Runtime.fs.readFile(file_css_path);
				content.push(css_content);
			}
		}
		content.push("</style>");
		content.push("</class>");
		/* Find module */
		var file_path = Runtime.fs.join(Runtime.Vector.from([this.project.path,"src","App","bay","Components","Blocks","Fonts.bay"]));
		var module = this.project.findModuleByFileName(file_path);
		if (!module)
		{
			return Promise.resolve();
		}
		/* Save styles */
		await Runtime.fs.saveFile(file_path, Runtime.rs.join("\n", content));
		/* Compile file */
		try
		{
			var relative_file_path = module.getRelativeSourcePath(file_path);
			await module.compile(relative_file_path);
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserUnknownError)
			{
				var e = _ex;
				
				var error_str = e.getErrorMessage();
				var line = e.getErrorLine();
				var pos = e.getErrorPos();
				if (line != -1)
				{
					error_str += Runtime.rtl.toStr(" at Ln:" + Runtime.rtl.toStr(line) + Runtime.rtl.toStr(((pos != "") ? (", Pos:" + Runtime.rtl.toStr(pos)) : (""))));
				}
				throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException(error_str))
			}
			else
			{
				throw _ex;
			}
		}
		/* Update assets */
		await module.updateAssets();
		await BayLang.Constructor.Backend.ApiHook.updateAssets();
	},
	/**
	 * Save
	 */
	saveItem: async function()
	{
		var font_key = (this.pk) ? (this.pk.get("name")) : ("");
		var font_name = this.item.get("name");
		var font_path = Runtime.fs.join(Runtime.Vector.from([this.fonts_path,font_name]));
		/* Check folder is exists */
		var exists = this.item.get("exists");
		if (exists)
		{
			/* Rename folder */
			if (font_key != font_name)
			{
				var font_path_old = Runtime.fs.join(Runtime.Vector.from([this.fonts_path,font_key]));
				await Runtime.fs.rename(font_path_old, font_path);
			}
		}
		else
		{
			/* Create folder */
			await Runtime.fs.mkDir(font_path);
		}
		/* Save css */
		var css_content = this.item.get("css");
		if (css_content == "")
		{
			css_content = Runtime.rs.join("\n", Runtime.Vector.from(["@font-face {","  font-family: '" + Runtime.rtl.toStr(font_name) + Runtime.rtl.toStr("';"),"  font-weight: normal;","  font-style: normal;","  src: url(${ Component::assets('" + Runtime.rtl.toStr(font_name) + Runtime.rtl.toStr("/") + Runtime.rtl.toStr(font_name) + Runtime.rtl.toStr(".ttf') });"),"}"]));
		}
		var file_css_path = Runtime.fs.join(Runtime.Vector.from([font_path,"style.scss"]));
		await Runtime.fs.saveFile(file_css_path, css_content);
		/* Rebuild assets */
		await this.rebuild();
	},
	/**
	 * Delete item
	 */
	deleteItem: async function()
	{
		var font_name = this.item.get("name");
		var font_path = Runtime.fs.join(Runtime.Vector.from([this.fonts_path,font_name]));
	},
	/**
	 * Upload file
	 */
	uploadFile: async function(file)
	{
		/* Create file */
		var folder_path = this.item.get("path");
		var file_upload_path = Runtime.fs.join(Runtime.Vector.from([folder_path,file.getName()]));
		var content = await Runtime.fs.readFile(file.getPath());
		await Runtime.fs.saveFile(file_upload_path, content);
	},
	/**
	 * Delete file
	 */
	deleteFile: async function(file_name)
	{
		/* Upload file */
		var folder_path = this.item.get("path");
		var file_path = Runtime.fs.join(Runtime.Vector.from([folder_path,file_name]));
		/* Remove file */
		if (await Runtime.fs.exists(file_path))
		{
			await Runtime.fs.unlink(file_path);
		}
	},
	_init: function()
	{
		Runtime.Widget.Crud.CrudService.prototype._init.call(this);
		this.project = null;
		this.assets_path = "";
		this.fonts_path = "";
	},
});
Object.assign(BayLang.Constructor.Backend.Service.FontService, Runtime.Widget.Crud.CrudService);
Object.assign(BayLang.Constructor.Backend.Service.FontService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Service";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Service.FontService";
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Service.FontService);
window["BayLang.Constructor.Backend.Service.FontService"] = BayLang.Constructor.Backend.Service.FontService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Service.FontService;