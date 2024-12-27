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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.Form = {
	name: "Runtime.Widget.Form.Form",
	extends: Runtime.Web.Component,
	methods:
	{
		renderTitle: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderSlot("title"));
			
			return this._flatten(__v);
		},
		renderField: function(field)
		{
			let __v = [];
			let field_name = field.get("name");
			let field_model = field.get("model", null);
			let field_calculate = field.get("calculate", null);
			let field_component = field.get("component");
			let field_props = field.get("props", Runtime.Map.from({}));
			let value = "";
			let data = Runtime.Map.from({"item":this.model.item,"field_name":field_name,"form":this.model});
			
			if (field_calculate)
			{
				value = Runtime.rtl.apply(field_calculate, Runtime.Vector.from([data]));
			}
			else
			{
				value = this.model.getItemValue(field_name);
			}
			let _ = data.set("value", value);
			
			if (field_component != null)
			{
				/* Component '{field_component}' */
				let __v0 = this._c(__v, field_component, this._merge_attrs({"value":value,"name":field_name,"ref":"field_" + Runtime.rtl.toStr(field_name),"model":this._model(field_model),"onValueChange":(message) =>
				{
					return this.model.onFieldChange(field_name, message.value);
				},"data":data}, field_props));
			}
			else
			{
				/* Render */
				this._t(__v, this.renderWidget(field_model, field_props.concat(Runtime.Map.from({"name":field_name,"value":value,"data":data,"ref":"field_" + Runtime.rtl.toStr(field_name),"onValueChange":(message) =>
				{
					this.model.onFieldChange(field_name, message.value);
				}}))));
			}
			
			return this._flatten(__v);
		},
		renderFieldResult: function(field)
		{
			let __v = [];
			let field_name = field.get("name");
			let field_error = this.model.getFieldResult(field_name);
			
			if (field_error.count() == 0)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"data-name":field_name,"class":this._class_name(["widget_form__field_error widget_form__field_error--hide"]),"key":"result1"});
			}
			else
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"data-name":field_name,"class":this._class_name(["widget_form__field_error"]),"key":"result2"});
				
				for (let i = 0; i < field_error.count(); i++)
				{
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {});
					
					/* Render */
					this._t(__v2, field_error.get(i));
				}
			}
			
			return this._flatten(__v);
		},
		renderFieldLabel: function(field)
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {});
			
			/* Render */
			this._t(__v0, field.get("label"));
			
			return this._flatten(__v);
		},
		renderFieldButtons: function(field)
		{
			let __v = [];
			
			if (field.has("buttons"))
			{
				let buttons = field.get("buttons");
				
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_form__field_buttons"])});
				
				for (let i = 0; i < buttons.count(); i++)
				{
					let settings = buttons.get(i);
					let props = settings.get("props");
					let content = settings.get("content");
					
					/* Component 'Button' */
					let __v1 = this._c(__v0, "Runtime.Widget.Button", this._merge_attrs({"onClick":(e) =>
					{
						var event_name = settings.get("event");
						var component = this.getRef("field_" + Runtime.rtl.toStr(field.get("name")));
						var callback = new Runtime.Callback(component, event_name);
						callback.apply();
					}}, props));
				}
			}
			
			return this._flatten(__v);
		},
		renderFieldRow: function(field)
		{
			let __v = [];
			let field_name = field.get("name");
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"data-name":field_name,"class":this._class_name(["widget_form__field_row"]),"key":field_name});
			
			if (field.has("label"))
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_form__field_label"])});
				
				/* Render */
				this._t(__v1, this.renderFieldLabel(field));
				
				/* Render */
				this._t(__v1, this.renderFieldButtons(field));
			}
			
			/* Render */
			this._t(__v0, this.renderField(field));
			
			/* Render */
			this._t(__v0, this.renderFieldResult(field));
			
			return this._flatten(__v);
		},
		renderFields: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_form__fields"])});
			
			if (this.model)
			{
				for (let i = 0; i < this.model.fields.count(); i++)
				{
					/* Render */
					this._t(__v0, this.renderFieldRow(this.model.fields.get(i)));
				}
			}
			
			return this._flatten(__v);
		},
		renderBottomButtons: function()
		{
			let __v = [];
			
			if (this.model && this.model.bottom_buttons.count() > 0)
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.bottom_buttons));
			}
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			if (this.model && this.model.show_result)
			{
				/* Render */
				this._t(__v, this.renderWidget(this.model.result));
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_form", this.class])});
			
			/* Render */
			this._t(__v0, this.renderTitle());
			
			/* Render */
			this._t(__v0, this.renderFields());
			
			/* Render */
			this._t(__v0, this.renderBottomButtons());
			
			/* Render */
			this._t(__v0, this.renderResult());
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Form.Form,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.RowButtons","Runtime.Widget.TextArea","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_form.h-b6a8 .widget_form__field_row.h-b6a8{margin-bottom: 10px}.widget_form.h-b6a8 .widget_form__field_label.h-b6a8{display: flex;align-items: center;padding-bottom: 5px;gap: 5px}.widget_form.h-b6a8 .widget_form__field_error.h-b6a8{color: var(--widget-color-danger);margin-top: var(--widget-space)}.widget_form.h-b6a8 .widget_form__field_error--hide.h-b6a8{display: none}.widget_form.h-b6a8 .widget_form__bottom_buttons.h-a598{justify-content: center}.widget_form.fixed.h-b6a8{max-width: 600px;margin-left: auto;margin-right: auto}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.Form";
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
Runtime.rtl.defClass(Runtime.Widget.Form.Form);
window["Runtime.Widget.Form.Form"] = Runtime.Widget.Form.Form;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.Form;