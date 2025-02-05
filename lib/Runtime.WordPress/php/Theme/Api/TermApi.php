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
namespace Runtime\WordPress\Api;
class TermApi extends \Runtime\Widget\Crud\CrudApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "runtime.wordpress.term";
	}
	/**
	 * Returns table name
	 */
	static function getTableName()
	{
		return "terms";
	}
	/**
	 * Returns max limit
	 */
	function getMaxLimit()
	{
		return -1;
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["term_id","name","slug","taxonomy","parent_id","count"]);
	}
	/**
	 * Returns query field
	 */
	function getQueryField($field_name)
	{
		if ($field_name == "parent_id")
		{
			return new \Runtime\ORM\QueryField("term_taxonomy", "parent", $field_name);
		}
		if ($field_name == "taxonomy" || $field_name == "count")
		{
			return new \Runtime\ORM\QueryField("term_taxonomy", $field_name);
		}
		return new \Runtime\ORM\QueryField("terms", $field_name);
	}
	/**
	 * Build search query
	 */
	function buildSearchQuery($q)
	{
		$taxonomy_name = $this->post_data->get("taxonomy", "category");
		$q->where("term_taxonomy.taxonomy", "=", $taxonomy_name);
		$q->innerJoin("term_taxonomy", \Runtime\Vector::from(["term_taxonomy.term_id = terms.term_id"]));
		$q->orderBy("terms.name", "asc");
		/* Set term id */
		if ($this->post_data->has("term_id"))
		{
			$term_id = \Runtime\rtl::to($this->post_data->get("term_id"), ["e"=>"int"]);
			$q->where("terms.ID", "=", $term_id);
			$q->calcFoundRows(false);
		}
		/* Set slug */
		if ($this->post_data->has("slug"))
		{
			$slug = $this->post_data->get("slug");
			$q->where("terms.slug", "=", $slug);
		}
	}
	/**
	 * Convert item
	 */
	function convertItem($fields, $item)
	{
		$item->set("count", \Runtime\rtl::to($item->get("count"), ["e"=>"int"]));
		$item->set("parent_id", \Runtime\rtl::to($item->get("parent_id"), ["e"=>"int"]));
		$item->set("term_id", \Runtime\rtl::to($item->get("term_id"), ["e"=>"int"]));
		return parent::convertItem($fields, $item);
	}
	/**
	 * Action search
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	/**
	 * Action search one
	 */
	function actionSearchOne()
	{
		parent::actionSearchOne();
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Api";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Api.TermApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.CrudApi";
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
			"actionSearchOne",
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
		if ($field_name == "actionSearchOne")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}