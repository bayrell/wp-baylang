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
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Code == 'undefined') BayLang.Constructor.Frontend.Code = {};
BayLang.Constructor.Frontend.Code.TreeItem = function()
{
	Runtime.Widget.Tree.TreeItem.apply(this, arguments);
};
BayLang.Constructor.Frontend.Code.TreeItem.prototype = Object.create(Runtime.Widget.Tree.TreeItem.prototype);
BayLang.Constructor.Frontend.Code.TreeItem.prototype.constructor = BayLang.Constructor.Frontend.Code.TreeItem;
Object.assign(BayLang.Constructor.Frontend.Code.TreeItem.prototype,
{
	/**
	 * Serialize object
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "kind", data);
		serializer.process(this, "file_path", data);
		serializer.process(this, "module_id", data);
		serializer.process(this, "project_id", data);
		serializer.process(this, "is_loaded", data);
		Runtime.Widget.Tree.TreeItem.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Returns true if loaded
	 */
	isLoaded: function()
	{
		return this.is_loaded;
	},
	/**
	 * Click
	 */
	onClick: function(model)
	{
		if (this.kind != "dir")
		{
			return ;
		}
		if (this.is_loaded)
		{
			this.open = !this.open;
		}
	},
	_init: function()
	{
		Runtime.Widget.Tree.TreeItem.prototype._init.call(this);
		this.kind = "";
		this.file_path = "";
		this.module_id = "";
		this.project_id = "";
		this.content = "";
		this.code_editor = new Runtime.Reference();
		this.is_loaded = false;
	},
});
Object.assign(BayLang.Constructor.Frontend.Code.TreeItem, Runtime.Widget.Tree.TreeItem);
Object.assign(BayLang.Constructor.Frontend.Code.TreeItem,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Code";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Code.TreeItem";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Tree.TreeItem";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Code.TreeItem);
window["BayLang.Constructor.Frontend.Code.TreeItem"] = BayLang.Constructor.Frontend.Code.TreeItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Code.TreeItem;