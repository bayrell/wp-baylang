"use strict;"
/*!
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
Runtime.Widget.Tree.Dnd = class extends Runtime.BaseObject
{
	static DRAG_BEFORE = "before";
	static DRAG_INTO = "into";
	static DRAG_AFTER = "after";
	
	
	/**
	 * Find drag elem
	 */
	findDragElem(elem)
	{
		if (elem.classList.contains("tree_widget__item_label")) return elem.parentElement;
		return elem;
	}
	
	
	/**
	 * Find elem by path
	 */
	findElemByPath(path)
	{
		path = ".tree_widget__item[data-path='" + String(path) + String("']");
		return document.querySelector(path);
	}
	
	
	/**
	 * Returns true if elem inside drag_elem
	 */
	checkInside(path)
	{
		if (!this.drag_elem_path) return false;
		let drag_elem_path = Runtime.rs.join(".", this.drag_elem_path);
		let elem_path = path ? Runtime.rs.join(".", path) : "";
		if (drag_elem_path == elem_path) return false;
		if (Runtime.rs.substr(elem_path, 0, Runtime.rs.strlen(drag_elem_path) + 1) == drag_elem_path + String("."))
		{
			return true;
		}
		return false;
	}
	
	
	/**
	 * Returns true if path is equal
	 */
	static equalPath(src_path, dest_path)
	{
		let src_elem = src_path ? Runtime.rs.join(".", src_path) : "";
		let dest_elem = dest_path ? Runtime.rs.join(".", dest_path) : "";
		return src_elem == dest_elem;
	}
	
	
	/**
	 * Returns true if can drag
	 */
	canDrag(src_path, dest_path, kind)
	{
		return true;
	}
	
	
	/**
	 * Drag element
	 */
	dragElement(src_path, dest_path, kind)
	{
	}
	
	
	/**
	 * Set start drag item
	 */
	onMouseDownItem(e, path)
	{
		this.drag_elem = this.findDragElem(e.currentTarget);
		this.drag_elem_path = path.slice();
		this.drag_start_point = Runtime.Map.create({
			"x": e.layerX,
			"y": e.layerY,
		});
	}
	
	
	/**
	 * Mouse move item
	 */
	onMouseMoveItem(e, path)
	{
		if (this.drag_elem == null) return;
		/* Try to start drag & drop */
		if (!this.is_drag) this.startDrag(e);
		if (!this.is_drag) return;
		/* Drag & Drop started */
		let target = this.findDragElem(e.currentTarget);
		let top = target.offsetTop;
		let bottom = target.offsetTop + target.clientHeight;
		let center = (top + bottom) / 2;
		/* Get kind */
		let kind = this.constructor.DRAG_BEFORE;
		if (e.layerY >= center)
		{
			kind = this.constructor.DRAG_INTO;
		}
		/* Set drag target */
		this.setTarget(target, path, kind);
		e.preventDefault();
	}
	
	
	/**
	 * On mouse move
	 */
	onMouseMove(e)
	{
		if (this.drag_elem == null) return;
		/* Try to start drag & drop */
		if (!this.is_drag) this.startDrag(e);
		if (!this.is_drag) return;
		/* Outside of tree contents */
		let tree_content = this.component.getRef("content");
		if (e.layerY > tree_content.clientHeight)
		{
			this.setTarget(tree_content, null, this.constructor.DRAG_AFTER);
			e.preventDefault();
			return false;
		}
	}
	
	
	/**
	 * Start Drag & Drop
	 */
	startDrag(e)
	{
		if (this.is_drag != false) return false;
		if (this.drag_start_point == null) return false;
		if (Math.abs(e.layerY - this.drag_start_point.get("y")) > 5) return false;
		this.is_drag = true;
		return true;
	}
	
	
	/**
	 * Stop drag & drop
	 */
	stopDrag()
	{
		/* Do drag & drop */
		if (this.drag_dest_box)
		{
			this.dragElement(this.drag_elem_path, this.drag_dest_path, this.drag_dest_kind);
		}
		this.is_drag = false;
		this.drag_dest_box = null;
		this.drag_dest_elem = null;
		this.drag_dest_path = null;
		this.drag_dest_kind = null;
		this.drag_elem = null;
		this.drag_elem_path = null;
		this.drag_start_point = null;
	}
	
	
	/**
	 * Set drag & drop dest element
	 */
	setTarget(elem, path, kind)
	{
		if (!this.is_drag) return;
		let src_path = Runtime.rs.join(".", this.drag_elem_path);
		let dest_path = path ? Runtime.rs.join(".", path) : "";
		let item = this.model.root.get(path);
		if (this.checkInside(path)) return;
		if (kind == "into" && src_path == dest_path) kind = "before";
		if (kind == "into" && item != null && !item.canDragInside()) kind = "after";
		if (this.constructor.equalPath(this.drag_dest_path, path) && this.drag_dest_kind == kind) return;
		/* Setup dest element */
		this.drag_dest_elem = elem;
		this.drag_dest_path = path;
		/* Can drag */
		let can_drag = this.canDrag(this.drag_elem_path, this.drag_dest_path, kind);
		/* Set dest kind */
		this.drag_dest_kind = kind;
		/* Setup dest box */
		if (src_path != dest_path && can_drag) this.drag_dest_box = this.getBoxStyles(elem, kind);
		else this.drag_dest_box = null;
	}
	
	
	/**
	 * Returns box styles by element
	 */
	getBoxStyles(elem, kind)
	{
		if (kind == undefined) kind = "";
		let left, top, width, height;
		left = elem.offsetLeft;
		top = elem.offsetTop;
		width = elem.clientWidth - 1;
		height = elem.clientHeight - 1;
		if (kind == this.constructor.DRAG_BEFORE) return Runtime.rs.join(";", Runtime.Vector.create([
			"left: " + String(left) + String("px"),
			"top: " + String(top) + String("px"),
			"width: " + String(width) + String("px"),
			"height: 1px",
		]));
		if (kind == this.constructor.DRAG_AFTER) return Runtime.rs.join(";", Runtime.Vector.create([
			"left: " + String(left) + String("px"),
			"top: " + String(top + height) + String("px"),
			"width: " + String(width) + String("px"),
			"height: 1px",
		]));
		if (kind == this.constructor.DRAG_INTO) return Runtime.rs.join(";", Runtime.Vector.create([
			"left: " + String(left) + String("px"),
			"top: " + String(top) + String("px"),
			"width: " + String(width) + String("px"),
			"height: " + String(height) + String("px"),
		]));
		return null;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.is_drag = false;
		this.component = null;
		this.drag_elem = null;
		this.drag_elem_path = null;
		this.drag_start_point = null;
		this.drag_dest_box = null;
		this.drag_dest_kind = "";
		this.drag_dest_path = null;
		this.drag_dest_elem = null;
		this.model = null;
	}
	static getClassName(){ return "Runtime.Widget.Tree.Dnd"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Tree.Dnd"] = Runtime.Widget.Tree.Dnd;