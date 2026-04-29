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
Runtime.Widget.Tree.TreeModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("root", new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"autocreate": true,
			"extends": "Runtime.Widget.Tree.TreeItem",
		})));
	}
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("autoselect")) this.autoselect = params.get("autoselect");
		if (params.has("dnd"))
		{
			this.dnd = params.get("dnd");
			if (Runtime.rtl.isBoolean(this.dnd))
			{
				if (this.dnd) this.dnd = new Runtime.Widget.Tree.Dnd();
				else this.dnd = null;
			}
			if (this.dnd instanceof Runtime.Widget.Tree.Dnd) this.dnd.model = this;
		}
		if (params.has("icons")) this.icons = params.get("icons");
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Setup context menu */
		if (params.has("context_menu"))
		{
			this.setContextMenu(params.get("context_menu"));
			if (params.has("context_menu_render"))
			{
				this.context_menu_render = params.get("context_menu_render");
			}
		}
	}
	
	
	/**
	 * Set context menu
	 */
	setContextMenu(context_menu)
	{
		if (context_menu instanceof Runtime.Widget.ContextMenu.ContextMenuModel)
		{
			this.context_menu_render = false;
			this.context_menu = context_menu;
		}
		else if (context_menu instanceof Runtime.Map)
		{
			this.context_menu_render = true;
			this.context_menu = this.createWidget("Runtime.Widget.ContextMenu.ContextMenuModel", context_menu);
		}
	}
	
	
	/**
	 * Select item
	 */
	selectItem(path)
	{
		let item = path ? this.root.get(path) : null;
		if (this.selected_item == item) return;
		this.selected_path = path;
		this.selected_item = item;
		if (this.selected_item)
		{
			this.selected_item.onSelect();
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Tree.TreeWidget";
		this.autoselect = true;
		this.icons = true;
		this.is_open = false;
		this.has_icons = false;
		this.context_menu_render = true;
		this.dnd = null;
		this.context_menu = null;
		this.selected_path = null;
		this.selected_item = null;
		this.root = null;
	}
	static getClassName(){ return "Runtime.Widget.Tree.TreeModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Tree.TreeModel"] = Runtime.Widget.Tree.TreeModel;