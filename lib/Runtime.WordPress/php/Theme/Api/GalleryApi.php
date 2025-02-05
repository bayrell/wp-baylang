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
namespace Runtime\WordPress\Theme\Api;
class GalleryApi extends \Runtime\Web\BaseApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "runtime.wordpress.gallery";
	}
	/**
	 * Action search
	 */
	function actionSearch()
	{
		$connection = \Runtime\ORM\Connection::get();
		/* Load items */
		$api_name = $this->post_data->get("api_name");
		$q = (new \Runtime\ORM\Query())->select(\Runtime\Vector::from(["gallery_item.*"]))->from("gallery_item")->innerJoin("gallery", \Runtime\Vector::from(["gallery.id = gallery_item.gallery_id"]))->where("gallery.api_name", "=", $api_name)->orderBy("pos", "desc")->orderBy("id", "asc");
		$result = $connection->fetchAll($q);
		/* Load images */
		$images_id = $result->map(function ($item)
		{
			return $item->get("image_id");
		});
		$images = \Runtime\WordPress\WP_Helper::loadImages($connection, $images_id);
		/* Build items */
		$items = $result->map(function ($item) use (&$images)
		{
			$image_id = $item->get("image_id");
			return \Runtime\Map::from(["id"=>$item->get("id"),"image_id"=>$image_id,"image"=>$images->get($image_id),"name"=>$item->get("name")]);
		});
		/* Return result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["items"=>$items])]));
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Api";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Api.GalleryApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApi";
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
			"actionSearch",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSearch")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}