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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
Runtime.XML.PatcherProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.XML.PatcherProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.XML.PatcherProvider.prototype.constructor = Runtime.XML.PatcherProvider;
Object.assign(Runtime.XML.PatcherProvider.prototype,
{
	/**
	 * Start provider
	 */
	start: async function()
	{
		var patchers = Runtime.rtl.getContext().getEntities("Runtime.XML.XMLPatcher");
		for (var i = 0; i < patchers.count(); i++)
		{
			var annotation = patchers.get(i);
			var patcher = Runtime.rtl.newInstance(annotation.name);
			var patcher_types = patcher.types();
			for (var j = 0; j < patcher_types.count(); j++)
			{
				var patcher_type = patcher_types.get(j);
				this.patchers.set(patcher_type, patcher);
			}
		}
	},
	/**
	 * Returns pather by type
	 */
	getPatcher: function(patcher_type)
	{
		if (!this.patchers.has(patcher_type))
		{
			return null;
		}
		return this.patchers.get(patcher_type);
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.patchers = new Runtime.Map();
	},
});
Object.assign(Runtime.XML.PatcherProvider, Runtime.BaseProvider);
Object.assign(Runtime.XML.PatcherProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML";
	},
	getClassName: function()
	{
		return "Runtime.XML.PatcherProvider";
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
Runtime.rtl.defClass(Runtime.XML.PatcherProvider);
window["Runtime.XML.PatcherProvider"] = Runtime.XML.PatcherProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.PatcherProvider;