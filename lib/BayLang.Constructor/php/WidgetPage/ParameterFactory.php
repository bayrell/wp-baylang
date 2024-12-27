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
namespace BayLang\Constructor\WidgetPage;
class ParameterFactory extends \Runtime\Entity\Factory
{
	/**
	 * Copy object to runtime
	 */
	static function copy($runtime, $data)
	{
		$encoder = new \Runtime\SerializerNative();
		$decoder = $runtime::newInstance("Runtime.SerializerNative");
		$object = $encoder->encode($data);
		return $decoder->decode($object);
	}
	/**
	 * Restore object from runtime
	 */
	static function restore($runtime, $data)
	{
		$decoder = new \Runtime\SerializerNative();
		$encoder = $runtime::newInstance("Runtime.SerializerNative");
		$object = $encoder->encode($data);
		return $decoder->decode($object);
	}
	/**
	 * Factory
	 */
	function factory($runtime)
	{
		$params = static::copy($runtime, $this->params);
		return $runtime::newInstance($this->name, \Runtime\Vector::from([$params]));
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.WidgetPage";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.WidgetPage.ParameterFactory";
	}
	static function getParentClassName()
	{
		return "Runtime.Entity.Factory";
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