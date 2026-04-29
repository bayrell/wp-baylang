"use strict;"
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Widget.Section = {
	name: "Runtime.Widget.Section",
	extends: Runtime.Component,
	props: {
		id: {default: ""},
		wrap: {default: "true"},
		flex: {default: "false"},
		align_items: {default: ""},
		justify_content: {default: ""},
		flex_direction: {default: ""},
		flex_wrap: {default: ""},
		height: {default: ""},
		min_height: {default: ""},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let attrs = this.getAttrs;
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["section", this.class, componentHash]), "style": this.getStyle()}).concat(attrs));
			
			if (this.wrap == "true")
			{
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["section__wrap", componentHash]), "style": this.getWrapStyle()}));
				__v1.push(this.renderSlot("default"));
			}
			else
			{
				__v0.push(this.renderSlot("default"));
			}
			
			return __v;
		},
		/**
		 * Returns styles
		 */
		getStyle: function()
		{
			let res = Runtime.Vector.create([]);
			if (!this.wrap)
			{
				res.push(this.getWrapStyle());
			}
			return Runtime.rs.join(";", res);
		},
		/**
		 * Returns wrap style
		 */
		getWrapStyle: function()
		{
			let res = Runtime.Vector.create([]);
			if (this.flex == "true")
			{
				res.push("display: flex;");
				if (this.align_items) res.push("align-items: " + String(this.align_items));
				if (this.justify_content) res.push("justify-content: " + String(this.justify_content));
				if (this.flex_direction) res.push("flex-direction: " + String(this.flex_direction));
				if (this.flex_wrap) res.push("flex-wrap: " + String(this.flex_wrap));
			}
			if (this.height) res.push("height: " + String(this.height));
			if (this.min_height) res.push("min-height: " + String(this.min_height));
			return Runtime.rs.join(";", res);
		},
		getClassName: function(){ return "Runtime.Widget.Section"; },
	},
	computed:
	{
		/**
		 * Returns attrs
		 */
		getAttrs: function()
		{
			let attrs = new Runtime.Map();
			if (this.id != "") attrs.set("id", this.id);
			return attrs;
		},
	},
	/**
	 * Returns widget params
	 */
	widgetParams: function()
	{
		return Runtime.Vector.create([
			Runtime.Map.create({
				"type": "param",
				"name": "wrap",
				"label": "Wrap",
				"component": "Runtime.Widget.Select",
				"default": "true",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "false", "value": "No"}),
						Runtime.Map.create({"key": "true", "value": "Yes"}),
					]),
				}),
			}),
			Runtime.Map.create({
				"type": "param",
				"name": "flex",
				"label": "Flex",
				"component": "Runtime.Widget.Select",
				"default": "false",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "false", "value": "No"}),
						Runtime.Map.create({"key": "true", "value": "Yes"}),
					]),
				}),
			}),
			Runtime.Map.create({
				"type": "param",
				"name": "align_items",
				"label": "Align items",
				"component": "Runtime.Widget.Select",
				"default": "true",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "center", "value": "Center"}),
						Runtime.Map.create({"key": "baseline", "value": "Baseline"}),
						Runtime.Map.create({"key": "flex-start", "value": "Flex start"}),
						Runtime.Map.create({"key": "flex-end", "value": "Flex end"}),
					]),
				}),
			}),
			Runtime.Map.create({
				"type": "param",
				"name": "justify_content",
				"label": "Justify content",
				"component": "Runtime.Widget.Select",
				"default": "true",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "center", "value": "Center"}),
						Runtime.Map.create({"key": "space_around", "value": "Space around"}),
						Runtime.Map.create({"key": "space_between", "value": "Space between"}),
						Runtime.Map.create({"key": "left", "value": "Left"}),
						Runtime.Map.create({"key": "right", "value": "Right"}),
						Runtime.Map.create({"key": "flex-start", "value": "Flex start"}),
						Runtime.Map.create({"key": "flex-end", "value": "Flex end"}),
					]),
				}),
			}),
			Runtime.Map.create({
				"type": "param",
				"name": "flex_direction",
				"label": "Flex direction",
				"component": "Runtime.Widget.Select",
				"default": "true",
				"props": Runtime.Map.create({
					"options": Runtime.Vector.create([
						Runtime.Map.create({"key": "column", "value": "Column"}),
						Runtime.Map.create({"key": "column-reverse", "value": "Column reverse"}),
						Runtime.Map.create({"key": "row", "value": "Row"}),
						Runtime.Map.create({"key": "row-reverse", "value": "Row reverse"}),
					]),
				}),
			}),
		]);
	},
	getComponentStyle: function(){ return ".section__wrap.h-c82a{max-width: var(--content-max-width);margin-left: auto;margin-right: auto;padding: 0px var(--padding-desktop);width: 100%}@media(max-width: 1000px){.section__wrap.h-c82a{padding: 0px var(--padding-tablet)}}@media(max-width: 768px){.section__wrap.h-c82a{padding: 0px var(--padding-mobile)}}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Section"] = Runtime.Widget.Section;