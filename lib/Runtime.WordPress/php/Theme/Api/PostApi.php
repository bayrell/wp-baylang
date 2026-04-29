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

use Runtime\DateTime;
use Runtime\Serializer\Allowed;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\StringType;
use Runtime\ORM\Connection;
use Runtime\ORM\Cursor;
use Runtime\ORM\Query;
use Runtime\ORM\QueryField;
use Runtime\ORM\QueryFilter;
use Runtime\ORM\QueryResult;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;
use Runtime\Web\ApiRequest;
use Runtime\Web\ApiResult;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SearchApi;
use Runtime\WordPress\Database\Post;
use Runtime\WordPress\WP_Helper;


class PostApi extends \Runtime\Widget\Api\SearchApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "runtime.wordpress.post"; }
	
	
	/**
	 * Returns relation name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.Post"; }
	
	
	/**
	 * Returns data rules
	 */
	function getDataRules($rules)
	{
		parent::getDataRules($rules);
		$rules->addType("lang", new \Runtime\Serializer\StringType());
		$rules->addType("post_type", new \Runtime\Serializer\Allowed(new \Runtime\Vector("post", "page")));
		$rules->addType("post_type", new \Runtime\Serializer\StringType(new \Runtime\Map(["default" => "post"])));
		$rules->addType("post_status", new \Runtime\Serializer\Allowed(new \Runtime\Vector("publish")));
		$rules->addType("post_status", new \Runtime\Serializer\StringType(new \Runtime\Map(["default" => "publish"])));
		$rules->addType("preview", new \Runtime\Serializer\StringType());
	}
	
	
	/**
	 * Returns serialize rules for pk
	 */
	function getPrimaryRules()
	{
		return new \Runtime\Serializer\MapType(new \Runtime\Map([
			"id" => new \Runtime\Serializer\IntegerType(),
		]));
	}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"ID",
			"post_content",
			"post_title",
			"post_name",
			"post_status",
			"post_type",
			"post_date_gmt",
			"post_modified_gmt",
		);
	}
	
	
	/**
	 * Build lang
	 */
	function buildLangQuery($q)
	{
		$lang = $this->data->get("lang");
		if ($lang == "") return;
		$q_taxonomy = (new \Runtime\ORM\Query())->select(new \Runtime\Vector(
			"term_taxonomy.term_taxonomy_id",
		))->from("term_taxonomy")->innerJoin("terms", "terms.term_id = term_taxonomy.term_id")->where("term_taxonomy.taxonomy", "=", "language")->where("terms.slug", "=", $lang);
		$conn = \Runtime\ORM\Connection::get();
		$row = $conn->fetchOne($q_taxonomy);
		if (!$row) return;
		$term_taxonomy_id = $row->get("term_taxonomy_id");
		$q->innerJoin("term_relationships", "term_lang.object_id = posts.ID", "term_lang");
		$q->where("term_lang.term_taxonomy_id", "=", $term_taxonomy_id);
	}
	
	
	/**
	 * Build Query
	 */
	function buildQuery($q)
	{
		parent::buildQuery($q);
		$post_type = $this->data->get("post_type");
		$post_status = $this->data->get("post_status");
		$q->select(new \Runtime\Vector(
			"posts.ID",
			"posts.post_content",
			"posts.post_title",
			"posts.post_name",
			"posts.post_status",
			"posts.post_type",
			"posts.post_date_gmt",
			"posts.post_modified_gmt",
		))->orderBy("post_modified_gmt", "desc");
		/* Add preview */
		$preview = $this->data->get("preview") == "true" && \Runtime\WordPress\WP_Helper::isAdmin();
		if (!$preview)
		{
			$q->where("post_type", "=", $post_type);
			$q->where("post_status", "=", $post_status);
		}
		$this->buildLangQuery($q);
	}
	
	
	/**
	 * Search post
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	
	
	/**
	 * Item post
	 */
	function actionItem()
	{
		parent::actionItem();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Api.PostApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionSearch", "actionItem");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSearch") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "search"]))
		);
		if ($field_name == "actionItem") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "item"]))
		);
		return null;
	}
}