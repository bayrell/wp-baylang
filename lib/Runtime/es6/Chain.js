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
Runtime.Chain = class extends Runtime.Method
{
	/**
	 * Constructor
	 */
	constructor()
	{
		super(null, null);
	}
	
	
	/**
	 * Check if method exists
	 */
	exists(){ return true; }
	
	
	/**
	 * Check method
	 */
	check()
	{
	}
	
	
	/**
	 * Returns true if async
	 */
	getChain(){ return this.chain.slice(); }
	
	
	/**
	 * Add function to chain
	 */
	add(f, priority)
	{
		if (priority == undefined) priority = 100;
		this.chain.push(Runtime.Map.create({
			"method": f,
			"priority": priority,
		}));
		return this;
	}
	
	
	/**
	 * Sort chain
	 */
	sort()
	{
		this.chain.sort(Runtime.rtl.compare((item) => { return item.get("priority"); }));
	}
	
	
	/**
	 * Apply chain
	 */
	apply(args)
	{
		if (args == undefined) args = null;
		for (let i = 0; i < this.chain.count(); i++)
		{
			let item = this.chain.get(i);
			let f = item.get("method");
			if (f instanceof Runtime.Method) f.apply(args);
			else Runtime.rtl.apply(f, args);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.chain = Runtime.Vector.create([]);
	}
	static getClassName(){ return "Runtime.Chain"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Chain"] = Runtime.Chain;