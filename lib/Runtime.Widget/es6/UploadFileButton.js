"use strict;"
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["upload_file_button", componentHash])}));
			__v0.push(Runtime.Widget.Button.methods.render.call(this));
			
			/* Element input */
			__v0.element("input", new Runtime.Map({"type": "file", "@ref": "upload_file", "onChange": this.onFileUploadChange}));
			
			return __v;
		},
		/**
		 * Button click
		 */
		onClick: function(e)
		{
			let upload_file = this.getRef("upload_file");
			upload_file.click();
		},
		/**
		 * File upload change event
		 */
		onFileUploadChange: function(e)
		{
			let upload_file = this.getRef("upload_file");
			let file = upload_file.files[0];
			if (file)
			{
				let message = new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
					"name": "file",
					"value": file,
					"data": this.data,
				}));
				this.emit(message);
				if (this.model) this.model.emit(message);
			}
		},
		getClassName: function(){ return "Runtime.Widget.UploadFileButton"; },
	},
	getComponentStyle: function(){ return ".upload_file_button.h-a4c6 input{display: none}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.UploadFileButton"] = Runtime.Widget.UploadFileButton;