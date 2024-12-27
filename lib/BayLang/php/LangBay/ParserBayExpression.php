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
class ParserBayExpression
{
	/**
	 * Read negative
	 */
	static function readNegative($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		if ($token->content == "-")
		{
			$op_code = null;
			$res = $parser->parser_base::readDynamic($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpNegative(\Runtime\Map::from(["value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
		}
		return $parser->parser_base::readDynamic($parser);
	}
	/**
	 * Read bit not
	 */
	static function readBitNot($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		if ($token->content == "!")
		{
			$op_code = null;
			$res = static::readNegative($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"math"=>"!","caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
		}
		return static::readNegative($parser);
	}
	/**
	 * Read bit shift
	 */
	static function readBitShift($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readBitNot($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($token->content == ">>" || $token->content == "<<"))
		{
			$math = $token->content;
			$res = static::readBitNot($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read bit and
	 */
	static function readBitAnd($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readBitShift($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content == "&")
		{
			$math = $token->content;
			$res = static::readBitShift($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read bit or
	 */
	static function readBitOr($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readBitAnd($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($token->content == "|" || $token->content == "xor"))
		{
			$math = $token->content;
			$res = static::readBitAnd($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read factor
	 */
	static function readFactor($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readBitOr($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($token->content == "*" || $token->content == "/" || $token->content == "%" || $token->content == "div" || $token->content == "mod"))
		{
			$math = $token->content;
			$res = static::readBitOr($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read arithmetic
	 */
	static function readArithmetic($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readFactor($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($token->content == "+" || $token->content == "-"))
		{
			$math = $token->content;
			$res = static::readFactor($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read concat
	 */
	static function readConcat($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readArithmetic($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content == "~")
		{
			$math = $token->content;
			$res = static::readArithmetic($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read compare
	 */
	static function readCompare($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readConcat($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$content = $token->content;
		if ($content == "===" || $content == "!==" || $content == "==" || $content == "!=" || $content == ">=" || $content == "<=" || $content == ">" || $content == "<")
		{
			$math = $token->content;
			$res = static::readConcat($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
			$parser = $look;
		}
		else if ($content == "is" || $content == "implements" || $content == "instanceof")
		{
			$math = $token->content;
			$res = $parser->parser_base::readTypeIdentifier($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>$math,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
			$parser = $look;
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read not
	 */
	static function readNot($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		if ($token->content == "not")
		{
			$op_code = null;
			$start = $parser;
			$res = static::readCompare($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"math"=>"not","caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
		}
		return static::readCompare($parser);
	}
	/**
	 * Read and
	 */
	static function readAnd($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readNot($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($token->content == "and" || $token->content == "&&"))
		{
			$math = $token->content;
			$res = static::readNot($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>"and","caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read or
	 */
	static function readOr($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$look_value = null;
		$res = static::readAnd($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$math = "";
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($token->content == "or" || $token->content == "||"))
		{
			$math = $token->content;
			$res = static::readAnd($look);
			$look = \Runtime\rtl::attr($res, 0);
			$look_value = \Runtime\rtl::attr($res, 1);
			$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["value1"=>$op_code,"value2"=>$look_value,"math"=>"or","caret_start"=>$caret_start,"caret_end"=>$look->caret]));
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read element
	 */
	static function readElement($parser)
	{
		/* Try to read function */
		if ($parser->parser_operator::tryReadFunction($parser, false))
		{
			return $parser->parser_operator::readDeclareFunction($parser, false);
		}
		return static::readOr($parser);
	}
	/**
	 * Read ternary operation
	 */
	static function readTernary($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$condition = null;
		$if_true = null;
		$if_false = null;
		$res = static::readElement($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "?")
		{
			$condition = $op_code;
			$res = static::readExpression($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$if_true = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == ":")
			{
				$res = static::readExpression($look);
				$parser = \Runtime\rtl::attr($res, 0);
				$if_false = \Runtime\rtl::attr($res, 1);
			}
			$op_code = new \BayLang\OpCodes\OpTernary(\Runtime\Map::from(["condition"=>$condition,"if_true"=>$if_true,"if_false"=>$if_false,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read pipe
	 */
	static function ExpressionPipe($parser)
	{
		$look = null;
		$look_token = null;
		$op_code = null;
		$is_next_attr = false;
		$save_is_pipe = $parser->is_pipe;
		$parser = \Runtime\rtl::setAttr($parser, ["is_pipe"], false);
		$res = static::readTernary($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$parser = \Runtime\rtl::setAttr($parser, ["is_pipe"], $save_is_pipe);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$look_token = \Runtime\rtl::attr($res, 1);
		if ($look_token->content == "|>")
		{
			while ($look_token->content == "|>" || $look_token->content == ",")
			{
				$parser = $look;
				$value = null;
				$kind = "";
				$is_async = false;
				$is_monad = false;
				if ($look_token->content == ",")
				{
					$is_next_attr = true;
				}
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$look_token = \Runtime\rtl::attr($res, 1);
				if ($look_token->content == "await")
				{
					$is_async = true;
					$parser = $look;
					$res = $parser->parser_base::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$look_token = \Runtime\rtl::attr($res, 1);
				}
				if ($look_token->content == "monad")
				{
					$is_monad = true;
					$parser = $look;
					$res = $parser->parser_base::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$look_token = \Runtime\rtl::attr($res, 1);
				}
				if ($look_token->content == "attr")
				{
					$parser = $look;
					$res = static::readTernary($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$value = \Runtime\rtl::attr($res, 1);
					$kind = \BayLang\OpCodes\OpPipe::KIND_ATTR;
				}
				else if ($look_token->content == "\"" || $look_token->content == "'")
				{
					$res = static::readTernary($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$value = \Runtime\rtl::attr($res, 1);
					$kind = \BayLang\OpCodes\OpPipe::KIND_ATTR;
				}
				else if ($look_token->content == "{")
				{
					$parser = $look;
					$res = static::readTernary($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$value = \Runtime\rtl::attr($res, 1);
					$kind = \BayLang\OpCodes\OpPipe::KIND_ATTR;
					$res = $parser->parser_base::matchToken($parser, "}");
					$parser = \Runtime\rtl::attr($res, 0);
				}
				else if ($is_next_attr)
				{
					throw new \BayLang\Exceptions\ParserExpected("|>", $parser->caret, $parser->file_name);
				}
				else if ($look_token->content == "default")
				{
					$kind = \BayLang\OpCodes\OpPipe::KIND_CALL;
					$is_monad = true;
					try
					{
						
						$res = $parser->parser_base::readIdentifier($look);
						$parser = \Runtime\rtl::attr($res, 0);
						$arg1 = \Runtime\rtl::attr($res, 1);
						$res = static::readTernary($parser);
						$parser = \Runtime\rtl::attr($res, 0);
						$arg2 = \Runtime\rtl::attr($res, 1);
						$arg1 = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$parser::findModuleName($parser, $arg1->value),"caret_start"=>$arg1->caret_start,"caret_end"=>$arg1->caret_end]));
						$value = new \BayLang\OpCodes\OpCall(\Runtime\Map::from(["args"=>\Runtime\Vector::from([$arg1,$arg2]),"obj"=>new \BayLang\OpCodes\OpAttr(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpAttr::KIND_STATIC,"obj"=>new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE,"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"value"=>"rtl"])),"value"=>new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"value"=>"m_to"])),"caret_start"=>$caret_start,"caret_end"=>$parser->caret])),"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
					}
					catch (\Exception $_ex)
					{
						if ($_ex instanceof \BayLang\Exceptions\ParserError)
						{
							$err = $_ex;
							$value = null;
						}
						else
						{
							throw $_ex;
						}
					}
					if ($value == null)
					{
						$res = static::readTernary($look);
						$parser = \Runtime\rtl::attr($res, 0);
						$arg2 = \Runtime\rtl::attr($res, 1);
						$value = new \BayLang\OpCodes\OpCall(\Runtime\Map::from(["args"=>\Runtime\Vector::from([$arg2]),"obj"=>new \BayLang\OpCodes\OpAttr(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpAttr::KIND_STATIC,"obj"=>new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE,"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"value"=>"rtl"])),"value"=>new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"value"=>"m_def"])),"caret_start"=>$caret_start,"caret_end"=>$parser->caret])),"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
					}
				}
				else if ($look_token->content == "method" || $look_token->content == "." || $look_token->content == ":" || $look_token->content == "::")
				{
					$parser = $look;
					$kind = \BayLang\OpCodes\OpPipe::KIND_CALL;
					/* Set pipe */
					$save_find_ident = $parser->find_ident;
					$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
					$parser = \Runtime\rtl::setAttr($parser, ["is_pipe"], true);
					if ($look_token->content == ".")
					{
						$kind = \BayLang\OpCodes\OpPipe::KIND_METHOD;
						$parser = \Runtime\rtl::setAttr($parser, ["pipe_kind"], \BayLang\OpCodes\OpAttr::KIND_ATTR);
					}
					else
					{
						$parser = \Runtime\rtl::setAttr($parser, ["pipe_kind"], \BayLang\OpCodes\OpAttr::KIND_STATIC);
					}
					$res = $parser->parser_base::readDynamic($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$value = \Runtime\rtl::attr($res, 1);
					/* Restore parser */
					$parser = \Runtime\rtl::setAttr($parser, ["is_pipe"], false);
					$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], $save_find_ident);
				}
				else if ($look_token->content == "curry")
				{
					$kind = \BayLang\OpCodes\OpPipe::KIND_CALL;
					$res = $parser->parser_base::readCurry($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$value = \Runtime\rtl::attr($res, 1);
				}
				else
				{
					$kind = \BayLang\OpCodes\OpPipe::KIND_CALL;
					$res = $parser->parser_base::readDynamic($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$value = \Runtime\rtl::attr($res, 1);
				}
				$op_code = new \BayLang\OpCodes\OpPipe(\Runtime\Map::from(["obj"=>$op_code,"kind"=>$kind,"value"=>$value,"is_async"=>$is_async,"is_monad"=>$is_monad,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$look_token = \Runtime\rtl::attr($res, 1);
				$is_next_attr = false;
			}
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read expression
	 */
	static function readExpression($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "<")
		{
			return $parser->parser_html::readHTML($parser);
		}
		else if ($token->content == "curry")
		{
			return $parser->parser_base::readCurry($parser);
		}
		else if ($token->content == "@css")
		{
			return $parser->parser_html::readCss($parser);
		}
		return static::ExpressionPipe($parser);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBayExpression";
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