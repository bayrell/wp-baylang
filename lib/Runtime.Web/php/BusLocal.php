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
class BusLocal extends \Runtime\BaseProvider implements \Runtime\Web\BusInterface
{
	public $api_list;
	/**
	 * Init providers
	 */
	function init()
	{
		parent::init();
		$this->api_list = \Runtime\Map::from([]);
		$api_list = \Runtime\rtl::getContext()->getEntities("Runtime.Web.Annotations.Api");
		for ($i = 0; $i < $api_list->count(); $i++)
		{
			$api = $api_list->get($i);
			$class_name = $api->name;
			$getApiName = new \Runtime\Callback($class_name, "getApiName");
			/* Save api */
			$api_name = \Runtime\rtl::apply($getApiName);
			$this->api_list->set($api_name, $api);
		}
	}
	/**
	 * Send api to frontend
	 */
	function send($params)
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "api_name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$api_name = $__v0->value();
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "method_name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$method_name = $__v0->value();
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "service"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", "app"));
		$service = $__v0->value();
		if ($service != "app")
		{
			$result = new \Runtime\Web\ApiResult();
			return $result->fail(\Runtime\Map::from(["message"=>"Service must be app"]));
		}
		/* Call local api */
		try
		{
			
			$annotation = $this->findApi($params);
			$result = $this->callAnnotation($annotation, $params);
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \Runtime\Exceptions\ApiError)
			{
				$e = $_ex;
				$result = new \Runtime\Web\ApiResult();
				$result->fail($e->getPreviousException());
			}
			else
			{
				throw $_ex;
			}
		}
		/* Set api name */
		$result->api_name = $api_name;
		$result->method_name = $method_name;
		return $result;
	}
	/**
	 * Find local api
	 */
	function findApi($params)
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "api_name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$api_name = $__v0->value();
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "method_name"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$method_name = $__v0->value();
		/* Get annotation by api name */
		$annotation = $this->api_list->get($api_name);
		/* Annotation not found */
		if ($annotation == null)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($api_name, "Api annotation"));
		}
		/* Find method */
		$getMethodInfoByName = new \Runtime\Callback($annotation->name, "getMethodInfoByName");
		$method_info = $getMethodInfoByName->apply(\Runtime\Vector::from([$method_name]));
		/* Method not found */
		if ($method_info == null)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($method_name . \Runtime\rtl::toStr(" in ") . \Runtime\rtl::toStr($api_name), "Api method"));
		}
		/* Check if method is api */
		$api_method = $method_info->get("annotations")->findItem(\Runtime\lib::isInstance("Runtime.Web.Annotations.ApiMethod"));
		if ($api_method == null)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($method_name . \Runtime\rtl::toStr(" in ") . \Runtime\rtl::toStr($api_name), "Api method"));
		}
		/* Set props */
		$result = \Runtime\Map::from(["api_method"=>$api_method,"api_name"=>$api_name,"class_name"=>$annotation->name,"method_info"=>$method_info,"method_name"=>$method_name]);
		return $result;
	}
	/**
	 * Call annotation
	 */
	function callAnnotation($annotation, $params)
	{
		$__v0 = new \Runtime\Monad(\Runtime\rtl::attr($params, "data"));
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("Runtime.Dict", null));
		$data = $__v0->value();
		$class_name = $annotation->get("class_name");
		$method_name = $annotation->get("method_name");
		$api_instance = null;
		$callback = null;
		/* Create api instance */
		$api_instance = \Runtime\rtl::newInstance($class_name);
		$api_instance->action = $method_name;
		$api_instance->backend_storage = \Runtime\rtl::attr($params, "backend_storage");
		$api_instance->post_data = $data;
		$api_instance->result = new \Runtime\Web\ApiResult();
		$api_instance->init();
		/* Get callback */
		if (\Runtime\rtl::method_exists($class_name, $method_name))
		{
			$callback = new \Runtime\Callback($class_name, $method_name);
		}
		else
		{
			$callback = new \Runtime\Callback($api_instance, $method_name);
		}
		/* Call api */
		try
		{
			
			$api_instance->onActionBefore();
			$callback->apply(\Runtime\Vector::from([$api_instance]));
			$api_instance->onActionAfter();
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \Runtime\Exceptions\ApiError)
			{
				$e = $_ex;
				$api_instance->result->fail($e->getPreviousException());
			}
			else
			{
				throw $_ex;
			}
		}
		/* Return api result */
		return $api_instance->result;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->api_list = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.BusLocal";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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