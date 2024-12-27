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
BayLang.Compiler.Module = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
BayLang.Compiler.Module.prototype = Object.create(Runtime.BaseStruct.prototype);
BayLang.Compiler.Module.prototype.constructor = BayLang.Compiler.Module;
Object.assign(BayLang.Compiler.Module.prototype,
{
	/**
	 * Returns module path
	 */
	getModulePath: function()
	{
		return this.path;
	},
	/**
	 * Returns source path
	 */
	getSourcePath: function()
	{
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(this.config, "src"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var module_src = __v0.value();
		var module_src_path = Runtime.fs.join(Runtime.Vector.from([this.path,module_src]));
		return Runtime.rs.removeLastSlash(module_src_path);
	},
	/**
	 * Has group
	 */
	hasGroup: function(group_name)
	{
		if (Runtime.rs.substr(group_name, 0, 1) != "@")
		{
			return false;
		}
		group_name = Runtime.rs.substr(group_name, 1);
		var groups = this.config.get("groups");
		if (groups == null)
		{
			return false;
		}
		if (groups.indexOf(group_name) == -1)
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
	 * Returns full source file.
	 * Returns file_path
	 */
	resolveSourceFile: function(file_name)
	{
		var first_char = Runtime.rtl.attr(file_name, 0);
		if (first_char == "@")
		{
			return Runtime.fs.join(Runtime.Vector.from([this.path,Runtime.rs.substr(file_name, 1)]));
		}
		var path = this.getSourcePath();
		return Runtime.fs.join(Runtime.Vector.from([path,file_name]));
	},
	/**
	 * Resolve destination file
	 */
	resolveDestFile: function(project_path, relative_file_name, lang)
	{
		if (!this.config.has("dest"))
		{
			return "";
		}
		if (!this.config.get("dest").has(lang))
		{
			return "";
		}
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(this.config, ["dest", lang]));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
		var dest = __v0.value();
		var dest_path = "";
		var is_local = Runtime.rs.substr(dest, 0, 2) == "./";
		if (is_local)
		{
			dest_path = Runtime.fs.join(Runtime.Vector.from([this.path,dest,relative_file_name]));
		}
		else
		{
			dest_path = Runtime.fs.join(Runtime.Vector.from([project_path,dest,relative_file_name]));
		}
		if (lang == "php")
		{
			dest_path = Runtime.re.replace("\\.bay$", ".php", dest_path);
			dest_path = Runtime.re.replace("\\.ui$", ".php", dest_path);
		}
		else if (lang == "es6")
		{
			dest_path = Runtime.re.replace("\\.bay$", ".js", dest_path);
			dest_path = Runtime.re.replace("\\.ui$", ".js", dest_path);
		}
		else if (lang == "nodejs")
		{
			dest_path = Runtime.re.replace("\\.bay$", ".js", dest_path);
			dest_path = Runtime.re.replace("\\.ui$", ".js", dest_path);
		}
		return dest_path;
	},
	/**
	 * Check exclude
	 */
	checkExclude: function(file_name)
	{
		var module_excludelist = Runtime.rtl.attr(this.config, "exclude");
		if (module_excludelist && module_excludelist instanceof Runtime.Collection)
		{
			for (var i = 0; i < module_excludelist.count(); i++)
			{
				var __v0 = new Runtime.Monad(Runtime.rtl.attr(module_excludelist, i));
				__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
				var file_match = __v0.value();
				if (file_match == "")
				{
					continue;
				}
				var res = Runtime.re.match(file_match, file_name);
				if (res)
				{
					return true;
				}
			}
		}
		return false;
	},
	/**
	 * Check allow list
	 */
	checkAllow: function(file_name)
	{
		var success = false;
		var module_allowlist = Runtime.rtl.attr(this.config, "allow");
		if (module_allowlist && module_allowlist instanceof Runtime.Collection)
		{
			for (var i = 0; i < module_allowlist.count(); i++)
			{
				var __v0 = new Runtime.Monad(Runtime.rtl.attr(module_allowlist, i));
				__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
				var file_match = __v0.value();
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
		}
		return success;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.path = "";
		this.config = Runtime.Map.from({});
	},
});
Object.assign(BayLang.Compiler.Module, Runtime.BaseStruct);
Object.assign(BayLang.Compiler.Module,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.Module";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
Runtime.rtl.defClass(BayLang.Compiler.Module);
window["BayLang.Compiler.Module"] = BayLang.Compiler.Module;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.Module;