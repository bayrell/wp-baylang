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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Layout == 'undefined') BayLang.Constructor.Frontend.Layout = {};
BayLang.Constructor.Frontend.Layout.ProjectLayout = {
	name: "BayLang.Constructor.Frontend.Layout.ProjectLayout",
	extends: Runtime.Web.DefaultLayout,
	methods:
	{
		renderMenu: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["menu"])});
			let menu = this.getMenu();
			
			for (let i = 0; i < menu.count(); i++)
			{
				let item = menu.get(i);
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["menu__item", this.menuActive(item.get("name"))])});
				
				/* Element 'a' */
				let __v2 = this._e(__v1, "a", {"href":item.get("href"),"class":this._class_name(["nolink"])});
				
				/* Render */
				this._t(__v2, item.get("label"));
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["layout", "layout--" + Runtime.rtl.toStr(this.layout.layout_name)])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["layout__menu_wrap"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v1, "div", {"class":this._class_name(["layout__title"])});
			
			/* Text */
			this._t(__v2, "Menu");
			
			/* Render */
			this._t(__v1, this.renderMenu());
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", {"class":this._class_name(["layout__content_wrap"])});
			
			/* Element 'h1' */
			let __v4 = this._e(__v3, "h1", {"class":this._class_name(["layout__title"])});
			
			/* Render */
			this._t(__v4, this.layout.title);
			
			/* Render */
			this._t(__v3, this.renderCurrentPage());
			
			return this._flatten(__v);
		},
		/**
 * Returns menu
 */
		getMenu: function()
		{
			var arr = Runtime.Vector.from([Runtime.Map.from({"label":"Projects","name":"baylang:project:list","href":this.layout.url("baylang:project:list")}),Runtime.Map.from({"label":"Settings","name":"baylang:project:settings","href":this.layout.url("baylang:project:settings", Runtime.Map.from({"project_id":this.layout.project_id}))}),Runtime.Map.from({"label":"Widgets","name":"baylang:project:widgets","href":this.layout.url("baylang:project:widgets", Runtime.Map.from({"project_id":this.layout.project_id}))}),Runtime.Map.from({"label":"Code","name":"baylang:project:code","href":this.layout.url("baylang:project:code", Runtime.Map.from({"project_id":this.layout.project_id}))})]);
			return arr;
		},
		/**
 * Returns true if menu is active
 */
		menuActive: function(route_name)
		{
			if (this.layout.route == null)
			{
				return "";
			}
			if (this.layout.route.name == route_name)
			{
				return "menu__item--active";
			}
			return "";
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Layout.ProjectLayout,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Web.DefaultLayout"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".layout.h-1e91{position: relative;display: flex;align-items: stretch;min-height: 100%}.layout__menu_wrap.h-1e91{position: relative;width: 200px;padding-top: 10px;padding-right: 10px}.layout__content_wrap.h-1e91{position: relative;width: calc(100% - 200px);padding-top: 10px;padding-bottom: 10px}.layout__title.h-1e91{font-size: 16px;font-weight: normal;padding-bottom: 10px;margin: 0}.layout__menu_wrap.h-1e91 .layout__title{padding-left: 10px}.menu__item.h-1e91 a{display: block;padding: 10px;border-bottom: 1px solid var(--widget-color-border)}.menu__item.h-1e91 a:hover{background-color: var(--widget-color-hover)}.menu__item--active.h-1e91 a,.menu__item--active.h-1e91 a.nolink,.menu__item--active.h-1e91 a.nolink:visited{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.menu__item.h-1e91:last-child a{border-bottom-width: 0px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Layout";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Layout.ProjectLayout";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.DefaultLayout";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Layout.ProjectLayout);
window["BayLang.Constructor.Frontend.Layout.ProjectLayout"] = BayLang.Constructor.Frontend.Layout.ProjectLayout;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Layout.ProjectLayout;