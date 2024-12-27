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
namespace Runtime\Web;
class Component extends \Runtime\BaseObject
{
	public $class;
	public $data;
	public $data_widget_path;
	public $model;
	public $render_list;
	public $render_cache;
	public $layout;
	public $_parent_component;
	public $_props;
	public $_slots;
	function __construct()
	{
		parent::__construct();
		$this->initWidget();
	}
	function renderWidget($widget, $props=null)
	{
		$__v = new \Runtime\Vector();
		
		if ($widget)
		{
			$component = $widget->component;
			
			if ($component)
			{
				/* Component '{component}' */
				$this->_c($__v, $component, $this->_merge_attrs(["model" => $this->_model($widget)], $props));
			}
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderSlot("default"));
		
		return $this->_flatten($__v);
	}
	/**
 * Returns true if first in render list
 */
	function isFirstInRenderList()
	{
		return ($this->render_list != null && $this->render_list->has("first")) ? ($this->render_list->get("first")) : (false);
	}
	/**
 * Returns false if first in render list
 */
	function isLastInRenderList()
	{
		return ($this->render_list != null && $this->render_list->has("last")) ? ($this->render_list->get("last")) : (false);
	}
	/**
 * Returns position in render list
 */
	function positionInRenderList()
	{
		return ($this->render_list != null && $this->render_list->has("position")) ? ($this->render_list->get("position")) : (-1);
	}
	/**
 * Returns class name for render list item
 */
	function renderListClass()
	{
		if ($this->render_list == null)
		{
			return ;
		}
		$class_name = \Runtime\Vector::from([]);
		if ($this->render_list->has("position"))
		{
			$class_name->push("item--" . \Runtime\rtl::toStr($this->render_list->get("position")));
		}
		if ($this->render_list->has("first") && $this->render_list->get("first"))
		{
			$class_name->push("item--first");
		}
		if ($this->render_list->has("last") && $this->render_list->get("last"))
		{
			$class_name->push("item--last");
		}
		return \Runtime\rs::join(" ", $class_name);
	}
	/**
 * Returns true slot if is exists
 */
	function checkSlot($slot_name)
	{
		return $this->_slots->has($slot_name);
	}
	/**
 * Render slot
 */
	function renderSlot($slot_name)
	{
		$f = $this->_slots->get($slot_name);
	if ($f == null) return null;
	return $f();
	}
	/**
 * Returns component key path
 */
	function getKeyPath()
	{
		$result = \Runtime\Vector::from([]);
		$component = $this;
		while ($component != null)
		{
			$result->push($this->key);
			$component = $component->getParent();
		}
		return $result;
	}
	/**
 * Parent component
 */
	function getParent()
	{
		return $this->_parent_component;
	}
	/**
 * Returns ref
 */
	function getRef($name)
	{
		return null;
	}
	/**
 * Returns props
 */
	function getProps()
	{
		return $this->_props;
	}
	/**
 * Emit message
 */
	function emit($event, $obj=null)
	{
	}
	/**
 * Reload component
 */
	function reload($event, $obj=null)
	{
	}
	/**
 * Init widget settings
 */
	function initWidget()
	{
	}
	/**
 * Before create
 */
	static function onBeforeCreate()
	{
	}
	/**
 * Created
 */
	function onCreated()
	{
	}
	/**
 * Before mount
 */
	function onBeforeMount()
	{
	}
	/**
 * Mounted
 */
	function onMounted()
	{
	}
	/**
 * Before update
 */
	function onBeforeUpdate()
	{
	}
	/**
 * Updated
 */
	function onUpdated()
	{
	}
	/**
 * Before Unmount
 */
	function onBeforeUnmount()
	{
	}
	/**
 * Unmounted
 */
	function onUnmount()
	{
	}
	/**
 * Next tick
 */
	function nextTick($f)
	{
		$Vue = \Runtime\rtl::attr($window, "Vue");
		$Vue->nextTick($f);
	}
	/**
 * Returns model for component
 */
	function _model($obj=null, $is_global=false)
	{
		if ($obj instanceof \Runtime\Collection)
		{
			if ($obj->count() == 0)
			{
				return $this->model;
			}
			if ($is_global)
			{
				return $this->layout->model($obj);
			}
			return \Runtime\rtl::attr($this->model, $obj);
		}
		return $obj;
	}
	/**
 * Returns component class name
 */
	function _class_name($names)
	{
		$names[] = static::getCssHash(static::getClassName());
	$names = array_filter($names, function($s){ return $s != ""; });
	return implode(" ", $names);
	}
	/**
 * Merge attrs
 */
	function _merge_attrs($attr1, $attr2)
	{
		if ($attr2 == null)
		{
			return $attr1;
		}
		return array_merge($attr1, $attr2->_map);
	}
	/**
 * Filter attrs
 */
	function _filter_attrs($attrs)
	{
		return null;
	}
	/**
 * Escape html
 */
	function _escape($s)
	{
		if (\Runtime\rtl::isScalarValue($s))
		{
			return \Runtime\rs::htmlEscape($s);
		}
		return "";
	}
	/**
 * Render text
 */
	function _t($parent_elem, $content=null)
	{
		if ($content == null)
		{
			return ;
		}
		if ($content instanceof \Runtime\Collection)
	{
		$parent_elem->appendItems($content);
	}
	else
	{
		$parent_elem->push($content);
	}
	}
	/**
 * Render element
 */
	function _e($parent_elem, $elem_name=null, $attrs=null, $content=null)
	{
		$elem = null;
		$attrs_str = "";
	
	if ($attrs != null && count($attrs) > 0)
	{
		$attrs = array_map(
			function ($value, $key)
			{
				return $key . "='" . \Runtime\rs::escapeHtml($value) . "'";
			},
			array_values($attrs),
			array_keys($attrs)
		);
		$attrs_str = " " . implode(" ", $attrs);
	}
	
	if ($elem_name == "br")
	{
		$parent_elem->append("<br/>");
	}
	else
	{
		$elem = new \Runtime\Vector();
		$elem->push("<" . $elem_name . $attrs_str . ">");
		
		if ($content instanceof \Runtime\Collection)
		{
			$elem->appendItems($content);
		}
		else if (is_string($content) or $content instanceof \Runtime\RawString)
		{
			$elem->push($content);
		}
		
		$elem->push("</" . $elem_name . ">");
		$parent_elem->append($elem->join(""));
	}
		return $elem;
	}
	/**
 * Render component
 */
	function _c($parent_elem, $component_name=null, $attrs=null, $content=null)
	{
		$elem = null;
		if (
		$component_name == "KeepAlive" or
		$component_name == "Transition" or
		$component_name == "TransitionGroup"
	)
	{
		$component_name = "Runtime.Web.Component";
	}
	$component = \Runtime\rtl::newInstance($component_name);
	$component->layout = $this->layout;
	$component->_parent_component = $this;
	$component->_props = $attrs;
	if ($content instanceof \Runtime\Dict) $component->_slots = $content;
	else $component->_slots = \Runtime\Dict::from([ "default" => $content ]);
	if ($attrs != null)
	{
		foreach ($attrs as $key => $value)
		{
			if (property_exists($component, $key))
			{
				$component->$key = $value;
			}
		}
	}
	$elem = $component->render();
	
	if ($elem instanceof \Runtime\Collection)
	{
		/*$parent_elem->push("<!--[-->");*/
		$parent_elem->appendItems($elem);
		/*$parent_elem->push("<!--]-->");*/
	}
	else if (is_string($elem) or $elem instanceof \Runtime\RawString)
	{
		$parent_elem->push($elem);
	}
		return $elem;
	}
	/**
 * Push to parent elem
 */
	function _parent_elem_push($parent_elem, $elem)
	{
	}
	/**
 * Flatten elements
 */
	function _flatten($arr, $detect_multiblock=true)
	{
		if ($arr->count() == 0) return "";
	if ($arr->count() == 1) return \Runtime\rtl::toString($arr->get(0));
	
	if ($detect_multiblock)
	{
		$arr->insert(0, "<!--[-->");
		$arr->push("<!--]-->");
	}
	
	return $arr->join("");
	}
	/**
 * Teleport
 */
	function _teleport($parent_elem, $attrs=null, $content=null)
	{
		$parent_elem->push("<!--teleport start--><!--teleport end-->");
	$this->layout->teleports->push($content->join(""));
	}
	/**
 * Returns styles
 */
	static function getStyles($class_name, $styles)
	{
		return $styles->map(function ($item) use (&$class_name)
		{
			return (\Runtime\rs::charAt($item, 0) != "@") ? ($class_name . \Runtime\rtl::toStr("--") . \Runtime\rtl::toStr($item)) : (\Runtime\rs::substr($item, 1));
		})->join(" ");
	}
	/**
 * Returns components
 */
	static function components()
	{
		return \Runtime\Vector::from([]);
	}
	/**
 * Returns assets
 */
	static function assets($path)
	{
		$params = \Runtime\Map::from([]);
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::ASSETS, $params);
		$path = \Runtime\rs::join_path(\Runtime\Vector::from([$params->get("assets_path", ""),$path]));
		return \Runtime\rs::addFirstSlash($path);
	}
	/**
 * Returns css hash
 */
	static function getCssHash($class_name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.Web.Component.getCssHash", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$__v0 = new \Runtime\Monad(\Runtime\rtl::getParents($class_name));
		$__v0 = $__v0->callMethod("toVector", []);
		$__v0 = $__v0->callMethod("prepend", [$class_name]);
		$__v0 = $__v0->callMethod("filter", [function ($class_name)
		{
			return $class_name != "Runtime.BaseObject" && $class_name != "Runtime.Web.Component" && $class_name != "";
		}]);
		$__v0 = $__v0->callMethod("map", [function ($class_name)
		{
			return "h-" . \Runtime\rtl::toStr(static::hash($class_name));
		}]);
		$__v0 = $__v0->call(\Runtime\lib::join(" "));$__memorize_value = $__v0->value();
		\Runtime\rtl::_memorizeSave("Runtime.Web.Component.getCssHash", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
 * Retuns css hash
 * @param string component class name
 * @return string hash
 */
	static function hash($s)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("Runtime.Web.Component.hash", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$h = \Runtime\rs::hash($s, true, 337, 65537) + 65537;
		$res = \Runtime\rs::toHex($h);
		$__memorize_value = \Runtime\rs::substr($res, -4);
		\Runtime\rtl::_memorizeSave("Runtime.Web.Component.hash", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
 * Is component
 */
	static function isComponent($tag_name)
	{
		$ch1 = \Runtime\rs::substr($tag_name, 0, 1);
		$ch2 = \Runtime\rs::upper($ch1);
		return $tag_name != "" && ($ch1 == "{" || $ch1 == $ch2);
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
		$this->class = "";
		$this->data = null;
		$this->data_widget_path = null;
		$this->model = null;
		$this->render_list = null;
		$this->render_cache = new \Runtime\Map();
		$this->layout = null;
		$this->_parent_component = null;
		$this->_props = null;
		$this->_slots = null;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.Component";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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