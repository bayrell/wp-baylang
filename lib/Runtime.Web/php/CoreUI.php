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
class CoreUI extends \Runtime\Web\Component
{
	public $container;
	function renderWidget($widget, $props=null)
	{
		$__v = new \Runtime\Vector();
		
		if ($widget)
		{
			if (\Runtime\rtl::is_instanceof($widget, "Runtime.Web.BaseModel"))
			{
				$component = $widget->component;
				
				if ($component)
				{
					/* Component '{component}' */
					$this->_c($__v, $component, $this->_merge_attrs(["model" => $this->_model($widget)], $props));
				}
			}
			else
			{
				/* Component '{widget}' */
				$this->_c($__v, $widget, ["model" => $this->_model(\Runtime\Vector::from([]))]);
			}
		}
		
		return $__v;
	}
	function renderSEO()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'title' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->layout->getFullTitle()));
		
		/* Element 'title' */
		$this->_e($__v, "title", [], $__v0);
		
		if ($this->layout->content_type)
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["charset" => $this->layout->content_type]);
			
			/* Element 'meta' */
			$this->_e($__v, "meta", ["http-equiv" => "Content-Type","content" => "text/html; " . \Runtime\rtl::toStr($this->layout->content_type)]);
		}
		
		if ($this->layout->getLocale())
		{
			/* Element 'meta' */
			$this->_e($__v, "meta", ["http-equiv" => "Content-Language","content" => $this->layout->getLocale()]);
		}
		
		return $__v;
	}
	function renderHeadComponents()
	{
		$__v = new \Runtime\Vector();
		$d = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::RENDER_HEAD, \Runtime\Map::from(["components"=>$this->layout->getHeaderComponents(),"layout"=>$this->layout]));
		$components = \Runtime\rtl::attr($d, "components");
		
		for ($i = 0; $i < $components->count(); $i++)
		{
			$widget = $components->get($i);
			
			/* Text */
			$this->_t($__v, $this->renderWidget($widget));
		}
		
		return $__v;
	}
	function renderCSS()
	{
		$__v = new \Runtime\Vector();
		$components = $this->layout->getComponents();
		$css = $this->layout::getCss($components);
		
		/* Element 'style' */
		$__v0 = new \Runtime\Vector();
		
		/* Raw */
		$this->_t($__v0, new \Runtime\RawString($css));
		
		/* Element 'style' */
		$this->_e($__v, "style", ["id" => "core-css","class" => $this->_class_name(["components"])], $__v0);
		
		return $__v;
	}
	function renderBasePrefix()
	{
		$__v = new \Runtime\Vector();
		$route_prefix = \Runtime\rtl::getContext()->env("ROUTE_PREFIX");
		
		if ($route_prefix)
		{
			/* Element 'base' */
			$this->_e($__v, "base", ["href" => \Runtime\rs::addLastSlash($route_prefix)]);
		}
		else
		{
			/* Element 'base' */
			$this->_e($__v, "base", ["href" => "/"]);
		}
		
		return $__v;
	}
	function renderHeadAfter()
	{
		$__v = new \Runtime\Vector();
		
		return $__v;
	}
	function renderHead()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, static::renderBasePrefix());
		
		/* Text */
		$this->_t($__v, static::renderSEO());
		
		/* Text */
		$this->_t($__v, static::renderHeadComponents());
		
		/* Text */
		$this->_t($__v, static::renderCSS());
		
		/* Text */
		$this->_t($__v, static::renderHeadAfter());
		
		return $__v;
	}
	function renderBodyComponents()
	{
		$__v = new \Runtime\Vector();
		$d = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::RENDER_BODY, \Runtime\Map::from(["components"=>$this->layout->getBodyComponents(),"layout"=>$this->layout]));
		$components = \Runtime\rtl::attr($d, "components");
		
		for ($i = 0; $i < $components->count(); $i++)
		{
			$widget = $components->get($i);
			
			/* Text */
			$this->_t($__v, $this->renderWidget($widget));
		}
		
		return $__v;
	}
	function renderBodyAfter()
	{
		$__v = new \Runtime\Vector();
		
		return $__v;
	}
	function renderBody()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, static::renderBodyComponents());
		
		/* Text */
		$this->_t($__v, static::renderBodyAfter());
		
		return $__v;
	}
	function renderApp()
	{
		$__v = new \Runtime\Vector();
		$render_provider = \Runtime\rtl::getContext()->provider("Runtime.Web.RenderProvider");
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Component 'AppComponent' */
		$this->_c($__v0, "Runtime.Web.AppComponent", ["model" => $this->_model(\Runtime\Vector::from([]))]);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name([$render_provider->selector])], $__v0);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Raw */
		$this->_t($__v0, new \Runtime\RawString(($render_provider->enable_ssr) ? ($this->layout->teleports->join("")) : ("")));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["teleports"])], $__v0);
		
		/* Element 'script' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, "window[\"app_data\"] = ");
		
		/* Raw */
		$this->_t($__v0, new \Runtime\RawString(\Runtime\rtl::json_encode($this->container->exportData(), \Runtime\rtl::ALLOW_OBJECTS)));
		
		/* Text */
		$this->_t($__v0, ";");
		
		/* Element 'script' */
		$this->_e($__v, "script", [], $__v0);
		
		/* Element 'script' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, "onReady(function(){\n\t\t\tRuntime.rtl.runApp(\n\t\t\t\tapp_data[\"entry_point\"],\n\t\t\t\tapp_data[\"modules\"],\n\t\t\t\tRuntime.Map.from({\n\t\t\t\t\t\"environments\": Runtime.Map.from(app_data[\"environments\"]),\n\t\t\t\t\t\"tz\": ");
		
		/* Text */
		$this->_t($__v0, \Runtime\rtl::json_encode(\Runtime\rtl::getContext()->tz));
		
		/* Text */
		$this->_t($__v0, ",\n\t\t\t\t\t\"tz_offset\": ");
		
		/* Text */
		$this->_t($__v0, \Runtime\rtl::json_encode(0));
		
		/* Text */
		$this->_t($__v0, "})\n\t\t\t);\n\t\t});");
		
		/* Element 'script' */
		$this->_e($__v, "script", [], $__v0);
		
		return $__v;
	}
	function renderFooterAfter()
	{
		$__v = new \Runtime\Vector();
		
		return $__v;
	}
	function renderFooterComponents()
	{
		$__v = new \Runtime\Vector();
		$d = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::RENDER_FOOTER, \Runtime\Map::from(["components"=>$this->layout->getFooterComponents(),"layout"=>$this->layout]));
		$components = \Runtime\rtl::attr($d, "components");
		
		for ($i = 0; $i < $components->count(); $i++)
		{
			$widget = $components->get($i);
			
			/* Text */
			$this->_t($__v, $this->renderWidget($widget));
		}
		
		return $__v;
	}
	function renderFooter()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, static::renderFooterComponents());
		
		/* Text */
		$this->_t($__v, static::renderFooterAfter());
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'html' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'head' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, static::renderHead());
		
		/* Element 'script' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "window.\$onReady=[];function onReady(f){ window.\$onReady.push(f) };");
		
		/* Element 'script' */
		$this->_e($__v1, "script", [], $__v2);
		
		/* Element 'head' */
		$this->_e($__v0, "head", [], $__v1);
		
		/* Element 'body' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, static::renderBody());
		
		/* Text */
		$this->_t($__v1, static::renderApp());
		
		/* Text */
		$this->_t($__v1, static::renderFooter());
		
		/* Element 'script' */
		$__v2 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v2, "window.addEventListener('load', function() {\n\t\t\t\twindow.\$onReady.forEach( function(f){ f(); } );\n\t\t\t});");
		
		/* Element 'script' */
		$this->_e($__v1, "script", [], $__v2);
		
		/* Element 'body' */
		$this->_e($__v0, "body", [], $__v1);
		
		/* Element 'html' */
		$this->_e($__v, "html", ["lang" => $this->layout->getLocale()], $__v0);
		
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
		$this->container = null;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.CoreUI";
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