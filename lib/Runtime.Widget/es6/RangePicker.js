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
Runtime.Widget.RangePicker = {
	name: "Runtime.Widget.RangePicker",
	extends: Runtime.Component,
	props: {
		value: {default: null},
		name: {default: ""},
		only_date: {default: "false"},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["range_picker", this.class, componentHash])}));
			
			/* Element Runtime.Widget.DatePicker */
			__v0.element("Runtime.Widget.DatePicker", new Runtime.Map({"value": this.getStartDate, "name": this.name + String("_start"), "only_date": this.only_date, "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
			{
				this.updateStartDate(event.value);
			})}));
			
			/* Element span */
			let __v1 = __v0.element("span");
			__v1.push(this.translate("range_picker_to", "to"));
			
			/* Element Runtime.Widget.DatePicker */
			__v0.element("Runtime.Widget.DatePicker", new Runtime.Map({"value": this.getEndDate, "name": this.name + String("_end"), "only_date": this.only_date, "onValueChange": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
			{
				this.updateEndDate(event.value);
			})}));
			
			return __v;
		},
		translate: function(key, default_value){ return this.translator ? this.translator.translate("runtime", key, default_value) : default_value; },
		/**
		 * Update start date
		 */
		updateStartDate: function(value)
		{
			let range = this.value ? Runtime.rtl.copy(this.value) : new Runtime.DateRange();
			range.start_date = value;
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": range,
				"old_value": this.value,
				"data": this.data,
			})));
		},
		/**
		 * Update end date
		 */
		updateEndDate: function(value)
		{
			let range = this.value ? Runtime.rtl.copy(this.value) : new Runtime.DateRange();
			range.end_date = value;
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": range,
				"old_value": this.value,
				"data": this.data,
			})));
		},
		getClassName: function(){ return "Runtime.Widget.RangePicker"; },
	},
	computed:
	{
		/**
		 * Returns start and end date
		 */
		getStartDate: function(){ return this.value ? this.value.start_date : null; },
		getEndDate: function(){ return this.value ? this.value.end_date : null; },
		/**
		 * Translations
		 */
		translator: function(){ return this.layout.get("translator"); },
	},
	getComponentStyle: function(){ return ".range_picker.h-e674{display: flex;align-items: center;gap: calc(2 * var(--space))}.range_picker.h-e674 .date_picker{flex: 1}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.DatePicker"); },
};
window["Runtime.Widget.RangePicker"] = Runtime.Widget.RangePicker;