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
if (typeof BayLang.Constructor.Console == 'undefined') BayLang.Constructor.Console = {};
if (typeof BayLang.Constructor.Console.Commands == 'undefined') BayLang.Constructor.Console.Commands = {};
BayLang.Constructor.Console.Commands.NginxUpdate = function()
{
	Runtime.Console.BaseCommand.apply(this, arguments);
};
BayLang.Constructor.Console.Commands.NginxUpdate.prototype = Object.create(Runtime.Console.BaseCommand.prototype);
BayLang.Constructor.Console.Commands.NginxUpdate.prototype.constructor = BayLang.Constructor.Console.Commands.NginxUpdate;
Object.assign(BayLang.Constructor.Console.Commands.NginxUpdate.prototype,
{
});
Object.assign(BayLang.Constructor.Console.Commands.NginxUpdate, Runtime.Console.BaseCommand);
Object.assign(BayLang.Constructor.Console.Commands.NginxUpdate,
{
	/**
	 * Returns name
	 */
	getName: function()
	{
		return "nginx_update";
	},
	/**
	 * Returns description
	 */
	getDescription: function()
	{
		return "Update nginx";
	},
	/**
	 * Run task
	 */
	run: async function()
	{
		var projects = await BayLang.Helper.Project.readProjects(Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().env("constructor_path"),"projects"])));
		var result = Runtime.Vector.from([]);
		for (var i = 0; i < projects.count(); i++)
		{
			this.addProject(result, projects.get(i));
		}
		/* Update nginx file */
		var content = Runtime.rs.join("\n", result);
		var nginx_path = Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().env("constructor_path"),"nginx.conf"]));
		var is_update = this.updateLocalFile(nginx_path, content);
		/* Restart nginx */
		if (is_update)
		{
			this.nginxReload();
		}
		return Promise.resolve(this.SUCCESS);
	},
	/**
	 * Add project
	 */
	addProject: async function(result, project)
	{
		var project_name = project.getID();
		result.push("# Project " + Runtime.rtl.toStr(project_name));
		result.push("location /project/" + Runtime.rtl.toStr(project_name) + Runtime.rtl.toStr("/open/assets/ {"));
		result.push("\talias /data/constructor/projects/" + Runtime.rtl.toStr(project_name) + Runtime.rtl.toStr("/src/public/assets/;"));
		result.push("\tbreak;");
		result.push("}");
		/* Entry points */
		var entry_points = project.getEntryPoints();
		if (entry_points)
		{
			for (var i = 0; i < entry_points.count(); i++)
			{
				var entry_point = entry_points.get(i);
				var url = entry_point.get("url");
				var file = entry_point.get("file");
				var location = "/project/" + Runtime.rtl.toStr(project_name) + Runtime.rtl.toStr("/open") + Runtime.rtl.toStr(url);
				location = Runtime.rs.removeLastSlash(location);
				result.push("location " + Runtime.rtl.toStr(location) + Runtime.rtl.toStr("/ {"));
				result.push("\tinclude fastcgi_params;");
				result.push("\troot /data/constructor/projects/" + Runtime.rtl.toStr(project_name) + Runtime.rtl.toStr("/src/public;"));
				result.push("\tfastcgi_param SCRIPT_FILENAME $document_root/" + Runtime.rtl.toStr(file) + Runtime.rtl.toStr(";"));
				result.push("\tfastcgi_param HTTP_X_FORWARDED_PREFIX $http_x_forwarded_prefix" + Runtime.rtl.toStr(location) + Runtime.rtl.toStr(";"));
				result.push("\tbreak;");
				result.push("}");
			}
		}
	},
	/**
	 * Update local file
	 */
	updateLocalFile: async function(file_name, new_content)
	{
		var old_content = "";
		var file_exists = await Runtime.fs.isFile(file_name);
		if (file_exists)
		{
			old_content = await Runtime.fs.readFile(file_name);
		}
		if (old_content != new_content || !file_exists)
		{
			await Runtime.fs.saveFile(file_name, new_content);
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	},
	/**
	 * Reload nginx
	 */
	nginxReload: async function()
	{
		Runtime.io.print("Reload nginx");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Console.Commands";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Console.Commands.NginxUpdate";
	},
	getParentClassName: function()
	{
		return "Runtime.Console.BaseCommand";
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
Runtime.rtl.defClass(BayLang.Constructor.Console.Commands.NginxUpdate);
window["BayLang.Constructor.Console.Commands.NginxUpdate"] = BayLang.Constructor.Console.Commands.NginxUpdate;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Console.Commands.NginxUpdate;