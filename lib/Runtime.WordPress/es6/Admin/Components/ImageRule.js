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
if (typeof Runtime.WordPress.Admin.Components == 'undefined') Runtime.WordPress.Admin.Components = {};
Runtime.WordPress.Admin.Components.ImageRule = class extends Runtime.Widget.Api.Rules.BaseRule
{
	/**
	 * Save item
	 */
	async onSaveBefore(api)
	{
		if (!api.update_data.has(this.name)) return;
		/* Get image id */
		let image = api.update_data.get(this.name);
		let image_id = image.id;
		/* Set image id */
		api.item.set(this.key, image_id);
	}
	
	
	/**
	 * Search after
	 */
	onSearchAfter(api)
	{
		let items = api.items;
		let images = api.items.map((item) => { return item.get(this.key); }).filter((id) => { return id > 0; });
		/* Load images */
		let result = await Runtime.WordPress.WP_Helper.loadImages(images);
		/* Map items */
		for (let i = 0; i < api.items.count(); i++)
		{
			let item = api.items.get(i);
			let image_id = item.get(this.key);
			item.set(this.name, result.get(image_id));
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.name = "";
		this.key = "";
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Components.ImageRule"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Components.ImageRule"] = Runtime.WordPress.Admin.Components.ImageRule;