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
	extends: Runtime.Component,
	props: {
		styles: {default: Runtime.Vector.create([])},
		name: {default: ""},
		value: {default: ""},
		size: {default: "medium"},
		upload: {default: false},
		center: {default: false},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_image", this.getStyles(), componentHash]), "key": "widget_image_" + String(this.name)}));
			
			if (this.upload)
			{
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_image__upload_button", componentHash])}));
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v1.element("Runtime.Widget.Button", new Runtime.Map({"onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.onUploadImage();
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Upload image");
					return __v;
				});
			}
			
			let image = this.getImage();
			if (image)
			{
				if (this.center)
				{
					/* Element center */
					let __v3 = __v0.element("center");
					
					/* Element img */
					__v3.element("img", new Runtime.Map({"src": image}));
				}
				else
				{
					/* Element img */
					__v0.element("img", new Runtime.Map({"src": image}));
				}
			}
			
			return __v;
		},
		/**
		 * Returns styles
		 */
		getStyles: function()
		{
			if (this.styles == null) return "";
			let styles = this.styles.map((name) => { return "widget_image--" + String(name); });
			return Runtime.rs.join(" ", styles);
		},
		/**
		 * Return image
		 */
		getImage: function()
		{
			if (!(this.value instanceof Runtime.WordPress.Theme.Components.ImageType)) return;
			return this.value.getImage(this.size);
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
		
		let sizes = new Runtime.Map();
		for (let size_name in attachment.sizes)
		{
			let size = attachment.sizes[size_name];
			sizes.set(size_name, Runtime.Map.create({
				"size": size_name,
				"file": size.url,
				"width": size.width,
				"height": size.height,
				"mime_type": "",
			}));
		}
		
		let image = new Runtime.WordPress.Admin.Components.ImageType();
		image.id = attachment.id;
		image.width = attachment.width;
		image.height = attachment.height;
		image.file = attachment.url;
		image.sizes = sizes;
		
		/* Send value change */
		var message_data = Runtime.Map.create({
			"value": image,
			"old_value": this.value,
			"data": this.data,
		});
		this.emit(new Runtime.Widget.Messages.ValueChangeMessage(message_data));
	})
	.open();
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Components.Image"; },
	},
	getComponentStyle: function(){ return ".widget_image.h-c6d img{max-width: 200px;max-height: 200px}.widget_image--small.h-c6d img{max-width: 100px;max-height: 100px}.widget_image__upload_button.h-c6d{padding-bottom: 10px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button"); },
};
window["Runtime.WordPress.Admin.Components.Image"] = Runtime.WordPress.Admin.Components.Image;