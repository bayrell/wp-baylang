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
Runtime.Widget.DatePicker = {
	name: "Runtime.Widget.DatePicker",
	extends: Runtime.Component,
	props: {
		value: {default: null},
		name: {default: ""},
		only_date: {default: "false"},
	},
	data: function()
	{
		return {
			internal_value: null,
		};
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.only_date == "true")
			{
				/* Element Runtime.Widget.Input */
				__v.element("Runtime.Widget.Input", new Runtime.Map({"type": "date", "class": rs.className(["date_picker", this.class, componentHash]), "name": this.name, "value": this.getValueDate, "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.updateValueDate(event.value);
				})}));
			}
			else
			{
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["date_picker", this.class, componentHash])}));
				
				/* Element Runtime.Widget.Input */
				__v0.element("Runtime.Widget.Input", new Runtime.Map({"type": "date", "class": rs.className(["date_picker_value", componentHash]), "name": this.name, "value": this.getValueDate, "onValueChange": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
				{
					this.updateValueDate(event.value);
				})}));
				
				/* Element Runtime.Widget.Input */
				__v0.element("Runtime.Widget.Input", new Runtime.Map({"type": "input", "class": rs.className(["date_picker_time", componentHash]), "name": this.name + String("_time"), "value": this.getValueTime, "onValueChange": this.hash(2) ? this.hash(2) : this.hash(2, (event) =>
				{
					this.updateValueTime(event.value);
				})}));
			}
			
			return __v;
		},
		/**
		 * Update value
		 */
		updateValue: function(value)
		{
			if (value == null || this.internal_value == null)
			{
				this.internal_value = value ? value.normalize() : null;
			}
			else if (this.internal_value.timestamp() != this.value.timestamp())
			{
				this.internal_value = value.normalize();
			}
		},
		/**
		 * Update value
		 */
		updateValueDate: function(value)
		{
			let date = null;
			if (value != "")
			{
				let y = Runtime.rtl.toInt(Runtime.rs.substr(value, 0, 4));
				let m = Runtime.rtl.toInt(Runtime.rs.substr(value, 5, 2));
				let d = Runtime.rtl.toInt(Runtime.rs.substr(value, 8, 2));
				let params = Runtime.Map.create({"y": y, "m": m, "d": d, "o": Runtime.rtl.getContext().env("TZ_OFFSET") / 3600});
				if (this.value) date = this.internal_value.copy(params);
				else date = new Runtime.DateTime(params);
			}
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": date,
				"old_value": this.internal_value ? this.internal_value.copy() : null,
				"data": this.data,
			})));
		},
		/**
		 * Update value time
		 */
		updateValueTime: function(value)
		{
			let date = null;
			if (value != "")
			{
				let h = Runtime.rs.substr(value, 0, 2);
				let i = Runtime.rs.substr(value, 3, 2);
				let params = Runtime.Map.create({"h": h, "i": i, "o": Runtime.rtl.getContext().env("TZ_OFFSET") / 3600});
				if (this.value) date = this.internal_value.copy(params);
				else date = new Runtime.DateTime(params);
			}
			this.emit(new Runtime.Widget.Messages.ValueChangeMessage(Runtime.Map.create({
				"value": date,
				"old_value": this.internal_value ? this.internal_value.copy() : null,
				"data": this.data,
			})));
		},
		getClassName: function(){ return "Runtime.Widget.DatePicker"; },
	},
	computed:
	{
		/**
		 * Returns value
		 */
		getValueDate: function()
		{
			return this.internal_value ? this.internal_value.getDate() : "";
		},
		/**
		 * Returns value time
		 */
		getValueTime: function()
		{
			if (!this.internal_value) return "";
			return Runtime.rs.pad2(this.internal_value.h) + String(":") + String(Runtime.rs.pad2(this.internal_value.i));
		},
	},
	mounted: function()
	{
		this.updateValue(this.value);
	},
	updated: function()
	{
		this.updateValue(this.value);
	},
	getComponentStyle: function(){ return ".date_picker.h-af2{display: flex;gap: var(--space)}.date_picker.h-af2 .date_picker_value{flex: 1}.date_picker.h-af2 .date_picker_time{width: 80px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Input"); },
};
window["Runtime.Widget.DatePicker"] = Runtime.Widget.DatePicker;