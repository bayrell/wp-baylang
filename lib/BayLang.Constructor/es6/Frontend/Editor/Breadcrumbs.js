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
BayLang.Constructor.Frontend.Editor.Breadcrumbs = {
	name: "BayLang.Constructor.Frontend.Editor.Breadcrumbs",
	extends: Runtime.Web.Component,
	methods:
	{
		renderRow: function(item, pos, is_menu)
		{
			let __v = [];
			let selected_path = this.model.selected.path;
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["breadcrumbs__item_row"])});
			
			/* Element 'span' */
			let __v1 = this._e(__v0, "span", {"onClick":() =>
			{
				if (is_menu)
				{
					this.model.selectBreadcrumbs(pos);
				}
				else
				{
					this.model.breadcrumbs_selected = -1;
					this.model.selectItem(selected_path.slice(0, pos + 1));
				}
				this.model.context_menu.hide();
			},"onContextmenu":(e) =>
			{
				e.preventDefault();
				/* Select item */
				this.model.breadcrumbs_selected = -1;
				this.model.selectItem(selected_path.slice(0, pos + 1));
				/* Show context menu */
				var x = e.clientX;
				var y = e.clientY;
				this.model.context_menu.show(x, y);
				return false;
			},"class":this._class_name(["breadcrumbs__item_name"])});
			
			/* Render */
			this._t(__v1, (item != null) ? (item.label) : ("Select value"));
			
			if (is_menu)
			{
				/* Element 'div' */
				let __v2 = this._e(__v0, "div", {"onClick":() =>
				{
					this.model.selectBreadcrumbs(pos);
				},"class":this._class_name(["breadcrumbs__item_arrow"])});
				
				/* Raw */
				this._t(__v2, new Runtime.RawString("&#9661;"));
			}
			
			return this._flatten(__v);
		},
		renderMenu: function(parent_item, pos, is_last)
		{
			let __v = [];
			let selected_path = this.model.selected.path;
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["breadcrumbs__item_menu", ((this.model.breadcrumbs_selected == pos) ? ("breadcrumbs__item_menu--open") : (""))])});
			
			if (parent_item && parent_item.items)
			{
				for (let j = 0; j < parent_item.items.count(); j++)
				{
					let menu_item = parent_item.items.get(Runtime.Vector.from([j]));
					
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"onClick":() =>
					{
						this.model.selectItem(selected_path.slice(0, pos).pushIm(j));
						this.model.context_menu.hide();
					},"class":this._class_name(["breadcrumbs__item_menu_name"])});
					
					/* Render */
					this._t(__v1, menu_item.label);
				}
			}
			
			if (is_last)
			{
				/* Element 'div' */
				let __v2 = this._e(__v0, "div", {"onClick":() =>
				{
					this.model.breadcrumbs_selected = -1;
					this.model.add_item_dialog.show(selected_path.slice(0, pos));
				},"class":this._class_name(["breadcrumbs__item_menu_name"])});
				
				/* Text */
				this._t(__v2, "+ Add Widget");
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["breadcrumbs"])});
			let item = this.model.tree.root;
			let selected_path = this.model.selected.path;
			
			if (selected_path)
			{
				for (let i = 0; i < selected_path.count(); i++)
				{
					if (item != null)
					{
						let parent_item = item;
						item = item.get(Runtime.Vector.from([selected_path.get(i)]));
						
						/* Element 'div' */
						let __v1 = this._e(__v0, "div", {"class":this._class_name(["breadcrumbs__item breadcrumbs__item--value"])});
						
						/* Render row */
						if (i < selected_path.count() - 1)
						{
							/* Render */
							this._t(__v1, this.renderRow(item, i, false));
						}
						else
						{
							/* Render */
							this._t(__v1, this.renderRow(item, i, true));
							
							/* Render */
							this._t(__v1, this.renderMenu(parent_item, i, false));
						}
						
						/* Element 'div' */
						let __v2 = this._e(__v0, "div", {"class":this._class_name(["breadcrumbs__item breadcrumbs__item--next"])});
						
						/* Raw */
						this._t(__v2, new Runtime.RawString("->"));
					}
				}
				
				/* Element 'div' */
				let __v3 = this._e(__v0, "div", {"class":this._class_name(["breadcrumbs__item breadcrumbs__item--last"])});
				
				/* Render row */
				/* Render */
				this._t(__v3, this.renderRow(null, selected_path.count(), true));
				
				/* Render */
				this._t(__v3, this.renderMenu(item, selected_path.count(), true));
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.Breadcrumbs,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".breadcrumbs.h-f2af{display: flex;border-bottom: 1px var(--widget-color-border) solid;height: 32px;padding-left: 5px;overflow-x: auto;scrollbar-width: none}.breadcrumbs__item_row.h-f2af{display: flex}.breadcrumbs__item_name.h-f2af,.breadcrumbs__item_arrow.h-f2af,.breadcrumbs__item--next.h-f2af,.breadcrumbs__item_menu_name.h-f2af{display: flex;align-items: center;justify-content: center;min-height: 31px}.breadcrumbs__item_name.h-f2af{cursor: pointer;padding-left: 5px}.breadcrumbs__item_name.h-f2af span{flex: 1}.breadcrumbs__item_arrow.h-f2af{cursor: pointer;width: 20px}.breadcrumbs__item_menu.h-f2af{display: none;position: absolute;background-color: white;border: 1px var(--widget-color-border) solid}.breadcrumbs__item_menu--open.h-f2af{display: block}.breadcrumbs__item_menu_name.h-f2af{justify-content: flex-start;padding-left: 5px;padding-right: 5px;border-bottom: 1px var(--widget-color-border) solid;cursor: pointer}.breadcrumbs__item_menu_name.h-f2af:hover{background-color: var(--widget-color-hover)}.breadcrumbs__item_menu_name.h-f2af:last-child{border-bottom-width: 0px}.breadcrumbs__item--next.h-f2af{text-wrap: nowrap;padding: 0px 5px;width: 20px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Breadcrumbs";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Breadcrumbs);
window["BayLang.Constructor.Frontend.Editor.Breadcrumbs"] = BayLang.Constructor.Frontend.Editor.Breadcrumbs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Breadcrumbs;