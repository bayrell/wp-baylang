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
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
BayLang.Constructor.Frontend.Editor.WidgetMenu = {
	name: "BayLang.Constructor.Frontend.Editor.WidgetMenu",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_menu", ((this.model.menu_selected != "") ? ("show") : ("hide"))])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_menu__title"])});
			
			/* Render */
			this._t(__v1, this.getTitle());
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_menu__item", ((this.model.menu_selected != "styles") ? ("hide") : (""))])});
			
			/* Component 'Styles' */
			let __v3 = this._c(__v2, "BayLang.Constructor.Frontend.Editor.Styles.Styles", {"model":this._model(this.model.styles)});
			
			/* Element 'div' */
			let __v4 = this._e(__v0, "div", {"class":this._class_name(["widget_menu__item", ((this.model.menu_selected != "css") ? ("hide") : (""))])});
			
			/* Component 'SelectedItem' */
			let __v5 = this._c(__v4, "BayLang.Constructor.Frontend.Editor.SelectedItem", {"model":this._model(this.model),"type":"css"});
			
			/* Element 'div' */
			let __v6 = this._e(__v0, "div", {"class":this._class_name(["widget_menu__item", ((this.model.menu_selected != "params") ? ("hide") : (""))])});
			
			/* Component 'SelectedItem' */
			let __v7 = this._c(__v6, "BayLang.Constructor.Frontend.Editor.SelectedItem", {"model":this._model(this.model),"type":"params"});
			
			/* Element 'div' */
			let __v8 = this._e(__v0, "div", {"class":this._class_name(["widget_menu__item", ((this.model.menu_selected != "tree") ? ("hide") : (""))])});
			
			/* Render */
			this._t(__v8, this.renderWidget(this.model.tree));
			
			return this._flatten(__v);
		},
		/**
 * Returns title
 */
		getTitle: function()
		{
			if (this.model.menu_selected == "css")
			{
				return "CSS";
			}
			if (this.model.menu_selected == "params")
			{
				return "Parameters";
			}
			if (this.model.menu_selected == "styles")
			{
				return "Styles";
			}
			if (this.model.menu_selected == "tree")
			{
				return "Tree";
			}
			return "";
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetMenu,
{
	components: function()
	{
		return Runtime.Vector.from(["BayLang.Constructor.Frontend.Editor.SelectedItem","BayLang.Constructor.Frontend.Editor.Styles.Styles"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_menu.h-f350{display: flex;flex-wrap: wrap;flex-direction: column;justify-content: stretch;align-items: stretch;overflow: auto;height: 100%;width: 300px;border-left: 1px var(--widget-color-border) solid}.widget_menu.hide.h-f350{display: none}.widget_menu__title.h-f350{display: flex;align-items: center;justify-content: center;text-align: center;border-bottom: 1px var(--widget-color-border) solid;height: 32px}.widget_menu__item.h-f350{padding: 10px;overflow-y: auto;height: calc(100% - 32px);width: 100%}.widget_menu__item.hide.h-f350{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetMenu";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.WidgetMenu);
window["BayLang.Constructor.Frontend.Editor.WidgetMenu"] = BayLang.Constructor.Frontend.Editor.WidgetMenu;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.WidgetMenu;