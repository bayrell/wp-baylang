<?php
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
namespace Runtime\Cabinet\Models;

use Runtime\BaseDTO;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Serializer\ObjectType;
/**
 * Menu Model
 * 
 * Supports hierarchical menu structure for cabinet navigation
 */


class Menu extends \Runtime\BaseDTO
{
	/* Menu item title */
	var $title;
	
	/* Menu item slug/identifier */
	var $id;
	
	/* Menu item URL/route name */
	var $url;
	
	/* Menu params */
	var $url_params;
	
	/* Menu item icon (CSS class or SVG) */
	var $icon;
	
	/* Menu item description */
	var $description;
	
	/* Menu item order/position */
	var $order;
	
	/* Menu item status (active/inactive) */
	var $is_active;
	
	/* Menu item permissions (roles that can access) */
	var $permissions;
	
	/* Child menu items (for hierarchical structure) */
	var $children;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("title", new \Runtime\Serializer\StringType());
		$rules->addType("id", new \Runtime\Serializer\StringType());
		$rules->addType("url", new \Runtime\Serializer\StringType());
		$rules->addType("url_params", new \Runtime\Serializer\MapType(new \Runtime\Serializer\StringType()));
		$rules->addType("icon", new \Runtime\Serializer\StringType());
		$rules->addType("description", new \Runtime\Serializer\StringType());
		$rules->addType("order", new \Runtime\Serializer\IntegerType());
		$rules->addType("is_active", new \Runtime\Serializer\IntegerType());
		$rules->addType("permissions", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\StringType()));
		$rules->addType("children", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\ObjectType(new \Runtime\Map([
			"class_name" => "Runtime.Cabinet.Models.Menu",
		]))));
	}
	
	
	/**
	 * Check if menu item has children
	 */
	function hasChildren()
	{
		return $this->children->count() > 0;
	}
	
	
	/**
	 * Get child menu items
	 */
	function getChildren()
	{
		return $this->children;
	}
	
	
	/**
	 * Add child menu item
	 */
	function add($child)
	{
		$this->children->push($child);
	}
	
	
	/**
	 * Find menu by slug
	 */
	function find($id)
	{
		return $this->children->find(function ($item) use (&$id){ return $item->id == $id; });
	}
	
	/**
	 * Check if menu item is visible and active
	 */
	function isVisible()
	{
		return $this->is_active;
	}
	
	
	/**
	 * Check if user has permission to access menu item
	 */
	function hasPermission($user_permissions)
	{
		/* If no permissions required, allow access */
		if ($this->permissions->count() == 0)
		{
			return true;
		}
		/* Check if user has any of the required permissions */
		foreach ($this->permissions as $permission)
		{
			if ($user_permissions->indexOf($permission) >= 0)
			{
				return true;
			}
		}
		return false;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->title = "";
		$this->id = "";
		$this->url = "";
		$this->url_params = new \Runtime\Map();
		$this->icon = "";
		$this->description = "";
		$this->order = 0;
		$this->is_active = true;
		$this->permissions = new \Runtime\Vector();
		$this->children = new \Runtime\Vector();
	}
	static function getClassName(){ return "Runtime.Cabinet.Models.Menu"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}