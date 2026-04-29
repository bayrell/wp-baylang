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
namespace Runtime\WordPress\Admin\MailLog;

use Runtime\DateTime;
use Runtime\Widget\Button;
use Runtime\Widget\Form\FormRow;
use Runtime\Widget\Dialog\Dialog;
use Runtime\Widget\Dialog\DialogModel;
use Runtime\Widget\Table\Table;


class MailLogPage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("mail_log_page", $componentHash))])));
		
		/* Element Runtime.Widget.Table.Table */
		$__v1 = $__v0->element("Runtime.Widget.Table.Table", (new \Runtime\Map(["model" => $this->model->table, "page_name" => "p"])));
		
		/* Slot header */
		$__v1->slot("header", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element th */
			$__v->element("th");
			
			/* Element th */
			$__v0 = $__v->element("th");
			$__v0->push("Worker");
			
			/* Element th */
			$__v1 = $__v->element("th");
			$__v1->push("Plan");
			
			/* Element th */
			$__v2 = $__v->element("th");
			$__v2->push("Status");
			
			/* Element th */
			$__v3 = $__v->element("th");
			$__v3->push("Dest");
			
			/* Element th */
			$__v4 = $__v->element("th");
			$__v4->push("Title");
			
			/* Element th */
			$__v5 = $__v->element("th");
			$__v5->push("Error");
			
			/* Element th */
			$__v6 = $__v->element("th");
			$__v6->push("Send time");
			
			/* Element th */
			$__v->element("th");
			
			return $__v;
		});
		
		/* Slot row */
		$__v1->slot("row", function ($item, $row_number)
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element td */
			$__v0 = $__v->element("td");
			$__v0->push($row_number + 1);
			
			/* Element td */
			$__v1 = $__v->element("td");
			$__v1->push($item->get("worker"));
			
			/* Element td */
			$__v2 = $__v->element("td");
			$__v2->push($item->get("plan"));
			
			/* Element td */
			$__v3 = $__v->element("td");
			$__v3->push($this->getStatus($item->get("status")));
			
			/* Element td */
			$__v4 = $__v->element("td");
			$__v4->push($item->get("dest"));
			
			/* Element td */
			$__v5 = $__v->element("td");
			$__v5->push($item->get("title"));
			
			/* Element td */
			$__v6 = $__v->element("td");
			$__v6->push($item->get("send_email_error"));
			
			/* Element td */
			$__v7 = $__v->element("td");
			
			$send_time = $item->get("gmtime_send");
			$__v7->push($send_time ? $send_time->normalize()->format() : "");
			
			/* Element td */
			$__v8 = $__v->element("td");
			
			/* Element Runtime.Widget.Button */
			$__v9 = $__v8->element("Runtime.Widget.Button");
			
			/* Content */
			$__v9->slot("default", function () use (&$item)
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("View");
				return $__v;
			});
			
			return $__v;
		});
		
		/* Element Runtime.Widget.Dialog.Dialog */
		$__v2 = $__v0->element("Runtime.Widget.Dialog.Dialog", (new \Runtime\Map(["model" => $this->dialog])));
		
		/* Slot title */
		$__v2->slot("title", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			$__v->push("Show item");
			return $__v;
		});
		
		/* Slot content */
		$__v2->slot("content", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			if ($this->current_item)
			{
				/* Element Runtime.Widget.Form.FormRow */
				$__v0 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Worker"])));
				
				/* Content */
				$__v0->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("worker"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v1 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Plan"])));
				
				/* Content */
				$__v1->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("plan"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v2 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Status"])));
				
				/* Content */
				$__v2->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->getStatus($this->current_item->get("status")));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v3 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Dest"])));
				
				/* Content */
				$__v3->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("dest"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v4 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Title"])));
				
				/* Content */
				$__v4->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("title"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v5 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Error"])));
				
				/* Content */
				$__v5->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("send_email_error"));
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v6 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Date"])));
				
				/* Content */
				$__v6->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$send_time = $this->current_item->get("gmtime_send");
					$__v->push($send_time ? $send_time->normalize()->format() : "");
					
					return $__v;
				});
				
				/* Element Runtime.Widget.Form.FormRow */
				$__v7 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Message"])));
				
				/* Content */
				$__v7->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					
					$__v->push($this->current_item->get("message"));
					
					return $__v;
				});
			}
			
			return $__v;
		});
		
		/* Slot footer */
		$__v2->slot("footer", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.Button */
			$__v0 = $__v->element("Runtime.Widget.Button");
			
			/* Content */
			$__v0->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("Close");
				return $__v;
			});
			
			return $__v;
		});
		
		return $__v;
	}
	var $dialog;
	var $current_item;
	/**
	 * Sho item
	 */
	function showItem($item)
	{
		$this->current_item = $item;
		$this->dialog->show();
	}
	/**
	 * Returns status
	 */
	function getStatus($status)
	{
		if ($status == 1) return "Send";
		if ($status == -1) return "Error";
		return "No";
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->dialog = new \Runtime\Widget\Dialog\DialogModel();
		$this->current_item = null;
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.Form.FormRow", "Runtime.Widget.Dialog.Dialog", "Runtime.Widget.Table.Table"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.MailLog.MailLogPage"; }
}