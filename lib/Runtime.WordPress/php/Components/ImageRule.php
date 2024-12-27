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
namespace Runtime\WordPress\Components;
class ImageRule extends \Runtime\Widget\Crud\Rules\CrudRule
{
	public $__name;
	public $__key;
	public $__db_prefix;
	public $__table_prefix;
	/**
	 * Search after
	 */
	function onSearchAfter($api)
	{
		$action = $api->action;
		$items = $api->items;
		/* Get primary keys */
		$pk_ids = $items->map(\Runtime\lib::attr($this->key))->filter(\Runtime\lib::equalNot(null));
		/* Get connection */
		$conn = \Runtime\ORM\Connection::get($this->db_prefix);
		/* Get images metadata */
		$q = (new \Runtime\ORM\Query())->select($this->table_prefix . \Runtime\rtl::toStr("postmeta"))->addRawField("*")->where("meta_key", "=", \Runtime\Vector::from(["_wp_attachment_metadata","_wp_attached_file"]))->where("post_id", "=", $pk_ids);
		$images_metadata = $conn->fetchAll($q);
		/* Get post */
		$q = (new \Runtime\ORM\Query())->select($this->table_prefix . \Runtime\rtl::toStr("posts"))->addRawField("*")->where("ID", "=", $pk_ids);
		$posts = $conn->fetchAll($q);
		/* Upload dir */
		$upload_url = "/wp-content/uploads";
		/* Map items */
		$items = $items->map(function ($item) use (&$images_metadata,&$posts,&$upload_url)
		{
			$image_id = $item->get($this->key);
			/* Get post */
			$post_time = "";
			$post = $posts->findItem(\Runtime\lib::equalAttr("ID", $image_id));
			if ($post)
			{
				$d = \Runtime\DateTime::fromString(\Runtime\rtl::attr($post, "post_modified_gmt"));
				$post_time = $d->timestamp();
			}
			$res = null;
			$obj_file = $images_metadata->findItem(function ($item) use (&$image_id)
			{
				return \Runtime\rtl::attr($item, "meta_key") == "_wp_attached_file" && \Runtime\rtl::attr($item, "post_id") == $image_id;
			});
			$obj_metadata = $images_metadata->findItem(function ($item) use (&$image_id)
			{
				return \Runtime\rtl::attr($item, "meta_key") == "_wp_attachment_metadata" && \Runtime\rtl::attr($item, "post_id") == $image_id;
			});
			if ($obj_file && $obj_metadata)
			{
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
						$res = \Runtime\Dict::from([
							"id" => $image_id,
							"width" => $obj_metadata["width"],
							"height" => $obj_metadata["height"],
							"file" => $image_dir_name . "/" .
								basename($obj_metadata["file"]) . $image_url_after,
							"sizes" => $sizes,
						]);
					}
			}
			$item->set($this->name, $res);
			return $item;
		});
		/* Set api items */
		$api->items = $items;
	}
	/**
	 * Save after
	 */
	function onSaveAfter($container)
	{
		static::onSearchAfter($container);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__key = "";
		$this->__db_prefix = "prefix";
		$this->__table_prefix = "";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "key")return $this->__key;
		else if ($k == "db_prefix")return $this->__db_prefix;
		else if ($k == "table_prefix")return $this->__table_prefix;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Components";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Components.ImageRule";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
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
		$a[]="name";
		$a[]="key";
		$a[]="db_prefix";
		$a[]="table_prefix";
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