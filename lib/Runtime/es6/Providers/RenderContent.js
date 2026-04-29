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
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.RenderContent = class extends Runtime.BaseProvider
{
	/**
	 * Add replace component
	 */
	addComponent(component, name)
	{
		this.components.set(component, name);
	}
	
	
	/**
	 * Find component
	 */
	findComponent(vdom)
	{
		let name = vdom.name;
		if (this.components.has(name)) name = this.components.get(name);
		return name;
	}
	
	
	/**
	 * Render
	 */
	render(vdom, content, parent_vdom)
	{
		if (parent_vdom == undefined) parent_vdom = null;
		if (vdom === null) return;
		if (!(vdom instanceof Runtime.VirtualDom))
		{
			if (parent_vdom && parent_vdom.is_raw)
			{
				content.push(vdom);
			}
			else content.push(Runtime.rs.escapeHtml(vdom));
			return;
		}
		if (vdom.is_component)
		{
			let component_name = this.findComponent(vdom);
			let component = Runtime.rtl.newInstance(component_name);
			component.parent_component = this.items.count() > 0 ? this.items.last() : null;
			component.layout = vdom.component ? vdom.component.layout : null;
			component._slots = vdom.slots;
			let keys = Runtime.rtl.list(vdom.attrs.keys());
			for (let i = 0; i < keys.count(); i++)
			{
				let attr_name = keys.get(i);
				Runtime.rtl.setAttr(component, attr_name, vdom.attrs.get(attr_name));
			}
			let item = component.render();
			this.items.push(component);
			this.render(item, content);
			this.items.pop();
		}
		else
		{
			let item_result = Runtime.Vector.create([]);
			if (!vdom.attrs.has("@raw"))
			{
				for (let i = 0; i < vdom.items.count(); i++)
				{
					let item = vdom.items.get(i);
					this.render(item, item_result, vdom);
				}
			}
			else
			{
				item_result.push(vdom.attrs.get("@raw"));
			}
			if (vdom.name != "")
			{
				let attr_items = Runtime.Vector.create([]);
				if (vdom.attrs)
				{
					let keys = Runtime.rtl.list(vdom.attrs.keys());
					for (let i = 0; i < keys.count(); i++)
					{
						let attr_name = keys.get(i);
						let value = Runtime.rs.trim(vdom.attrs.get(attr_name));
						/*if (value == "") continue;*/
						if (Runtime.rs.charAt(attr_name, 0) == "@") continue;
						attr_items.push(attr_name + String("=\"") + String(Runtime.rs.escapeHtml(value)) + String("\""));
					}
				}
				let attrs = attr_items.count() > 0 ? " " + String(Runtime.rs.join(" ", attr_items)) : "";
				if (vdom.name == "br" || vdom.name == "hr" || vdom.name == "link")
				{
					content.push("<" + String(vdom.name) + String(attrs) + String("/>"));
				}
				else
				{
					content.push("<" + String(vdom.name) + String(attrs) + String(">"));
					content.appendItems(item_result);
					content.push("</" + String(vdom.name) + String(">"));
				}
			}
			else
			{
				let is_fragment = vdom.is_render && vdom.items.count() > 1;
				if (is_fragment) content.push("<!--[-->");
				content.appendItems(item_result);
				if (is_fragment) content.push("<!--]-->");
			}
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.items = Runtime.Vector.create([]);
		this.components = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Providers.RenderContent"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Providers.RenderContent"] = Runtime.Providers.RenderContent;