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
Runtime.DateTime = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(data)
	{
		if (data == undefined) data = null;
		super();
		this.setData(data);
	}
	
	
	/**
	 * Set data
	 */
	setData(data)
	{
		if (data instanceof Runtime.DateTime) data = data.toMap();
		if (data != null)
		{
			if (data.has("y")) this.y = data.get("y");
			if (data.has("m")) this.m = data.get("m");
			if (data.has("d")) this.d = data.get("d");
			if (data.has("h")) this.h = data.get("h");
			if (data.has("i")) this.i = data.get("i");
			if (data.has("s")) this.s = data.get("s");
			if (data.has("ms")) this.ms = data.get("ms");
			if (data.has("o")) this.o = data.get("o");
		}
		return this;
	}
	
	
	/**
	 * Copy datetime
	 */
	copy(data)
	{
		if (data == undefined) data = null;
		let date = new Runtime.DateTime(this.toMap());
		return date.setData(data);
	}
	
	
	/**
	 * toMap
	 */
	toMap()
	{
		return Runtime.Map.create({
			"y": this.y,
			"m": this.m,
			"d": this.d,
			"h": this.h,
			"i": this.i,
			"s": this.s,
			"ms": this.ms,
			"o": this.o,
		});
	}
	
	
	/**
	 * Create date time from timestamp
	 */
	static create(time)
	{
		if (time == undefined) time = -1;
		let dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		let date = new Runtime.DateTime();
		date.fromObject(dt);
		return date;
	}
	
	
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	static now(){ return this.create(-1); }
	
	
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp()
	{
		var dt = this.toObject();
		return Math.round(dt.getTime() / 1000);
		return null;
	}
	
	
	timestamp(){ return this.getTimestamp(); }
	
	
	/**
	 * Set timestamp
	 */
	setTimestamp(seconds)
	{
		let offset = this.o;
		let date = Runtime.DateTime.create(seconds);
		this.setData(date.toMap());
		this.setOffset(offset * 60 * 60);
		return this;
	}
	
	
	/**
	 * Set hour
	 */
	setHour(value)
	{
		this.h = value;
		return this;
	}
	
	
	/**
	 * Set minutes
	 */
	setMinute(value)
	{
		this.i = value;
		return this;
	}
	
	
	/**
	 * Set seconds
	 */
	setSecond(value)
	{
		this.s = value;
		return this;
	}
	
	
	/**
	 * Set day
	 */
	setDay(value)
	{
		this.d = value;
		return this;
	}
	
	
	/**
	 * Set month
	 */
	setMonth(value)
	{
		this.m = value;
		return this;
	}
	
	
	/**
	 * Set year
	 */
	setYear(value)
	{
		this.y = value;
		return this;
	}
	
	
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek()
	{
		let date = this.copy(Runtime.Map.create({"o": 0}));
		var dt = this.toObject();
		return Number(dt.getDay());
		return null;
	}
	
	
	/**
	 * Return db datetime
	 * @return string
	 */
	toString()
	{
		let m = this.m < 10 ? "0" + String(this.m) : "" + String(this.m);
		let d = this.d < 10 ? "0" + String(this.d) : "" + String(this.d);
		let h = this.h < 10 ? "0" + String(this.h) : "" + String(this.h);
		let i = this.i < 10 ? "0" + String(this.i) : "" + String(this.i);
		let s = this.s < 10 ? "0" + String(this.s) : "" + String(this.s);
		/* Get offset */
		let offset = this.o * 60;
		let offset_h = Runtime.rtl.abs(Runtime.rtl.floor(offset / 60));
		let offset_m = offset % 60;
		offset_h = offset_h < 10 ? "0" + String(offset_h) : "" + String(offset_h);
		offset_m = offset_m < 10 ? "0" + String(offset_m) : "" + String(offset_m);
		let offset_str = offset_h + String(offset_m);
		offset_str = offset < 0 ? "-" + String(offset_str) : "+" + String(offset_str);
		/* Return string */
		return this.y + String("-") + String(m) + String("-") + String(d) + String("T") + String(h) + String(":") + String(i) + String(":") + String(s) + String(offset_str);
	}
	
	
	/**
	 * Create DateTime from string
	 */
	static fromString(s)
	{
		let dt = new Runtime.DateTime();
		dt.y = Runtime.rtl.toInt(Runtime.rs.substr(s, 0, 4));
		dt.m = Runtime.rtl.toInt(Runtime.rs.substr(s, 5, 2));
		dt.d = Runtime.rtl.toInt(Runtime.rs.substr(s, 8, 2));
		dt.h = Runtime.rtl.toInt(Runtime.rs.substr(s, 11, 2));
		dt.i = Runtime.rtl.toInt(Runtime.rs.substr(s, 14, 2));
		dt.s = Runtime.rtl.toInt(Runtime.rs.substr(s, 17, 2));
		dt.o = 0;
		if (Runtime.rs.strlen(s) > 19)
		{
			let sign = Runtime.rs.substr(s, 19, 1);
			let tz_h = Runtime.rtl.toInt(Runtime.rs.substr(s, 20, 2));
			let tz_m = Runtime.rtl.toInt(Runtime.rs.substr(s, 23, 2));
			dt.o = (tz_h * 60 + tz_m) / 60;
			if (sign == "-") dt.o = 0 - dt.o;
		}
		return dt;
	}
	
	
	/**
	 * Pad2
	 */
	static pad2(value){ return value < 10 ? "0" + String(value) : Runtime.rtl.toStr(value); }
	
	
	/**
	 * Returns date time string
	 */
	format(){ return this.y + String("-") + String(this.constructor.pad2(this.m)) + String("-") + String(this.constructor.pad2(this.d)) + String(" ") + String(this.constructor.pad2(this.h)) + String(":") + String(this.constructor.pad2(this.i)) + String(":") + String(this.constructor.pad2(this.s)); }
	
	
	/**
	 * Returns date string
	 */
	getDate(){ return this.y + String("-") + String(this.constructor.pad2(this.m)) + String("-") + String(this.constructor.pad2(this.d)); }
	
	
	/**
	 * Normalize
	 */
	normalize()
	{
		let dt = this;
		let offset = Runtime.rtl.getContext().env("TZ_OFFSET");
		if (offset) dt = dt.copy().setOffset(offset);
		return dt;
	}
	
	
	/**
	 * Shift tz
	 */
	shift(seconds)
	{
		this.setTimestamp(this.getTimestamp() + seconds);
		return this;
	}
	
	
	/**
	 * Set offset
	 */
	setOffset(offset)
	{
		let dt = this.toObject();
		let dt_offset;
		dt_offset = -dt.getTimezoneOffset() * 60;
		/* Modify offset */
		let delta = offset - dt_offset;
		dt = this.constructor.modify(dt, delta);
		let obj = this.fromObject(dt);
		obj.o = offset / 3600;
		return obj;
	}
	
	
	/**
	 * Get tz offset
	 */
	static getOffset(tz)
	{
	}
	
	
	/**
	 * Add seconds
	 */
	static modify(dt, seconds)
	{
		if (seconds == 0) return dt;
		var offset = Math.floor(seconds / 60);
		var h = Math.floor(offset / 60);
		var m = offset % 60;
		dt.setMinutes(dt.getMinutes() + m);
		dt.setHours(dt.getHours() + h);
		return dt;
	}
	
	
	/**
	 * Convert to native object
	 */
	toObject()
	{
		var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
		var offset = dt.getTimezoneOffset() + this.o * 60;
		dt = this.constructor.modify(dt, -offset * 60);
		return dt;
	}
	
	
	/**
	 * Create from native object
	 */
	fromObject(dt)
	{
		var Map = use("Runtime.Map");
		var offset = -dt.getTimezoneOffset() / 60;
		this.y = Number(dt.getFullYear());
		this.m = Number(dt.getMonth()) + 1;
		this.d = Number(dt.getDate());
		this.h = Number(dt.getHours());
		this.i = Number(dt.getMinutes());
		this.s = Number(dt.getSeconds());
		this.o = offset;
		return this;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.y = 1970;
		this.m = 1;
		this.d = 1;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.o = 0;
	}
	static getClassName(){ return "Runtime.DateTime"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.StringInterface"]; }
};
window["Runtime.DateTime"] = Runtime.DateTime;