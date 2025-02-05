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
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["captcha"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["captcha__label"])});
			
			/* Text */
			this._t(__v1, "Введите код, указанный на картинке");
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["captcha__wrap"])});
			
			/* Element 'div' */
			let __v3 = this._e(__v2, "div", {"class":this._class_name(["captcha__image"])});
			
			/* Element 'img' */
			let __v4 = this._e(__v3, "img", {"ref":"image"});
			
			/* Element 'button' */
			let __v5 = this._e(__v3, "button", {"onClick":"reloadImage","class":this._class_name(["reload"])});
			
			/* Text */
			this._t(__v5, "Reload image");
			
			/* Element 'div' */
			let __v6 = this._e(__v2, "div", {"class":this._class_name(["captcha__input"])});
			
			/* Component 'Input' */
			let __v7 = this._c(__v6, "Runtime.Widget.Input", {"onChange":this.onChange});
			
			return this._flatten(__v);
		},
		/**
 * Reload image
 */
		reloadImage: function()
		{
			var image = this.getRef("image");
			image.src = this.$options.getImageHref();
		},
		/**
 * Change event
 */
		onChange: function(e)
		{
			var input = this.getRef("input");
			/* Send value change */
			this.emit("valueChange", new Runtime.Web.Messages.ValueChangeMessage(Runtime.Map.from({"value":input.value,"old_value":this.value,"data":this.data})));
		},
	},
};
Object.assign(Runtime.WordPress.Theme.Components.Captcha,
{
	/**
 * Returns image href
 */
	getImageHref: function()
	{
		return "/generate_captcha/?_" + Runtime.rtl.toStr(Runtime.DateTime.now().timestamp()) + Runtime.rtl.toStr(Runtime.rtl.urandom());
	},
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".captcha__label.h-6ea2{font-weight: bold;margin-bottom: 5px}.captcha__wrap.h-6ea2{display: flex;align-items: center;justify-content: space-between}.captcha__image.h-6ea2{width: 225px;padding-right: 10px}.captcha__input.h-6ea2{width: 50%;padding-left: 10px}.captcha__image.h-6ea2 img{height: 86px}.captcha__image.h-6ea2 img,.captcha__image.h-6ea2 .reload{width: 100%}.captcha__image.h-6ea2 .reload{cursor: pointer;background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea2 .reload:hover{background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea2 .reload:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Captcha";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Captcha);
window["Runtime.WordPress.Theme.Components.Captcha"] = Runtime.WordPress.Theme.Components.Captcha;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Captcha;