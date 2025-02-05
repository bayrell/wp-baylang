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
class DefaultLayout extends \Runtime\Web\Component
{
	public $container;
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
	function renderHead()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, static::renderHeadComponents());
		
		/* Text */
		$this->_t($__v, static::renderCSS());
		
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
	function renderBody()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, static::renderBodyComponents());
		
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
		
		return $__v;
	}
	function renderCurrentPage()
	{
		$__v = new \Runtime\Vector();
		$current_page_model = $this->layout->getPageModel();
		
		if ($current_page_model)
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($current_page_model, $this->layout->current_page_props));
		}
		else
		{
			$current_page = $this->layout->getPageClassName();
			
			if ($current_page)
			{
				$props = $this->layout->current_page_props;
				
				/* Component '{current_page}' */
				$this->_c($__v, $current_page, $this->_merge_attrs([], $props));
			}
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderCurrentPage());
		
		return $this->_flatten($__v);
	}
	function renderApp()
	{
		$__v = new \Runtime\Vector();
		$render_provider = \Runtime\rtl::getContext()->provider("Runtime.Web.RenderProvider");
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->render());
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name([$render_provider->selector])], $__v0);
		
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
	function renderCoreUI()
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
		
		return $__v;
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
		return "Runtime.Web.DefaultLayout";
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