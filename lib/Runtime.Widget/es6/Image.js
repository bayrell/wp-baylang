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
Runtime.Widget.Image = {
	name: "Runtime.Widget.Image",
	extends: Runtime.Component,
	props: {
		src: {default: ""},
	},
	methods:
	{
		renderNoImage: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["image__no_image", componentHash])}));
			__v0.push("No image");
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.src)
			{
				/* Element img */
				__v.element("img", new Runtime.Map({"class": rs.className(["image", this.class, componentHash]), "src": this.layout.assets(this.src), "key": "image"}));
			}
			else
			{
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["image", this.class, componentHash]), "key": "no_image"}));
				__v0.push(this.renderNoImage());
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Image"; },
	},
	/**
	 * Returns widget params
	 */
	widgetParams: function()
	{
		return Runtime.Vector.create([
			Runtime.Map.create({
				"type": "param",
				"name": "src",
				"label": "Source",
				"component": "BayLang.Constructor.Frontend.Components.SelectImageButton",
			}),
		]);
	},
	getComponentStyle: function(){ return ".image.h-3404{display: inline-block}.image__no_image.h-3404{display: flex;align-items: center;justify-content: center;font-size: 20px;text-transform: uppercase;width: 270px;height: 70px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Image"] = Runtime.Widget.Image;