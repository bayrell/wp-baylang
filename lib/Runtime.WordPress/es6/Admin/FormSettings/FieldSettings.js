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
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FieldSettings = {
	name: "Runtime.WordPress.Admin.FormSettings.FieldSettings",
	extends: Runtime.Widget.Sortable.FieldList,
	data: function()
	{
		return {
			fields: Runtime.Vector.create([
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "type",
					"label": "Type",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Vector.create([
							Runtime.Map.create({"key": "input", "value": "input"}),
							Runtime.Map.create({"key": "textarea", "value": "textarea"}),
						]),
					}),
				}),
				Runtime.Map.create({
					"name": "title",
					"label": "Title",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "placeholder",
					"label": "Placeholder",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "required",
					"label": "Required",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Vector.create([
							Runtime.Map.create({"key": 0, "value": "No"}),
							Runtime.Map.create({"key": 1, "value": "Yes"}),
						]),
					}),
				}),
			]),
		};
	},
	methods:
	{
		/**
		 * Create new item
		 */
		createItem: function()
		{
			return Runtime.Map.create({
				"name": "",
				"title": "",
				"type": "input",
				"placeholder": "",
				"required": true,
			});
		},
		/**
		 * Copy item
		 */
		copyItem: function(item){ return item.copy(); },
		getClassName: function(){ return "Runtime.WordPress.Admin.FormSettings.FieldSettings"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Input", "Runtime.Widget.Select"); },
};
window["Runtime.WordPress.Admin.FormSettings.FieldSettings"] = Runtime.WordPress.Admin.FormSettings.FieldSettings;