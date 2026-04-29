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
if (typeof Runtime.Widget.Sortable == 'undefined') Runtime.Widget.Sortable = {};
Runtime.Widget.Sortable.ItemList = {
	name: "Runtime.Widget.Sortable.ItemList",
	extends: Runtime.Component,
	props: {
		show_buttons: {default: "true"},
		name: {default: ""},
		value: {default: Runtime.Vector.create([])},
	},
	data: function()
	{
		return {
			old_value: Runtime.Vector.create([]),
			is_drag: false,
			is_transition: false,
			drag_elem: null,
			drag_item: null,
			drag_item_pos: -1,
			shadow_elem: null,
			drag_elem_css: null,
			drag_start_point: null,
			duration: 300,
		};
	},
	methods:
	{
		renderValue: function(pos, item)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element Runtime.Widget.Input */
			__v.element("Runtime.Widget.Input", new Runtime.Map({"value": item, "key": item, "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (message) =>
			{
				let items = this.getItems();
				items.set(pos, message.value);
				this.onValueChange();
			})}));
			
			return __v;
		},
		renderItem: function(pos)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let item = this.getItems().get(pos);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item", componentHash]), "data-pos": pos, "key": item}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_drag", componentHash]), "onMousedown": this.hash(1) ? this.hash(1) : this.hash(1, (e) =>
			{
				this.onMouseDown(e, item);
			})}));
			__v1.push("@raw");
			__v1.push("&#9776;");
			
			/* Element div */
			let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_value", componentHash])}));
			__v2.push(this.renderValue(pos, item));
			
			/* Element div */
			let __v3 = __v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__item_remove", componentHash]), "onClick": this.hash(2) ? this.hash(2) : this.hash(2, (e) =>
			{
				this.removeItem(pos);
			})}));
			__v3.push("@raw");
			__v3.push("&#10005;");
			
			return __v;
		},
		renderItems: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["sortable_list__items", componentHash])}));
			
			let items = this.getItems();
			if (items)
			{
				/* Element TransitionGroup */
				let __v1 = __v0.element("TransitionGroup", new Runtime.Map({"name": "sortable_list"}));
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					for (let i = 0; i < items.count(); i++)
					{
						__v.push(this.renderItem(i));
					}
					
					return __v;
				});
			}
			
			return __v;
		},
		renderButtons: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.show_buttons == "true")
			{
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["sortable_list__buttons", componentHash])}));
				
				/* Element Runtime.Widget.Button */
				let __v1 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"styles": Runtime.Vector.create(["small"]), "onClick": this.hash(3) ? this.hash(3) : this.hash(3, (event) =>
				{
					this.onAddItemClick();
				})}));
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Add");
					return __v;
				});
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["sortable_list", componentHash])}));
			__v0.push(this.renderItems());
			__v0.push(this.renderButtons());
			
			/* Element div */
			__v0.element("div", new Runtime.Map({"class": rs.className(["sortable_list__shadow", componentHash]), "@ref": "shadow"}));
			
			return __v;
		},
		/**
		 * Returns items
		 */
		getItems: function(){ return this.value; },
		/**
		 * Create new item
		 */
		createItem: function(){ return ""; },
		/**
		 * Copy item
		 */
		copyItem: function(item){ return item; },
		/**
		 * Create value
		 */
		createValue: function(){ return Runtime.Vector.create([]); },
		/**
		 * Swap items
		 */
		swapItems: function(a, b)
		{
			if (a > b)
			{
				let c = a;
				a = b;
				b = c;
			}
			let items = this.getItems();
			let obj_a = items.get(a);
			let obj_b = items.get(b);
			items.remove(b);
			items.insert(b, obj_a);
			items.remove(a);
			items.insert(a, obj_b);
		},
		/**
		 * Remove item
		 */
		removeItem: function(pos)
		{
			let items = this.getItems();
			this.old_value = this.value.slice();
			items.remove(pos);
			this.onValueChange();
		},
		/**
		 * Returns drag & drop element from point
		 */
		getDragElementFromPoint: function(x, y)
		{
			let items = document.elementsFromPoint(x, y);
			for (let i = 0; i < items.length; i++)
			{
				let elem = items[i];
				if (elem.parentElement == this.shadow_elem) continue;
				if (elem.classList.contains("sortable_list__item")) return elem;
			}
			return null;
		},
		/**
		 * Returns drag & drop element
		 */
		getDragElement: function(elem)
		{
			if (elem.classList.contains("sortable_list__item")) return elem;
			if (elem.parentElement.classList.contains("sortable_list__item"))
			{
				return elem.parentElement;
			}
			return null;
		},
		/**
		 * Create shadow elem
		 */
		createShadow: function()
		{
			if (!this.drag_elem) return;
			this.shadow_elem = document.createElement("div");
			this.shadow_elem.innerHTML = this.drag_elem.outerHTML;
			this.shadow_elem.classList.add("sortable_list__shadow_elem");
			let items = Runtime.rs.split(" ", Runtime.rs.getComponentHash(this.getClassName()));
			for (let i = 0; i < items.count(); i++) this.shadow_elem.classList.add(items.get(i));
			let arr = Runtime.rs.split(" ", Runtime.rs.getCssHash(this.getClassName()));
			arr = arr.filter((item) => { return item != ""; });
			for (let i = 0; i < arr.count(); i++)
			{
				this.shadow_elem.classList.add(arr.get(i));
			}
			this.shadow_elem.style.height = this.drag_elem.offsetHeight + String("px");
			this.shadow_elem.style.width = this.drag_elem.offsetWidth + String("px");
			this.getRef("shadow").appendChild(this.shadow_elem);
		},
		/**
		 * Move shadow element
		 */
		moveShadow: function(x, y)
		{
			if (!this.shadow_elem) return;
			let left = x - this.drag_start_point.get("shift_x");
			let top = y - this.drag_start_point.get("shift_y");
			this.shadow_elem.style.left = left + String("px");
			this.shadow_elem.style.top = top + String("px");
		},
		/**
		 * Start Drag & Drop
		 */
		startDrag: function(e)
		{
			if (this.is_drag != false) return false;
			if (this.drag_start_point == null) return false;
			/* Check move */
			let move_x = Runtime.rtl.abs(e.pageX - this.drag_start_point.get("x"));
			let move_y = Runtime.rtl.abs(e.pageY - this.drag_start_point.get("y"));
			if (move_x < 10 && move_y < 10) return false;
			/* Start drag */
			this.is_drag = true;
			this.createShadow();
			return true;
		},
		/**
		 * Stop drag & drop
		 */
		stopDrag: function()
		{
			if (!this.is_drag) return;
			this.is_drag = false;
			this.is_transition = false;
			this.drag_elem = null;
			this.drag_start_point = null;
			this.shadow_elem.remove();
			this.shadow_elem = null;
		},
		/**
		 * Move drag & drop
		 */
		moveDrag: function(e)
		{
			if (!this.is_drag) return;
			this.moveShadow(e.pageX, e.pageY);
			if (this.is_transition) return;
			let elem = this.getDragElementFromPoint(e.pageX, e.pageY);
			if (!elem) return;
			let pos = elem.getAttribute("data-pos");
			if (pos == this.drag_item_pos) return;
			/* Swap items with animation */
			this.is_transition = true;
			this.old_value = this.value.slice();
			this.swapItems(this.drag_item_pos, pos);
			this.drag_item_pos = pos;
			/* Stop animation */
			window.setTimeout(() =>
			{
				this.is_transition = false;
			}, this.duration);
			/* Send value change */
			this.onValueChange();
		},
		/**
		 * On value change
		 */
		onValueChange: function()
		{
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": this.value,
				"old_value": this.old_value,
				"data": this.data,
			})));
		},
		/**
		 * Add item click
		 */
		onAddItemClick: function()
		{
			let items = this.getItems();
			if (items == null)
			{
				this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
					"value": this.createValue(),
					"old_value": this.old_value,
					"data": this.data,
				})));
			}
			this.nextTick(() =>
			{
				this.old_value = this.value.slice();
				let items = this.getItems();
				items.push(this.createItem());
				this.onValueChange();
			});
		},
		/**
		 * Mouse down
		 */
		onMouseDown: function(e, item)
		{
			if (e.button != 0) return;
			if (this.is_drag) return;
			/* Set start drag item */
			this.drag_elem = this.getDragElement(e.target);
			this.drag_item = item;
			this.drag_item_pos = this.drag_elem.getAttribute("data-pos");
			this.drag_start_point = Runtime.Map.create({
				"x": e.pageX,
				"y": e.pageY,
				"shift_x": e.pageX - e.target.offsetLeft,
				"shift_y": e.pageY - e.target.offsetTop,
			});
			/* Add event listener */
			document.addEventListener("mouseup", this.onMouseUp);
			document.addEventListener("mousemove", this.onMouseMove);
			e.preventDefault();
			return false;
		},
		/**
		 * Mouse tree up
		 */
		onMouseUp: function(e)
		{
			/* Remove event listener */
			document.removeEventListener("mouseup", this.onMouseUp);
			document.removeEventListener("mousemove", this.onMouseMove);
			/* Stop drag & drop */
			this.stopDrag();
		},
		/**
		 * Mouse move
		 */
		onMouseMove: function(e)
		{
			if (this.drag_elem == null) return;
			/* Try to start drag & drop */
			if (!this.is_drag) this.startDrag(e);
			if (!this.is_drag) return;
			/* Move Drag & Drop */
			this.moveDrag(e);
		},
		getClassName: function(){ return "Runtime.Widget.Sortable.ItemList"; },
	},
	getComponentStyle: function(){ return ".sortable_list.h-3bb3{position: relative}.sortable_list__item.h-3bb3{display: flex;align-items: center;justify-content: flex-start;border-width: var(--border-width);border-color: var(--color-border);border-style: solid;border-radius: 4px;margin: 5px}.sortable_list__item_drag.h-3bb3, .sortable_list__item_remove.h-3bb3{cursor: pointer;padding: 0px 5px}.sortable_list__item_value.h-3bb3{flex: 1}.sortable_list__item_value.h-3bb3 .input, .sortable_list__item_value.h-3bb3 .select{padding: 0px 10px;border-color: transparent;border-radius: 0;border-width: 0}.sortable_list__buttons.h-3bb3{text-align: center;margin-top: var(--space)}.sortable_list__shadow_elem.h-3bb3{position: absolute;opacity: 0.5;user-select: none;z-index: 9999999}.sortable_list__shadow_elem.h-3bb3 .sortable_list__item_drag{cursor: grabbing}.sortable_list__shadow_elem.h-3bb3 .sortable_list__item{margin: 0}.sortable_list-move.h-3bb3, .sortable_list-enter-active.h-3bb3, .sortable_list-leave-active.h-3bb3{transition: all 0.3s ease}.sortable_list-enter-from.h-3bb3, .sortable_list-leave-to.h-3bb3{opacity: 0}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.Select"); },
};
window["Runtime.Widget.Sortable.ItemList"] = Runtime.Widget.Sortable.ItemList;