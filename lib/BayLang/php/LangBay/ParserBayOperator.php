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
class ParserBayOperator
{
	/**
	 * Read return
	 */
	static function readReturn($parser)
	{
		$token = null;
		$op_code = null;
		$look = null;
		$res = $parser->parser_base::matchToken($parser, "return");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content != ";")
		{
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpReturn(\Runtime\Map::from(["expression"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read delete
	 */
	static function readDelete($parser)
	{
		$token = null;
		$op_code = null;
		$res = $parser->parser_base::matchToken($parser, "delete");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::readDynamic($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpDelete(\Runtime\Map::from(["op_code"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read throw
	 */
	static function readThrow($parser)
	{
		$token = null;
		$op_code = null;
		$res = $parser->parser_base::matchToken($parser, "throw");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpThrow(\Runtime\Map::from(["expression"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read try
	 */
	static function readTry($parser)
	{
		$look = null;
		$token = null;
		$op_try = null;
		$items = new \Runtime\Vector();
		$res = $parser->parser_base::matchToken($parser, "try");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		/* Try */
		$res = static::readOperators($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_try = \Runtime\rtl::attr($res, 1);
		/* Catch */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content == "catch")
		{
			$parser = $look;
			$op_catch = null;
			$var_op_code = null;
			$pattern = null;
			$item_caret_start = $token->caret_start;
			/* Read ident */
			$res = $parser->parser_base::matchToken($parser, "(");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readTypeIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$pattern = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$var_op_code = \Runtime\rtl::attr($res, 1);
			$var_name = $var_op_code->value;
			$res = $parser->parser_base::matchToken($parser, ")");
			$parser = \Runtime\rtl::attr($res, 0);
			/* Save vars */
			$save_vars = $parser->vars;
			$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm($var_name, true));
			/* Catch operators */
			$res = static::readOperators($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_catch = \Runtime\rtl::attr($res, 1);
			/* Restore vars */
			$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
			$item = new \BayLang\OpCodes\OpTryCatchItem(\Runtime\Map::from(["name"=>$var_name,"pattern"=>$pattern,"value"=>$op_catch,"caret_start"=>$item_caret_start,"caret_end"=>$parser->caret]));
			$items->push($item);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpTryCatch(\Runtime\Map::from(["op_try"=>$op_try,"items"=>$items,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read then
	 */
	static function readThen($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "then")
		{
			return \Runtime\Vector::from([$look,$token]);
		}
		return \Runtime\Vector::from([$parser,$token]);
	}
	/**
	 * Read do
	 */
	static function readDo($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "do")
		{
			return \Runtime\Vector::from([$look,$token]);
		}
		return \Runtime\Vector::from([$parser,$token]);
	}
	/**
	 * Read if
	 */
	static function readIf($parser)
	{
		$look = null;
		$look2 = null;
		$token = null;
		$token2 = null;
		$if_condition = null;
		$if_true = null;
		$if_false = null;
		$if_else = new \Runtime\Vector();
		$res = $parser->parser_base::matchToken($parser, ($parser->is_html) ? ("%if") : ("if"));
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		/* Read expression */
		$res = $parser->parser_base::matchToken($parser, "(");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$if_condition = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, ")");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readThen($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		/* If true */
		$res = static::readOperators($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$if_true = \Runtime\rtl::attr($res, 1);
		/* Else */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && ($parser->is_html && ($token->content == "%else" || $token->content == "%elseif") || !$parser->is_html && ($token->content == "else" || $token->content == "elseif")))
		{
			$res = $parser->parser_base::readToken($look);
			$look2 = \Runtime\rtl::attr($res, 0);
			$token2 = \Runtime\rtl::attr($res, 1);
			if ($token->content == "%elseif" || $token->content == "elseif" || $token->content == "else" && $token2->content == "if" || $token->content == "%else" && $token2->content == "if")
			{
				$ifelse_condition = null;
				$ifelse_block = null;
				if ($token->content == "elseif")
				{
					$parser = $look;
				}
				else if ($token2->content == "%elseif")
				{
					$parser = $look2;
				}
				else if ($token2->content == "if")
				{
					$parser = $look2;
				}
				else if ($token2->content == "%if")
				{
					$parser = $look2;
				}
				/* Read expression */
				$res = $parser->parser_base::matchToken($parser, "(");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$ifelse_condition = \Runtime\rtl::attr($res, 1);
				$res = $parser->parser_base::matchToken($parser, ")");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = static::readThen($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$res = static::readOperators($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$ifelse_block = \Runtime\rtl::attr($res, 1);
				$if_else->push(new \BayLang\OpCodes\OpIfElse(\Runtime\Map::from(["condition"=>$ifelse_condition,"if_true"=>$ifelse_block,"caret_start"=>$token2->caret_start,"caret_end"=>$parser->caret])));
			}
			else
			{
				$res = static::readOperators($look);
				$parser = \Runtime\rtl::attr($res, 0);
				$if_false = \Runtime\rtl::attr($res, 1);
				break;
			}
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpIf(\Runtime\Map::from(["condition"=>$if_condition,"if_true"=>$if_true,"if_false"=>$if_false,"if_else"=>$if_else,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read For
	 */
	static function readFor($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$expr1 = null;
		$expr2 = null;
		$expr3 = null;
		/* Save vars */
		$save_vars = $parser->vars;
		$res = $parser->parser_base::matchToken($parser, ($parser->is_html) ? ("%for") : ("for"));
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::matchToken($parser, "(");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$res = static::readAssign($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$expr1 = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, ";");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$expr2 = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, ";");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$res = static::readOperator($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$expr3 = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, ")");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$res = static::readOperators($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpFor(\Runtime\Map::from(["expr1"=>$expr1,"expr2"=>$expr2,"expr3"=>$expr3,"value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read While
	 */
	static function readWhile($parser)
	{
		$look = null;
		$token = null;
		$condition = null;
		$op_code = null;
		$res = $parser->parser_base::matchToken($parser, ($parser->is_html) ? ("%while") : ("while"));
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::matchToken($parser, "(");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$condition = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, ")");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readDo($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$res = static::readOperators($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpWhile(\Runtime\Map::from(["condition"=>$condition,"value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read While
	 */
	static function readSafe($parser)
	{
		$caret_start = $parser->caret;
		$res = $parser->parser_base::matchToken($parser, "safe");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "(");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::readDynamic($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$obj = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, ")");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readOperators($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$items = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpSafe(\Runtime\Map::from(["obj"=>$obj,"items"=>$items,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read assign
	 */
	static function readAssign($parser)
	{
		$start = $parser;
		$save = null;
		$look = null;
		$token = null;
		$pattern = null;
		$op_code = null;
		$reg_name = null;
		$expression = null;
		$names = null;
		$values = null;
		$kind = \BayLang\OpCodes\OpAssign::KIND_ASSIGN;
		$var_name = "";
		$res = $parser->parser_base::readIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$var_name = $op_code->value;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "<=")
		{
			$arr = new \Runtime\Vector();
			while (!$token->eof && $token->content == "<=")
			{
				$name = "";
				$parser = $look;
				$save = $parser;
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content == "{")
				{
					$res = $parser->parser_base::matchToken($parser, "{");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_expression::readExpression($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$name = \Runtime\rtl::attr($res, 1);
					$res = $parser->parser_base::matchToken($parser, "}");
					$parser = \Runtime\rtl::attr($res, 0);
				}
				else if ($token->content == "\"" || $token->content == "'")
				{
					$res = $parser->parser_base::readString($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$name = \Runtime\rtl::attr($res, 1);
				}
				else
				{
					$res = $parser->parser_base::readToken($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
					$name = $token->content;
				}
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content != "<=")
				{
					$parser = $save;
					break;
				}
				else
				{
					$arr->push($name);
				}
			}
			$names = $arr->slice();
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$expression = \Runtime\rtl::attr($res, 1);
			return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpAssignStruct(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"expression"=>$expression,"var_name"=>$var_name,"names"=>$names]))]);
		}
		if ($token->content != "=" && $token->content != "+=" && $token->content != "-=" && $token->content != "~=" && $token->content != "." && $token->content != "::" && $token->content != "[")
		{
			$var_op_code = null;
			$kind = \BayLang\OpCodes\OpAssign::KIND_DECLARE;
			$values = new \Runtime\Vector();
			$parser = $start;
			$res = $parser->parser_base::readTypeIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$pattern = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$var_op_code = \Runtime\rtl::attr($res, 1);
			$var_name = $var_op_code->value;
			/* Read expression */
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "=")
			{
				$res = $parser->parser_expression::readExpression($look);
				$parser = \Runtime\rtl::attr($res, 0);
				$expression = \Runtime\rtl::attr($res, 1);
			}
			else
			{
				$expression = null;
			}
			$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm($var_name, true));
			$values->push(new \BayLang\OpCodes\OpAssignValue(\Runtime\Map::from(["var_name"=>$var_name,"expression"=>$expression,"caret_start"=>$var_op_code->caret_start,"caret_end"=>$parser->caret])));
			/* Look next token */
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			while (!$token->eof && $token->content == ",")
			{
				$res = $parser->parser_base::readIdentifier($look);
				$parser = \Runtime\rtl::attr($res, 0);
				$var_op_code = \Runtime\rtl::attr($res, 1);
				$var_name = $var_op_code->value;
				/* Read expression */
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content == "=")
				{
					$res = $parser->parser_expression::readExpression($look);
					$parser = \Runtime\rtl::attr($res, 0);
					$expression = \Runtime\rtl::attr($res, 1);
				}
				else
				{
					$expression = null;
				}
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm($var_name, true));
				$values->push(new \BayLang\OpCodes\OpAssignValue(\Runtime\Map::from(["var_name"=>$var_name,"expression"=>$expression,"caret_start"=>$var_op_code->caret_start,"caret_end"=>$parser->caret])));
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
			}
			$var_name = "";
			$expression = null;
		}
		else
		{
			$parser = $start;
			$kind = \BayLang\OpCodes\OpAssign::KIND_ASSIGN;
			$op = "";
			$res = $parser->parser_base::readDynamic($parser, 2 | 8);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "=" || $token->content == "+=" || $token->content == "-=" || $token->content == "~=")
			{
				$op = $token->content;
			}
			else
			{
				throw new \BayLang\Exceptions\ParserError("Unknown operator " . \Runtime\rtl::toStr($token->content), $token->caret_start, $parser->file_name);
			}
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$expression = \Runtime\rtl::attr($res, 1);
			$values = \Runtime\Vector::from([new \BayLang\OpCodes\OpAssignValue(\Runtime\Map::from(["op_code"=>$op_code,"expression"=>$expression,"op"=>$op]))]);
			$var_name = "";
			$expression = null;
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpAssign(\Runtime\Map::from(["pattern"=>$pattern,"values"=>($values != null) ? ($values) : (null),"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"expression"=>$expression,"var_name"=>$var_name,"names"=>$names,"kind"=>$kind]))]);
	}
	/**
	 * Read operator
	 */
	static function readInc($parser)
	{
		$look = null;
		$look1 = null;
		$look2 = null;
		$token = null;
		$token1 = null;
		$token2 = null;
		$res = $parser->parser_base::readToken($parser);
		$look1 = \Runtime\rtl::attr($res, 0);
		$token1 = \Runtime\rtl::attr($res, 1);
		$caret_start = $token1->caret_start;
		$res = $parser->parser_base::readToken($look1);
		$look2 = \Runtime\rtl::attr($res, 0);
		$token2 = \Runtime\rtl::attr($res, 1);
		$look1_content = $token1->content;
		$look2_content = $token2->content;
		if (($look1_content == "++" || $look1_content == "--") && $parser->parser_base::isIdentifier($look2_content))
		{
			$parser = $look2;
			$op_code = new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["value"=>$look2_content,"caret_start"=>$token2->caret_start,"caret_end"=>$token2->caret_end]));
			$op_code = new \BayLang\OpCodes\OpInc(\Runtime\Map::from(["kind"=>($look1_content == "++") ? (\BayLang\OpCodes\OpInc::KIND_PRE_INC) : (\BayLang\OpCodes\OpInc::KIND_PRE_DEC),"value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
			return \Runtime\Vector::from([$parser,$op_code]);
		}
		if (($look2_content == "++" || $look2_content == "--") && $parser->parser_base::isIdentifier($look1_content))
		{
			$parser = $look2;
			$op_code = new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["value"=>$look1_content,"caret_start"=>$token1->caret_start,"caret_end"=>$token1->caret_end]));
			$op_code = new \BayLang\OpCodes\OpInc(\Runtime\Map::from(["kind"=>($look2_content == "++") ? (\BayLang\OpCodes\OpInc::KIND_POST_INC) : (\BayLang\OpCodes\OpInc::KIND_POST_DEC),"value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
			return \Runtime\Vector::from([$parser,$op_code]);
		}
		return \Runtime\Vector::from([$parser,null]);
	}
	/**
	 * Read call function
	 */
	static function readCallFunction($parser)
	{
		$op_code = null;
		$res = $parser->parser_base::readDynamic($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		if ($op_code instanceof \BayLang\OpCodes\OpCall || $op_code instanceof \BayLang\OpCodes\OpPipe)
		{
			return \Runtime\Vector::from([$parser,$op_code]);
		}
		return \Runtime\Vector::from([$parser,null]);
	}
	/**
	 * Read operator
	 */
	static function readOperator($parser)
	{
		$look = null;
		$token = null;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		if ($token->content == "/")
		{
			return $parser->parser_base::readComment($parser);
		}
		else if ($token->content == "#switch" || $token->content == "#ifcode")
		{
			return $parser->parser_preprocessor::readPreprocessor($parser);
		}
		else if ($token->content == "#ifdef")
		{
			return $parser->parser_preprocessor::readPreprocessorIfDef($parser, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_OPERATOR);
		}
		else if ($token->content == "break")
		{
			return \Runtime\Vector::from([$look,new \BayLang\OpCodes\OpBreak(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$look->caret]))]);
		}
		else if ($token->content == "continue")
		{
			return \Runtime\Vector::from([$look,new \BayLang\OpCodes\OpContinue(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$look->caret]))]);
		}
		else if ($token->content == "delete")
		{
			return static::readDelete($parser);
		}
		else if ($token->content == "return")
		{
			return static::readReturn($parser);
		}
		else if ($token->content == "throw")
		{
			return static::readThrow($parser);
		}
		else if ($token->content == "try")
		{
			return static::readTry($parser);
		}
		else if ($token->content == "if")
		{
			return static::readIf($parser);
		}
		else if ($token->content == "for")
		{
			return static::readFor($parser);
		}
		else if ($token->content == "while")
		{
			return static::readWhile($parser);
		}
		else if ($token->content == "safe")
		{
			return static::readSafe($parser);
		}
		$op_code = null;
		/* Read op inc */
		$res = static::readInc($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		if ($op_code != null)
		{
			return $res;
		}
		/* Read op call function */
		$res = static::readCallFunction($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		if ($op_code != null)
		{
			return $res;
		}
		$save_parser = $parser;
		/* Try to read pipe */
		$res = $parser->parser_base::readIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$caret_start = $op_code->caret_start;
		$var_name = $op_code->value;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "|>")
		{
			return $parser->parser_expression::ExpressionPipe($save_parser);
		}
		$parser = $save_parser;
		return static::readAssign($parser);
	}
	/**
	 * Read operators
	 */
	static function readOpItems($parser, $end_tag="}")
	{
		$look = null;
		$token = null;
		$op_code = null;
		$arr = new \Runtime\Vector();
		$caret_start = $parser->caret;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		while (!$token->eof && $token->content != $end_tag)
		{
			$parser_value = null;
			$res = static::readOperator($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			if ($parser_value != null)
			{
				$arr->push($parser_value);
			}
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
			if ($token->content == ";")
			{
				$parser = $look;
				$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
			}
		}
		$op_code = new \BayLang\OpCodes\OpItems(\Runtime\Map::from(["items"=>$arr,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read operators
	 */
	static function readOperators($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		/* Save vars */
		$save_vars = $parser->vars;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		if (!$parser->is_html)
		{
			if ($token->content == "{")
			{
				$res = $parser->parser_base::matchToken($parser, "{");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = static::readOpItems($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else
			{
				$res = static::readOperator($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$res = $parser->parser_base::matchToken($parser, ";");
				$parser = \Runtime\rtl::attr($res, 0);
			}
		}
		else
		{
			if ($token->content == "{")
			{
				$res = $parser->parser_base::matchToken($parser, "{");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = $parser->parser_html::readHTML($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else
			{
				$res = $parser->parser_html::readHTML($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
			}
		}
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read flags
	 */
	static function readFlags($parser)
	{
		$look = null;
		$token = null;
		$values = new \Runtime\Map();
		$current_flags = \BayLang\OpCodes\OpFlags::getFlags();
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $current_flags->indexOf($token->content) >= 0)
		{
			$flag = $token->content;
			$values->set("p_" . \Runtime\rtl::toStr($flag), true);
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpFlags($values)]);
	}
	/**
	 * Read function args
	 */
	static function readDeclareFunctionArgs($parser, $find_ident=true, $flag_match=true)
	{
		$res = null;
		$look = null;
		$token = null;
		$items = new \Runtime\Vector();
		if ($flag_match)
		{
			$res = $parser->parser_base::matchToken($parser, "(");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content != ")")
		{
			$arg_value = null;
			$arg_pattern = null;
			$arg_expression = null;
			$arg_start = $parser;
			/* Arg type */
			$res = $parser->parser_base::readTypeIdentifier($parser, $find_ident);
			$parser = \Runtime\rtl::attr($res, 0);
			$arg_pattern = \Runtime\rtl::attr($res, 1);
			/* Arg name */
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$arg_value = \Runtime\rtl::attr($res, 1);
			$arg_name = $arg_value->value;
			/* Arg expression */
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "=")
			{
				$parser = $look;
				$save_vars = $parser->vars;
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], new \Runtime\Dict());
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$arg_expression = \Runtime\rtl::attr($res, 1);
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
			}
			/* Register variable in parser */
			$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm($arg_name, true));
			$items->push(new \BayLang\OpCodes\OpDeclareFunctionArg(\Runtime\Map::from(["pattern"=>$arg_pattern,"name"=>$arg_name,"expression"=>$arg_expression,"caret_start"=>$arg_pattern->caret_start,"caret_end"=>$parser->caret])));
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == ",")
			{
				$parser = $look;
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
			}
		}
		if ($flag_match)
		{
			$res = $parser->parser_base::matchToken($parser, ")");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		return \Runtime\Vector::from([$parser,$items]);
	}
	/**
	 * Read function variables
	 */
	static function readDeclareFunctionUse($parser, $vars=null, $find_ident=true)
	{
		$look = null;
		$token = null;
		$items = new \Runtime\Vector();
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "use")
		{
			$parser = $look;
			$res = $parser->parser_base::matchToken($parser, "(");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			while (!$token->eof && $token->content != ")")
			{
				$ident = null;
				$res = $parser->parser_base::readIdentifier($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$ident = \Runtime\rtl::attr($res, 1);
				$name = $ident->value;
				if ($vars != null && $find_ident)
				{
					if (!$vars->has($name))
					{
						throw new \BayLang\Exceptions\ParserError("Unknown identifier '" . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("'"), $ident->caret_start, $parser->file_name);
					}
				}
				$items->push($name);
				$res = $parser->parser_base::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content == ",")
				{
					$parser = $look;
					$res = $parser->parser_base::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
				}
			}
			$res = $parser->parser_base::matchToken($parser, ")");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		return \Runtime\Vector::from([$parser,$items]);
	}
	/**
	 * Read function
	 */
	static function readDeclareFunction($parser, $has_name=true)
	{
		$look = null;
		$parser_value = null;
		$op_code = null;
		$token = null;
		$flags = null;
		/* Clear vars */
		$save_is_html = $parser->is_html;
		$save_vars = $parser->vars;
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], new \Runtime\Dict());
		$parser = \Runtime\rtl::setAttr($parser, ["is_html"], false);
		$is_html = false;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "async")
		{
			$parser = $look;
			$flags = new \BayLang\OpCodes\OpFlags(\Runtime\Map::from(["p_async"=>true]));
		}
		$res = $parser->parser_base::readTypeIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$parser_value = \Runtime\rtl::attr($res, 1);
		$caret_start = $parser_value->caret_start;
		$result_type = $parser_value;
		$expression = null;
		$is_context = true;
		$name = "";
		if ($result_type && $result_type instanceof \BayLang\OpCodes\OpTypeIdentifier && $result_type->entity_name instanceof \BayLang\OpCodes\OpEntityName)
		{
			if ($result_type->entity_name->names->get(0) == "html")
			{
				$parser = \Runtime\rtl::setAttr($parser, ["is_html"], true);
				$is_html = true;
			}
		}
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "@")
		{
			$is_context = false;
			$parser = $look;
		}
		if ($has_name)
		{
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			$name = $parser_value->value;
		}
		/* Read function arguments */
		$args = null;
		$res = static::readDeclareFunctionArgs($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$args = \Runtime\rtl::attr($res, 1);
		/* Read function variables */
		$vars = null;
		$res = static::readDeclareFunctionUse($parser, $save_vars);
		$parser = \Runtime\rtl::attr($res, 0);
		$vars = \Runtime\rtl::attr($res, 1);
		/* Add variables */
		$vars->each(function ($name) use (&$parser)
		{
			$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm($name, true));
		});
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "=>")
		{
			$res = $parser->parser_base::matchToken($parser, "=>");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$expression = \Runtime\rtl::attr($res, 1);
			$op_code = null;
		}
		else if ($token->content == "{")
		{
			$save = $parser;
			$res = $parser->parser_base::matchToken($parser, "{");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = static::readOperators($save);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			if ($is_html)
			{
				$expression = $op_code;
				$op_code = null;
			}
		}
		else if ($token->content == ";")
		{
			$res = $parser->parser_base::matchToken($parser, ";");
			$parser = \Runtime\rtl::attr($res, 0);
			$expression = null;
			$op_code = null;
		}
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		$parser = \Runtime\rtl::setAttr($parser, ["is_html"], $save_is_html);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpDeclareFunction(\Runtime\Map::from(["args"=>$args,"vars"=>$vars,"flags"=>$flags,"name"=>$name,"is_html"=>$is_html,"is_context"=>$is_context,"result_type"=>$result_type,"expression"=>$expression,"items"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Returns true if next is function
	 */
	static function tryReadFunction($parser, $has_name=true, $flags=null)
	{
		$look = null;
		$parser_value = null;
		$token = null;
		/* Clear vars */
		$save_vars = $parser->vars;
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], new \Runtime\Dict());
		$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
		$res = false;
		try
		{
			
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "async")
			{
				$parser = $look;
			}
			$res = $parser->parser_base::readTypeIdentifier($parser, false);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			$caret_start = $parser_value->caret_start;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "@")
			{
				$parser = $look;
			}
			if ($has_name)
			{
				$res = $parser->parser_base::readIdentifier($parser);
				$parser = \Runtime\rtl::attr($res, 0);
			}
			$res = static::readDeclareFunctionArgs($parser, false);
			$parser = \Runtime\rtl::attr($res, 0);
			$res = static::readDeclareFunctionUse($parser, null, false);
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($flags != null && $flags->p_declare || $parser->current_class_abstract || $parser->current_class_declare || $parser->current_class_kind == "interface")
			{
				if ($token->content != ";")
				{
					throw new \BayLang\Exceptions\ParserExpected("Function", $caret_start, $parser->file_name);
				}
			}
			else if ($token->content != "=>" && $token->content != "{")
			{
				throw new \BayLang\Exceptions\ParserExpected("Function", $caret_start, $parser->file_name);
			}
			$res = true;
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserExpected)
			{
				$e = $_ex;
				$res = false;
			}
			else
			{
				throw $_ex;
			}
		}
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], true);
		return $res;
	}
	/**
	 * Read annotation
	 */
	static function readAnnotation($parser)
	{
		$look = null;
		$token = null;
		$name = null;
		$params = null;
		$res = $parser->parser_base::matchToken($parser, "@");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_base::readTypeIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$name = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "{")
		{
			$res = $parser->parser_base::readDict($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$params = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpAnnotation(\Runtime\Map::from(["name"=>$name,"params"=>$params]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBayOperator";
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