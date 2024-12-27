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
BayLang.Constructor.Backend.Api.CodeApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.CodeApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
BayLang.Constructor.Backend.Api.CodeApi.prototype.constructor = BayLang.Constructor.Backend.Api.CodeApi;
Object.assign(BayLang.Constructor.Backend.Api.CodeApi.prototype,
{
	/**
	 * Action before
	 */
	onActionBefore: async function()
	{
		/* Get project */
		var project_id = this.post_data.get("project_id");
		this.project = await BayLang.Constructor.Backend.ApiHook.getProject(project_id);
		if (!this.project)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(project_id, "Project"))
		}
		/* Load project */
		await this.project.load();
	},
	/**
	 * Returns files
	 */
	getFiles: async function()
	{
		var file_path = this.post_data.get("file_path");
		var project_path = this.project.getPath();
		var folder_path = Runtime.fs.join(Runtime.Vector.from([project_path,file_path]));
		/* Check file path */
		if (Runtime.rs.indexOf(folder_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* File not exists */
		if (!await Runtime.fs.isFolder(folder_path))
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* Get items */
		var items = Runtime.Vector.from([]);
		var files = await Runtime.fs.listDir(folder_path);
		for (var i = 0; i < files.count(); i++)
		{
			var item_name = files.get(i);
			var item_path = Runtime.fs.join(Runtime.Vector.from([folder_path,item_name]));
			var item_kind = "";
			if (await Runtime.fs.isFile(item_path))
			{
				item_kind = "file";
			}
			else if (await Runtime.fs.isDir(item_path))
			{
				item_kind = "dir";
			}
			items.push(Runtime.Map.from({"kind":item_kind,"file_name":item_name,"file_path":Runtime.fs.join(Runtime.Vector.from([file_path,item_name]))}));
		}
		/* Result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"items":items})}));
	},
	/**
	 * Returns file content
	 */
	getContent: async function()
	{
		var file_path = this.post_data.get("file_path");
		var project_path = this.project.getPath();
		var file_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,file_path]));
		/* Check file path */
		if (Runtime.rs.indexOf(file_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* File not exists */
		if (!await Runtime.fs.isFile(file_full_path))
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "File"))
		}
		/* Read file */
		var content = await Runtime.fs.readFile(file_full_path);
		/* Result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"file_path":file_path,"content":content})}));
	},
	/**
	 * Create
	 */
	create: async function()
	{
		var project_path = this.project.getPath();
		var parent_dir = this.post_data.get("file_path");
		var file_name = this.post_data.get("file_name");
		var file_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,parent_dir,file_name]));
		var kind = this.post_data.get("kind");
		/* Check file path */
		if (Runtime.rs.indexOf(file_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(Runtime.fs.join(Runtime.Vector.from([parent_dir,file_name])), "Folder"))
		}
		/* Create folder */
		if (kind == "dir" || kind == "folder")
		{
			await Runtime.fs.mkDir(file_full_path);
		}
		else
		{
			await Runtime.fs.saveFile(file_full_path, "");
		}
		this.success();
	},
	/**
	 * Rename
	 */
	rename: async function()
	{
		var project_path = this.project.getPath();
		var file_path = this.post_data.get("file_path");
		var file_new_name = this.post_data.get("file_new_name");
		var parent_dir = Runtime.rs.dirname(file_path);
		var file_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,file_path]));
		var file_new_path = Runtime.fs.join(Runtime.Vector.from([project_path,parent_dir,file_new_name]));
		/* Check file path */
		if (Runtime.rs.indexOf(file_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* Check file path */
		if (Runtime.rs.indexOf(file_new_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_new_name, "Folder"))
		}
		await Runtime.fs.rename(file_full_path, file_new_path);
		this.success();
	},
	/**
	 * Remove file
	 */
	remove: async function()
	{
		var project_path = this.project.getPath();
		var file_path = this.post_data.get("file_path");
		var file_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,file_path]));
		/* Check file path */
		if (Runtime.rs.indexOf(file_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* Remove file */
		if (await Runtime.fs.isFile(file_full_path))
		{
			await Runtime.fs.unlink(file_full_path);
		}
		else if (await Runtime.fs.isFolder(file_full_path))
		{
		}
		this.success();
	},
	/**
	 * Move file
	 */
	move: async function()
	{
		var project_path = this.project.getPath();
		var file_path = this.post_data.get("file_path");
		var dest_path = this.post_data.get("dest_path");
		var kind = this.post_data.get("kind");
		/* Get file name */
		var file_name = Runtime.rs.basename(file_path);
		/* Full path */
		var file_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,file_path]));
		var dest_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,dest_path]));
		/* Check file path */
		if (Runtime.rs.indexOf(file_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* Check dest path */
		if (Runtime.rs.indexOf(dest_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(dest_path, "Folder"))
		}
		/* Copy */
		if (kind == "copy")
		{
			if (await Runtime.fs.isFile(file_full_path))
			{
			}
			else
			{
			}
		}
		else
		{
			dest_full_path = Runtime.fs.join(Runtime.Vector.from([dest_full_path,file_name]));
			await Runtime.fs.rename(file_full_path, dest_full_path);
		}
		this.success();
	},
	/**
	 * Save file
	 */
	saveContent: async function()
	{
		var file_path = this.post_data.get("file_path");
		var project_path = this.project.getPath();
		var file_full_path = Runtime.fs.join(Runtime.Vector.from([project_path,file_path]));
		/* Check file path */
		if (Runtime.rs.indexOf(file_full_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_path, "Folder"))
		}
		/* Read file */
		var content = this.post_data.get("content");
		await Runtime.fs.saveFile(file_full_path, content);
		/* Compile file */
		var module = this.project.findModuleByFileName(file_full_path);
		if (module)
		{
			/* Init module */
			await module.init();
			/* Compile file */
			var relative_src_file_path = module.getRelativeSourcePath(file_full_path);
			if (relative_src_file_path)
			{
				var is_allow = module.checkAllow(relative_src_file_path);
				var is_exclude = module.checkExclude(relative_src_file_path);
				if (is_allow && !is_exclude)
				{
					try
					{
						await module.compile(relative_src_file_path);
						await module.updateAssets();
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
				}
			}
		}
		/* Result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"file_path":file_path})}));
	},
	_init: function()
	{
		Runtime.Web.BaseApi.prototype._init.call(this);
		this.project = null;
	},
});
Object.assign(BayLang.Constructor.Backend.Api.CodeApi, Runtime.Web.BaseApi);
Object.assign(BayLang.Constructor.Backend.Api.CodeApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.code";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.CodeApi";
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
			"getFiles",
			"getContent",
			"create",
			"rename",
			"remove",
			"move",
			"saveContent",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "getFiles")
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
		if (field_name == "getContent")
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
		if (field_name == "create")
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
		if (field_name == "rename")
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
		if (field_name == "remove")
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
		if (field_name == "move")
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
		if (field_name == "saveContent")
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.CodeApi);
window["BayLang.Constructor.Backend.Api.CodeApi"] = BayLang.Constructor.Backend.Api.CodeApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.CodeApi;