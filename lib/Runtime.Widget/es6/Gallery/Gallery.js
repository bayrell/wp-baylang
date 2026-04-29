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
if (typeof Runtime.Widget.Gallery == 'undefined') Runtime.Widget.Gallery = {};
Runtime.Widget.Gallery.Gallery = {
	name: "Runtime.Widget.Gallery.Gallery",
	extends: Runtime.Component,
	methods:
	{
		renderItem: function(pos)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			__v.push(this.renderSlot("default", Runtime.Map.create({
				"pos": pos,
				"item": this.model.items.get(pos),
				"onClick": () =>
				{
					this.onClick(pos);
				},
			})));
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_gallery", this.class, componentHash])}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["widget_gallery__items", componentHash])}));
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				__v1.push(this.renderItem(i));
			}
			__v0.push(this.renderWidget(this.model.dialog));
			
			return __v;
		},
		/**
		 * On click
		 */
		onClick: function(pos)
		{
			this.model.dialog.select(pos);
			this.model.dialog.show();
		},
		getClassName: function(){ return "Runtime.Widget.Gallery.Gallery"; },
	},
	getComponentStyle: function(){ return ".widget_gallery__items.h-9a67{display: flex;align-items: center;justify-content: space-around;flex-wrap: wrap}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Gallery.Gallery"] = Runtime.Widget.Gallery.Gallery;