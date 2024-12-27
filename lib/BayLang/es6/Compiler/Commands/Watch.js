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
if (typeof BayLang.Compiler.Commands == 'undefined') BayLang.Compiler.Commands = {};
BayLang.Compiler.Commands.Watch = function()
{
	Runtime.Console.BaseCommand.apply(this, arguments);
};
BayLang.Compiler.Commands.Watch.prototype = Object.create(Runtime.Console.BaseCommand.prototype);
BayLang.Compiler.Commands.Watch.prototype.constructor = BayLang.Compiler.Commands.Watch;
Object.assign(BayLang.Compiler.Commands.Watch.prototype,
{
	/**
	 * On change file
	 */
	onChangeFile: async function(changed_file_path)
	{
		try
		{
			if (changed_file_path == this.settings.project_json_path)
			{
				Runtime.io.print("Reload project.json");
				await this.settings.reload();
				return Promise.resolve();
			}
			var file_info = await this.settings.compileFile(changed_file_path, "", 3);
			if (!file_info)
			{
				return Promise.resolve();
			}
			var module = file_info.get("module");
			var assets = module.config.get("assets");
			var src_file_name = file_info.get("src_file_name");
			if (file_info.get("file_name") == "/module.json")
			{
				Runtime.io.print("Reload module.json");
				await this.settings.reload();
			}
			else if (assets.indexOf(src_file_name) >= 0)
			{
				await this.settings.updateModule(module.name);
			}
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserUnknownError)
			{
				var e = _ex;
				
				Runtime.io.print_error("Error: " + e.toString());
			}
			else if (true)
			{
				var e = _ex;
				
				Runtime.io.print_error(e);
			}
			else
			{
				throw _ex;
			}
		}
	},
	/**
	 * Run task
	 */
	run: async function()
	{
		this.settings = Runtime.rtl.getContext().provider("BayLang.Compiler.SettingsProvider");
		return Promise.resolve(this.constructor.SUCCESS);
	},
	_init: function()
	{
		Runtime.Console.BaseCommand.prototype._init.call(this);
		this.settings = null;
	},
});
Object.assign(BayLang.Compiler.Commands.Watch, Runtime.Console.BaseCommand);
Object.assign(BayLang.Compiler.Commands.Watch,
{
	/**
	 * Returns name
	 */
	getName: function()
	{
		return "watch";
	},
	/**
	 * Returns description
	 */
	getDescription: function()
	{
		return "Watch changes";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler.Commands";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.Commands.Watch";
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
Runtime.rtl.defClass(BayLang.Compiler.Commands.Watch);
window["BayLang.Compiler.Commands.Watch"] = BayLang.Compiler.Commands.Watch;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.Commands.Watch;