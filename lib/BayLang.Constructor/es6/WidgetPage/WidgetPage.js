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
if (typeof BayLang.Constructor.WidgetPage == 'undefined') BayLang.Constructor.WidgetPage = {};
BayLang.Constructor.WidgetPage.WidgetPage = {
	name: "BayLang.Constructor.WidgetPage.WidgetPage",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			is_loaded: false,
		};
	},
	methods:
	{
		renderStyle: function()
		{
			let __v = [];
			
			/* Element 'style' */
			let __v0 = this._e(__v, "style", {});
			
			/* Render */
			this._t(__v0, this.model.widget_css);
			
			return this._flatten(__v);
		},
		renderSelectedBox: function()
		{
			let __v = [];
			let page_model = this.model.getEditPageModel();
			
			if (this.model.selected_box)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"style":this.model.selected_box.get("top"),"class":this._class_name(["widget_box__item widget_box__item--top widget_box__item--current"])});
				
				if (page_model.selected.widget != null && this.renderWidgetControl())
				{
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_box__item_control"])});
					
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {"class":this._class_name(["widget_box__item_control_wrap"])});
					
					/*
						<div class="widget_box__item_control_button">@raw{{ "&#9776;" }}</div>
						*/
					/* Element 'div' */
					let __v3 = this._e(__v2, "div", {"onClick":() =>
					{
						this.onAddWidgetClick(this.model.selected_path);
					},"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v3, new Runtime.RawString("+"));
					
					/* Element 'div' */
					let __v4 = this._e(__v2, "div", {"onClick":this.onUpWidgetClick,"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v4, new Runtime.RawString("&#9652;"));
					
					/* Element 'div' */
					let __v5 = this._e(__v2, "div", {"onClick":this.onDownWidgetClick,"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v5, new Runtime.RawString("&#9662;"));
					
					/* Element 'div' */
					let __v6 = this._e(__v2, "div", {"onClick":this.onRemoveWidgetClick,"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v6, new Runtime.RawString("x"));
				}
				
				/* Element 'div' */
				let __v7 = this._e(__v, "div", {"style":this.model.selected_box.get("bottom"),"class":this._class_name(["widget_box__item widget_box__item--bottom widget_box__item--current"])});
				
				/* Element 'div' */
				let __v8 = this._e(__v, "div", {"style":this.model.selected_box.get("left"),"class":this._class_name(["widget_box__item widget_box__item--left widget_box__item--current"])});
				
				/* Element 'div' */
				let __v9 = this._e(__v, "div", {"style":this.model.selected_box.get("right"),"class":this._class_name(["widget_box__item widget_box__item--right widget_box__item--current"])});
			}
			
			return this._flatten(__v);
		},
		renderAddWidgetButton: function()
		{
			let __v = [];
			let page_model = this.model.getEditPageModel();
			
			if (this.is_loaded && page_model != null)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_page__add_section_button"])});
				
				/* Component 'Button' */
				let __v1 = this._c(__v0, "Runtime.Widget.Button", {"styles":Runtime.Vector.from(["small"]),"onClick":() =>
				{
					this.onAddWidgetClick(null);
				}}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "Add widget");
					
					return this._flatten(__v);
				});
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":this.onClick,"onContextmenu":this.onContextMenu,"class":this._class_name(["widget_page"])});
			
			/* Render */
			this._t(__v0, this.renderStyle());
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.widget_model, Runtime.Map.from({"ref":"widget_component"})));
			
			/* Render */
			this._t(__v0, this.renderSelectedBox());
			
			/* Render */
			this._t(__v0, this.renderAddWidgetButton());
			
			return this._flatten(__v);
		},
		/**
 * Render widget control
 */
		renderWidgetControl: function()
		{
			return false;
		},
		/**
 * Up widget click
 */
		onUpWidgetClick: function()
		{
			this.model.sendMoveWidget(this.model.selected_path, "up");
		},
		/**
 * Down widget click
 */
		onDownWidgetClick: function()
		{
			this.model.sendMoveWidget(this.model.selected_path, "down");
		},
		/**
 * Add widget click event
 */
		onAddWidgetClick: function(path)
		{
			this.model.sendAddWidget(path, "after");
		},
		/**
 * Remove widget click event
 */
		onRemoveWidgetClick: function()
		{
			this.model.sendRemoveWidget(this.model.selected_path);
		},
		/**
 * Returns component
 */
		getComponent: function(elem)
		{
			while (elem != null)
	{
		if (elem.classList.contains("debug_component"))
		{
			return elem;
		}
		if (elem.__component__)
		{
			return elem;
		}
		elem = elem.parentElement;
	}
	return elem;
		},
		/**
 * Returns widget path
 */
		getWidgetPath: function(elem)
		{
			elem = this.getComponent(elem);
			if (elem == null)
			{
				return null;
			}
			if (elem.hasAttribute("data-widget-path"))
			{
				return elem.getAttribute("data-widget-path");
			}
			var component = elem.__component__;
			while (
		component != null &&
		component.data_widget_path == null
	)
	{
		component = component.$parent;
	}
			return (component) ? (component.data_widget_path) : (null);
		},
		/**
 * Click
 */
		onClick: function(e)
		{
			var elem = e.target;
			/* Get widget path */
			var widget_path_str = this.getWidgetPath(elem);
			if (!widget_path_str)
			{
				return ;
			}
			/* Get page model */
			var page_model = this.model.getEditPageModel();
			if (!page_model)
			{
				return ;
			}
			/* Prevent default */
			e.preventDefault();
			var widget_path = Runtime.rs.split(".", widget_path_str);
			var path = this.model.convertWidgetToTreePath(widget_path);
			this.model.sendSelectItem(path);
			return false;
		},
		/**
 * Context menu click
 */
		onContextMenu: function(e)
		{
			var elem = e.target;
			/* Get widget path */
			var widget_path_str = this.getWidgetPath(elem);
			if (!widget_path_str)
			{
				return ;
			}
			/* Prevent default */
			e.preventDefault();
			/* Send select item */
			var widget_path = Runtime.rs.split(".", widget_path_str);
			var path = this.model.convertWidgetToTreePath(widget_path);
			this.model.sendSelectItem(path);
			/* Send event context menu */
			this.model.sendContextMenu(e.clientX, e.clientY);
			return false;
		},
		/**
 * Mounted
 */
		onMounted: async function()
		{
			this.nextTick(() =>
			{
				this.model.widget_component = this.getRef("widget_component");
				this.model.buildRender();
				this.model.buildCSS();
				this.model.buildGlobalCSS();
				this.model.sendAppLoaded();
				this.is_loaded = true;
			});
		},
	},
};
Object.assign(BayLang.Constructor.WidgetPage.WidgetPage,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_box__item{position: absolute;border-style: none;border-width: 0;border-color: transparent}.widget_box__item--hover{border-style: dashed}.widget_box__item--current{border-style: solid}.widget_box__item--top{border-top-width: 2px;border-top-color: #e0e1e6}.widget_box__item--left{border-left-width: 2px;border-left-color: #e0e1e6}.widget_box__item--bottom{border-bottom-width: 2px;border-bottom-color: #e0e1e6}.widget_box__item--right{border-right-width: 2px;border-right-color: #e0e1e6}.widget_box__item_control{display: inline-block;position: relative;background-color: white;min-width: 98px;left: calc(100% - 98px);top: -13px;border-width: 1px;border-style: solid;border-color: #e0e1e6;z-index: 10}.widget_box__item_control_wrap{display: flex;height: 24px;line-height: 1}.widget_box__item_control_button{cursor: pointer;font-size: 16px;padding: 4px;text-align: center;user-select: none;width: 24px}.widget_page__add_section_button{text-align: center;padding-top: 10px;padding: 5px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetPage";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetPage);
window["BayLang.Constructor.WidgetPage.WidgetPage"] = BayLang.Constructor.WidgetPage.WidgetPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetPage;