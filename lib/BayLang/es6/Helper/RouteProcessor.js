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
BayLang.Helper.RouteProcessor = function(module)
{
	Runtime.BaseObject.call(this);
	this.module = module;
};
BayLang.Helper.RouteProcessor.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.Helper.RouteProcessor.prototype.constructor = BayLang.Helper.RouteProcessor;
Object.assign(BayLang.Helper.RouteProcessor.prototype,
{
	/**
	 * Returns file path
	 */
	getRoutesFilePath: function()
	{
		return Runtime.fs.join(Runtime.Vector.from([this.module.getSourceFolderPath(),"Routes.bay"]));
	},
	/**
	 * Load routes
	 */
	load: async function()
	{
		var file_path = this.getRoutesFilePath();
		/* Read file */
		if (!await Runtime.fs.isFile(file_path))
		{
			return Promise.resolve();
		}
		var content = await Runtime.fs.readFile(file_path);
		try
		{
			/* Parse file */
			var parser = new BayLang.LangBay.ParserBay();
			var res = parser.constructor.parse(parser, content);
			var op_code = res.get(1);
		}
		catch (_ex)
		{
			if (_ex instanceof BayLang.Exceptions.ParserUnknownError)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
	},
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		var class_op_code = this.constructor.findClass(this.op_code);
		if (!class_op_code)
		{
			return Runtime.Vector.from([]);
		}
		var routes_op_code = this.constructor.findFunction(class_op_code);
		if (!routes_op_code)
		{
			return Runtime.Vector.from([]);
		}
		return this.constructor.findRoutes(routes_op_code);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.module = null;
		this.op_code = null;
	},
});
Object.assign(BayLang.Helper.RouteProcessor, Runtime.BaseObject);
Object.assign(BayLang.Helper.RouteProcessor,
{
	/**
	 * Find class
	 */
	findClass: function(op_code)
	{
		return (op_code instanceof BayLang.OpCodes.OpModule) ? (op_code.items.findItem(Runtime.lib.isInstance("BayLang.OpCodes.OpDeclareClass"))) : (null);
	},
	/**
	 * Find function
	 */
	findFunction: function(op_code)
	{
		return (op_code instanceof BayLang.OpCodes.OpDeclareClass) ? (op_code.items.findItem((op_code) =>
		{
			return op_code instanceof BayLang.OpCodes.OpDeclareFunction && op_code.name == "getRoutes";
		})) : (null);
	},
	/**
	 * Find expression
	 */
	findExpression: function(op_code)
	{
		if (op_code.expression != null)
		{
			return op_code.expression;
		}
		if (!(op_code.items instanceof BayLang.OpCodes.OpItems))
		{
			return null;
		}
		var op_code_item = op_code.items.items.get(0);
		if (!(op_code_item instanceof BayLang.OpCodes.OpReturn))
		{
			return null;
		}
		return op_code_item.expression;
	},
	/**
	 * Find routes
	 */
	findRoutes: function(op_code)
	{
		var expression = this.findExpression(op_code);
		if (expression == null)
		{
			return Runtime.Vector.from([]);
		}
		if (!(expression instanceof BayLang.OpCodes.OpCollection))
		{
			return Runtime.Vector.from([]);
		}
		if (expression.values == null)
		{
			return Runtime.Vector.from([]);
		}
		return expression.values.filter((op_code) =>
		{
			return this.isRoute(op_code);
		}).map((op_code) =>
		{
			var res = Runtime.Map.from({});
			var values = op_code.args.get(0).values;
			for (var i = 0; i < values.count(); i++)
			{
				var value = values.get(i);
				if (value.value instanceof BayLang.OpCodes.OpString)
				{
					res.set(value.key, value.value.value);
				}
			}
			return res;
		});
	},
	/**
	 * Returns true if op_code is route
	 */
	isRoute: function(op_code)
	{
		if (!(op_code instanceof BayLang.OpCodes.OpNew))
		{
			return false;
		}
		if (!(op_code.value instanceof BayLang.OpCodes.OpTypeIdentifier))
		{
			return false;
		}
		if (op_code.value.entity_name.names.count() != 1)
		{
			return false;
		}
		if (op_code.value.entity_name.names.get(0) != "RouteInfo")
		{
			return false;
		}
		if (op_code.args.count() != 1)
		{
			return false;
		}
		if (!(op_code.args.get(0) instanceof BayLang.OpCodes.OpDict))
		{
			return false;
		}
		return true;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Helper";
	},
	getClassName: function()
	{
		return "BayLang.Helper.RouteProcessor";
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
});
Runtime.rtl.defClass(BayLang.Helper.RouteProcessor);
window["BayLang.Helper.RouteProcessor"] = BayLang.Helper.RouteProcessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Helper.RouteProcessor;