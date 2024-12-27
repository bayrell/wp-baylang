"use strict;"
/*!
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
if (typeof BayLang.Constructor.WidgetPage == 'undefined') BayLang.Constructor.WidgetPage = {};
BayLang.Constructor.WidgetPage.WidgetPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.WidgetPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.WidgetPage.WidgetPageModel.prototype.constructor = BayLang.Constructor.WidgetPage.WidgetPageModel;
Object.assign(BayLang.Constructor.WidgetPage.WidgetPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Get current widget name */
		this.current_widget_name = this.layout.request_query.get("widget_name");
		/* Create model based widget */
		if (this.constructor.isModelBased(this.current_widget_name))
		{
			this.widget_model = this.addWidget(this.current_widget_name, Runtime.Map.from({"widget_name":"widget_model"}));
		}
		else
		{
			this.widget_model = this.addWidget("Runtime.Web.BaseModel", Runtime.Map.from({"component":this.current_widget_name,"widget_name":"current_widget"}));
		}
		/* Add event listeners */
		var provider = Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
		provider.events.add("onBeforeUpdate", this.updateComponent.bind(this));
		provider.events.add("onMounted", this.addComponent.bind(this));
		provider.events.add("onUnmount", this.removeComponent.bind(this));
		window.addEventListener("message", (event) => { Vue.reactive(this).onPostMessage(event); });
	},
	/**
	 * Returns EditPageModel
	 */
	getEditPageModel: function()
	{
		var page_model = window.parent.app_layout.getPageModel();
		var page_model_class_name = page_model.constructor.getClassName();
		if (page_model_class_name != "BayLang.Constructor.Frontend.Editor.WidgetEditPageModel")
		{
			return null;
		}
		return page_model;
	},
	/**
	 * Convert tree_path to widget_path
	 */
	convertTreeToWidgetPath: function(path)
	{
		return path.insertIm(0, 0);
	},
	/**
	 * Convert widget_path to tree_path
	 */
	convertWidgetToTreePath: function(path)
	{
		return path.map((s) =>
		{
			return Runtime.rtl.toInt(s);
		}).slice(1);
	},
	/**
	 * Select item
	 */
	selectItem: function(path)
	{
		this.selected_path = path;
		if (path == null)
		{
			return ;
		}
		var widget_path_str = Runtime.rs.join(".", this.convertTreeToWidgetPath(path));
		var component = this.components.get(widget_path_str);
		var elem;
		/* Setup component */
		if (component)
		{
			elem = component.$el;
		}
		else
		{
			var selector = ".debug_component[data-widget-path=\"" + Runtime.rtl.toStr(widget_path_str) + Runtime.rtl.toStr("\"]");
			elem = document.querySelector(selector);
		}
		/* Setup element */
		this.selected_elem = elem;
		this.updateSelectedBox();
	},
	/**
	 * Returns components
	 */
	getComponents: function()
	{
		if (!this.widget_model)
		{
			return "";
		}
		if (!this.widget_model.component)
		{
			return "";
		}
		var res = Runtime.Vector.from([]);
		var cache = Runtime.Map.from({});
		var component = this.widget_model.component;
		var components = Runtime.Web.BaseLayoutModel._getRequiredComponents(res, cache, Runtime.Vector.from([component]));
		return components;
	},
	/**
	 * Add widget model
	 */
	addWidgetModel: function(widget_name, content)
	{
		content = Runtime.rs.substr(content, 5);
		content = "fn_new = function (){ return this.widget_model." + content + "; };";
		var fn_new = window.eval(content);
		fn_new = fn_new.bind(this);
		this.widget_model[widget_name] = fn_new();
	},
	/**
	 * Build render function
	 */
	buildRender: function(render_name)
	{
		if (render_name == undefined) render_name = "render";
		var page_model = this.getEditPageModel();
		if (!page_model)
		{
			return ;
		}
		/* Get content */
		var content = page_model.component_processor.buildRenderContent("render");
		/* log(content); */
		this.widget_component.render = window.eval("fn_new = " + content + ";");
		this.widget_component.reload();
		/* Update selected box */
		Runtime.Web.RenderProvider.nextTick(() =>
		{
			this.selectItem(this.selected_path);
			this.updateSelectedBox();
		});
		/* Update selected box */
		window.setTimeout(() =>
		{
			this.updateSelectedBox();
		}, 10);
	},
	/**
	 * Build CSS
	 */
	buildCSS: function()
	{
		var page_model = this.getEditPageModel();
		if (!page_model)
		{
			return ;
		}
		/* Get css content */
		var items = Runtime.Vector.from([]);
		items.push("var content = \"\";");
		items.appendItems(page_model.styles.getCSS().map((s) =>
		{
			return "content += Runtime.rtl.toStr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(");");
		}));
		items.push("return content;");
		var content = "fn_new = function (){" + Runtime.rtl.toStr(Runtime.rs.join("\n", items)) + Runtime.rtl.toStr("};");
		var fn_new = window.eval(content);
		fn_new = fn_new.bind(window.Runtime.Web.Component);
		this.widget_css = fn_new();
		/* Update selected box */
		Runtime.Web.RenderProvider.nextTick(() =>
		{
			this.updateSelectedBox();
		});
	},
	/**
	 * Build global CSS
	 */
	buildGlobalCSS: function()
	{
		var page_model = this.getEditPageModel();
		if (!page_model)
		{
			return ;
		}
		/* Get components */
		var components = page_model.component_processor.getComponents();
		components = this.layout.getComponents(components);
		components.removeValue(this.widget_model.component);
		var css = this.layout.constructor.getCss(components);
		/* Update style CSS */
		var style_element = document.querySelector("style.components");
		style_element.innerText = css;
	},
	/**
	 * Post message event
	 */
	onPostMessage: function(event)
	{
		if (!event.data)
		{
			return ;
		}
		var name = event.data.name;
		if (name == "add_widget_model")
		{
			this.addWidgetModel(event.data.widget, event.data.content);
		}
		else if (name == "update_css")
		{
			this.buildCSS();
		}
		else if (name == "update_global_css")
		{
			this.buildGlobalCSS();
		}
		else if (name == "update_render")
		{
			this.buildRender(event.data.render);
		}
		else if (name == "update_selected_box")
		{
			this.updateSelectedBox();
		}
		else if (name == "select_item")
		{
			var path = Runtime.rs.split(".", event.data.path);
			path = path.map((item) =>
			{
				return Runtime.rtl.to(item, {"e":"int"});
			});
			this.selectItem(path);
		}
	},
	/**
	 * Send message
	 */
	sendMessage: function(data)
	{
		window.parent.postMessage(data.toObject());
	},
	/**
	 * Send loaded
	 */
	sendAppLoaded: function()
	{
		this.sendMessage(Runtime.Map.from({"name":"app_loaded"}));
	},
	/**
	 * Send add widget
	 */
	sendAddWidget: function(path, kind)
	{
		this.sendMessage(Runtime.Map.from({"name":"add_widget","path":(path) ? (Runtime.rs.join(".", path)) : (null),"kind":kind}));
	},
	/**
	 * Send move widget
	 */
	sendMoveWidget: function(path, kind)
	{
		this.sendMessage(Runtime.Map.from({"name":"move_widget","path":(path) ? (Runtime.rs.join(".", path)) : (null),"kind":kind}));
	},
	/**
	 * Send remove widget
	 */
	sendRemoveWidget: function(path)
	{
		this.sendMessage(Runtime.Map.from({"name":"remove_widget","path":(path) ? (Runtime.rs.join(".", path)) : (null)}));
	},
	/**
	 * Send select item
	 */
	sendSelectItem: function(path)
	{
		this.sendMessage(Runtime.Map.from({"name":"select_item","path":(path) ? (Runtime.rs.join(".", path)) : (null)}));
	},
	/**
	 * Send context menu
	 */
	sendContextMenu: function(x, y)
	{
		this.sendMessage(Runtime.Map.from({"name":"context_menu","x":x,"y":y}));
	},
	/**
	 * Add component
	 */
	addComponent: function(component)
	{
		if (!component.data_widget_path)
		{
			return ;
		}
		component._old_data_widget_path = component.data_widget_path;
		this.components.set(component.data_widget_path, component);
	},
	/**
	 * Remove component
	 */
	removeComponent: function(component)
	{
		if (!component._old_data_widget_path)
		{
			return ;
		}
		this.components.remove(component._old_data_widget_path);
		component._old_data_widget_path = null;
	},
	/**
	 * Update component
	 */
	updateComponent: function(component)
	{
		var old_component = null;
		var old_data_widget_path = component._old_data_widget_path;
		var new_data_widget_path = component.data_widget_path;
		if (old_data_widget_path == new_data_widget_path)
		{
			return ;
		}
		/* Remove old component */
		old_component = (old_data_widget_path) ? (this.components.get(old_data_widget_path)) : (null);
		if (old_component)
		{
			this.removeComponent(old_component);
		}
		/* Remove new component */
		old_component = (new_data_widget_path) ? (this.components.get(new_data_widget_path)) : (null);
		if (old_component)
		{
			this.removeComponent(old_component);
		}
		/* Add new component */
		this.addComponent(component);
	},
	/**
	 * Update box styles
	 */
	updateSelectedBox: function()
	{
		if (this.selected_elem)
		{
			this.selected_box = this.constructor.getBoxStyles(this.selected_elem);
		}
		else
		{
			this.selected_box = null;
		}
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.WidgetPage.WidgetPage";
		this.current_widget_name = "";
		this.selected_box = null;
		this.selected_elem = null;
		this.selected_path = null;
		this.widget_component = null;
		this.widget_model = null;
		this.widget_css = "";
		this.components = Runtime.Map.from({});
	},
});
Object.assign(BayLang.Constructor.WidgetPage.WidgetPageModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.WidgetPage.WidgetPageModel,
{
	/**
	 * Is model based widget
	 */
	isModelBased: function(widget_name)
	{
		return Runtime.rs.substr(widget_name, -5) == "Model";
	},
	/**
	 * Returns box styles by element
	 */
	getBoxStyles: function(elem)
	{
		var left;
		var top;
		var width;
		var height;
		left = elem.offsetLeft;
		top = elem.offsetTop;
		width = elem.clientWidth - 2;
		height = elem.clientHeight - 2;
		var box = Runtime.Map.from({});
		box.set("left", Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: 1px","height: " + Runtime.rtl.toStr(height) + Runtime.rtl.toStr("px")])));
		box.set("top", Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: 1px"])));
		box.set("right", Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left + width) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: 1px","height: " + Runtime.rtl.toStr(height) + Runtime.rtl.toStr("px")])));
		box.set("bottom", Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top + height) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: 1px"])));
		box.set("box", Runtime.rs.join(";", Runtime.Vector.from(["left: " + Runtime.rtl.toStr(left) + Runtime.rtl.toStr("px"),"top: " + Runtime.rtl.toStr(top) + Runtime.rtl.toStr("px"),"width: " + Runtime.rtl.toStr(width) + Runtime.rtl.toStr("px"),"height: " + Runtime.rtl.toStr(height) + Runtime.rtl.toStr("px")])));
		return box;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetPageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BasePageModel";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetPageModel);
window["BayLang.Constructor.WidgetPage.WidgetPageModel"] = BayLang.Constructor.WidgetPage.WidgetPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetPageModel;