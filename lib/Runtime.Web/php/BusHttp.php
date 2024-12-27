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
class BusHttp extends \Runtime\BaseObject implements \Runtime\Web\BusInterface
{
	public $kind;
	/**
	 * Send api to frontend
	 */
	function send($params)
	{
		$service = $params->get("service", "app");
		$api_name = $params->get("api_name", "");
		$method_name = $params->get("method_name", "");
		$data = $params->get("data", null);
		$route_prefix = \Runtime\rtl::getContext()->env("ROUTE_PREFIX");
		$route_prefix = \Runtime\rs::removeFirstSlash($route_prefix);
		$api_url_arr = \Runtime\Vector::from([$route_prefix,$this->kind,$service,$api_name,$method_name]);
		$api_url_arr = $api_url_arr->filter(function ($s)
		{
			return $s != "";
		});
		$api_url = "/" . \Runtime\rtl::toStr($api_url_arr->join("/")) . \Runtime\rtl::toStr("/");
		$res = new \Runtime\Web\ApiResult();
		try
		{
			
			$post_data = \Runtime\Map::from(["service"=>$service,"api_name"=>$api_name,"method_name"=>$method_name,"data"=>$data]);
			/* Call api before hook */
			$d = \Runtime\rtl::getContext()->callHook(\Runtime\Web\Hooks\AppHook::CALL_API_BEFORE, \Runtime\Map::from(["api_url"=>$api_url,"post_data"=>$post_data,"params"=>$params]));
			$api_url = $d->get("api_url");
			$post_data = $d->get("post_data");
			/* Send curl */
			$curl = new \Runtime\Curl($api_url, \Runtime\Map::from(["post"=>$post_data]));
			$response = $curl->send();
			/* Get answer */
			$answer = \Runtime\rtl::json_decode($response, \Runtime\rtl::ALLOW_OBJECTS);
			if ($answer && $answer instanceof \Runtime\Dict)
			{
				$res->importContent($answer);
			}
			else
			{
				$res->exception(new \Runtime\Exceptions\AbstractException("Api response error"));
			}
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \Runtime\Exceptions\CurlException)
			{
				$e = $_ex;
				$res->exception($e);
				$res->ob_content = $e->http_content;
				if (\Runtime\rtl::getContext()->env("DEBUG"))
				{
					\Runtime\io::print_error($e->http_content);
				}
			}
			else if (true)
			{
				$e = $_ex;
				throw $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->kind = "api";
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.BusHttp";
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