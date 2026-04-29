"use strict;"
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
	extends: Runtime.Component,
	methods:
	{
		renderBox: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.drag_dest_box)
			{
				/* Element div */
				__v.element("div", new Runtime.Map({"class": rs.className(["tree_widget__box", "tree_widget__box--" + String(this.drag_dest_kind), componentHash]), "style": this.drag_dest_box}));
			}
			
			return __v;
		},
		renderItemLabel: function(item, path)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element span */
			let __v0 = __v.element("span", new Runtime.Map({"class": rs.className(["tree_widget__item_label", componentHash]), "onMousedown": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
			{
				this.onMouseDownItem(event, path);
			}), "onContextmenu": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
			{
				this.onContextMenuItem(event, path);
			})}));
			__v0.push(item.label);
			
			return __v;
		},
		renderItemContent: function(item, path)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.model.has_icons)
			{
				if (item.icon_svg)
				{
					/* Element span */
					__v.element("span", new Runtime.Map({"class": rs.className(["tree_widget__item_icon", componentHash]), "@raw": item.icon_svg}));
				}
				else
				{
					/* Element span */
					let __v0 = __v.element("span", new Runtime.Map({"class": rs.className(["tree_widget__item_icon", componentHash])}));
					
					/* Element img */
					__v0.element("img", new Runtime.Map({"src": item.icon_path}));
				}
			}
			__v.push(this.renderItemLabel(item, path));
			
			return __v;
		},
		renderItem: function(item, path)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["tree_widget__item", item == this.model.selected_item ? "selected" : "", componentHash]), "data-path": Runtime.rs.join(".", path), "key": "item." + String(Runtime.rs.join(".", path)) + String("-") + String(item.key), "onMousemove": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
			{
				this.onMouseMoveItem(event, path);
			})}));
			__v0.push(this.renderItemContent(item, path));
			__v.push(this.renderItems(item, path));
			
			return __v;
		},
		renderItems: function(item, path)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (item != null && item.items != null && item.items.count() > 0)
			{
				let key = path.count() > 0 ? "item." + String(Runtime.rs.join(".", path)) + String(".items") : "item";
				
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["tree_widget__items", !item.open ? "hide" : "", componentHash]), "key": key}));
				
				for (let i = 0; i < item.items.count(); i++)
				{
					__v0.push(this.renderItem(item.items.get(i), path.concat(Runtime.Vector.create([i]))));
				}
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["tree_widget", componentHash]), "@ref": "widget", "onContextmenu": this.hash(3) ? this.hash(3) : this.hash(3, (event) =>
			{
				this.onContextMenuItem(event);
			}), "onMousedown": this.hash(4) ? this.hash(4) : this.hash(4, (event) =>
			{
				this.onMouseDown(event);
			}), "onMouseup": this.hash(5) ? this.hash(5) : this.hash(5, (event) =>
			{
				this.onMouseUp(event);
			}), "onMousemove": this.hash(6) ? this.hash(6) : this.hash(6, (event) =>
			{
				this.onMouseMove(event);
			})}));
			__v0.push(this.renderBox());
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["tree_widget__content", componentHash]), "@ref": "content"}));
			__v1.push(this.renderItems(this.model.root, Runtime.Vector.create([])));
			
			if (this.model.context_menu && this.model.context_menu_render)
			{
				__v.push(this.renderWidget(this.model.context_menu));
			}
			
			return __v;
		},
		/**
		 * Show context menu
		 */
		showContextMenu: function(e)
		{
			let x, y;
			if (this.model.context_menu_render)
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
		onContextMenuItem: function(e, path)
		{
			/* Send message context menu */
			this.model.listener.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.create({
				"name": "contextMenu",
				"path": path,
				"item": this.model.root.get(path),
				"event": e,
			})));
			/* Select item */
			if (this.model.autoselect)
			{
				this.model.selectItem(path);
				/* Send event */
				this.model.listener.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.create({
					"kind": "context_menu",
					"name": "selectItem",
					"path": path,
					"item": this.model.selected_item,
				})));
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
		onMouseDownItem: function(e, path)
		{
			if (e.button != 0) return;
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
			this.model.listener.emit(new Runtime.Widget.Tree.TreeMessage(Runtime.Map.create({
				"kind": "click",
				"name": "selectItem",
				"path": path,
				"item": this.model.root.get(path),
				"event": e,
			})));
			/* Set start drag item */
			if (this.model.dnd) this.model.dnd.onMouseDownItem(e, path);
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
			if (this.model.dnd) this.model.dnd.stopDrag();
		},
		/**
		 * Mouse move item
		 */
		onMouseMoveItem: function(e, path)
		{
			if (this.model.dnd) this.model.dnd.onMouseMoveItem(e, path);
		},
		/**
		 * Mouse tree move
		 */
		onMouseMove: function(e)
		{
			if (this.model.dnd) this.model.dnd.onMouseMove(e);
		},
		getClassName: function(){ return "Runtime.Widget.Tree.TreeWidget"; },
	},
	computed:
	{
		/**
		 * Returns dest box
		 */
		drag_dest_box: function()
		{
			if (this.model.dnd && this.model.dnd.is_drag) return this.model.dnd.drag_dest_box;
			return "";
		},
		/**
		 * Returns drag dest kind
		 */
		drag_dest_kind: function()
		{
			if (this.model.dnd && this.model.dnd.is_drag) return this.model.dnd.drag_dest_kind;
			return "";
		},
	},
	/**
	 * Mount component
	 */
	mounted: function()
	{
		window.addEventListener("mousemove", this.onMouseMove);
		window.addEventListener("mouseup", this.onMouseUp);
		if (this.model.dnd)
		{
			this.model.dnd.component = this;
		}
	},
	/**
	 * Unmounted
	 */
	unmounted: function()
	{
		window.removeEventListener("mousemove", this.onMouseMove);
		window.removeEventListener("mouseup", this.onMouseUp);
	},
	getComponentStyle: function(){ return ".tree_widget.h-fd25{position: relative}.tree_widget__items.h-fd25 > .tree_widget__items{padding-left: 10px}.tree_widget__items.hide.h-fd25{display: none}.tree_widget__item_icon.h-fd25{display: inline-block;padding: 5px}.tree_widget__item_label.h-fd25{display: inline-block;padding: 5px;cursor: pointer;user-select: none}.tree_widget__item.selected.h-fd25 > .tree_widget__item_label{background-color: var(--color-primary);color: var(--color-primary-text)}.tree_widget__box.h-fd25{position: absolute;border-style: solid;border-width: 0;border-color: transparent}.tree_widget__box--into.h-fd25{background-color: rgba(255, 0, 0, 0.5);pointer-events: none}.tree_widget__box--before.h-fd25, .tree_widget__box--after.h-fd25{border-top-width: 2px;border-top-color: red}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Tree.TreeWidget"] = Runtime.Widget.Tree.TreeWidget;