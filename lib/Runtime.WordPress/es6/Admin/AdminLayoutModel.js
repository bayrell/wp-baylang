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
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
Runtime.WordPress.Admin.AdminLayoutModel = function()
{
	Runtime.Web.BaseLayoutModel.apply(this, arguments);
};
Runtime.WordPress.Admin.AdminLayoutModel.prototype = Object.create(Runtime.Web.BaseLayoutModel.prototype);
Runtime.WordPress.Admin.AdminLayoutModel.prototype.constructor = Runtime.WordPress.Admin.AdminLayoutModel;
Object.assign(Runtime.WordPress.Admin.AdminLayoutModel.prototype,
{
	_init: function()
	{
		Runtime.Web.BaseLayoutModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.AdminLayout";
	},
});
Object.assign(Runtime.WordPress.Admin.AdminLayoutModel, Runtime.Web.BaseLayoutModel);
Object.assign(Runtime.WordPress.Admin.AdminLayoutModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.AdminLayoutModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseLayoutModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.AdminLayoutModel);
window["Runtime.WordPress.Admin.AdminLayoutModel"] = Runtime.WordPress.Admin.AdminLayoutModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.AdminLayoutModel;