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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Gallery == 'undefined') Runtime.WordPress.Theme.Components.Gallery = {};
Runtime.WordPress.Theme.Components.Gallery.Gallery = {
	name: "Runtime.WordPress.Theme.Components.Gallery.Gallery",
	extends: Runtime.Widget.Gallery.Gallery,
	methods:
	{
		renderItem: function(pos)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let item = this.model.getItem(pos);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_gallery__item", componentHash]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, () =>
			{
				this.onClick(pos);
			})}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_gallery__item_title", componentHash])}));
			__v1.push(item.get("name"));
			
			let small_image = item["image", "sizes", this.model.small_size];
			if (small_image)
			{
				/* Element div */
				let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_gallery__item_image", componentHash]), "key": "image"}));
				
				/* Element img */
				__v2.element("img", new Runtime.Map({"src": small_image.get("file"), "alt": item.get("name")}));
			}
			else
			{
				/* Element div */
				let __v3 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_gallery_item__image", componentHash]), "key": "no_image"}));
				
				/* Element div */
				let __v4 = __v3.element("div", new Runtime.Map({"class": rs.className(["widget_gallery_item__no_image", componentHash])}));
				__v4.push("No image");
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Theme.Components.Gallery.Gallery"; },
	},
	getComponentStyle: function(){ return ".widget_gallery__item.h-fc5c{display: flex;flex-direction: column;align-items: center}.widget_gallery__item_title.h-fc5c{font-weight: bold;text-align: center;margin-bottom: 10px}.widget_gallery__item_image.h-fc5c{cursor: pointer}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.WordPress.Theme.Components.Gallery.Gallery"] = Runtime.WordPress.Theme.Components.Gallery.Gallery;