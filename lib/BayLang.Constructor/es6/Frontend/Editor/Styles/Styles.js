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
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
if (typeof BayLang.Constructor.Frontend.Editor.Styles == 'undefined') BayLang.Constructor.Frontend.Editor.Styles = {};
BayLang.Constructor.Frontend.Editor.Styles.Styles = {
	name: "BayLang.Constructor.Frontend.Editor.Styles.Styles",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			old_selector_name: "",
			add_dialog: new Runtime.Widget.Dialog.PromptDialogModel(Runtime.Map.from({"widget_name":"add_dialog","confirm_button":"Add","title":"Add new style","events":Runtime.Map.from({"confirm":new Runtime.Callback(this, "onAddStyle")})})),
			edit_dialog: new Runtime.Widget.Dialog.PromptDialogModel(Runtime.Map.from({"widget_name":"edit_dialog","confirm_button":"Rename","title":"Rename style","events":Runtime.Map.from({"confirm":new Runtime.Callback(this, "onRenameStyle")})})),
			delete_dialog: new Runtime.Widget.Dialog.ConfirmDialogModel(Runtime.Map.from({"widget_name":"delete_dialog","confirm_button":"Delete","title":"Delete style","events":Runtime.Map.from({"confirm":new Runtime.Callback(this, "onDeleteStyle")})})),
		};
	},
	methods:
	{
		renderStyle: function(selector_name)
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_style"]),"key":selector_name});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_style__name"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v1, "div", {"class":this._class_name(["widget_style__label"])});
			
			/* Render */
			this._t(__v2, selector_name);
			
			/* Element 'div' */
			let __v3 = this._e(__v1, "div", {"onClick":() =>
			{
				this.onEditClick(selector_name);
			},"class":this._class_name(["widget_style__button"])});
			
			/* Text */
			this._t(__v3, "[Edit]");
			
			/* Element 'div' */
			let __v4 = this._e(__v1, "div", {"onClick":() =>
			{
				this.onDeleteClick(selector_name);
			},"class":this._class_name(["widget_style__button"])});
			
			/* Text */
			this._t(__v4, "[Delete]");
			
			/* Element 'div' */
			let __v5 = this._e(__v0, "div", {"class":this._class_name(["widget_style__content"])});
			
			/* Component 'TextEditable' */
			let __v6 = this._c(__v5, "Runtime.Widget.TextEditable", {"name":selector_name,"value":this.model.getSelectorContent(selector_name),"onValueChange":(message) =>
			{
				this.model.changeSelectorContent(selector_name, message.value);
			},"class":this._class_name(["widget_style__editable overflow"])});
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_styles"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_styles__buttons"])});
			
			/* Component 'Button' */
			let __v2 = this._c(__v1, "Runtime.Widget.Button", {"styles":Runtime.Vector.from(["small"]),"onClick":this.onAddClick}, () => {
				let __v = [];
				
				/* Text */
				this._t(__v, "Add");
				
				return this._flatten(__v);
			});
			
			/* Element 'div' */
			let __v3 = this._e(__v0, "div", {"class":this._class_name(["widget_styles__items"])});
			let keys = this.model.selectors.keys().sort();
			
			for (let i = 0; i < keys.count(); i++)
			{
				/* Render */
				this._t(__v3, this.renderStyle(keys.get(i)));
			}
			
			/* Render */
			this._t(__v0, this.renderWidget(this.add_dialog));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.edit_dialog));
			
			/* Render */
			this._t(__v0, this.renderWidget(this.delete_dialog));
			
			return this._flatten(__v);
		},
		/**
 * Add dialog
 */
		onAddClick: function()
		{
			this.add_dialog.setValue("");
			this.add_dialog.show();
		},
		/**
 * Edit click
 */
		onEditClick: function(selector_name)
		{
			this.old_selector_name = selector_name;
			this.edit_dialog.setTitle("Rename style " + Runtime.rtl.toStr(selector_name));
			this.edit_dialog.setValue(selector_name);
			this.edit_dialog.show();
		},
		/**
 * Delete click
 */
		onDeleteClick: function(selector_name)
		{
			this.old_selector_name = selector_name;
			this.delete_dialog.setTitle("Delete style " + Runtime.rtl.toStr(selector_name));
			this.delete_dialog.show();
		},
		/**
 * Add style
 */
		onAddStyle: function(message)
		{
			var selector_name = message.value;
			if (Runtime.rs.charAt(selector_name, 0) != ".")
			{
				selector_name = "." + Runtime.rtl.toStr(selector_name);
			}
			if (this.model.selectors.has(selector_name))
			{
				throw new Runtime.Widget.Dialog.DialogModelException("selector " + Runtime.rtl.toStr(selector_name) + Runtime.rtl.toStr(" allready exists"))
			}
			this.model.changeSelectorContent(selector_name, "");
		},
		/**
 * Rename style
 */
		onRenameStyle: function(message)
		{
			var new_selector_name = message.value;
			if (Runtime.rs.charAt(new_selector_name, 0) != ".")
			{
				new_selector_name = "." + Runtime.rtl.toStr(new_selector_name);
			}
			if (this.model.selectors.has(new_selector_name))
			{
				throw new Runtime.Widget.Dialog.DialogModelException(new_selector_name + Runtime.rtl.toStr(" allready exists"))
				return ;
			}
			/* Rename style */
			var css_content = this.model.getSelectorContent(this.old_selector_name);
			this.model.selectors.remove(this.old_selector_name);
			this.model.changeSelectorContent(new_selector_name, css_content);
		},
		/**
 * Delete style
 */
		onDeleteStyle: function()
		{
			this.model.changeSelectorContent(this.old_selector_name, "");
			this.model.selectors.remove(this.old_selector_name);
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.Styles.Styles,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.TextEditable","Runtime.Widget.Dialog.PromptDialog"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_styles__buttons.h-f84f{padding-bottom: 5px}.widget_styles__items.h-f84f{border: 1px var(--widget-color-border) solid;border-bottom: 0px}.widget_style__name.h-f84f{display: flex;padding: 5px;gap: 5px;background-color: aliceblue;border-bottom: 1px var(--widget-color-border) solid;width: 100%}.widget_style__label.h-f84f{flex: 1;overflow-wrap: anywhere}.widget_style__button.h-f84f{cursor: pointer;font-size: 12px}.widget_style__button.h-f84f:hover{text-decoration: underline}.widget_style__name.h-f84f:hover .widget_style__button{display: block}.widget_style__content.h-f84f{padding: 5px;border-bottom: 1px var(--widget-color-border) solid}.widget_style__editable.h-f84f{border: 0;padding: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.Styles";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Styles.Styles);
window["BayLang.Constructor.Frontend.Editor.Styles.Styles"] = BayLang.Constructor.Frontend.Editor.Styles.Styles;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Styles.Styles;