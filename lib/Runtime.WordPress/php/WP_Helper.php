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

use Runtime\BaseLayout;
use Runtime\Component;
use Runtime\RenderContainer;
use Runtime\VirtualDom;
use Runtime\Providers\RenderContent;
use Runtime\DateTime;
use Runtime\RawString;
use Runtime\Exceptions\ItemNotFound;
use Runtime\ORM\Connection;
use Runtime\ORM\Query;
use Runtime\ORM\QueryResult;
use Runtime\Web\BaseApp;
use Runtime\Web\Response;
use Runtime\Web\RouteInfo;
use Runtime\Web\RouteList;
use Runtime\Web\RouteProvider;
use Runtime\WordPress\Admin\AdminUI;
use Runtime\WordPress\Theme\Components\ImageType;


class WP_Helper
{
	/**
	 * Returns option by name
	 */
	static function get_option($name, $value = "")
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
		$js_version = static::get_option("app_js_vesion");
		if ($js_version) return $version . "_" . $js_version;
		return $version;
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
	 * Returns true if user is admin
	 */
	static function isAdmin()
	{
		return current_user_can("edit_pages");
		return false;
	}
	
	
	/**
	 * Load images
	 */
	static function loadImages($images, $connection = null)
	{
		$result = new \Runtime\Map();
		/* Get connection */
		if (!$connection) $connection = \Runtime\ORM\Connection::get();
		/* Get images metadata */
		$q = (new \Runtime\ORM\Query())->select()->from("postmeta")->addRawField("*")->where("meta_key", "=", new \Runtime\Vector("_wp_attachment_metadata", "_wp_attached_file"))->where("post_id", "=", $images);
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
			$post = $posts->find(function ($row) use (&$image_id){ return $row->get("ID") == $image_id; });
			if ($post)
			{
				$d = \Runtime\DateTime::fromString($post->get("post_modified_gmt"));
				$post_time = $d->timestamp();
			}
			/* Load metadata */
			$obj_file = $images_metadata->find(function ($item) use (&$image_id)
			{
				return $item->get("meta_key") == "_wp_attached_file" && $item->get("post_id") == $image_id;
			});
			$obj_metadata = $images_metadata->find(function ($item) use (&$image_id)
			{
				return $item->get("meta_key") == "_wp_attachment_metadata" && $item->get("post_id") == $image_id;
			});
			if (!($obj_file && $obj_metadata)) continue;
			$obj_metadata = $obj_metadata->get("meta_value");
			$obj_file = $obj_file->get("meta_value");
			$image_url_after = "?_=" . $post_time;
			$obj_metadata = @unserialize($obj_metadata);
			if ($obj_metadata)
			{
				$image_dir_name = dirname($obj_file);
				$image_dir_name = $upload_url . "/" . $image_dir_name;
				$sizes = $obj_metadata["sizes"];
				
				foreach ($sizes as $key => &$size)
				{
					$size = \Runtime\Map::create([
						"size" => $key,
						"file" => $image_dir_name . "/" .
							basename($size["file"]) . $image_url_after,
						"width" => $size["width"],
						"height" => $size["height"],
						"mime_type" => $size["mime-type"],
					]);
				}
				
				$sizes = \Runtime\Map::create($sizes);
				$image = new ImageType();
				$image->id = $image_id;
				$image->width = $obj_metadata["width"];
				$image->height = $obj_metadata["height"];
				$image->file = $image_dir_name . "/" .
					basename($obj_metadata["file"]) . $image_url_after;
				$image->sizes = $sizes;
			}
			if (!$image) continue;
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
	 * Render app
	 */
	static function renderApp()
	{
		/* Create container and layout */
		$app = \Runtime\rtl::getContext()->provider("app");
		$container = $app->createRenderContainer();
		/* Create request */
		$container->request = $app->createRequest();
		/* Resolve container */
		$container->resolve();
		/* Returns container */
		return $container;
	}
	
	
	/**
	 * Render page
	 */
	static function renderPage($route_name, $params = null)
	{
		/* Create container and layout */
		$app = \Runtime\rtl::getContext()->provider("app");
		$container = $app->createRenderContainer();
		/* Create request */
		$container->request = $app->createRequest();
		/* Find route */
		$routes = \Runtime\rtl::getContext()->provider("Runtime.Web.RouteProvider");
		$container->route = $routes->getRoute($route_name);
		/* Set matches */
		if ($container->route && $params) $container->route->matches = $params;
		/* Resolve route */
		$container->resolveRoute();
		/* Returns container */
		return $container;
	}
	
	
	/**
	 * Render page model
	 */
	static function renderPageModel($class_name, $layout_name = "default")
	{
		/* Create container and layout */
		$app = \Runtime\rtl::getContext()->provider("app");
		$container = $app->createRenderContainer();
		/* Create request */
		$container->request = $app->createRequest();
		/* Create layout */
		$layout = $container->createLayout($layout_name);
		/* Render page */
		$container->renderPageModel($class_name);
		/* Returns container */
		return $container;
	}
	
	
	/**
	 * Render container
	 */
	static function render($container)
	{
		do_action("admin_render_page");
		
		if ($container->route == null)
		{
			echo "<p>Page not found</p>";
		}
		else
		{
			echo $container->renderApp();
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
	}
	static function getClassName(){ return "Runtime.WordPress.WP_Helper"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}