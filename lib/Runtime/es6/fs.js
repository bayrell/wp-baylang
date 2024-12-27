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
if (typeof Runtime == 'undefined') Runtime = {};
const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');

const fileExists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const rename = promisify(fs.rename);
const symlink = promisify(fs.symlink);
const unlink = promisify(fs.unlink);
const lstat = promisify(fs.lstat);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
Runtime.fs = function()
{
};
Object.assign(Runtime.fs.prototype,
{
});
Object.assign(Runtime.fs,
{
	DIRECTORY_SEPARATOR: "/",
	/**
	 * Join
	 */
	join: function(arr)
	{
		var path = Runtime.rs.join(this.DIRECTORY_SEPARATOR, arr);
		path = Runtime.re.replace("\\/+", "/", path);
		path = Runtime.re.replace("\\/\\.\\/", "/", path);
		path = Runtime.re.replace("\\/+$", "", path);
		return path;
	},
	/**
	 * Return true if path is exists
	 * @param string path
	 * @param boolean
	 */
	exists: async function(filepath)
	{
		var is_exists = await fileExists(filepath);
		if (!is_exists) return Promise.resolve( false );
		return Promise.resolve( true );
	},
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean
	 */
	isDir: async function(filepath)
	{
		return await this.isFolder(filepath);
	},
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean
	 */
	isFolder: async function(filepath)
	{
		var is_exists = await fileExists(filepath);
		if (!is_exists) return Promise.resolve( false );
		
		filepath = resolve(filepath);
		var stat = await lstat(filepath);
		return Promise.resolve( stat.isDirectory() );
	},
	/**
	 * Return true if path is file
	 * @param string path
	 * @param boolean
	 */
	isFile: async function(filepath)
	{
		var is_exists = await fileExists(filepath);
		if (!is_exists) return Promise.resolve( false );
		
		filepath = resolve(filepath);
		var stat = await lstat(filepath);
		return Promise.resolve( stat.isFile() );
	},
	/**
	 * Read local file
	 */
	readFile: async function(filepath, ch)
	{
		if (ch == undefined) ch = "utf8";
		var content = await readFile( resolve(filepath), { "encoding": ch } );
		return Promise.resolve( content );
		return Promise.resolve("");
	},
	/**
	 * Save local file
	 */
	saveFile: async function(filepath, content, ch)
	{
		if (content == undefined) content = "";
		if (ch == undefined) ch = "utf8";
		await writeFile( resolve(filepath), content, { "encoding": ch } );
		return Promise.resolve("");
	},
	/**
	 * Rename file
	 */
	rename: async function(file_path, file_new_path)
	{
		await rename(file_path, file_new_path);
	},
	/**
	 * Remove file
	 */
	unlink: async function(file_path)
	{
		await unlink(file_path);
	},
	/**
	 * Scan directory
	 */
	listDir: async function(dirpath)
	{
		dirpath = resolve(dirpath);
		var Vector = use("Runtime.Vector");
		var arr = await readdir(dirpath);
		arr = arr.filter( (s) => s != "." && s != ".." ).sort();
		arr = Vector.from(arr);
		return Promise.resolve(arr);
		return Promise.resolve(null);
	},
	/**
	 * Scan directory recursive
	 */
	listDirRecursive: async function(dirpath, parent_name)
	{
		if (parent_name == undefined) parent_name = "";
		var res = new Runtime.Vector();
		var items = await this.listDir(dirpath);
		for (var i = 0; i < items.count(); i++)
		{
			var item_name = items.item(i);
			var item_path = this.join(Runtime.Vector.from([dirpath,item_name]));
			var item_name2 = this.join(Runtime.Vector.from([parent_name,item_name]));
			if (item_name == "." || item_name == "..")
			{
				continue;
			}
			item_name2 = Runtime.rs.removeFirstSlash(item_name2);
			res.push(item_name2);
			var is_dir = await this.isDir(item_path);
			if (is_dir)
			{
				var sub_items = await this.listDirRecursive(item_path, item_name2);
				res.appendItems(sub_items);
			}
		}
		return Promise.resolve(res);
	},
	/**
	 * Make dir recursive
	 */
	mkdir: async function(filepath, mode)
	{
		if (mode == undefined) mode = "755";
		filepath = resolve(filepath);
		var exists = await fileExists(filepath);
		if (!exists)
		{
			await mkdir(filepath, { "mode": mode, "recursive": true });
		}
		return Promise.resolve("");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.fs";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.fs);
window["Runtime.fs"] = Runtime.fs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.fs;