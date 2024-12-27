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
namespace BayLang\Constructor\Frontend\Editor\Processor;
class ComponentProcessor extends \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor
{
	/**
	 * Setup op code
	 */
	function setupOpCode($code)
	{
		parent::setupOpCode($code);
		/* Process op_code attrs */
		$op_code_render = $this->findFunction("render");
		if (!$op_code_render)
		{
			return ;
		}
		/* Process attributes */
		$op_code_expression = $op_code_render->getExpression();
		$this->page_model->attribute_processor->processHtmlItems($op_code_expression);
		$this->page_model->attribute_processor->initWidgetInc();
		/* Set main widget */
		if ($op_code_expression && $op_code_expression instanceof \BayLang\OpCodes\OpHtmlItems)
		{
			$op_code = $op_code_expression->items->get(0);
			$this->page_model->main_widget = $this->page_model->widget_manager->addMain($op_code);
		}
	}
	/**
	 * Get styles op_code
	 */
	function getStyleOpCode()
	{
		if (!$this->code)
		{
			return null;
		}
		$op_code_class = $this->code->findClass();
		if (!$op_code_class)
		{
			return null;
		}
		return $op_code_class->items->filter(\Runtime\lib::isInstance("BayLang.OpCodes.OpHtmlStyle"));
	}
	/**
	 * Returns app content
	 */
	function buildAppContent()
	{
		$translator = \BayLang\LangUtils::createTranslator("bay");
		$content = \BayLang\LangUtils::translate($translator, $this->code);
		return $content;
	}
	/**
	 * Build render function
	 */
	function buildRenderContent($render_name="render")
	{
		$op_code_render = $this->findFunction($render_name);
		if (!$op_code_render)
		{
			return "";
		}
		/* Create translator */
		$t = $this->createTranslator();
		$save_op_codes = $t->save_op_codes;
		/* Translate expression */
		$res = $t->expression::OpDeclareFunction($t, $op_code_render, false);
		$t = $res->get(0);
		/* Output save op code */
		$content = "";
		$save = $t::outputSaveOpCode($t, $save_op_codes->count());
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($save);
		}
		$content .= \Runtime\rtl::toStr($res->get(1));
		$content = $t->program::removeContext($content);
		$content = \Runtime\rs::trim($content);
		return $content;
	}
	/**
	 * Add default template
	 */
	function addDefaultTemplate($op_code, $widget_name, $template_content)
	{
		/* Parse default template */
		$default_template = null;
		$parser = $this->createParser();
		try
		{
			
			$res = $parser::parse($parser, $template_content);
			$parser = $res->get(0);
			$default_template = $res->get(1);
		}
		catch (\Exception $_ex)
		{
			if (true)
			{
				$e = $_ex;
			}
			else
			{
				throw $_ex;
			}
		}
		/* If default template is correct */
		if (!$default_template)
		{
			return ;
		}
		/* Add default CSS */
		$op_code_class = $default_template->findClass();
		if ($op_code_class)
		{
			$op_code_style = $op_code_class->items->findItem(\Runtime\lib::isInstance("BayLang.OpCodes.OpHtmlStyle"));
			if ($op_code_style)
			{
				$this->page_model->styles->setSelectorContent("." . \Runtime\rtl::toStr($widget_name), $op_code_style->content);
			}
		}
		/* Add uses */
		$modules = $default_template->uses->keys();
		for ($i = 0; $i < $default_template->items->count(); $i++)
		{
			$item = $default_template->items->get($i);
			if ($item instanceof \BayLang\OpCodes\OpUse)
			{
				$this->addModule($item->name, $item->alias, $item->is_component);
			}
		}
		/* Find class from default_template */
		$op_code_class = $default_template->findClass();
		if (!$op_code_class)
		{
			return ;
		}
		/* Find render */
		$op_code_render = $op_code_class->findFunction("render");
		if (!$op_code_render)
		{
			return ;
		}
		if (!$op_code_render->expression)
		{
			return ;
		}
		if (!($op_code_render->expression instanceof \BayLang\OpCodes\OpHtmlItems))
		{
			return ;
		}
		/* Add items */
		$op_code->items = $op_code_render->expression;
	}
	/**
	 * Create widget
	 */
	function createWidget($widget_settings, $widget_name="widget")
	{
		/* Default widget name */
		if ($widget_name == "")
		{
			$widget_name = "widget";
		}
		/* Get component class name */
		$class_name = $widget_settings->getComponentName();
		$alias_name = $class_name;
		/* Add module */
		if (static::isComponent($class_name))
		{
			$alias_name = $this->addModule($class_name, $widget_settings->getAliasName(), true);
		}
		/* Create op_code */
		$key_debug = $this->page_model->attribute_processor->createKeyName("widget");
		$op_code = new \BayLang\OpCodes\OpHtmlTag(\Runtime\Map::from(["attrs"=>\Runtime\Vector::from([new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["key"=>"class","value"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$widget_name]))])),new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["key"=>"@key_debug","value"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$key_debug]))]))]),"items"=>new \BayLang\OpCodes\OpHtmlItems(),"tag_name"=>$alias_name]));
		/* Get default template */
		$template_info = $widget_settings->getDefaultTemplate();
		$template_factory = $template_info->get("default");
		if (!$template_factory)
		{
			return $op_code;
		}
		/* Get template content */
		$template_info = $template_factory();
		$template_content = "<class>" . \Runtime\rtl::toStr($template_info->get("content")) . \Runtime\rtl::toStr("</class>");
		/* Add default template */
		$this->addDefaultTemplate($op_code, $widget_name, $template_content);
		/* Add op_code attrs */
		$this->page_model->attribute_processor->processHtmlTag($op_code, $widget_name);
		return $op_code;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Processor.CodeProcessor";
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