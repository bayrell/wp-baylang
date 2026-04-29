<?php
namespace Runtime\WordPress\Admin\Cabinet\Users;

use Runtime\Widget\Button;
use Runtime\Widget\RowButtons;
use Runtime\Widget\Table\TableWrap;


class UserPage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("page users_page", $componentHash))])));
		
		/* Element Runtime.Widget.Table.TableWrap */
		$__v1 = $__v0->element("Runtime.Widget.Table.TableWrap", (new \Runtime\Map(["model" => $this->model->manager])));
		
		/* Slot top_buttons */
		$__v1->slot("top_buttons", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.RowButtons */
			$__v0 = $__v->element("Runtime.Widget.RowButtons");
			
			/* Content */
			$__v0->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.Button */
				$__v0 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--success", $componentHash))])));
				
				/* Content */
				$__v0->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Add User");
					return $__v;
				});
				
				return $__v;
			});
			
			return $__v;
		});
		
		/* Slot row_buttons */
		$__v1->slot("row_buttons", function ($item, $field, $row_number)
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.RowButtons */
			$__v0 = $__v->element("Runtime.Widget.RowButtons");
			
			/* Content */
			$__v0->slot("default", function () use (&$item)
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.Button */
				$__v0 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--small", $componentHash))])));
				
				/* Content */
				$__v0->slot("default", function () use (&$item)
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Edit");
					return $__v;
				});
				
				/* Element Runtime.Widget.Button */
				$__v1 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--small button--danger", $componentHash))])));
				
				/* Content */
				$__v1->slot("default", function () use (&$item)
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Delete");
					return $__v;
				});
				
				return $__v;
			});
			
			return $__v;
		});
		
		return $__v;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".users_page.h-2514 .users_page__title{margin-bottom: var(--space-large)}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.Table.TableWrap"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserPage"; }
}