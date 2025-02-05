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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.BackButtonModel = function()
{
	Runtime.Widget.ButtonModel.apply(this, arguments);
};
Runtime.Widget.BackButtonModel.prototype = Object.create(Runtime.Widget.ButtonModel.prototype);
Runtime.Widget.BackButtonModel.prototype.constructor = Runtime.Widget.BackButtonModel;
Object.assign(Runtime.Widget.BackButtonModel.prototype,
{
	_init: function()
	{
		Runtime.Widget.ButtonModel.prototype._init.call(this);
		this.content = "Back";
	},
});
Object.assign(Runtime.Widget.BackButtonModel, Runtime.Widget.ButtonModel);
Object.assign(Runtime.Widget.BackButtonModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.BackButtonModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
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
Runtime.rtl.defClass(Runtime.Widget.BackButtonModel);
window["Runtime.Widget.BackButtonModel"] = Runtime.Widget.BackButtonModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.BackButtonModel;