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
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.Dialog = {
	name: "Runtime.Widget.Dialog.Dialog",
	extends: Runtime.Web.Component,
	methods:
	{
		renderTitle: function()
		{
			let __v = [];
			
			if (this.model.title != "")
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__title"])});
				
				/* Render */
				this._t(__v0, this.model.title);
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"])});
			
			/* Render */
			this._t(__v0, this.model.content);
			
			return this._flatten(__v);
		},
		renderButtons: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.buttons));
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.result));
			
			return this._flatten(__v);
		},
		renderDialog: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderTitle());
			
			/* Render */
			this._t(__v, this.renderContent());
			
			/* Render */
			this._t(__v, this.renderButtons());
			
			/* Render */
			this._t(__v, this.renderResult());
			
			return this._flatten(__v);
		},
		renderDialogContainer: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", this._merge_attrs({"class":this._class_name(["widget_dialog__container"])}, props));
			
			/* Render */
			this._t(__v0, this.renderDialog());
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":this.onDialogClick,"class":this._class_name(["widget_dialog", ((this.model.is_open) ? ("widget_dialog--open") : ("widget_dialog--hide")), this.$options.getStyles("widget_dialog", this.model.styles)])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_dialog__shadow"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"ref":"dialog_box","class":this._class_name(["widget_dialog__box"])});
			
			/* Element 'table' */
			let __v3 = this._e(__v2, "table", {"class":this._class_name(["widget_dialog__wrap"])});
			
			/* Element 'tbody' */
			let __v4 = this._e(__v3, "tbody", {});
			
			/* Element 'tr' */
			let __v5 = this._e(__v4, "tr", {});
			
			/* Element 'td' */
			let __v6 = this._e(__v5, "td", {"class":this._class_name(["widget_dialog__td"])});
			
			/* Render */
			this._t(__v6, this.renderDialogContainer());
			
			return this._flatten(__v);
		},
		getProps: function()
		{
			var styles = Runtime.Vector.from([]);
			if (this.model.width != "")
			{
				styles.push("max-width: " + Runtime.rtl.toStr(this.model.width));
			}
			return Runtime.Map.from({"style":styles.join(";")});
		},
		/**
 * On shadow click
 */
		onShadowClick: function()
		{
			if (!this.model.modal)
			{
				this.model.hide();
			}
		},
		/**
 * On dialog click
 */
		onDialogClick: function(e)
		{
			if (e.target.classList.contains("widget_dialog__td"))
			{
				this.onShadowClick();
			}
		},
		/**
 * Updated
 */
		onUpdated: function()
		{
			var elem = document.documentElement;
			var is_scroll_lock = elem.classList.contains("scroll-lock");
			if (this.model.is_open)
			{
				if (!is_scroll_lock)
				{
					elem.classList.add("scroll-lock");
					this.nextTick(() =>
					{
						var dialog_box = this.getRef("dialog_box");
						dialog_box.scrollTop = 0;
					});
				}
			}
			else
			{
				if (is_scroll_lock)
				{
					elem.classList.remove("scroll-lock");
				}
			}
		},
	},
};
Object.assign(Runtime.Widget.Dialog.Dialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.RowButtons","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog__box.h-a5bc,.widget_dialog__shadow.h-a5bc{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 1001}.widget_dialog__box.h-a5bc{overflow: auto;overflow-y: scroll;display: none}.widget_dialog--open.h-a5bc .widget_dialog__box{display: block}.widget_dialog__shadow.h-a5bc{background-color: #000;opacity: 0.2;overflow: hidden;display: none}.widget_dialog--open.h-a5bc .widget_dialog__shadow{display: block}.widget_dialog__wrap.h-a5bc{width: 100%;min-height: 100%}.widget_dialog__wrap.h-a5bc > tr > td{padding: 20px}.widget_dialog__container.h-a5bc{position: relative;padding: calc(var(--widget-space) * 3);background-color: white;border-radius: 4px;max-width: 600px;margin: calc(var(--widget-space) * 5) auto;width: auto;z-index: 1002;box-shadow: 2px 4px 10px 0px rgba(0,0,0,0.5);font-size: var(--widget-font-size)}.widget_dialog__title.h-a5bc{font-weight: bold;font-size: var(--widget-font-size-h2);text-align: left;margin: var(--widget-margin-h2);margin-top: 0}.widget_dialog__buttons.h-a598{margin: var(--widget-margin-h2);margin-bottom: 0}.widget_dialog__buttons.h-a598 .widget_button.h-8dd7{min-width: 70px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.Dialog);
window["Runtime.Widget.Dialog.Dialog"] = Runtime.Widget.Dialog.Dialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.Dialog;