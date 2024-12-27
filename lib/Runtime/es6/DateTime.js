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
Runtime.DateTime = function(data)
{
	if (data == undefined) data = null;
	Runtime.BaseObject.call(this);
	if (data != null)
	{
		if (data.has("y"))
		{
			this.y = data.get("y");
		}
		if (data.has("m"))
		{
			this.m = data.get("m");
		}
		if (data.has("d"))
		{
			this.d = data.get("d");
		}
		if (data.has("h"))
		{
			this.h = data.get("h");
		}
		if (data.has("i"))
		{
			this.i = data.get("i");
		}
		if (data.has("s"))
		{
			this.s = data.get("s");
		}
		if (data.has("ms"))
		{
			this.ms = data.get("ms");
		}
		if (data.has("o"))
		{
			this.o = data.get("o");
		}
	}
};
Runtime.DateTime.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * toMap
	 */
	toMap: function()
	{
		return Runtime.Map.from({"y":this.y,"m":this.m,"d":this.d,"h":this.h,"i":this.i,"s":this.s,"ms":this.ms,"o":this.o});
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function()
	{
		var dt = this.toObject();
		return Math.round(dt.getTime() / 1000);
		return null;
	},
	timestamp: function()
	{
		return this.getTimestamp();
	},
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function()
	{
		var dt = this.toObject();
		return dt.getDay();
		return null;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	toString: function()
	{
		var m = (this.m < 10) ? ("0" + Runtime.rtl.toStr(this.m)) : ("" + Runtime.rtl.toStr(this.m));
		var d = (this.d < 10) ? ("0" + Runtime.rtl.toStr(this.d)) : ("" + Runtime.rtl.toStr(this.d));
		var h = (this.h < 10) ? ("0" + Runtime.rtl.toStr(this.h)) : ("" + Runtime.rtl.toStr(this.h));
		var i = (this.i < 10) ? ("0" + Runtime.rtl.toStr(this.i)) : ("" + Runtime.rtl.toStr(this.i));
		var s = (this.s < 10) ? ("0" + Runtime.rtl.toStr(this.s)) : ("" + Runtime.rtl.toStr(this.s));
		/* Get offset */
		var offset = this.o * 60;
		var offset_h = Runtime.Math.abs(Runtime.Math.floor(offset / 60));
		var offset_m = offset % 60;
		offset_h = (offset_h < 10) ? ("0" + Runtime.rtl.toStr(offset_h)) : ("" + Runtime.rtl.toStr(offset_h));
		offset_m = (offset_m < 10) ? ("0" + Runtime.rtl.toStr(offset_m)) : ("" + Runtime.rtl.toStr(offset_m));
		var offset_str = offset_h + Runtime.rtl.toStr(offset_m);
		offset_str = (offset < 0) ? ("-" + Runtime.rtl.toStr(offset_str)) : ("+" + Runtime.rtl.toStr(offset_str));
		/* Return string */
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(d) + Runtime.rtl.toStr("T") + Runtime.rtl.toStr(h) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(i) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(offset_str);
	},
	/**
	 * Returns date time string
	 */
	getDateTimeString: function()
	{
		var m = (this.m < 10) ? ("0" + Runtime.rtl.toStr(this.m)) : ("" + Runtime.rtl.toStr(this.m));
		var d = (this.d < 10) ? ("0" + Runtime.rtl.toStr(this.d)) : ("" + Runtime.rtl.toStr(this.d));
		var h = (this.h < 10) ? ("0" + Runtime.rtl.toStr(this.h)) : ("" + Runtime.rtl.toStr(this.h));
		var i = (this.i < 10) ? ("0" + Runtime.rtl.toStr(this.i)) : ("" + Runtime.rtl.toStr(this.i));
		var s = (this.s < 10) ? ("0" + Runtime.rtl.toStr(this.s)) : ("" + Runtime.rtl.toStr(this.s));
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(d) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(h) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(i) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s);
	},
	/**
	 * Normalize
	 */
	normalize: function()
	{
		var dt = this;
		var offset = Runtime.rtl.getContext().env("TZ_OFFSET");
		if (offset)
		{
			dt = dt.setOffset(offset);
		}
		return dt;
	},
	/**
	 * Shift tz
	 */
	shift: function(seconds)
	{
		var timestamp = this.getTimestamp();
		var dt = this.constructor.create(timestamp + seconds);
		dt.setOffset(this.o);
		return dt;
	},
	/**
	 * Set offset
	 */
	setOffset: function(offset)
	{
		var dt = this.toObject();
		var dt_offset;
		dt_offset = -dt.getTimezoneOffset() * 60;
		/* Modify offset */
		var delta = offset - dt_offset;
		dt = this.constructor.modify(dt, delta);
		var obj = this.constructor.fromObject(dt);
		obj.o = offset;
		return obj;
	},
	/**
	 * Convert to native object
	 */
	toObject: function()
	{
		var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
		offset = dt.getTimezoneOffset() + this.o * 60;
		dt = this.constructor.modify(dt, -offset * 60);
		return dt;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.y = 1970;
		this.m = 1;
		this.d = 1;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.o = 0;
	},
});
Object.assign(Runtime.DateTime, Runtime.BaseObject);
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	create: function(time)
	{
		if (time == undefined) time = -1;
		var dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		return this.fromObject(dt);
		return null;
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function()
	{
		return this.create(-1);
	},
	/**
	 * Create DateTime from string
	 */
	fromString: function(s)
	{
		var dt = new Runtime.DateTime();
		dt.y = Runtime.rtl.to(Runtime.rs.substr(s, 0, 4), {"e":"int"});
		dt.m = Runtime.rtl.to(Runtime.rs.substr(s, 5, 2), {"e":"int"});
		dt.d = Runtime.rtl.to(Runtime.rs.substr(s, 8, 2), {"e":"int"});
		dt.h = Runtime.rtl.to(Runtime.rs.substr(s, 11, 2), {"e":"int"});
		dt.i = Runtime.rtl.to(Runtime.rs.substr(s, 14, 2), {"e":"int"});
		dt.s = Runtime.rtl.to(Runtime.rs.substr(s, 17, 2), {"e":"int"});
		dt.o = 0;
		if (Runtime.rs.strlen(s) > 19)
		{
			var sign = Runtime.rs.substr(s, 19, 1);
			var tz_h = Runtime.rtl.to(Runtime.rs.substr(s, 20, 2), {"e":"int"});
			var tz_m = Runtime.rtl.to(Runtime.rs.substr(s, 23, 2), {"e":"int"});
			dt.o = (tz_h * 60 + tz_m) / 60;
			if (sign == "-")
			{
				dt.o = 0 - dt.o;
			}
		}
		return dt;
	},
	/**
	 * Get tz offset
	 */
	getOffset: function(tz)
	{
	},
	/**
	 * Add seconds
	 */
	modify: function(dt, seconds)
	{
		if (seconds == 0)
		{
			return dt;
		}
		var offset = Math.floor(seconds / 60);
		var h = Math.floor(offset / 60);
		var m = offset % 60;
		dt.setMinutes(dt.getMinutes() + m);
		dt.setHours(dt.getHours() + h);
		return dt;
	},
	/**
	 * Create from native object
	 */
	fromObject: function(dt)
	{
		var Dict = use("Runtime.Dict");
		offset = -dt.getTimezoneOffset() / 60;
		var y = Number(dt.getFullYear());
		var m = Number(dt.getMonth()) + 1;
		var d = Number(dt.getDate());
		var h = Number(dt.getHours());
		var i = Number(dt.getMinutes());
		var s = Number(dt.getSeconds());
		var obj = new Runtime.DateTime(Dict.from({
			"y":y,"m":m,"d":d,"h":h,"i":i,"s":s,"o":offset
		}));
		return obj;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.DateTime";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.DateTime);
window["Runtime.DateTime"] = Runtime.DateTime;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.DateTime;