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
namespace BayLang\Constructor\Frontend\Fonts;
class FontSaveModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $project_id;
	public $files;
	public $form;
	public $top_buttons;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Set route matches */
		$this->project_id = $this->layout->route->matches->get("project_id");
		/* Add top buttons */
		$this->top_buttons = $this->addWidget("Runtime.Widget.RowButtonsModel", \Runtime\Map::from(["widget_name"=>"top_buttons","styles"=>\Runtime\Vector::from(["@top_buttons"]),"buttons"=>\Runtime\Vector::from([new \Runtime\Web\ModelFactory("Runtime.Widget.BackButtonModel", \Runtime\Map::from(["href"=>$this->layout->url("baylang:project:fonts:index")]))])]));
		/* Add files */
		$this->files = $this->addWidget("Runtime.Widget.Table.TableDialogModel", \Runtime\Map::from(["widget_name"=>"files","get_title"=>function ($params)
		{
			$action = $params->get("action");
			$item = $params->get("item");
			if ($action == "add")
			{
				return "Add files";
			}
			if ($action == "edit")
			{
				return "Edit files '" . \Runtime\rtl::toStr($item->get("name")) . \Runtime\rtl::toStr("'");
			}
			if ($action == "delete")
			{
				return "Delete files '" . \Runtime\rtl::toStr($item->get("name")) . \Runtime\rtl::toStr("'");
			}
			return "";
		},"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Table.TableProxyStorage", \Runtime\Map::from(["container"=>$this,"path"=>\Runtime\Vector::from(["form","item","files"])])),"delete_form"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Form.FormModel", \Runtime\Map::from(["widget_name"=>"delete_form","primary_key"=>\Runtime\Vector::from(["name"]),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id,"name"=>$this->layout->request_query->get("name")]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormDeleteStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.fonts.save","method_name"=>"deleteFile"])),"events"=>\Runtime\Map::from(["submit"=>new \Runtime\Callback($this, "onDeleteFile")])])),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id]),"top_buttons"=>\Runtime\Vector::from([\Runtime\Map::from(["widget_name"=>"add","content"=>"Add file","styles"=>\Runtime\Vector::from(["small","primary"]),"component"=>"Runtime.Widget.UploadFileButton","events"=>\Runtime\Map::from(["file"=>new \Runtime\Callback($this, "onUploadFile")])])]),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"row_number"]),\Runtime\Map::from(["name"=>"name","label"=>"Font name","component"=>"Runtime.Widget.Label"]),\Runtime\Map::from(["name"=>"row_buttons","model"=>new \Runtime\Web\ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", \Runtime\Map::from(["edit"=>false]))])])]));
		/* Add form */
		$this->form = $this->addWidget("Runtime.Widget.Form.FormSubmitModel", \Runtime\Map::from(["widget_name"=>"form","primary_key"=>\Runtime\Vector::from(["name"]),"pk"=>\Runtime\Map::from(["name"=>$this->layout->request_query->get("name")]),"submit_button"=>\Runtime\Map::from(["text"=>"Save","styles"=>\Runtime\Vector::from(["success","large"])]),"foreign_key"=>\Runtime\Map::from(["project_id"=>$this->project_id]),"storage"=>new \Runtime\Entity\Factory("Runtime.Widget.Form.FormSaveStorage", \Runtime\Map::from(["api_name"=>"baylang.constructor.fonts.save"])),"fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"name","label"=>"Name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"files","label"=>"Files","model"=>$this->files]),\Runtime\Map::from(["name"=>"css","label"=>"CSS","component"=>"Runtime.Widget.Editor.Editor"])])]));
	}
	/**
	 * Upload file event
	 */
	function onUploadFile($e)
	{
		$file = $e->value;
		$foreign_key = $this->form->pk->copy();
		$foreign_key->set("project_id", $this->project_id);
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.fonts.save","method_name"=>"uploadFile","data"=>\Runtime\Map::from(["foreign_key"=>$foreign_key,"file"=>$file])]));
		if ($result->isSuccess())
		{
			$files = $this->form->item->get("files");
			$index = $files->find(\Runtime\lib::equalAttr("name", $file->name));
			if ($index == -1)
			{
				$files->push(\Runtime\Map::from(["name"=>$file->name]));
			}
			$files = $files->sort(\Runtime\lib::comparator(new \Runtime\Callback(\Runtime\lib::class, "sortAsc"), \Runtime\lib::attr("name")));
			$this->form->item->set("files", $files);
		}
	}
	/**
	 * Delete file event
	 */
	function onDeleteFile($message)
	{
		if ($message->result->isSuccess())
		{
			$files = $this->form->item->get("files");
			$file_name = $message->widget->item->get("name");
			$index = $files->find(\Runtime\lib::equalAttr("name", $file_name));
			if ($index >= 0)
			{
				$files->remove($index);
			}
		}
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Edit font");
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Fonts.FontSave";
		$this->project_id = "";
		$this->files = null;
		$this->form = null;
		$this->top_buttons = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Fonts";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Fonts.FontSaveModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BasePageModel";
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