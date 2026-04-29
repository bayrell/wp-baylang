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
Runtime.Listener = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(object)
	{
		super();
		this.object = object;
	}
	
	
	/**
	 * Clear listeners
	 */
	clear(message_name)
	{
		this.listeners.set(message_name, new Runtime.Chain());
	}
	
	
	/**
	 * Add listener
	 */
	add(message_name, f, priority)
	{
		if (priority == undefined) priority = 100;
		if (!(f instanceof Runtime.Method)) return;
		if (!this.listeners.has(message_name))
		{
			this.clear(message_name);
		}
		let chain = this.listeners.get(message_name);
		chain.add(f, priority);
		chain.sort();
	}
	
	
	/**
	 * Emit message
	 */
	emit(message)
	{
		if (message.model == null)
		{
			message.model = this.object;
		}
		this.emitMessage(message.constructor.getClassName(), message);
		this.emitMessage(message.name, message);
	}
	
	
	/**
	 * Emit async message
	 */
	async emitAsync(message)
	{
		if (message.model == null)
		{
			message.model = this.object;
		}
		let res1 = this.emitMessage(message.constructor.getClassName(), message);
		let res2 = this.emitMessage(message.name, message);
		if (res1 instanceof Promise) await res1;
		if (res2 instanceof Promise) await res2;
	}
	
	
	/**
	 * Emit message
	 */
	emitMessage(message_name, message)
	{
		if (!this.listeners.has(message_name)) return;
		let chain = this.listeners.get(message_name);
		return chain.apply(Runtime.Vector.create([message]));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.object = null;
		this.listeners = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Listener"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Listener"] = Runtime.Listener;