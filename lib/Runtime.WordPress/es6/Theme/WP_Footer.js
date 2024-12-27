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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
Runtime.WordPress.Theme.WP_Footer = {
	name: "Runtime.WordPress.Theme.WP_Footer",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Raw */
			this._t(__v, new Runtime.RawString(Runtime.WordPress.WP_Helper.wp_call("wp_footer")));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.WordPress.Theme.WP_Footer,
{
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.WP_Footer";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.WP_Footer);
window["Runtime.WordPress.Theme.WP_Footer"] = Runtime.WordPress.Theme.WP_Footer;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.WP_Footer;