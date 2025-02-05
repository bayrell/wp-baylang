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
Runtime.Web.RenderResponse = function(container)
{
	Runtime.Web.Response.call(this);
	this.container = container;
};
Runtime.Web.RenderResponse.prototype = Object.create(Runtime.Web.Response.prototype);
Runtime.Web.RenderResponse.prototype.constructor = Runtime.Web.RenderResponse;
Object.assign(Runtime.Web.RenderResponse.prototype,
{
	/**
	 * Returns content
	 */
	getContent: function(render_core_ui)
	{
		if (render_core_ui == undefined) render_core_ui = true;
		if (this.content)
		{
			return this.content;
		}
		/* Create component */
		var component = Runtime.rtl.newInstance(this.container.layout.component);
		component.container = this.container;
		component.layout = this.container.layout;
		component.model = this.container.layout;
		/* Render component */
		var content = Runtime.Vector.from(["<!DOCTYPE html>\n",(render_core_ui) ? (component.renderCoreUI()) : (component.renderApp())]);
		this.content = Runtime.RawString.normalize(content);
		return this.content;
	},
	_init: function()
	{
		Runtime.Web.Response.prototype._init.call(this);
		this.container = null;
	},
});
Object.assign(Runtime.Web.RenderResponse, Runtime.Web.Response);
Object.assign(Runtime.Web.RenderResponse,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderResponse";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Response";
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
Runtime.rtl.defClass(Runtime.Web.RenderResponse);
window["Runtime.Web.RenderResponse"] = Runtime.Web.RenderResponse;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderResponse;