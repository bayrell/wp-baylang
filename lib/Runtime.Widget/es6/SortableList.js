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
Runtime.Widget.SortableList = {
	name: "Runtime.Widget.SortableList",
	extends: Runtime.Web.Component,
	props: {
		"show_buttons": {
			default: "true",
		},
		"name": {
			default: "",
		},
		"value": {
			default: Runtime.Vector.from([]),
		},
	},
	data: function ()
	{
		return {
			old_value: Runtime.Vector.from([]),
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
			let __v = [];
			
			/* Component 'Input' */
			let __v0 = this._c(__v, "Runtime.Widget.Input", {"value":item,"onValueChange":(message) =>
			{
				this.value.set(pos, message.value);
				this.onValueChange();
			},"key":item});
			
			return this._flatten(__v);
		},
		renderItem: function(pos)
		{
			let __v = [];
			let item = this.value.get(pos);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-pos":pos,"class":this._class_name(["widget_sortable_list__item"]),"key":item});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"onMousedown":(e) =>
			{
				this.onMouseDown(e, item);
			},"class":this._class_name(["widget_sortable_list__item_drag"])});
			
			/* Raw */
			this._t(__v1, new Runtime.RawString("&#9776;"));
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_sortable_list__item_value"])});
			
			/* Render */
			this._t(__v2, this.renderValue(pos, item));
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", {"onClick":(e) =>
			{
				this.removeItem(pos);
			},"class":this._class_name(["widget_sortable_list__item_remove"])});
			
			/* Raw */
			this._t(__v3, new Runtime.RawString("&#10005;"));
			
			return this._flatten(__v);
		},
		renderItems: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list__items"])});
			
			if (this.value)
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					/* Render */
					this._t(__v0, this.renderItem(i));
				}
			}
			
			return this._flatten(__v);
		},
		renderButtons: function()
		{
			let __v = [];
			
			if (this.show_buttons == "true")
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list__buttons"])});
				
				/* Component 'Button' */
				let __v1 = this._c(__v0, "Runtime.Widget.Button", {"styles":Runtime.Vector.from(["small"]),"onClick":this.onAddItemClick}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "Add");
					
					return this._flatten(__v);
				});
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_sortable_list"])});
			
			/* Render */
			this._t(__v0, this.renderItems());
			
			/* Render */
			this._t(__v0, this.renderButtons());
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"ref":"shadow","class":this._class_name(["widget_sortable_list__shadow"])});
			
			return this._flatten(__v);
		},
		/**
 * Swap items
 */
		swapItems: function(a, b)
		{
			if (a > b)
			{
				var c = a;
				a = b;
				b = c;
			}
			var obj_a = this.value.get(a);
			var obj_b = this.value.get(b);
			this.value.remove(b);
			this.value.insert(b, obj_a);
			this.value.remove(a);
			this.value.insert(a, obj_b);
		},
		/**
 * Remove item
 */
		removeItem: function(pos)
		{
			this.old_value = this.value.slice();
			this.value.remove(pos);
			this.onValueChange();
		},
		/**
 * Returns drag & drop element from point
 */
		getDragElementFromPoint: function(x, y)
		{
			var items = document.elementsFromPoint(x, y);
			for (var i = 0; i < items.length; i++)
			{
				var elem = Runtime.rtl.attr(items, i);
				if (elem.parentElement == this.shadow_elem)
				{
					continue;
				}
				if (elem.classList.contains("widget_sortable_list__item"))
				{
					return elem;
				}
			}
			return null;
		},
		/**
 * Returns drag & drop element
 */
		getDragElement: function(elem)
		{
			if (elem.classList.contains("widget_sortable_list__item"))
			{
				return elem;
			}
			if (elem.parentElement.classList.contains("widget_sortable_list__item"))
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
			if (!this.drag_elem)
			{
				return ;
			}
			this.shadow_elem = document.createElement("div");
			this.shadow_elem.innerHTML = this.drag_elem.outerHTML;
			this.shadow_elem.classList.add("widget_sortable_list__shadow_elem");
			var arr = Runtime.rs.split(" ", this.$options.getCssHash(this.$options.getClassName()));
			arr = arr.filter(Runtime.lib.equalNot(""));
			for (var i = 0; i < arr.count(); i++)
			{
				this.shadow_elem.classList.add(arr.get(i));
			}
			this.shadow_elem.style.height = this.drag_elem.offsetHeight + Runtime.rtl.toStr("px");
			this.shadow_elem.style.width = this.drag_elem.offsetWidth + Runtime.rtl.toStr("px");
			this.getRef("shadow").appendChild(this.shadow_elem);
		},
		/**
 * Move shadow element
 */
		moveShadow: function(x, y)
		{
			if (!this.shadow_elem)
			{
				return ;
			}
			var left = x - this.drag_start_point.get("shift_x");
			var top = y - this.drag_start_point.get("shift_y");
			this.shadow_elem.style.left = left + Runtime.rtl.toStr("px");
			this.shadow_elem.style.top = top + Runtime.rtl.toStr("px");
		},
		/**
 * Start Drag & Drop
 */
		startDrag: function(e)
		{
			if (this.is_drag != false)
			{
				return false;
			}
			if (this.drag_start_point == null)
			{
				return false;
			}
			/* Check move */
			var move_x = Runtime.Math.abs(e.pageX - this.drag_start_point.get("x"));
			var move_y = Runtime.Math.abs(e.pageY - this.drag_start_point.get("y"));
			if (move_x < 10 && move_y < 10)
			{
				return false;
			}
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
			if (!this.is_drag)
			{
				return ;
			}
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
			if (!this.is_drag)
			{
				return ;
			}
			this.moveShadow(e.pageX, e.pageY);
			if (this.is_transition)
			{
				return ;
			}
			var elem = this.getDragElementFromPoint(e.pageX, e.pageY);
			if (!elem)
			{
				return ;
			}
			var pos = elem.getAttribute("data-pos");
			if (pos == this.drag_item_pos)
			{
				return ;
			}
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
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":this.value,"old_value":this.old_value,"data":this.data})));
		},
		/**
 * Add item click
 */
		onAddItemClick: function()
		{
			this.old_value = this.value.slice();
			this.value.push("");
			this.onValueChange();
		},
		/**
 * Mouse down
 */
		onMouseDown: function(e, item)
		{
			if (e.button != 0)
			{
				return ;
			}
			if (this.is_drag)
			{
				return ;
			}
			/* Set start drag item */
			this.drag_elem = this.getDragElement(e.target);
			this.drag_item = item;
			this.drag_item_pos = this.drag_elem.getAttribute("data-pos");
			this.drag_start_point = Runtime.Map.from({"x":e.pageX,"y":e.pageY,"shift_x":e.pageX - e.target.offsetLeft,"shift_y":e.pageY - e.target.offsetTop});
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
			/* Move Drag & Drop */
			this.moveDrag(e);
		},
	},
};
Object.assign(Runtime.Widget.SortableList,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.Select"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_sortable_list.h-2647{position: relative}.widget_sortable_list__item.h-2647{display: flex;align-items: center;justify-content: flex-start;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;margin: 5px}.widget_sortable_list__item_drag.h-2647,.widget_sortable_list__item_remove.h-2647{cursor: pointer;padding: 0px 5px}.widget_sortable_list__item_value.h-2647{flex: 1}.widget_sortable_list__item_value.h-2647 .widget_input.h-f2df{padding: 0px 10px;border-color: transparent;border-radius: 0;border-width: 0}.widget_sortable_list__buttons.h-2647{text-align: center;margin-top: var(--widget-space)}.widget_sortable_list__shadow_elem.h-2647{position: absolute;opacity: 0.5;user-select: none;z-index: 9999999}.widget_sortable_list__shadow_elem.h-2647 .widget_sortable_list__item.h-2647{margin: 0}.widget_sortable_list__animation-move.h-2647,.widget_sortable_list__animation-enter-active.h-2647,.widget_sortable_list__animation-leave-active.h-2647{transition: all 0.3s ease}.widget_sortable_list__animation-enter-from.h-2647,.widget_sortable_list__animation-leave-to.h-2647{opacity: 0}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.SortableList";
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
Runtime.rtl.defClass(Runtime.Widget.SortableList);
window["Runtime.Widget.SortableList"] = Runtime.Widget.SortableList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.SortableList;