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
namespace Runtime\WordPress\Theme\Components\Email;


class FormMessage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["style" => "font-family:verdana;font-size:16px"])));
		
		/* Element table */
		$__v1 = $__v0->element("table");
		
		if ($this->invoice_id)
		{
			/* Element tr */
			$__v2 = $__v1->element("tr");
			
			/* Element td */
			$__v3 = $__v2->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: right"])));
			$__v3->push("Number:");
			
			/* Element td */
			$__v4 = $__v2->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: left"])));
			$__v4->push($this->invoice_id);
		}
		
		if ($this->site_name)
		{
			/* Element tr */
			$__v5 = $__v1->element("tr");
			
			/* Element td */
			$__v6 = $__v5->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: right"])));
			$__v6->push("Web site:");
			
			/* Element td */
			$__v7 = $__v5->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: left"])));
			$__v7->push($this->site_name);
		}
		
		if ($this->form_title)
		{
			/* Element tr */
			$__v8 = $__v1->element("tr");
			
			/* Element td */
			$__v9 = $__v8->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: right"])));
			$__v9->push("Form title:");
			
			/* Element td */
			$__v10 = $__v8->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: left"])));
			$__v10->push($this->form_title);
		}
		
		if ($this->form_name && $this->form_title != $this->form_name)
		{
			/* Element tr */
			$__v11 = $__v1->element("tr");
			
			/* Element td */
			$__v12 = $__v11->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: right"])));
			$__v12->push("Form name:");
			
			/* Element td */
			$__v13 = $__v11->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: left"])));
			$__v13->push($this->form_name);
		}
		
		if ($this->metrika_id)
		{
			/* Element tr */
			$__v14 = $__v1->element("tr");
			
			/* Element td */
			$__v15 = $__v14->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: right"])));
			$__v15->push("Form id:");
			
			/* Element td */
			$__v16 = $__v14->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: left"])));
			$__v16->push($this->ucfirst($this->metrika_id));
		}
		
		if ($this->data)
		{
			$keys = \Runtime\rtl::list($this->data->keys());
			for ($i = 0; $i < $keys->count(); $i++)
			{
				$name = $keys->get($i);
				$value = $this->data->get($name);
				
				/* Element tr */
				$__v17 = $__v1->element("tr");
				
				/* Element td */
				$__v18 = $__v17->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: right"])));
				$__v18->push($name);
				$__v18->push(":");
				
				/* Element td */
				$__v19 = $__v17->element("td", (new \Runtime\Map(["style" => "padding: 2px; text-align: left"])));
				$__v19->push($value);
			}
		}
		
		return $__v;
	}
	var $site_name;
	var $form_name;
	var $form_title;
	var $invoice_id;
	var $metrika_id;
	var $data;
	/**
	 * Uppercase first
	 */
	function ucfirst($name)
	{
		$name = \Runtime\rs::trim($name);
		return \Runtime\rs::upper(\Runtime\rs::charAt($name, 0)) . \Runtime\rs::substr($name, 1);
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->site_name = "";
		$this->form_name = "";
		$this->form_title = "";
		$this->invoice_id = "";
		$this->metrika_id = "";
		$this->data = new \Runtime\Map();
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector(); }
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Email.FormMessage"; }
}