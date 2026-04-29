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
namespace Runtime\WordPress\Admin\Gallery;

use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SearchApi;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\WordPress\Database\Gallery;


class GallerySearchApi extends \Runtime\Widget\Api\SearchApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.gallery"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.Gallery"; }
	
	
	/**
	 * Returns middleware
	 */
	function getMiddleware()
	{
		return new \Runtime\Vector(
			new \Runtime\WordPress\Admin\AdminMiddleware(),
		);
	}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"api_name",
		);
	}
	
	
	/**
	 * Returns image sizes
	 */
	function actionImageSizes()
	{
		$image_sizes = \Runtime\Collection::from(get_intermediate_image_sizes());
		$this->success(new \Runtime\Map([
			"data" => new \Runtime\Map([
				"items" => $image_sizes,
			]),
		]));
	}
	
	
	/**
	 * Action search
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Gallery.GallerySearchApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionImageSizes", "actionSearch");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionImageSizes") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "image_sizes"]))
		);
		if ($field_name == "actionSearch") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "search"]))
		);
		return null;
	}
}