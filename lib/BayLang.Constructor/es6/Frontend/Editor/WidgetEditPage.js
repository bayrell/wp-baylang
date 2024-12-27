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
BayLang.Constructor.Frontend.Editor.WidgetEditPage = {
	name: "BayLang.Constructor.Frontend.Editor.WidgetEditPage",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			menu_items: Runtime.Vector.from([Runtime.Map.from({"label":"Styles","value":"styles"}),Runtime.Map.from({"label":"CSS","value":"css"}),Runtime.Map.from({"label":"Params","value":"params"}),Runtime.Map.from({"label":"Tree","value":"tree"})]),
		};
	},
	methods:
	{
		renderSelectSize: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_edit_page__menu_item widget_edit_page__menu_item--select_size"])});
			
			for (let i = 0; i < this.model.iframe_sizes.count(); i++)
			{
				let size = this.model.iframe_sizes.get(i);
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"onClick":() =>
				{
					this.model.selectIFrameSize(size);
				},"class":this._class_name(["widget_edit_page__iframe_size", ((this.model.iframe_current_size == size.get("label")) ? ("selected") : (""))])});
				
				/* Render */
				this._t(__v1, size.get("label"));
			}
			
			return this._flatten(__v);
		},
		renderMenu: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_edit_page__menu"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_edit_page__menu_item_gap"])});
			
			/* Element 'a' */
			let __v2 = this._e(__v1, "a", {"href":this.layout.url("baylang:project:widgets", Runtime.Map.from({"project_id":this.model.project_id,"module_id":this.model.module_id})),"class":this._class_name(["widget_edit_page__menu_item nolink"])});
			
			/* Text */
			this._t(__v2, "Back");
			
			/* Element 'div' */
			let __v3 = this._e(__v1, "div", {"onClick":(e) =>
			{
				this.model.saveWidget();
			},"class":this._class_name(["widget_edit_page__menu_item"])});
			
			/* Text */
			this._t(__v3, "Save");
			
			/* Element 'div' */
			let __v4 = this._e(__v1, "div", {"class":this._class_name(["widget_edit_page__menu_item"])});
			
			/* Text */
			this._t(__v4, "Export");
			
			/* Element 'div' */
			let __v5 = this._e(__v1, "div", {"class":this._class_name(["widget_edit_page__menu_item widget_edit_page__menu_item--status_message", ((this.isAppStatusError()) ? ("widget_edit_page__menu_item--error") : (""))])});
			
			/* Render */
			this._t(__v5, this.getAppStatusMessage());
			
			/* %render this.renderSelectSize(); */
			/* Element 'div' */
			let __v6 = this._e(__v0, "div", {"class":this._class_name(["widget_edit_page__menu_item_gap widget_edit_page__menu--right"])});
			
			for (let i = 0; i < this.menu_items.count(); i++)
			{
				let item = this.menu_items.get(i);
				
				/* Element 'div' */
				let __v7 = this._e(__v6, "div", {"onClick":(e) =>
				{
					this.toggleMenu(e, item.get("value"));
				},"class":this._class_name(["widget_edit_page__menu_item widget_edit_page__menu_item--button", ((this.model.menu_selected == item.get("value")) ? ("widget_edit_page__menu_item--selected") : (""))])});
				
				/* Render */
				this._t(__v7, item.get("label"));
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_edit_page__content"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_edit_page__frame"])});
			
			/* Component 'Breadcrumbs' */
			let __v2 = this._c(__v1, "BayLang.Constructor.Frontend.Editor.Breadcrumbs", {"model":this._model(this.model)});
			
			/* Element 'div' */
			let __v3 = this._e(__v1, "div", {"class":this._class_name(["widget_edit_page__frame_wrap"])});
			
			/* Element 'iframe' */
			let __v4 = this._e(__v3, "iframe", {"ref":"iframe"});
			
			/* Component 'WidgetMenu' */
			let __v5 = this._c(__v0, "BayLang.Constructor.Frontend.Editor.WidgetMenu", {"model":this._model(this.model)});
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.add_item_dialog));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.context_menu));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.remove_item_dialog));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.rename_item_dialog));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.select_image_dialog));
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_edit_page"])});
			
			/* Render */
			this._t(__v0, this.renderMenu());
			
			/* Render */
			this._t(__v0, this.renderContent());
			
			return this._flatten(__v);
		},
		/**
 * Returns true if app status is error
 */
		isAppStatusError: function()
		{
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_LOAD_ERROR)
			{
				return true;
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_SAVE_ERROR)
			{
				return true;
			}
			return false;
		},
		/**
 * Returns app status message
 */
		getAppStatusMessage: function()
		{
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_LOAD_PROCESS)
			{
				return "Loading...";
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_LOAD_SUCCESS)
			{
				return "Loaded";
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_LOAD_ERROR)
			{
				return this.model.load_error_message;
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_CHANGED)
			{
				return "";
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_SAVE_PROCESS)
			{
				return "Saving...";
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_SAVE_SUCCESS)
			{
				return "Saved";
			}
			if (this.model.app_status == BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.STATUS_SAVE_ERROR)
			{
				return "Save error";
			}
			return "";
		},
		/**
 * Toggle property
 */
		toggleMenu: function(e, name)
		{
			if (this.model.menu_selected != name)
			{
				this.model.menu_selected = name;
			}
			else
			{
				this.model.menu_selected = "";
			}
			this.nextTick(() =>
			{
				var page_model = this.model.getFramePageModel();
				if (page_model)
				{
					page_model.updateSelectedBox();
				}
			});
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		/**
 * Mounted
 */
		onMounted: function()
		{
			var iframe = this.getRef("iframe");
			var iframe_window = iframe.contentWindow;
			var iframe_document = iframe.contentDocument;
			/* Setup iframe */
			this.model.iframe = iframe;
			/* Load widget */
			this.model.loadWidget();
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetEditPage,
{
	components: function()
	{
		return Runtime.Vector.from(["BayLang.Constructor.Frontend.CSS","BayLang.Constructor.Frontend.Editor.Breadcrumbs","BayLang.Constructor.Frontend.Editor.WidgetMenu"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".index_page.h-c72c{display: flex;flex-direction: column;height: 100vh}.widget_edit_page__menu.h-c72c{display: flex;justify-content: flex-start;border-bottom: 1px var(--widget-color-border) solid}.widget_edit_page__menu--right.h-c72c{justify-content: right}.widget_edit_page__menu_item.h-c72c{cursor: pointer;user-select: none;padding: 10px}.widget_edit_page__menu_item--button.h-c72c{text-align: center;min-width: 40px}.widget_edit_page__menu_item--error.h-c72c{color: var(--widget-color-danger)}.widget_edit_page__menu_item--select_size.h-c72c{display: flex;padding: 0px}.widget_edit_page__menu_item--select_size.h-c72c .widget_edit_page__iframe_size.h-c72c{display: flex;justify-content: center;align-items: center;width: 40px;padding: 10px}.widget_edit_page__menu_item--select_size.h-c72c .widget_edit_page__iframe_size.selected.h-c72c{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.widget_edit_page__menu_item--selected.h-c72c{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.widget_edit_page__menu_item_gap.h-c72c{display: flex;flex: 1}.widget_edit_page__content.h-c72c{display: flex;flex: 1;height: calc(100vh - 41px)}.widget_edit_page__frame.h-c72c{display: flex;flex-direction: column;justify-content: stretch;align-items: stretch;width: calc(100% - 300px);position: relative;padding: 0px;flex: 1}.widget_edit_page__frame_wrap.h-c72c{display: flex;justify-content: center;flex: 1}.widget_edit_page__frame.h-c72c iframe{border-style: none;overflow: visible;width: 100%}");
		res += Runtime.rtl.toStr(".scroll-lock{overflow: hidden;padding-right: 0px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetEditPage";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.WidgetEditPage);
window["BayLang.Constructor.Frontend.Editor.WidgetEditPage"] = BayLang.Constructor.Frontend.Editor.WidgetEditPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.WidgetEditPage;