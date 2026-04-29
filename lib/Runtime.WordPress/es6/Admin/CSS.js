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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
Runtime.WordPress.Admin.CSS = {
	name: "Runtime.WordPress.Admin.CSS",
	extends: Runtime.Component,
	methods:
	{
		getClassName: function(){ return "Runtime.WordPress.Admin.CSS"; },
	},
	getComponentStyle: function(){ return ".wp_admin_layout{--font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;--font-size: 14px;--font-input-size: 14px;--font-size-h1: 28px;--font-size-h2: 16px;--font-size-h3: 16px;--font-size-h4: 16px;--font-size-h5: 16px;--font-size-h6: 16px;font-family: var(--font-family);font-size: var(--font-size)}.wp_admin_layout .button{display: inline-flex;align-items: center;justify-content: center;color: var(--color-text);font-weight: 500;font-family: var(--font-family);font-size: var(--font-input-size);line-height: var(--line-height);text-decoration: none;background-color: var(--color-background);border: var(--border-width) var(--color-border) solid;padding: calc(var(--space) * 0.5) calc(var(--space) * 1.5);outline: none;cursor: pointer;border-radius: var(--border-radius);transition: background-color var(--transition) var(--transition-type),\n\t\t\tborder-color var(--transition) var(--transition-type),\n\t\t\tcolor var(--transition) var(--transition-type)}.wp_admin_layout .button:focus{background-color: var(--color-background);border: var(--border-width) var(--color-border) solid;box-shadow: none;outline: none}.wp_admin_layout .button:hover{color: var(--color-text);background-color: var(--color-background);border-color: var(--color-border)}.wp_admin_layout .button:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);outline: none}.wp_admin_layout .button--small{padding: 6px 9px;line-height: 1.2em}.wp_admin_layout .button--large{padding: calc(var(--space) * 1) calc(var(--space) * 2)}.wp_admin_layout .button--primary, .wp_admin_layout .button--primary:focus{color: var(--color-primary-text);background-color: var(--color-primary);border-color: var(--color-primary-border)}.wp_admin_layout .button--primary:hover, .wp_admin_layout .button--primary:focus:hover{color: var(--color-primary-text);background-color: var(--color-primary-hover);border-color: var(--color-primary-border)}.wp_admin_layout .button--secondary, .wp_admin_layout .button--secondary:focus{color: var(--color-secondary-text);background-color: var(--color-secondary);border-color: var(--color-secondary-border)}.wp_admin_layout .button--secondary:hover, .wp_admin_layout .button--secondary:focus:hover{color: var(--color-secondary-text);background-color: var(--color-secondary-hover);border-color: var(--color-secondary-border)}.wp_admin_layout .button--outline, .wp_admin_layout .button--outline:focus{color: var(--color-text);background-color: transparent;border-color: var(--color-border)}.wp_admin_layout .button--outline:hover, .wp_admin_layout .button--outline:focus:hover{color: var(--color-text);background-color: var(--color-surface);border-color: var(--color-border)}.wp_admin_layout .button--danger, .wp_admin_layout .button--danger:focus{color: var(--color-danger-text);background-color: var(--color-danger);border-color: var(--color-danger-border)}.wp_admin_layout .button--danger:hover, .wp_admin_layout .button--danger:focus:hover{color: var(--color-danger-text);background-color: var(--color-danger-hover);border-color: var(--color-danger-border)}.wp_admin_layout .button--success, .wp_admin_layout .button--success:focus{color: var(--color-success-text);background-color: var(--color-success);border-color: var(--color-success-border)}.wp_admin_layout .button--success:hover, .wp_admin_layout .button--success:focus:hover{color: var(--color-success-text);background-color: var(--color-success);border-color: var(--color-success-border)}.wp_admin_layout .button--info, .wp_admin_layout .button--info:focus{color: var(--color-info-text);background-color: var(--color-info);border-color: var(--color-info-border)}.wp_admin_layout .button--info:hover, .wp_admin_layout .button--info:focus:hover{color: var(--color-info-text);background-color: var(--color-info-hover);border-color: var(--color-info-border)}.wp_admin_layout .button--warning, .wp_admin_layout .button--warning:focus{background-color: var(--color-warning);border-color: var(--color-warning-border)}.wp_admin_layout .button--warning:hover, .wp_admin_layout .button--warning:focus:hover{background-color: var(--color-warning-hover);border-color: var(--color-warning-border)}.wp_admin_layout .button--stretch, .wp_admin_layout .button--stretch:focus{width: 100%}.wp_admin_layout .dialog__header .button{border-width: 0}.wp_admin_layout input:focus, .wp_admin_layout select:focus, .wp_admin_layout textarea:focus{border-color: var(--color-border);box-shadow: none}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.CSS", "Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.RowButtons", "Runtime.Widget.Select", "Runtime.Widget.TextArea", "Runtime.Widget.Dialog.Dialog", "Runtime.Widget.Table.Table"); },
};
window["Runtime.WordPress.Admin.CSS"] = Runtime.WordPress.Admin.CSS;