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
BayLang.Constructor.WidgetPage.AppHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.AppHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
BayLang.Constructor.WidgetPage.AppHook.prototype.constructor = BayLang.Constructor.WidgetPage.AppHook;
Object.assign(BayLang.Constructor.WidgetPage.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CALL_API_BEFORE);
		this.register(this.constructor.VUE_MODULES);
	},
	/**
	 * Call api before
	 */
	call_api_before: function(params)
	{
		var post_data = params.get("post_data");
		var service = post_data.get("service");
		var api_name = post_data.get("api_name");
		var method_name = post_data.get("method_name");
		if (service != "constructor")
		{
			return ;
		}
		var api_url_arr = Runtime.Vector.from(["api","app",api_name,method_name]);
		api_url_arr = api_url_arr.filter((s) =>
		{
			return s != "";
		});
		var api_url = "/" + Runtime.rtl.toStr(api_url_arr.join("/")) + Runtime.rtl.toStr("/");
		params.set("api_url", api_url);
	},
	/**
	 * Init vue app
	 */
	vue_modules: function(params)
	{
		var registerComponent = null;
		registerComponent = () => {
			const mixin =
			{
				mounted: function () {
					this.$el.__component__ = this;
				},
				updated: function () {
					this.$el.__component__ = this;
				}
			};
			return {
				install: () => {
					vue_app.mixin(mixin);
				},
			};
		};
		var vue_app = params.get("vue");
		vue_app.use(registerComponent());
	},
});
Object.assign(BayLang.Constructor.WidgetPage.AppHook, Runtime.Web.Hooks.AppHook);
Object.assign(BayLang.Constructor.WidgetPage.AppHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.AppHook";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.AppHook);
window["BayLang.Constructor.WidgetPage.AppHook"] = BayLang.Constructor.WidgetPage.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.AppHook;
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
BayLang.Constructor.WidgetPage.EditorProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.EditorProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
BayLang.Constructor.WidgetPage.EditorProvider.prototype.constructor = BayLang.Constructor.WidgetPage.EditorProvider;
Object.assign(BayLang.Constructor.WidgetPage.EditorProvider.prototype,
{
	/**
	 * Add group
	 */
	addGroup: function(group)
	{
		var group_name = group.get("name");
		var item = this.groups.findItem(Runtime.lib.equalAttr("name", group_name));
		if (item != null)
		{
			return ;
		}
		this.groups.push(group);
	},
	/**
	 * Init provider
	 */
	init: async function()
	{
		/* Get widgets managers */
		var managers = Runtime.rtl.getContext().getEntities("BayLang.Constructor.WidgetPage.WidgetManagerAnnotation");
		for (var i = 0; i < managers.count(); i++)
		{
			var annotation = managers.get(i);
			this.managers.push(annotation.factory());
		}
		/* Get widgets */
		for (var i = 0; i < this.managers.count(); i++)
		{
			var manager = this.managers.get(i);
			/* Get groups settings */
			var groups = manager.getGroupSettings();
			var group_names = groups.keys();
			for (var j = 0; j < group_names.count(); j++)
			{
				var group_name = group_names.get(j);
				var group = groups.get(group_name);
				group.set("name", group_name);
				this.addGroup(group);
			}
			/* Get widgets settings */
			var widgets = manager.getWidgetSettings();
			for (var j = 0; j < widgets.count(); j++)
			{
				var widget_settings = widgets.get(j);
				/* Add widget */
				this.widgets.push(widget_settings);
				/* Add settings */
				this.settings.set(widget_settings.constructor.getClassName(), widget_settings);
				/* Add widget by model name */
				if (widget_settings.isModel())
				{
					this.settings.set(widget_settings.getModelName(), widget_settings);
				}
				else
				{
					this.settings.set(widget_settings.getComponentName(), widget_settings);
				}
			}
		}
		/* Widgets init */
		for (var i = 0; i < this.managers.count(); i++)
		{
			var manager = this.managers.get(i);
			manager.init(this);
		}
		/* Sort groups */
		this.groups = this.groups.sort(Runtime.lib.sortAttr("priority", "asc"));
	},
	/**
	 * Returns groups list
	 */
	getGroups: function()
	{
		return this.groups.slice();
	},
	/**
	 * Returns widgets list
	 */
	getWidgets: function()
	{
		return this.widgets.slice();
	},
	/**
	 * Returns widget settings
	 */
	get: function(class_name)
	{
		return this.settings.get(class_name);
	},
	/**
	 * Get model settings
	 */
	getModelSettings: function(widget)
	{
		/* Find settings */
		for (var i = 0; i < this.widgets.count(); i++)
		{
			var settings = this.widgets.get(i);
			if (!settings.isModel())
			{
				continue;
			}
			if (settings.checkWidget(widget))
			{
				return settings;
			}
		}
		return null;
	},
	/**
	 * Get widget settings
	 */
	getWidgetSettings: function(widget)
	{
		/* Find settings */
		for (var i = 0; i < this.widgets.count(); i++)
		{
			var settings = this.widgets.get(i);
			if (settings.isModel())
			{
				continue;
			}
			if (settings.checkWidget(widget))
			{
				return settings;
			}
		}
		return null;
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.groups = Runtime.Vector.from([]);
		this.managers = Runtime.Vector.from([]);
		this.widgets = Runtime.Vector.from([]);
		this.settings = Runtime.Map.from({});
	},
});
Object.assign(BayLang.Constructor.WidgetPage.EditorProvider, Runtime.BaseProvider);
Object.assign(BayLang.Constructor.WidgetPage.EditorProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.EditorProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.EditorProvider);
window["BayLang.Constructor.WidgetPage.EditorProvider"] = BayLang.Constructor.WidgetPage.EditorProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.EditorProvider;
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
BayLang.Constructor.WidgetPage.ParameterFactory = function()
{
	Runtime.Entity.Factory.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.ParameterFactory.prototype = Object.create(Runtime.Entity.Factory.prototype);
BayLang.Constructor.WidgetPage.ParameterFactory.prototype.constructor = BayLang.Constructor.WidgetPage.ParameterFactory;
Object.assign(BayLang.Constructor.WidgetPage.ParameterFactory.prototype,
{
	/**
	 * Factory
	 */
	factory: function(runtime)
	{
		var params = this.constructor.copy(runtime, this.params);
		return runtime.constructor.newInstance(this.name, Runtime.Vector.from([params]));
	},
});
Object.assign(BayLang.Constructor.WidgetPage.ParameterFactory, Runtime.Entity.Factory);
Object.assign(BayLang.Constructor.WidgetPage.ParameterFactory,
{
	/**
	 * Copy object to runtime
	 */
	copy: function(runtime, data)
	{
		var encoder = new Runtime.SerializerNative();
		var decoder = runtime.constructor.newInstance("Runtime.SerializerNative");
		var object = encoder.encode(data);
		return decoder.decode(object);
	},
	/**
	 * Restore object from runtime
	 */
	restore: function(runtime, data)
	{
		var decoder = new Runtime.SerializerNative();
		var encoder = runtime.constructor.newInstance("Runtime.SerializerNative");
		var object = encoder.encode(data);
		return decoder.decode(object);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.ParameterFactory";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Factory";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.ParameterFactory);
window["BayLang.Constructor.WidgetPage.ParameterFactory"] = BayLang.Constructor.WidgetPage.ParameterFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.ParameterFactory;
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
BayLang.Constructor.WidgetPage.WidgetManagerAnnotation = function()
{
	Runtime.Entity.Factory.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.WidgetManagerAnnotation.prototype = Object.create(Runtime.Entity.Factory.prototype);
BayLang.Constructor.WidgetPage.WidgetManagerAnnotation.prototype.constructor = BayLang.Constructor.WidgetPage.WidgetManagerAnnotation;
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation.prototype,
{
});
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation, Runtime.Entity.Factory);
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetManagerAnnotation";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Factory";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetManagerAnnotation);
window["BayLang.Constructor.WidgetPage.WidgetManagerAnnotation"] = BayLang.Constructor.WidgetPage.WidgetManagerAnnotation;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetManagerAnnotation;
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
BayLang.Constructor.WidgetPage.WidgetManagerInterface = function()
{
};
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerInterface.prototype,
{
	/**
	 * Init widgets
	 */
	init: function(provider)
	{
	},
	/**
	 * Returns group settings
	 */
	getGroupSettings: function()
	{
	},
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings: function()
	{
	},
});
Object.assign(BayLang.Constructor.WidgetPage.WidgetManagerInterface,
{
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetManagerInterface";
	},
});
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetManagerInterface);
window["BayLang.Constructor.WidgetPage.WidgetManagerInterface"] = BayLang.Constructor.WidgetPage.WidgetManagerInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetManagerInterface;
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
if (typeof BayLang.Constructor.WidgetPage == 'undefined') BayLang.Constructor.WidgetPage = {};
BayLang.Constructor.WidgetPage.WidgetPage = {
	name: "BayLang.Constructor.WidgetPage.WidgetPage",
	extends: Runtime.Web.Component,
	data: function ()
	{
		return {
			is_loaded: false,
		};
	},
	methods:
	{
		renderStyle: function()
		{
			let __v = [];
			
			/* Element 'style' */
			let __v0 = this._e(__v, "style", {});
			
			/* Render */
			this._t(__v0, this.model.widget_css);
			
			return this._flatten(__v);
		},
		renderSelectedBox: function()
		{
			let __v = [];
			let page_model = this.model.getEditPageModel();
			
			if (this.model.selected_box)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"style":this.model.selected_box.get("top"),"class":this._class_name(["widget_box__item widget_box__item--top widget_box__item--current"])});
				
				if (page_model.selected.widget != null && this.renderWidgetControl())
				{
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_box__item_control"])});
					
					/* Element 'div' */
					let __v2 = this._e(__v1, "div", {"class":this._class_name(["widget_box__item_control_wrap"])});
					
					/*
						<div class="widget_box__item_control_button">@raw{{ "&#9776;" }}</div>
						*/
					/* Element 'div' */
					let __v3 = this._e(__v2, "div", {"onClick":() =>
					{
						this.onAddWidgetClick(this.model.selected_path);
					},"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v3, new Runtime.RawString("+"));
					
					/* Element 'div' */
					let __v4 = this._e(__v2, "div", {"onClick":this.onUpWidgetClick,"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v4, new Runtime.RawString("&#9652;"));
					
					/* Element 'div' */
					let __v5 = this._e(__v2, "div", {"onClick":this.onDownWidgetClick,"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v5, new Runtime.RawString("&#9662;"));
					
					/* Element 'div' */
					let __v6 = this._e(__v2, "div", {"onClick":this.onRemoveWidgetClick,"class":this._class_name(["widget_box__item_control_button"])});
					
					/* Raw */
					this._t(__v6, new Runtime.RawString("x"));
				}
				
				/* Element 'div' */
				let __v7 = this._e(__v, "div", {"style":this.model.selected_box.get("bottom"),"class":this._class_name(["widget_box__item widget_box__item--bottom widget_box__item--current"])});
				
				/* Element 'div' */
				let __v8 = this._e(__v, "div", {"style":this.model.selected_box.get("left"),"class":this._class_name(["widget_box__item widget_box__item--left widget_box__item--current"])});
				
				/* Element 'div' */
				let __v9 = this._e(__v, "div", {"style":this.model.selected_box.get("right"),"class":this._class_name(["widget_box__item widget_box__item--right widget_box__item--current"])});
			}
			
			return this._flatten(__v);
		},
		renderAddWidgetButton: function()
		{
			let __v = [];
			let page_model = this.model.getEditPageModel();
			
			if (this.is_loaded && page_model != null)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_page__add_section_button"])});
				
				/* Component 'Button' */
				let __v1 = this._c(__v0, "Runtime.Widget.Button", {"styles":Runtime.Vector.from(["small"]),"onClick":() =>
				{
					this.onAddWidgetClick(null);
				}}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "Add widget");
					
					return this._flatten(__v);
				});
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":this.onClick,"onContextmenu":this.onContextMenu,"class":this._class_name(["widget_page"])});
			
			/* Render */
			this._t(__v0, this.renderStyle());
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.widget_model, Runtime.Map.from({"ref":"widget_component"})));
			
			/* Render */
			this._t(__v0, this.renderSelectedBox());
			
			/* Render */
			this._t(__v0, this.renderAddWidgetButton());
			
			return this._flatten(__v);
		},
		/**
 * Render widget control
 */
		renderWidgetControl: function()
		{
			return false;
		},
		/**
 * Up widget click
 */
		onUpWidgetClick: function()
		{
			this.model.sendMoveWidget(this.model.selected_path, "up");
		},
		/**
 * Down widget click
 */
		onDownWidgetClick: function()
		{
			this.model.sendMoveWidget(this.model.selected_path, "down");
		},
		/**
 * Add widget click event
 */
		onAddWidgetClick: function(path)
		{
			this.model.sendAddWidget(path, "after");
		},
		/**
 * Remove widget click event
 */
		onRemoveWidgetClick: function()
		{
			this.model.sendRemoveWidget(this.model.selected_path);
		},
		/**
 * Returns component
 */
		getComponent: function(elem)
		{
			while (elem != null)
	{
		if (elem.classList.contains("debug_component"))
		{
			return elem;
		}
		if (elem.__component__)
		{
			return elem;
		}
		elem = elem.parentElement;
	}
	return elem;
		},
		/**
 * Returns widget path
 */
		getWidgetPath: function(elem)
		{
			elem = this.getComponent(elem);
			if (elem == null)
			{
				return null;
			}
			if (elem.hasAttribute("data-widget-path"))
			{
				return elem.getAttribute("data-widget-path");
			}
			var component = elem.__component__;
			while (
		component != null &&
		component.data_widget_path == null
	)
	{
		component = component.$parent;
	}
			return (component) ? (component.data_widget_path) : (null);
		},
		/**
 * Click
 */
		onClick: function(e)
		{
			var elem = e.target;
			/* Get widget path */
			var widget_path_str = this.getWidgetPath(elem);
			if (!widget_path_str)
			{
				return ;
			}
			/* Get page model */
			var page_model = this.model.getEditPageModel();
			if (!page_model)
			{
				return ;
			}
			/* Prevent default */
			e.preventDefault();
			var widget_path = Runtime.rs.split(".", widget_path_str);
			var path = this.model.convertWidgetToTreePath(widget_path);
			this.model.sendSelectItem(path);
			return false;
		},
		/**
 * Context menu click
 */
		onContextMenu: function(e)
		{
			var elem = e.target;
			/* Get widget path */
			var widget_path_str = this.getWidgetPath(elem);
			if (!widget_path_str)
			{
				return ;
			}
			/* Prevent default */
			e.preventDefault();
			/* Send select item */
			var widget_path = Runtime.rs.split(".", widget_path_str);
			var path = this.model.convertWidgetToTreePath(widget_path);
			this.model.sendSelectItem(path);
			/* Send event context menu */
			this.model.sendContextMenu(e.clientX, e.clientY);
			return false;
		},
		/**
 * Mounted
 */
		onMounted: async function()
		{
			this.nextTick(() =>
			{
				this.model.widget_component = this.getRef("widget_component");
				this.model.buildRender();
				this.model.buildCSS();
				this.model.buildGlobalCSS();
				this.model.sendAppLoaded();
				this.is_loaded = true;
			});
		},
	},
};
Object.assign(BayLang.Constructor.WidgetPage.WidgetPage,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_box__item{position: absolute;border-style: none;border-width: 0;border-color: transparent}.widget_box__item--hover{border-style: dashed}.widget_box__item--current{border-style: solid}.widget_box__item--top{border-top-width: 2px;border-top-color: #e0e1e6}.widget_box__item--left{border-left-width: 2px;border-left-color: #e0e1e6}.widget_box__item--bottom{border-bottom-width: 2px;border-bottom-color: #e0e1e6}.widget_box__item--right{border-right-width: 2px;border-right-color: #e0e1e6}.widget_box__item_control{display: inline-block;position: relative;background-color: white;min-width: 98px;left: calc(100% - 98px);top: -13px;border-width: 1px;border-style: solid;border-color: #e0e1e6;z-index: 10}.widget_box__item_control_wrap{display: flex;height: 24px;line-height: 1}.widget_box__item_control_button{cursor: pointer;font-size: 16px;padding: 4px;text-align: center;user-select: none;width: 24px}.widget_page__add_section_button{text-align: center;padding-top: 10px;padding: 5px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetPage";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetPage);
window["BayLang.Constructor.WidgetPage.WidgetPage"] = BayLang.Constructor.WidgetPage.WidgetPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetPage;
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
BayLang.Constructor.WidgetPage.WidgetSettingsInterface = function()
{
};
Object.assign(BayLang.Constructor.WidgetPage.WidgetSettingsInterface.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
	},
});
Object.assign(BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
{
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.WidgetSettingsInterface";
	},
});
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.WidgetSettingsInterface);
window["BayLang.Constructor.WidgetPage.WidgetSettingsInterface"] = BayLang.Constructor.WidgetPage.WidgetSettingsInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.WidgetSettingsInterface;
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
BayLang.Constructor.WidgetPage.ModuleDescription = function()
{
};
Object.assign(BayLang.Constructor.WidgetPage.ModuleDescription.prototype,
{
});
Object.assign(BayLang.Constructor.WidgetPage.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.0.1";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Hook("BayLang.Constructor.WidgetPage.AppHook"),new Runtime.Entity.Provider("BayLang.Constructor.WidgetPage.EditorProvider")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.ModuleDescription);
window["BayLang.Constructor.WidgetPage.ModuleDescription"] = BayLang.Constructor.WidgetPage.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.ModuleDescription;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.ButtonSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.ButtonSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.ButtonSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.ButtonSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.ButtonSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Button";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "Button";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.Widget.Button";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "button";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"content","label":"Content","component":"Runtime.Widget.Input","default":""})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"type","label":"Type","component":"Runtime.Widget.Input","default":"button"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"target","label":"Target","component":"Runtime.Widget.Select","default":"_self","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"_self","value":"self"}),Runtime.Map.from({"key":"_blank","value":"blank"})])})}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.ButtonSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.ButtonSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ButtonSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.ButtonSettings);
window["Runtime.Widget.WidgetSettings.Settings.ButtonSettings"] = Runtime.Widget.WidgetSettings.Settings.ButtonSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.ButtonSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.ContainerSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.ContainerSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Container";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "div";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "container";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "div")
		{
			return false;
		}
		if (widget.code.items == null)
		{
			return true;
		}
		if (widget.code.items.items.count() == 0)
		{
			return true;
		}
		var item = widget.code.items.items.get(0);
		if (item.constructor.getClassName() == "BayLang.OpCodes.OpHtmlContent")
		{
			return false;
		}
		if (item.constructor.getClassName() == "BayLang.OpCodes.OpHtmlValue")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from([]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.ContainerSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.ContainerSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
window["Runtime.Widget.WidgetSettings.Settings.ContainerSettings"] = Runtime.Widget.WidgetSettings.Settings.ContainerSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.ContainerSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Form";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "Form";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.Widget.Form.Form";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "form";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings);
window["Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings"] = Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Form Model";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "FormSubmitModel";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return true;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.model_class_name != this.getModelName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel", Runtime.Map.from({"name":"storage","path":"api_name","label":"API name","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", Runtime.Map.from({"name":"submit_button_text","path":Runtime.Vector.from(["submit_button","text"]),"label":"Button text","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"fields","label":"Fields","component":"BayLang.Constructor.Frontend.Components.SortableParams","default":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Username","component":"Runtime.Widget.Input"})]),"props":Runtime.Map.from({"fields":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Field name","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"label","label":"Label","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"component","label":"Component","component":"Runtime.Widget.Input","default":"Runtime.Widget.Input"})])})}))]);
	},
	/**
	 * On change
	 */
	onChange: function(iframeWindow, widget, param)
	{
		if (param.name == "submit_button_text")
		{
			var value = param.value;
			var submit_button = widget.bottom_buttons.getWidget("submit");
			submit_button.content = value;
			return true;
		}
		return false;
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"modules":Runtime.Vector.from(["Runtime.Entity.Factory"]),"model":Runtime.rs.join("\n", Runtime.Vector.from(["this.form = this.addWidget('Runtime.Widget.Form.FormSubmitModel', {","\t'widget_name': 'form',","\t'storage': new Factory(","\t\t'Runtime.Widget.Form.FormSubmitStorage',","\t\t{","\t\t\t'api_name': 'test'","\t\t}","\t),","\t'submit_button':","\t{","\t\t'text': 'Отправить заявку',","\t},","\t'fields': [","\t\t{","\t\t\t'name': 'name',","\t\t\t'label': 'Name',","\t\t\t'component': 'Runtime.Widget.Input',","\t\t},","\t\t{","\t\t\t'name': 'email',","\t\t\t'label': 'E-mail',","\t\t\t'component': 'Runtime.Widget.Input',","\t\t},","\t],","});"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings);
window["Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings"] = Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.ImageSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.ImageSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.ImageSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.ImageSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.ImageSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Image";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "Image";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.Widget.Image";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "image";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"src","label":"Image","component":"BayLang.Constructor.Frontend.Components.SelectImageButton"}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.ImageSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.ImageSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ImageSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.ImageSettings);
window["Runtime.Widget.WidgetSettings.Settings.ImageSettings"] = Runtime.Widget.WidgetSettings.Settings.ImageSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.ImageSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.SectionSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.SectionSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.SectionSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.SectionSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.SectionSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Section";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "Section";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.Widget.Section";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "section";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		if (widget.getComponentName() == this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"wrap","label":"Wrap","component":"Runtime.Widget.Select","props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"false","value":"No"}),Runtime.Map.from({"key":"","value":"Yes"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"flex","label":"Flex","component":"Runtime.Widget.Select","props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"No"}),Runtime.Map.from({"key":"true","value":"Yes"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"align_items","label":"Align items","component":"Runtime.Widget.Select","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"baseline","value":"baseline"}),Runtime.Map.from({"key":"center","value":"center"}),Runtime.Map.from({"key":"end","value":"end"}),Runtime.Map.from({"key":"flex-end","value":"flex-end"}),Runtime.Map.from({"key":"flex-start","value":"flex-start"}),Runtime.Map.from({"key":"start","value":"start"}),Runtime.Map.from({"key":"stretch","value":"stretch"}),Runtime.Map.from({"key":"revert","value":"revert"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"justify_content","label":"Justify content","component":"Runtime.Widget.Select","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"left","value":"left"}),Runtime.Map.from({"key":"center","value":"center"}),Runtime.Map.from({"key":"right","value":"right"}),Runtime.Map.from({"key":"space-around","value":"space-around"}),Runtime.Map.from({"key":"space-between","value":"space-between"}),Runtime.Map.from({"key":"start","value":"start"}),Runtime.Map.from({"key":"stretch","value":"stretch"}),Runtime.Map.from({"key":"end","value":"end"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"flex_wrap","label":"Flex wrap","component":"Runtime.Widget.Select","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"nowrap","value":"nowrap"}),Runtime.Map.from({"key":"wrap","value":"wrap"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"min_height","label":"min_height","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"height","label":"height","component":"Runtime.Widget.Input"}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<style>","padding-top: 20px;","padding-bottom: 20px;","background-position: center top;","background-repeat: no-repeat;","background-size: cover;","</style>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.SectionSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.SectionSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.SectionSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.SectionSettings);
window["Runtime.Widget.WidgetSettings.Settings.SectionSettings"] = Runtime.Widget.WidgetSettings.Settings.SectionSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.SectionSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.TemplateSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.TemplateSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.TemplateSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.TemplateSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.TemplateSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Template";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return null;
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return null;
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return null;
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "template";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		return false;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		if (widget instanceof Runtime.Widget.WidgetSettings.Settings.SectionSettings)
		{
			return true;
		}
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.TemplateSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.TemplateSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.TemplateSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.TemplateSettings);
window["Runtime.Widget.WidgetSettings.Settings.TemplateSettings"] = Runtime.Widget.WidgetSettings.Settings.TemplateSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.TemplateSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
Runtime.Widget.WidgetSettings.Settings.TextImageSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.TextImageSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.Settings.TextImageSettings.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.TextImageSettings;
Object.assign(Runtime.Widget.WidgetSettings.Settings.TextImageSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "TextImage";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "TextImage";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.Widget.TextImage";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "text_image";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"kind","label":"Kind","component":"Runtime.Widget.Select","default":"text_right","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":"text_right","value":"Text right"}),Runtime.Map.from({"key":"text_left","value":"Text left"}),Runtime.Map.from({"key":"text_top","value":"Text top"}),Runtime.Map.from({"key":"text_bottom","value":"Text bottom"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"image","label":"Image","component":"BayLang.Constructor.Frontend.Components.SelectImageButton"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"content","label":"Content","component":"Runtime.Widget.TextEditable"}))]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<use name='Runtime.Widget.Image' component='true' />","<use name='Runtime.Widget.Text' component='true' />","<style>","%(TextImage)widget_text_image{","\t&__image{","\t}","\t&__text{","\t}","}","</style>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.TextImageSettings, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.Settings.TextImageSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.TextImageSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.TextImageSettings);
window["Runtime.Widget.WidgetSettings.Settings.TextImageSettings"] = Runtime.Widget.WidgetSettings.Settings.TextImageSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.TextImageSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.Div = function()
{
	Runtime.Widget.WidgetSettings.Settings.ContainerSettings.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.Div.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.Div.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.Div;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Div.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Text";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "div";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "container";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "div")
		{
			return false;
		}
		if (widget.code.items == null)
		{
			return false;
		}
		if (widget.code.items.items.count() == 0)
		{
			return false;
		}
		var item = widget.code.items.items.get(0);
		if (item.constructor.getClassName() == "BayLang.OpCodes.OpHtmlContent")
		{
			return true;
		}
		if (item.constructor.getClassName() == "BayLang.OpCodes.OpHtmlValue")
		{
			return true;
		}
		return false;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName", Runtime.Map.from({"props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"Text"}),Runtime.Map.from({"key":"h1","value":"H1"}),Runtime.Map.from({"key":"h2","value":"H2"}),Runtime.Map.from({"key":"h3","value":"H3"}),Runtime.Map.from({"key":"h4","value":"H4"}),Runtime.Map.from({"key":"h5","value":"H5"}),Runtime.Map.from({"key":"p","value":"Paragraph"}),Runtime.Map.from({"key":"span","value":"Span"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<template>Content</template>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Div, Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Div,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Div";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.Div);
window["Runtime.Widget.WidgetSettings.Settings.Html.Div"] = Runtime.Widget.WidgetSettings.Settings.Html.Div;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.Div;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.Header = function()
{
	Runtime.Widget.WidgetSettings.Settings.ContainerSettings.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.Header;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 1";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		return false;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName", Runtime.Map.from({"props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"Text"}),Runtime.Map.from({"key":"h1","value":"H1"}),Runtime.Map.from({"key":"h2","value":"H2"}),Runtime.Map.from({"key":"h3","value":"H3"}),Runtime.Map.from({"key":"h4","value":"H4"}),Runtime.Map.from({"key":"h5","value":"H5"}),Runtime.Map.from({"key":"p","value":"Paragraph"}),Runtime.Map.from({"key":"span","value":"Span"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<template>Header</template>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Header, Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Header,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.Header);
window["Runtime.Widget.WidgetSettings.Settings.Html.Header"] = Runtime.Widget.WidgetSettings.Settings.Html.Header;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.Header;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.H1 = function()
{
	Runtime.Widget.WidgetSettings.Settings.Html.Header.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.H1.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.H1.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.H1;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H1.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 1";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "h1";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "h1")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H1, Runtime.Widget.WidgetSettings.Settings.Html.Header);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H1,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H1";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.H1);
window["Runtime.Widget.WidgetSettings.Settings.Html.H1"] = Runtime.Widget.WidgetSettings.Settings.Html.H1;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.H1;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.H2 = function()
{
	Runtime.Widget.WidgetSettings.Settings.Html.Header.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.H2.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.H2.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.H2;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H2.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 2";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "h2";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "h2")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H2, Runtime.Widget.WidgetSettings.Settings.Html.Header);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H2,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H2";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.H2);
window["Runtime.Widget.WidgetSettings.Settings.Html.H2"] = Runtime.Widget.WidgetSettings.Settings.Html.H2;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.H2;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.H3 = function()
{
	Runtime.Widget.WidgetSettings.Settings.Html.Header.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.H3.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.H3.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.H3;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H3.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 3";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "h3";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "h3")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H3, Runtime.Widget.WidgetSettings.Settings.Html.Header);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H3,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H3";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.H3);
window["Runtime.Widget.WidgetSettings.Settings.Html.H3"] = Runtime.Widget.WidgetSettings.Settings.Html.H3;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.H3;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.H4 = function()
{
	Runtime.Widget.WidgetSettings.Settings.Html.Header.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.H4.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.H4.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.H4;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H4.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 4";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "h4";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "h4")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H4, Runtime.Widget.WidgetSettings.Settings.Html.Header);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H4,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H4";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.H4);
window["Runtime.Widget.WidgetSettings.Settings.Html.H4"] = Runtime.Widget.WidgetSettings.Settings.Html.H4;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.H4;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.H5 = function()
{
	Runtime.Widget.WidgetSettings.Settings.Html.Header.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.H5.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.Html.Header.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.H5.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.H5;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H5.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Header 5";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "h5";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "page_title";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "h5")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H5, Runtime.Widget.WidgetSettings.Settings.Html.Header);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.H5,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H5";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.H5);
window["Runtime.Widget.WidgetSettings.Settings.Html.H5"] = Runtime.Widget.WidgetSettings.Settings.Html.H5;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.H5;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.Link = function()
{
	Runtime.Widget.WidgetSettings.Settings.ContainerSettings.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.Link.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.Link.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.Link;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Link.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Link";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "a";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "link";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "a")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return true;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"target","label":"Target","component":"Runtime.Widget.Select","props":Runtime.Map.from({"default":"","options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"self"}),Runtime.Map.from({"key":"_blank","value":"blank"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", Runtime.Map.from({"name":"href","label":"Href","component":"Runtime.Widget.Input"})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<template>Content</template>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Link, Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Link,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Link";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.Link);
window["Runtime.Widget.WidgetSettings.Settings.Html.Link"] = Runtime.Widget.WidgetSettings.Settings.Html.Link;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.Link;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.Paragraph = function()
{
	Runtime.Widget.WidgetSettings.Settings.ContainerSettings.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.Paragraph.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.Paragraph.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.Paragraph;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Paragraph.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Paragraph";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "p";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "p")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName", Runtime.Map.from({"props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"Text"}),Runtime.Map.from({"key":"h1","value":"H1"}),Runtime.Map.from({"key":"h2","value":"H2"}),Runtime.Map.from({"key":"h3","value":"H3"}),Runtime.Map.from({"key":"h4","value":"H4"}),Runtime.Map.from({"key":"h5","value":"H5"}),Runtime.Map.from({"key":"p","value":"Paragraph"}),Runtime.Map.from({"key":"span","value":"Span"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"content":Runtime.rs.join("\n", Runtime.Vector.from(["<template>Text</template>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Paragraph, Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Paragraph,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Paragraph";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.Paragraph);
window["Runtime.Widget.WidgetSettings.Settings.Html.Paragraph"] = Runtime.Widget.WidgetSettings.Settings.Html.Paragraph;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.Paragraph;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings == 'undefined') Runtime.Widget.WidgetSettings.Settings = {};
if (typeof Runtime.Widget.WidgetSettings.Settings.Html == 'undefined') Runtime.Widget.WidgetSettings.Settings.Html = {};
Runtime.Widget.WidgetSettings.Settings.Html.Span = function()
{
	Runtime.Widget.WidgetSettings.Settings.ContainerSettings.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.Settings.Html.Span.prototype = Object.create(Runtime.Widget.WidgetSettings.Settings.ContainerSettings.prototype);
Runtime.Widget.WidgetSettings.Settings.Html.Span.prototype.constructor = Runtime.Widget.WidgetSettings.Settings.Html.Span;
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Span.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "Span";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "span";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "basic";
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (widget.code.constructor.getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (Runtime.rs.lower(widget.code.tag_name) != "span")
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName", Runtime.Map.from({"props":Runtime.Map.from({"show_select_value":false,"options":Runtime.Vector.from([Runtime.Map.from({"key":"","value":"Text"}),Runtime.Map.from({"key":"h1","value":"H1"}),Runtime.Map.from({"key":"h2","value":"H2"}),Runtime.Map.from({"key":"h3","value":"H3"}),Runtime.Map.from({"key":"h4","value":"H4"}),Runtime.Map.from({"key":"h5","value":"H5"}),Runtime.Map.from({"key":"p","value":"Paragraph"}),Runtime.Map.from({"key":"span","value":"Span"})])})})),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"template":Runtime.rs.join("\n", Runtime.Vector.from(["<template>Text</template>"]))});
		}});
	},
});
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Span, Runtime.Widget.WidgetSettings.Settings.ContainerSettings);
Object.assign(Runtime.Widget.WidgetSettings.Settings.Html.Span,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Span";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.Settings.Html.Span);
window["Runtime.Widget.WidgetSettings.Settings.Html.Span"] = Runtime.Widget.WidgetSettings.Settings.Html.Span;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.Settings.Html.Span;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
Runtime.Widget.WidgetSettings.WidgetManager = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Widget.WidgetSettings.WidgetManager.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.WidgetSettings.WidgetManager.prototype.constructor = Runtime.Widget.WidgetSettings.WidgetManager;
Object.assign(Runtime.Widget.WidgetSettings.WidgetManager.prototype,
{
	/**
	 * Init widgets
	 */
	init: function(provider)
	{
	},
	/**
	 * Returns group settings
	 */
	getGroupSettings: function()
	{
		return Runtime.Map.from({"basic":Runtime.Map.from({"label":"Basic","priority":0}),"widget":Runtime.Map.from({"label":"Widget","priority":100}),"other":Runtime.Map.from({"label":"Basic","priority":9999})});
	},
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings: function()
	{
		return Runtime.Vector.from([new Runtime.Widget.WidgetSettings.Settings.Html.Div(),new Runtime.Widget.WidgetSettings.Settings.Html.H1(),new Runtime.Widget.WidgetSettings.Settings.Html.H2(),new Runtime.Widget.WidgetSettings.Settings.Html.H3(),new Runtime.Widget.WidgetSettings.Settings.Html.H4(),new Runtime.Widget.WidgetSettings.Settings.Html.H5(),new Runtime.Widget.WidgetSettings.Settings.Html.Link(),new Runtime.Widget.WidgetSettings.Settings.Html.Paragraph(),new Runtime.Widget.WidgetSettings.Settings.Html.Span(),new Runtime.Widget.WidgetSettings.Settings.ButtonSettings(),new Runtime.Widget.WidgetSettings.Settings.ContainerSettings(),new Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings(),new Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings(),new Runtime.Widget.WidgetSettings.Settings.ImageSettings(),new Runtime.Widget.WidgetSettings.Settings.SectionSettings(),new Runtime.Widget.WidgetSettings.Settings.TemplateSettings(),new Runtime.Widget.WidgetSettings.Settings.TextImageSettings()]);
	},
});
Object.assign(Runtime.Widget.WidgetSettings.WidgetManager, Runtime.BaseObject);
Object.assign(Runtime.Widget.WidgetSettings.WidgetManager,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.WidgetManager";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetManagerInterface,
	],
});
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.WidgetManager);
window["Runtime.Widget.WidgetSettings.WidgetManager"] = Runtime.Widget.WidgetSettings.WidgetManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.WidgetManager;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.WidgetSettings == 'undefined') Runtime.Widget.WidgetSettings = {};
Runtime.Widget.WidgetSettings.ModuleDescription = function()
{
};
Object.assign(Runtime.Widget.WidgetSettings.ModuleDescription.prototype,
{
});
Object.assign(Runtime.Widget.WidgetSettings.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime.Widget.WidgetSettings";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.12.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.WidgetManagerAnnotation("Runtime.Widget.WidgetSettings.WidgetManager")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.WidgetSettings";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetSettings.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetSettings.ModuleDescription);
window["Runtime.Widget.WidgetSettings.ModuleDescription"] = Runtime.Widget.WidgetSettings.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetSettings.ModuleDescription;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Settings == 'undefined') Runtime.WordPress.Settings = {};
Runtime.WordPress.Settings.FormModelSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Settings.FormModelSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Settings.FormModelSettings.prototype.constructor = Runtime.WordPress.Settings.FormModelSettings;
Object.assign(Runtime.WordPress.Settings.FormModelSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "WP_FormModel";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.WordPress.Components.FormModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "form";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return true;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.model_class_name != this.getModelName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", Runtime.Map.from({"name":"form_name","label":"Form name","component":"Runtime.Widget.Select","default":"","props":Runtime.Map.from({"options":Runtime.Vector.from([])})}))]);
	},
	/**
	 * On change
	 */
	onChange: function(model, param)
	{
		/* Change form name */
		if (param.name == "form_name")
		{
			model.form_name = param.value;
			model.loadForm();
			return true;
		}
		return false;
	},
	/**
	 * Load form name options
	 */
	loadOptions: async function(runtime, widget)
	{
		if (this.options)
		{
			return Promise.resolve();
		}
		var data = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, Runtime.Map.from({"api_name":"admin.wordpress.forms.settings::search","method_name":"actionSearch","data":Runtime.Map.from({"limit":"1000"})}));
		var result = await widget.page_model.layout.callApi(data);
		if (result.isSuccess())
		{
			var result_data = BayLang.Constructor.WidgetPage.ParameterFactory.restore(runtime, result.data);
			this.options = result_data.get("items").map((item) =>
			{
				return Runtime.Map.from({"key":item.get("api_name"),"value":item.get("name")});
			});
		}
		else
		{
			this.options = Runtime.Vector.from([]);
		}
	},
	/**
	 * Setup widget
	 */
	setup: async function(runtime, widget)
	{
		/* Load options */
		await this.loadOptions(runtime, widget);
		/* Add options to widget */
		if (this.options)
		{
			var options = BayLang.Constructor.WidgetPage.ParameterFactory.copy(runtime, this.options);
			var form_name_param = widget.params.findItem((param) =>
			{
				return param.name == "form_name";
			});
			if (form_name_param)
			{
				form_name_param.props.set("options", options);
			}
		}
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({"modules":Runtime.Vector.from(["Runtime.Entity.Factory"]),"model":Runtime.rs.join("\n", Runtime.Vector.from(["this.form = this.addWidget(classof WP_FormModel, {","\t'widget_name': 'form',","\t'form_name': 'default',","\t'submit_button':","\t{","\t\t'text': 'Отправить заявку',","\t},","});"]))});
		}});
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.options = null;
	},
});
Object.assign(Runtime.WordPress.Settings.FormModelSettings, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Settings.FormModelSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Settings.FormModelSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.WordPress.Settings.FormModelSettings);
window["Runtime.WordPress.Settings.FormModelSettings"] = Runtime.WordPress.Settings.FormModelSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Settings.FormModelSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Settings == 'undefined') Runtime.WordPress.Settings = {};
Runtime.WordPress.Settings.FormSettings = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Settings.FormSettings.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Settings.FormSettings.prototype.constructor = Runtime.WordPress.Settings.FormSettings;
Object.assign(Runtime.WordPress.Settings.FormSettings.prototype,
{
	/**
	 * Returns widget name
	 */
	getWidgetName: function()
	{
		return "WordPress Form";
	},
	/**
	 * Returns alias name
	 */
	getAliasName: function()
	{
		return "WP_Form";
	},
	/**
	 * Returns component name
	 */
	getComponentName: function()
	{
		return "Runtime.WordPress.Components.Form";
	},
	/**
	 * Returns model name
	 */
	getModelName: function()
	{
		return "Runtime.WordPress.Components.FormModel";
	},
	/**
	 * Returns selector name
	 */
	getSelectorName: function()
	{
		return "form";
	},
	/**
	 * Returns group name
	 */
	getGroupName: function()
	{
		return "widget";
	},
	/**
	 * Returns true if model
	 */
	isModel: function()
	{
		return false;
	},
	/**
	 * Returns true if is widget settings
	 */
	checkWidget: function(widget)
	{
		if (!widget.isComponent())
		{
			return false;
		}
		if (widget.component_class_name != this.getComponentName())
		{
			return false;
		}
		return true;
	},
	/**
	 * Can insert widget
	 */
	canInsert: function(widget)
	{
		return false;
	},
	/**
	 * Returns params
	 */
	getParams: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns default template
	 */
	getDefaultTemplate: function()
	{
		return Runtime.Map.from({"default":() =>
		{
			return Runtime.Map.from({});
		}});
	},
});
Object.assign(Runtime.WordPress.Settings.FormSettings, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Settings.FormSettings,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Settings.FormSettings";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetSettingsInterface,
	],
});
Runtime.rtl.defClass(Runtime.WordPress.Settings.FormSettings);
window["Runtime.WordPress.Settings.FormSettings"] = Runtime.WordPress.Settings.FormSettings;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Settings.FormSettings;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Settings == 'undefined') Runtime.WordPress.Settings = {};
Runtime.WordPress.Settings.ModuleDescription = function()
{
};
Object.assign(Runtime.WordPress.Settings.ModuleDescription.prototype,
{
});
Object.assign(Runtime.WordPress.Settings.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime.WordPress.Settings";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.12.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new BayLang.Constructor.WidgetPage.WidgetManagerAnnotation("Runtime.WordPress.Settings.WidgetManager")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Settings.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.WordPress.Settings.ModuleDescription);
window["Runtime.WordPress.Settings.ModuleDescription"] = Runtime.WordPress.Settings.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Settings.ModuleDescription;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Settings == 'undefined') Runtime.WordPress.Settings = {};
Runtime.WordPress.Settings.WidgetManager = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.WordPress.Settings.WidgetManager.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.WordPress.Settings.WidgetManager.prototype.constructor = Runtime.WordPress.Settings.WidgetManager;
Object.assign(Runtime.WordPress.Settings.WidgetManager.prototype,
{
	/**
	 * Init widgets
	 */
	init: function(provider)
	{
	},
	/**
	 * Returns group settings
	 */
	getGroupSettings: function()
	{
		return Runtime.Map.from({});
	},
	/**
	 * Returns list of widget settings
	 */
	getWidgetSettings: function()
	{
		return Runtime.Vector.from([new Runtime.WordPress.Settings.FormModelSettings(),new Runtime.WordPress.Settings.FormSettings()]);
	},
});
Object.assign(Runtime.WordPress.Settings.WidgetManager, Runtime.BaseObject);
Object.assign(Runtime.WordPress.Settings.WidgetManager,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Settings.WidgetManager";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		BayLang.Constructor.WidgetPage.WidgetManagerInterface,
	],
});
Runtime.rtl.defClass(Runtime.WordPress.Settings.WidgetManager);
window["Runtime.WordPress.Settings.WidgetManager"] = Runtime.WordPress.Settings.WidgetManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Settings.WidgetManager;
