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
class ApiRoute extends \Runtime\Web\BaseRoute
{
	/**
	 * Returns routes
	 */
	static function getRoutes()
	{
		return \Runtime\Vector::from([new \Runtime\Web\RouteAction(\Runtime\Map::from(["uri"=>"/api/{service}/{api_name}/{method_name}/","name"=>"runtime:web:api","action"=>"actionIndex","pos"=>1000]))]);
	}
	/**
	 * Action index
	 */
	static function actionIndex($container)
	{
		/* Call api */
		$service = \Runtime\rtl::attr($container->route->matches, "service");
		$api_name = \Runtime\rtl::attr($container->route->matches, "api_name");
		$method_name = \Runtime\rtl::attr($container->route->matches, "method_name");
		$api_result = null;
		$bus = \Runtime\rtl::getContext()->provider("Runtime.Web.BusLocal");
		try
		{
			
			$api_result = $bus->send(\Runtime\Map::from(["service"=>$service,"api_name"=>$api_name,"method_name"=>$method_name,"data"=>$container->request->payload->get("data"),"backend_storage"=>$container->layout->backend_storage,"container"=>$container]));
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \Runtime\Exceptions\AbstractException)
			{
				$e = $_ex;
				$api_result = new \Runtime\Web\ApiResult();
				$api_result->exception($e);
			}
			else
			{
				throw $_ex;
			}
		}
		/* Create response */
		$container->setResponse(new \Runtime\Web\JsonResponse($api_result->getContent()));
		/* Set cookie */
		$api_result->cookies->each(function ($cookie) use (&$container)
		{
			$container->addCookie($cookie);
		});
		/* HTTP error if exception */
		/*if (api.isException())
		{
			container.response.http_code = 500;
		}*/
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.ApiRoute";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseRoute";
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