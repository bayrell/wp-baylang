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
namespace Runtime\WordPress;
class WP_Helper
{
	/**
	 * Returns option by name
	 */
	static function get_option($name, $value="")
	{
		if ( ! is_multisite() )
		{
			return \get_option($name, $value);
		}
		return \get_blog_option(null, $name, $value);
	}
	/**
	 * Update option by name
	 */
	static function update_option($name, $value)
	{
		if ( ! is_multisite() )
		{
			if (!add_option($name, $value, "", "no"))
			{
				\update_option($name, $value);
			}
		}
		else
		{
			if (!add_blog_option(null, $name, $value, "", "no"))
			{
				\update_blog_option(null, $name, $value);
			}
		}
	}
	/**
	 * Check wp nonce
	 */
	static function check_wp_nonce($nonce_action)
	{
		/* Check nonce */
		$nonce = isset($_REQUEST['nonce']) ? $_REQUEST['nonce'] : false;
		if ($nonce == false)
		{
			return false;
		}
		if (!wp_verify_nonce($nonce, $nonce_action))
		{
			return false;
		}
		return true;
	}
	/**
	 * Call backend function
	 */
	static function call($name)
	{
		$args = func_get_args();
		array_shift($args);
		
		return call_user_func_array($name, $args);
	}
	/**
	 * Call backend function
	 */
	static function wp_call($name)
	{
		ob_start();
		$args = func_get_args();
		array_shift($args);
		
		call_user_func_array($name, $args);
		$content = ob_get_contents();
		ob_end_clean();
		
		return $content;
	}
	/**
	 * Call wp admin route
	 */
	static function wp_admin_route($route_name, $route_before=null)
	{
		$content = "";
		/* Create render container */
		$app = \Runtime\rtl::getContext()->getApp();
		$container = $app->createRenderContainer();
		/* Create request */
		$container->request = $app->createRequest();
		/* Setup route */
		$routes = \Runtime\rtl::getContext()->provider("Runtime.Web.RouteList");
		$route = $routes->routes_list->findItem(\Runtime\lib::equalAttr("name", $route_name));
		$container->route = $route;
		/* Create layout */
		$layout_name = $container->getLayoutName();
		$container->createLayout($layout_name);
		/* Call route before */
		if ($route_before)
		{
			\Runtime\rtl::apply($route_before, \Runtime\Vector::from([$container]));
		}
		/* Resolve route */
		$container->resolveRoute();
		/* Return container */
		return $container;
	}
	/**
	 * Render
	 */
	static function wp_render($container)
	{
		$content = "";
		if ($container->response instanceof \Runtime\Web\RenderResponse && $container->response->content == null)
		{
			/* Create component */
			$component = \Runtime\rtl::newInstance("Runtime.WordPress.Admin.AdminUI");
			$component->container = $container;
			$component->layout = $container->layout;
			$component->model = $container->layout;
			/* Render component */
			$content = \Runtime\RawString::normalize($component->render());
		}
		else if ($container->response != null)
		{
			$content = $container->response->content;
		}
		else
		{
			$content = "<p>404 Response not found</p>";
		}
		return $content;
	}
	/**
	 * Render page
	 */
	static function wp_render_page($route_name, $route_before=null)
	{
		$container = static::wp_admin_route($route_name, $route_before);
		$content = static::wp_render($container);
		do_action("baylang_admin_render_page");
		echo $content;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.WP_Helper";
	}
	static function getParentClassName()
	{
		return "";
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