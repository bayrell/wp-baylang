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
class ApiResult extends \Runtime\BaseObject
{
	public $code;
	public $message;
	public $data;
	public $api_name;
	public $method_name;
	public $ob_content;
	public $error_name;
	public $error_file;
	public $error_line;
	public $error_pos;
	public $error_trace;
	public $is_exception;
	public $cookies;
	/**
	 * Returns true if error
	 */
	function isError()
	{
		return $this->code < 0;
	}
	/**
	 * Returns true if is exception
	 */
	function isException()
	{
		return $this->is_exception;
	}
	/**
	 * Returns true if success
	 */
	function isSuccess()
	{
		return $this->code > 0;
	}
	/**
	 * Get error message
	 */
	function getErrorMessage()
	{
		return $this->message;
	}
	/**
	 * Get error code
	 */
	function getErrorCode()
	{
		return $this->code;
	}
	/**
	 * Returns content
	 */
	function getContent()
	{
		$res = \Runtime\Map::from(["api_name"=>$this->api_name,"method_name"=>$this->method_name,"code"=>$this->code,"message"=>$this->message,"data"=>$this->data]);
		if ($this->error_name != "")
		{
			$res->set("error_name", $this->error_name);
		}
		if ($this->error_file != "")
		{
			$res->set("error_file", $this->error_file);
		}
		if ($this->error_line != "")
		{
			$res->set("error_line", $this->error_line);
		}
		if ($this->error_pos != "")
		{
			$res->set("error_pos", $this->error_pos);
		}
		if ($this->error_trace != "")
		{
			$res->set("error_trace", $this->error_trace);
		}
		return $res;
	}
	/**
	 * Import content
	 */
	function importContent($content)
	{
		$this->api_name = $content->get("api_name", "");
		$this->method_name = $content->get("method_name", "");
		$this->data = $content->get("data", null);
		$this->code = $content->get("code", -1);
		$this->message = $content->get("message", "Unknown error");
		$this->ob_content = $content->get("ob_content", "");
		$this->error_name = $content->get("error_name", "");
		$this->error_file = $content->get("error_file", "");
		$this->error_line = $content->get("error_line", "");
		$this->error_pos = $content->get("error_pos", "");
	}
	/**
	 * Set data
	 */
	function setData($data)
	{
		if ($data == null)
		{
			return ;
		}
		if ($data instanceof \Runtime\Dict)
		{
			$keys = $data->keys();
			for ($i = 0; $i < $keys->count(); $i++)
			{
				$key = $keys->get($i);
				$this->data->set($key, $data->get($key));
			}
		}
		else
		{
			$this->data = $data;
		}
	}
	/**
	 * Setup success
	 */
	function success($data=null)
	{
		$this->code = \Runtime\rtl::ERROR_OK;
		$this->message = "Ok";
		if (!$data)
		{
			return ;
		}
		/* Set code */
		if ($data->has("code"))
		{
			$this->code = \Runtime\rtl::attr($data, "code");
		}
		else
		{
			$this->code = \Runtime\rtl::ERROR_OK;
		}
		/* Set message */
		if ($data->has("message"))
		{
			$this->message = \Runtime\rtl::attr($data, "message");
		}
		else
		{
			$this->message = "Ok";
		}
		/* Set data */
		if ($data->has("data"))
		{
			$this->setData(\Runtime\rtl::attr($data, "data"));
		}
	}
	/**
	 * Setup exception
	 */
	function exception($e)
	{
		$this->code = $e->getErrorCode();
		$this->message = $e->getErrorMessage();
		$this->error_name = $e::getClassName();
		$this->error_file = $e->getFileName();
		$this->error_line = $e->getErrorLine();
		$this->error_pos = $e->getErrorPos();
		if (\Runtime\rtl::getContext()->env("DEBUG"))
		{
			$this->error_trace = $e->getTraceCollection();
		}
		$this->is_exception = true;
	}
	/**
	 * Setup fail
	 */
	function fail($data=null)
	{
		$this->code = \Runtime\rtl::ERROR_UNKNOWN;
		$this->message = "Unknown error";
		if ($data instanceof \Runtime\Exceptions\AbstractException)
		{
			$this->code = $data->getErrorCode();
			$this->message = $data->getErrorMessage();
			$this->error_name = $data::getClassName();
		}
		else if ($data instanceof \Runtime\Dict)
		{
			/* Set code */
			if ($data->has("code"))
			{
				$this->code = \Runtime\rtl::attr($data, "code");
			}
			else
			{
				$this->code = \Runtime\rtl::ERROR_UNKNOWN;
			}
			/* Set message */
			if ($data->has("message"))
			{
				$this->message = \Runtime\rtl::attr($data, "message");
			}
			else
			{
				$this->message = "Error";
			}
			/* Set data */
			if ($data->has("data"))
			{
				$this->setData(\Runtime\rtl::attr($data, "data"));
			}
		}
		else
		{
			$this->code = \Runtime\rtl::ERROR_UNKNOWN;
			$this->message = "Error";
		}
	}
	/**
	 * Add cookie
	 */
	function addCookie($cookie)
	{
		$this->cookies->set($cookie->name, $cookie);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->code = 0;
		$this->message = "";
		$this->data = \Runtime\Map::from([]);
		$this->api_name = "";
		$this->method_name = "";
		$this->ob_content = "";
		$this->error_name = null;
		$this->error_file = "";
		$this->error_line = "";
		$this->error_pos = 0;
		$this->error_trace = null;
		$this->is_exception = false;
		$this->cookies = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Web";
	}
	static function getClassName()
	{
		return "Runtime.Web.ApiResult";
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