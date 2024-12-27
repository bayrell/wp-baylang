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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BusInterface = function()
{
};
Object.assign(Runtime.Web.BusInterface.prototype,
{
	/**
	 * Send request
	 */
	send: async function(params)
	{
	},
});
Object.assign(Runtime.Web.BusInterface,
{
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BusInterface";
	},
});
Runtime.rtl.defClass(Runtime.Web.BusInterface);
window["Runtime.Web.BusInterface"] = Runtime.Web.BusInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BusInterface;