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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.Form.FormMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.Form.FormMessage.prototype.constructor = Runtime.Widget.Form.FormMessage;
Object.assign(Runtime.Widget.Form.FormMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.result = null;
		this.field_name = null;
		this.old_value = null;
		this.value = null;
	},
});
Object.assign(Runtime.Widget.Form.FormMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.Form.FormMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormMessage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Messages.Message";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormMessage);
window["Runtime.Widget.Form.FormMessage"] = Runtime.Widget.Form.FormMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormMessage;