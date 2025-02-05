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
class FormMessage extends \Runtime\Web\Component
{
	public $site_name;
	public $form_name;
	public $form_title;
	public $invoice_id;
	public $metrika_form_id;
	public $data;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'table' */
		$__v1 = new \Runtime\Vector();
		
		if ($this->invoice_id)
		{
			/* Element 'tr' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, "Number:");
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: right"], $__v3);
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, $this->_escape($this->invoice_id));
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: left"], $__v3);
			
			/* Element 'tr' */
			$this->_e($__v1, "tr", [], $__v2);
		}
		
		if ($this->site_name)
		{
			/* Element 'tr' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, "Web site:");
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: right"], $__v3);
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, $this->_escape($this->site_name));
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: left"], $__v3);
			
			/* Element 'tr' */
			$this->_e($__v1, "tr", [], $__v2);
		}
		
		if ($this->form_title)
		{
			/* Element 'tr' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, "Form title:");
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: right"], $__v3);
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, $this->_escape($this->form_title));
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: left"], $__v3);
			
			/* Element 'tr' */
			$this->_e($__v1, "tr", [], $__v2);
		}
		
		if ($this->form_name && $this->form_title != $this->form_name)
		{
			/* Element 'tr' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, "Form name:");
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: right"], $__v3);
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, $this->_escape($this->form_name));
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: left"], $__v3);
			
			/* Element 'tr' */
			$this->_e($__v1, "tr", [], $__v2);
		}
		
		if ($this->metrika_form_id)
		{
			/* Element 'tr' */
			$__v2 = new \Runtime\Vector();
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, "Form id:");
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: right"], $__v3);
			
			/* Element 'td' */
			$__v3 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v3, $this->_escape($this->metrika_form_id));
			
			/* Element 'td' */
			$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: left"], $__v3);
			
			/* Element 'tr' */
			$this->_e($__v1, "tr", [], $__v2);
		}
		
		if ($this->data)
		{
			$keys = $this->data->keys();
			
			for ($i = 0; $i < $keys->count(); $i++)
			{
				$name = $keys->get($i);
				$value = $this->data->get($name);
				
				/* Element 'tr' */
				$__v2 = new \Runtime\Vector();
				
				/* Element 'td' */
				$__v3 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v3, $this->_escape($name));
				
				/* Text */
				$this->_t($__v3, ":");
				
				/* Element 'td' */
				$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: right"], $__v3);
				
				/* Element 'td' */
				$__v3 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v3, $this->_escape($value));
				
				/* Element 'td' */
				$this->_e($__v2, "td", ["style" => "padding: 2px; text-align: left"], $__v3);
				
				/* Element 'tr' */
				$this->_e($__v1, "tr", [], $__v2);
			}
		}
		
		/* Element 'table' */
		$this->_e($__v0, "table", [], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["style" => "font-family:verdana;font-size:16px"], $__v0);
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->site_name = "";
		$this->form_name = "";
		$this->form_title = "";
		$this->invoice_id = "";
		$this->metrika_form_id = "";
		$this->data = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Email";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Email.FormMessage";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Component";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}