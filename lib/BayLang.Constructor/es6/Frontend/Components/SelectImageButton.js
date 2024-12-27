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
if (typeof BayLang.Constructor.Frontend.Components == 'undefined') BayLang.Constructor.Frontend.Components = {};
BayLang.Constructor.Frontend.Components.SelectImageButton = {
	name: "BayLang.Constructor.Frontend.Components.SelectImageButton",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Component 'Button' */
			let __v0 = this._c(__v, "Runtime.Widget.Button", {"onClick":this.onSelectImageClick}, () => {
				let __v = [];
				
				/* Text */
				this._t(__v, "Select image");
				
				return this._flatten(__v);
			});
			
			return this._flatten(__v);
		},
		/**
 * Select image click
 */
		onSelectImageClick: function(message)
		{
			var select_image_dialog = this.layout.getPageModel().select_image_dialog;
			select_image_dialog.clearListener("confirm");
			select_image_dialog.addListener("confirm", new Runtime.Callback(this, "onSelectImage"));
			select_image_dialog.show();
		},
		/**
 * On select image
 */
		onSelectImage: function()
		{
			var select_image_dialog = this.layout.getPageModel().select_image_dialog;
			var selected_item = select_image_dialog.getSelectedItem();
			var value = (selected_item) ? (selected_item.get("file_path")) : ("");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":value,"data":this.data})));
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Components.SelectImageButton,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Components";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Components.SelectImageButton";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Components.SelectImageButton);
window["BayLang.Constructor.Frontend.Components.SelectImageButton"] = BayLang.Constructor.Frontend.Components.SelectImageButton;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Components.SelectImageButton;