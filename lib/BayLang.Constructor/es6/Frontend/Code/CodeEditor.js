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
if (typeof BayLang.Constructor.Frontend.Code == 'undefined') BayLang.Constructor.Frontend.Code = {};
BayLang.Constructor.Frontend.Code.CodeEditor = {
	name: "BayLang.Constructor.Frontend.Code.CodeEditor",
	extends: Runtime.Web.Component,
	methods:
	{
		renderMenu: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["code_editor__menu"])});
			
			/* Element 'a' */
			let __v1 = this._e(__v0, "a", {"href":((this.layout.route.data) ? (this.layout.route.data.get("back_url")) : (this.layout.url("baylang:project:modules", Runtime.Map.from({"project_id":this.model.project_id})))),"class":this._class_name(["code_editor__menu_item nolink"])});
			
			/* Text */
			this._t(__v1, "Back");
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"onClick":() =>
			{
				this.model.save();
			},"class":this._class_name(["code_editor__menu_item"])});
			
			/* Text */
			this._t(__v2, "Save");
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", {"class":this._class_name(["code_editor_menu_item code_editor_menu_item_file_name"])});
			
			if (this.model.selected_tab)
			{
				/* Render */
				this._t(__v3, this.model.selected_tab.file_path);
			}
			
			return this._flatten(__v);
		},
		renderTabs: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"ref":"tabs","onMousewheel":(e) =>
			{
				var tabs = this.getRef("tabs");
				tabs.scrollLeft = tabs.scrollLeft + e.deltaY;
				e.preventDefault();
				e.stopPropagation();
			},"class":this._class_name(["code_editor__tabs"])});
			
			for (let i = 0; i < this.model.tabs.count(); i++)
			{
				let item = this.model.tabs.get(i);
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"onMousedown":(e) =>
				{
					if (e.button == 1)
					{
						this.model.removeTab(item);
					}
				},"onClick":(e) =>
				{
					this.model.selectTab(item);
				},"class":this._class_name(["code_editor__tab", ((item == this.model.selected_tab) ? ("selected") : (""))]),"key":item.file_path});
				
				/* Element 'div' */
				let __v2 = this._e(__v1, "div", {"class":this._class_name(["code_editor__label"])});
				
				/* Render */
				this._t(__v2, item.label);
				
				/* Element 'div' */
				let __v3 = this._e(__v1, "div", {"onClick":(e) =>
				{
					this.model.removeTab(item);
					e.preventDefault();
					e.stopPropagation();
				},"class":this._class_name(["code_editor__icon"])});
				
				/* Element 'span' */
				let __v4 = this._e(__v3, "span", {});
				
				/* Raw */
				this._t(__v4, new Runtime.RawString("&#10005;"));
			}
			
			return this._flatten(__v);
		},
		renderStatusBar: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["code_editor__status_bar"])});
			
			/* Render */
			this._t(__v0, this.model.save_result.message);
			
			return this._flatten(__v);
		},
		renderFileEditor: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["code_editor__file_edit"])});
			
			for (let i = 0; i < this.model.tabs.count(); i++)
			{
				let item = this.model.tabs.get(i);
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["code_editor__file", ((item == this.model.selected_tab) ? ("") : ("hide"))]),"key":item.file_path});
				
				/* Component 'TextEditable' */
				let __v2 = this._c(__v1, "BayLang.Constructor.Frontend.Code.TextEditable", {"value":item.content,"reference":item.code_editor,"onValueChange":(e) =>
				{
					item.content = e.value;
				},"class":this._class_name(["wrap"])});
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["code_editor"])});
			
			/* Render */
			this._t(__v0, this.renderMenu());
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["code_editor__main"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v1, "div", {"class":this._class_name(["code_editor__file_manager"])});
			
			/* Render */
			this._t(__v2, this.renderWidget(this.model.tree));
			
			/* Element 'div' */
			let __v3 = this._e(__v1, "div", {"class":this._class_name(["code_editor__content"])});
			
			/* Render */
			this._t(__v3, this.renderTabs());
			
			/* Render */
			this._t(__v3, this.renderFileEditor());
			
			/* Render */
			this._t(__v3, this.renderStatusBar());
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.confirm_dialog));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.prompt_dialog));
			
			return this._flatten(__v);
		},
		/**
 * Mounted
 */
		onMounted: function()
		{
			document.addEventListener("keydown", this.onKeyDown);
		},
		/**
 * Key down
 */
		onKeyDown: function(e)
		{
			if (e.key == "s" && e.ctrlKey)
			{
				this.model.save();
				e.preventDefault();
			}
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Code.CodeEditor,
{
	components: function()
	{
		return Runtime.Vector.from(["BayLang.Constructor.Frontend.Code.TextEditable"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".code_editor.h-fd5f{display: flex;position: relative;flex-direction: column;overflow-y: hidden;height: 100vh}.code_editor__menu.h-fd5f{display: flex;border-bottom: 1px var(--widget-color-border) solid}.code_editor__menu_item.h-fd5f{cursor: pointer;user-select: none;padding: 10px}.code_editor_menu_item_file_name.h-fd5f{display: flex;align-items: center;justify-content: center;flex: 1}.code_editor__main.h-fd5f{display: flex;height: calc(100% - 37px)}.code_editor__file_manager.h-fd5f{position: relative;border-right: 1px var(--widget-color-border) solid;overflow-x: auto;padding-left: 5px;width: 300px;overflow-x: auto;padding-left: 5px}.code_editor__content.h-fd5f{display: flex;flex-direction: column;height: 100%;width: calc(100% - 300px)}.code_editor__tabs.h-fd5f{display: flex;height: 32px;border-bottom: 1px var(--widget-color-border) solid;overflow-x: auto;scrollbar-width: none}.code_editor__tab.h-fd5f{display: flex;border-right: 1px var(--widget-color-border) solid;padding: 5px;cursor: pointer;user-select: none}.code_editor__tab.selected.h-fd5f{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.code_editor__label.h-fd5f{display: flex;align-items: center;padding-left: 5px;flex: 1}.code_editor__icon.h-fd5f{display: flex;align-items: center;justify-content: center;padding-top: 3px;width: 24px}.code_editor__icon.h-fd5f span{padding: 1px}.code_editor__icon.h-fd5f:hover span{background-color: #f0f0f0}.code_editor__tab.selected.h-fd5f .code_editor__icon:hover span{background-color: var(--widget-color-primary)}.code_editor__file_edit.h-fd5f{position: relative;height: calc(100% - 56px)}.code_editor__file.h-fd5f{overflow-y: auto;height: 100%}.code_editor__file.h-fd5f .widget_text_editable.h-6975{border-width: 0px;padding: 5px}.code_editor__file.hide.h-fd5f{display: none}.code_editor__status_bar.h-fd5f{display: flex;align-items: center;padding: 2px;padding-left: 5px;border-top: 1px var(--widget-color-border) solid;height: 24px}");
		res += Runtime.rtl.toStr(".code_editor__tabs.h-fd5f::-webkit-scrollbar{width: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Code";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Code.CodeEditor";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Code.CodeEditor);
window["BayLang.Constructor.Frontend.Code.CodeEditor"] = BayLang.Constructor.Frontend.Code.CodeEditor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Code.CodeEditor;