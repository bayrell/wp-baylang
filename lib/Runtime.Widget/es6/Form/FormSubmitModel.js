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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSubmitModel = function()
{
	Runtime.Widget.Form.FormModel.apply(this, arguments);
};
Runtime.Widget.Form.FormSubmitModel.prototype = Object.create(Runtime.Widget.Form.FormModel.prototype);
Runtime.Widget.Form.FormSubmitModel.prototype.constructor = Runtime.Widget.Form.FormSubmitModel;
Object.assign(Runtime.Widget.Form.FormSubmitModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Form.FormModel.prototype.initWidget.call(this, params);
		var content = "Submit";
		var styles = Runtime.Vector.from(["danger","large"]);
		/* Submit button params */
		if (params.has("submit_button"))
		{
			var submit_button = params.get("submit_button");
			if (submit_button.has("text"))
			{
				content = submit_button.get("text");
			}
			if (submit_button.has("styles"))
			{
				styles = submit_button.get("styles");
			}
		}
		/* Add submit Button */
		var submit_button = this.bottom_buttons.addButton(Runtime.Map.from({"widget_name":"submit","content":content,"styles":styles,"events":Runtime.Map.from({"click":new Runtime.Callback(this, "submit")})}));
	},
});
Object.assign(Runtime.Widget.Form.FormSubmitModel, Runtime.Widget.Form.FormModel);
Object.assign(Runtime.Widget.Form.FormSubmitModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Form.FormModel";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormSubmitModel);
window["Runtime.Widget.Form.FormSubmitModel"] = Runtime.Widget.Form.FormSubmitModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormSubmitModel;