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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
Runtime.WordPress.Theme.Metrika = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.WordPress.Theme.Metrika.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.WordPress.Theme.Metrika.prototype.constructor = Runtime.WordPress.Theme.Metrika;
Object.assign(Runtime.WordPress.Theme.Metrika.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register("runtime.wordpress::form_submit", "form_submit");
	},
	/**
	 * Submit form event
	 */
	form_submit: function(data)
	{
		var res = data.get("res");
		if (!res.isSuccess())
		{
			return ;
		}
		/* Check form */
		var form = data.get("form");
		if (!(form instanceof Runtime.WordPress.Theme.Components.Form.FormModel))
		{
			return ;
		}
		/* Get event name */
		var event_name = form.metrika_event;
		if (event_name == "")
		{
			var res = Runtime.Map.from({"event_name":"submit"});
			Runtime.rtl.getContext().callHook("runtime.wordpress::form_submit_event_name", res);
			event_name = res.get("event_name");
		}
		/* https://developers.google.com/analytics/devguides/collection/gtagjs/events?hl=ru */
		if (typeof window['gtag'] === 'function'){
			gtag('event', event_name, {
				'event_category': 'goal',
				'event_action': event_name
			});
		}
		
		/* https://developers.google.com/analytics/devguides/collection/analyticsjs/events */
		else if (typeof window['ga'] === 'function'){
			ga('send', {
				hitType: 'event',
				eventCategory: 'goal',
				eventAction: event_name
			});
		}
		
		/* Facebook */
		if (typeof window['fbq'] === 'function'){
			fbq('track', event_name);
		}
		
		/* Yandex */
		if ((typeof yaCounter) != 'undefined' && yaCounter != null)
			yaCounter.reachGoal(event_name);
		
		console.log("metrika_event " + event_name);
	},
});
Object.assign(Runtime.WordPress.Theme.Metrika, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.WordPress.Theme.Metrika,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Metrika";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Metrika);
window["Runtime.WordPress.Theme.Metrika"] = Runtime.WordPress.Theme.Metrika;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Metrika;