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
if (typeof Runtime.Cabinet == 'undefined') Runtime.Cabinet = {};
if (typeof Runtime.Cabinet.Models == 'undefined') Runtime.Cabinet.Models = {};
/**
 * Menu Model
 * 
 * Supports hierarchical menu structure for cabinet navigation
 */
Runtime.Cabinet.Models.Menu = class extends Runtime.BaseDTO
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("title", new Runtime.Serializer.StringType());
		rules.addType("id", new Runtime.Serializer.StringType());
		rules.addType("url", new Runtime.Serializer.StringType());
		rules.addType("url_params", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
		rules.addType("icon", new Runtime.Serializer.StringType());
		rules.addType("description", new Runtime.Serializer.StringType());
		rules.addType("order", new Runtime.Serializer.IntegerType());
		rules.addType("is_active", new Runtime.Serializer.IntegerType());
		rules.addType("permissions", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
		rules.addType("children", new Runtime.Serializer.VectorType(new Runtime.Serializer.ObjectType(Runtime.Map.create({
			"class_name": "Runtime.Cabinet.Models.Menu",
		}))));
	}
	
	
	/**
	 * Check if menu item has children
	 */
	hasChildren()
	{
		return this.children.count() > 0;
	}
	
	
	/**
	 * Get child menu items
	 */
	getChildren()
	{
		return this.children;
	}
	
	
	/**
	 * Add child menu item
	 */
	add(child)
	{
		this.children.push(child);
	}
	
	
	/**
	 * Find menu by slug
	 */
	find(id)
	{
		return this.children.find((item) => { return item.id == id; });
	}
	
	
	/**
	 * Check if menu item is visible and active
	 */
	isVisible()
	{
		return this.is_active;
	}
	
	
	/**
	 * Check if user has permission to access menu item
	 */
	hasPermission(user_permissions)
	{
		/* If no permissions required, allow access */
		if (this.permissions.count() == 0)
		{
			return true;
		}
		/* Check if user has any of the required permissions */
		for (let permission of this.permissions)
		{
			if (user_permissions.indexOf(permission) >= 0)
			{
				return true;
			}
		}
		return false;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.title = "";
		this.id = "";
		this.url = "";
		this.url_params = new Runtime.Map();
		this.icon = "";
		this.description = "";
		this.order = 0;
		this.is_active = true;
		this.permissions = Runtime.Vector.create([]);
		this.children = Runtime.Vector.create([]);
	}
	static getClassName(){ return "Runtime.Cabinet.Models.Menu"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Cabinet.Models.Menu"] = Runtime.Cabinet.Models.Menu;