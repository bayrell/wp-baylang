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
Runtime.Widget.Button = {
	name: "Runtime.Widget.Button",
	extends: Runtime.Component,
	props: {
		type: {default: "button"},
		target: {default: "_self"},
		content: {default: ""},
		href: {default: null},
		styles: {default: Runtime.Vector.create([])},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.href == null)
			{
				/* Element button */
				let __v0 = __v.element("button", new Runtime.Map({"type": this.type, "class": rs.className(["button", Runtime.rs.mergeStyles("button", this.styles), this.class, componentHash]), "onClick": this.onClick, "@ref": "widget"}));
				__v0.push(this.renderSlot("default"));
			}
			else
			{
				/* Element a */
				let __v1 = __v.element("a", new Runtime.Map({"class": rs.className(["button", this.class, Runtime.rs.mergeStyles("button", this.styles), componentHash]), "href": this.href, "target": this.target, "onClick": this.onClick, "@ref": "widget"}));
				__v1.push(this.renderSlot("default"));
			}
			
			return __v;
		},
		/**
		 * Button click
		 */
		onClick: function(e)
		{
			e.stopPropagation();
		},
		getClassName: function(){ return "Runtime.Widget.Button"; },
	},
	getComponentStyle: function(){ return ".button{display: inline-flex;align-items: center;justify-content: center;color: var(--color-text);font-weight: 500;font-family: var(--font-family);font-size: var(--font-input-size);line-height: var(--line-height);text-decoration: none;background-color: var(--color-background);border: var(--border-width) var(--color-border) solid;padding: calc(var(--space) * 0.75) calc(var(--space) * 1.5);outline: none;cursor: pointer;border-radius: var(--border-radius);transition: background-color var(--transition) var(--transition-type),\n\t\tborder-color var(--transition) var(--transition-type),\n\t\tcolor var(--transition) var(--transition-type)}.button:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);outline: none}.button--small{padding: calc(var(--space) * 0.5) calc(var(--space) * 1);line-height: 1.2em}.button--large{padding: calc(var(--space) * 1) calc(var(--space) * 2)}.button--primary{color: var(--color-primary-text);background-color: var(--color-primary);border-color: var(--color-primary-border)}.button--primary:hover{background-color: var(--color-primary-hover)}.button--secondary{color: var(--color-secondary-text);background-color: var(--color-secondary);border-color: var(--color-secondary-border)}.button--secondary:hover{background-color: var(--color-secondary-hover)}.button--outline{background-color: transparent;color: var(--color-text);border-color: var(--color-border)}.button--outline:hover{background-color: var(--color-surface)}.button--danger{color: var(--color-danger-text);background-color: var(--color-danger);border-color: var(--color-danger-border)}.button--danger:hover{background-color: var(--color-danger-hover)}.button--success{color: var(--color-success-text);background-color: var(--color-success);border-color: var(--color-success-border)}.button--success:hover{background-color: var(--color-success-hover)}.button--info{color: var(--color-info-text);background-color: var(--color-info);border-color: var(--color-info-border)}.button--info:hover{background-color: var(--color-info-hover)}.button--warning{background-color: var(--color-warning);border-color: var(--color-warning-border)}.button--warning:hover{background-color: var(--color-warning-hover)}.button--stretch{width: 100%}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Button"] = Runtime.Widget.Button;