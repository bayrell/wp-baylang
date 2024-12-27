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
namespace BayLang\LangBay;
class ParserBayProgram
{
	/**
	 * Read namespace
	 */
	static function readNamespace($parser)
	{
		$token = null;
		$name = null;
		$res = $parser->parser_base::matchToken($parser, "namespace");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::readEntityName($parser, false);
		$parser = \Runtime\rtl::attr($res, 0);
		$name = \Runtime\rtl::attr($res, 1);
		$current_namespace_name = \Runtime\rs::join(".", $name->names);
		$current_namespace = new \BayLang\OpCodes\OpNamespace(\Runtime\Map::from(["name"=>$current_namespace_name,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
		$parser = \Runtime\rtl::setAttr($parser, ["current_namespace"], $current_namespace);
		$parser = \Runtime\rtl::setAttr($parser, ["current_namespace_name"], $current_namespace_name);
		return \Runtime\Vector::from([$parser,$current_namespace]);
	}
	/**
	 * Read use
	 */
	static function readUse($parser)
	{
		$look = null;
		$token = null;
		$name = null;
		$alias = "";
		$res = $parser->parser_base::matchToken($parser, "use");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::readEntityName($parser, false);
		$parser = \Runtime\rtl::attr($res, 0);
		$name = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "as")
		{
			$parser_value = null;
			$parser = $look;
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			$alias = $parser_value->value;
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpUse(\Runtime\Map::from(["name"=>\Runtime\rs::join(".", $name->names),"alias"=>$alias,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read class body
	 */
	static function readClassBody($parser, $end_tag="}")
	{
		$look = null;
		$token = null;
		$items = new \Runtime\Vector();
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		while (!$token->eof && $token->content != $end_tag)
		{
			$item = null;
			if ($token->content == "/")
			{
				$res = $parser->parser_base::readComment($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				if ($item != null)
				{
					$items->push($item);
				}
			}
			else if ($token->content == "@")
			{
				$res = $parser->parser_operator::readAnnotation($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				$items->push($item);
			}
			else if ($token->content == "#switch" || $token->content == "#ifcode")
			{
				$res = $parser->parser_preprocessor::readPreprocessor($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				if ($item != null)
				{
					$items->push($item);
				}
			}
			else if ($token->content == "#ifdef")
			{
				$res = $parser->parser_preprocessor::readPreprocessorIfDef($parser, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_CLASS_BODY);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				if ($item != null)
				{
					$items->push($item);
				}
			}
			else if ($token->content == "<")
			{
				break;
			}
			else
			{
				$flags = null;
				$res = $parser->parser_operator::readFlags($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$flags = \Runtime\rtl::attr($res, 1);
				if ($parser->parser_operator::tryReadFunction($parser, true, $flags))
				{
					$res = $parser->parser_operator::readDeclareFunction($parser, true);
					$parser = \Runtime\rtl::attr($res, 0);
					$item = \Runtime\rtl::attr($res, 1);
					if ($item->expression != null)
					{
						if (!$item->is_html)
						{
							$res = $parser->parser_base::matchToken($parser, ";");
							$parser = \Runtime\rtl::attr($res, 0);
						}
						else
						{
							$res = $parser->parser_base::readToken($parser);
							$look = \Runtime\rtl::attr($res, 0);
							$token = \Runtime\rtl::attr($res, 1);
							if ($token->content == ";")
							{
								$parser = $look;
							}
						}
					}
				}
				else
				{
					$res = $parser->parser_operator::readAssign($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$item = \Runtime\rtl::attr($res, 1);
					$res = $parser->parser_base::matchToken($parser, ";");
					$parser = \Runtime\rtl::attr($res, 0);
				}
				$item = \Runtime\rtl::setAttr($item, ["flags"], $flags);
				if ($item != null)
				{
					$items->push($item);
				}
			}
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		}
		return \Runtime\Vector::from([$parser,$items]);
	}
	/**
	 * Class body analyze
	 */
	static function classBodyAnalyze($parser, $arr)
	{
		$names = new \Runtime\Map();
		$vars = new \Runtime\Vector();
		$functions = new \Runtime\Vector();
		$items = new \Runtime\Vector();
		$annotations = new \Runtime\Vector();
		$comments = new \Runtime\Vector();
		$fn_create = null;
		$fn_destroy = null;
		for ($i = 0; $i < $arr->count(); $i++)
		{
			$item = $arr->item($i);
			if ($item instanceof \BayLang\OpCodes\OpAnnotation)
			{
				$annotations->push($item);
			}
			else if ($item instanceof \BayLang\OpCodes\OpComment)
			{
				$comments->push($item);
			}
			else if ($item instanceof \BayLang\OpCodes\OpAssign)
			{
				for ($j = 0; $j < $item->values->count(); $j++)
				{
					$assign_value = $item->values->item($j);
					$value_name = $assign_value->var_name;
					if ($names->has($value_name))
					{
						throw new \BayLang\Exceptions\ParserError("Dublicate identifier " . \Runtime\rtl::toStr($value_name), $assign_value->caret_start, $parser->file_name);
					}
					$names->set($value_name, true);
				}
				$item = $item->copy(\Runtime\Map::from(["annotations"=>$annotations->slice(),"comments"=>$comments->slice()]));
				$vars->push($item);
				$annotations->clear();
				$comments->clear();
			}
			else if ($item instanceof \BayLang\OpCodes\OpDeclareFunction)
			{
				$item = $item->copy(\Runtime\Map::from(["annotations"=>$annotations->slice(),"comments"=>$comments->slice()]));
				if ($names->has($item->name))
				{
					throw new \BayLang\Exceptions\ParserError("Dublicate identifier " . \Runtime\rtl::toStr($item->name), $item->caret_start, $parser->file_name);
				}
				$names->set($item->name, true);
				if ($item->name == "constructor")
				{
					$fn_create = $item;
				}
				else if ($item->name == "destructor")
				{
					$fn_destroy = $item;
				}
				else
				{
					$functions->push($item);
				}
				$annotations->clear();
				$comments->clear();
			}
			else if ($item instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
			{
				$d = static::classBodyAnalyze($parser, $item->items);
				$d_vars = \Runtime\rtl::attr($d, "vars");
				$d_vars = $d_vars->map(function ($v) use (&$item)
				{
					$v = \Runtime\rtl::setAttr($v, ["condition"], $item->condition);
					return $v;
				});
				$vars->appendItems($d_vars);
			}
			else
			{
				$items->push($item);
			}
		}
		$items->appendItems($comments);
		return \Runtime\Map::from(["annotations"=>$annotations,"comments"=>$comments,"functions"=>$functions,"items"=>$items,"vars"=>$vars,"fn_create"=>$fn_create,"fn_destroy"=>$fn_destroy]);
	}
	/**
	 * Read class
	 */
	static function readClass($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$template = null;
		$is_abstract = false;
		$is_declare = false;
		$is_static = false;
		$is_struct = false;
		$class_kind = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		if ($token->content == "abstract")
		{
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$is_abstract = true;
		}
		if ($token->content == "declare")
		{
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$is_declare = true;
		}
		if ($token->content == "static")
		{
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$is_static = true;
		}
		if ($token->content == "class")
		{
			$res = $parser->parser_base::matchToken($parser, "class");
			$parser = \Runtime\rtl::attr($res, 0);
			$class_kind = \BayLang\OpCodes\OpDeclareClass::KIND_CLASS;
		}
		else if ($token->content == "struct")
		{
			$res = $parser->parser_base::matchToken($parser, "struct");
			$parser = \Runtime\rtl::attr($res, 0);
			$class_kind = \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT;
		}
		else if ($token->content == "interface")
		{
			$res = $parser->parser_base::matchToken($parser, "interface");
			$parser = \Runtime\rtl::attr($res, 0);
			$class_kind = \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE;
		}
		else
		{
			$res = $parser->parser_base::matchToken($parser, "class");
		}
		$res = $parser->parser_base::readIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$class_name = $op_code->value;
		/* Set class name */
		$parser = \Runtime\rtl::setAttr($parser, ["current_class_abstract"], $is_abstract);
		$parser = \Runtime\rtl::setAttr($parser, ["current_class_declare"], $is_declare);
		$parser = \Runtime\rtl::setAttr($parser, ["current_class_name"], $class_name);
		$parser = \Runtime\rtl::setAttr($parser, ["current_class_kind"], $class_kind);
		/* Register module in parser */
		$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($class_name, $parser->current_namespace_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($class_name)));
		$save_uses = $parser->uses;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "<")
		{
			$template = new \Runtime\Vector();
			$res = $parser->parser_base::matchToken($parser, "<");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			while (!$token->eof && $token->content != ">")
			{
				$parser_value = null;
				$res = $parser->parser_base::readIdentifier($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$parser_value = \Runtime\rtl::attr($res, 1);
				$template->push($parser_value);
				$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($parser_value->value, $parser_value->value));
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content != ">")
				{
					$res = $parser->parser_base::matchToken($parser, ",");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
				}
			}
			$res = $parser->parser_base::matchToken($parser, ">");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		$class_extends = null;
		$class_implements = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "extends")
		{
			$res = $parser->parser_base::readTypeIdentifier($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$class_extends = \Runtime\rtl::attr($res, 1);
		}
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "implements")
		{
			$class_implements = new \Runtime\Vector();
			$res = $parser->parser_base::readTypeIdentifier($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$class_implements->push($op_code);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			while (!$token->eof && $token->content == ",")
			{
				$parser = $look;
				$res = $parser->parser_base::readTypeIdentifier($look);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$class_implements->push($op_code);
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
			}
		}
		$arr = null;
		$res = $parser->parser_base::matchToken($parser, "{");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readClassBody($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$arr = \Runtime\rtl::attr($res, 1);
		$d = static::classBodyAnalyze($parser, $arr);
		$res = $parser->parser_base::matchToken($parser, "}");
		$parser = \Runtime\rtl::attr($res, 0);
		$current_class = new \BayLang\OpCodes\OpDeclareClass(\Runtime\Map::from(["kind"=>$class_kind,"name"=>$class_name,"is_abstract"=>$is_abstract,"is_static"=>$is_static,"is_declare"=>$is_declare,"class_extends"=>$class_extends,"class_implements"=>($class_implements != null) ? ($class_implements) : (null),"template"=>($template != null) ? ($template) : (null),"vars"=>$d->item("vars"),"functions"=>$d->item("functions"),"fn_create"=>$d->item("fn_create"),"fn_destroy"=>$d->item("fn_destroy"),"items"=>$arr,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
		/* Restore uses */
		$parser = \Runtime\rtl::setAttr($parser, ["uses"], $save_uses);
		return \Runtime\Vector::from([$parser->copy(\Runtime\Map::from(["current_class"=>$current_class])),$current_class]);
	}
	/**
	 * Read program
	 */
	static function readProgram($parser, $end_tag="")
	{
		$look = null;
		$token = null;
		$op_code = null;
		$annotations = new \Runtime\Vector();
		$comments = new \Runtime\Vector();
		$items = new \Runtime\Vector();
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		if ($token->eof)
		{
			return \Runtime\Vector::from([$parser,null]);
		}
		if ($token->content == "<")
		{
			return $parser->parser_html::readUI($parser);
		}
		while (!$token->eof && ($end_tag == "" || $end_tag != "" && $token->content == $end_tag))
		{
			if ($token->content == "/")
			{
				$res = $parser->parser_base::readComment($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				if ($op_code != null)
				{
					$comments->push($op_code);
				}
			}
			else if ($token->content == "@")
			{
				$res = $parser->parser_operator::readAnnotation($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$annotations->push($op_code);
			}
			else if ($token->content == "#switch" || $token->content == "#ifcode")
			{
				/* Append comments */
				$items->appendItems($comments);
				$comments->clear();
				$res = $parser->parser_preprocessor::readPreprocessor($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				if ($op_code != null)
				{
					$items->appendItems($comments);
					$items->push($op_code);
				}
			}
			else if ($token->content == "#ifdef")
			{
				/* Append comments */
				$items->appendItems($comments);
				$comments->clear();
				$res = $parser->parser_preprocessor::readPreprocessorIfDef($parser, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_PROGRAM);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				if ($op_code != null)
				{
					$items->appendItems($comments);
					$items->push($op_code);
				}
			}
			else if ($token->content == "namespace")
			{
				/* Append comments */
				$items->appendItems($comments);
				$comments->clear();
				$res = static::readNamespace($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$items->push($op_code);
				$res = $parser->parser_base::matchToken($parser, ";");
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else if ($token->content == "use")
			{
				/* Append comments */
				$items->appendItems($comments);
				$comments->clear();
				$res = static::readUse($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$full_name = $op_code->name;
				$short_name = "";
				if ($op_code->alias == "")
				{
					$short_name = \Runtime\rs::split(".", $full_name)->last();
				}
				else
				{
					$short_name = $op_code->alias;
				}
				/* Register module in parser */
				$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($short_name, $full_name));
				$items->push($op_code);
				$res = $parser->parser_base::matchToken($parser, ";");
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else if ($token->content == "class" || $token->content == "struct" || $token->content == "static" || $token->content == "declare" || $token->content == "interface" || $token->content == "abstract")
			{
				$item = null;
				$res = static::readClass($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				$item = $item->copy(\Runtime\Map::from(["annotations"=>$annotations,"comments"=>$comments]));
				$items->push($item);
				$annotations->clear();
				$comments->clear();
			}
			else
			{
				break;
			}
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		}
		$items->appendItems($comments);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpModule(\Runtime\Map::from(["uses"=>$parser->uses->toDict(),"items"=>$items,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBayProgram";
	}
	static function getParentClassName()
	{
		return "";
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