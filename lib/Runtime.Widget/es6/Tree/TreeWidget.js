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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Tree == 'undefined') Runtime.Widget.Tree = {};
Runtime.Widget.Tree.TreeWidget = {
	name: "Runtime.Widget.Tree.TreeWidget",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			is_drag: false,
			drag_elem: null,
			drag_start_point: null,
			drag_dest_box: null,
			drag_dest_elem: null,
			drag_dest_item: null,
			drag_dest_kind: null,
		};
	},
	methods:
	{
		renderBox: function()
		{
			let __v = [];
			
			if (this.drag_dest_box != null && this.is_drag)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"style":this.drag_dest_box,"class":this._class_name(["tree_widget__box", "tree_widget__box--" + Runtime.rtl.toStr(this.drag_dest_kind)])});
			}
			
			return this._flatten(__v);
		},
		renderItemLabel: function(item, path)
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {"onMousedown":(e) =>
			{
				this.onMouseDownItem(e, item, path);
			},"class":this._class_name(["tree_widget__item_label"])});
			
			/* Render */
			this._t(__v0, item.label);
			
			return this._flatten(__v);
		},
		renderItemContent: function(item, path)
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderItemLabel(item, path));
			
			return this._flatten(__v);
		},
		renderItem: function(item, path)
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-path":Runtime.rs.join(".", path),"onContextmenu":(e) =>
			{
				this.onContextMenuItem(e, item, path);
			},"onMousemove":(e) =>
			{
				this.onMouseMoveItem(e, item);
			},"class":this._class_name(["tree_widget__item", ((item == this.model.selected_item) ? ("selected") : (""))]),"key":"item." + Runtime.rtl.toStr(Runtime.rs.join(".", path)) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(item.key)});
			
			/* Render */
			this._t(__v0, this.renderItemContent(item, path));
			
			/* Render */
			this._t(__v, this.renderItems(item, path));
			
			return this._flatten(__v);
		},
		renderItems: function(item, path)
		{
			let __v = [];
			
			if (item != null && item.items != null && item.items.count() > 0)
			{
				let key = (path.count() > 0) ? ("item." + Runtime.rtl.toStr(Runtime.rs.join(".", path)) + Runtime.rtl.toStr(".items")) : ("item");
				
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["tree_widget__items", ((!item.open) ? ("hide") : (""))]),"key":key});
				
				for (let i = 0; i < item.items.count(); i++)
				{
					/* Render */
					this._t(__v0, this.renderItem(item.items.get(i), path.pushIm(i)));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"ref":"widget","onContextmenu":(e) =>
			{
				this.onContextMenuItem(e, null, null);
			},"onMousedown":(e) =>
			{
				this.onMouseDown(e, null, null);
			},"onMouseup":(e) =>
			{
				this.onMouseUp(e);
			},"onMousemove":(e) =>
			{
				this.onMouseMove(e);
			},"class":this._class_name(["tree_widget"])});
			
			/* Render */
			this._t(__v0, this.renderBox());
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"ref":"content","class":this._class_name(["tree_widget__content"])});
			
			/* Render */
			this._t(__v1, this.renderItems(this.model.root, Runtime.Vector.from([])));
			
			if (this.model.context_menu && this.model.render_context_menu)
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.context_menu));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns src elem
 */
		getSrc: function()
		{
			if (!this.drag_elem)
			{
				return null;
			}
			var src_elem_path = this.drag_elem.getAttribute("data-path");
			var src_elem = (src_elem_path) ? (Runtime.rs.split(".", src_elem_path)) : (Runtime.Vector.from([]));
			return src_elem.map((s) =>
			{
				return Runtime.rtl.to(s, {"e":"int"});
			});
		},
		/**
 * Returns dest elem
 */
		getDest: function()
		{
			if (!this.drag_dest_elem)
			{
				return null;
			}
			var dest_elem_path = this.drag_dest_elem.getAttribute("data-path");
			var dest_elem = (dest_elem_path) ? (Runtime.rs.split(".", dest_elem_path)) : (Runtime.Vector.from([]));
			return dest_elem.map((s) =>
			{
				return Runtime.rtl.to(s, {"e":"int"});
			});
		},
		/**
 * Find drag elem
 */
		findDragElem: function(elem)
		{
			if (elem.classList.contains("tree_widget__item_label"))
			{
				return elem.parentElement;
			}
			return elem;
		},
		/**
 * Find elem by path
 */
		findElemByPath: function(path)
		{
			var path = ".tree_widget__item[data-path='" + Runtime.rtl.toStr(path) + Runtime.rtl.toStr("']");
			return document.querySelector(path);
		},
		/**
 * Returns true if elem inside drag_elem
 */
		checkInside: function(elem)
		{
			if (!this.drag_elem)
			{
				return false;
			}
			if (elem == this.drag_elem)
			{
				return false;
			}
			var drag_elem_path = this.drag_elem.getAttribute("data-path");
			var elem_path = elem.getAttribute("data-path");
			if (drag_elem_path == elem_path)
			{
				return true;
			}
			if (Runtime.rs.substr(elem_path, 0, Runtime.rs.strlen(drag_elem_path) + 1) == drag_elem_path + Runtime.rtl.toStr("."))
			{
				return true;
			}
			return false;
		},
		/**
 * Start Drag & Drop
 */
		startDrag: function(e)
		{
			if (!this.model.dnd)
			{
				return false;
			}
			if (this.is_drag != false)
			{
				return false;
			}
			if (this.drag_start_point == null)
			{
				return false;
			}
			if (Runtime.Math.abs(e.layerY - this.drag_start_point.get("y")) > 5)
			{
				return false;
			}
			this.is_drag = true;
			return true;
		},
		/**
 * Stop drag & drop
 */
		stopDrag: function()
		{
			/* Do drag & drop */
			if (this.drag_dest_box && this.drag_elem && this.drag_dest_elem)
			{
				this.model.dragElement(this.getSrc(), this.getDest(), this.drag_dest_kind);
			}
			this.is_drag = false;
			this.drag_dest_box = null;
			this.drag_dest_elem = null;
			this.drag_dest_item = null;
			this.drag_dest_kind = null;
			this.drag_elem = null;
			this.drag_start_point = null;
		},
		/**
 * Set drag & drop dest element
 */
		setDragDestElement: function(elem, item, kind)
		{
			if (!this.is_drag)
			{
				return ;
			}
			if (this.checkInside(elem))
			{
				return ;
			}
			if (kind == "into" && this.drag_elem == elem)
			{
				kind = "before";
			}
			if (kind == "into" && item != null && !item.canDragInside())
			{
				kind = "after";
			}
			if (this.drag_dest_elem == elem && this.drag_dest_kind == kind)
			{
				return ;
			}
			/* Setup box */
			if (this.drag_elem == elem)
			{
				this.drag_dest_box = null;
				return ;
			}
			/* Setup dest element */
			this.drag_dest_elem = elem;
			this.drag_dest_item = item;
			/* Get elem path */
			var src_path = this.getSrc();
			var dest_path = this.getDest();
			if (dest_path == null)
			{
				this.drag_dest_box = null;
				return ;
			}
			/* Can drag */
			var can_drag = this.model.canDrag(src_path, dest_path, kind);
			if (!can_drag)
			{
				if (kind == "into")
				{
					kind = "after";
					can_drag = this.model.canDrag(src_path, dest_path, kind);
					if (!can_drag)
					{
						this.drag_dest_box = null;
						return ;
					}
				}
			}
			/* Setup dest values */
			this.drag_dest_kind = kind;
			this.drag_dest_box = this.getBoxStyles(elem, kind);
		},
		/**
 * Returns box styles by element
 */
		getBoxStyles: function(elem, kind)
		{
			if (kind == undefined) kind = "";
			var left;
			var top;
			var width;
			var height;
			left = elem.offsetLeft;
			top = elem.offsetTop;
			width = elem.clientWidth - 1;
			height = elem.clientHeight - 1;
			if (kind == "before")
			{
				return Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: 1px"]));
			}
			if (kind == "after")
			{
				return Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top + height) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: 1px"]));
			}
			if (kind == "into")
			{
				return Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: " + Runtime.rtl.toStr(height) + Runtime.rtl.toStr("px")]));
			}
			return null;
		},
		/**
 * Show context menu
 */
		showContextMenu: function(e)
		{
			var x;
			var y;
			if (this.model.render_context_menu)
			{
				x = e.layerX;
				y = e.layerY;
			}
			else
			{
				x = e.clientX;
				y = e.clientY;
			}
			this.model.context_menu.show(x, y);
		},
		/**
 * Mouse context menu item click
 */
		onContextMenuItem: function(e, item, path)
		{
			/* Send message context menu */
			this.model.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"name":"contextMenu","path":path,"item":item,"event":e})));
			if (item)
			{
				item.onContextMenu(this.model);
			}
			/* Select item */
			if (this.model.autoselect)
			{
				this.model.selectItem(path);
				/* Send event */
				this.model.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"kind":"context_menu","name":"selectItem","path":this.model.selected_path,"item":this.model.selected_item})));
			}
			/* Show context menu */
			if (this.model.context_menu)
			{
				this.showContextMenu(e);
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		/**
 * Mouse down
 */
		onMouseDownItem: function(e, item, path)
		{
			if (e.button != 0)
			{
				return ;
			}
			/* Hide context menu */
			if (this.model.context_menu)
			{
				this.model.context_menu.hide();
			}
			/* Select item */
			if (this.model.autoselect)
			{
				this.model.selectItem(path);
			}
			/* Send event */
			this.model.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.from({"kind":"click","name":"selectItem","path":this.model.selected_path,"item":this.model.selected_item,"event":e})));
			if (item)
			{
				item.onClick(this.model);
			}
			/* Set start drag item */
			if (this.model.dnd)
			{
				this.drag_elem = this.findDragElem(e.currentTarget);
				this.drag_start_point = Runtime.Map.from({"x":e.layerX,"y":e.layerY});
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		},
		/**
 * Mouse down
 */
		onMouseDown: function(e)
		{
			if (this.model.context_menu)
			{
				this.model.context_menu.hide();
			}
		},
		/**
 * Mouse tree up
 */
		onMouseUp: function(e)
		{
			this.stopDrag();
		},
		/**
 * Mouse move item
 */
		onMouseMoveItem: function(e, item)
		{
			if (this.drag_elem == null)
			{
				return ;
			}
			/* Try to start drag & drop */
			if (!this.is_drag)
			{
				this.startDrag(e);
			}
			if (!this.is_drag)
			{
				return ;
			}
			/* Drag & Drop started */
			var target = e.currentTarget;
			var top = target.offsetTop;
			var bottom = target.offsetTop + target.clientHeight;
			var center = (top + bottom) / 2;
			var kind = "before";
			if (e.layerY >= center)
			{
				kind = "into";
			}
			this.setDragDestElement(target, item, kind);
			e.preventDefault();
		},
		/**
 * Mouse tree move
 */
		onMouseMove: function(e)
		{
			if (this.drag_elem == null)
			{
				return ;
			}
			/* Try to start drag & drop */
			if (!this.is_drag)
			{
				this.startDrag(e);
			}
			if (!this.is_drag)
			{
				return ;
			}
			/* Outside of tree contents */
			var tree_content = this.getRef("content");
			if (e.layerY > tree_content.clientHeight)
			{
				this.setDragDestElement(tree_content, null, "after");
				e.preventDefault();
				return false;
			}
		},
	},
};
Object.assign(Runtime.Widget.Tree.TreeWidget,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tree_widget.h-fd26{position: relative;height: 100%}.tree_widget__items.h-fd26 > .tree_widget__items{padding-left: 10px}.tree_widget__items.hide.h-fd26{display: none}.tree_widget__item_label.h-fd26{display: inline-block;padding: 5px;cursor: pointer;user-select: none}.tree_widget__item.selected.h-fd26 > .tree_widget__item_label{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.tree_widget__box.h-fd26{position: absolute;border-style: solid;border-width: 0;border-color: transparent}.tree_widget__box--into.h-fd26{background-color: rgba(255, 0, 0, 0.5);pointer-events: none}.tree_widget__box--before.h-fd26,.tree_widget__box--after.h-fd26{border-top-width: 2px;border-top-color: red}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Tree";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tree.TreeWidget";
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
Runtime.rtl.defClass(Runtime.Widget.Tree.TreeWidget);
window["Runtime.Widget.Tree.TreeWidget"] = Runtime.Widget.Tree.TreeWidget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tree.TreeWidget;