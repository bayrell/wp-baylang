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
Runtime.Widget.ButtonModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.ButtonModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.ButtonModel.prototype.constructor = Runtime.Widget.ButtonModel;
Object.assign(Runtime.Widget.ButtonModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("content"))
		{
			this.content = params.get("content");
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
		if (params.has("href"))
		{
			this.href = params.get("href");
		}
	},
	/**
	 * Returns content
	 */
	getContent: function()
	{
		return this.content;
	},
	/**
	 * On click
	 */
	onClick: function(data)
	{
		if (data == undefined) data = null;
		this.emit(new Runtime.Web.Messages.ClickMessage(Runtime.Map.from({"data":data})));
	},
	/**
	 * Returns props
	 */
	getProps: function(data)
	{
		var result = Runtime.Map.from({"content":this.content,"styles":this.styles,"target":this.target});
		/* Add href */
		if (this.href)
		{
			if (Runtime.rtl.isCallable(this.href))
			{
				result.set("href", Runtime.rtl.apply(this.href, Runtime.Vector.from([data])));
			}
			else
			{
				result.set("href", this.href);
			}
		}
		return result;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.styles = Runtime.Vector.from([]);
		this.component = "Runtime.Widget.ButtonWrap";
		this.content = null;
		this.target = "_self";
		this.href = null;
	},
});
Object.assign(Runtime.Widget.ButtonModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.ButtonModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.ButtonModel);
window["Runtime.Widget.ButtonModel"] = Runtime.Widget.ButtonModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ButtonModel;