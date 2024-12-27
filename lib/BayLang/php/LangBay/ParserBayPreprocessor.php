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
class ParserBayPreprocessor
{
	/**
	 * Read namespace
	 */
	static function readPreprocessor($parser)
	{
		$start = $parser;
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "#switch")
		{
			return static::readPreprocessorSwitch($start);
		}
		if ($token->content == "#ifcode")
		{
			return static::readPreprocessorIfCode($start);
		}
		return null;
	}
	/**
	 * Read preprocessor switch
	 */
	static function readPreprocessorSwitch($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$items = new \Runtime\Vector();
		/* Save vars */
		$save_vars = $parser->vars;
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->concat(\Runtime\Map::from(["ES6"=>true,"NODEJS"=>true,"JAVASCRIPT"=>true,"PHP"=>true,"PYTHON3"=>true])));
		$res = $parser->parser_base::matchToken($parser, "#switch");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while ($token->content == "#case")
		{
			$parser = $look;
			/* Skip ifcode */
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "ifcode")
			{
				$parser = $look;
			}
			/* Read condition */
			$condition = null;
			$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$condition = \Runtime\rtl::attr($res, 1);
			$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], true);
			/* Read then */
			$res = $parser->parser_base::matchToken($parser, "then");
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			/* Read content */
			$content = "";
			$caret_content = $parser->caret;
			$res = $parser->parser_base::readUntilStringArr($parser, \Runtime\Vector::from(["#case","#endswitch"]), false);
			$parser = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
			/* Look content */
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$ifcode = new \BayLang\OpCodes\OpPreprocessorIfCode(\Runtime\Map::from(["condition"=>$condition,"content"=>$content,"caret_start"=>$caret_content,"caret_end"=>$parser->caret]));
			$items->push($ifcode);
		}
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		/* read endswitch */
		$res = $parser->parser_base::matchToken($parser, "#endswitch");
		$parser = \Runtime\rtl::attr($res, 0);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpPreprocessorSwitch(\Runtime\Map::from(["items"=>$items,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read preprocessor ifcode
	 */
	static function readPreprocessorIfCode($parser)
	{
		$look = null;
		$token = null;
		$caret_start = $parser->caret;
		$res = $parser->parser_base::matchToken($parser, "#ifcode");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		/* Read condition */
		$condition = null;
		$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$condition = \Runtime\rtl::attr($res, 1);
		$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], true);
		/* Read then */
		$res = $parser->parser_base::matchToken($parser, "then");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		/* Read content */
		$content = "";
		$caret_content = $parser->caret;
		$res = $parser->parser_base::readUntilStringArr($parser, \Runtime\Vector::from(["#endif"]), false);
		$parser = \Runtime\rtl::attr($res, 0);
		$content = \Runtime\rtl::attr($res, 1);
		/* Match endif */
		$res = $parser->parser_base::matchToken($parser, "#endif");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$ifcode = new \BayLang\OpCodes\OpPreprocessorIfCode(\Runtime\Map::from(["condition"=>$condition,"content"=>$content,"caret_start"=>$caret_content,"caret_end"=>$parser->caret]));
		return \Runtime\Vector::from([$parser,$ifcode]);
	}
	/**
	 * Read preprocessor ifdef
	 */
	static function readPreprocessorIfDef($parser, $kind="")
	{
		$items = null;
		$token = null;
		$caret_start = $parser->caret;
		$res = $parser->parser_base::matchToken($parser, "#ifdef");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		/* Read condition */
		$condition = null;
		$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$condition = \Runtime\rtl::attr($res, 1);
		$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], true);
		/* Read then */
		$res = $parser->parser_base::matchToken($parser, "then");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($kind == \BayLang\OpCodes\OpPreprocessorIfDef::KIND_PROGRAM)
		{
			$res = $parser->parser_program::readProgram($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
			$items = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		else if ($kind == \BayLang\OpCodes\OpPreprocessorIfDef::KIND_CLASS_BODY)
		{
			$res = $parser->parser_program::readClassBody($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
			$items = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
			/*list d = parser.parser_program::classBodyAnalyze(parser, items);
			items = d.item("functions");*/
		}
		else if ($kind == \BayLang\OpCodes\OpPreprocessorIfDef::KIND_OPERATOR)
		{
			$res = $parser->parser_operator::readOpItems($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
			$items = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		else if ($kind == \BayLang\OpCodes\OpPreprocessorIfDef::KIND_EXPRESSION)
		{
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$items = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "#endif");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpPreprocessorIfDef(\Runtime\Map::from(["items"=>$items,"condition"=>$condition,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBayPreprocessor";
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