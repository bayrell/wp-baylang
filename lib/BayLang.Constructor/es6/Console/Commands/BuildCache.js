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
BayLang.Constructor.Console.Commands.BuildCache = function()
{
	Runtime.Console.BaseCommand.apply(this, arguments);
};
BayLang.Constructor.Console.Commands.BuildCache.prototype = Object.create(Runtime.Console.BaseCommand.prototype);
BayLang.Constructor.Console.Commands.BuildCache.prototype.constructor = BayLang.Constructor.Console.Commands.BuildCache;
Object.assign(BayLang.Constructor.Console.Commands.BuildCache.prototype,
{
});
Object.assign(BayLang.Constructor.Console.Commands.BuildCache, Runtime.Console.BaseCommand);
Object.assign(BayLang.Constructor.Console.Commands.BuildCache,
{
	/**
	 * Returns name
	 */
	getName: function()
	{
		return "build_cache";
	},
	/**
	 * Returns description
	 */
	getDescription: function()
	{
		return "Build cache";
	},
	/**
	 * Run task
	 */
	run: async function()
	{
		var project_id = Runtime.rtl.getContext().cli_args.get(2);
		/* Projects list */
		if (Runtime.rtl.getContext().cli_args.count() <= 2)
		{
			var projects = await BayLang.Helper.Project.readProjects(Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().env("constructor_path"),"projects"])));
			Runtime.io.print("Projects:");
			for (var i = 0; i < projects.count(); i++)
			{
				var project = projects.get(i);
				Runtime.io.print(Runtime.io.color("yellow", project.getID()) + Runtime.rtl.toStr(" - ") + Runtime.rtl.toStr(project.getName()));
			}
		}
		else
		{
			var project = BayLang.Helper.Project.readProject(Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().env("constructor_path"),"projects",project_id])));
			if (!project)
			{
				Runtime.io.print_error("Project " + Runtime.rtl.toStr(project_id) + Runtime.rtl.toStr(" not found"));
				return Promise.resolve(this.UNKNOWN_ERROR);
			}
			Runtime.io.print("Build project cache");
			Runtime.io.print("Project: " + Runtime.rtl.toStr(project.getID()));
			await project.readModules();
			await project.loadModules();
			await project.saveCache();
			Runtime.io.print("OK");
		}
		return Promise.resolve(this.SUCCESS);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Console.Commands";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Console.Commands.BuildCache";
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
Runtime.rtl.defClass(BayLang.Constructor.Console.Commands.BuildCache);
window["BayLang.Constructor.Console.Commands.BuildCache"] = BayLang.Constructor.Console.Commands.BuildCache;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Console.Commands.BuildCache;