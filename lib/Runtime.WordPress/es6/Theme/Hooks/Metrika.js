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
if (typeof Runtime.WordPress.Theme.Hooks == 'undefined') Runtime.WordPress.Theme.Hooks = {};
Runtime.WordPress.Theme.Hooks.Metrika = class extends Runtime.Web.Hooks.AppHook
{
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register("runtime.wordpress::form_submit", "form_submit");
	}
	
	
	/**
	 * Submit form event
	 */
	form_submit(data)
	{
		let res = data.get("res");
		if (!res.isSuccess()) return;
		/* Check form */
		let form = data.get("form");
		if (!form instanceof Runtime.WordPress.Theme.Components.Form.FormModel) return;
		/* Get event name */
		let event_name = form.metrika_event;
		if (event_name == "")
		{
			let res = Runtime.Map.create({
				"event_name": "submit",
			});
			Runtime.rtl.getContext().hook("runtime.wordpress::form_submit_event_name", res);
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
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Hooks.Metrika"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Hooks.Metrika"] = Runtime.WordPress.Theme.Hooks.Metrika;