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
if (typeof Runtime.Widget.Gallery == 'undefined') Runtime.Widget.Gallery = {};
Runtime.Widget.Gallery.GalleryDialogModel = function()
{
	Runtime.Widget.Dialog.DialogModel.apply(this, arguments);
};
Runtime.Widget.Gallery.GalleryDialogModel.prototype = Object.create(Runtime.Widget.Dialog.DialogModel.prototype);
Runtime.Widget.Gallery.GalleryDialogModel.prototype.constructor = Runtime.Widget.Gallery.GalleryDialogModel;
Object.assign(Runtime.Widget.Gallery.GalleryDialogModel.prototype,
{
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return this.parent_widget.getItems();
	},
	/**
	 * Returns item
	 */
	getItem: function(pos)
	{
		return this.parent_widget.getItem(pos);
	},
	/**
	 * Returns image
	 */
	getImage: function(pos)
	{
		return this.parent_widget.getBigImage(pos);
	},
	/**
	 * Returns true if image is contains
	 */
	getImageContains: function()
	{
		return this.parent_widget.dialog_image_contains === true || this.parent_widget.dialog_image_contains == "1" || this.parent_widget.dialog_image_contains == "true";
	},
	/**
	 * Returns current image
	 */
	getCurrentImage: function()
	{
		return this.getImage(this.current);
	},
	/**
	 * Select image
	 */
	select: function(pos)
	{
		var count = this.getItems().count();
		if (count == 0)
		{
			this.current = 0;
			return ;
		}
		this.current = pos % count;
		if (this.current < 0)
		{
			this.current = (this.current + count) % count;
		}
	},
	/**
	 * Show prev image
	 */
	prev: function()
	{
		this.select(this.current - 1);
	},
	/**
	 * Show next image
	 */
	next: function()
	{
		this.select(this.current + 1);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.DialogModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Gallery.GalleryDialog";
		this.current = 0;
	},
});
Object.assign(Runtime.Widget.Gallery.GalleryDialogModel, Runtime.Widget.Dialog.DialogModel);
Object.assign(Runtime.Widget.Gallery.GalleryDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Gallery.GalleryDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Gallery.GalleryDialogModel);
window["Runtime.Widget.Gallery.GalleryDialogModel"] = Runtime.Widget.Gallery.GalleryDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Gallery.GalleryDialogModel;