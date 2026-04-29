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
Runtime.WordPress.Theme.Components.Captcha = {
	name: "Runtime.WordPress.Theme.Components.Captcha",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["captcha", componentHash])}));
			
			/* Element div */
			let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["captcha__label", componentHash])}));
			__v1.push("Введите код, указанный на картинке");
			
			/* Element div */
			let __v2 = __v0.element("div", new Runtime.Map({"class": rs.className(["captcha__wrap", componentHash])}));
			
			/* Element div */
			let __v3 = __v2.element("div", new Runtime.Map({"class": rs.className(["captcha__image", componentHash])}));
			
			/* Element img */
			__v3.element("img", new Runtime.Map({"@ref": "image"}));
			
			/* Element button */
			let __v4 = __v3.element("button", new Runtime.Map({"class": rs.className(["reload", componentHash]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
			{
				this.reloadImage();
			})}));
			__v4.push("Reload image");
			
			/* Element div */
			let __v5 = __v2.element("div", new Runtime.Map({"class": rs.className(["captcha__input", componentHash])}));
			
			/* Element Runtime.Widget.Input */
			__v5.element("Runtime.Widget.Input", new Runtime.Map({"onChange": this.onChange}));
			
			return __v;
		},
		/**
		 * Reload image
		 */
		reloadImage: function()
		{
			let image = this.getRef("image");
			image.src = this.constructor.getImageHref();
		},
		/**
		 * Change event
		 */
		onChange: function(e)
		{
			let input = this.getRef("input");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": input.value,
				"old_value": this.value,
				"data": this.data,
			})));
		},
		getClassName: function(){ return "Runtime.WordPress.Theme.Components.Captcha"; },
	},
	/**
	 * Returns image href
	 */
	getImageHref: function()
	{
		return "/generate_captcha/?_" + String(Runtime.DateTime.now().timestamp()) + String(Runtime.rtl.urandom());
	},
	getComponentStyle: function(){ return ".captcha__label.h-6ea1{font-weight: bold;margin-bottom: 5px}.captcha__wrap.h-6ea1{display: flex;align-items: center;justify-content: space-between}.captcha__image.h-6ea1{width: 225px;padding-right: 10px}.captcha__input.h-6ea1{width: 50%;padding-left: 10px}.captcha__image.h-6ea1 img{height: 86px}.captcha__image.h-6ea1 img, .captcha__image.h-6ea1 .reload{width: 100%}.captcha__image.h-6ea1 .reload{cursor: pointer;background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea1 .reload:hover{background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea1 .reload:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Input"); },
};
window["Runtime.WordPress.Theme.Components.Captcha"] = Runtime.WordPress.Theme.Components.Captcha;