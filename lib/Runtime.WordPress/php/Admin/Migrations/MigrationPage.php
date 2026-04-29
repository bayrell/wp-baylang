<?php
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
namespace Runtime\WordPress\Admin\Migrations;

use Runtime\Widget\Button;
use Runtime\Widget\RowButtons;
use Runtime\Widget\TextEditable;


class MigrationPage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("database_migration_page", $componentHash))])));
		
		if ($this->model->items->count() > 0)
		{
			/* Element Runtime.Widget.TextEditable */
			$__v0->element("Runtime.Widget.TextEditable", (new \Runtime\Map(["value" => \Runtime\rs::join("\n", $this->model->items)])));
			
			/* Element div */
			$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("buttons", $componentHash))])));
			
			/* Element Runtime.Widget.Button */
			$__v2 = $__v1->element("Runtime.Widget.Button", (new \Runtime\Map(["styles" => new \Runtime\Vector("primary")])));
			
			/* Content */
			$__v2->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("Update");
				return $__v;
			});
			$__v0->push($this->renderWidget($this->model->result));
		}
		else
		{
			/* Element div */
			$__v3 = $__v0->element("div");
			$__v3->push("Database is up to date");
		}
		
		return $__v;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".database_migration_page.h-fb32 .text_editable{height: 350px}.database_migration_page.h-fb32 .buttons{margin-top: calc(var(--space) * 2);text-align: center}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.TextEditable"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.Migrations.MigrationPage"; }
}