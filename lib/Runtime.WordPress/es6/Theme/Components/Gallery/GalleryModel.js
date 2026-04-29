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
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Gallery == 'undefined') Runtime.WordPress.Theme.Components.Gallery = {};
Runtime.WordPress.Theme.Components.Gallery.GalleryModel = class extends Runtime.Widget.Gallery.GalleryModel
{
	/**
	 * Returns small image
	 */
	getSmallImage(pos)
	{
		let item = this.getItem(pos);
		if (!item) return "";
		let image = item["image", "sizes", this.small_size];
		if (!image) return "";
		return image.get("file");
	}
	
	
	/**
	 * Returns big image
	 */
	getBigImage(pos)
	{
		let item = this.getItem(pos);
		if (!item) return "";
		let image = item["image", "sizes", this.big_size];
		if (!image) return "";
		return image.get("file");
	}
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("api_name")) this.api_name = params.get("api_name");
		if (params.has("big_size")) this.big_size = params.get("big_size");
		if (params.has("small_size")) this.small_size = params.get("small_size");
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
	}
	
	
	/**
	 * Process frontend data
	 */
	serialize(serializer, data)
	{
		serializer.process(this, "items", data);
		super.serialize(serializer, data);
	}
	
	
	/**
	 * Load items
	 */
	async loadItems()
	{
		let result = await this.layout.callApi(Runtime.Map.create({
			"api_name": "runtime.wordpress.gallery",
			"method_name": "actionSearch",
			"data": Runtime.Map.create({
				"api_name": this.api_name,
			}),
		}));
		if (result.isSuccess())
		{
			this.items = result.data.get("items");
		}
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await super.loadData(container);
		await this.loadItems();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.api_name = "";
		this.big_size = "medium_large";
		this.small_size = "medium";
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Components.Gallery.GalleryModel"] = Runtime.WordPress.Theme.Components.Gallery.GalleryModel;