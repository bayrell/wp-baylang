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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.UploadFileButton = {
	name: "Runtime.Widget.UploadFileButton",
	extends: Runtime.Widget.Button,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Text */
			this._t(__v, "    ");
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["upload_file_button"])});
			
			/* Render */
			this._t(__v0, Runtime.Widget.Button.methods.render.call(this));
			
			/* Text */
			this._t(__v0, "        ");
			
			/* Element 'input' */
			let __v1 = this._e(__v0, "input", {"type":"file","ref":"upload_file","onChange":this.onFileUploadChange});
			
			/* Text */
			this._t(__v0, "    ");
			
			return this._flatten(__v);
		},
		/**
 * Button click
 */
		onClick: function(e)
		{
			var upload_file = this.getRef("upload_file");
			upload_file.click();
		},
		/**
 * File upload change event
 */
		onFileUploadChange: function(e)
		{
			var upload_file = this.getRef("upload_file");
			var file = Runtime.rtl.attr(upload_file.files, 0);
			if (file)
			{
				var message = new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"name":"file","value":file,"data":this.data}));
				this.emit("file", message);
				if (this.model)
				{
					this.model.emit(message);
				}
			}
		},
	},
};
Object.assign(Runtime.Widget.UploadFileButton,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".upload_file_button.h-a4c7 input{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.UploadFileButton";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Button";
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
Runtime.rtl.defClass(Runtime.Widget.UploadFileButton);
window["Runtime.Widget.UploadFileButton"] = Runtime.Widget.UploadFileButton;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.UploadFileButton;