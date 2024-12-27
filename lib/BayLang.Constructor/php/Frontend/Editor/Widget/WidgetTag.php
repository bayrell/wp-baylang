<?php
/*!
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
namespace BayLang\Constructor\Frontend\Editor\Widget;
class WidgetTag extends \BayLang\Constructor\Frontend\Editor\Widget\Widget
{
	public $param_class_name;
	public $param_widget_name;
	public $is_raw;
	public $html_content;
	function __construct($page_model, $code)
	{
		parent::__construct($page_model, $code);
		/* Create params */
		$this->param_class_name = new \BayLang\Constructor\Frontend\Editor\Parameters\ParameterClassName(\Runtime\Map::from(["widget"=>$this]));
		$this->param_widget_name = new \BayLang\Constructor\Frontend\Editor\Parameters\ParameterWidgetName(\Runtime\Map::from(["widget"=>$this]));
		$this->param_class_name->param_widget_name = $this->param_widget_name;
		$this->param_widget_name->param_class_name = $this->param_class_name;
		$this->param_class_name->op_attr = null;
		$this->param_class_name->value = \Runtime\Vector::from([]);
		$this->param_widget_name->op_attr = null;
		$this->param_widget_name->value = "";
	}
	/**
	 * Returns widget name
	 */
	function getName()
	{
		return $this->param_widget_name->value;
	}
	/**
	 * Returns CSS Content
	 */
	function getSelectorName()
	{
		return "." . \Runtime\rtl::toStr($this->param_widget_name->value);
	}
	/**
	 * Returns selector
	 */
	function getSelector()
	{
		$selector_name = $this->getSelectorName();
		return $this->page_model->styles->getSelector($selector_name);
	}
	/**
	 * Can insert widget
	 */
	function canInsert($widget_settings)
	{
		if (!$this->settings)
		{
			return false;
		}
		return $this->settings->canInsert($widget_settings);
	}
	/**
	 * Setup settings
	 */
	function setupSettings()
	{
		if ($this->settings != null)
		{
			return ;
		}
		$op_code = $this->code;
		/* Find component settings */
		$this->settings = $this->page_model->getFrameEditor()->getWidgetSettings($this);
	}
	/**
	 * Setup params
	 */
	function setupParams()
	{
		/* Clear params */
		$this->params = \Runtime\Vector::from([]);
		$this->params->add($this->param_widget_name);
		$this->params->add($this->param_class_name);
		/* Setup params from settings */
		if ($this->settings)
		{
			$this->params->appendItems($this->settings->getParams()->map(function ($factory)
			{
				$param = $factory->factory(new \Runtime\rtl());
				$param->widget = $this;
				return $param;
			}));
		}
	}
	/**
	 * Setup attrs
	 */
	function setupAttrs()
	{
		$attrs = $this->code->attrs;
		if (!$attrs)
		{
			return ;
		}
		/* Setup paremeters values */
		for ($i = 0; $i < $attrs->count(); $i++)
		{
			$op_attr = $attrs->get($i);
			for ($j = 0; $j < $this->params->count(); $j++)
			{
				$param = $this->params->get($j);
				if ($param instanceof \BayLang\Constructor\Frontend\Editor\Parameters\ParameterComponent && $param->isOpCode($op_attr))
				{
					$param->setOpCode($op_attr);
				}
			}
		}
		/* Create class attribute */
		if ($this->param_class_name->op_attr == null)
		{
			$op_attr = new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["key"=>"class"]));
			$this->param_class_name->op_attr = $op_attr;
			$this->param_widget_name->op_attr = $op_attr;
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->param_class_name = null;
		$this->param_widget_name = null;
		$this->is_raw = false;
		$this->html_content = "";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetTag";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.Widget";
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