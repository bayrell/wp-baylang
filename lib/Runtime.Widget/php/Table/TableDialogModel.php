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
namespace Runtime\Widget\Table;
class TableDialogModel extends \Runtime\Widget\Table\TableModel
{
	public $add_form;
	public $edit_form;
	public $delete_form;
	public $save_dialog;
	public $delete_dialog;
	public $get_title;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("get_title"))
		{
			$this->get_title = $params->get("get_title");
		}
		/* Form */
		if ($params->has("add_form"))
		{
			$this->add_form = $this->createModel($params->get("add_form"));
		}
		if ($params->has("edit_form"))
		{
			$this->edit_form = $this->createModel($params->get("edit_form"));
		}
		if ($params->has("delete_form"))
		{
			$this->delete_form = $this->createModel($params->get("delete_form"));
		}
		/* Setup dialog */
		if ($params->has("save_dialog"))
		{
			$this->save_dialog = $this->createModel($params->get("save_dialog"));
		}
		if ($params->has("delete_dialog"))
		{
			$this->delete_dialog = $this->createModel($params->get("delete_dialog"));
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add events */
		if ($this->add_form)
		{
			$this->add_form->addListener("submit", new \Runtime\Callback($this, "onFormSubmit"));
		}
		if ($this->edit_form && $this->add_form != $this->edit_form)
		{
			$this->edit_form->addListener("submit", new \Runtime\Callback($this, "onFormSubmit"));
		}
		if ($this->delete_form)
		{
			$this->delete_form->addListener("submit", new \Runtime\Callback($this, "onFormSubmit"));
		}
		/* Hide form result */
		if ($this->add_form)
		{
			$this->add_form->show_result = false;
		}
		if ($this->edit_form)
		{
			$this->edit_form->show_result = false;
		}
		if ($this->delete_form)
		{
			$this->delete_form->show_result = false;
		}
		/* Create save wiget */
		if ($this->add_form || $this->edit_form)
		{
			$this->save_dialog = $this->addWidget("Runtime.Widget.Table.SaveDialogModel", \Runtime\Map::from(["add_form"=>$this->add_form,"edit_form"=>$this->edit_form,"table"=>$this,"widget_name"=>"save_dialog"]));
			$this->save_dialog->addListener("confirm", new \Runtime\Callback($this, "onConfirmSaveClick"), -999);
		}
		/* Create delete widget */
		if ($this->delete_form)
		{
			$this->delete_dialog = $this->addWidget("Runtime.Widget.Table.DeleteDialogModel", \Runtime\Map::from(["form"=>$this->delete_form,"table"=>$this,"widget_name"=>"delete_dialog"]));
			$this->delete_dialog->addListener("confirm", new \Runtime\Callback($this, "onConfirmDeleteClick"), -999);
		}
		/* Add dialogs */
		if ($this->save_dialog)
		{
			$this->render_list->addItem($this->save_dialog);
		}
		if ($this->delete_dialog)
		{
			$this->render_list->addItem($this->delete_dialog);
		}
	}
	/**
	 * Returns title
	 */
	function getTitle($params)
	{
		if ($this->get_title)
		{
			return \Runtime\rtl::apply($this->get_title, \Runtime\Vector::from([$params]));
		}
		return "";
	}
	/**
	 * Row button click
	 */
	function onRowButtonClick($message)
	{
		$data = $message->data;
		$button_name = $message->widget->widget_name;
		if ($button_name == "edit_button")
		{
			$this->showEdit($data);
		}
		else if ($button_name == "delete_button")
		{
			$this->showDelete($data);
		}
		parent::onRowButtonClick($message);
	}
	/**
	 * Show add
	 */
	function showAdd()
	{
		if (!$this->add_form)
		{
			return ;
		}
		$this->add_form->clear();
		/* Change confirm button */
		$confirm_button = $this->save_dialog->buttons->getWidget("confirm_button");
		$confirm_button->content = "Add";
		$confirm_button->styles = \Runtime\Vector::from(["success"]);
		/* Show dialog */
		$this->save_dialog->action = "add";
		$this->save_dialog->title = $this->getTitle(\Runtime\Map::from(["action"=>"add"]));
		$this->save_dialog->show();
	}
	/**
	 * Show edit
	 */
	function showEdit($data)
	{
		if (!$this->edit_form)
		{
			return ;
		}
		$item = \Runtime\Serializer::copy($data->get("item"));
		$this->edit_form->clear();
		$this->edit_form->setItem($item);
		$this->edit_form->setRowNumber($data->get("row_number"));
		/* Change confirm button */
		$confirm_button = $this->save_dialog->buttons->getWidget("confirm_button");
		$confirm_button->content = "Save";
		$confirm_button->styles = \Runtime\Vector::from(["success"]);
		/* Show dialog */
		$this->save_dialog->action = "edit";
		$this->save_dialog->title = $this->getTitle(\Runtime\Map::from(["action"=>"edit","item"=>$item]));
		$this->save_dialog->show();
	}
	/**
	 * Show delete
	 */
	function showDelete($data)
	{
		$item = \Runtime\Serializer::copy($data->get("item"));
		$this->delete_form->clear();
		$this->delete_form->setItem($item);
		$this->delete_form->setRowNumber($data->get("row_number"));
		/* Show dialog */
		$this->delete_dialog->title = $this->getTitle(\Runtime\Map::from(["action"=>"delete","item"=>$item]));
		$this->delete_dialog->show();
	}
	/**
	 * Confirm event
	 */
	function onConfirmSaveClick($message)
	{
		/* Get form */
		$form = null;
		if ($this->save_dialog->action == "add")
		{
			$form = $this->add_form;
		}
		else if ($this->save_dialog->action == "edit")
		{
			$form = $this->edit_form;
		}
		if (!$form)
		{
			return ;
		}
		/* Submit form */
		$res = $form->submit();
		/* Check response is exists */
		if (!$res)
		{
			$form->result->setError("Response does not exists");
			throw new \Runtime\Widget\Dialog\DialogModelException("Response does not exists");
		}
		/* Error message */
		if (!$res->isSuccess())
		{
			throw new \Runtime\Widget\Dialog\DialogModelException($res->message);
		}
		/* Reload table */
		$this->reload();
	}
	/**
	 * Confirm event
	 */
	function onConfirmDeleteClick($message)
	{
		$res = $this->delete_form->submit();
		/* Error message */
		if (!$res->isSuccess())
		{
			throw new \Runtime\Widget\Dialog\DialogModelException($res->message);
		}
		/* Reload table */
		$this->reload();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->add_form = null;
		$this->edit_form = null;
		$this->delete_form = null;
		$this->save_dialog = null;
		$this->delete_dialog = null;
		$this->get_title = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.TableDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Table.TableModel";
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