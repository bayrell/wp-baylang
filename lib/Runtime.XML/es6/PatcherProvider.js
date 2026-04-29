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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
Runtime.XML.PatcherProvider = class extends Runtime.BaseProvider
{
	/**
	 * Start provider
	 */
	async start()
	{
		let patchers = Runtime.rtl.getContext().getEntities("Runtime.XML.XMLPatcher");
		for (let i = 0; i < patchers.count(); i++)
		{
			let annotation = patchers.get(i);
			let patcher = Runtime.rtl.newInstance(annotation.name);
			let patcher_types = patcher.types();
			for (let j = 0; j < patcher_types.count(); j++)
			{
				let patcher_type = patcher_types.get(j);
				this.patchers.set(patcher_type, patcher);
			}
		}
	}
	
	
	/**
	 * Returns pather by type
	 */
	getPatcher(patcher_type)
	{
		if (!this.patchers.has(patcher_type))
		{
			return null;
		}
		return this.patchers.get(patcher_type);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.patchers = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.XML.PatcherProvider"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.XML.PatcherProvider"] = Runtime.XML.PatcherProvider;