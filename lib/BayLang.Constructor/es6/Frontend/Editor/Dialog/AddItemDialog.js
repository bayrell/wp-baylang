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
if (typeof BayLang.Constructor.Frontend.Editor.Dialog == 'undefined') BayLang.Constructor.Frontend.Editor.Dialog = {};
BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog = {
	name: "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["groups"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v1, "div", {"class":this._class_name(["list_title"])});
			
			/* Text */
			this._t(__v2, "Groups");
			
			/* Element 'div' */
			let __v3 = this._e(__v1, "div", {"class":this._class_name(["list_items"])});
			
			for (let i = 0; i < this.model.current_groups.count(); i++)
			{
				let group = this.model.current_groups.get(i);
				
				/* Element 'div' */
				let __v4 = this._e(__v3, "div", {"onClick":() =>
				{
					this.model.selected_group_name = group.get("name");
				},"class":this._class_name(["list_item", ((this.model.selected_group_name == group.get("name")) ? ("selected") : (""))])});
				
				/* Render */
				this._t(__v4, group.get("label"));
			}
			
			/* Element 'div' */
			let __v5 = this._e(__v0, "div", {"class":this._class_name(["widgets"])});
			
			/* Element 'div' */
			let __v6 = this._e(__v5, "div", {"class":this._class_name(["list_title"])});
			
			/* Text */
			this._t(__v6, "Select component");
			
			/* Element 'div' */
			let __v7 = this._e(__v5, "div", {"class":this._class_name(["list_items"])});
			
			if (this.model.current_widgets)
			{
				for (let i = 0; i < this.model.current_widgets.count(); i++)
				{
					let widget = this.model.current_widgets.get(i);
					
					if (this.model.selected_group_name == widget.getGroupName())
					{
						/* Element 'div' */
						let __v8 = this._e(__v7, "div", {"onClick":() =>
						{
							this.model.selectItem(widget);
						},"class":this._class_name(["list_item"])});
						
						/* Render */
						this._t(__v8, widget.getWidgetName());
					}
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Input","Runtime.Widget.Select"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog__content.h-864d{display: flex;min-height: 250px}.list_title.h-864d{margin-bottom: 10px}.list_item.h-864d{cursor: pointer;padding: 10px}.list_item.h-864d:hover{background-color: var(--widget-color-hover)}.list_item.selected.h-864d{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.widget_dialog__content.h-864d .groups{width: 30%;padding-right: 10px}.widget_dialog__content.h-864d .groups .list_items.h-864d{border: var(--widget-border-width) var(--widget-color-border) solid;border-radius: 4px}.widget_dialog__content.h-864d .groups .list_item.h-864d{border-bottom: var(--widget-border-width) var(--widget-color-border) solid}.widget_dialog__content.h-864d .groups .list_item.h-864d:last-child{border-bottom-width: 0px}.widget_dialog__content.h-864d .widgets{width: 70%}.widget_dialog__content.h-864d .widgets .list_items.h-864d{display: flex;align-items: stretch;justify-content: space-between;flex-wrap: wrap;gap: 15px}.widget_dialog__content.h-864d .widgets .list_item.h-864d{border: var(--widget-border-width) var(--widget-color-border) solid;border-radius: 4px;text-align: center;flex: 1 1 30%}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog);
window["BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog"] = BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog;