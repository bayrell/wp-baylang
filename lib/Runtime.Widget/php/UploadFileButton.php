<?php
/*
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
namespace Runtime\Widget;
class UploadFileButton extends \Runtime\Widget\Button
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, "    ");
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, parent::render());
		
		/* Text */
		$this->_t($__v0, "        ");
		
		/* Element 'input' */
		$this->_e($__v0, "input", ["type" => "file"]);
		
		/* Text */
		$this->_t($__v0, "    ");
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["upload_file_button"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Button click
 */
	function onClick($e)
	{
		$upload_file = $this->getRef("upload_file");
		$upload_file->click();
	}
	/**
 * File upload change event
 */
	function onFileUploadChange($e)
	{
		$upload_file = $this->getRef("upload_file");
		$file = \Runtime\rtl::attr($upload_file->files, 0);
		if ($file)
		{
			$message = new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["name"=>"file","value"=>$file,"data"=>$this->data]));
			$this->emit("file", $message);
			if ($this->model)
			{
				$this->model->emit($message);
			}
		}
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".upload_file_button.h-a4c7 input{display: none}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.UploadFileButton";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Button";
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