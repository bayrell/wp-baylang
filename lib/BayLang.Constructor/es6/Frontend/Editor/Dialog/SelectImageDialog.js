"use strict;"
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Dialog == 'undefined') BayLang.Constructor.Frontend.Editor.Dialog = {};
BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog = {
	name: "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderUploadImage: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["item item_upload"])});
			
			/* Element 'input' */
			let __v1 = this._e(__v0, "input", {"type":"file","ref":"upload_file","onChange":this.onFileUploadChange});
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"onClick":this.onFileUploadClick,"class":this._class_name(["item_image_wrap"])});
			
			/* Text */
			this._t(__v2, "Upload image");
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"ref":"items","onClick":() =>
			{
				this.model.context_menu.hide();
			},"class":this._class_name(["select_image_items"])});
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.context_menu));
			
			/* Render */
			this._t(__v0, this.renderUploadImage());
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				let item = this.model.items.get(i);
				
				if (this.isImage(item))
				{
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"onClick":() =>
					{
						this.model.selectItem(i);
					},"onContextmenu":(event) =>
					{
						var rect = this.getRef("items").getBoundingClientRect();
						var x = event.clientX - rect.left;
						var y = event.clientY - rect.top;
						this.model.selectItem(i);
						this.model.contextMenu(x, y);
						event.preventDefault();
					},"class":this._class_name(["item", ((this.model.selected == i) ? ("active") : (""))])});
					
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {"class":this._class_name(["item_image_wrap"])});
					
					/* Element 'img' */
					let __v3 = this._e(__v2, "img", {"src":item.get("url"),"class":this._class_name(["item_image"])});
					
					/* Element 'div' */
					let __v4 = this._e(__v1, "div", {"class":this._class_name(["item_label"])});
					
					/* Element 'span' */
					let __v5 = this._e(__v4, "span", {});
					
					/* Render */
					this._t(__v5, item.get("file_name"));
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * File upload click event
 */
		onFileUploadClick: function()
		{
			var upload_file = this.getRef("upload_file");
			upload_file.click();
		},
		/**
 * File upload change
 */
		onFileUploadChange: function()
		{
			var upload_file = this.getRef("upload_file");
			var file = Runtime.rtl.attr(upload_file.files, 0);
			if (file)
			{
				this.model.uploadFile(file);
			}
		},
		/**
 * Returns true if item is image
 */
		isImage: function(item)
		{
			var file_name = item.get("file_name");
			var file_extension = Runtime.rs.extname(file_name);
			var arr = Runtime.Vector.from(["jpg","jpeg","png","svg"]);
			if (arr.indexOf(file_extension) == -1)
			{
				return false;
			}
			return true;
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".select_image_items.h-1804{position: relative;display: flex;flex-wrap: wrap}.select_image_items.h-1804 .item.h-1804{margin: 5px;text-align: center;cursor: pointer}.select_image_items.h-1804 .item_image_wrap.h-1804{display: flex;position: relative;align-items: center;justify-content: center;width: 100px;height: 100px;padding: 2px;border: 2px transparent solid}.select_image_items.h-1804 .item_upload.h-1804 input{display: none}.select_image_items.h-1804 .item_upload.h-1804 .item_image_wrap.h-1804{border: 1px var(--widget-color-border) solid;border-radius: 4px}.select_image_items.h-1804 .item_image.h-1804{max-width: 100%;max-height: 100%}.select_image_items.h-1804 .item_label.h-1804{margin-top: 5px;overflow-wrap: anywhere;width: 100px;text-align: center}.select_image_items.h-1804 .item_label.h-1804 span{display: inline-block;padding: 5px}.select_image_items.h-1804 .item.active.h-1804 .item_image_wrap.h-1804{border-color: var(--widget-color-primary);user-select: none}.select_image_items.h-1804 .item.active.h-1804 .item_label.h-1804 span{background-color: var(--widget-color-primary);color: white}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog);
window["BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog"] = BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog;