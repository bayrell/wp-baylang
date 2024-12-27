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
namespace BayLang\Constructor\Frontend\Editor;
class SelectedItem extends \Runtime\Web\Component
{
	public $type;
	public $current_tab;
	public $tabs_items;
	function renderInput($selector, $key, $label, $default_value="")
	{
		$__v = new \Runtime\Vector();
		$value = $this->getCSSValue($selector, $key, $default_value);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape(($label) ? ($label) : ($key)));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__key"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'Input' */
		$this->_c($__v1, "Runtime.Widget.Input", ["value" => $value]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__value"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__row"])], $__v0);
		
		return $__v;
	}
	function renderSelect($selector, $key, $label, $options)
	{
		$__v = new \Runtime\Vector();
		$value = $this->getCSSValue($selector, $key);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape(($label) ? ($label) : ($key)));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__key"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'Select' */
		$this->_c($__v1, "Runtime.Widget.Select", ["value" => $value,"options" => $options]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__value"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__row"])], $__v0);
		
		return $__v;
	}
	function renderSelectImage($selector, $key, $label)
	{
		$__v = new \Runtime\Vector();
		$value = $this->getCSSValue($selector, $key);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape(($label) ? ($label) : ($key)));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__key"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'SelectImageButton' */
		$this->_c($__v1, "BayLang.Constructor.Frontend.Components.SelectImageButton", []);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__value"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__row"])], $__v0);
		
		return $__v;
	}
	function renderComponentName()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Component");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape($this->model->selected->widget->code->tag_name));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__content"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_param__row"])], $__v0);
		
		return $__v;
	}
	function renderWidgetName()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v3 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v3, "Name");
		
		/* Element 'div' */
		$this->_e($__v2, "div", ["class" => $this->_class_name(["widget_param__text_label"])], $__v3);
		
		/* Element 'div' */
		$__v3 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v3, "[Edit]");
		
		/* Element 'div' */
		$this->_e($__v2, "div", ["class" => $this->_class_name(["widget_param__text_button"])], $__v3);
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_param__text"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape($this->model->selected->widget->param_widget_name->value));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__content"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_param__row"])], $__v0);
		
		return $__v;
	}
	function renderClassName()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Class");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Component 'Tag' */
		$this->_c($__v1, "Runtime.Widget.Tag", ["value" => $this->model->selected->widget->param_class_name->value->slice()]);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__content"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_param__row"])], $__v0);
		
		return $__v;
	}
	function renderParams()
	{
		$__v = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->selected->widget->params->count(); $i++)
		{
			$param = $this->model->selected->widget->params->get($i);
			
			if ($param->display)
			{
				$item_props = $param->props;
				$class_name = $param->component;
				
				/* Element 'div' */
				$__v0 = new \Runtime\Vector();
				
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v1, $this->_escape($param->label));
				
				/* Element 'div' */
				$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__label"])], $__v1);
				
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				if ($this->isAllowClassName($class_name))
				{
					/* Component '{class_name}' */
					$this->_c($__v1, $class_name, $this->_merge_attrs(["value" => $param->value], $item_props));
				}
				
				/* Element 'div' */
				$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_param__content"])], $__v1);
				
				/* Element 'div' */
				$this->_e($__v, "div", ["class" => $this->_class_name(["widget_param__row"])], $__v0);
			}
		}
		
		return $__v;
	}
	function renderStyles()
	{
		$__v = new \Runtime\Vector();
		$settings = $this->model->selected->widget->settings;
		$selector = $this->model->selected->widget->getSelector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Common");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "width", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "height", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "min-width", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "min-height", ""));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		if ($settings && $this->isContainer($settings))
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, "Flex");
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderSelect($selector, "display", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"block","value"=>"block"]),\Runtime\Map::from(["key"=>"flex","value"=>"flex"])])));
			
			/* Text */
			$this->_t($__v1, $this->renderSelect($selector, "align-items", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"baseline","value"=>"baseline"]),\Runtime\Map::from(["key"=>"center","value"=>"center"]),\Runtime\Map::from(["key"=>"end","value"=>"end"]),\Runtime\Map::from(["key"=>"flex-end","value"=>"flex-end"]),\Runtime\Map::from(["key"=>"flex-start","value"=>"flex-start"]),\Runtime\Map::from(["key"=>"start","value"=>"start"]),\Runtime\Map::from(["key"=>"stretch","value"=>"stretch"]),\Runtime\Map::from(["key"=>"revert","value"=>"revert"])])));
			
			/* Text */
			$this->_t($__v1, $this->renderSelect($selector, "justify-content", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"left","value"=>"left"]),\Runtime\Map::from(["key"=>"center","value"=>"center"]),\Runtime\Map::from(["key"=>"right","value"=>"right"]),\Runtime\Map::from(["key"=>"space-around","value"=>"space-around"]),\Runtime\Map::from(["key"=>"space-between","value"=>"space-between"]),\Runtime\Map::from(["key"=>"start","value"=>"start"]),\Runtime\Map::from(["key"=>"stretch","value"=>"stretch"]),\Runtime\Map::from(["key"=>"end","value"=>"end"])])));
			
			/* Text */
			$this->_t($__v1, $this->renderSelect($selector, "flex-wrap", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"nowrap","value"=>"nowrap"]),\Runtime\Map::from(["key"=>"wrap","value"=>"wrap"])])));
			
			/* Text */
			$this->_t($__v1, $this->renderInput($selector, "gap", ""));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		}
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Padding");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "padding-top", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "padding-bottom", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "padding-left", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "padding-right", ""));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Margin");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "margin-top", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "margin-bottom", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "margin-left", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "margin-right", ""));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Font");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "color", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "font-size", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderSelect($selector, "font-weight", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"light","value"=>"lighter"]),\Runtime\Map::from(["key"=>"normal","value"=>"normal"]),\Runtime\Map::from(["key"=>"bold","value"=>"bold"]),\Runtime\Map::from(["key"=>"bolder","value"=>"bolder"]),\Runtime\Map::from(["key"=>"100","value"=>"100"]),\Runtime\Map::from(["key"=>"200","value"=>"200"]),\Runtime\Map::from(["key"=>"300","value"=>"300"]),\Runtime\Map::from(["key"=>"400","value"=>"400"]),\Runtime\Map::from(["key"=>"500","value"=>"500"]),\Runtime\Map::from(["key"=>"600","value"=>"600"]),\Runtime\Map::from(["key"=>"700","value"=>"700"]),\Runtime\Map::from(["key"=>"800","value"=>"800"]),\Runtime\Map::from(["key"=>"900","value"=>"900"])])));
		
		/* Text */
		$this->_t($__v1, $this->renderSelect($selector, "text-align", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"left","value"=>"left"]),\Runtime\Map::from(["key"=>"center","value"=>"center"]),\Runtime\Map::from(["key"=>"right","value"=>"right"]),\Runtime\Map::from(["key"=>"justify","value"=>"justify"])])));
		
		/* Text */
		$this->_t($__v1, $this->renderSelect($selector, "text-transform", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"capitalize","value"=>"capitalize"]),\Runtime\Map::from(["key"=>"lowercase","value"=>"lowercase"]),\Runtime\Map::from(["key"=>"uppercase","value"=>"uppercase"]),\Runtime\Map::from(["key"=>"inherit","value"=>"inherit"]),\Runtime\Map::from(["key"=>"none","value"=>"none"])])));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "line-height", ""));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Border");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "border-color", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderSelect($selector, "border-style", "", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"dashed","value"=>"dashed"]),\Runtime\Map::from(["key"=>"dotted","value"=>"dotted"]),\Runtime\Map::from(["key"=>"double","value"=>"double"]),\Runtime\Map::from(["key"=>"hidden","value"=>"hidden"]),\Runtime\Map::from(["key"=>"inset","value"=>"inset"]),\Runtime\Map::from(["key"=>"none","value"=>"none"]),\Runtime\Map::from(["key"=>"outset","value"=>"outset"]),\Runtime\Map::from(["key"=>"solid","value"=>"solid"]),\Runtime\Map::from(["key"=>"inherit","value"=>"inherit"]),\Runtime\Map::from(["key"=>"unset","value"=>"unset"])])));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "border-width", ""));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "border-radius", ""));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Background");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "background-color", "Color"));
		
		/* Text */
		$this->_t($__v1, $this->renderSelectImage($selector, "background-image", "Image"));
		
		/* Text */
		$this->_t($__v1, $this->renderInput($selector, "background-position", "Position"));
		
		/* Text */
		$this->_t($__v1, $this->renderSelect($selector, "background-repeat", "Repeat", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"repeat","value"=>"repeat"]),\Runtime\Map::from(["key"=>"repeat-x","value"=>"repeat-x"]),\Runtime\Map::from(["key"=>"repeat-y","value"=>"repeat-y"]),\Runtime\Map::from(["key"=>"no-repeat","value"=>"no-repeat"])])));
		
		/* Text */
		$this->_t($__v1, $this->renderSelect($selector, "background-size", "Size", \Runtime\Vector::from([\Runtime\Map::from(["key"=>"contain","value"=>"contain"]),\Runtime\Map::from(["key"=>"cover","value"=>"cover"])])));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "CSS");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderCSS());
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_css__items"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_css__content"])], $__v0);
		
		return $__v;
	}
	function renderCSS()
	{
		$__v = new \Runtime\Vector();
		$selector_name = $this->model->selected->widget->getSelectorName();
		
		/* Component 'TextEditable' */
		$this->_c($__v, "Runtime.Widget.TextEditable", ["value" => $this->model->styles->getSelectorContent($selector_name),"class" => $this->_class_name(["overflow"])]);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->model->selected->widget)
		{
			/* Render info */
			/* Text */
			$this->_t($__v0, $this->renderComponentName());
			
			/* Text */
			$this->_t($__v0, $this->renderWidgetName());
			
			/* Text */
			$this->_t($__v0, $this->renderClassName());
			
			/* Render css */
			if ($this->type == "css")
			{
				/* Text */
				$this->_t($__v0, $this->renderStyles());
			}
			
			/* Render params */
			if ($this->type == "params")
			{
				/* Text */
				$this->_t($__v0, $this->renderParams());
			}
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_param"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns true if class name is allowed
 */
	function isAllowClassName($class_name)
	{
		if ($class_name == "Runtime.Widget.Input")
		{
			return true;
		}
		if ($class_name == "Runtime.Widget.Select")
		{
			return true;
		}
		if ($class_name == "Runtime.Widget.SortableList")
		{
			return true;
		}
		if ($class_name == "Runtime.Widget.Tag")
		{
			return true;
		}
		if ($class_name == "Runtime.Widget.TextArea")
		{
			return true;
		}
		if ($class_name == "Runtime.Widget.TextEditable")
		{
			return true;
		}
		if ($class_name == "BayLang.Constructor.Frontend.Components.SelectImageButton")
		{
			return true;
		}
		if ($class_name == "BayLang.Constructor.Frontend.Components.SortableParams")
		{
			return true;
		}
		return false;
	}
	/**
 * Returns true if widget is container
 */
	function isContainer($settings)
	{
		if (!$settings)
		{
			return false;
		}
		$iframe_window = $this->model->getFrameWindow();
		return $iframe_window->Runtime->rtl->is_instanceof($settings, "Runtime.Widget.WidgetSettings.Settings.ContainerSettings");
	}
	/**
 * Returns css value
 */
	function getCSSValue($selector, $key, $default_value="")
	{
		if ($selector == null)
		{
			return $default_value;
		}
		$value = $selector->getStyle($key);
		return ($value) ? ($value->getValue()) : ($default_value);
	}
	/**
 * Set css value
 */
	function setCSSValue($selector, $key, $value="")
	{
		if (!$selector)
		{
			$selector_name = $this->model->selected->widget->getSelectorName();
			$selector = $this->model->styles->createSelector($selector_name);
		}
		$selector->changeStyleValue($key, $value);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.Select","Runtime.Widget.Tag","Runtime.Widget.TextArea","Runtime.Widget.TextEditable","BayLang.Constructor.Frontend.Components.SelectImageButton","BayLang.Constructor.Frontend.Components.SortableParams","BayLang.Constructor.Frontend.Editor.WidgetStyle"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_param.h-c425{padding-bottom: 20px}.widget_param__row.h-c425{margin-bottom: 10px}.widget_param__label.h-c425{margin-bottom: 5px}.widget_param__title.h-c425{margin-bottom: 5px}.widget_param__text.h-c425{display: flex;gap: 10px}.widget_param__text_label.h-c425{overflow-wrap: anywhere}.widget_param__text_button.h-c425{cursor: pointer}.widget_param__text_button.h-c425:hover{text-decoration: underline}.widget_param.h-c425 .widget_select.h-d72d{padding: 7px;min-height: 37px}.widget_param.h-c425 .widget_input.h-f2df,.widget_param.h-c425 .widget_textarea.h-ee82{padding: 7px}.widget_param.h-c425 .widget_textarea.h-ee82{font-family: 'PT Mono';line-height: 1.5}.widget_css__label.h-c425{text-align: center;background-color: aliceblue;padding: 5px;margin-bottom: 5px}.widget_css__row.h-c425{display: flex;align-items: center;margin-bottom: 5px}.widget_css__key.h-c425{width: 100px}.widget_css__value.h-c425{width: calc(100% - 100px)}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->type = "params";
		$this->current_tab = "params";
		$this->tabs_items = \Runtime\Vector::from([\Runtime\Map::from(["key"=>"Params","value"=>"params"]),\Runtime\Map::from(["key"=>"Styles","value"=>"styles"]),\Runtime\Map::from(["key"=>"CSS","value"=>"css"])]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.SelectedItem";
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