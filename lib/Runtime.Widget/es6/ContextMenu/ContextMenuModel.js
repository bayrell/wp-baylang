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
if (typeof Runtime.Widget.ContextMenu == 'undefined') Runtime.Widget.ContextMenu = {};
Runtime.Widget.ContextMenu.ContextMenuModel = class extends Runtime.BaseModel
{
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("items")) this.items = params.get("items");
	}
	
	
	/**
	 * Set width
	 */
	setWidth(value)
	{
		this.width = value;
	}
	
	
	/**
	 * Show dialog
	 */
	show(x, y)
	{
		this.is_open = true;
		this.x = x;
		this.y = y;
	}
	
	
	/**
	 * Hide dialog
	 */
	hide()
	{
		this.is_open = false;
	}
	
	
	/**
	 * Add item
	 */
	addItem(item)
	{
		this.items.push(item);
	}
	
	
	/**
	 * Find index
	 */
	find(key)
	{
		return this.items.find((item) => { return item.get("key") == key; });
	}
	
	
	/**
	 * Find item
	 */
	findItem(key){ return this.items.get(this.find(key)); }
	
	
	/**
	 * On click
	 */
	onClickItem(item)
	{
		this.listener.emit(new Runtime.Widget.ContextMenu.ContextMenuMessage(Runtime.Map.create({
			"name": "clickItem",
			"item": item,
		})));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.ContextMenu.ContextMenu";
		this.widget_name = "context_menu";
		this.is_open = false;
		this.width = "";
		this.x = 0;
		this.y = 0;
		this.items = Runtime.Vector.create([]);
		this.data = null;
	}
	static getClassName(){ return "Runtime.Widget.ContextMenu.ContextMenuModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.ContextMenu.ContextMenuModel"] = Runtime.Widget.ContextMenu.ContextMenuModel;