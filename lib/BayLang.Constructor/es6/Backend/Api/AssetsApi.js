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
BayLang.Constructor.Backend.Api.AssetsApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.AssetsApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
BayLang.Constructor.Backend.Api.AssetsApi.prototype.constructor = BayLang.Constructor.Backend.Api.AssetsApi;
Object.assign(BayLang.Constructor.Backend.Api.AssetsApi.prototype,
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
	 * Upload file
	 */
	uploadFile: async function()
	{
		var file = this.post_data.get("file");
		if (!file)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("File not found"))
		}
		/* Get path */
		var assets_path = BayLang.Constructor.Backend.ApiHook.getAssetsPath(this.project);
		var folder_name = this.post_data.get("path");
		var folder_path = Runtime.fs.join(Runtime.Vector.from([assets_path,folder_name]));
		var file_upload_path = Runtime.fs.join(Runtime.Vector.from([folder_path,file.getName()]));
		/* Create folder */
		if (!await Runtime.fs.exists(folder_path))
		{
			await Runtime.fs.mkdir(folder_path);
		}
		/* Create file */
		var content = await Runtime.fs.readFile(file.getPath());
		await Runtime.fs.saveFile(file_upload_path, content);
		/* Result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"path":Runtime.fs.join(Runtime.Vector.from([folder_name,file.getName()]))})}));
	},
	/**
	 * Remove file
	 */
	removeFile: async function()
	{
		var assets_path = BayLang.Constructor.Backend.ApiHook.getAssetsPath(this.project);
		var file_name = this.post_data.get("file_name");
		var file_path = Runtime.fs.join(Runtime.Vector.from([assets_path,"images",file_name]));
		/* Check file path */
		if (!await Runtime.fs.exists(file_path))
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(file_name, "File"))
		}
		/* Remove file */
		await Runtime.fs.unlink(file_path);
		/* Result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"file_name":file_name})}));
	},
	/**
	 * Returns files
	 */
	getFiles: async function()
	{
		var assets_path = BayLang.Constructor.Backend.ApiHook.getAssetsPath(this.project);
		var assets_url_path = BayLang.Constructor.Backend.ApiHook.getAssetsUrlPath(this.project);
		var folder_name = this.post_data.get("path");
		var folder_path = Runtime.fs.join(Runtime.Vector.from([assets_path,folder_name]));
		/* Check file path */
		if (Runtime.rs.indexOf(folder_path, "/..") != -1)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(folder_name, "Folder"))
		}
		/* File not exists */
		if (!await Runtime.fs.isFolder(folder_path))
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(folder_name, "Folder"))
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
			items.push(Runtime.Map.from({"kind":item_kind,"file_name":item_name,"file_path":Runtime.fs.join(Runtime.Vector.from([folder_name,item_name])),"url":Runtime.fs.join(Runtime.Vector.from([assets_url_path,folder_name,item_name]))}));
		}
		/* Result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"items":items,"path":folder_name})}));
	},
	_init: function()
	{
		Runtime.Web.BaseApi.prototype._init.call(this);
		this.project = null;
	},
});
Object.assign(BayLang.Constructor.Backend.Api.AssetsApi, Runtime.Web.BaseApi);
Object.assign(BayLang.Constructor.Backend.Api.AssetsApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.assets";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.AssetsApi";
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
			"uploadFile",
			"removeFile",
			"getFiles",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "uploadFile")
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
		if (field_name == "removeFile")
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
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.AssetsApi);
window["BayLang.Constructor.Backend.Api.AssetsApi"] = BayLang.Constructor.Backend.Api.AssetsApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.AssetsApi;