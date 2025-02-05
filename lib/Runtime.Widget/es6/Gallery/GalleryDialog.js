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
if (typeof Runtime.Widget.Gallery == 'undefined') Runtime.Widget.Gallery = {};
Runtime.Widget.Gallery.GalleryDialog = {
	name: "Runtime.Widget.Gallery.GalleryDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderDialogContainer: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":this.onContainerClick,"class":this._class_name(["widget_dialog__container--photo", ((this.model.getImageContains()) ? ("widget_dialog__container--photo_contain") : (""))])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_dialog__image"])});
			
			/* Component 'Button' */
			let __v2 = this._c(__v1, "Runtime.Widget.Button", {"onClick":() =>
			{
				this.model.hide();
			},"class":this._class_name(["widget_dialog__close"])}, () => {
				let __v = [];
				
				/* Text */
				this._t(__v, "x");
				
				return this._flatten(__v);
			});
			
			/* Element 'img' */
			let __v3 = this._e(__v1, "img", {"src":this.model.getCurrentImage(),"unselectable":"on"});
			
			/* Element 'div' */
			let __v4 = this._e(__v0, "div", {"class":this._class_name(["widget_dialog__clear"])});
			
			/* Element 'div' */
			let __v5 = this._e(__v0, "div", {"onClick":() =>
			{
				this.model.prev();
			},"class":this._class_name(["widget_dialog__arrow widget_dialog__arrow--left"])});
			
			/* Element 'div' */
			let __v6 = this._e(__v0, "div", {"onClick":() =>
			{
				this.model.next();
			},"class":this._class_name(["widget_dialog__arrow widget_dialog__arrow--right"])});
			
			return this._flatten(__v);
		},
		/**
 * On container click
 */
		onContainerClick: function(e)
		{
			if (e.target.classList.contains("widget_dialog__arrow") || e.target.classList.contains("widget_dialog__clear") || e.target.classList.contains("widget_dialog__close") || e.target.tagName == "IMG")
			{
				return ;
			}
			this.onShadowClick();
		},
	},
};
Object.assign(Runtime.Widget.Gallery.GalleryDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog__container--photo.h-ebbd{max-width: 1000px;background: transparent;border: 0px transparent solid;padding: 0px;margin: calc(var(--widget-space) * 5) auto;text-align: center}.widget_dialog__arrow.h-ebbd{position: fixed;top: calc(50% - 15px);cursor: pointer;opacity: 0.7}.widget_dialog__arrow.h-ebbd:before,.widget_dialog__arrow.h-ebbd:after{position: absolute;display: block;content: '';width: 0;height: 0;left: 0;top: 0}.widget_dialog__arrow.h-ebbd:hover{opacity: 0.8}.widget_dialog__arrow.h-ebbd:focus{outline: 0}.widget_dialog__arrow.h-ebbd:active{outline: 0;top: calc(50% - 14px)}.widget_dialog__arrow--left.h-ebbd{left: 10px}.widget_dialog__arrow--left.h-ebbd:before{border-top: 40px solid transparent;border-bottom: 40px solid transparent;border-right: 45px solid #3F3F3F}.widget_dialog__arrow--left.h-ebbd:after{left: 6px;top: 10px;border-top: 30px solid transparent;border-bottom: 30px solid transparent;border-right: 35px solid #FFF}.widget_dialog__arrow--right.h-ebbd{right: 70px}.widget_dialog__arrow--right.h-ebbd:before{border-top: 40px solid transparent;border-bottom: 40px solid transparent;border-left: 45px solid #3F3F3F}.widget_dialog__arrow--right.h-ebbd:after{left: 4px;top: 10px;border-top: 30px solid transparent;border-bottom: 30px solid transparent;border-left: 35px solid #FFF}.widget_dialog__image.h-ebbd{position: relative;display: inline-block}.widget_dialog__image.h-ebbd img{max-width: 100%;user-select: none}.widget_dialog__close.h-ebbd{position: absolute;display: flex;align-items: center;justify-content: center;margin: 10px;width: 42px;height: 34px;top: 0;right: 0;font-size: 20px;font-weight: bold;text-transform: uppercase;background-color: #fff;border: 1px #d9d9d9 solid;cursor: pointer;border-radius: 5px}.widget_dialog__shadow.h-ebbd{opacity: 0.5}.widget_dialog__clear.h-ebbd{clear: both}.widget_dialog__container--photo_contain.h-ebbd{text-align: center}.widget_dialog__container--photo_contain.h-ebbd .widget_dialog__image.h-ebbd img{max-width: 100%;max-height: calc(100vh - 50px);user-select: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Gallery.GalleryDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Gallery.GalleryDialog);
window["Runtime.Widget.Gallery.GalleryDialog"] = Runtime.Widget.Gallery.GalleryDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Gallery.GalleryDialog;