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
namespace Runtime\Web;
class BaseApp extends \Runtime\BaseObject
{
	/**
	 * Init app
	 */
	function init()
	{
	}
	/**
	 * Start app
	 */
	function start()
	{
	}
	/**
	 * Run Web Application
	 */
	function main()
	{
		/* Create container */
		$container = $this->createRenderContainer();
		/* Create request */
		$container->request = $this->createRequest();
		/* Resolve container */
		$container->resolve();
		/* Send reponse */
		$this->sendResponse($container);
		return 0;
	}
	/**
	 * Create render container
	 */
	function createRenderContainer()
	{
		$container = new \Runtime\Web\RenderContainer();
		/* Create layout */
		\Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::CREATE_CONTAINER, \Runtime\Map::from(["container"=>$container]));
		return $container;
	}
	/**
	 * Read post
	 */
	function readPost()
	{
		$post = null;
		$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : "";
		$content_type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : "";
		if (substr($content_type, 0, strlen('application/json')) == 'application/json')
		{
			$json = file_get_contents("php://input");
			$post = \Runtime\rtl::json_decode($json);
		}
		else
		{
			if ($method == "POST")
			{
				$post = $_POST;
			}
		}
		return $post;
	}
	/**
	 * Build files
	 */
	function buildFiles($payload, $path, $file)
	{
		if (is_string($file["name"]))
		{
			$item = new \Runtime\File([
				"name" => $file["name"],
				"path" => $file["tmp_name"],
				"type" => $file["type"],
				"size" => $file["size"],
			]);
			\Runtime\rtl::setAttr($payload, $path, $item);
		}
		else if (is_array($file["name"]))
		{
			foreach ($file["name"] as $index => $value)
			{
				$path->push($index);
				$this->buildFiles($payload, $path, [
					"name" => $file["name"][$index],
					"size" => $file["size"][$index],
					"tmp_name" => $file["tmp_name"][$index],
					"type" => $file["type"][$index],
				]);
				$path->pop();
			}
		}
	}
	/**
	 * Build post files
	 */
	function buildPostFiles($payload)
	{
		if (count($_FILES) == 0) return;
		
		foreach ($_FILES as $key => $value)
		{
			$this->buildFiles($payload, new \Runtime\Vector($key), $value);
		}
	}
	/**
	 * Build post data
	 */
	function buildPostData($payload, $path, $post)
	{
		if (gettype($post) == "array")
		{
			if ($path->count() > 0)
			{
				$key = $path->last();
				if (!$payload->has($key))
				{
					$payload->set($key, new \Runtime\Map());
				}
				$payload = $payload->get($key);
			}
			foreach ($post as $key => $val)
			{
				$path->push($key);
				$this->buildPostData($payload, $path, $val);
				$path->pop();
			}
		}
		else if ($path->count() > 0)
		{
			$key = $path->last();
			$payload->set($key, $post);
		}
	}
	/**
	 * Create request
	 */
	function createRequest()
	{
		$request = new \Runtime\Web\Request();
		$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : "";
		$uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : "";
		$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : "";
		$start_time = isset($_SERVER['REQUEST_TIME_FLOAT']) ? $_SERVER['REQUEST_TIME_FLOAT'] : "";
		$content_type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : "";
		
		$query = new \Runtime\Map();
		$payload = new \Runtime\Map();
		$cookies = new \Runtime\Map();
		foreach ($_GET as $key => $val) $query->set($key, $val);
		
		/* Read POST */
		$post = $this->readPost();
		if ($post != null)
		{
			if ($post instanceof \Runtime\Dict)
			{
				$payload = $post;
			}
			else
			{
				$this->buildPostData($payload, new \Runtime\Vector(), $post, $files);
				$this->buildPostFiles($payload);
			}
		}
		
		/* Read Cookie */
		foreach ($_COOKIE as $key => $value)
		{
			$cookies->set($key, $value);
		}
		
		/* Setup uri */
		$request->initUri($uri);
		
		/* Setup protocol */
		$request->protocol = "http";
		if (isset($_SERVER['REQUEST_SCHEME']))
		{
			$request->protocol = $_SERVER['REQUEST_SCHEME'];
		}
		if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']))
		{
			$request->protocol = $_SERVER['HTTP_X_FORWARDED_PROTO'];
		}
		
		$request->is_https = $request->protocol == "https";
		
		/* Setup request */
		$request->host = $host;
		$request->method = $method;
		$request->query = $query;
		$request->payload = $payload;
		$request->cookies = $cookies;
		$request->headers = \Runtime\Map::from($_SERVER);
		$request->start_time = $start_time;
		return $request;
	}
	/**
	 * Send response
	 */
	function sendResponse($container)
	{
		/* Call response */
		\Runtime\rtl::getContext()->callHookAsync(\Runtime\Web\Hooks\AppHook::RESPONSE, \Runtime\Map::from(["container"=>$container]));
		$response = $container->response;
		
		if ($response != null)
		{
			http_response_code($response->http_code);
			
			/* Setup cookies */
			if ($container->cookies != null)
			{
				$container->cookies->each(
					function (Cookie $cookie)
					{
						if ($cookie == null) return;
						if ($cookie->name == "") return;
						
						setcookie
						(
							$cookie->name,
							$cookie->value,
							$cookie->getOptions()->_map
						);
					}
				);
			}
			
			/* Setup headers */
			if ($response->headers != null)
			{
				$response->headers->each(
					function (string $value, string $key)
					{
						header($key . ":" . $value);
					}
				);
			}
			
			/* Redirect */
			if ($response instanceof \Runtime\Web\RedirectResponse)
			{
				header("Location:" . $response->redirect);
			}
			
			echo $response->getContent();
		}
		
		else
		{
			http_response_code(404);
			echo "404 Response not found";
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.BaseApp";
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