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
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.DialogMessage = function()
{
	Runtime.Web.Messages.Message.apply(this, arguments);
};
Runtime.Widget.Dialog.DialogMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Widget.Dialog.DialogMessage.prototype.constructor = Runtime.Widget.Dialog.DialogMessage;
Object.assign(Runtime.Widget.Dialog.DialogMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.value = "";
		this.hide = true;
	},
});
Object.assign(Runtime.Widget.Dialog.DialogMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Widget.Dialog.DialogMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogMessage";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.DialogMessage);
window["Runtime.Widget.Dialog.DialogMessage"] = Runtime.Widget.Dialog.DialogMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.DialogMessage;