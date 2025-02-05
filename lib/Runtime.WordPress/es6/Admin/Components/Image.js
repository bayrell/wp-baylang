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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Components == 'undefined') Runtime.WordPress.Admin.Components = {};
Runtime.WordPress.Admin.Components.Image = {
	name: "Runtime.WordPress.Admin.Components.Image",
	extends: Runtime.Web.Component,
	props: {
		"styles": {
			default: Runtime.Vector.from([]),
		},
		"name": {
			default: "",
		},
		"value": {
			default: "",
		},
		"size": {
			default: "medium",
		},
		"upload": {
			default: false,
		},
		"center": {
			default: false,
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_image", this.getStyles()]),"key":"widget_image_" + Runtime.rtl.toStr(this.name)});
			
			if (this.upload)
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_image__upload_button"])});
				
				/* Component 'Button' */
				let __v2 = this._c(__v1, "Runtime.Widget.Button", {"type":"small","onClick":this.onUploadImage}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "Upload image");
					
					return this._flatten(__v);
				});
			}
			let image = this.getImage();
			
			if (image)
			{
				if (this.center)
				{
					/* Element 'center' */
					let __v3 = this._e(__v0, "center", {});
					
					/* Element 'img' */
					let __v4 = this._e(__v3, "img", {"src":image});
				}
				else
				{
					/* Element 'img' */
					let __v5 = this._e(__v0, "img", {"src":image});
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns styles
 */
		getStyles: function()
		{
			if (this.styles == null)
			{
				return "";
			}
			var styles = this.styles.map((name) =>
			{
				return "widget_image--" + Runtime.rtl.toStr(name);
			});
			return Runtime.rs.join(" ", styles);
		},
		/**
 * Return image
 */
		getImage: function()
		{
			if (!(this.value instanceof Runtime.Dict))
			{
				return ;
			}
			var image = this.value.get("file");
			/* Resolve size */
			var sizes = this.value.get("sizes");
			if (sizes && sizes.has(this.size))
			{
				image = sizes.get(this.size).get("file");
			}
			return image;
		},
		/**
 * On upload image
 */
		onUploadImage: function()
		{
			var uploader = wp.media
	({
		title: "Файлы",
		button: {
			text: "Выбрать файл"
		},
		multiple: false
	})
	.on('select', () => {
		let attachments = uploader.state().get('selection').toJSON();
		let attachment = attachments[0];
		
		let sizes = {};
		for (let size_name in attachment.sizes)
		{
			let size = attachment.sizes[size_name];
			sizes[size_name] = Runtime.Dict.from({
				"size": size_name,
				"file": size.url,
				"width": size.width,
				"height": size.height,
				"mime_type": "",
			});
		}
		
		let image = Runtime.Dict.from({
			"id": attachment.id,
			"width": attachment.width,
			"height": attachment.height,
			"file": attachment.url,
			"sizes": Runtime.Dict.from(sizes),
		});
		
		/* Send value change */
		var message_data = Runtime.Dict.from({
			"value": image,
			"old_value": this.value,
			"data": this.data,
		});
		this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(message_data));
	})
	.open();
		},
	},
};
Object.assign(Runtime.WordPress.Admin.Components.Image,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_image.h-0c6e img{max-width: 200px;max-height: 200px}.widget_image--small.h-0c6e img{max-width: 100px;max-height: 100px}.widget_image__upload_button.h-0c6e{padding-bottom: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Components.Image";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Components.Image);
window["Runtime.WordPress.Admin.Components.Image"] = Runtime.WordPress.Admin.Components.Image;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Components.Image;