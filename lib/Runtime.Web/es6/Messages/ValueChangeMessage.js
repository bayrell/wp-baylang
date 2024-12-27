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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Messages == 'undefined') Runtime.Web.Messages = {};
Runtime.Web.Messages.ValueChangeMessage = function(params)
{
	if (params == undefined) params = null;
	Runtime.Web.Messages.Message.call(this, params);
	/* Set message name */
	this.name = "valueChange";
};
Runtime.Web.Messages.ValueChangeMessage.prototype = Object.create(Runtime.Web.Messages.Message.prototype);
Runtime.Web.Messages.ValueChangeMessage.prototype.constructor = Runtime.Web.Messages.ValueChangeMessage;
Object.assign(Runtime.Web.Messages.ValueChangeMessage.prototype,
{
	_init: function()
	{
		Runtime.Web.Messages.Message.prototype._init.call(this);
		this.value = null;
		this.old_value = null;
	},
});
Object.assign(Runtime.Web.Messages.ValueChangeMessage, Runtime.Web.Messages.Message);
Object.assign(Runtime.Web.Messages.ValueChangeMessage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Messages";
	},
	getClassName: function()
	{
		return "Runtime.Web.Messages.ValueChangeMessage";
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
Runtime.rtl.defClass(Runtime.Web.Messages.ValueChangeMessage);
window["Runtime.Web.Messages.ValueChangeMessage"] = Runtime.Web.Messages.ValueChangeMessage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Messages.ValueChangeMessage;