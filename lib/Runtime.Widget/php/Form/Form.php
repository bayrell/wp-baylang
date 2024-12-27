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
namespace Runtime\Widget\Form;
class Form extends \Runtime\Web\Component
{
	function renderTitle()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderSlot("title"));
		
		return $__v;
	}
	function renderField($field)
	{
		$__v = new \Runtime\Vector();
		$field_name = $field->get("name");
		$field_model = $field->get("model", null);
		$field_calculate = $field->get("calculate", null);
		$field_component = $field->get("component");
		$field_props = $field->get("props", \Runtime\Map::from([]));
		$value = "";
		$data = \Runtime\Map::from(["item"=>$this->model->item,"field_name"=>$field_name,"form"=>$this->model]);
		
		if ($field_calculate)
		{
			$value = \Runtime\rtl::apply($field_calculate, \Runtime\Vector::from([$data]));
		}
		else
		{
			$value = $this->model->getItemValue($field_name);
		}
		$_ = $data->set("value", $value);
		
		if ($field_component != null)
		{
			/* Component '{field_component}' */
			$this->_c($__v, $field_component, $this->_merge_attrs(["value" => $value,"name" => $field_name,"model" => $this->_model($field_model),"data" => $data], $field_props));
		}
		else
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($field_model, $field_props->concat(\Runtime\Map::from(["name"=>$field_name,"value"=>$value,"data"=>$data,"ref"=>"field_" . \Runtime\rtl::toStr($field_name),"onValueChange"=>function ($message) use (&$field_name)
			{
				$this->model->onFieldChange($field_name, $message->value);
			}]))));
		}
		
		return $__v;
	}
	function renderFieldResult($field)
	{
		$__v = new \Runtime\Vector();
		$field_name = $field->get("name");
		$field_error = $this->model->getFieldResult($field_name);
		
		if ($field_error->count() == 0)
		{
			/* Element 'div' */
			$this->_e($__v, "div", ["data-name" => $field_name,"class" => $this->_class_name(["widget_form__field_error widget_form__field_error--hide"])]);
		}
		else
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			for ($i = 0; $i < $field_error->count(); $i++)
			{
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v1, $this->_escape($field_error->get($i)));
				
				/* Element 'div' */
				$this->_e($__v0, "div", [], $__v1);
			}
			
			/* Element 'div' */
			$this->_e($__v, "div", ["data-name" => $field_name,"class" => $this->_class_name(["widget_form__field_error"])], $__v0);
		}
		
		return $__v;
	}
	function renderFieldLabel($field)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'span' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($field->get("label")));
		
		/* Element 'span' */
		$this->_e($__v, "span", [], $__v0);
		
		return $__v;
	}
	function renderFieldButtons($field)
	{
		$__v = new \Runtime\Vector();
		
		if ($field->has("buttons"))
		{
			$buttons = $field->get("buttons");
			
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			for ($i = 0; $i < $buttons->count(); $i++)
			{
				$settings = $buttons->get($i);
				$props = $settings->get("props");
				$content = $settings->get("content");
				
				/* Component 'Button' */
				$this->_c($__v0, "Runtime.Widget.Button", $this->_merge_attrs([], $props));
			}
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_form__field_buttons"])], $__v0);
		}
		
		return $__v;
	}
	function renderFieldRow($field)
	{
		$__v = new \Runtime\Vector();
		$field_name = $field->get("name");
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($field->has("label"))
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderFieldLabel($field));
			
			/* Text */
			$this->_t($__v1, $this->renderFieldButtons($field));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_form__field_label"])], $__v1);
		}
		
		/* Text */
		$this->_t($__v0, $this->renderField($field));
		
		/* Text */
		$this->_t($__v0, $this->renderFieldResult($field));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["data-name" => $field_name,"class" => $this->_class_name(["widget_form__field_row"])], $__v0);
		
		return $__v;
	}
	function renderFields()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->model)
		{
			for ($i = 0; $i < $this->model->fields->count(); $i++)
			{
				/* Text */
				$this->_t($__v0, $this->renderFieldRow($this->model->fields->get($i)));
			}
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_form__fields"])], $__v0);
		
		return $__v;
	}
	function renderBottomButtons()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model && $this->model->bottom_buttons->count() > 0)
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($this->model->bottom_buttons));
		}
		
		return $__v;
	}
	function renderResult()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model && $this->model->show_result)
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($this->model->result));
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderTitle());
		
		/* Text */
		$this->_t($__v0, $this->renderFields());
		
		/* Text */
		$this->_t($__v0, $this->renderBottomButtons());
		
		/* Text */
		$this->_t($__v0, $this->renderResult());
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_form", $this->class])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.RowButtons","Runtime.Widget.TextArea","Runtime.Widget.WidgetResult"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_form.h-b6a8 .widget_form__field_row.h-b6a8{margin-bottom: 10px}.widget_form.h-b6a8 .widget_form__field_label.h-b6a8{display: flex;align-items: center;padding-bottom: 5px;gap: 5px}.widget_form.h-b6a8 .widget_form__field_error.h-b6a8{color: var(--widget-color-danger);margin-top: var(--widget-space)}.widget_form.h-b6a8 .widget_form__field_error--hide.h-b6a8{display: none}.widget_form.h-b6a8 .widget_form__bottom_buttons.h-a598{justify-content: center}.widget_form.fixed.h-b6a8{max-width: 600px;margin-left: auto;margin-right: auto}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Form";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Form.Form";
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