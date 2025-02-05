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
		if (!is_multisite())
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
		if (!is_multisite())
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
	 * Returns app version
	 */
	static function getAppVersion($version)
	{
		return $version . \Runtime\rtl::toStr("_") . \Runtime\rtl::toStr(static::get_option("app_js_vesion"));
	}
	/**
	 * Setup app version
	 */
	static function setAppVersion($timestamp)
	{
		static::update_option("app_js_vesion", $timestamp);
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
	 * Load images
	 */
	static function loadImages($connection, $images)
	{
		$result = \Runtime\Map::from([]);
		/* Get images metadata */
		$q = (new \Runtime\ORM\Query())->select()->from("postmeta")->addRawField("*")->where("meta_key", "=", \Runtime\Vector::from(["_wp_attachment_metadata","_wp_attached_file"]))->where("post_id", "=", $images);
		$images_metadata = $connection->fetchAll($q);
		/* Get post */
		$q = (new \Runtime\ORM\Query())->select()->from("posts")->addRawField("*")->where("ID", "=", $images);
		$posts = $connection->fetchAll($q);
		/* Upload dir */
		$upload_url = "/wp-content/uploads";
		/* Map items */
		for ($i = 0; $i < $images->count(); $i++)
		{
			$image_id = $images->get($i);
			$image = null;
			/* Get post */
			$post_time = "";
			$post = $posts->findItem(\Runtime\lib::equalAttr("ID", $image_id));
			if ($post)
			{
				$d = \Runtime\DateTime::fromString(\Runtime\rtl::attr($post, "post_modified_gmt"));
				$post_time = $d->timestamp();
			}
			/* Load metadata */
			$obj_file = $images_metadata->findItem(function ($item) use (&$image_id)
			{
				return \Runtime\rtl::attr($item, "meta_key") == "_wp_attached_file" && \Runtime\rtl::attr($item, "post_id") == $image_id;
			});
			$obj_metadata = $images_metadata->findItem(function ($item) use (&$image_id)
			{
				return \Runtime\rtl::attr($item, "meta_key") == "_wp_attachment_metadata" && \Runtime\rtl::attr($item, "post_id") == $image_id;
			});
			if (!($obj_file && $obj_metadata))
			{
				continue;
			}
			$obj_metadata = $obj_metadata->get("meta_value");
			$obj_file = $obj_file->get("meta_value");
			$image_url_after = "?_=" . \Runtime\rtl::toStr($post_time);
			$obj_metadata = @unserialize($obj_metadata);
			if ($obj_metadata)
			{
				$image_dir_name = dirname($obj_file);
				$image_dir_name = $upload_url . "/" . $image_dir_name;
				$sizes = $obj_metadata["sizes"];
				
				foreach ($sizes as $key => &$size)
				{
					$size = \Runtime\Dict::from([
						"size" => $key,
						"file" => $image_dir_name . "/" .
							basename($size["file"]) . $image_url_after,
						"width" => $size["width"],
						"height" => $size["height"],
						"mime_type" => $size["mime-type"],
					]);
				}
				
				$sizes = \Runtime\Dict::from($sizes);
				$image = \Runtime\Dict::from([
					"id" => $image_id,
					"width" => $obj_metadata["width"],
					"height" => $obj_metadata["height"],
					"file" => $image_dir_name . "/" .
						basename($obj_metadata["file"]) . $image_url_after,
					"sizes" => $sizes,
				]);
			}
			if (!$image)
			{
				continue;
			}
			$result->set($image_id, $image);
		}
		return $result;
	}
	/**
	 * Apply backend function
	 */
	static function apply($name)
	{
		$args = func_get_args();
		array_shift($args);
		
		return call_user_func_array($name, $args);
	}
	/**
	 * Apply backend function
	 */
	static function wp_apply($name)
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
		if ($container->response instanceof \Runtime\Web\Response)
		{
			$content = $container->response->getContent(false);
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
		do_action("admin_render_page");
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