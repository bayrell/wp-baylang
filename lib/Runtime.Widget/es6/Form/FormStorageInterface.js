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
Runtime.Widget.Form.FormStorageInterface = function()
{
};
Object.assign(Runtime.Widget.Form.FormStorageInterface.prototype,
{
	/**
	 * Set form
	 */
	setForm: function(form)
	{
	},
	/**
	 * Load form
	 */
	load: async function()
	{
	},
	/**
	 * Submit form
	 */
	submit: async function()
	{
	},
});
Object.assign(Runtime.Widget.Form.FormStorageInterface,
{
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormStorageInterface";
	},
});
Runtime.rtl.defClass(Runtime.Widget.Form.FormStorageInterface);
window["Runtime.Widget.Form.FormStorageInterface"] = Runtime.Widget.Form.FormStorageInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormStorageInterface;