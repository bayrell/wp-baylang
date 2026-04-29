"use strict;"
/*!
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
if (typeof Runtime.Widget.Gallery == 'undefined') Runtime.Widget.Gallery = {};
Runtime.Widget.Gallery.GalleryModel = class extends Runtime.BaseModel
{
	/**
	 * Returns items
	 */
	getItems(){ return this.items; }
	
	
	/**
	 * Returns item
	 */
	getItem(pos){ return this.items.get(pos); }
	
	
	/**
	 * Returns small image
	 */
	getSmallImage(pos){ return this.getItem(pos); }
	
	
	/**
	 * Returns big image
	 */
	getBigImage(pos){ return this.getItem(pos); }
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("dialog_image_contains"))
		{
			this.dialog_image_contains = params.get("dialog_image_contains");
		}
		if (params.has("items")) this.items = params.get("items");
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Add dialog */
		this.dialog = this.addWidget("Runtime.Widget.Gallery.GalleryDialogModel", Runtime.Map.create({
			"modal": false,
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Gallery.Gallery";
		this.widget_name = "gallery";
		this.dialog_image_contains = false;
		this.items = Runtime.Vector.create([]);
		this.dialog = null;
	}
	static getClassName(){ return "Runtime.Widget.Gallery.GalleryModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Gallery.GalleryModel"] = Runtime.Widget.Gallery.GalleryModel;