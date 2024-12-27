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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Component = {
	name: "Runtime.Web.Component",
	props: {
		"class": {
			default: "",
		},
		"data": {
			default: null,
		},
		"data_widget_path": {
			default: null,
		},
		"model": {
			default: null,
		},
		"render_list": {
			default: null,
		},
	},
	data: function ()
	{
		return {
			render_cache: new Runtime.Map(),
		};
	},
	methods:
	{
		renderWidget: function(widget, props)
		{
			if (props == undefined) props = null;
			let __v = [];
			
			if (widget)
			{
				let component = widget.component;
				
				if (component)
				{
					/* Component '{component}' */
					let __v0 = this._c(__v, component, this._merge_attrs({"model":this._model(widget)}, props));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderSlot("default"));
			
			return this._flatten(__v);
		},
		/**
 * Returns true if first in render list
 */
		isFirstInRenderList: function()
		{
			return (this.render_list != null && this.render_list.has("first")) ? (this.render_list.get("first")) : (false);
		},
		/**
 * Returns false if first in render list
 */
		isLastInRenderList: function()
		{
			return (this.render_list != null && this.render_list.has("last")) ? (this.render_list.get("last")) : (false);
		},
		/**
 * Returns position in render list
 */
		positionInRenderList: function()
		{
			return (this.render_list != null && this.render_list.has("position")) ? (this.render_list.get("position")) : (-1);
		},
		/**
 * Returns class name for render list item
 */
		renderListClass: function()
		{
			if (this.render_list == null)
			{
				return ;
			}
			var class_name = Runtime.Vector.from([]);
			if (this.render_list.has("position"))
			{
				class_name.push("item--" + Runtime.rtl.toStr(this.render_list.get("position")));
			}
			if (this.render_list.has("first") && this.render_list.get("first"))
			{
				class_name.push("item--first");
			}
			if (this.render_list.has("last") && this.render_list.get("last"))
			{
				class_name.push("item--last");
			}
			return Runtime.rs.join(" ", class_name);
		},
		/**
 * Returns true slot if is exists
 */
		checkSlot: function(slot_name)
		{
			let f = this.$slots[slot_name];
	if (f == null || f == undefined) return false;
	return true;
		},
		/**
 * Render slot
 */
		renderSlot: function(slot_name)
		{
			let f = this.$slots[slot_name];
	if (f == null || f == undefined) return null;
	return f();
		},
		/**
 * Returns component key path
 */
		getKeyPath: function()
		{
			var result = Runtime.Vector.from([]);
			var component = this;
			while (component != null)
			{
				result.push(this.key);
				component = component.getParent();
			}
			return result;
		},
		/**
 * Parent component
 */
		getParent: function()
		{
			return this.$parent;
		},
		/**
 * Returns ref
 */
		getRef: function(name)
		{
			return this.$refs[name];
		},
		/**
 * Returns props
 */
		getProps: function()
		{
			return this.$props;
		},
		/**
 * Emit message
 */
		emit: function(event, obj)
		{
			if (obj == undefined) obj = null;
			this.$emit.apply(this, arguments);
		},
		/**
 * Reload component
 */
		reload: function(event, obj)
		{
			if (obj == undefined) obj = null;
			this.$forceUpdate();
		},
		/**
 * Init widget settings
 */
		initWidget: function()
		{
		},
		/**
 * Created
 */
		onCreated: function()
		{
		},
		/**
 * Before mount
 */
		onBeforeMount: function()
		{
		},
		/**
 * Mounted
 */
		onMounted: function()
		{
		},
		/**
 * Before update
 */
		onBeforeUpdate: function()
		{
		},
		/**
 * Updated
 */
		onUpdated: function()
		{
		},
		/**
 * Before Unmount
 */
		onBeforeUnmount: function()
		{
		},
		/**
 * Unmounted
 */
		onUnmount: function()
		{
		},
		/**
 * Next tick
 */
		nextTick: async function(f)
		{
			var Vue = Runtime.rtl.attr(window, "Vue");
			await Vue.nextTick(f);
		},
		/**
 * Returns model for component
 */
		_model: function(obj, is_global)
		{
			if (obj == undefined) obj = null;
			if (is_global == undefined) is_global = false;
			if (obj instanceof Runtime.Collection)
			{
				if (obj.count() == 0)
				{
					return this.model;
				}
				if (is_global)
				{
					return this.layout.model(obj);
				}
				return Runtime.rtl.attr(this.model, obj);
			}
			return obj;
		},
		/**
 * Returns component class name
 */
		_class_name: function(names)
		{
			names.push(this.$options.getCssHash(this.$options.getClassName()));
	names = names.filter((s) => s != "");
	return names.join(" ");
		},
		/**
 * Merge attrs
 */
		_merge_attrs: function(attr1, attr2)
		{
			if (attr2 == null)
			{
				return attr1;
			}
			return Object.assign({}, attr1, attr2.toObject());
		},
		/**
 * Filter attrs
 */
		_filter_attrs: function(attrs)
		{
			var new_attrs = {};
	Object.entries(attrs).forEach((arr)=>{
		var key = arr[0];
		var value = arr[1];
		if (key == "@key_debug" && new_attrs["key"] == undefined)
		{
			new_attrs["key"] = value;
			return;
		}
		if (key.charAt(0) == "@") return;
		new_attrs[key] = value;
	});
	return new_attrs;
		},
		/**
 * Escape html
 */
		_escape: function(s)
		{
			if (Runtime.rtl.isScalarValue(s))
			{
				return Runtime.rs.htmlEscape(s);
			}
			return "";
		},
		/**
 * Render text
 */
		_t: function(parent_elem, content)
		{
			if (content == undefined) content = null;
			if (content == null)
			{
				return ;
			}
			if (content instanceof Array && content.length == 0) return;
	if (Runtime.rtl.isScalarValue(content)) content = "" + content;
	this._parent_elem_push(parent_elem, content);
		},
		/**
 * Render element
 */
		_e: function(parent_elem, elem_name, attrs, content)
		{
			if (elem_name == undefined) elem_name = null;
			if (attrs == undefined) attrs = null;
			if (content == undefined) content = null;
			var elem = null;
			attrs = this._filter_attrs(attrs);
	elem = Vue.h(elem_name, attrs);
	this._parent_elem_push(parent_elem, elem);
			return elem;
		},
		/**
 * Render component
 */
		_c: function(parent_elem, component_name, attrs, content)
		{
			if (component_name == undefined) component_name = null;
			if (attrs == undefined) attrs = null;
			if (content == undefined) content = null;
			var elem = null;
			let component = null;
	if (component_name == "Transition") component = Vue.Transition;
	else if (component_name == "TransitionGroup") component = Vue.TransitionGroup;
	else component = use(component_name);
	if (!component)
	{
		throw new Runtime.Exceptions.ItemNotFound(component_name);
	}
	
	attrs = this._filter_attrs(attrs);
	elem = Vue.h(component, attrs, content);
	this._parent_elem_push(parent_elem, elem);
			return elem;
		},
		/**
 * Push to parent elem
 */
		_parent_elem_push: function(parent_elem, elem)
		{
			if (parent_elem instanceof Array)
	{
		if (elem instanceof Array)
		{
			for (let i=0; i<elem.length; i++) parent_elem.push(elem[i]);
		}
		else
		{
			parent_elem.push(elem);
		}
	}
	else if (typeof parent_elem == "object")
	{
		if (elem instanceof Array)
		{
			if (parent_elem.children == null)
			{
				parent_elem.children = [];
				parent_elem.shapeFlag = 17;
			}
			for (let i=0; i<elem.length; i++) parent_elem.children.push(elem[i]);
		}
		else if (elem instanceof Runtime.RawString)
		{
			if (parent_elem.props == undefined || parent_elem.props == null)
			{
				parent_elem.props = {};
			}
			parent_elem.props["innerHTML"] = elem.toString();
		}
		else if (typeof elem == "string")
		{
			if (parent_elem.children == null)
			{
				parent_elem.children = "";
				parent_elem.shapeFlag = 9;
			}
			if (parent_elem.children instanceof Array)
			{
				parent_elem.children.push(elem);
			}
			else
			{
				parent_elem.children += elem;
			}
		}
		else if (typeof elem == "object")
		{
			if (parent_elem.children == null)
			{
				parent_elem.children = [];
				parent_elem.shapeFlag = 17;
			}
			if (typeof parent_elem.children == "string")
			{
				parent_elem.children = [parent_elem.children];
				parent_elem.shapeFlag = 17;
			}
			parent_elem.children.push(elem);
		}
	}
		},
		/**
 * Flatten elements
 */
		_flatten: function(arr, detect_multiblock)
		{
			if (detect_multiblock == undefined) detect_multiblock = true;
			if (arr.length == 0) return null;
	if (arr.length == 1) return arr[0];
	return arr;
		},
		/**
 * Teleport
 */
		_teleport: function(parent_elem, attrs, content)
		{
			if (attrs == undefined) attrs = null;
			if (content == undefined) content = null;
			if (attrs.to == undefined) attrs["to"] = ".teleports";
	let elem = Vue.h(Vue.Teleport, attrs, []);
	this._parent_elem_push(parent_elem, elem);
	
	return elem;
		},
	},
};
Object.assign(Runtime.Web.Component,
{
	/**
 * Before create
 */
	onBeforeCreate: function()
	{
	},
	/**
 * Returns styles
 */
	getStyles: function(class_name, styles)
	{
		return styles.map((item) =>
		{
			return (Runtime.rs.charAt(item, 0) != "@") ? (class_name + Runtime.rtl.toStr("--") + Runtime.rtl.toStr(item)) : (Runtime.rs.substr(item, 1));
		}).join(" ");
	},
	/**
 * Returns components
 */
	components: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
 * Returns assets
 */
	assets: function(path)
	{
		var params = Runtime.Map.from({});
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.ASSETS, params);
		var path = Runtime.rs.join_path(Runtime.Vector.from([params.get("assets_path", ""),path]));
		return Runtime.rs.addFirstSlash(path);
	},
	/**
 * Returns css hash
 */
	getCssHash: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Component.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __v0 = new Runtime.Monad(Runtime.rtl.getParents(class_name));
		__v0 = __v0.callMethod("toVector", []);
		__v0 = __v0.callMethod("prepend", [class_name]);
		__v0 = __v0.callMethod("filter", [(class_name) =>
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Web.Component" && class_name != "";
		}]);
		__v0 = __v0.callMethod("map", [(class_name) =>
		{
			return "h-" + Runtime.rtl.toStr(this.hash(class_name));
		}]);
		__v0 = __v0.call(Runtime.lib.join(" "));
		var __memorize_value = __v0.value();
		Runtime.rtl._memorizeSave("Runtime.Web.Component.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
 * Retuns css hash
 * @param string component class name
 * @return string hash
 */
	hash: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.Web.Component.hash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var h = Runtime.rs.hash(s, true, 337, 65537) + 65537;
		var res = Runtime.rs.toHex(h);
		var __memorize_value = Runtime.rs.substr(res, -4);
		Runtime.rtl._memorizeSave("Runtime.Web.Component.hash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
 * Is component
 */
	isComponent: function(tag_name)
	{
		var ch1 = Runtime.rs.substr(tag_name, 0, 1);
		var ch2 = Runtime.rs.upper(ch1);
		return tag_name != "" && (ch1 == "{" || ch1 == ch2);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Component";
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
});
Runtime.rtl.defClass(Runtime.Web.Component);
window["Runtime.Web.Component"] = Runtime.Web.Component;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Component;