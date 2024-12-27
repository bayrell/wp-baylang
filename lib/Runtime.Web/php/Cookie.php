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
class Cookie extends \Runtime\BaseStruct
{
	public $__name;
	public $__value;
	public $__expires;
	public $__domain;
	public $__path;
	public $__samesite;
	public $__secure;
	public $__httponly;
	public $__changed;
	function getOptions()
	{
		$res = new \Runtime\Map();
		if ($this->expires)
		{
			$res->set("expires", $this->expires);
		}
		if ($this->domain)
		{
			$res->set("domain", $this->domain);
		}
		if ($this->path)
		{
			$res->set("path", $this->path);
		}
		if ($this->secure)
		{
			$res->set("secure", $this->secure);
		}
		if ($this->httponly)
		{
			$res->set("httponly", $this->httponly);
		}
		if ($this->samesite)
		{
			$res->set("samesite", $this->samesite);
		}
		return $res->toDict();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__value = "";
		$this->__expires = null;
		$this->__domain = "";
		$this->__path = "/";
		$this->__samesite = "Lax";
		$this->__secure = false;
		$this->__httponly = false;
		$this->__changed = false;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "value")return $this->__value;
		else if ($k == "expires")return $this->__expires;
		else if ($k == "domain")return $this->__domain;
		else if ($k == "path")return $this->__path;
		else if ($k == "samesite")return $this->__samesite;
		else if ($k == "secure")return $this->__secure;
		else if ($k == "httponly")return $this->__httponly;
		else if ($k == "changed")return $this->__changed;
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.Cookie";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseStruct";
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
		$a[]="value";
		$a[]="expires";
		$a[]="domain";
		$a[]="path";
		$a[]="samesite";
		$a[]="secure";
		$a[]="httponly";
		$a[]="changed";
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