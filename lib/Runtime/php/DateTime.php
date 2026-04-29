<?php
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
namespace Runtime;

use Runtime\BaseObject;
use Runtime\Math;
use Runtime\StringInterface;


class DateTime extends \Runtime\BaseObject implements \Runtime\StringInterface
{
	var $y;
	var $m;
	var $d;
	var $h;
	var $i;
	var $s;
	var $ms;
	var $o;
	
	
	/**
	 * Constructor
	 */
	function __construct($data = null)
	{
		parent::__construct();
		$this->setData($data);
	}
	
	
	/**
	 * Set data
	 */
	function setData($data)
	{
		if ($data instanceof \Runtime\DateTime) $data = $data->toMap();
		if ($data != null)
		{
			if ($data->has("y")) $this->y = $data->get("y");
			if ($data->has("m")) $this->m = $data->get("m");
			if ($data->has("d")) $this->d = $data->get("d");
			if ($data->has("h")) $this->h = $data->get("h");
			if ($data->has("i")) $this->i = $data->get("i");
			if ($data->has("s")) $this->s = $data->get("s");
			if ($data->has("ms")) $this->ms = $data->get("ms");
			if ($data->has("o")) $this->o = $data->get("o");
		}
		return $this;
	}
	
	
	/**
	 * Copy datetime
	 */
	function copy($data = null)
	{
		$date = new \Runtime\DateTime($this->toMap());
		return $date->setData($data);
	}
	
	
	/**
	 * toMap
	 */
	function toMap()
	{
		return new \Runtime\Map([
			"y" => $this->y,
			"m" => $this->m,
			"d" => $this->d,
			"h" => $this->h,
			"i" => $this->i,
			"s" => $this->s,
			"ms" => $this->ms,
			"o" => $this->o,
		]);
	}
	
	
	/**
	 * Create date time from timestamp
	 */
	static function create($time = -1)
	{
		$dt = null;
		if ($time == -1) $time = time();
		$dt = new \DateTime();
		$dt->setTimestamp($time);
		$date = new \Runtime\DateTime();
		$date->fromObject($dt);
		return $date;
	}
	
	
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	static function now(){ return static::create(-1); }
	
	
	/**
	 * Returns timestamp
	 * @return int
	 */
	function getTimestamp()
	{
		$dt = $this->toObject();
		return $dt->getTimestamp();
		return null;
	}
	function timestamp(){ return $this->getTimestamp(); }
	
	
	/**
	 * Set timestamp
	 */
	function setTimestamp($seconds)
	{
		$offset = $this->o;
		$date = \Runtime\DateTime::create($seconds);
		$this->setData($date->toMap());
		$this->setOffset($offset * 60 * 60);
		return $this;
	}
	
	
	/**
	 * Set hour
	 */
	function setHour($value)
	{
		$this->h = $value;
		return $this;
	}
	
	
	/**
	 * Set minutes
	 */
	function setMinute($value)
	{
		$this->i = $value;
		return $this;
	}
	
	
	/**
	 * Set seconds
	 */
	function setSecond($value)
	{
		$this->s = $value;
		return $this;
	}
	
	
	/**
	 * Set day
	 */
	function setDay($value)
	{
		$this->d = $value;
		return $this;
	}
	
	
	/**
	 * Set month
	 */
	function setMonth($value)
	{
		$this->m = $value;
		return $this;
	}
	
	
	/**
	 * Set year
	 */
	function setYear($value)
	{
		$this->y = $value;
		return $this;
	}
	
	
	/**
	 * Returns day of week
	 * @return int
	 */
	function getDayOfWeek()
	{
		$date = $this->copy(new \Runtime\Map(["o" => 0]));
		$dt = $date->toObject();
		return (int)$dt->format("w");
		return null;
	}
	
	
	/**
	 * Return db datetime
	 * @return string
	 */
	function toString()
	{
		$m = $this->m < 10 ? "0" . $this->m : "" . $this->m;
		$d = $this->d < 10 ? "0" . $this->d : "" . $this->d;
		$h = $this->h < 10 ? "0" . $this->h : "" . $this->h;
		$i = $this->i < 10 ? "0" . $this->i : "" . $this->i;
		$s = $this->s < 10 ? "0" . $this->s : "" . $this->s;
		/* Get offset */
		$offset = $this->o * 60;
		$offset_h = \Runtime\rtl::abs(\Runtime\rtl::floor($offset / 60));
		$offset_m = $offset % 60;
		$offset_h = $offset_h < 10 ? "0" . $offset_h : "" . $offset_h;
		$offset_m = $offset_m < 10 ? "0" . $offset_m : "" . $offset_m;
		$offset_str = $offset_h . $offset_m;
		$offset_str = $offset < 0 ? "-" . $offset_str : "+" . $offset_str;
		/* Return string */
		return $this->y . "-" . $m . "-" . $d . "T" . $h . ":" . $i . ":" . $s . $offset_str;
	}
	
	
	/**
	 * Create DateTime from string
	 */
	static function fromString($s)
	{
		$dt = new \Runtime\DateTime();
		$dt->y = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 0, 4));
		$dt->m = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 5, 2));
		$dt->d = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 8, 2));
		$dt->h = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 11, 2));
		$dt->i = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 14, 2));
		$dt->s = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 17, 2));
		$dt->o = 0;
		if (\Runtime\rs::strlen($s) > 19)
		{
			$sign = \Runtime\rs::substr($s, 19, 1);
			$tz_h = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 20, 2));
			$tz_m = \Runtime\rtl::toInt(\Runtime\rs::substr($s, 23, 2));
			$dt->o = ($tz_h * 60 + $tz_m) / 60;
			if ($sign == "-") $dt->o = 0 - $dt->o;
		}
		return $dt;
	}
	
	
	/**
	 * Pad2
	 */
	static function pad2($value){ return $value < 10 ? "0" . $value : \Runtime\rtl::toStr($value); }
	
	
	/**
	 * Returns date time string
	 */
	function format(){ return $this->y . "-" . static::pad2($this->m) . "-" . static::pad2($this->d) . " " . static::pad2($this->h) . ":" . static::pad2($this->i) . ":" . static::pad2($this->s); }
	
	
	/**
	 * Returns date string
	 */
	function getDate(){ return $this->y . "-" . static::pad2($this->m) . "-" . static::pad2($this->d); }
	
	
	/**
	 * Normalize
	 */
	function normalize()
	{
		$dt = $this;
		$offset = \Runtime\rtl::getContext()->env("TZ_OFFSET");
		if ($offset) $dt = $dt->copy()->setOffset($offset);
		return $dt;
	}
	
	
	/**
	 * Shift tz
	 */
	function shift($seconds)
	{
		$this->setTimestamp($this->getTimestamp() + $seconds);
		return $this;
	}
	
	
	/**
	 * Set offset
	 */
	function setOffset($offset)
	{
		$dt = $this->toObject();
		$dt_offset = $dt->getOffset();
		/* Modify offset */
		$delta = $offset - $dt_offset;
		$dt = static::modify($dt, $delta);
		$obj = $this->fromObject($dt);
		$obj->o = $offset / 3600;
		return $obj;
	}
	
	
	/**
	 * Get tz offset
	 */
	static function getOffset($tz)
	{
		$utc = new \DateTimeZone("UTC");
		$current = new \DateTimeZone($tz);
		$offset = $current->getOffset(new \DateTime("now", $utc));
		return $offset;
	}
	
	
	/**
	 * Add seconds
	 */
	static function modify($dt, $seconds)
	{
		if ($seconds == 0) return $dt;
		$dt->modify($seconds . ' seconds');
		return $dt;
	}
	
	
	/**
	 * Convert to native object
	 */
	function toObject()
	{
		$dt = new \DateTime();
		$dt->setTimezone( new \DateTimeZone("UTC") );
		$dt->setDate($this->y, $this->m, $this->d);
		$dt->setTime($this->h, $this->i, $this->s);
		$dt = static::modify($dt, -1 * $this->o * 60 * 60);
		return $dt;
	}
	
	
	/**
	 * Create from native object
	 */
	function fromObject($dt)
	{
		$this->y = (int)$dt->format("Y");
		$this->m = (int)$dt->format("m");
		$this->d = (int)$dt->format("d");
		$this->h = (int)$dt->format("H");
		$this->i = (int)$dt->format("i");
		$this->s = (int)$dt->format("s");
		$this->o = $dt->getOffset() / 3600;
		return $this;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->y = 1970;
		$this->m = 1;
		$this->d = 1;
		$this->h = 0;
		$this->i = 0;
		$this->s = 0;
		$this->ms = 0;
		$this->o = 0;
	}
	static function getClassName(){ return "Runtime.DateTime"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}