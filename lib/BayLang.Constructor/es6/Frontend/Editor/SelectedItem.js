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
BayLang.Constructor.Frontend.Editor.SelectedItem = {
	name: "BayLang.Constructor.Frontend.Editor.SelectedItem",
	extends: Runtime.Web.Component,
	props: {
		"type": {
			default: "params",
		},
	},
	data: function ()
	{
		return {
			current_tab: "params",
			tabs_items: Runtime.Vector.from([Runtime.Map.from({"key":"Params","value":"params"}),Runtime.Map.from({"key":"Styles","value":"styles"}),Runtime.Map.from({"key":"CSS","value":"css"})]),
		};
	},
	methods:
	{
		renderInput: function(selector, key, label, default_value)
		{
			if (default_value == undefined) default_value = "";
			let __v = [];
			let value = this.getCSSValue(selector, key, default_value);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_css__row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_css__key"])});
			
			/* Render */
			this._t(__v1, (label) ? (label) : (key));
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_css__value"])});
			
			/* Component 'Input' */
			let __v3 = this._c(__v2, "Runtime.Widget.Input", {"value":value,"onValueChange":(message) =>
			{
				this.setCSSValue(selector, key, message.value);
			}});
			
			return this._flatten(__v);
		},
		renderSelect: function(selector, key, label, options)
		{
			let __v = [];
			let value = this.getCSSValue(selector, key);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_css__row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_css__key"])});
			
			/* Render */
			this._t(__v1, (label) ? (label) : (key));
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_css__value"])});
			
			/* Component 'Select' */
			let __v3 = this._c(__v2, "Runtime.Widget.Select", {"value":value,"options":options,"onValueChange":(message) =>
			{
				this.setCSSValue(selector, key, message.value);
			}});
			
			return this._flatten(__v);
		},
		renderSelectImage: function(selector, key, label)
		{
			let __v = [];
			let value = this.getCSSValue(selector, key);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_css__row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_css__key"])});
			
			/* Render */
			this._t(__v1, (label) ? (label) : (key));
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_css__value"])});
			
			/* Component 'SelectImageButton' */
			let __v3 = this._c(__v2, "BayLang.Constructor.Frontend.Components.SelectImageButton", {"onValueChange":(message) =>
			{
				this.setCSSValue(selector, key, message.value);
			}});
			
			return this._flatten(__v);
		},
		renderComponentName: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_param__row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_param__label"])});
			
			/* Text */
			this._t(__v1, "Component");
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_param__content"])});
			
			/* Render */
			this._t(__v2, this.model.selected.widget.code.tag_name);
			
			return this._flatten(__v);
		},
		renderWidgetName: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_param__row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_param__label"])});
			
			/* Element 'div' */
			let __v2 = this._e(__v1, "div", {"class":this._class_name(["widget_param__text"])});
			
			/* Element 'div' */
			let __v3 = this._e(__v2, "div", {"class":this._class_name(["widget_param__text_label"])});
			
			/* Text */
			this._t(__v3, "Name");
			
			/* Element 'div' */
			let __v4 = this._e(__v2, "div", {"onClick":() =>
			{
				this.model.renameSelectedItem();
			},"class":this._class_name(["widget_param__text_button"])});
			
			/* Text */
			this._t(__v4, "[Edit]");
			
			/* Element 'div' */
			let __v5 = this._e(__v0, "div", {"class":this._class_name(["widget_param__content"])});
			
			/* Render */
			this._t(__v5, this.model.selected.widget.param_widget_name.value);
			
			return this._flatten(__v);
		},
		renderClassName: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_param__row"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_param__label"])});
			
			/* Text */
			this._t(__v1, "Class");
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_param__content"])});
			
			/* Component 'Tag' */
			let __v3 = this._c(__v2, "Runtime.Widget.Tag", {"value":this.model.selected.widget.param_class_name.value.slice(),"onValueChange":(message) =>
			{
				this.model.selected.widget.param_class_name.changeValue(message.value);
				this.model.updateFrameRender();
			}});
			
			return this._flatten(__v);
		},
		renderParams: function()
		{
			let __v = [];
			
			for (let i = 0; i < this.model.selected.widget.params.count(); i++)
			{
				let param = this.model.selected.widget.params.get(i);
				
				if (param.display)
				{
					let item_props = param.props;
					let class_name = param.component;
					
					/* Element 'div' */
					let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_param__row"])});
					
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_param__label"])});
					
					/* Render */
					this._t(__v1, param.label);
					
					/* Element 'div' */
					let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_param__content"])});
					
					if (this.isAllowClassName(class_name))
					{
						/* Component '{class_name}' */
						let __v3 = this._c(__v2, class_name, this._merge_attrs({"value":param.value,"onValueChange":(message) =>
						{
							param.changeValue(message.value);
							this.model.updateFrameRender();
						}}, item_props));
					}
				}
			}
			
			return this._flatten(__v);
		},
		renderStyles: function()
		{
			let __v = [];
			let settings = this.model.selected.widget.settings;
			let selector = this.model.selected.widget.getSelector();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v1, "Common");
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v2, this.renderInput(selector, "width", ""));
			
			/* Render */
			this._t(__v2, this.renderInput(selector, "height", ""));
			
			/* Render */
			this._t(__v2, this.renderInput(selector, "min-width", ""));
			
			/* Render */
			this._t(__v2, this.renderInput(selector, "min-height", ""));
			
			if (settings && this.isContainer(settings))
			{
				/* Element 'div' */
				let __v3 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
				
				/* Element 'div' */
				let __v4 = this._e(__v3, "div", {"class":this._class_name(["widget_css__label"])});
				
				/* Text */
				this._t(__v4, "Flex");
				
				/* Element 'div' */
				let __v5 = this._e(__v3, "div", {"class":this._class_name(["widget_css__items"])});
				
				/* Render */
				this._t(__v5, this.renderSelect(selector, "display", "", Runtime.Vector.from([Runtime.Map.from({"key":"block","value":"block"}),Runtime.Map.from({"key":"flex","value":"flex"})])));
				
				/* Render */
				this._t(__v5, this.renderSelect(selector, "align-items", "", Runtime.Vector.from([Runtime.Map.from({"key":"baseline","value":"baseline"}),Runtime.Map.from({"key":"center","value":"center"}),Runtime.Map.from({"key":"end","value":"end"}),Runtime.Map.from({"key":"flex-end","value":"flex-end"}),Runtime.Map.from({"key":"flex-start","value":"flex-start"}),Runtime.Map.from({"key":"start","value":"start"}),Runtime.Map.from({"key":"stretch","value":"stretch"}),Runtime.Map.from({"key":"revert","value":"revert"})])));
				
				/* Render */
				this._t(__v5, this.renderSelect(selector, "justify-content", "", Runtime.Vector.from([Runtime.Map.from({"key":"left","value":"left"}),Runtime.Map.from({"key":"center","value":"center"}),Runtime.Map.from({"key":"right","value":"right"}),Runtime.Map.from({"key":"space-around","value":"space-around"}),Runtime.Map.from({"key":"space-between","value":"space-between"}),Runtime.Map.from({"key":"start","value":"start"}),Runtime.Map.from({"key":"stretch","value":"stretch"}),Runtime.Map.from({"key":"end","value":"end"})])));
				
				/* Render */
				this._t(__v5, this.renderSelect(selector, "flex-wrap", "", Runtime.Vector.from([Runtime.Map.from({"key":"nowrap","value":"nowrap"}),Runtime.Map.from({"key":"wrap","value":"wrap"})])));
				
				/* Render */
				this._t(__v5, this.renderInput(selector, "gap", ""));
			}
			
			/* Element 'div' */
			let __v6 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v7 = this._e(__v6, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v7, "Padding");
			
			/* Element 'div' */
			let __v8 = this._e(__v6, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v8, this.renderInput(selector, "padding-top", ""));
			
			/* Render */
			this._t(__v8, this.renderInput(selector, "padding-bottom", ""));
			
			/* Render */
			this._t(__v8, this.renderInput(selector, "padding-left", ""));
			
			/* Render */
			this._t(__v8, this.renderInput(selector, "padding-right", ""));
			
			/* Element 'div' */
			let __v9 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v10 = this._e(__v9, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v10, "Margin");
			
			/* Element 'div' */
			let __v11 = this._e(__v9, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v11, this.renderInput(selector, "margin-top", ""));
			
			/* Render */
			this._t(__v11, this.renderInput(selector, "margin-bottom", ""));
			
			/* Render */
			this._t(__v11, this.renderInput(selector, "margin-left", ""));
			
			/* Render */
			this._t(__v11, this.renderInput(selector, "margin-right", ""));
			
			/* Element 'div' */
			let __v12 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v13 = this._e(__v12, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v13, "Font");
			
			/* Element 'div' */
			let __v14 = this._e(__v12, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v14, this.renderInput(selector, "color", ""));
			
			/* Render */
			this._t(__v14, this.renderInput(selector, "font-size", ""));
			
			/* Render */
			this._t(__v14, this.renderSelect(selector, "font-weight", "", Runtime.Vector.from([Runtime.Map.from({"key":"light","value":"lighter"}),Runtime.Map.from({"key":"normal","value":"normal"}),Runtime.Map.from({"key":"bold","value":"bold"}),Runtime.Map.from({"key":"bolder","value":"bolder"}),Runtime.Map.from({"key":"100","value":"100"}),Runtime.Map.from({"key":"200","value":"200"}),Runtime.Map.from({"key":"300","value":"300"}),Runtime.Map.from({"key":"400","value":"400"}),Runtime.Map.from({"key":"500","value":"500"}),Runtime.Map.from({"key":"600","value":"600"}),Runtime.Map.from({"key":"700","value":"700"}),Runtime.Map.from({"key":"800","value":"800"}),Runtime.Map.from({"key":"900","value":"900"})])));
			
			/* Render */
			this._t(__v14, this.renderSelect(selector, "text-align", "", Runtime.Vector.from([Runtime.Map.from({"key":"left","value":"left"}),Runtime.Map.from({"key":"center","value":"center"}),Runtime.Map.from({"key":"right","value":"right"}),Runtime.Map.from({"key":"justify","value":"justify"})])));
			
			/* Render */
			this._t(__v14, this.renderSelect(selector, "text-transform", "", Runtime.Vector.from([Runtime.Map.from({"key":"capitalize","value":"capitalize"}),Runtime.Map.from({"key":"lowercase","value":"lowercase"}),Runtime.Map.from({"key":"uppercase","value":"uppercase"}),Runtime.Map.from({"key":"inherit","value":"inherit"}),Runtime.Map.from({"key":"none","value":"none"})])));
			
			/* Render */
			this._t(__v14, this.renderInput(selector, "line-height", ""));
			
			/* Element 'div' */
			let __v15 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v16 = this._e(__v15, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v16, "Border");
			
			/* Element 'div' */
			let __v17 = this._e(__v15, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v17, this.renderInput(selector, "border-color", ""));
			
			/* Render */
			this._t(__v17, this.renderSelect(selector, "border-style", "", Runtime.Vector.from([Runtime.Map.from({"key":"dashed","value":"dashed"}),Runtime.Map.from({"key":"dotted","value":"dotted"}),Runtime.Map.from({"key":"double","value":"double"}),Runtime.Map.from({"key":"hidden","value":"hidden"}),Runtime.Map.from({"key":"inset","value":"inset"}),Runtime.Map.from({"key":"none","value":"none"}),Runtime.Map.from({"key":"outset","value":"outset"}),Runtime.Map.from({"key":"solid","value":"solid"}),Runtime.Map.from({"key":"inherit","value":"inherit"}),Runtime.Map.from({"key":"unset","value":"unset"})])));
			
			/* Render */
			this._t(__v17, this.renderInput(selector, "border-width", ""));
			
			/* Render */
			this._t(__v17, this.renderInput(selector, "border-radius", ""));
			
			/* Element 'div' */
			let __v18 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v19 = this._e(__v18, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v19, "Background");
			
			/* Element 'div' */
			let __v20 = this._e(__v18, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v20, this.renderInput(selector, "background-color", "Color"));
			
			/* Render */
			this._t(__v20, this.renderSelectImage(selector, "background-image", "Image"));
			
			/* Render */
			this._t(__v20, this.renderInput(selector, "background-position", "Position"));
			
			/* Render */
			this._t(__v20, this.renderSelect(selector, "background-repeat", "Repeat", Runtime.Vector.from([Runtime.Map.from({"key":"repeat","value":"repeat"}),Runtime.Map.from({"key":"repeat-x","value":"repeat-x"}),Runtime.Map.from({"key":"repeat-y","value":"repeat-y"}),Runtime.Map.from({"key":"no-repeat","value":"no-repeat"})])));
			
			/* Render */
			this._t(__v20, this.renderSelect(selector, "background-size", "Size", Runtime.Vector.from([Runtime.Map.from({"key":"contain","value":"contain"}),Runtime.Map.from({"key":"cover","value":"cover"})])));
			
			/* Element 'div' */
			let __v21 = this._e(__v, "div", {"class":this._class_name(["widget_css__content"])});
			
			/* Element 'div' */
			let __v22 = this._e(__v21, "div", {"class":this._class_name(["widget_css__label"])});
			
			/* Text */
			this._t(__v22, "CSS");
			
			/* Element 'div' */
			let __v23 = this._e(__v21, "div", {"class":this._class_name(["widget_css__items"])});
			
			/* Render */
			this._t(__v23, this.renderCSS());
			
			return this._flatten(__v);
		},
		renderCSS: function()
		{
			let __v = [];
			let selector_name = this.model.selected.widget.getSelectorName();
			
			/* Component 'TextEditable' */
			let __v0 = this._c(__v, "Runtime.Widget.TextEditable", {"value":this.model.styles.getSelectorContent(selector_name),"onValueChange":(message) =>
			{
				this.model.styles.changeSelectorContent(selector_name, message.value);
			},"class":this._class_name(["overflow"])});
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_param"])});
			
			if (this.model.selected.widget)
			{
				/* Render info */
				/* Render */
				this._t(__v0, this.renderComponentName());
				
				/* Render */
				this._t(__v0, this.renderWidgetName());
				
				/* Render */
				this._t(__v0, this.renderClassName());
				
				/* Render css */
				if (this.type == "css")
				{
					/* Render */
					this._t(__v0, this.renderStyles());
				}
				
				/* Render params */
				if (this.type == "params")
				{
					/* Render */
					this._t(__v0, this.renderParams());
				}
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns true if class name is allowed
 */
		isAllowClassName: function(class_name)
		{
			if (class_name == "Runtime.Widget.Input")
			{
				return true;
			}
			if (class_name == "Runtime.Widget.Select")
			{
				return true;
			}
			if (class_name == "Runtime.Widget.SortableList")
			{
				return true;
			}
			if (class_name == "Runtime.Widget.Tag")
			{
				return true;
			}
			if (class_name == "Runtime.Widget.TextArea")
			{
				return true;
			}
			if (class_name == "Runtime.Widget.TextEditable")
			{
				return true;
			}
			if (class_name == "BayLang.Constructor.Frontend.Components.SelectImageButton")
			{
				return true;
			}
			if (class_name == "BayLang.Constructor.Frontend.Components.SortableParams")
			{
				return true;
			}
			return false;
		},
		/**
 * Returns true if widget is container
 */
		isContainer: function(settings)
		{
			if (!settings)
			{
				return false;
			}
			var iframe_window = this.model.getFrameWindow();
			return iframe_window.Runtime.rtl.is_instanceof(settings, "Runtime.Widget.WidgetSettings.Settings.ContainerSettings");
		},
		/**
 * Returns css value
 */
		getCSSValue: function(selector, key, default_value)
		{
			if (default_value == undefined) default_value = "";
			if (selector == null)
			{
				return default_value;
			}
			var value = selector.getStyle(key);
			return (value) ? (value.getValue()) : (default_value);
		},
		/**
 * Set css value
 */
		setCSSValue: function(selector, key, value)
		{
			if (value == undefined) value = "";
			if (!selector)
			{
				var selector_name = this.model.selected.widget.getSelectorName();
				selector = this.model.styles.createSelector(selector_name);
			}
			selector.changeStyleValue(key, value);
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Editor.SelectedItem,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.Select","Runtime.Widget.Tag","Runtime.Widget.TextArea","Runtime.Widget.TextEditable","BayLang.Constructor.Frontend.Components.SelectImageButton","BayLang.Constructor.Frontend.Components.SortableParams","BayLang.Constructor.Frontend.Editor.WidgetStyle"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_param.h-c425{padding-bottom: 20px}.widget_param__row.h-c425{margin-bottom: 10px}.widget_param__label.h-c425{margin-bottom: 5px}.widget_param__title.h-c425{margin-bottom: 5px}.widget_param__text.h-c425{display: flex;gap: 10px}.widget_param__text_label.h-c425{overflow-wrap: anywhere}.widget_param__text_button.h-c425{cursor: pointer}.widget_param__text_button.h-c425:hover{text-decoration: underline}.widget_param.h-c425 .widget_select.h-d72d{padding: 7px;min-height: 37px}.widget_param.h-c425 .widget_input.h-f2df,.widget_param.h-c425 .widget_textarea.h-ee82{padding: 7px}.widget_param.h-c425 .widget_textarea.h-ee82{font-family: 'PT Mono';line-height: 1.5}.widget_css__label.h-c425{text-align: center;background-color: aliceblue;padding: 5px;margin-bottom: 5px}.widget_css__row.h-c425{display: flex;align-items: center;margin-bottom: 5px}.widget_css__key.h-c425{width: 100px}.widget_css__value.h-c425{width: calc(100% - 100px)}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.SelectedItem";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.SelectedItem);
window["BayLang.Constructor.Frontend.Editor.SelectedItem"] = BayLang.Constructor.Frontend.Editor.SelectedItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.SelectedItem;