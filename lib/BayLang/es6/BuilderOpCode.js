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
BayLang.BuilderOpCode = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
BayLang.BuilderOpCode.prototype = Object.create(Runtime.BaseObject.prototype);
BayLang.BuilderOpCode.prototype.constructor = BayLang.BuilderOpCode;
Object.assign(BayLang.BuilderOpCode.prototype,
{
	/**
	 * Add slot
	 */
	addSlot: function(op_code, name)
	{
		var slot = new BayLang.OpCodes.OpHtmlSlot(Runtime.Map.from({"name":name,"items":new BayLang.OpCodes.OpHtmlItems()}));
		op_code.items.items.push(slot);
		return slot;
	},
	/**
	 * Add tag
	 */
	addTag: function(op_code, name)
	{
		var tag = new BayLang.OpCodes.OpHtmlTag(Runtime.Map.from({"attrs":Runtime.Vector.from([]),"items":new BayLang.OpCodes.OpHtmlItems(),"tag_name":name}));
		op_code.items.items.push(tag);
		return tag;
	},
});
Object.assign(BayLang.BuilderOpCode, Runtime.BaseObject);
Object.assign(BayLang.BuilderOpCode,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang";
	},
	getClassName: function()
	{
		return "BayLang.BuilderOpCode";
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
Runtime.rtl.defClass(BayLang.BuilderOpCode);
window["BayLang.BuilderOpCode"] = BayLang.BuilderOpCode;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.BuilderOpCode;