"use strict;"
/*
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
Runtime.Web.CoreUI = {
	name: "Runtime.Web.CoreUI",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			container: null,
		};
	},
	methods:
	{
		renderWidget: function(widget, props)
		{
			if (props == undefined) props = null;
			let __v = [];
			
			if (widget)
			{
				if (Runtime.rtl.is_instanceof(widget, "Runtime.Web.BaseModel"))
				{
					let component = widget.component;
					
					if (component)
					{
						/* Component '{component}' */
						let __v0 = this._c(__v, component, this._merge_attrs({"model":this._model(widget)}, props));
					}
				}
				else
				{
					/* Component '{widget}' */
					let __v1 = this._c(__v, widget, {"model":this._model(Runtime.Vector.from([]))});
				}
			}
			
			return this._flatten(__v);
		},
		renderSEO: function()
		{
			let __v = [];
			
			/* Element 'title' */
			let __v0 = this._e(__v, "title", {});
			
			/* Render */
			this._t(__v0, this.layout.getFullTitle());
			
			if (this.layout.content_type)
			{
				/* Element 'meta' */
				let __v1 = this._e(__v, "meta", {"charset":this.layout.content_type});
				
				/* Element 'meta' */
				let __v2 = this._e(__v, "meta", {"http-equiv":"Content-Type","content":"text/html; " + Runtime.rtl.toStr(this.layout.content_type)});
			}
			
			if (this.layout.getLocale())
			{
				/* Element 'meta' */
				let __v3 = this._e(__v, "meta", {"http-equiv":"Content-Language","content":this.layout.getLocale()});
			}
			
			return this._flatten(__v);
		},
		renderHeadComponents: function()
		{
			let __v = [];
			let d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.RENDER_HEAD, Runtime.Map.from({"components":this.layout.getHeaderComponents(),"layout":this.layout}));
			let components = Runtime.rtl.attr(d, "components");
			
			for (let i = 0; i < components.count(); i++)
			{
				let widget = components.get(i);
				
				/* Render */
				this._t(__v, this.renderWidget(widget));
			}
			
			return this._flatten(__v);
		},
		renderCSS: function()
		{
			let __v = [];
			let components = this.layout.getComponents();
			let css = this.layout.constructor.getCss(components);
			
			/* Element 'style' */
			let __v0 = this._e(__v, "style", {"id":"core-css","class":this._class_name(["components"])});
			
			/* Raw */
			this._t(__v0, new Runtime.RawString(css));
			
			return this._flatten(__v);
		},
		renderBasePrefix: function()
		{
			let __v = [];
			let route_prefix = Runtime.rtl.getContext().env("ROUTE_PREFIX");
			
			if (route_prefix)
			{
				/* Element 'base' */
				let __v0 = this._e(__v, "base", {"href":Runtime.rs.addLastSlash(route_prefix)});
			}
			else
			{
				/* Element 'base' */
				let __v1 = this._e(__v, "base", {"href":"/"});
			}
			
			return this._flatten(__v);
		},
		renderHeadAfter: function()
		{
			let __v = [];
			
			return this._flatten(__v);
		},
		renderHead: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.$options.renderBasePrefix());
			
			/* Render */
			this._t(__v, this.$options.renderSEO());
			
			/* Render */
			this._t(__v, this.$options.renderHeadComponents());
			
			/* Render */
			this._t(__v, this.$options.renderCSS());
			
			/* Render */
			this._t(__v, this.$options.renderHeadAfter());
			
			return this._flatten(__v);
		},
		renderBodyComponents: function()
		{
			let __v = [];
			let d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.RENDER_BODY, Runtime.Map.from({"components":this.layout.getBodyComponents(),"layout":this.layout}));
			let components = Runtime.rtl.attr(d, "components");
			
			for (let i = 0; i < components.count(); i++)
			{
				let widget = components.get(i);
				
				/* Render */
				this._t(__v, this.renderWidget(widget));
			}
			
			return this._flatten(__v);
		},
		renderBodyAfter: function()
		{
			let __v = [];
			
			return this._flatten(__v);
		},
		renderBody: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.$options.renderBodyComponents());
			
			/* Render */
			this._t(__v, this.$options.renderBodyAfter());
			
			return this._flatten(__v);
		},
		renderApp: function()
		{
			let __v = [];
			let render_provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name([render_provider.selector])});
			
			/* Component 'AppComponent' */
			let __v1 = this._c(__v0, "Runtime.Web.AppComponent", {"model":this._model(Runtime.Vector.from([]))});
			
			/* Element 'div' */
			let __v2 = this._e(__v, "div", {"class":this._class_name(["teleports"])});
			
			/* Raw */
			this._t(__v2, new Runtime.RawString((render_provider.enable_ssr) ? (this.layout.teleports.join("")) : ("")));
			
			/* Element 'script' */
			let __v3 = this._e(__v, "script", {});
			
			/* Text */
			this._t(__v3, "window[\"app_data\"] = ");
			
			/* Raw */
			this._t(__v3, new Runtime.RawString(Runtime.rtl.json_encode(this.container.exportData(), Runtime.rtl.ALLOW_OBJECTS)));
			
			/* Text */
			this._t(__v3, ";");
			
			/* Element 'script' */
			let __v4 = this._e(__v, "script", {});
			
			/* Text */
			this._t(__v4, "onReady(function(){\n\t\t\tRuntime.rtl.runApp(\n\t\t\t\tapp_data[\"entry_point\"],\n\t\t\t\tapp_data[\"modules\"],\n\t\t\t\tRuntime.Map.from({\n\t\t\t\t\t\"environments\": Runtime.Map.from(app_data[\"environments\"]),\n\t\t\t\t\t\"tz\": ");
			
			/* Text */
			this._t(__v4, Runtime.rtl.json_encode(Runtime.rtl.getContext().tz));
			
			/* Text */
			this._t(__v4, ",\n\t\t\t\t\t\"tz_offset\": ");
			
			/* Text */
			this._t(__v4, Runtime.rtl.json_encode(0));
			
			/* Text */
			this._t(__v4, "})\n\t\t\t);\n\t\t});");
			
			return this._flatten(__v);
		},
		renderFooterAfter: function()
		{
			let __v = [];
			
			return this._flatten(__v);
		},
		renderFooterComponents: function()
		{
			let __v = [];
			let d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.RENDER_FOOTER, Runtime.Map.from({"components":this.layout.getFooterComponents(),"layout":this.layout}));
			let components = Runtime.rtl.attr(d, "components");
			
			for (let i = 0; i < components.count(); i++)
			{
				let widget = components.get(i);
				
				/* Render */
				this._t(__v, this.renderWidget(widget));
			}
			
			return this._flatten(__v);
		},
		renderFooter: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.$options.renderFooterComponents());
			
			/* Render */
			this._t(__v, this.$options.renderFooterAfter());
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'html' */
			let __v0 = this._e(__v, "html", {"lang":this.layout.getLocale()});
			
			/* Element 'head' */
			let __v1 = this._e(__v0, "head", {});
			
			/* Render */
			this._t(__v1, this.$options.renderHead());
			
			/* Element 'script' */
			let __v2 = this._e(__v1, "script", {});
			
			/* Text */
			this._t(__v2, "window.$onReady=[];function onReady(f){ window.$onReady.push(f) };");
			
			/* Element 'body' */
			let __v3 = this._e(__v0, "body", {});
			
			/* Render */
			this._t(__v3, this.$options.renderBody());
			
			/* Render */
			this._t(__v3, this.$options.renderApp());
			
			/* Render */
			this._t(__v3, this.$options.renderFooter());
			
			/* Element 'script' */
			let __v4 = this._e(__v3, "script", {});
			
			/* Text */
			this._t(__v4, "window.addEventListener('load', function() {\n\t\t\t\twindow.$onReady.forEach( function(f){ f(); } );\n\t\t\t});");
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Web.CoreUI,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.CoreUI";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.Web.CoreUI);
window["Runtime.Web.CoreUI"] = Runtime.Web.CoreUI;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.CoreUI;