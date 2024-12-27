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
namespace BayLang;
class CoreTranslator extends \Runtime\BaseStruct
{
	public $__current_namespace_name;
	public $__current_class_name;
	public $__current_class_full_name;
	public $__current_class_extends_name;
	public $__current_class;
	public $__current_function;
	public $__modules;
	public $__vars;
	public $__save_vars;
	public $__save_op_codes;
	public $__save_op_code_inc;
	public $__is_static_function;
	public $__is_operation;
	public $__opcode_level;
	public $__indent_level;
	public $__indent;
	public $__crlf;
	public $__flag_struct_check_types;
	public $__preprocessor_flags;
	/**
	 * Set preprocessor flag
	 */
	function setFlag($flag_name, $value)
	{
		$t = $this;
		$t = \Runtime\rtl::setAttr($t, ["preprocessor_flags", $flag_name], $value);
		return $t;
	}
	/**
	 * Find save op code
	 */
	function findSaveOpCode($op_code)
	{
		return $this->save_op_codes->findItem(\Runtime\lib::equalAttr("op_code", $op_code));
	}
	/**
	 * Increment indent level
	 */
	function levelInc()
	{
		return $this->copy(\Runtime\Map::from(["indent_level"=>$this->indent_level + 1]));
	}
	/**
	 * Decrease indent level
	 */
	function levelDec()
	{
		return $this->copy(\Runtime\Map::from(["indent_level"=>$this->indent_level - 1]));
	}
	/**
	 * Output content with indent
	 */
	function s($s, $content=null)
	{
		if ($s == "")
		{
			return "";
		}
		if ($content === "")
		{
			return $s;
		}
		return $this->crlf . \Runtime\rtl::toStr(\Runtime\rs::str_repeat($this->indent, $this->indent_level)) . \Runtime\rtl::toStr($s);
	}
	/**
	 * Output content with indent
	 */
	function s2($s)
	{
		return $this->crlf . \Runtime\rtl::toStr(\Runtime\rs::str_repeat($this->indent, $this->indent_level)) . \Runtime\rtl::toStr($s);
	}
	/**
	 * Output content with opcode level
	 */
	function o($s, $opcode_level_in, $opcode_level_out)
	{
		if ($opcode_level_in < $opcode_level_out)
		{
			return "(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(")");
		}
		return $s;
	}
	/**
	 * Translate BaseOpCode
	 */
	static function translate($t, $op_code)
	{
		return "";
	}
	/**
	 * Inc save op code
	 */
	static function nextSaveOpCode($t)
	{
		return "__v" . \Runtime\rtl::toStr($t->save_op_code_inc);
	}
	/**
	 * Inc save op code
	 */
	static function incSaveOpCode($t)
	{
		$var_name = static::nextSaveOpCode($t);
		$save_op_code_inc = $t->save_op_code_inc + 1;
		$t = $t->copy(\Runtime\Map::from(["save_op_code_inc"=>$save_op_code_inc]));
		return \Runtime\Vector::from([$t,$var_name]);
	}
	/**
	 * Add save op code
	 */
	static function addSaveOpCode($t, $data)
	{
		$var_name = $data->get("var_name", "");
		$content = $data->get("content", "");
		$var_content = $data->get("var_content", "");
		$save_op_code_inc = $t->save_op_code_inc;
		if ($var_name == "" && $content == "")
		{
			$var_name = static::nextSaveOpCode($t);
			$data = $data->setIm("var_name", $var_name);
			$save_op_code_inc += 1;
		}
		$s = new \BayLang\SaveOpCode($data);
		$t = $t->copy(\Runtime\Map::from(["save_op_codes"=>$t->save_op_codes->pushIm($s),"save_op_code_inc"=>$save_op_code_inc]));
		return \Runtime\Vector::from([$t,$var_name]);
	}
	/**
	 * Clear save op code
	 */
	static function clearSaveOpCode($t)
	{
		$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], new \Runtime\Collection());
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], 0);
		return $t;
	}
	/**
	 * Output save op code content
	 */
	static function outputSaveOpCode($t, $save_op_code_value=0)
	{
		return "";
	}
	/**
	 * Call f and return result with save op codes
	 */
	static function saveOpCodeCall($t, $f, $args)
	{
		/* Clear save op codes */
		$save_op_codes = $t->save_op_codes;
		$save_op_code_inc = $t->save_op_code_inc;
		$res = \Runtime\rtl::apply($f, $args->unshiftIm($t));
		$t = \Runtime\rtl::attr($res, 0);
		$value = \Runtime\rtl::attr($res, 1);
		/* Output save op code */
		$save = $t::outputSaveOpCode($t, $save_op_codes->count());
		/* Restore save op codes */
		$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
		return \Runtime\Vector::from([$t,$save,$value]);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__current_namespace_name = "";
		$this->__current_class_name = "";
		$this->__current_class_full_name = "";
		$this->__current_class_extends_name = "";
		$this->__current_class = null;
		$this->__current_function = null;
		$this->__modules = null;
		$this->__vars = null;
		$this->__save_vars = null;
		$this->__save_op_codes = null;
		$this->__save_op_code_inc = 0;
		$this->__is_static_function = false;
		$this->__is_operation = false;
		$this->__opcode_level = 0;
		$this->__indent_level = 0;
		$this->__indent = "\t";
		$this->__crlf = "\n";
		$this->__flag_struct_check_types = false;
		$this->__preprocessor_flags = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "current_namespace_name")return $this->__current_namespace_name;
		else if ($k == "current_class_name")return $this->__current_class_name;
		else if ($k == "current_class_full_name")return $this->__current_class_full_name;
		else if ($k == "current_class_extends_name")return $this->__current_class_extends_name;
		else if ($k == "current_class")return $this->__current_class;
		else if ($k == "current_function")return $this->__current_function;
		else if ($k == "modules")return $this->__modules;
		else if ($k == "vars")return $this->__vars;
		else if ($k == "save_vars")return $this->__save_vars;
		else if ($k == "save_op_codes")return $this->__save_op_codes;
		else if ($k == "save_op_code_inc")return $this->__save_op_code_inc;
		else if ($k == "is_static_function")return $this->__is_static_function;
		else if ($k == "is_operation")return $this->__is_operation;
		else if ($k == "opcode_level")return $this->__opcode_level;
		else if ($k == "indent_level")return $this->__indent_level;
		else if ($k == "indent")return $this->__indent;
		else if ($k == "crlf")return $this->__crlf;
		else if ($k == "flag_struct_check_types")return $this->__flag_struct_check_types;
		else if ($k == "preprocessor_flags")return $this->__preprocessor_flags;
	}
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.CoreTranslator";
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
		$a[]="current_namespace_name";
		$a[]="current_class_name";
		$a[]="current_class_full_name";
		$a[]="current_class_extends_name";
		$a[]="current_class";
		$a[]="current_function";
		$a[]="modules";
		$a[]="vars";
		$a[]="save_vars";
		$a[]="save_op_codes";
		$a[]="save_op_code_inc";
		$a[]="is_static_function";
		$a[]="is_operation";
		$a[]="opcode_level";
		$a[]="indent_level";
		$a[]="indent";
		$a[]="crlf";
		$a[]="flag_struct_check_types";
		$a[]="preprocessor_flags";
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